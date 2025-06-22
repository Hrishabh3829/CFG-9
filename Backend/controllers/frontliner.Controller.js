import { User } from "../models/user.Model.js";
import { Project } from "../models/project.Model.js";
import { Task } from "../models/task.Model.js";

// Get frontliner dashboard
export const getFrontlinerDashboard = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Verify the user is requesting their own dashboard
        if (req.user._id.toString() !== userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        // Get assigned projects count
        const assignedProjects = await Project.find({ 
            assignedTo: userId,
            status: { $in: ['active', 'in-progress'] }
        });

        // Get tasks count
        const tasks = await Task.find({ assignedTo: userId });
        const activeTasks = tasks.filter(task => task.status === 'active');
        const completedTasks = tasks.filter(task => task.status === 'completed');

        // Get pending reports (projects that need reports)
        const pendingReports = await Project.find({
            assignedTo: userId,
            status: 'completed',
            reportSubmitted: false
        });

        const dashboardData = {
            assignedProjectsCount: assignedProjects.length,
            activeTasksCount: activeTasks.length,
            completedTasksCount: completedTasks.length,
            pendingReportsCount: pendingReports.length,
            recentActivity: [], // You can add recent activity logic here
            upcomingDeadlines: [], // You can add upcoming deadlines logic here
            performanceMetrics: {
                completionRate: tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0,
                averageTaskTime: 0, // Calculate average task completion time
                projectsCompleted: assignedProjects.filter(p => p.status === 'completed').length
            }
        };

        res.status(200).json({
            success: true,
            message: "Dashboard data retrieved successfully",
            data: dashboardData
        });
    } catch (error) {
        console.error("Error getting frontliner dashboard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get assigned projects
export const getAssignedProjects = async (req, res) => {
    try {
        const userId = req.user._id;

        const projects = await Project.find({ 
            assignedTo: userId 
        }).populate('createdBy', 'name email');

        res.status(200).json({
            success: true,
            message: "Assigned projects retrieved successfully",
            projects: projects
        });
    } catch (error) {
        console.error("Error getting assigned projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get project details
export const getProjectDetails = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user._id;

        const project = await Project.findOne({
            _id: projectId,
            assignedTo: userId
        }).populate('createdBy', 'name email');

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({
            success: true,
            message: "Project details retrieved successfully",
            project: project
        });
    } catch (error) {
        console.error("Error getting project details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update project progress
export const updateProjectProgress = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { progress, status, notes } = req.body;
        const userId = req.user._id;

        const project = await Project.findOne({
            _id: projectId,
            assignedTo: userId
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Update project progress
        project.progress = progress || project.progress;
        project.status = status || project.status;
        project.notes = notes || project.notes;
        project.lastUpdated = new Date();

        await project.save();

        res.status(200).json({
            success: true,
            message: "Project progress updated successfully",
            project: project
        });
    } catch (error) {
        console.error("Error updating project progress:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Submit project report
export const submitProjectReport = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { reportContent, attachments } = req.body;
        const userId = req.user._id;

        const project = await Project.findOne({
            _id: projectId,
            assignedTo: userId
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Create report object
        const report = {
            content: reportContent,
            attachments: attachments || [],
            submittedBy: userId,
            submittedAt: new Date(),
            status: 'submitted'
        };

        // Add report to project
        project.reports = project.reports || [];
        project.reports.push(report);
        project.reportSubmitted = true;
        project.lastUpdated = new Date();

        await project.save();

        res.status(200).json({
            success: true,
            message: "Project report submitted successfully",
            report: report
        });
    } catch (error) {
        console.error("Error submitting project report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get frontliner profile
export const getFrontlinerProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile retrieved successfully",
            user: user
        });
    } catch (error) {
        console.error("Error getting frontliner profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update frontliner profile
export const updateFrontlinerProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, phone, address, skills, experience } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (skills) user.skills = skills;
        if (experience) user.experience = experience;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: user
        });
    } catch (error) {
        console.error("Error updating frontliner profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get frontliner tasks
export const getFrontlinerTasks = async (req, res) => {
    try {
        const userId = req.user._id;

        const tasks = await Task.find({ 
            assignedTo: userId 
        }).populate('projectId', 'title description');

        res.status(200).json({
            success: true,
            message: "Tasks retrieved successfully",
            tasks: tasks
        });
    } catch (error) {
        console.error("Error getting frontliner tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status, notes } = req.body;
        const userId = req.user._id;

        const task = await Task.findOne({
            _id: taskId,
            assignedTo: userId
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update task
        task.status = status;
        task.notes = notes || task.notes;
        task.completedAt = status === 'completed' ? new Date() : null;
        task.lastUpdated = new Date();

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            task: task
        });
    } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 