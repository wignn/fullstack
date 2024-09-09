"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import img from "../../../public/1.jpg";
import axios from 'axios';

const Navbar = () => {
  const { data: session } = useSession();
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [userImage, setUserImage] = useState("");
  const Api = process.env.NEXT_PUBLIC_API || 'http://localhost:4000'
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = session?.user?.id; 
        if (userId) {
          const response = await axios.get(`${Api}/profiles/${userId}`);
          setUserImage(response.data.image || img);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (session) {
      fetchUser();
    }
  }, [session]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  return (
    <div className="top-0 left-0 w-full h-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white flex justify-between items-center px-4 z-50 shadow-lg">
      <h3 className="text-2xl font-bold ml-2">
        <Link href="/">
          <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
        </Link>
      </h3>
      <ul className="hidden md:flex space-x-8 items-center">
        <li className="nav-links capitalize font-medium hover:text-gray-300 transition duration-300">
          <Link href="/">Home</Link>
        </li>
        <li className="nav-links capitalize font-medium hover:text-gray-300 transition duration-300">
          <Link href="/about">About</Link>
        </li>
        <li className="nav-links capitalize font-medium hover:text-gray-300 transition duration-300">
          <Link href="/contact">Contact</Link>
        </li>
        {session && (
          <li className="nav-links capitalize font-medium hover:text-gray-300 transition duration-300">
            <Link href="/bookmark">Bookmark</Link>
          </li>
        )}

        {session && (
          <div className="relative">
            <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md">
              <Image
                src={userImage || img}
                width={40}
                height={40}
                alt="User avatar"
                className="cursor-pointer rounded-full object-cover"
                onClick={() => setDropdown(!dropdown)}
              />
            </div>
            {dropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg py-2 z-30">
                <Link href="/profile">
                  <p className="block px-4 py-2 text-sm hover:bg-gray-100">
                    {session.user?.name}
                  </p>
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Account Settings
                </Link>
                <Link
                  href="/post"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Post
                </Link>
                <Link
                  href="/theme"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Theme
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
        {!session && (
          <li className="nav-links capitalize font-medium hover:text-gray-300 transition duration-300">
            <Link href="/Login">Login</Link>
          </li>
        )}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className={`cursor-pointer pr-4 z-50 md:hidden`} 
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="fixed top-0 left-0 w-full h-3/5 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center space-y-6 z-40">
          <li className="block text-gray-400 hover:text-white">
            <Link href="/" onClick={() => setNav(false)}>
              Home
            </Link>
          </li>
          <li className="block text-gray-400 hover:text-white">
            <Link href="/about" onClick={() => setNav(false)}>
              About
            </Link>
          </li>
          <li className="block text-gray-400 hover:text-white">
            <Link href="/contact" onClick={() => setNav(false)}>
              Contact
            </Link>
          </li>
          {session && (
            <li className="block text-gray-400 hover:text-white">
              <Link href="/bookmark" onClick={() => setNav(false)}>
                Bookmark
              </Link>
            </li>
          )}
          {!session && (
            <li className="text-2xl">
              <Link href="/Login" onClick={() => setNav(false)}>
                Login
              </Link>
            </li>
          )}
          {session && (
            <li className="flex flex-col items-center justify-center">
              <p className="text-white mb-2">{session.user.name}</p>
              <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden">
                <Image
                  src={userImage || "/default-avatar.jpg"}
                  width={64}
                  height={64}
                  alt="User avatar"
                  className="cursor-pointer rounded-full object-cover"
                />
              </div>
              <button
                onClick={handleSignOut}
                className="mt-4 px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700"
              >
                Log Out
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
