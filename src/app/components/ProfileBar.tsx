'use client'

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function ProfileBar() {
  const { data: session } = useSession();
  const user = session?.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggle = () => setDropdownOpen(prev => !prev);
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); 
    setDropdownOpen(false);
  };

  return (
    <div className="p-4 relative">
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
            />
            <span className="text-lg font-semibold">{user.name}</span>
          </div>
        </div>
      ) : (
        <div className="text-2xl p-4 m-10 bg-stone-900 text-amber-100 rounded-xl text-center flex items-center justify-center hover:cursor-pointer hover:bg-amber-400 hover:p-5 hover:m-9 transition-all">
          <Link href="/sign-in">Sign in</Link>
        </div>
      )}

      {/* ✅ Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-12 top-28 z-50 w-48 bg-white rounded-md shadow-lg border text-black">
          <ul className="py-2 text-sm">
            <li>
              <Link
                href="/settings"
                className="block px-4 py-2 hover:bg-amber-100"
                onClick={() => setDropdownOpen(false)}
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-amber-100"
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
