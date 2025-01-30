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
import { Loader2 } from "lucide-react";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    department: "",
    file: "",
  });

  const navigate = useNavigate();
  const {loading} = useSelector(store=>store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
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
    }finally{
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
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
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
            <Label>PhoneNumber</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="123456789"
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
          <div>
          <Label>Department</Label>
            <Input
              type="text"
              value={input.department}
              name="department"
              onChange={changeEventHandler}
              placeholder="Enter department"
            ></Input>
          </div>
          <div className="mt-2">
            <Label>Profile Picture</Label>
            <Input
              accept="image/*"
              type="file"
              className="cursor-pointer"
              onChange={changeFileHandler}
            ></Input>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <span className="text-sm text-gray-500">
            Alredy have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
