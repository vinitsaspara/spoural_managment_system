import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { getPlayers, getRegistedGames, registorGame, updateStatus } from "../controllers/registration.controller.js";
import isStudentCordinator from "../middlewares/isStudentCordinator.js";



const router = express.Router();

//  is admin no vahivat karvano che khali student cordinator and admin ne j access apvanu che last three route nu.

router.route("/registor/:id").get(isAuthenticated, registorGame);
router.route("/getresistedgame").get(isAuthenticated, getRegistedGames);
router.route("/:id/getplayers").get(isAuthenticated, getPlayers);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;