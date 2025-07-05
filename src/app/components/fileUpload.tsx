"use client";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useState } from "react";

interface FileUploadParams {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadParams) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }
    return true;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const { token, signature, expire } = await authRes.json();

      const response = await upload({
        token,
        signature,
        expire,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        file,
        fileName: file.name,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = (event.loaded / event.total) * 100;
            onProgress(Math.round(percent));
          }
        },
      });

      onSuccess(response);
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        setError("Upload aborted.");
      } else if (error instanceof ImageKitInvalidRequestError) {
        setError("Invalid request to ImageKit.");
      } else if (error instanceof ImageKitUploadNetworkError) {
        setError("Network error during upload.");
      } else if (error instanceof ImageKitServerError) {
        setError("Server error from ImageKit.");
      } else {
        setError("Upload failed: " + (error as Error).message);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleUpload}
        disabled={uploading}
      />
      {uploading && <span>Loading...</span>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default FileUpload;
