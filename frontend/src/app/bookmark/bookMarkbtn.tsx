"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import addBookmark from "../bookmark/mark";
import { IoBookmarkOutline,IoBookmark  } from "react-icons/io5";
import { btnDataBookMark } from "../bookmark/dataMark"; 
import { deleteMark } from "../bookmark/dataMark";
export const Bookmark = ({ id }: { id: string }) => {
  const { data: session } = useSession(); 
  const [loading, setLoading] = useState(false);
  const [hasBookmark, setHasBookmark] = useState(false);

  const userId = session?.user?.id

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const bookmarkExists = await btnDataBookMark(userId, id);
        setHasBookmark(bookmarkExists);
      } catch (error) {
        console.error("Error fetching bookmark status:", error);
      }
    };

    if (userId) {
      fetchBookmarkStatus();
    }
  }, [userId, id]);

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault(); 
    setLoading(true); 

    try {
      await addBookmark(id, userId);
      setHasBookmark(true); 
    } catch (error) {
      console.error("Error adding bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <p>.</p>; 
  }

  if (hasBookmark) {
    return <p><IoBookmark/></p>; 
  }

  return (
    <button 
      onClick={handleClick}
      disabled={loading} 
      className="bg-transparent hover:bg-black text-white py-2 px-2 rounded-md transition duration-300"
    >
      {loading ? 'Adding...' : <IoBookmarkOutline size={30}/>}
    </button>
  );
};


export const DeleteButton = ({ id, onDelete }:any) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteMark(id);
      onDelete();
    } catch (error) {
      console.error("Error deleting bookmark:", error);
    }
    setLoading(false);
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};