import { User } from "../models/user.Model.js";
import { Project } from "../models/project.Model.js";

// Get NGO dashboard
export const getNGODashboard = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Verify the user is requesting their own dashboard
        if (req.user._id.toString() !== userId) {
            return res.status(403).json({ message: "Access denied" });
        }

        // Get NGO's projects
        const projects = await Project.find({ createdBy: userId });
        const activeProjects = projects.filter(p => p.status === 'active');
        const completedProjects = projects.filter(p => p.status === 'completed');
        const pendingProjects = projects.filter(p => p.status === 'pending');

        // Get funding statistics
        const totalFunding = projects.reduce((sum, project) => sum + (project.funding || 0), 0);
        const pendingFunding = projects
            .filter(p => p.fundingStatus === 'pending')
            .reduce((sum, project) => sum + (project.funding || 0), 0);

        const dashboardData = {
            totalProjects: projects.length,
            activeProjects: activeProjects.length,
            completedProjects: completedProjects.length,
            pendingProjects: pendingProjects.length,
            totalFunding: totalFunding,
            pendingFunding: pendingFunding,
            recentProjects: projects.slice(0, 5), // Last 5 projects
            performanceMetrics: {
                completionRate: projects.length > 0 ? (completedProjects.length / projects.length) * 100 : 0,
                averageProjectDuration: 0, // Calculate average project duration
                fundingUtilization: totalFunding > 0 ? ((totalFunding - pendingFunding) / totalFunding) * 100 : 0
            }
        };

        res.status(200).json({
            success: true,
            message: "Dashboard data retrieved successfully",
            data: dashboardData
        });
    } catch (error) {
        console.error("Error getting NGO dashboard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get NGO projects
export const getNGOProjects = async (req, res) => {
    try {
        const userId = req.user._id;

        const projects = await Project.find({ createdBy: userId })
            .populate('assignedTo', 'name email');

        res.status(200).json({
            success: true,
            message: "Projects retrieved successfully",
            projects: projects
        });
    } catch (error) {
        console.error("Error getting NGO projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Create new project
export const createNGOProject = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, description, objectives, budget, timeline, location, category } = req.body;

        const newProject = new Project({
            title,
            description,
            objectives,
            budget,
            timeline,
            location,
            category,
            createdBy: userId,
            status: 'pending',
            progress: 0
        });

        await newProject.save();

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            project: newProject
        });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update project
export const updateNGOProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user._id;
        const updateData = req.body;

        const project = await Project.findOne({
            _id: projectId,
            createdBy: userId
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Update project fields
        Object.keys(updateData).forEach(key => {
            if (key !== '_id' && key !== 'createdBy') {
                project[key] = updateData[key];
            }
        });

        project.lastUpdated = new Date();
        await project.save();

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project: project
        });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete project
export const deleteNGOProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user._id;

        const project = await Project.findOneAndDelete({
            _id: projectId,
            createdBy: userId
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get project details
export const getNGOProjectDetails = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user._id;

        const project = await Project.findOne({
            _id: projectId,
            createdBy: userId
        }).populate('assignedTo', 'name email');

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

// Get NGO profile
export const getNGOProfile = async (req, res) => {
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
        console.error("Error getting NGO profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update NGO profile
export const updateNGOProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, phone, address, ngoInfo } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (address) user.address = address;
        if (ngoInfo) user.ngoInfo = { ...user.ngoInfo, ...ngoInfo };

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: user
        });
    } catch (error) {
        console.error("Error updating NGO profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get funding status
export const getNGOfundingStatus = async (req, res) => {
    try {
        const userId = req.user._id;

        const projects = await Project.find({ createdBy: userId });

        const fundingData = {
            totalRequested: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
            totalApproved: projects
                .filter(p => p.fundingStatus === 'approved')
                .reduce((sum, p) => sum + (p.funding || 0), 0),
            totalDisbursed: projects
                .filter(p => p.fundingStatus === 'disbursed')
                .reduce((sum, p) => sum + (p.funding || 0), 0),
            pendingRequests: projects.filter(p => p.fundingStatus === 'pending').length,
            approvedRequests: projects.filter(p => p.fundingStatus === 'approved').length,
            rejectedRequests: projects.filter(p => p.fundingStatus === 'rejected').length
        };

        res.status(200).json({
            success: true,
            message: "Funding status retrieved successfully",
            funding: fundingData
        });
    } catch (error) {
        console.error("Error getting funding status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Submit funding request
export const submitFundingRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { projectId, amount, purpose, timeline, documents } = req.body;

        const project = await Project.findOne({
            _id: projectId,
            createdBy: userId
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Create funding request
        const fundingRequest = {
            amount,
            purpose,
            timeline,
            documents: documents || [],
            submittedAt: new Date(),
            status: 'pending'
        };

        project.fundingRequests = project.fundingRequests || [];
        project.fundingRequests.push(fundingRequest);
        project.fundingStatus = 'pending';
        project.lastUpdated = new Date();

        await project.save();

        res.status(200).json({
            success: true,
            message: "Funding request submitted successfully",
            fundingRequest: fundingRequest
        });
    } catch (error) {
        console.error("Error submitting funding request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get NGO reports
export const getNGOReports = async (req, res) => {
    try {
        const userId = req.user._id;

        const projects = await Project.find({ createdBy: userId });

        const reports = projects
            .filter(p => p.reports && p.reports.length > 0)
            .flatMap(p => p.reports.map(report => ({
                ...report.toObject(),
                projectTitle: p.title,
                projectId: p._id
            })));

        res.status(200).json({
            success: true,
            message: "Reports retrieved successfully",
            reports: reports
        });
    } catch (error) {
        console.error("Error getting NGO reports:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Generate report
export const generateReport = async (req, res) => {
    try {
        const userId = req.user._id;
        const { projectId, reportType, content, attachments } = req.body;

        const project = await Project.findOne({
            _id: projectId,
            createdBy: userId
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Create report
        const report = {
            type: reportType,
            content,
            attachments: attachments || [],
            generatedBy: userId,
            generatedAt: new Date(),
            status: 'draft'
        };

        project.reports = project.reports || [];
        project.reports.push(report);
        project.lastUpdated = new Date();

        await project.save();

        res.status(200).json({
            success: true,
            message: "Report generated successfully",
            report: report
        });
    } catch (error) {
        console.error("Error generating report:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 