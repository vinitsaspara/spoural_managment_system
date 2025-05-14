import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'react-hot-toast';

const CulturalForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    maxParticipants: '',
    registrationDeadline: '',
    eventDate: '',
    venue: '',
    requirements: '',
    coordinator: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      fetchCulturalDetails();
    }
  }, [id]);

  const fetchCulturalDetails = async () => {
    try {
      const response = await axios.get(`/api/v2/cultural/${id}`);
      setFormData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cultural event details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing) {
        await axios.put(`/api/v2/cultural/${id}`, formData);
        toast.success('Event updated successfully');
      } else {
        await axios.post('/api/v2/cultural', formData);
        toast.success('Event created successfully');
      }
      navigate('/cultural');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save event');
      toast.error(err.response?.data?.message || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Cultural Event' : 'Create New Cultural Event'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dance">Dance</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Drama">Drama</SelectItem>
                <SelectItem value="Art">Art</SelectItem>
                <SelectItem value="Literature">Literature</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Maximum Participants</label>
            <Input
              type="number"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Registration Deadline</label>
            <Input
              type="datetime-local"
              name="registrationDeadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Date</label>
            <Input
              type="datetime-local"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Venue</label>
            <Input
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Requirements</label>
            <Textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : isEditing ? 'Update Event' : 'Create Event'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/cultural')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CulturalForm; 