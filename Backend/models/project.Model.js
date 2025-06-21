import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    partnerNgo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    frontliners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    status: {
        type: String,
        enum: ['Active', 'Completed'],
        default: 'Active',
    }
}, { timestamps: true });

export const Project = mongoose.model("Project", projectSchema); 