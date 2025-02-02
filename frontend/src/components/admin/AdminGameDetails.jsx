import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { GAME_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setAllGames } from "@/redux/gameSlice";

function AdminGameDetails() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const gameId = params.id;
  console.log(gameId);
  
  const {singleGame} = useSelector(store=>store.game);
  const {allGames} = useSelector(store=>store.game);
  
  const removeHandler = async () => {
    try {
      const res = await axios.delete(`${GAME_API_END_POINT}/remove/${gameId}`,{withCredentials:true});
      if(res.data.success){
        navigate('/admin/game');
        toast.success(res.data.message);
        dispatch(setAllGames(allGames.filter((game) => game._id.toString() !== gameId)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 shadow-lg p-5 rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg">{singleGame?.gameName}</h1>
        </div>

        <Button
          onClick = {removeHandler}
        >
          Remove Game
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
              <span className="p-4 font-normal text-gray-800">
                {singleGame?.gameName}
              </span>
            </div>
          </h1>
          <h1 className="font-bold my-1">
            Category:
            <span className="p-4 font-normal text-gray-800">
              {singleGame?.gameCatagory}
            </span>
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
            <span className="p-4 font-normal text-gray-800">
              {singleGame?.players.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:
            <span className="p-4 font-normal text-gray-800">
              {singleGame?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AdminGameDetails;
