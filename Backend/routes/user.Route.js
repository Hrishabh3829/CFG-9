import express from "express";
import { register, login, logout, createTestUser } from "../controllers/user.Controller.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login); 
router.get("/logout", logout); 
router.post("/create-test-user", createTestUser); // Test endpoint

export default router;