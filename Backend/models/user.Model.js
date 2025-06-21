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
        enum: ['admin', 'frontliner', 'ngo'],
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiry: {
        type: Date,
    },
    ngoInfo: {
        name: {
            type: String,
        },
        address: {
            type: String,
        }
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
