import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { useDispatch, useSelector } from 'react-redux';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function UpdateProfileDialog({open,setOpen}) {

  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.auth);


  const [input,setInput] = useState({
    fullname : user?.fullname,
    department: user?.department,
    bio:user?.profile?.bio,
    phoneNumber : user?.phoneNumber,
    favoriteGames:user?.profile?.favoriteGames.map(game=>game),
    profilePicture : user?.profile?.profilePicture
  });

  const changeEventHandler = (e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }

  const submitHandler = async (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname',input.fullname);
    formData.append('department',input.department);
    formData.append('phoneNumber',input.phoneNumber);
    formData.append('bio',input.bio);
    formData.append('favoriteGames',input.favoriteGames);

    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
      if(res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
    setOpen(false);
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file});
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Fullname
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                Department
                </Label>
                <Input
                  id="department"
                  type="text"
                  name="department"
                  value={input.department}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  PhoneNumber
                </Label>
                <Input
                  id="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                Favorite Games
                </Label>
                <Input
                  id="favoriteGames"
                  name="favoriteGames"
                  value={input.favoriteGames}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                Profile Picture
                </Label>
                <Input
                  type="file"
                  onChange={fileChangeHandler}
                  accept="image/*"
                  id="file"
                  name="file"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialog