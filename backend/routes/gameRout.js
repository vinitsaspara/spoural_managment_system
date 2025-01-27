import express from "express"
import { createGame, getGame, getGameById } from "../controllers/game.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import  isAdmin  from "../middlewares/isAdmin.js";


const router = express.Router();

router.route("/creategame").post(isAdmin,createGame);
router.route("/getgame").get(isAdmin,getGame);
router.route("/getgame/:id").get(isAdmin,getGameById);

export default router;