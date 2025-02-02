import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleGame } from "@/redux/gameSlice";
import { GAME_API_END_POINT, REGISTER_IN_GAME_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

// const allSkill = ["Speed", "Strength", "Flexibility"];

function GameDetails() {
  
  const dispatch = useDispatch();
  const params = useParams();
  const gameId = params.id;
  const {singleGame} = useSelector(store=>store.game);
  const {user} = useSelector(store=>store.auth);
  const isInitiallyAplied = singleGame?.players?.some(apply=>apply.student === user?._id) || false;
  const [isApplied,setIsApplied] = useState(isInitiallyAplied);

  const applyGameHandler = async () =>{
    try {
      
      const res = await axios(`${REGISTER_IN_GAME_API_END_POINT}/registor/${gameId}`,{withCredentials:true});
      // console.log(res);
      
      if(res.data.success){
        setIsApplied(true); // update the local state
        const updatedSingleGame = {...singleGame,players:[...singleGame.players,{student:user?._id}]}
        dispatch(setSingleGame(updatedSingleGame)); // real time ui and tota player update.
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const fetchSingleGame = async () =>{
        try {
            const res = await axios.get(`${GAME_API_END_POINT}/getgame/${gameId}`,{withCredentials:true});
            console.log(res);
            
            if(res.data.success){
                dispatch(setSingleGame(res.data.game));
                setIsApplied(res.data.game.players.some(apply=>apply.student === user._id));
            }

        } catch (error) {
            console.log(error);
        }
    }
    fetchSingleGame();
  },[gameId,dispatch,user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 shadow-lg p-5 rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg">{singleGame?.gameName}</h1>
        </div>

        <Button
          onClick = {isInitiallyAplied ? null : applyGameHandler}
          className={`rounded-md ${
            isInitiallyAplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#903b3b] hover:bg-[#d98825]"
          }`}
        >
          {isInitiallyAplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Game Details
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1 flex items-center gap-2">
            Name:
            <div>
              <span className="p-4 font-normal text-gray-800">{singleGame?.gameName}</span>
            </div>
          </h1>
          <h1 className="font-bold my-1">
            Category:
            <span className="p-4 font-normal text-gray-800">{singleGame?.gameCatagory}</span>
          </h1>
          <h1 className="font-bold my-1 flex items-center gap-2 ">
            Required Skill:
            <div className="flex items-center gap-2">
              {singleGame?.skills.map((skill, index) => (
                <Badge className="text-blue-800 font-bold" variant="ghost">
                  {skill}
                </Badge>
              ))}
            </div>
          </h1>
          <h1 className="font-bold my-1">
            Description:
            <span className="p-4 font-normal text-gray-800">
              {singleGame?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:
            <span className="p-4 font-normal text-gray-800">
              {singleGame?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Players:
            <span className="p-4 font-normal text-gray-800">{singleGame?.players.length}</span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:
            <span className="p-4 font-normal text-gray-800">{singleGame?.createdAt.split("T")[0]}</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
