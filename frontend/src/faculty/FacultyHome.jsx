import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import Navbar from "@/components/shared/Navbar";

export default function FacultyHome() {
  const navigate = useNavigate();
  const {user} = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-gray-900 flex flex-col items-center justify-center p-6">
      <Navbar />
      <h1 className="text-5xl font-bold mb-8 mt-10 text-blue-900">Faculty Dashboard</h1>
      <p className="text-lg text-gray-700 mb-12 max-w-2xl text-center">
        Oversee selected players for each game and view all registered players.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* View Selected Players per Game */}
        <Card className="cursor-pointer hover:shadow-2xl bg-white border border-blue-300 rounded-2xl text-gray-900">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-blue-900">Selected Players</h2>
            <p className="text-gray-600 mt-2">Check players selected for each game</p>
            <div className="mt-4 flex flex-col gap-3">
              <Button onClick={() => navigate("/faculty")} variant="outline" className="w-full border-blue-500 text-blue-900 hover:bg-blue-500 hover:text-white">
                View Selected Players
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* View All Registered Players */}
        <Card className="cursor-pointer hover:shadow-2xl bg-white border border-blue-300 rounded-2xl text-gray-900">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-blue-900">All Players</h2>
            <p className="text-gray-600 mt-2">View all players registered for games</p>
            <div className="mt-4 flex flex-col gap-3">
              <Button onClick={() => navigate("/faculty/allplayer")} variant="outline" className="w-full border-blue-500 text-blue-900 hover:bg-blue-500 hover:text-white">
                View All Players
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Section */}
      <Card onClick={() => navigate("/profile")} className="mt-8 cursor-pointer hover:shadow-2xl bg-white border border-blue-300 rounded-2xl text-gray-900">
        <CardContent className="p-8 text-center flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4 object-cover rounded-full border-2 border-blue-500">
            <img src={user?.profile?.profilePicture || "/default-avatar.png"} alt="Profile Picture" className="w-full h-full object-cover rounded-full" />
          </Avatar>
          <h2 className="text-2xl font-semibold text-blue-900">Profile</h2>
          <p className="text-gray-600 mt-2">Update your personal information</p>
        </CardContent>
      </Card>
    </div>
  );
}