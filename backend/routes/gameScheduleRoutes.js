import express from "express";
import {
  createGameSchedule,
  getAllGameSchedules,
  getSchedulesByMonth,
  updateGameSchedule,
  deleteGameSchedule,
} from "../controllers/gameScheduleController.js";
import isAdmin from "../middlewares/isAdmin.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Create a new game schedule (only admin can create)
router.route("/create").post(isAdmin, createGameSchedule);

// Get all game schedules
router.route("/allschedual").get(isAuthenticated,getAllGameSchedules);

// Get schedules by month and year
router.route("/:month/:year").get(isAuthenticated,getSchedulesByMonth);

// Update a game schedule
router.route("/update/:id").put(isAdmin,updateGameSchedule);

// Delete a game schedule
router.route("/delete/:id").delete(isAdmin, deleteGameSchedule);

export default router;
