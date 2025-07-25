'use client'

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ProfileBar() {
  const { data: session } = useSession();
  const user = session?.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const hasShownLoginMessage = useRef(false);

  const handleToggle = () => setDropdownOpen(prev => !prev);
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); 
    setDropdownOpen(false);
  };

  useEffect(() => {
    if (session?.user && !hasShownLoginMessage.current) {
      setShowBanner(true);
      hasShownLoginMessage.current=true;
    }
  }, [user]);

  return (
    <div className="p-4 relative">
      {showBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-emerald-500 text-white rounded-lg shadow-lg animate-slide-fade">
          ✅ Successfully logged in!
        </div>
      )}

      {user ? (
        <div
          className="text-2xl p-4 m-10 bg-amber-200 rounded-xl text-center flex items-center justify-center hover:cursor-pointer hover:bg-black hover:p-5 hover:m-9 hover:text-amber-100 transition-all"
          onClick={handleToggle}
        >
          <div className="flex items-center gap-2">
            <Image
              src={user.image || "/assets/default-pfp.png"}
              alt="pfp"
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
            />
            <span className="text-lg font-semibold">{user.name}</span>
          </div>
        </div>
      ) : (
        <div className="text-2xl p-4 m-10 bg-stone-900 text-amber-100 rounded-xl text-center flex items-center justify-center hover:cursor-pointer hover:bg-amber-400 hover:p-5 hover:m-9 transition-all">
          <Link href="/sign-in">Sign in</Link>
        </div>
      )}

      {dropdownOpen && (
        <div className="absolute right-14 top-32 z-50 w-48 bg-amber-50 rounded-md shadow-lg text-black">
          <ul className="text-sm">
            <li>
              <Link
                href="/settings"
                className="block px-4 py-4 hover:bg-amber-100"
                onClick={() => setDropdownOpen(false)}
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-4 hover:bg-amber-100"
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
