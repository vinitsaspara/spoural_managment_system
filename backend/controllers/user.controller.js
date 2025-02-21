
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
        const { email, password, role } = req.body;

        // console.log(email, password, role);


        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            });
        }


        // Find the user by email
        const user = await User.findOne({ email });

        // console.log(user);


        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        if (!role) {
           
            if (user.role === "Admin") {

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(400).json({
                        message: "Invalid email or password",
                        success: false
                    });
                }

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
                    userId: user.userId,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
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

            } else {
                return res.status(400).json({
                    message: "Please fill in all fields",
                    success: false
                });
            }
        }


        // Compare the password
        if (role === 'Student') {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    message: "Invalid email or password",
                    success: false
                });
            }
        } else {
            const isPasswordValid = Number(password) === Number(user.password) ? true : false;

            if (!isPasswordValid) {
                return res.status(400).json({
                    message: "Invalid email or password",
                    success: false
                });
            }
        }


        // Check if the role is correct
        if (role !== user.role) {
            return res.status(400).json({
                message: "Invalid role",
                success: false
            });
        }

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
            userId: user.userId,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
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
