import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { 
  LogOut, 
  User2, 
  Menu, 
  X, 
  ChevronDown,
  Home,
  Trophy,
  Search,
  Users,
  GamepadIcon
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Navigation links with icons
  let navLinks;
  if (user && user.role === "Admin") {
    navLinks = [
      { to: "/admin/members", label: "Members", icon: Users },
      { to: "/admin/game", label: "Games", icon: GamepadIcon },
    ];
  } else if (user && user.role === "Faculty") {
    navLinks = [
      { to: "/faculty", label: "Faculty", icon: Users },
      { to: "/faculty/allplayer", label: "Selected Players", icon: Trophy },
    ];
  } else if (user && user.role === "StudentCoordinator") {
    navLinks = [
      { to: "/studentCoordinator", label: "Games", icon: GamepadIcon }
    ];
  } else {
    navLinks = [
      { to: "/", label: "Home", icon: Home },
      { to: "/games", label: "Games", icon: Trophy },
      { to: "/browse", label: "Browse", icon: Search },
    ];
  }

  const isActive = (path) => location.pathname === path;

  // User section component
  const userSection = !user ? (
    <div className="flex items-center gap-3">
      <Link to="/login">
        <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-white/10">
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button className="bg-white text-blue-600 hover:bg-gray-100">
          Sign Up
        </Button>
      </Link>
    </div>
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 hover:bg-white/10"
        >
          <Avatar className="h-8 w-8 border-2 border-white/20">
            <AvatarImage src={user?.profile.profilePicture} alt={user?.fullname} />
          </Avatar>
          <span className="text-sm font-medium text-gray-200">{user?.fullname}</span>
          <ChevronDown size={16} className="text-gray-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2 mt-2">
        <div className="flex flex-col">
          {user && user.role !== "Admin" && (
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 justify-start hover:bg-gray-100 rounded-lg"
              asChild
            >
              <Link to="/profile">
                <User2 size={18} />
                View Profile
              </Link>
            </Button>
          )}
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 justify-start text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg"
            onClick={logoutHandler}
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white">
                Spoural <span className="text-blue-300">Games</span>
              </h1>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors duration-200 ${
                    isActive(link.to)
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:block">
            {userSection}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                  isActive(link.to)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-white/10 px-4 py-3">
            {userSection}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
