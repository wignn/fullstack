'use client'

import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const CreateMessageForm = () => {
  const [sender, setSender] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const session = useSession()
  const Api = process.env.NEXT_PUBLIC_API || 'http://localhost:4000';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${Api}/Msg/Post`, { sender: session.data?.user?.name, content });
      setSuccess('Message created successfully!');
      setSender('');
      setContent('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'An error occurred');
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Create Message</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block text-sm font-semibold mb-1">Message</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md"
            placeholder="Your message"
            rows={4}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default CreateMessageForm;
