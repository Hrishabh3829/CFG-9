import express from "express";
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} from "../controllers/project.Controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Route to create a new project
router.post("/",isAuthenticated, createProject);

// Route to get all projects
router.get("/", isAuthenticated,getAllProjects);

// Route to get a single project by ID
router.get("/:projectId",isAuthenticated, getProjectById);

// Route to update a project
router.put("/:projectId",isAuthenticated, updateProject);

// Route to delete a project
router.delete("/:projectId",isAuthenticated, deleteProject);

export default router; 