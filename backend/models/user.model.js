import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['Admin', 'FacultyCoordinator', 'StudentCoordinator', 'Student'],
        require: true,
        default: 'Student'
    },
    department: {
        type: String,
        require: true
    },
    profile: {
        phoneNumber: { type: String },
        profilePicture: { type: String, default: "" }, // URL or path to the profile picture
        bio: { type: String }, // Optional bio or description
        favoriteGames: [{
            type: String,
        }]
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema)