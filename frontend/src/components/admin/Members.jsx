import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import MembersTable from "./MembersTable";
import { useNavigate } from "react-router-dom";
import useGetAllMembres from "@/hooks/useGetAllMembres";
import { useDispatch } from "react-redux";
import { setSearchMember } from "@/redux/adminSlice";

function Members() {
  useGetAllMembres();

  const [input,setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(setSearchMember(input));
  },[input])

  return (
    <div>
      <Navbar />
      <div className="p-5 mt-5 rounded-md max-w-5xl mx-auto shadow-lg">
        <div className="flex items-center justify-between my-5">
          <Input 
          className="w-fit" placeholder="Filter by name"
          onChange = {(e)=>setInput(e.target.value)}
          ></Input>
          <Button onClick={() => navigate("/admin/members/add")}>
            New Member
          </Button>
        </div>
        <MembersTable/>
      </div>
    </div>
  );
}

export default Members;
