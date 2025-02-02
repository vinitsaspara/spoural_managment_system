import express from "express"
import { createGame, getGame, getGameById, removeGame } from "../controllers/game.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import  isAdmin  from "../middlewares/isAdmin.js";
import { singleUpload } from "../middlewares/multer.js";


const router = express.Router();

router.route("/creategame").post(isAdmin,singleUpload,createGame);
router.route("/getgame").get(isAuthenticated,getGame);
router.route("/getgame/:id").get(isAuthenticated,getGameById);
router.route("/remove/:id").delete(isAdmin,removeGame);

export default router;