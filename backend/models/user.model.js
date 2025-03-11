import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
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
    type: Number,
    required: true
  },
  profile: {
    profilePicture: { 
      type: String, 
      default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwcRgFA-KFW6u0wScyvZEBWMLME5WkdeCUg&s" 
    },
    coverPhoto: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
        default: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      }
    },
    bio: { 
      type: String 
    },
    favoriteGames: [{
      type: String,
    }]
  },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
