import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../models/user.Model.js";
import { sendVerificationEmail } from "../utils/emailService.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role, ngoInfo } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            isVerified: false,
            verificationToken,
            verificationTokenExpiry,
            ngoInfo: role === 'ngo' ? ngoInfo : undefined,
        });

        await newUser.save();

        // Send verification email
        const emailSent = await sendVerificationEmail(email, verificationToken, name);
        
        if (!emailSent) {
            // If email fails, still create user but inform them
            return res.status(201).json({ 
                message: "User registered successfully, but verification email could not be sent. Please contact support.",
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    isVerified: newUser.isVerified
                }
            });
        }

        res.status(201).json({ 
            message: "User registered successfully. Please check your email to verify your account.", 
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                isVerified: newUser.isVerified
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if email is verified
        if (!user.isVerified) {
            return res.status(401).json({ 
                message: "Please verify your email address before logging in. Check your inbox for the verification link." 
            });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
            expiresIn: '1d',
        });

        return res.status(200).cookie("token", token, { 
            maxAge: 1 * 24 * 60 * 60 * 1000, 
            httpOnly: true, 
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        }).json({
            message: `Welcome back, ${user.name}`,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                ngoInfo: user.ngoInfo
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ 
                message: "Invalid or expired verification token" 
            });
        }

        // Mark user as verified and clear verification token
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ 
            message: "Email verified successfully! You can now log in to your account." 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        // Generate new verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        user.verificationToken = verificationToken;
        user.verificationTokenExpiry = verificationTokenExpiry;
        await user.save();

        // Send new verification email
        const emailSent = await sendVerificationEmail(email, verificationToken, user.name);
        
        if (!emailSent) {
            return res.status(500).json({ 
                message: "Failed to send verification email. Please try again later." 
            });
        }

        res.status(200).json({ 
            message: "Verification email sent successfully. Please check your inbox." 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { 
            maxAge: 0,
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        }).json({
            message: "Logged out Successfully.",
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                ngoInfo: user.ngoInfo
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
