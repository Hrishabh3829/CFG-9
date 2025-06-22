import { User } from "../models/user.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password, role, ngoInfo } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate role
        const validRoles = ['Admin', 'Frontliner', 'PartnerNGO'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role. Must be Admin, Frontliner, or PartnerNGO" });
        }

        const existingUser = await User.findOne({ email }); 
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            ngoInfo: role === 'PartnerNGO' ? ngoInfo : undefined,
        });

        await newUser.save();

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser.toObject();

        res.status(201).json({ 
            message: "User registered successfully", 
            user: userWithoutPassword 
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

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, {
            expiresIn: '1d',
        });

        // Set cookie with proper options for development
        res.cookie("token", token, { 
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true, // Prevents XSS attacks
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict' // CSRF protection
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user.toObject();

        return res.status(200).json({
            message: `Welcome back, ${user.name}`,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", { 
            maxAge: 0,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        
        return res.status(200).json({
            message: "Logged out Successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Test endpoint to create a test admin user
export const createTestUser = async (req, res) => {
    try {
        const testUser = {
            name: "Test Admin",
            email: "admin@test.com",
            password: "Admin123!",
            role: "Admin"
        };

        // Check if test user already exists
        const existingUser = await User.findOne({ email: testUser.email });
        if (existingUser) {
            return res.status(200).json({ 
                message: "Test user already exists", 
                user: { email: testUser.email, role: testUser.role }
            });
        }

        const hashedPassword = await bcrypt.hash(testUser.password, 10);

        const newUser = new User({
            name: testUser.name,
            email: testUser.email,
            password: hashedPassword,
            role: testUser.role,
        });

        await newUser.save();

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser.toObject();

        res.status(201).json({ 
            message: "Test admin user created successfully", 
            user: userWithoutPassword 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
