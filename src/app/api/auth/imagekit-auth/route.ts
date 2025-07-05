// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server";
import { log } from "console";

export async function GET() {
 
 try {
    // authenticationParameter are token, signature, expire 
     const {token,signature,expire} = getUploadAuthParams({
       privateKey: process.env.IMAGEKIT_PRIVATE_KEY  as string, // Never expose this on client side
       publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
       // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
       // token: "random-token", // Optional, a unique token for request
     });
     
     return Response.json({
       token,
       signature,
       expire,
       publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
     });
 } catch (error) {
    console.log("error in upload auth", error);
    return Response.json(
      { error: "Failed to get upload authentication parameters" },
      { status: 500 }
    );
    
    
 }
}
