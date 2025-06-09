import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
const CulturalList = () => {
  const [culturals, setCulturals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    fetchCulturals();
  }, [category, status]);

  const fetchCulturals = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (status) params.append('status', status);

      const response = await axios.get(`/api/v2/cultural?${params.toString()}`);
      setCulturals(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cultural events');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCulturals();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Cultural Events</h1>
        {(user?.role === 'admin' || user?.role === 'faculty') && (
          <Button onClick={() => navigate('/cultural/create')}>
            Create New Event
          </Button>
        )}
      </div>

      <div className="flex gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex gap-4 flex-1">
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Dance">Dance</SelectItem>
              <SelectItem value="Music">Music</SelectItem>
              <SelectItem value="Drama">Drama</SelectItem>
              <SelectItem value="Art">Art</SelectItem>
              <SelectItem value="Literature">Literature</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {culturals.map((cultural) => (
          <Card key={cultural._id}>
            <CardHeader>
              <CardTitle>{cultural.name}</CardTitle>
              <CardDescription>{cultural.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{cultural.description}</p>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-semibold">Venue:</span> {cultural.venue}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Date:</span>{' '}
                  {new Date(cultural.eventDate).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Deadline:</span>{' '}
                  {new Date(cultural.registrationDeadline).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Max Participants:</span>{' '}
                  {cultural.maxParticipants}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate(`/cultural/${cultural._id}`)}
              >
                View Details
              </Button>
              {user?.role === 'student' && (
                <Button
                  onClick={() => navigate(`/cultural/${cultural._id}/register`)}
                >
                  Register
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CulturalList; 