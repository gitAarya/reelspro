"use client";

import VideoUploadForm from "../components/videoUplaodForm";
export default function VideoUploadPage() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold mb-8 text-orange-600 ">Upload New Reel</h1>
        <VideoUploadForm />
      </div>
    </div>
  );
}
