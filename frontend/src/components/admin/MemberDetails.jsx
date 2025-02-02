import React from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ADMIN_API_END_POINT } from '@/utils/constant';

function MemberDetails() {

    const navigate = useNavigate();
    const {singleMembre} = useSelector(store=>store.admin);
    const memberId = singleMembre?._id;

    const removeHandler = async () => {
        try {
          const res = await axios.delete(`${ADMIN_API_END_POINT}/membre/${memberId}`,{withCredentials:true});
          if(res.data.success){
            navigate('/admin/members');
            toast.success(res.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="max-w-5xl mx-auto my-10 shadow-lg p-5 rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg">Akaksh Patel</h1>
        </div>

        <Button onClick = {removeHandler} className="bg-red-600 hover:bg-red-500">
          Remove
        </Button>
      </div>

      <div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Member Details
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1 flex items-center gap-2">
            ID:
            <div>
              <span className="p-4 font-normal text-gray-800">{singleMembre?.userId}</span>
            </div>
          </h1>
          <h1 className="font-bold my-1 flex items-center gap-2">
            Name:
            <div>
              <span className="p-4 font-normal text-gray-800">{singleMembre?.fullname}</span>
            </div>
          </h1>
          <h1 className="font-bold my-1 flex items-center gap-2">
            Email:
            <div>
              <span className="p-4 font-normal text-gray-800">{singleMembre?.email}</span>
            </div>
          </h1>
          <h1 className="font-bold my-1 flex items-center gap-2">
            Password:
            <div>
              <span className="p-4 font-normal text-gray-800">{singleMembre?.password}</span>
            </div>
          </h1>
          <h1 className="font-bold my-1 flex items-center gap-2">
            Role:
            <div>
              <span className="p-4 font-normal text-gray-800">{singleMembre?.role}</span>
            </div>
          </h1>
          <h1 className="font-bold my-1 flex items-center gap-2">
            Department:
            <div>
              <span className="p-4 font-normal text-gray-800">{singleMembre?.department}</span>
            </div>
          </h1>
          <h1 className="font-bold my-1 flex items-center gap-2">
            PhoneNumber:
            <div>
              <span className="p-4 font-normal text-gray-800">{singleMembre?.phoneNumber}</span>
            </div>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default MemberDetails