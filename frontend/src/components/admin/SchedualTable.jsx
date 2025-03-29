import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { setSingleSchedule } from "@/redux/adminSlice";

function ScheduleTable() {
  const { allSchedules, searchSchedule } = useSelector((store) => store.admin);
  const { user } = useSelector((state) => state.auth); // Get user role
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredSchedules, setFilteredSchedules] = useState(allSchedules);

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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Game Schedules</h1>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableCaption>List of scheduled games</TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Name</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teams</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Date</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Time</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</TableHead>
              {user?.role === "Admin" && ( // Only show action column for Admin
                <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white divide-y divide-gray-200">
            {filteredSchedules.map((schedule) => (
              <TableRow key={schedule._id} className="hover:bg-gray-50 transition-colors duration-200">
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{schedule?.gameName}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule?.teams.join(" vs ")}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(schedule?.matchDate).toISOString().split("T")[0]} {/* Shows only YYYY-MM-DD */}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule?.matchTime}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule?.venue}</TableCell>
                
                {/* Show Details button only for Admin */}
                {user?.role === "Admin" && (
                  <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </PopoverTrigger>
                      <PopoverContent className="w-25 h-25 p-0 bg-blue-700 text-white">
                        <Button
                          onClick={() => detailsHandler(schedule)}
                          variant="link"
                          className="text-white"
                        >
                          Details
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ScheduleTable;
