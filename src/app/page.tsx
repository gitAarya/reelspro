"use client";

import { useEffect, useState, useRef } from "react";
import { apiClient } from "@/lib/api-client";
import Header from "./components/header";
import VideoFeed from "./components/videoFeed";


export default function Home() {



  return (
    <>
          <div>
      <Header/>
      </div>
      <div>
        <VideoFeed/>
      </div>

      
    </>

  );
}

