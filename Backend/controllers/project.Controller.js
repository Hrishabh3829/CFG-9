import { Project } from "../models/project.Model.js";
import { User } from "../models/user.Model.js";

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { name, startDate, partnerNgo, frontliners } = req.body;
        if (!name || !startDate || !partnerNgo) {
            return res.status(400).json({ message: "Name, start date, and partner NGO are required" });
        }

        const newProject = new Project({
            name,
            startDate,
            partnerNgo,
            frontliners
        });

        await newProject.save();
        res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('partnerNgo', 'name email')
            .populate('frontliners', 'name email');
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get a single project by ID
export const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId)
            .populate('partnerNgo', 'name email ngoInfo')
            .populate('frontliners', 'name email');

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update a project
export const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const updates = req.body;

        const updatedProject = await Project.findByIdAndUpdate(projectId, updates, { new: true });

        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const deletedProject = await Project.findByIdAndDelete(projectId);

        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}; 