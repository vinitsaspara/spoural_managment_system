
import { User } from "../models/user.model.js"



export const register = async (req, res) => {
    try {
        const { userId, fullname, email, password, department, phoneNumber, role } = req.body;

        if (!userId || !fullname || !email || !password || !department || !phoneNumber || !role) {
            return res.status(400).json({
                message: "All fields are required",
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

        // Upload profile picture to Cloudinary if file exists


        // Create a new user
        await User.create({
            userId,
            fullname,
            email,
            password,
            department,
            phoneNumber,
            role,
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

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
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
                    userId:user.userId,
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
        const isPasswordValid = req.password === user.password ? true : false;
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
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
            userId:user.userId,
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


export const getAllMembers = async (req, res) => {
    try {
      // Filter for users whose role is either "Faculty" or "StudentCoordinator"
      const members = await User.find({
        role: { $in: ["Faculty", "StudentCoordinator"] }
      });
  
      // Always return an array, even if empty
      return res.status(200).json({
        message: "Members fetched successfully",
        members, // This is an array of user documents
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

export const removeMember = async (req, res) => {
  try {
    // Ensure the request is coming from an admin
    const adminUser = await User.findById(req.id);
    if (!adminUser || adminUser.role !== "Admin") {
      return res.status(403).json({
        message: "Access denied. Only admins can remove members.",
        success: false,
      });
    }

    // Get the ID of the member to remove from URL parameters
    const memberId = req.params.id;

    // Find the member by their MongoDB _id
    const member = await User.findById(memberId);
    if (!member) {
      return res.status(404).json({
        message: "Member not found.",
        success: false,
      });
    }

    // Optionally, prevent admin from being removed by mistake
    if (member.role === "Admin") {
      return res.status(400).json({
        message: "Cannot remove an admin member.",
        success: false,
      });
    }

    // Remove the member
    await member.deleteOne();

    return res.status(200).json({
      message: "Member removed successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error in removeMember:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
