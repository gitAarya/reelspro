"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useNotification } from "./Notification";
import { usePathname } from "next/navigation";
import { BiSearch, BiUser } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  const pathName = usePathname();


  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    }
  };





  return (
    <>
      <div
        id="topNav"
        className="fixed bg-white z-30 flex items-center w-full border-b h-[60px]"
      >
        <div
          className={`flex items-center justify-between gap-6 w-full px-4 mx-auto ${
            pathName === "/" ? "max-w-[1150px]" : ""
          } `}
        >
          <Link href="/">
            <img
              src="/tiktok-logo.png"
              alt="icon"
              className="min-w-[115px] w-[115px]"
            />
          </Link>

          <div className="flex items-center gap-3">
            <button className="flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5">
              <AiOutlinePlus size="22" color="#000000" />
              <span className="px-2 text-black  font-medium text-[15px]">
                <Link
                  href="/upload"
                  className="btn btn-ghost btn-sm hidden sm:inline-flex"
                  onClick={() =>
                    showNotification("Welcome to Admin Dashboard", "info")
                  }
                >
                  <span className="hidden md:inline cursor-pointer">
                    Video Upload
                  </span>
                </Link>
              </span>
            </button>
            {!session ? (
              <div className="flex items-center ">
                <button className="flex items-center bg-[#f02c56] text-white border rounded-md px-3 py-[6px]">
                  <span className="whitespace-nowrap mx-4 font-medium text-[15px] ">
                    {" "}
                    <Link href="/login" className="hover:bg-base-200">
                      Login
                    </Link>{" "}
                  </span>
                </button>
                <BsThreeDotsVertical color="#161724" size="25" />
              </div>
            ) : (
              <div className="flex items-center  ">
                <div className="relative flex flex-row">
                  <div
                    className={` top-6 p-3.5 flex items-center w-full justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer `}
                  >
                    <BiUser size={20} color="black" />
                    <span className="pl-2 font-semibold text-sm text-black p-3">
                      {" "}
                      {session.user?.email}
                    </span>
                  </div>
                  <button onClick={handleSignOut}>
                    <FiLogOut size={22} color="black" />
                    <span className="pl-2 font-semibold text-sm text-black">
                      {" "}
                      logout
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
