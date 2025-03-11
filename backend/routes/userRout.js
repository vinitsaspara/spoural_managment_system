import express from "express";
import { 
  login, 
  logout, 
  register, 
  updateCoverPhoto, 
  updateProfile 
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// Auth routes
router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);

// Profile routes
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/profile/coverimg").put(isAuthenticated, singleUpload, updateCoverPhoto);

export default router;
