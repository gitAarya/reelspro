"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import MenuItem from "./menuitem";
export default function SideNav() {
  const pathname=usePathname()
  
  return (
    <>
    <div id="SideNav" className={`fixed z-20 pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto  bg-white ${pathname==='/'?'lg:w-[310px]':'lg:w-[220px]'}`}>
    <div className="lg:w-full w-[55px] mx-auto">
   <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eius temporibus laboriosam dolore quod ab suscipit quas laborum, consectetur, et ratione blanditiis nulla! Nemo, beatae? Aliquid maxime, expedita nam aperiam soluta incidunt hic corrupti voluptates non minima deleniti voluptatum ex unde nostrum doloremque, nobis commodi dolore iste repellat, repellendus fugit at. Fugiat consequuntur perspiciatis est id consequatur dolor ipsam eius eos exercitationem enim, qui tenetur, impedit rem ullam? Error eius esse, ad quidem, atque ea dicta consequuntur iste quasi, itaque rem eligendi? Accusantium voluptatum aut fuga, ad ab pariatur natus debitis magni repellat est accusamus, optio harum iste iure alias impedit itaque dolor. Quidem deleniti distinctio officia quia aspernatur veniam magnam harum quas dolorem mollitia voluptates pariatur asperiores consectetur laudantium quasi aut totam aperiam provident, natus exercitationem veritatis sit voluptatibus voluptate commodi. Commodi, maxime itaque, libero iste consectetur dolore soluta culpa praesentium sit, cum harum obcaecati cumque beatae accusamus! Nisi repellendus accusantium aut fugiat sed. Rerum atque doloribus error quis debitis non autem iste quo voluptatibus ducimus! Commodi quae reiciendis pariatur voluptate minima? Sapiente impedit quisquam quia maiores assumenda a nihil hic veritatis alias delectus vel eius ad illo, nulla accusamus dolorem accusantium debitis ipsum laboriosam saepe explicabo enim eligendi.</h1>
       
    </div>

    </div>
  
    </>
  );
}
