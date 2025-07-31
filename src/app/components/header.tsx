"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const pathName=usePathname()

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  const handleSearchName=  (event:{target:{value:string}})=>{

    console.log(event.target.value);
    

  }

  return (

    <>
 {/* <div className="navbar w-full bg-emerald-400 flex flex-row justify-between fixed top-0 left-0 z-50">
  <div className="flex flex-row w-lg text-left">
    <Link
      href="/"
      className="btn btn-ghost px-2 text-xl gap-2 normal-case hover:bg-transparent"
      prefetch={true}

    >
      <span className="truncate font-bold">ImageKit ReelsPro</span>
    </Link>
  </div>
  
  <div className=" flex flex-row w-fit ">
    {session && (
      <Link 
        href="/upload"
        className="btn btn-ghost btn-sm hidden sm:inline-flex"
        onClick={() => showNotification("Welcome to Admin Dashboard", "info")}
      >
        <span className="hidden md:inline bg-amber-700 cursor-pointer">Video Upload</span> 
      </Link>
    )}
    
    <div className=" flex flex-row w-fit">
      
      <ul tabIndex={0} className="mx-6">
        {session ? (
          <>
           <div className="flex flex-row w-fit"> 
            <li className="mx-3 shadow-lg bg-emerald-700">
              <div className="text-md truncate">{session.user?.email}</div>
            </li>
            <div className="divider my-0"></div>

            <li className="mx-3 bg-amber-600 shadow-lg ">
              <button 
                onClick={handleSignOut} 
                className="text-error hover:bg-error/10 cursor-pointer"
              >
                Sign Out
              </button>
            </li></div>
          </>
        ) : (
          <li>
            <Link href="/login" className="hover:bg-base-200">
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  </div>
</div>  */}

  <div id="topNav" className="fixed bg-white z-30 flex items-center w-full border-b h-[60px]">
  <div className={`flex items-center justify-between gap-6 w-full px-4 mx-auto ${pathName==='/'?'max-w-[1150px]':''} `}>
    <Link href="/">
    <img src="/tiktok-logo.png" alt="icon"  className="min-w-[115px] w-[115px]" />
    </Link>

    <div className="relative hidden md:flex items-center justify-end bg-[#f1f1f2] p-1 rounded-full max-w-[430px] w-full">
            <input type="text" onChange={handleSearchName} className="w-full pl-3 my-2 text-black bg-transparent placeholder-[#6b6666] text-[15px] "  placeholder="search Accounts"/>

           <div className=" absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">
      <div className="p-1">
        <Link href={`/user/1`} className="flex items-center justify-between w-full cursor-pointer text-black hover:bg-[#f12b56] p-1 px-2 hover:text-white">
        <div className=" flex items-center">
          <img className="rounded-md" width="40" src="https://placehold.co/400" />
          <div className="truncate ml-2 ">John weeks dev</div>
        </div>
        </Link>
      </div>

     </div>
    </div>

  </div>
  </div>
    
    </>

  );
}