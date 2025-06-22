import { User } from "../models/user.Model.js";

const isAdmin = async (req, res, next) => {
    try {
        // Get user from request (set by isAuthenticated middleware)
        const user = req.user;
        
        if (!user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // Check if user is admin
        if (user.role !== 'Admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export default isAdmin; 