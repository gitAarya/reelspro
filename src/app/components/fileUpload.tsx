"use client" 
import {
    upload,
} from "@imagekit/next";

import { useRef, useState } from "react";
interface FileUplaodParams{
    onSuccess:(res:any)=>void
    onProgress?:(progress:number)=> void
    fileType?:"image"|"video"

}

// UploadExample component demonstrates file uploading using ImageKit's Next.js SDK.
const FileUpload = ({
    onSuccess,
    onProgress,
    fileType
}:FileUplaodParams) => {
    const [uploading,setUploading]=useState(false)
    const [error,setError]= useState<string| null>(null)
// optional validation
const validateFile= (file:File)=>{
    if(fileType==="video"){
        if(!file.type.startsWith("video/")){
            setError("please uplaod a valid file")
            return false;
        }
    }
    if(file.size >100*1024*1024){
        setError("file size must be less than 100 MB")
        return false;
    }
    return true;
}

    const handleUpload =async (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file= e.target.files?.[0]
        if(!file || ! validateFile(file)) return 
        setUploading(true)
        setError(null)

        try {
            const authRes= await  fetch("/api/auth/imagekit-auth")
            const auth= await authRes.json()

          const response=  await upload(
                {
                // Authentication parameters
                expire:auth.expire,
                token:auth.token,
                signature:auth.signature,
                publicKey:process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                file,
                fileName: file.name,
                onProgress: (event) => {
                   if(event.lengthComputable && onProgress){
                    const percent= (event.loaded / event.total) * 100
                    onProgress(Math.round(percent))
                   }

                },
            }
            );
            onSuccess(response)
        } catch (error) {
            console.log("upload failed",error);
            
            
        }  finally{
            setUploading(false)
        }

    }
    return (
        <>
            {/* File input element using React ref */}
            <input type="file" accept={fileType==="video"?"video/*" :"image/*"} onChange={handleUpload} />
            {/* Button to trigger the upload process */}

            <br />
        {uploading && (
            <span> Loading...</span>
        )}
        </>
    );
};

export default FileUpload;