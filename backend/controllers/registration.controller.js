import { Registration } from "../models/registration.model.js";
import { Game } from "../models/game.model.js"
import { User } from "../models/user.model.js";

export const registorGame = async (req, res) => {
    try {

        const userId = req.id;
        const gameId = req.params.id;

        if (!gameId) {
            return res.status(400).json({ message: "Game id is required", success: false });
        }

        // check if the user has alredy register for the game

        const existingRegistration = await Registration.findOne({ student: userId, game: gameId });

        if (existingRegistration) {
            return res.status(400).json({ message: "You have already register for this game", success: false })
        }

        const game = await Game.findById(gameId);

        if (!game) {
            return res.status(404).json({ message: "Game not found", success: false });
        }

        const newRegistration = await Registration.create({
            student: userId,
            game: gameId,
        })

        // console.log(newRegistration._id);


        game.players.push(newRegistration._id);
        await game.save();

        return res.status(201).json({
            message: "Registration successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

// get registed games

export const getRegistedGames = async (req, res) => {
    try {

        const userId = req.id;


        const registration = await Registration.find({ student: userId }).sort({ createdAt: -1 }).populate({
            path: 'game',
            options: { sort: { createdAt: -1 } }
            // populate:{
            //     path:'players',
            //     options: { sort: { createdAt: -1 } },
            // populate:{
            //     path:'student',
            //     options: { sort: { createdAt: -1 } },
            // }
            // }
        });

        if (!registration) {
            return res.status(404).json({ message: "No registered games found", success: false });
        }

        return res.status(200).json({
            message: "Registared found",
            registration,
            success: true,
        })

    } catch (error) {
        console.log(error);

    }
}

// now see the how many student resiter for perticular game so we given to access only student cordinator and admin to see the list of the how many student register for the game.
export const getPlayers = async (req, res) => {
    try {
        const userId = req.id;
        const gameId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Corrected query using _id
        const game = await Game.findById(gameId).populate({
            path: 'players',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'student',
                options: { sort: { createdAt: -1 } }
            }
        });

        if (!game) {
            return res.status(404).json({ message: "Game not found", success: false });
        }

        const filteredPlayers = game.players.filter(player =>
            player.student.department === user.department
        );

        if (filteredPlayers.length === 0) {
            return res.status(403).json({
                message: "No players from the same department as the user",
                success: false
            });
        }

        return res.status(200).json({
            game: { ...game.toObject(), players: filteredPlayers },
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


//  update the status

export const updateStatus = async (req, res) => {
    try {

        const { status } = req.body;
        const registrationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            })
        }

        // find the registartion by registartion id

        const registartion = await Registration.findOne({ _id: registrationId }).populate('student');

        if (!registartion) {
            return res.status(404).json({
                message: "Registration not found",
                succes: false
            })
        }

        registartion.status = status.toLowerCase();

        await registartion.save();


        return res.status(200).json({
            message: "status updated successfully ",
            registartion,
            success: true,
        })

    } catch (error) {
        console.log(error);

    }
}


export const getselectedPlayers = async (req, res) => {
    try {
        const gameId = req.params.id;
        const userId = req.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const game = await Game.findById(gameId).populate({
            path: 'players',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'student',
                options: { sort: { createdAt: -1 } }
            }
        });

        if (!game) {
            return res.status(404).json({ message: "Game not found", success: false });
        }

        const filteredPlayers = game.players.filter(player =>
            player.student.department === user.department && player.status === 'selected'
        );

        if (filteredPlayers.length === 0) {
            return res.status(403).json({
                message: "No players from the same department as the user",
                success: false
            });
        }

        return res.status(200).json({
            game: { ...game.toObject(), players: filteredPlayers },
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
}

export const getAllPlayers = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const games = await Game.find().populate({
            path: 'players',
            options: { sort: { createdAt: -1 } },
            populate: [
                {
                    path: 'student',
                    select: 'fullname email phoneNumber userId department',
                    options: { sort: { createdAt: -1 } }
                },
                {
                    path: 'game',
                    select: 'gameName'
                }
            ]
        });

        if (games.length === 0) {
            return res.status(404).json({ message: "No games found", success: false });
        }

        const filteredPlayers = games.flatMap(game =>
            game.players.filter(player => player.student.department === user.department && player.status === 'selected')
        );

        if (filteredPlayers.length === 0) {
            return res.status(403).json({
                message: "No players from the same department as the user",
                success: false
            });
        }

        const playerDetails = filteredPlayers.map(player => ({
            userId: player.student.userId,
            fullname: player.student.fullname,
            email: player.student.email,
            phoneNumber: player.student.phoneNumber,
            gameName: player.game.gameName,
            status: player.status
        }));

        // Sorting by gameName first, then by userId
        playerDetails.sort((a, b) => {
            if (a.gameName === b.gameName) {
                return a.userId.localeCompare(b.userId); // Sorting by userId if gameName is the same
            }
            return a.gameName.localeCompare(b.gameName); // Sorting by gameName
        });

        return res.status(200).json({
            players: playerDetails,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
