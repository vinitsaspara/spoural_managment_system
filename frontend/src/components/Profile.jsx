import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Landmark, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedGameTable from "./AppliedGameTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";


function Profile() {

    const [open,setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl shadow-lg mx-auto bg-white border border-gray-100 rounded-md my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile.profilePicture}></AvatarImage>
            </Avatar>
            <div>
              <h1 className="font-medium text-lg ">{user.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
          <div className="flex mt-2 items-center gap-3">
          <Landmark className="w-6 h-6 text-gray-600" />
            <span>{user?.department}</span>
          </div>
        </div>
        <div className="my-5 flex gap-2">
          <h1 className="font-medium text-lg mb-1">Favorite Games </h1>
          <div className="flex items-center gap-1">
          {
             
            user?.profile?.favoriteGames.length != 0 ? user?.profile?.favoriteGames.map((item,index)=><Badge key={index}>{item}</Badge>): <span>Not Skill</span>
          }
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-md shadow-md p-5 m-8">
        <h1 className="font-bold text-lg my-5">Applied Game</h1>
        <AppliedGameTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
