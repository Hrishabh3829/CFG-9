import express from "express";
import {
    getFrontlinerDashboard,
    getAssignedProjects,
    getProjectDetails,
    updateProjectProgress,
    submitProjectReport,
    getFrontlinerProfile,
    updateFrontlinerProfile,
    getFrontlinerTasks,
    updateTaskStatus
} from "../controllers/frontliner.Controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isFrontliner from "../middleware/isFrontliner.js";

const router = express.Router();

// Frontliner routes - all require authentication and frontliner privileges
router.use(isAuthenticated);
router.use(isFrontliner);

// Get frontliner dashboard
router.get("/dashboard/:userId", getFrontlinerDashboard);

// Get assigned projects
router.get("/projects", getAssignedProjects);

// Get project details
router.get("/projects/:projectId", getProjectDetails);

// Update project progress
router.put("/projects/:projectId/progress", updateProjectProgress);

// Submit project report
router.post("/projects/:projectId/reports", submitProjectReport);

// Get frontliner profile
router.get("/profile", getFrontlinerProfile);

// Update frontliner profile
router.put("/profile", updateFrontlinerProfile);

// Get frontliner tasks
router.get("/tasks", getFrontlinerTasks);

// Update task status
router.put("/tasks/:taskId/status", updateTaskStatus);

export default router; 