import express from 'express';
import { createPractice, getAllPractices, PrecticeSchedule, updatePracticeStatus } from '../controllers/prectice.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/create/:gameId").post(isAuthenticated, createPractice);
router.route("/getall").get(isAuthenticated, getAllPractices);
router.route("/update/:practiceId").put(isAuthenticated, updatePracticeStatus);
router.route("/schedule").get(isAuthenticated, PrecticeSchedule);

export default router;
