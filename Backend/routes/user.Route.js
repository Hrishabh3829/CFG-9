import express from "express";
import { register, login, logout, createTestUser, createTestFrontliner, createTestNGO } from "../controllers/user.Controller.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login); 
router.get("/logout", logout); 
router.post("/create-test-user", createTestUser); // Test endpoint
router.post("/create-test-frontliner", createTestFrontliner); // Test endpoint
router.post("/create-test-ngo", createTestNGO); // Test endpoint

export default router;