'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';



export default function List() {
 
  const handleSignIn = () => {
    window.location.href = '/Login';
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = '/';
  };

  return (
    <div className="">
     
      <div className="flex space-x-4">
        <button
          onClick={handleSignIn}
          className="w-28 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-purple-600 hover:to-blue-600"
        >
          Sign In
        </button>

        <button
          onClick={handleSignOut}
          className="w-28 px-4 bg-gradient-to-r from-red-600  to-black text-white rounded hover:from-red-700 to-blue-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
