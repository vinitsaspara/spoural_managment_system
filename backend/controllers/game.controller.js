import { Game } from "../models/game.model.js"

export const createGame = async (req, res) => {
    try {
        const { gameName, description, gameCatagory, skills } = req.body;

        if (!gameName || !gameCatagory || !skills) {
            return res.status(400).json({
                message: "Missing required fields.",
                success: false
            });
        }

        // Convert skills from a comma-separated string to an array
        const skillArray = skills.split(",").map(skill => skill.trim());

        // Check if the game already exists
        let game = await Game.findOne({ gameName });

        if (game) {
            return res.status(400).json({ message: "Game already exists.", success: false });
        }

        game = await Game.create({
            gameCatagory,
            gameName,
            description,
            skills: skillArray,  // Store skills as an array
            userId: req.id
        });

        res.status(201).json({
            message: "Game created successfully",
            game,
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};


export const getGame = async (req, res) => {
    try {

        const userId = req.id;

        //    console.log(userId);


        const games = await Game.find({ userId });

        if (!games) {
            return res.status(404).json({
                message: "No any game created",
                success: false
            })
        }

        return res.status(200).json({
            games,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

//  get game by id

export const getGameById = async (req, res) => {
    try {

        const gameId = req.params.id;
        const game = await Game.findById(gameId);

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

// export const updateGame = async (req,res) =>{

// }