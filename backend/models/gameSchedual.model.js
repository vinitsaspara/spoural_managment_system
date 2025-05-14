import mongoose from "mongoose";

const GameScheduleSchema = new mongoose.Schema({
  gameName: { type: String, required: true },
  teams: [{ type: String, required: true }], // Array of team names
  matchDate: { type: Date, required: true }, // Date of the match
  matchTime: { type: String, required: true }, // Time in HH:MM format
  venue: { type: String, required: true }, // Location of the match
  scheduledMonth: { type: String, required: true }, // Manually set month & year
  createdAt: { type: Date, default: Date.now }, // Timestamp when added
});

export default mongoose.model("GameSchedule", GameScheduleSchema);
