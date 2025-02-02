import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true,
        unique:true
    },
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
        enum: ['Admin', 'Faculty', 'StudentCoordinator', 'Student'],
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
        profilePicture: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwcRgFA-KFW6u0wScyvZEBWMLME5WkdeCUg&s" }, // URL or path to the profile picture
        bio: { type: String }, // Optional bio or description
        favoriteGames: [{
            type: String,
        }]
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema)