import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js'; // Adjust the path to your user model

const isStudentCordinator = async (req, res, next) => {
    try {
        // Extract the token from cookies
<<<<<<< HEAD
=======

>>>>>>> origin/Harsh
        const token = req?.cookies?.token;
        console.log(token);


        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Find the user by ID
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user role is Admin
        if (user.role !== 'StudentCoordinator') {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }

        // Attach the user to the request object for further use
        req.id = user._id;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
    }
};

export default isStudentCordinator;