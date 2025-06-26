
import { ImageKitProvider } from "@imagekit/next";
import { log } from "console";
import { SessionProvider } from "next-auth/react";
const urlEndPoint = process.env.IMAGEKIT_PUBLIC_URL;
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;


export default function Providers({children}:{children:React.ReactNode}){
    const authenticator = async () => {
      try {
        const response = await fetch("/api/imagekit-auth");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            ` imagekit request failed with status ${response.status} : ${errorText}`
          );
        }
        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
      } catch (error) {
        console.log(error);

        throw new Error(`authentication req failed `);
      }
    };
    
    return (
      <SessionProvider>
        <ImageKitProvider urlEndpoint={urlEndPoint}>
          {children}
        </ImageKitProvider>
      </SessionProvider>
    );
}