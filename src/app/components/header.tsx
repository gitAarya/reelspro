"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };

  return (
<div className="navbar w-full bg-emerald-400 flex flex-row justify-between fixed top-0 left-0 z-50">
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
</div>
  );
}