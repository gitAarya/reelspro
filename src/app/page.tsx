"use client";

import { useEffect, useState, useRef } from "react";
import { apiClient } from "@/lib/api-client";
import Header from "./components/header";

type Video = {
  videoUrl: string;
  title: string;
  description: string;
};

export default function Home() {
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
    <>
          <div>
      <Header/>
      </div>
          <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory" ref={containerRef}>
      
      {videos.map((video: Video, index: number) => (
        <div
          key={index}
          className="h-screen w-full flex flex-col items-center justify-center bg-black snap-start"
        >
          <video
            src={video.videoUrl}
            controls
            autoPlay
            loop
            muted
            className="h-[80%] w-auto"
          />
          <div className="text-white mt-4 text-lg">
            <p className="font-bold">{video.title}</p>
            <p>{video.description}</p>
          </div>
        </div>
      ))}

    </div>
      
    </>

  );
}

