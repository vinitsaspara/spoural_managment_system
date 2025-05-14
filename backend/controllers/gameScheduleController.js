import GameSchedule from "../models/gameSchedual.model.js";

// Create a new game schedule
export const createGameSchedule = async (req, res) => {
  try {
    const { gameName, teams, matchDate, matchTime, venue } = req.body;

    // console.log(gameName, teams, matchDate, matchTime, venue);
    

    // Ensure required fields are provided
    if (!gameName || !teams || !matchDate || !matchTime || !venue) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Format month-year for easy filtering
    const scheduledMonth = new Date(matchDate).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    // Create new schedule
    const newSchedule = new GameSchedule({
      gameName,
      teams,
      matchDate,
      matchTime,
      venue,
      scheduledMonth,
    });

    await newSchedule.save();
    res.status(201).json({ message: "Game schedule created successfully!", success: true ,newSchedule });
  } catch (error) {
    res.status(500).json({ message: "Error creating schedule", error });
  }
};

// Get all game schedules
export const getAllGameSchedules = async (req, res) => {
  try {
    const schedules = await GameSchedule.find().sort({ matchDate: 1 });
    res.status(200).json({success: true, schedules });
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedules", error });
  }
};

// Get schedule by month
export const getSchedulesByMonth = async (req, res) => {
  try {
    const { month, year } = req.params;
    const scheduledMonth = `${month} ${year}`;

    const schedules = await GameSchedule.find({ scheduledMonth }).sort({ matchDate: 1 });

    if (!schedules.length) {
      return res.status(404).json({ message: "No schedules found for this month." });
    }

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schedules", error });
  }
};

// Update a schedule
export const updateGameSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSchedule = await GameSchedule.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found." });
    }

    res.status(200).json({ message: "Schedule updated successfully!", updatedSchedule });
  } catch (error) {
    res.status(500).json({ message: "Error updating schedule", error });
  }
};

// Delete a schedule
export const deleteGameSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSchedule = await GameSchedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found." });
    }

    res.status(200).json({ message: "Schedule deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting schedule", error });
  }
};
