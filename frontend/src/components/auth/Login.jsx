import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, User, Lock } from "lucide-react";
import { setLoading, setUser } from "@/redux/authSlice";
import charusatLogo from "/public/charusat.jpg"; // Ensure this path is correct
import Navbar from "../shared/Navbar";

function Login() {
  const [input, setInput] = useState({ userId: "", password: "" });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(loading);
  

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post("http://localhost:8000/api/v2/user/login", input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));

        // here i want to give if condition for controll the home page of each role
        if (res.data.user.role === "Admin") {
          navigate("/admin");
        }
        else if (res.data.user.role === "StudentCoordinator") {
          navigate("/studentcoordinatorhome");
        }
        else if (res.data.user.role === "Faculty") {
          navigate("/facultyhome");
        }else{
          navigate("/");
        }
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
          <div>
            <img src={charusatLogo} alt="CHARUSAT Logo" className="mx-auto h-18 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700 ">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="userId" className="sr-only">User ID</Label>
                <Input
                  id="userId"
                  name="userId"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="User ID"
                  value={input.userId}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={input.password}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5 mr-3" />
                ) : (
                  <Lock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 mr-2" />
                )}
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
