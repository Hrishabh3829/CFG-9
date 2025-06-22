import jwt from "jsonwebtoken"
import { User } from "../models/user.Model.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({
                message: "User not Authenticated",
                success: false
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }

        // Get the full user object from database
        const user = await User.findById(decode.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            })
        }

        // Set both id and user object for compatibility
        req.id = decode.userId;
        req.user = user;
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
}

export default isAuthenticated