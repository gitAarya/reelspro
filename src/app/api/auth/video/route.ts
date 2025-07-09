import { authOptions } from "@/lib/auth";
import { connToDB } from "@/lib/db";
import Video, { IVIDEO } from "@/models/video";

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() 
{

    try {
        connToDB();
         const videos = await Video.findOne({}).sort({ createdAt: -1 }).lean()
         if(!videos){
            return Response.json(
                { error: "No video found" },
                { status: 404 }
            );
         }
         if(!videos || videos.length===0){
            return NextResponse.json(
               [],{status:200}
            )
         }

         return NextResponse.json(
            videos
         )


    } catch (error) {
        console.log("error in video auth", error);
        return Response.json(
            { error: "Failed to get video authentication parameters" },
            { status: 500 }
        );
        
    }
}

export async function POST(request: NextRequest) {
    try {
        
       const session = await getServerSession(authOptions);
       console.log("session",session);
       
       if (!session) {
        return NextResponse.json(
            {
                error: "unauthorized to upload"
            },
            {
                status: 401
            }
        );
       }

       await connToDB();
    //    console.log("body json ", await request.json());
       
      const body: IVIDEO = await request.json();
      console.log("body", body);
      
      if (!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
        return NextResponse.json(
            {
                error: "missing required fields"
            },
            {
                status: 401
            }
        );
      }

      const videoData = {
        ...body,
        controls: body?.controls || true,
        transfromation: {
            height: 1920,
            width: 1080,
            quality: body?.transformation?.quality || 100,
        }
      };
      const NewVideo = await Video.create(videoData);
        return NextResponse.json(
            NewVideo,
            {
                status: 201
            }
        );


    } catch (error) {
        console.log("error in video auth", error);
        return NextResponse.json(
            { error: "Failed to create video " },
            { status: 500 }
        );
        
    }
}