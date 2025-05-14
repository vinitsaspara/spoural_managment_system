import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Calendar, Clock, MapPin, Trophy, Users } from "lucide-react";
import { SCHEDUAL_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

function AddSchedule() {
  const [input, setInput] = useState({
    gameName: "",
    teams: ["", ""],
    matchDate: "",
    matchTime: "",
    venue: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const venues = [
    "Charusat Main Ground",
    "ARIP Ground",
    "Sport Complex",
    "Central Loan",
  ];

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleTeamChange = (index, value) => {
    const newTeams = [...input.teams];
    newTeams[index] = value;
    setInput({ ...input, teams: newTeams });
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center max-w-4xl mx-auto p-6 mt-10"
      >
        <motion.form
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          onSubmit={submitHandler}
          className="w-full bg-white rounded-2xl shadow-xl p-8 border-0 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg"
            >
              <Trophy className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Add Game Schedule</h1>
              <p className="text-gray-600">Create a new match schedule</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Game Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <Label className="text-gray-700">Game Name</Label>
              <Input
                type="text"
                value={input.gameName}
                name="gameName"
                onChange={changeHandler}
                placeholder="Cricket, Football..."
                required
                className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
              />
            </motion.div>

            {/* Teams Input */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-2"
            >
              <Label className="text-gray-700">Teams</Label>
              <div className="space-y-3">
                {input.teams.map((team, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative"
                  >
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      value={team}
                      onChange={(e) => handleTeamChange(index, e.target.value)}
                      placeholder={`Team ${index + 1}`}
                      className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                      required
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Match Date */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-2"
            >
              <Label className="text-gray-700">Match Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="date"
                  value={input.matchDate}
                  name="matchDate"
                  onChange={changeHandler}
                  className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
            </motion.div>

            {/* Match Time */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-2"
            >
              <Label className="text-gray-700">Match Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="time"
                  value={input.matchTime}
                  name="matchTime"
                  onChange={changeHandler}
                  className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-300"
                  required
                />
              </div>
            </motion.div>

            {/* Venue */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="space-y-2"
            >
              <Label className="text-gray-700">Venue</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  name="venue"
                  value={input.venue}
                  onChange={changeHandler}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 transition-all duration-300 appearance-none bg-white"
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
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              {loading ? (
                <Button className="w-full py-6 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300" disabled>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Add Schedule
                </Button>
              )}
            </motion.div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default AddSchedule;
