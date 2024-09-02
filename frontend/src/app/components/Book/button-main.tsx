"use client"
// components/LoadingButton.js
import { useState } from 'react';
import Link from 'next/link';

export function LoadingButton({ href, text }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();
    setLoading(true);
         window.location.href = href; 
    setTimeout(() => {
      setLoading(false);
 
    }, 5000); 
  };

  return (
    <button
      onClick={handleClick}
      className={`relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-md transition duration-200 w-28 h-10 ${
        loading ? 'bg-opacity-70 cursor-not-allowed' : 'hover:from-purple-600 hover:to-blue-600'
      }`}
      disabled={loading}
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 1 1 8 8"
            />
          </svg>
        </div>
      ) : (
        text
      )}
    </button>
  );
}
