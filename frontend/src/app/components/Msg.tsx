"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Message {
  id: number;
  sender: string;
  content: string;
  sentAt: string;
  Avater?: string;
}

const CommunityMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const Api = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
  const { data: session } = useSession();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  let [Loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        
      setLoading(true)
        const response = await axios.get(`${Api}/Msg`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching initial messages:", error);
      }finally{

    }
    }
    fetchInitialMessages();

    const socket = new WebSocket(`${Api.replace(/^http/, "ws")}/ws`);

    socket.onmessage = (event) => {
      const newMessage: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      socket.close();
    };
  }, [Api]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const fetchUserProfile = async (userName: string) => {
      try {
        const response = await axios.get(`${Api}/users/name/${userName}`);
        const userData = response.data;
        const profilePic = userData?.profile?.image || null;
        setProfilePicture(profilePic);
        console.log("Profile Picture:", profilePic);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }finally{
        setLoading(false)
      }
    }

    if (session?.user?.name) {
      fetchUserProfile(session.user.name);
    }
  }, [session?.user?.name, Api]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!content.trim()) {
      setError("Message cannot be empty");
      return;
    }
    console.log(profilePicture);

    try {
      await axios.post(`${Api}/Msg`, {
        sender: session?.user?.name || "Anonymous",
        content,
        img: profilePicture,
        UserId: session?.user?.id
      });
      setContent("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "An error occurred");
      } else {
        setError("An unknown error occurred");
      }
    }finally{

    }
  };
  if (Loading) {
    return (
      <div className="bg-black text-white flex justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }
  

  const getAvatar = (avatarUrl?: string, sender: string) => {
    if (avatarUrl) {
      return (
        <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full" />
      );
    }
    return (
      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
        {sender[0]}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 shadow-md flex items-center justify-between border-b border-gray-700">
        <h1 className="text-2xl font-semibold">Community Chat</h1>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 p-4 rounded-lg max-w-xl ${
              message.sender === (session?.user?.name || "Anonymous")
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-700 text-gray-100"
            }`}
          >
            {getAvatar(message.Avater, message.sender)}
            <div className="flex-1">
              <div className="text-sm font-semibold mb-1">{message.sender}</div>
              <p className="text-base">{message.content}</p>
              <div className="text-right text-xs text-gray-400 mt-2">
                {new Date(message.sentAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Box */}
      <footer className="bg-gray-800 p-4 flex items-center border-t border-gray-700">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <input
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 p-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </form>
      </footer>

      {/* Error message */}
      {error && (
        <div className="absolute bottom-16 left-0 w-full bg-red-600 text-white p-4 text-center rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default CommunityMessages;
