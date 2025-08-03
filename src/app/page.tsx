"use client";

import { useEffect, useState, useRef } from "react";
import { apiClient } from "@/lib/api-client";
import Header from "./components/header";
import VideoFeed from "./components/videoFeed";
import SideNav from "./components/SideNav";


export default function Home() {



  return (
    <>
      <Header/>
      {/* <SideNav/> */}
      <VideoFeed/>
    </>

  );
}

