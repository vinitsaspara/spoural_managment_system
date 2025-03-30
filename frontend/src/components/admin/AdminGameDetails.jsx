import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { GAME_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setAllGames } from "@/redux/gameSlice";
import Navbar from "../shared/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Gamepad2, Users, MapPin, Calendar, Tag, Info, ArrowLeft } from "lucide-react";

function AdminGameDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const gameId = params.id;
  
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-5xl mx-auto p-6 mt-12"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-xl p-8 border-0 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Gamepad2 className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{singleGame?.gameName}</h1>
                <p className="text-gray-600">Game Details</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate('/admin/game')}
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-300 flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={removeHandler}
                  className="bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove Game
                </Button>
              </motion.div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 p-4 rounded-lg hover:bg-blue-50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-700">Category</h2>
                  </div>
                  <p className="text-gray-600 pl-7">{singleGame?.gameCatagory}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 p-4 rounded-lg hover:bg-blue-50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-700">Location</h2>
                  </div>
                  <p className="text-gray-600 pl-7">{singleGame?.location}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 p-4 rounded-lg hover:bg-blue-50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-700">Total Players</h2>
                  </div>
                  <p className="text-gray-600 pl-7">{singleGame?.players.length}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 p-4 rounded-lg hover:bg-blue-50 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <h2 className="text-lg font-semibold text-gray-700">Posted Date</h2>
                  </div>
                  <p className="text-gray-600 pl-7">{singleGame?.createdAt.split("T")[0]}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 p-4 rounded-lg hover:bg-blue-50 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-700">Description</h2>
              </div>
              <p className="text-gray-600 pl-7">{singleGame?.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 p-4 rounded-lg hover:bg-blue-50 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-700">Required Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2 pl-7">
                {singleGame?.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge 
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-300 cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AdminGameDetails;
