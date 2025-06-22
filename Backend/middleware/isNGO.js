const isNGO = (req, res, next) => {
    try {
        // Check if user exists and has NGO role
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        if (req.user.role !== 'PartnerNGO') {
            return res.status(403).json({ message: "Access denied. NGO role required." });
        }

        next();
    } catch (error) {
        console.error("Error in isNGO middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default isNGO; 