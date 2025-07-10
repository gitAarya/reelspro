
import Video from "@/models/video";
import { apiClient } from "@/lib/api-client";


export default  function Home() {

 const videos=  apiClient.getVideos()
//  console.log(videos);
 



  return (
    <>
    <h1>watch reels now</h1>
    <div className="w-600 h-300 bg-white">
          <video src="https://ik.imagekit.io/aarya6304/myBabe_nZG-WA4qU.mp4?tr=w-200,h-200,c-at_least"  controls muted autoPlay className="w=100"></video>


    </div>
    </>
  );
}
