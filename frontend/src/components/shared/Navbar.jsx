import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Determine which navigation links to render based on the user role
  let navLinks;
  if (user && user.role === "Admin") {
    navLinks = (
      <>
        <li>
          <Link to="/admin/members">Members</Link>
        </li>
        <li>
          <Link to="/admin/game">Games</Link>
        </li>
      </>
    );
  } else if (user && user.role === "Faculty") {
    navLinks = (
      <>
        <li>
          <Link to="/faculty">Faculty</Link>
        </li>
      </>
    );
  } else if (user && user.role === "StudentCoordinator") {
    navLinks = (
      <>
        <li>
          <Link to="/studentCoordinator">Games</Link>
        </li>
      </>
    );
  } else {
    navLinks = (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/games">Games</Link>
        </li>
        <li>
          <Link to="/browse">Browse</Link>
        </li>
      </>
    );
  }

  // Determine which user section to render based on login status
  let userSection;
  if (!user) {
    userSection = (
      <div className="flex items-center gap-2">
        <Link to="/login">
          <Button className="bg-[#007BFF] text-white hover:bg-[#003366] hover:text-white">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-[#007BFF] text-white hover:bg-[#003366] hover:text-white">
            SignUp
          </Button>
        </Link>
      </div>
    );
  } else {
    userSection = (
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.profile.profilePicture} alt="@shadcn" />
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src={user?.profile.profilePicture} alt="@shadcn" />
            </Avatar>
            <div>
              <h4 className="font-medium">{user?.fullname}</h4>
              <p className="text-sm text-muted-foreground">
                {user?.profile?.bio}
              </p>
            </div>
          </div>
          <div className="flex flex-col text-gray-600 my-2">
            {user && user.role !== "Admin" && (
              <div className="flex w-fit items-center gap-2 cursor-pointer">
                <User2 />
                <Button variant="link">
                  <Link to="/profile">View Profile</Link>
                </Button>
              </div>
            )}
            <div className="flex w-fit items-center gap-2 cursor-pointer">
              <LogOut />
              <Button onClick={logoutHandler} variant="link">
                Logout
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="bg-[#003366] text-white">
      <div className="flex items-center justify-between mx-[80px] max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Spoural <span className="text-[#04A1DB]">Games</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex items-center font-medium gap-5">
            {navLinks}
          </ul>
          {userSection}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
