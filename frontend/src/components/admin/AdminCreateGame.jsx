import { GAME_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAllGames } from "@/redux/gameSlice";
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
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <form
          onSubmit={submitHandler}
          className="my-8 p-5 border w-[400px] rounded-md shadow-lg border-gray-300"
        >
          <div>
            <div>
              <Label>Game Name</Label>
              <Input
                type="text"
                placeholder="Cricket, Football etc..."
                name="gameName"
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="Describe the game..."
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div>
              <Label>Skills</Label>
              <Input
                type="text"
                name="skills"
                placeholder="Batting, Bowling, Fielding, etc..."
                onChange={changeEventHandler}
                className="my-1"
              />
            </div>
            <div className="flex gap-2 items-center mt-4">
              <Label>Location</Label>
              <DropdownMenu>
                <DropdownMenuTrigger className=" border p-1 flex gap-1 items-center rounded cursor-pointer">
                  <span>{input.location || "Select Game Location"}</span>
                  <ChevronDown className="ml-2" size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {gameLocation.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => selectLocation(item)}
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <Label>Game Category</Label>
              <DropdownMenu>
                <DropdownMenuTrigger className=" border p-1 flex gap-1 items-center rounded cursor-pointer">
                  <span>{input.gameCatagory || "Select Game Category"}</span>
                  <ChevronDown className="ml-2" size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {gameCategory.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => selectCategory(item)}
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-2 items-center mt-5">
              <Label>Logo</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full mt-5">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-5">
              Post New Game
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AdminCreateGame;
