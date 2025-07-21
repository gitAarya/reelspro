import { IVIDEO } from "@/models/video";

interface VideoFeedProps {
  videos: IVIDEO[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
  return (
    <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory">
      {videos.map((video) => (
        <div
          key={video._id?.toString()}
          className="h-screen w-full flex flex-col items-center justify-center bg-black snap-start"
        >
          <video
            src={video.videoUrl}
            controls
            autoPlay
            loop
            muted
            className="h-[70%] w-auto"
          />
          <div className="text-white mt-4 text-center">
            <p className="font-bold text-lg">{video.title}</p>
            <p className="text-sm">{video.description}</p>
          </div>
        </div>
      ))}

      {videos.length === 0 && (
        <div className="h-screen flex items-center justify-center text-white">
          <p>No videos found</p>
        </div>
      )}
    </div>
  );
}
