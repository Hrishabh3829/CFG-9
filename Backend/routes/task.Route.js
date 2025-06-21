import express from "express";
import {
    createTask,
    getProjectTasks,
    updateTask,
    deleteTask,
    submitTask
} from "../controllers/task.Controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Route to create a new task
router.post("/", isAuthenticated,createTask);

// Route to get all tasks for a specific project
router.get("/project/:projectId",isAuthenticated, getProjectTasks);

// Route to update a task's details
router.put("/:taskId", isAuthenticated,updateTask);

// Route to delete a task
router.delete("/:taskId", isAuthenticated,deleteTask);

// Route for a user to submit their work for a task
router.post("/:taskId/submit", isAuthenticated,submitTask);

export default router; 