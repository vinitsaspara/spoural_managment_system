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
  Search,
  Trophy,
  Medal,
  Award,
  GraduationCap,
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
import Navbar from "../shared/Navbar";

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
  const [open, setOpen] = useState(false);
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
    setOpen(false);
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
    <div className="min-h-screen bg-gradient-to-br  from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Sports Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative ">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-8 mt-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - CHARUSAT Details */}
          <div className="hidden lg:block bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">CHARUSAT</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Trophy className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Sports Excellence</h3>
                    <p className="text-gray-600">Join our vibrant sports community and showcase your athletic talents.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Medal className="w-6 h-6 text-blue-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">State-of-the-art Facilities</h3>
                    <p className="text-gray-600">Access to modern sports infrastructure and training facilities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Award className="w-6 h-6 text-purple-500 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Competitive Spirit</h3>
                    <p className="text-gray-600">Participate in inter-college tournaments and represent CHARUSAT.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Why Choose CHARUSAT?</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Professional sports coaching</li>
                  <li>• Regular sports events and tournaments</li>
                  <li>• Scholarship opportunities for athletes</li>
                  <li>• Well-equipped sports complex</li>
                  <li>• Active sports clubs and communities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Create Your Account
                </h2>
                <p className="text-gray-600 mt-2">
                  Join the CHARUSAT sports community today
                </p>
              </div>

              <form onSubmit={submitHandler} className="space-y-6">
                <div className="space-y-4">
                  {/* ID Number Selection with Search */}
                  <div className="space-y-2">
                    <Label htmlFor="userId" className="text-sm font-medium">Student ID</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {input.userId || "Select Your ID No."}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search ID number..." />
                          <CommandEmpty>No ID number found.</CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-auto">
                            {allIdNumber.map((id) => (
                              <CommandItem
                                key={id}
                                value={id}
                                onSelect={() => selectId(id)}
                              >
                                {id}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Department Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-medium">Department</Label>
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
                      <DropdownMenuContent className="w-full">
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
                    <Label className="text-sm font-medium">Profile Image</Label>
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center ring-2 ring-gray-200">
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
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
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
                    <Label htmlFor="fullname" className="text-sm font-medium">Full Name</Label>
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
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
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
                    <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</Label>
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
                    <Label htmlFor="password" className="text-sm font-medium">Password</Label>
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

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" 
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Create Account
                </Button>

                <div className="text-center mt-4">
                  <span className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                      Login
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
