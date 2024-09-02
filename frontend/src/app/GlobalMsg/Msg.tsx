'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Message {
  id: number;
  sender: string;
  content: string;
  sentAt: string;
}

const CommunityMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const Api = process.env.NEXT_PUBLIC_API || 'http://localhost:4000';

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${Api}/Msg`);
        setMessages(response.data); 
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [Api]);  

  return (
    <div className="mb-10 bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Community Messages</h1>
      <ul className="space-y-4">
        {messages.map((message) => (
          <li key={message.id} className="p-4 bg-gray-800 rounded-md">
            <div className="flex justify-between">
              <span className="font-semibold">{message.sender}</span>
              <span className="text-sm text-gray-400">{new Date(message.sentAt).toLocaleDateString()}</span>
            </div>
            <p className="mt-2">{message.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityMessages;
