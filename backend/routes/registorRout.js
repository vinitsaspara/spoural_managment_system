import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { getAllPlayers, getPlayers, getRegistedGames, getselectedPlayers, registorGame, updateStatus, getUserAppliedGames } from "../controllers/registration.controller.js";
// import isStudentCordinator from "../middlewares/isStudentCordinator.js";

console.log("Registering routes...");

const router = express.Router();

//  is admin no vahivat karvano che khali student cordinator and admin ne j access apvanu che last three route nu.

router.route("/applied-games").get(isAuthenticated, getUserAppliedGames);

router.route("/registor/:id").get(isAuthenticated , registorGame);
router.route("/getresistedgame").get(isAuthenticated , getRegistedGames);
router.route("/:id/getselectedplayers").get(isAuthenticated, getselectedPlayers);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
router.route("/:id/getplayers").get(isAuthenticated, getPlayers);
router.route("/feculty/getallplayers").get(isAuthenticated, getAllPlayers);

console.log("Routes registered successfully");

export default router;