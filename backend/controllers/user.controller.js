
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"


// Signup Function
export const register = async (req, res) => {
    try {
        const { fullname, email, password, department } = req.body;

        // console.log(fullname, email, password, role, department);

        // Check if the email is already registered

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        await User.create({
            fullname,
            email,
            password: hashedPassword,
            department, // Assign department for coordinators
        });

        res.status(201).json({
            message: 'User registered successfully!',
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};


// Login Function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // console.log(email, password, role);

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        // Check if the role is correct
        // if (role !== user.role) {
        //     return res.status(400).json({
        //         message: "Invalid role",
        //         success: false
        //     });
        // }

        // Generate a JWT token
        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.SECRET_KEY, // Store your secret key in environment variables
            { expiresIn: '1d' }
        );

        // Create a new user object without modifying the original `user`
        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            department: user.department,
            profile: user.profile
        };

        return res.status(200).cookie("token", token,
            { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome back ${userData.fullname}`,
                user: userData,
                success: true
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
        const { email, bio, fullname, favoriteGames } = req.body;
        const file = req.file;

        // Check if user exists
        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Update fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (bio) user.profile.bio = bio;
        if (favoriteGames) user.profile.favoriteGames = favoriteGames.split(",");

        // Handle file upload
        // if (file) {
        //     const fileUri = getDataUri(file);
        //     const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
        //         resource_type: "raw", // Ensure PDF or any non-image file is handled correctly
        //     });
        //     // console.log(uploadResult);

        //     user.profile.resume = uploadResult.secure_url;
        //     user.profile.resumeOriginalName = file.originalname;
        // }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
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