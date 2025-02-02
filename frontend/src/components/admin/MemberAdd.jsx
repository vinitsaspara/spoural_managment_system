import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { RadioGroup } from "../ui/radio-group";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const allDepartments = ["DCS", "DCE", "DIT"];

function MemberAdd() {
  const [input, setInput] = useState({
    userId: "",
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    department: "",
    role: "",
  });

  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectDepartment = (department) => {
    setInput({ ...input, department: department });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${ADMIN_API_END_POINT}/register`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/admin/members");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center max-w-7xl mx-auto ">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border-gray-200 rounded-md p-4 my-4 shadow-lg"
        >
          <h1 className="font-bold text-xl mb-5">
            Faculty & Student Coordinators
          </h1>
          <div className="my-2">
            <Label>ID No</Label>
            <Input
              type="text"
              value={input.userId}
              name="userId"
              onChange={changeEventHandler}
              placeholder="23DIT100"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Thomas Shelby"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="thomas@gmail.com"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter password"
            ></Input>
          </div>
          <div className="my-2">
            <Label>PhoneNumber</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="123456789"
            ></Input>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <Label>Department</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className=" border p-1 flex gap-1 items-center rounded cursor-pointer">
                <span>{input.department || "Select Member Department"}</span>
                <ChevronDown className="ml-2" size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {allDepartments.map((item, index) => (
                  <DropdownMenuItem key={index} onClick={() => selectDepartment(item)}>
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <RadioGroup className="flex items-center gap-4 ">
                <Label>Role</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="StudentCoordinator"
                    checked={input.role === "StudentCoordinator"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">StudentCoordinator</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="Faculty"
                    checked={input.role === "Faculty"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Faculty</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Add Member
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default MemberAdd;
