"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface Message {
  id: number;
  sender: string;
  content: string;
  sentAt: string;
}

const CommunityMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const Api = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
  const session = useSession();

  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const response = await axios.get(`${Api}/Msg`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching initial messages:", error);
      }
    };

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!content.trim()) {
      setError("Message cannot be empty");
      return;
    }

    try {
      await axios.post(`${Api}/Msg`, {
        sender: session.data?.user?.name || "Anonymous",
        content,
      });
      setContent(""); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "An error occurred");
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 flex items-center justify-between shadow">
        <h1 className="text-xl font-bold">Chat Group</h1>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg max-w-xl ${
              message.sender === (session.data?.user?.name || "Anonymous")
                ? "ml-auto bg-blue-500"
                : "mr-auto bg-gray-700"
            }`}
          >
            <div className="text-sm text-gray-300">{message.sender}</div>
            <p className="text-white">{message.content}</p>
            <div className="text-right text-xs text-gray-400 mt-1">
              {new Date(message.sentAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        {/* This empty div will be used to scroll to the bottom */}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input Box */}
      <footer className="bg-gray-800 p-4 sticky bottom-0 flex items-center">
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 p-3 rounded-full text-white outline-none"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full"
          >
            Send
          </button>
        </form>
      </footer>

      {/* Error message */}
      {error && <p className="text-red-500 p-4">{error}</p>}
    </div>
  );
};

export default CommunityMessages;
