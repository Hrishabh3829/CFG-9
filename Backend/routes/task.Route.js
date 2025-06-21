import express from "express";
import {
    createTask,
    getProjectTasks,
    updateTask,
    deleteTask,
    submitTask
} from "../controllers/task.Controller.js";

const router = express.Router();

// Route to create a new task
router.post("/", createTask);

// Route to get all tasks for a specific project
router.get("/project/:projectId", getProjectTasks);

// Route to update a task's details
router.put("/:taskId", updateTask);

// Route to delete a task
router.delete("/:taskId", deleteTask);

// Route for a user to submit their work for a task
router.post("/:taskId/submit", submitTask);

export default router; 