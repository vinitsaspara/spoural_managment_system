import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

export default function StudentCoordinatorHome() {
  const navigate = useNavigate();
  const {user} = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-gray-900 flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold mb-8 text-blue-900">Coordinator Dashboard</h1>
      <p className="text-lg text-gray-700 mb-12 max-w-2xl text-center">
        Manage student coordination tasks, oversee events, and facilitate communication between faculty and students.
      </p>

      <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
        <Card className="cursor-pointer hover:shadow-2xl bg-white border border-blue-300 rounded-2xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-blue-900">Accept Student Requests</h2>
            <p className="text-gray-600 mt-2">Review and approve game registration requests</p>
            <div className="mt-4 flex flex-col gap-3">
              <Button onClick={() => navigate("/studentCoordinator")} variant="outline" className="w-full">View Requests</Button>
            </div>
          </CardContent>
        </Card>

        <Card onClick={() => navigate("/profile")} className="cursor-pointer hover:shadow-2xl bg-white border border-blue-300 rounded-2xl">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4 object-cover rounded-full">
              <img src={user?.profile?.profilePicture || "/default-avatar.png"} alt="Profile Picture" className="w-full h-full object-cover rounded-full" />
            </Avatar>
            <h2 className="text-2xl font-semibold text-blue-900">Profile</h2>
            <p className="text-gray-600 mt-2">Update your personal information</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
