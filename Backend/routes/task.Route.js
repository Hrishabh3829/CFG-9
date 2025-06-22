import express from "express";
import multer from "multer";
import {
    createTask,
    getProjectTasks,
    updateTask,
    deleteTask,
    submitTask
} from "../controllers/task.Controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                message: "File too large. Maximum size is 10MB." 
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({ 
                message: "Too many files. Only 1 file allowed." 
            });
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ 
                message: "Unexpected field. Make sure the file field is named 'file'." 
            });
        }
        return res.status(400).json({ 
            message: `Upload error: ${error.message}` 
        });
    }
    
    if (error.message.includes('File type not allowed')) {
        return res.status(400).json({ 
            message: error.message 
        });
    }
    
    next(error);
};

// Route to create a new task
router.post("/", isAuthenticated, createTask);

// Route to get all tasks for a specific project
router.get("/project/:projectId", isAuthenticated, getProjectTasks);

// Route to update a task's details
router.put("/:taskId", isAuthenticated, updateTask);

// Route to delete a task
router.delete("/:taskId", isAuthenticated, deleteTask);

// Route for a user to submit their work for a task
router.post("/:taskId/submit", 
    isAuthenticated, 
    upload.single('file'), 
    handleMulterError,
    submitTask
);

export default router; 