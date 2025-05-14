import Practice from '../models/prectice.model.js';
import {
   User
} from '../models/user.model.js';

export const createPractice = async (req, res) => {
   try {
      const userId = req.id;
      const user = await User.findById(userId);

      if (!user) {
         return res.status(400).json({
            message: "User not found"
         });
      }

      const gameId = req.params.gameId;
      const department = user.department;

      const {
         title,
         practiceDate,
         startTime,
         endTime,
         venue
      } = req.body;

      const practice = await Practice.create({
         title,
         department,
         game: gameId,
         practiceDate,
         startTime,
         endTime,
         venue
      });

      res.status(201).json(practice);
   } catch (error) {
      res.status(500).json({
         message: error.message
      });
   }
}

export const getAllPractices = async (req, res) => {
   try {
      const userId = req.id;
      const user = await User.findById(userId);
      if (!user) {
         res.status(400).json({
            message: "User not found"
         })
      }
      const prectice = await Practice.find({
         department: user.department
      })
      if (!prectice) {
         res.status(400).json({
            message: "No practices found"
         })
      }
      res.status(200).json(prectice);

   } catch (e) {
      res.status(500).json({
         message: e.message
      });
   }
}

export const updatePracticeStatus = async (req, res) => {
   try {
      const userId = req.id;

      // Add await here
      const user = await User.findById(userId);
      if (!user) {
         return res.status(400).json({ // Add return
            message: "User not found"
         });
      }

      const practiceId = req.params.practiceId;

      // Add await here
      const practice = await Practice.findById(practiceId);
      if (!practice) {
         return res.status(400).json({ // Add return
            message: "Practice not found"
         });
      }

      practice.status = req.body.status;
      await practice.save();

      res.status(200).json({
         success: true,
         practice
      });
   } catch (e) {
      res.status(500).json({
         message: e.message
      });
   }
}

export const PrecticeSchedule = async (req, res) => {
   try {
      const userId = req.id;

      // Find user
      const user = await User.findById(userId);
      if (!user) {
         return res.status(400).json({
            message: "User not found"
         });
      }

      // Find practices related to the user's department
      const practices = await Practice.find({
            department: user.department
         })
         .populate({
            path: 'game',
            populate: {
               path: 'players',
               select: 'student status'
            }
         });

      if (!practices || practices.length === 0) {
         return res.status(400).json({
            message: "No practices found"
         });
      }

      

      const filteredPractices = practices
   .map((practice) => {
      try {

         return {
            Title: practice?.title || 'Untitled Practice',
            Date: practice?.practiceDate || 'Unknown date',
            Time: `${practice?.startTime || '??:??'} - ${practice?.endTime || '??:??'}`,
            Game: practice?.game?.gameName || 'Unknown Game',
            Players: practice?.game?.players,  // Only include selected players
            Venue: practice?.venue || 'Unknown venue',
            Status: practice?.status|| 'unknown'
         };
      } catch (error) {
         console.error('Error mapping practice:', error);
         return null;
      }
   })
   .filter(practice => practice.Status === "approved"); // Remove null values

      res.status(200).json({
         success: true,
         practice: filteredPractices
      });
   } catch (error) {
      res.status(500).json({
         message: error.message
      });
   }
};