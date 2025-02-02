import { Game } from "../models/game.model.js"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

// create game is not working in the postman because we are not share logo in the postman.
export const createGame = async (req, res) => {
    try {
      // Destructure required fields from req.body
      const { gameName, description, location, gameCatagory, skills } = req.body;
      // Get the logo file from the request
      // console.log(gameName, description, location, gameCatagory, skills);
      
      const file = req.file;
  
      // Validate required fields (including the logo file)
      if (!file || !gameName || !gameCatagory || !skills || !location) {
        return res.status(400).json({
          message: "Missing required fields.",
          success: false
        });
      }
  
      // Upload the logo to Cloudinary
      const fileUri = getDataUri(file);
      const uploadResult = await cloudinary.uploader.upload(fileUri.content, {
        folder: "game_logos"  // Upload folder for game logos
      });
      const logoUrl = uploadResult.secure_url;
  
      // Convert skills from a comma-separated string to an array
      const skillArray = skills.split(",").map(skill => skill.trim());
  
      // Check if the game already exists
      let game = await Game.findOne({ gameName });
      if (game) {
        return res.status(400).json({ 
          message: "Game already exists.", 
          success: false 
        });
      }
  
      // Create a new game, including the logo URL and userId from req.id
      game = await Game.create({
        gameCatagory,
        gameName,
        description,
        location,
        skills: skillArray,
        logo: logoUrl,    // Save the Cloudinary URL for the logo
        userId: req.id
      });
  
      res.status(201).json({
        message: "Game created successfully",
        game,
        success: true
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
  };


export const getGame = async (req, res) => {
    try {
        // Fetch all games and populate user details
        const games = await Game.find().populate("userId", "fullname email");

        if (games.length === 0) {
            return res.status(404).json({
                message: "No games found.",
                success: false
            });
        }

        return res.status(200).json({
            games,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


//  get game by id

export const getGameById = async (req, res) => {
    try {

        const gameId = req.params.id;
        const game = await Game.findById(gameId).populate({
            path: "players",
        });

        if (!game) {
            return res.status(404).json({
                message: "Game not found",
                success: false
            })
        };

        return res.status(200).json({
            game,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}


//  update game we will see letter

export const removeGame = async (req, res) => {
  try {
    // console.log("dfsasdf");
    
    const { id } = req.params; // Get the game ID from the request params

    // Check if the game exists
    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({
        message: "Game not found",
        success: false
      });
    }

    // Delete the game
    await game.deleteOne();

    return res.status(200).json({
      message: "Game removed successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};
