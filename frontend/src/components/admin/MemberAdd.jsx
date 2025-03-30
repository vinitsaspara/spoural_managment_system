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
import { ChevronDown, Loader2, UserPlus, Building2, Mail, Lock, Phone, IdCard } from "lucide-react";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 mt-10 via-white to-blue-50">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-[calc(100vh-64px)] p-6"
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
              <UserPlus className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Add New Member</h1>
              <p className="text-gray-600">Register faculty or student coordinator</p>
            </div>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <Label className="text-gray-700">ID No</Label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    value={input.userId}
                    name="userId"
                    onChange={changeEventHandler}
                    placeholder="23DIT100"
                    className="pl-10"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label className="text-gray-700">Full Name</Label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    value={input.fullname}
                    name="fullname"
                    onChange={changeEventHandler}
                    placeholder="Thomas Shelby"
                    className="pl-10"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label className="text-gray-700">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="thomas@gmail.com"
                    className="pl-10"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label className="text-gray-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="Enter password"
                    className="pl-10"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <Label className="text-gray-700">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventHandler}
                    placeholder="123456789"
                    className="pl-10"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <Label className="text-gray-700">Department</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{input.department || "Select Department"}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {allDepartments.map((item, index) => (
                      <DropdownMenuItem 
                        key={index} 
                        onClick={() => selectDepartment(item)}
                        className="cursor-pointer hover:bg-blue-50"
                      >
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <Label className="text-gray-700">Role</Label>
              <RadioGroup className="flex items-center gap-8">
                <div className="flex items-center space-x-3 group">
                  <div className="relative">
                    <Input
                      type="radio"
                      name="role"
                      value="StudentCoordinator"
                      checked={input.role === "StudentCoordinator"}
                      onChange={changeEventHandler}
                      className="w-5 h-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-blue-500 checked:bg-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all duration-200"
                    />
                    <div className="absolute inset-0 rounded-full pointer-events-none transition-transform duration-200 scale-0 group-hover:scale-100 bg-blue-100"></div>
                  </div>
                  <Label 
                    htmlFor="student-coordinator"
                    className="text-gray-700 cursor-pointer select-none hover:text-blue-600 transition-colors duration-200"
                  >
                    Student Coordinator
                  </Label>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="relative">
                    <Input
                      type="radio"
                      name="role"
                      value="Faculty"
                      checked={input.role === "Faculty"}
                      onChange={changeEventHandler}
                      className="w-5 h-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 checked:border-blue-500 checked:bg-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all duration-200"
                    />
                    <div className="absolute inset-0 rounded-full pointer-events-none transition-transform duration-200 scale-0 group-hover:scale-100 bg-blue-100"></div>
                  </div>
                  <Label 
                    htmlFor="faculty"
                    className="text-gray-700 cursor-pointer select-none hover:text-blue-600 transition-colors duration-200"
                  >
                    Faculty
                  </Label>
                </div>
              </RadioGroup>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {loading ? (
                <Button className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Please wait...
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  Add Member
                </Button>
              )}
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MemberAdd;
