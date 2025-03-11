import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Contact, Landmark, Mail, Pen, Calendar, MapPin,
  Trophy, Gamepad, User, Camera, Loader2
} from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedGameTable from "./AppliedGameTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

function Profile() {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleCoverPhotoChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file); // Changed from 'coverPhoto' to 'file' to match multer config
  
      const response = await axios.put(
        `${USER_API_END_POINT}/profile/coverimg`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
  
      if (response.data.success) {
        dispatch(setUser({
          ...user,
          profile: {
            ...user.profile,
            coverPhoto: response.data.coverPhoto
          }
        }));
        toast.success('Cover photo updated successfully');
      }
    } catch (error) {
      console.error('Error updating cover photo:', error);
      toast.error(error.response?.data?.message || 'Error updating cover photo');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Hero Section with Cover Photo */}
      <div className="relative h-[250px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${user?.profile?.coverPhoto?.url || '/default-cover.jpg'})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        </div>

        {/* Cover Photo Upload Button */}
        <label className="absolute top-4 right-4 cursor-pointer">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm
            hover:bg-white/20 transition-all ${isUploading ? 'opacity-50' : ''}`}>
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <Camera className="h-5 w-5 text-white" />
            )}
            <span className="text-white font-medium">
              {isUploading ? 'Uploading...' : 'Change Cover'}
            </span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverPhotoChange}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Profile Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-[75px] mb-8 flex items-end space-x-5">
          <div className="relative">
            <Avatar className="w-[150px] h-[150px] rounded-xl ring-4 ring-white shadow-lg">
              <AvatarImage src={user?.profile?.profilePicture} />
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-2 right-2 rounded-full h-8 w-8 bg-blue-600 hover:bg-blue-700 shadow-lg"
              onClick={() => setOpen(true)}
            >
              <Pen className="h-4 w-4 text-white" />
            </Button>
          </div>
          
          <div className="pb-4">
            <h1 className="text-2xl font-bold text-gray-900">{user?.fullname}</h1>
            <p className="text-gray-600 mt-1">{user?.profile?.bio || "No bio added yet"}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* About Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: user?.email },
                  { icon: Contact, label: "Phone", value: user?.phoneNumber },
                  { icon: Landmark, label: "Department", value: user?.department },
                  { icon: MapPin, label: "Location", value: "Charusat University" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 rounded-full bg-blue-50">
                      <item.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                      <div className="text-gray-900 font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Favorite Games Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Favorite Games</h2>
              <div className="flex flex-wrap gap-2">
                {user?.profile?.favoriteGames?.length ? (
                  user.profile.favoriteGames.map((game, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                    >
                      <Trophy className="h-4 w-4 mr-1 inline-block" />
                      {game}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-500">No favorite games added yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2">
            {/* Applied Games Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Applied Games</h2>
                <Badge className="bg-blue-50 text-blue-700">
                  {user?.appliedGames?.length || 0} Games
                </Badge>
              </div>
              <AppliedGameTable />
            </div>
          </div>
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
