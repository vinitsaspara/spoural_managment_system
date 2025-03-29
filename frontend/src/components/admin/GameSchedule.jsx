import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import SchedualTable from "./SchedualTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Fixed missing useSelector import
import Navbar from "../shared/Navbar";
import { setSearchMember } from "@/redux/adminSlice";
import { Button } from "../ui/button";
import useGetAllSchedual from "@/hooks/useGetAllSchedual";

function GameSchedule() {
  useGetAllSchedual();
  const { user } = useSelector((state) => state.auth); // Fixed selector import
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchMember(input));
  }, [input, dispatch]); // Added `dispatch` as a dependency

  return (
    <div>
      <Navbar />
      <div className="p-5 mt-5 rounded-md max-w-5xl mx-auto shadow-lg">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          
          {/* Corrected Conditional Rendering */}
          {user?.role === "Admin" && (
            <Button
              className="bg-blue-200 text-blue-600 hover:bg-blue-100"
              onClick={() => navigate("/admin/addschedual")}
            >
              New Schedule
            </Button>
          )}
        </div>
        <SchedualTable />
      </div>
    </div>
  );
}

export default GameSchedule;
