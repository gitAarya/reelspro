"use client";

import React, { useState } from "react";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./FileUpload";
import { VideoFormData } from "@/lib/api-client";

function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (!title || !videoUrl) {
        throw new Error("Title and video are required");
      }

      const videoData: VideoFormData = {
        title,
        description: "Uploaded via frontend", // Optional
        videoUrl,
        thumbnailUrl: thumbnailUrl || "https://ik.imagekit.io/default-thumbnail.jpg", // Replace or upload separately
        controls: true,
        transformation: {
          height: 1920,
          width: 1080,
        },
      };

      await apiClient.createVideo(videoData);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-green-600">Upload Successful!</h2>
        <button
          onClick={() => {
            setSuccess(false);
            setTitle("");
            setVideoUrl("");
            setThumbnailUrl("");
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Upload Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      
    </form>
  );
}

export default VideoUploadForm;
