"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ReadButton } from '../[Book]/Bookbtn';

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string; 
}

const BooksLatest = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const api = process.env.NEXT_PUBLIC_API || 'http://localhost:4000';

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${api}/book`); // Fixed URL
        setBooks(response.data);
      } catch (err) {
        setError('Error fetching books');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [api]); // Added api as a dependency to ensure useEffect is updated correctly

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-500 border-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div key={book.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-400 mb-4">by {book.author}</p>
            <ReadButton id={book.id}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksLatest;
