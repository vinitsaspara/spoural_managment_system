import express from "express"
import { getAllMembers, login, register, removeMember } from "../controllers/admin.controller.js";
import isAdmin from "../middlewares/isAdmin.js";

// import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAdmin, register);
router.route("/login").post(isAdmin,login);
router.route("/getallmembers").get(isAdmin, getAllMembers);
router.route("/membre/:id").delete(isAdmin, removeMember);

export default router;