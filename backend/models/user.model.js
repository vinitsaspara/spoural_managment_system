import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'FacultyCoordinator', 'StudentCoordinator', 'Student'],
        required: true,
        default: 'Student'
    },
    department: {
        type: String,
        required: true
    },
    phoneNumber: { 
        type: Number ,
        required: true
    },
    profile: {
        profilePicture: { type: String, default: "" }, // URL or path to the profile picture
        bio: { type: String }, // Optional bio or description
        favoriteGames: [{
            type: String,
        }]
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema)