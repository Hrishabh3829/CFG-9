import express from "express";
import { getProfile, login, logout, register, resendVerificationEmail, verifyEmail } from "../controllers/user.Controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login); 
router.get("/logout", logout); 
router.get("/profile", isAuthenticated, getProfile);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);

export default router;