import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { ChevronDown, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const allDepartments = ["DCS", "DCE", "DIT"];

const allIdNumber = [];

// First, add DCS IDs (23DCS001 to 23DCS150)
for (let i = 1; i <= 150; i++) {
  allIdNumber.push(`23DCS${i.toString().padStart(3, "0")}`);
}

// Next, add DCE IDs (23DCE001 to 23DCE150)
for (let i = 1; i <= 150; i++) {
  allIdNumber.push(`23DCE${i.toString().padStart(3, "0")}`);
}

// Finally, add DIT IDs (23DIT001 to 23DIT096)
for (let i = 1; i <= 96; i++) {
  allIdNumber.push(`23DIT${i.toString().padStart(3, "0")}`);
}

function Signup() {
  const [input, setInput] = useState({
    userId: "",
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    department: "",
    file: "",
  });

  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const selectDepartment = (department) => {
    setInput({ ...input, department });
  };

  const selectId = (id) => {
    setInput({ ...input, userId: id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", input.userId);
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("department", input.department);

    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        "http://localhost:8000/api/v2/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
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
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-[500px] border border-gray-300 rounded-md p-6 my-8 shadow-lg space-y-4"
        >
          <h1 className="font-bold text-xl text-center mb-4">Sign Up</h1>

          {/* ID No. Row */}
          <div className="flex items-center gap-4">
            <Label className="w-1/3 text-right">ID No.</Label>
            <div className="w-2/3">
              <DropdownMenu>
                <DropdownMenuTrigger className="border p-2 flex gap-1 items-center rounded cursor-pointer">
                  <span>{input.userId || "Select Your ID No."}</span>
                  <ChevronDown className="ml-auto" size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-60 overflow-auto">
                  {allIdNumber.map((item, index) => (
                    <DropdownMenuItem key={index} onClick={() => selectId(item)}>
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Department Row */}
          <div className="flex items-center gap-4">
            <Label className="w-1/3 text-right">Department</Label>
            <div className="w-2/3">
              <DropdownMenu>
                <DropdownMenuTrigger className="border p-2 flex gap-1 items-center rounded cursor-pointer">
                  <span>{input.department || "Select Department"}</span>
                  <ChevronDown className="ml-auto" size={16} />
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
          </div>

          {/* Full Name Row */}
          <div className="flex items-center gap-4">
            <Label className="w-1/3 text-right">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Thomas Shelby"
              className="w-2/3"
            />
          </div>

          {/* Email Row */}
          <div className="flex items-center gap-4">
            <Label className="w-1/3 text-right">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="thomas@gmail.com"
              className="w-2/3"
            />
          </div>

          {/* Phone Number Row */}
          <div className="flex items-center gap-4">
            <Label className="w-1/3 text-right">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="123456789"
              className="w-2/3"
            />
          </div>

          {/* Password Row */}
          <div className="flex items-center gap-4">
            <Label className="w-1/3 text-right">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter password"
              className="w-2/3"
            />
          </div>

          {/* Profile Picture Row */}
          <div className="flex items-center gap-4">
            <Label className="w-1/3 text-right">Profile Picture</Label>
            <div className="w-2/3">
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            {loading ? (
              <Button className="w-full flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Signup
              </Button>
            )}
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
