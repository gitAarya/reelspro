"use client";
import { upload } from "@imagekit/next";
import { useRef, useState } from "react";


interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}
  const authenticator = async () => {
    try {
      const response = await fetch("/api/auth/imagekit-auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      
      if (!signature || !expire || !token || !publicKey) {
        throw new Error("Invalid authentication response");
      }
      
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };


const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const abortController = new AbortController();
  const validateFile = (file: File) => {
    setError(null); // Clear previous errors
    
    if (fileType === "image" && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return false;
    }
    
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


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      const authParams = await authenticator();
      const { signature, expire, token, publicKey } = authParams;

       const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, // Optionally set a custom file name
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                // Abort signal to allow cancellation of the upload if needed.
                abortSignal: abortController.signal,
            });
         onSuccess({
        url: uploadResponse.url,
        fileId: uploadResponse.fileId,
        name: uploadResponse.name,
        size: uploadResponse.size,
        filePath: uploadResponse.filePath,
        // Add any other properties you need
      });
            // console.log("Upload response:", uploadResponse);
    } catch (error) {
      console.error("Error during file upload:", error);
      setError("File upload failed. Please try again.");
    } finally {
      setUploading(false);
      progress && setProgress(0); // Reset progress after upload
    }
  };
   
  return (
    <div className="file-upload-container">
     {/* File input element using React ref */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            {/* Button to trigger the file input dialog */}
            <button
                className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
            >
                add file
            </button>
            <br />
            {/* Display the current upload progress */}
            Upload progress: <progress value={progress} max={100} className="text-orange-500"></progress> 
    
    </div>
  );
};

export default FileUpload;