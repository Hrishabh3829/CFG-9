import express from "express";
import {
    createNGO,
    createFrontliner,
    getAllNGOs,
    getAllFrontliners,
    updateAdminSettings,
    getAdminDashboard,
    toggleUserStatus
} from "../controllers/admin.Controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// Admin-only routes - all require authentication and admin privileges
router.use(isAuthenticated);
router.use(isAdmin);

// Create new NGO (Admin only)
router.post("/ngos", isAuthenticated,isAdmin,createNGO);

// Create new Frontliner (Admin only)
router.post("/frontliners", createFrontliner);

// Get all Partner NGOs
router.get("/ngos", getAllNGOs);

// Get all Frontliners
router.get("/frontliners", getAllFrontliners);

// Update admin settings
router.put("/settings/:userId", updateAdminSettings);

// Get admin dashboard
router.get("/dashboard/:userId", getAdminDashboard);

// Toggle user status (activate/deactivate)
router.put("/users/:userId/status", toggleUserStatus);

export default router; 