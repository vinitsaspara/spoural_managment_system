import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { setSingleMembre } from "@/redux/adminSlice";

function MembersTable() {
  const { allMembers, searchMember } = useSelector((store) => store.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterMember, setFilterMember] = useState(allMembers);

  useEffect(() => {
    const filteredMembers = allMembers.length >= 0 && allMembers.filter((member) => {
      if (!searchMember) {
        return true;
      }
      return (
        member.userId.toLowerCase().includes(searchMember.toLowerCase()) ||
        member.fullname.toLowerCase().includes(searchMember.toLowerCase()) ||
        member.role.toLowerCase().includes(searchMember.toLowerCase()) ||
        member.department.toLowerCase().includes(searchMember.toLowerCase())
      );
    });
    setFilterMember(filteredMembers);
  }, [allMembers, searchMember]);

  const detailsHandler = (member) => {
    dispatch(setSingleMembre(member));
    navigate('/admin/member/details');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Members Management</h1>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableCaption>List of your recently added Members</TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID No.</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PhoneNumber</TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody className="bg-white divide-y divide-gray-200">
            {filterMember.map((member) => (
              <TableRow key={member._id} className="hover:bg-gray-50 transition-colors duration-200">
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member?.userId}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{member?.fullname}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.email}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.password}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.role}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.department}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member?.phoneNumber}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
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
    </div>
  );
}

export default MembersTable;