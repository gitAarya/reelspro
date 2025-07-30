import { IVIDEO } from "@/models/video";
import { useState, useRef, useEffect } from "react";
import { apiClient } from "@/lib/api-client";

interface VideoFeedProps {
  videos: IVIDEO[];
}
type Video = {
  videoUrl: string;
  title: string;
  description: string;
};

export default function VideoFeed() {
  const [videos, setVideos] = useState<Video[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await apiClient.getVideos();
        setVideos(res as Video[]);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
<div
  className="h-[60%] w-full overflow-y-scroll snap-y snap-mandatory relativ items-center justify-center"
  ref={containerRef}
>
  {videos.map((video: Video, index: number) => (
    <div
      key={index}
      className="h-screen w-full flex flex-col items-center justify-center bg-black snap-start relative"
    >
      {/* Video container with relative positioning */}
      <div className="relative h-[80%] w-full flex items-center justify-center">
        <video
          src={video.videoUrl}
          controls
          autoPlay
          loop
          muted
          className="h-full w-auto max-w-full object-contain"
        />
        
        {/* Text overlay - positioned absolutely within video container */}
        <div className="absolute left-5 top-5 p-4 bg-black/50 text-white rounded-lg max-w-[80%]">
          <p className="font-bold text-xl mb-2">{video.title}</p>
          <p className="text-sm">{video.description}</p>
        </div>
      </div>
    </div>
  ))}
</div>
  );
}
