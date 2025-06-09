import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import ;
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CulturalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [cultural, setCultural] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCulturalDetails();
  }, [id]);

  const fetchCulturalDetails = async () => {
    try {
      const response = await axios.get(`/api/v2/cultural/${id}`);
      setCultural(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cultural event details');
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post(`/api/v2/cultural/${id}/register`);
      toast.success('Successfully registered for the event');
      navigate('/cultural');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to register for the event');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`/api/v2/cultural/${id}`);
      toast.success('Event deleted successfully');
      navigate('/cultural');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete the event');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cultural) return <div>Event not found</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{cultural.name}</CardTitle>
              <CardDescription>{cultural.category}</CardDescription>
            </div>
            <div className="flex gap-2">
              {(user?.role === 'admin' || user?.role === 'faculty') && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/cultural/${id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{cultural.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Event Details</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Venue:</span> {cultural.venue}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{' '}
                    {new Date(cultural.eventDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Registration Deadline:</span>{' '}
                    {new Date(cultural.registrationDeadline).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Max Participants:</span>{' '}
                    {cultural.maxParticipants}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <p className="text-gray-600">{cultural.requirements}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Coordinator</h3>
              <p>{cultural.coordinator?.name}</p>
              <p className="text-sm text-gray-600">{cultural.coordinator?.email}</p>
            </div>

            {user?.role === 'student' && (
              <div className="mt-4">
                <Button onClick={handleRegister}>
                  Register for this Event
                </Button>
              </div>
            )}

            {(user?.role === 'admin' || user?.role === 'faculty' || user?.role === 'studentCoordinator') && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/cultural/${id}/registrations`)}
                >
                  View Registrations
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CulturalDetail; 