import React, { useState } from "react";
import { apiClient } from "@/lib/api-client";
import FileUpload from "./FileUpload";

function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
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

      await apiClient.createVideo({
        title,
        videoUrl,
        description: "", // Add if needed
        thumbnailUrl: "", // Add if needed
        controls: true,
        transfromation: {
          height: 1920,
          width: 1080
        }
      });

      setSuccess(true);
    } catch (error:any) {
      setError(error.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div>
        <h2>Upload Successful!</h2>
        <button onClick={() => {
          setSuccess(false);
          setTitle("");
          setVideoUrl("");
        }}>
          Upload Another
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title*</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Video*</label>
          {videoUrl ? (
            <div>Video uploaded</div>
          ) : (
            <FileUpload
              fileType="video"
              onSuccess={(res) => setVideoUrl(res.url)}
            />
          )}
        </div>

        {error && <div style={{color: 'red'}}>{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting || !title || !videoUrl}
        >
          {isSubmitting ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default VideoUploadForm;