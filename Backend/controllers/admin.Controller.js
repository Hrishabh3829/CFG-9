import { User } from "../models/user.Model.js";
import bcrypt from "bcryptjs";

// Create a new NGO (Admin only)
export const createNGO = async (req, res) => {
    try {
        const { 
            name, 
            email, 
            password, 
            ngoInfo 
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new NGO user
        const newNGO = new User({
            name,
            email,
            password: hashedPassword,
            role: 'PartnerNGO',
            ngoInfo: {
                name: ngoInfo?.name || name,
                address: ngoInfo?.address || '',
                registrationNumber: ngoInfo?.registrationNumber || '',
                contactPerson: ngoInfo?.contactPerson || '',
                phoneNumber: ngoInfo?.phoneNumber || ''
            }
        });

        await newNGO.save();

        // Remove password from response
        const { password: _, ...ngoWithoutPassword } = newNGO.toObject();

        res.status(201).json({ 
            message: "NGO created successfully", 
            ngo: ngoWithoutPassword 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Create a new Frontliner (Admin only)
export const createFrontliner = async (req, res) => {
    try {
        const { 
            name, 
            email, 
            password, 
            frontlinerInfo 
        } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new Frontliner user
        const newFrontliner = new User({
            name,
            email,
            password: hashedPassword,
            role: 'Frontliner',
            frontlinerInfo: {
                region: frontlinerInfo?.region || '',
                assignedProjects: frontlinerInfo?.assignedProjects || [],
                supervisor: frontlinerInfo?.supervisor || ''
            }
        });

        await newFrontliner.save();

        // Remove password from response
        const { password: _, ...frontlinerWithoutPassword } = newFrontliner.toObject();

        res.status(201).json({ 
            message: "Frontliner created successfully", 
            frontliner: frontlinerWithoutPassword 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all Partner NGOs
export const getAllNGOs = async (req, res) => {
    try {
        const ngos = await User.find({ 
            role: 'PartnerNGO',
            isActive: true 
        }).select('-password');

        res.status(200).json({
            message: "NGOs retrieved successfully",
            count: ngos.length,
            ngos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all Frontliners
export const getAllFrontliners = async (req, res) => {
    try {
        const frontliners = await User.find({ 
            role: 'Frontliner',
            isActive: true 
        }).select('-password').populate('frontlinerInfo.assignedProjects', 'name startDate');

        res.status(200).json({
            message: "Frontliners retrieved successfully",
            count: frontliners.length,
            frontliners
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update admin settings (project notification count)
export const updateAdminSettings = async (req, res) => {
    try {
        const { projectNotificationCount, notificationsEnabled } = req.body;
        const { userId } = req.params;

        // Verify user is admin and is updating their own settings
        if (req.user._id.toString() !== userId) {
            return res.status(403).json({ message: "You can only update your own settings." });
        }

        const updatedAdmin = await User.findByIdAndUpdate(
            userId,
            {
                adminSettings: {
                    projectNotificationCount: projectNotificationCount || req.user.adminSettings.projectNotificationCount,
                    notificationsEnabled: notificationsEnabled !== undefined ? notificationsEnabled : req.user.adminSettings.notificationsEnabled
                }
            },
            { new: true }
        ).select('-password');

        res.status(200).json({
            message: "Admin settings updated successfully",
            admin: updatedAdmin
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get admin dashboard stats
export const getAdminDashboard = async (req, res) => {
    try {
        const { userId } = req.params;

        // Verify user is admin and is accessing their own dashboard
        if (req.user._id.toString() !== userId) {
            return res.status(403).json({ message: "You can only access your own dashboard." });
        }

        // Get counts
        const ngoCount = await User.countDocuments({ role: 'PartnerNGO', isActive: true });
        const frontlinerCount = await User.countDocuments({ role: 'Frontliner', isActive: true });
        const totalUsers = await User.countDocuments({ isActive: true });

        // Get recent users
        const recentNGOs = await User.find({ 
            role: 'PartnerNGO', 
            isActive: true 
        })
        .select('-password')
        .sort({ createdAt: -1 })
        .limit(5);

        const recentFrontliners = await User.find({ 
            role: 'Frontliner', 
            isActive: true 
        })
        .select('-password')
        .sort({ createdAt: -1 })
        .limit(5);

        res.status(200).json({
            message: "Dashboard data retrieved successfully",
            stats: {
                totalUsers,
                ngoCount,
                frontlinerCount
            },
            recentNGOs,
            recentFrontliners,
            adminSettings: req.user.adminSettings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Deactivate/Activate user
export const toggleUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { isActive } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { isActive },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}; 