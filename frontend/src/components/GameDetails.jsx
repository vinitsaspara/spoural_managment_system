import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleGame } from "@/redux/gameSlice";
import { GAME_API_END_POINT, REGISTER_IN_GAME_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft
} from "lucide-react";

function GameDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const gameId = params.id;
  const { singleGame } = useSelector(store => store.game);
  const { user } = useSelector(store => store.auth);
  const isInitiallyAplied = singleGame?.players?.some(apply => apply.student === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyAplied);

  const applyGameHandler = async () => {
    try {
      const res = await axios(`${REGISTER_IN_GAME_API_END_POINT}/registor/${gameId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleGame = { ...singleGame, players: [...singleGame.players, { student: user?._id }] }
        dispatch(setSingleGame(updatedSingleGame));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const fetchSingleGame = async () => {
      try {
        const res = await axios.get(`${GAME_API_END_POINT}/getgame/${gameId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleGame(res.data.game));
          setIsApplied(res.data.game.players.some(apply => apply.student === user._id));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleGame();
  }, [gameId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-gray-900"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Games
        </Button>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">{singleGame?.gameName}</h1>
                <p className="text-blue-100 flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  {singleGame?.gameCatagory}
                </p>
              </div>
              <Button
                onClick={isInitiallyAplied ? null : applyGameHandler}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  isInitiallyAplied
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isInitiallyAplied ? (
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Already Applied
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Apply Now
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6">
            {/* Skills Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {singleGame?.skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3 text-gray-700">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {singleGame?.description}
              </p>
            </div>

            {/* Game Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">{singleGame?.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Players</p>
                  <p className="font-medium text-gray-900">{singleGame?.players.length}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Posted Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(singleGame?.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Registration Status</p>
                  <p className="font-medium text-gray-900">
                    {isInitiallyAplied ? "Registered" : "Open"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
