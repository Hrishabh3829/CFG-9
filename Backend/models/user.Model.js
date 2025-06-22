import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Admin', 'Frontliner', 'PartnerNGO'],
        required: true,
    },
    // Admin-specific fields
    adminSettings: {
        projectNotificationCount: {
            type: Number,
            default: 0,
        },
        notificationsEnabled: {
            type: Boolean,
            default: true,
        }
    },
    // NGO-specific fields
    ngoInfo: {
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        registrationNumber: {
            type: String,
        },
        contactPerson: {
            type: String,
        },
        phoneNumber: {
            type: String,
        }
    },
    // Frontliner-specific fields
    frontlinerInfo: {
        region: {
            type: String,
        },
        assignedProjects: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }],
        supervisor: {
            type: String,
        }
    },
    // Common fields
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
