import express from "express";
import {
    getNGODashboard,
    getNGOProjects,
    createNGOProject,
    updateNGOProject,
    deleteNGOProject,
    getNGOProjectDetails,
    getNGOProfile,
    updateNGOProfile,
    getNGOfundingStatus,
    submitFundingRequest,
    getNGOReports,
    generateReport
} from "../controllers/ngo.Controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isNGO from "../middleware/isNGO.js";

const router = express.Router();

// NGO routes - all require authentication and NGO privileges
router.use(isAuthenticated);
router.use(isNGO);

// Get NGO dashboard
router.get("/dashboard/:userId", getNGODashboard);

// Get NGO projects
router.get("/projects", getNGOProjects);

// Create new project
router.post("/projects", createNGOProject);

// Update project
router.put("/projects/:projectId", updateNGOProject);

// Delete project
router.delete("/projects/:projectId", deleteNGOProject);

// Get project details
router.get("/projects/:projectId", getNGOProjectDetails);

// Get NGO profile
router.get("/profile", getNGOProfile);

// Update NGO profile
router.put("/profile", updateNGOProfile);

// Get funding status
router.get("/funding", getNGOfundingStatus);

// Submit funding request
router.post("/funding/request", submitFundingRequest);

// Get NGO reports
router.get("/reports", getNGOReports);

// Generate report
router.post("/reports/generate", generateReport);

export default router; 