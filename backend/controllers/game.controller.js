import {Game} from "../models/game.model.js"

export const createGame = async (req,res)=>{
    try {
        
        const {gameName,description} = req.body;

        if(!gameName){
            return res.status(400).json({
                message : "Game name is requied.",
                success : false
            })
        }

        //  check game is alredy created or not.
    
        let game = await Game.findOne({gameName});
        
        if(game){
            return res.status(400).json({message:"Game already exists.",success:false});
        }

        game = await Game.create({
            gameName,
            description,
            userId : req.id
        })

        res.status(201).json({
            message:"Game created successfully",
            game,
            success:true
        });

    } catch (error) {
        console.log(error);   
    }
}

export const getGame = async (req,res) =>{
    try {

       const userId = req.id;

    //    console.log(userId);
       

       const games = await Game.find({userId});

       if(!games){
        return res.status(404).json({
            message : "No any game created",
            success : false
        })
    }

    return res.status(200).json({
        games,
        success:true
    })
        
    } catch (error) {
        console.log(error);
    }
}

//  get game by id

export const getGameById = async (req,res) =>{
    try {
        
        const gameId = req.params.id;
        const game = await Game.findById(gameId);

        if(!game){
            return res.status(404).json({
                message : "Game not found",
                success : false
            })
        };

        return res.status(200).json({
            game,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}


//  update game we will see letter

// export const updateGame = async (req,res) =>{

// }