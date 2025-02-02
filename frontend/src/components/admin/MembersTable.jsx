import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { setSingleMembre } from "@/redux/adminSlice";

function MembersTable() {
  const { allMembers,searchMember } = useSelector((store) => store.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterMember,setFilterMember] = useState(allMembers);

  useEffect(()=>{
    const filltredMembres = allMembers.length >= 0 && allMembers.filter((member)=>{
      if(!searchMember){
        return true;
      };
      
      const matchesId = searchMember ? member.userId.toLowerCase().includes(searchMember.toLowerCase()) : true;

      const matchesName = searchMember ? member.fullname.toLowerCase().includes(searchMember.toLowerCase()) : true;
      const matchesRole = searchMember ? member.role.toLowerCase().includes(searchMember.toLowerCase()) : true;
      const matchesDept = searchMember ? member.department.toLowerCase().includes(searchMember.toLowerCase()) : true;
      

      return matchesName || matchesId || matchesRole || matchesDept;
    });
    setFilterMember(filltredMembres);
  },[allMembers,searchMember]);

  // Remove Member Function

  // Details Handler to Set Single Member
  const detailsHandler = (member) => {
    dispatch(setSingleMembre(member));
    navigate('/admin/member/details');
  };

  return (
    <div>
      <Table>
        <TableCaption>List of your recent added Members</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>PhoneNumber</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterMember.map((member) => (
            <TableRow key={member._id} className="border-b border-gray-300">
              <TableCell>{member?.userId}</TableCell>
              <TableCell>{member?.fullname}</TableCell>
              <TableCell>{member?.email}</TableCell>
              <TableCell>{member?.password}</TableCell>
              <TableCell>{member?.role}</TableCell>
              <TableCell>{member?.department}</TableCell>
              <TableCell>{member?.phoneNumber}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-25 h-25 p-0 bg-blue-700 text-white">
                    <Button
                      onClick={() => detailsHandler(member)}
                      variant="link"
                      className="text-white"
                    >
                      Details
                    </Button> 
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MembersTable;
