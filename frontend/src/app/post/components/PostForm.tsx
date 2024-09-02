'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { SubmitButton, SubmitButtonPost } from '@/app/components/Book/buttons';

const PostForm = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setError(null);
      } else {
        setError('Only image files are allowed.');
        setImage(null);
        setPreview(null);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSending(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', session?.id); 
    formData.append('have', session?.user?.name);
    if (image) formData.append('image', image);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage('Post created successfully!');
        setError(null);
        setTimeout(() => {
          window.location.href = '/post';
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred.');
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Error submitting the form', error);
      setError('An unexpected error occurred.');
      setSuccessMessage(null);
    } finally {
      // setIsSending(false); 
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg max-w-md mx-auto m-8 shadow-xl border border-gray-300">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md bg-opacity-90">
        <div className="mb-5">
          <label htmlFor="title" className="block text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="Post Title..."
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="content" className="block text-sm font-medium text-gray-900">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="Post Content..."
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="image" className="block text-sm font-medium text-gray-900">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />
          {preview && (
            <div className="mt-3">
              <img src={preview} alt="Preview" className="w-full h-auto max-h-60 object-cover rounded-md" />
            </div>
          )}
        </div>
        <div className="mb-5">
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {successMessage && <p className="mt-2 text-sm text-green-500">{successMessage}</p>}
        </div>
        <SubmitButtonPost label="Submit" disabled={isSending} /> {/* Disable the button when sending */}
      </form>
    </div>
  );
};

export default PostForm;
