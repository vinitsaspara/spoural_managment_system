import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { SCHEDUAL_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AddSchedule() {
  const [input, setInput] = useState({
    gameName: "",
    teams: ["", ""], // Fixing two team inputs
    matchDate: "",
    matchTime: "",
    venue: "", // Default empty value for venue
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const venues = [
    "Charusat Main Ground",
    "ARIP Ground",
    "Sport Complex",
    "Central Loan",
  ];

  // Handles input change for single fields
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handles input change for the teams array
  const handleTeamChange = (index, value) => {
    const newTeams = [...input.teams];
    newTeams[index] = value;
    setInput({ ...input, teams: newTeams });
  };

  // Handles form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${SCHEDUAL_API_END_POINT}/create`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/admin/schedual");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border-gray-200 rounded-md p-4 my-4 shadow-lg"
        >
          <h1 className="font-bold text-xl mb-5">Add Game Schedule</h1>

          {/* Game Name */}
          <div className="my-2">
            <Label>Game Name</Label>
            <Input
              type="text"
              value={input.gameName}
              name="gameName"
              onChange={changeHandler}
              placeholder="Cricket, Football..."
              required
            />
          </div>

          {/* Teams Input (Fixed to Two Teams) */}
          <div className="my-2">
            <Label>Teams</Label>
            {input.teams.map((team, index) => (
              <Input
                key={index}
                type="text"
                value={team}
                onChange={(e) => handleTeamChange(index, e.target.value)}
                placeholder={`Team ${index + 1}`}
                className="mb-2"
                required
              />
            ))}
          </div>

          {/* Match Date */}
          <div className="my-2">
            <Label>Match Date</Label>
            <Input
              type="date"
              value={input.matchDate}
              name="matchDate"
              onChange={changeHandler}
              required
            />
          </div>

          {/* Match Time */}
          <div className="my-2">
            <Label>Match Time</Label>
            <Input
              type="time"
              value={input.matchTime}
              name="matchTime"
              onChange={changeHandler}
              required
            />
          </div>

          {/* Venue (Dropdown) */}
          <div className="my-2">
            <Label>Venue</Label>
            <select
              name="venue"
              value={input.venue}
              onChange={changeHandler}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Select Venue</option>
              {venues.map((venue, index) => (
                <option key={index} value={venue}>
                  {venue}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Add Schedule
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddSchedule;
