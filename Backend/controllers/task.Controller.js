import { Task } from "../models/task.Model.js";
import { Project } from "../models/project.Model.js";

// Create a new task
export const createTask = async (req, res) => {
    try {
        const { title, project, assignedTo, dueDate } = req.body;
        if (!title || !project || !assignedTo || !dueDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTask = new Task({
            title,
            project,
            assignedTo,
            dueDate
        });

        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all tasks for a specific project
export const getProjectTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'name role');
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a task
export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updates = req.body;
        
        const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Submit a document for a task
export const submitTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { fileUrl } = req.body;

        if (!fileUrl) {
            return res.status(400).json({ message: "File URL is required for submission" });
        }

        const submission = {
            fileUrl,
            submissionDate: new Date()
        };

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status: 'Submitted', submission },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task submitted successfully", task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}; 