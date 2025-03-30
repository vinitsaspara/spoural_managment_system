import { GAME_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronDown, Loader2, Gamepad2, MapPin, Tags, Image as ImageIcon, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAllGames } from "@/redux/gameSlice";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const gameCategory = [
  "Outdoor Sports",
  "Indoor Games",
  "E-Sports",
  "Fun & Casual Games",
];

const gameLocation = [
  "Charusat Main Ground",
  "ARIP Ground",
  "Sport Complex",
  "Central Loan",
];

function AdminCreateGame() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { allGames } = useSelector((state) => state.game);

  const [input, setInput] = useState({
    gameName: "",
    description: "",
    skills: "",
    location: "",
    gameCatagory: "",
    file: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // Function to handle game category selection from dropdown
  const selectCategory = (category) => {
    setInput({ ...input, gameCatagory: category });
  };

  const selectLocation = (location) => {
    setInput({ ...input, location: location });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("gameName", input.gameName);
    formData.append("description", input.description);
    formData.append("skills", input.skills);
    formData.append("location", input.location);
    formData.append("gameCatagory", input.gameCatagory);

    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);

      const res = await axios.post(
        `${GAME_API_END_POINT}/creategame`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/game");
        dispatch(setAllGames([...allGames, res.data.game]));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-[calc(100vh-64px)] p-6 mt-10"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border-0 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg"
            >
              <Gamepad2 className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Create New Game</h1>
              <p className="text-gray-600">Add a new game to the platform</p>
            </div>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label className="text-gray-700">Game Name</Label>
              <Input
                type="text"
                placeholder="Cricket, Football etc..."
                name="gameName"
                onChange={changeEventHandler}
                className="pl-10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <Label className="text-gray-700">Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Describe the game..."
                onChange={changeEventHandler}
                className="pl-10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label className="text-gray-700">Skills</Label>
              <Input
                type="text"
                name="skills"
                placeholder="Batting, Bowling, Fielding, etc..."
                onChange={changeEventHandler}
                className="pl-10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <Label className="text-gray-700">Location</Label>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{input.location || "Select Game Location"}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {gameLocation.map((item, index) => (
                    <DropdownMenuItem 
                      key={index} 
                      onClick={() => selectLocation(item)}
                      className="cursor-pointer hover:bg-blue-50"
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <Label className="text-gray-700">Game Category</Label>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center gap-2">
                    <Tags className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{input.gameCatagory || "Select Game Category"}</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {gameCategory.map((item, index) => (
                    <DropdownMenuItem 
                      key={index} 
                      onClick={() => selectCategory(item)}
                      className="cursor-pointer hover:bg-blue-50"
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <Label className="text-gray-700">Game Logo</Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <ImageIcon className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  accept="image/*"
                  type="file"
                  className="pl-10 cursor-pointer"
                  onChange={changeFileHandler}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {loading ? (
                <Button className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create New Game</span>
                </Button>
              )}
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AdminCreateGame;
