"use client"
import { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import FileUpload from './FileUpload';
import { log } from 'console';

const VideoUploadPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<{url: string} | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<{url: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleVideoUploadSuccess = (uploadResponse: any) => {
    setVideoFile({
      url: uploadResponse.url
    });
    // console.log(uploadResponse?.url);
    
  };

  const handleThumbnailUploadSuccess = (uploadResponse: any) => {
    setThumbnailFile({
      url: uploadResponse.url
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate required fields
      if (!title.trim()) {
        throw new Error('Title is required');
      }
      
      if (!videoFile) {
        throw new Error('Video file is required');
      }

      const videoData = {
        title,
        description,
        videoUrl: videoFile.url,
        thumbnailUrl: thumbnailFile?.url || ''
      };
      // console.log("vdo data",videoData);
      

      await apiClient.createVideo(videoData);
      alert('Video created successfully!');
      
      // Reset form
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setThumbnailFile(null);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : 'Failed to save video details');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateThumbnail = async () => {
    if(!videoFile){
      alert("please upload the video file first")
    }
    const greneratedThumbnail= await fetch(`${videoFile?.url}/ik-thumbnail.jpg?tr=so-10`)
    // console.log(greneratedThumbnail.url);
    setThumbnailFile({
      url:greneratedThumbnail.url
    })

    
    
  }


  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col p-4">
      <div className="w-full max-w-md space-y-4">
        <input
          className="w-full p-2 border-2 border-gray-300 rounded"
          type="text"
          placeholder="Title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <textarea
          className="w-full p-2 border-2 border-gray-300 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-orange-700">Video*</h2>
          <FileUpload
            onSuccess={handleVideoUploadSuccess}
            fileType="video"
          />
          {videoFile && (
            <div className="flex items-center text-sm text-green-600">
              <span className="mr-2">✓</span>
              <span>Video uploaded</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2 relative">
          <h2 className="text-xl font-semibold text-orange-600">Thumbnail</h2>
          <button className='absolute left-4 right-1 top-12 bg-blue-600 w-50 ml-25 cursor-pointer' onClick={handleGenerateThumbnail}> Generate Thumbnail</button>

          <FileUpload
            onSuccess={handleThumbnailUploadSuccess}
            fileType="image"
          />
          
          {thumbnailFile && (
            <div className="flex items-center text-sm text-green-600">
              <span className="mr-2">✓</span>
              <span>Thumbnail uploaded</span>
            </div>
          )}
        </div>
        
        {error && (
          <div className="p-2 text-red-500 bg-red-50 rounded text-sm">
            {error}
          </div>
        )}
       
        <button 
          type="submit" 
          disabled={isSubmitting || !videoFile}
          className={`w-full py-3 text-white font-medium rounded-lg transition-colors ${
            isSubmitting || !videoFile
              ? 'bg-orange-300 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Publish Video'}
        </button>
      </div>
    </form>
  );
};

export default VideoUploadPage;