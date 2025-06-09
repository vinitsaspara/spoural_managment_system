import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from 'react-hot-toast';

const CulturalSelections = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selections, setSelections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchSelections();
  }, [id, statusFilter]);

  const fetchSelections = async () => {
    try {
      const response = await axios.get(`/api/v2/cultural/${id}/selections`);
      setSelections(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch selections');
      setLoading(false);
    }
  };

  const handleSelectionUpdate = async (selections) => {
    try {
      await axios.post(`/api/v2/cultural/${id}/selections`, { selections });
      toast.success('Selections updated successfully');
      fetchSelections();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update selections');
    }
  };

  const filteredSelections = selections.filter(selection => {
    const matchesSearch = selection.student.name.toLowerCase().includes(search.toLowerCase()) ||
                         selection.student.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || selection.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Selections</h1>
        <Button variant="outline" onClick={() => navigate(`/cultural/${id}`)}>
          Back to Event
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="selected">Selected</SelectItem>
            <SelectItem value="not_selected">Not Selected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead>Selected By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSelections.map((selection) => (
              <TableRow key={selection._id}>
                <TableCell>{selection.student.name}</TableCell>
                <TableCell>{selection.student.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selection.status === 'selected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selection.status.charAt(0).toUpperCase() + selection.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selection.performance === 'excellent' ? 'bg-green-100 text-green-800' :
                    selection.performance === 'good' ? 'bg-blue-100 text-blue-800' :
                    selection.performance === 'average' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selection.performance.charAt(0).toUpperCase() + selection.performance.slice(1)}
                  </span>
                </TableCell>
                <TableCell>{selection.remarks}</TableCell>
                <TableCell>{selection.selectedBy?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CulturalSelections; 