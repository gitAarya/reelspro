"use client"
import { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import FileUpload from './FileUpload';

const VideoUploadPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error,setError] = useState("")

  const handleUploadSuccess = async (uploadResponse: any) => {


    try {
      const videoData = {
        title,
        description,
        videoUrl: uploadResponse.url,
        thumbnailUrl: uploadResponse.thumbnailUrl as string, // if available
        duration: uploadResponse.duration as string, // if available
        // other video fields as needed
      };
      console.log(videoData);
      
      await apiClient.createVideo(videoData);
      alert('Video created successfully!');


    } catch (error) {
     console.error(error)
     
      alert('Failed to save video details');
    }
  };

  return (
    <form onSubmit={handleUploadSuccess}>
          <div>
      <h1>Upload New Video</h1>
      
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <h1>video</h1>
      <FileUpload
        onSuccess={handleUploadSuccess}
        fileType="video"
      />
      <br />
      <h1>thumabnail</h1>
      <FileUpload
        onSuccess={handleUploadSuccess}
        fileType="image"
      />
     
    </div>
     <button type="submit">upload</button>

    </form>

  );
};

export default VideoUploadPage;