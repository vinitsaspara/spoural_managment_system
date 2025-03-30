import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Calendar, Clock, MapPin, Trophy, Users, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { setSingleSchedule } from "@/redux/adminSlice";
import { motion, AnimatePresence } from "framer-motion";
import useGetAllSchedual from "@/hooks/useGetAllSchedual";

function ScheduleTable() {
  const { allSchedules, searchSchedule } = useSelector((store) => store.admin);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredSchedules, setFilteredSchedules] = useState(allSchedules);

  // Call the hook at the top level
  useGetAllSchedual();

  // Add a debug effect to monitor schedules
  useEffect(() => {
    console.log("Current schedules:", allSchedules);
  }, [allSchedules]);

  useEffect(() => {
    const filtered = allSchedules.length >= 0 && allSchedules.filter((schedule) => {
      if (!searchSchedule) {
        return true;
      }
      return (
        schedule.gameName.toLowerCase().includes(searchSchedule.toLowerCase()) ||
        schedule.teams[0].toLowerCase().includes(searchSchedule.toLowerCase()) ||
        schedule.teams[1].toLowerCase().includes(searchSchedule.toLowerCase()) ||
        schedule.venue.toLowerCase().includes(searchSchedule.toLowerCase())
      );
    });
    setFilteredSchedules(filtered);
  }, [allSchedules, searchSchedule]);

  const detailsHandler = (schedule) => {
    dispatch(setSingleSchedule(schedule));
    navigate("/admin/schedule/details");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg"
            >
              <Trophy className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Game Schedules</h1>
              <p className="text-gray-600">View and manage all scheduled games</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border-0 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
        >
          <Table>
            <TableHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-gray-700">Game Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Teams</TableHead>
                <TableHead className="font-semibold text-gray-700">Match Date</TableHead>
                <TableHead className="font-semibold text-gray-700">Match Time</TableHead>
                <TableHead className="font-semibold text-gray-700">Venue</TableHead>
                {user?.role === "Admin" && (
                  <TableHead className="font-semibold text-gray-700 text-right">Action</TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              <AnimatePresence>
                {filteredSchedules.map((schedule, index) => (
                  <motion.tr
                    key={schedule._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="group hover:bg-blue-50 transition-all duration-300"
                  >
                    <TableCell className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {schedule?.gameName}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        {schedule?.teams.join(" vs ")}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(schedule?.matchDate).toISOString().split("T")[0]}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {schedule?.matchTime}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {schedule?.venue}
                      </div>
                    </TableCell>
                    
                    {user?.role === "Admin" && (
                      <TableCell className="text-right">
                        <Popover>
                          <PopoverTrigger>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="inline-block p-2 rounded-full hover:bg-blue-100 transition-colors duration-300"
                            >
                              <MoreHorizontal className="w-5 h-5 text-gray-600" />
                            </motion.div>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 p-2 bg-white rounded-xl shadow-lg border-0">
                            <Button
                              onClick={() => detailsHandler(schedule)}
                              variant="ghost"
                              className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                            >
                              View Details
                            </Button>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ScheduleTable;
