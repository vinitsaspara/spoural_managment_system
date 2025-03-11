import React, { useState } from "react";
import {
  Loader2,
  ChevronDown,
  Upload,
  User,
  Mail,
  Phone,
  Lock,
  Building,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "../shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const allDepartments = ["DCS", "DCE", "DIT"];
const allIdNumber = [];

for (let i = 1; i <= 150; i++) {
  allIdNumber.push(`23DCS${i.toString().padStart(3, "0")}`);
}
for (let i = 1; i <= 150; i++) {
  allIdNumber.push(`23DCE${i.toString().padStart(3, "0")}`);
}
for (let i = 1; i <= 96; i++) {
  allIdNumber.push(`23DIT${i.toString().padStart(3, "0")}`);
}

const Signup = () => {
  const [input, setInput] = useState({
    userId: "",
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    department: "",
    file: "",
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center px-4">
        <div className="w-full max-w-4xl mx-auto py-8">
          <Card className="w-full max-w-xl mx-auto">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center">
                Create an Account
              </CardTitle>
              <CardDescription className="text-center">
                Enter your details below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="space-y-4">
                  {/* ID Number Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="userId">Student ID</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {input.userId || "Select Your ID No."}
                          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60">
                        <div className="overflow-y-auto max-h-[300px]">
                          {allIdNumber.map((id) => (
                            <DropdownMenuItem key={id} onClick={() => selectId(id)}>
                              {id}
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Department Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          {input.department || "Select Department"}
                          <Building className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                        {allDepartments.map((dept) => (
                          <DropdownMenuItem key={dept} onClick={() => selectDepartment(dept)}>
                            {dept}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Profile Image Upload */}
                  <div className="space-y-2">
                    <Label>Profile Image</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Label
                          htmlFor="file"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="text-sm text-gray-500">
                              Click to upload profile picture
                            </p>
                          </div>
                          <Input
                            id="file"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={changeFileHandler}
                          />
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="fullname"
                        name="fullname"
                        value={input.fullname}
                        onChange={changeEventHandler}
                        className="pl-10"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="pl-10"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                        className="pl-10"
                        placeholder="+1234567890"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="pl-10"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create Account
                </Button>

                <div className="text-center mt-4">
                  <span className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600">
                      Login
                    </Link>
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
