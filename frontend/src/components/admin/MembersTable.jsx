import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Users, Mail, Lock, UserCircle, Building2, Phone, IdCard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { setSingleMembre } from "@/redux/adminSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg"
            >
              <Users className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Members Management
              </h1>
              <p className="text-gray-600">
                View and manage all system members
              </p>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border-0 backdrop-blur-sm"
        >
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="px-8 py-6 text-left text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <IdCard className="h-4 w-4 text-blue-500" />
                      ID No.
                    </div>
                  </TableHead>
                  <TableHead className="px-8 py-6 text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <UserCircle className="h-4 w-4 text-blue-500" />
                      Name
                    </div>
                  </TableHead>
                  <TableHead className="px-8 py-6 text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-500" />
                      Email
                    </div>
                  </TableHead>
                  <TableHead className="px-8 py-6 text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-blue-500" />
                      Password
                    </div>
                  </TableHead>
                  <TableHead className="px-8 py-6 text-sm font-semibold text-gray-700">
                    Role
                  </TableHead>
                  <TableHead className="px-8 py-6 text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-blue-500" />
                      Department
                    </div>
                  </TableHead>
                  <TableHead className="px-8 py-6 text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-500" />
                      Phone Number
                    </div>
                  </TableHead>
                  <TableHead className="px-8 py-6 text-right text-sm font-semibold text-gray-700">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                <AnimatePresence>
                  {filterMember.map((member, index) => (
                    <motion.tr
                      key={member._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors duration-200"
                    >
                      <TableCell className="px-8 py-6">
                        <div className="font-medium text-gray-800">
                          {member?.userId}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="text-gray-800">
                          {member?.fullname}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="text-gray-600">
                          {member?.email}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="text-gray-600">
                          {member?.password}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <Badge 
                          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                            member.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' 
                              : member.role === 'faculty'
                              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {member?.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="text-gray-600">
                          {member?.department}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6">
                        <div className="text-gray-600">
                          {member?.phoneNumber}
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-right">
                        <Popover>
                          <PopoverTrigger>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="inline-block p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            >
                              <MoreHorizontal className="w-5 h-5 text-gray-600" />
                            </motion.div>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 p-2 bg-white border-0 shadow-lg rounded-xl">
                            <Button
                              onClick={() => detailsHandler(member)}
                              variant="ghost"
                              className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                            >
                              View Details
                            </Button>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
          {filterMember.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Members Found</h3>
              <p className="text-gray-600">There are no members matching your search criteria.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default MembersTable;