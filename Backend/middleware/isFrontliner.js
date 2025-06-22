const isFrontliner = (req, res, next) => {
    try {
        // Check if user exists and has frontliner role
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        if (req.user.role !== 'frontliner') {
            return res.status(403).json({ message: "Access denied. Frontliner role required." });
        }

        next();
    } catch (error) {
        console.error("Error in isFrontliner middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default isFrontliner; 