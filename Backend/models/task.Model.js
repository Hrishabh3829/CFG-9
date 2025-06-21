import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Submitted', 'Overdue', 'Completed'],
        default: 'Pending',
    },
    submission: {
        fileUrl: {
            type: String,
        },
        submissionDate: {
            type: Date,
        }
    }
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema); 