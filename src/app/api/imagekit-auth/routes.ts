import ImageKit from "imagekit";
import { NextResponse } from "next/server";
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_PUBLIC_URL!,
});
export async function GET() {
    try {
        const authenticatedPramas= imagekit.getAuthenticationParameters
        return NextResponse.json(authenticatedPramas);
    } catch (error) {
        return NextResponse.json(
            {error:"imagekit auth failed"},
            {status:500}
    )
    }
    
}