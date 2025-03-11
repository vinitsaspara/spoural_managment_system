// frontend/src/components/UpdateCoverPhotoDialog.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Camera, Loader2, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';

const UpdateCoverPhotoDialog = ({ open, setOpen, user }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG)');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size should be less than 5MB');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('coverPhoto', selectedFile);

      const response = await axios.put(
        `${USER_API_END_POINT}/profile/coverimg`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setUser({
          ...user,
          profile: {
            ...user.profile,
            coverPhoto: response.data.coverPhoto
          }
        }));
        toast.success('Cover photo updated successfully');
        setOpen(false);
      }
    } catch (error) {
      console.error('Error updating cover photo:', error);
      toast.error(error.response?.data?.message || 'Error updating cover photo');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Cover Photo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Preview Section */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Cover preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Camera className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>

          {/* Upload Controls */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => document.getElementById('coverPhotoInput').click()}
              disabled={isUploading}
            >
              Select Image
            </Button>
            <input
              id="coverPhotoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
            <Button
              className="flex-1"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCoverPhotoDialog;
