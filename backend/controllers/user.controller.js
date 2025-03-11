
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";


// Signup Function
export const register = async (req, res) => {
    try {
        const { userId, fullname, email, password, department, phoneNumber } = req.body;
        const file = req.file;

        if (!userId || !fullname || !email || !password || !department || !phoneNumber) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const firstString = userId;
        const secondString = department;

        if (!firstString.includes(secondString)) {
            return res.status(400).json({
                message: "Check Department & Id No.",
                success: false
            });
        }


        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
                success: false
            });
        }
        const existingUserId = await User.findOne({ userId });
        if (existingUserId) {
            return res.status(400).json({
                message: "UserId already exists",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload profile picture to Cloudinary if file exists
        let profilePicture = "";
        if (file) {
            const fileUri = getDataUri(file);
            const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
                folder: "profile_pictures"
            });
            profilePicture = uploadResult.secure_url; // Store the image URL
        }

        // Create a new user
        await User.create({
            userId,
            fullname,
            email,
            password: hashedPassword,
            department,
            phoneNumber,
            profile: {
                profilePicture: profilePicture // Store Cloudinary URL
            }
        });

        return res.status(201).json({
            message: 'User registered successfully!',
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};




// Login Function
export const login = async (req, res) => {
    try {
        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            });
        }

        // Convert userId to lowercase for case-insensitive matching
        const user = await User.findOne({ userId: { $regex: new RegExp(`^${userId}$`, "i") } });
        

        if (!user) {
            return res.status(400).json({
                message: "Invalid user ID or password",
                success: false
            });
        }

        // Password validation
        let isPasswordValid = false;

        if (user.role === "Student" || user.role === "Admin") {
            isPasswordValid = await bcrypt.compare(password, user.password);
        } else {
            isPasswordValid = password === user.password; // Admin, Faculty, Student Coordinator passwords are not hashed
        }

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid user ID or password",
                success: false
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.SECRET_KEY, // Store secret key in environment variables
            { expiresIn: "1d" }
        );

        // User data without sensitive password
        const userData = {
            _id: user._id,
            userId: user.userId,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            department: user.department,
            profile: user.profile
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                message: `Welcome back ${userData.fullname}`,
                user: userData,
                success: true,
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};





export const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict" });

        // Send a single response
        return res.status(200).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (err) {
        console.log(err);
    }
};

//  copy past from job portel project below function. 

export const updateProfile = async (req, res) => {
    try {
        const { department, phoneNumber, bio, fullname, favoriteGames } = req.body;
        const file = req.file;

        // Find user by ID
        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Upload new profile picture to Cloudinary if file exists
        if (file) {
            const fileUri = getDataUri(file);
            const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
                folder: "profile_pictures"
            });
            user.profile.profilePicture = uploadResult.secure_url; // Update profile picture
        }

        // Update other profile fields
        if (fullname) user.fullname = fullname;
        if (department) user.department = department;
        if (bio) user.profile.bio = bio;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (favoriteGames) user.profile.favoriteGames = favoriteGames.split(",");

        await user.save();

        // Format response to send updated user data
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profile: user.profile,
            phoneNumber: user.phoneNumber,
            department: user.department,
            role: user.role
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred",
            success: false,
        });
    }
};



export const updateCoverPhoto = async (req, res) => {
    try {
      // Check if file exists
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload an image"
        });
      }

    //   console.log(req.file);

      
  
      const user = await User.findById(req.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      // Delete old cover photo from cloudinary if it exists
      if (user.profile.coverPhoto?.public_id) {
        await cloudinary.uploader.destroy(user.profile.coverPhoto.public_id);
      }
  
      // Convert file to DataURI
      const fileUri = getDataUri(req.file);
  
      // Upload new image to cloudinary
      const result = await cloudinary.uploader.upload(fileUri.content, {
        folder: "cover_photos"
      });
  
      // Update user's cover photo
      user.profile.coverPhoto = {
        public_id: result.public_id,
        url: result.secure_url
      };
  
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Cover photo updated successfully",
        coverPhoto: user.profile.coverPhoto
      });
  
    } catch (error) {
      console.error("Error in updateCoverPhoto:", error);
      res.status(500).json({
        success: false,
        message: "Error updating cover photo",
        error: error.message
      });
    }
  };