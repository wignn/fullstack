'use client';
import axios from "axios";
import { useEffect, useState } from "react";

const ListBook = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/books`);
        setBooks(response.data.reverse()); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="book-list-container">
      {books.map((book, index) => (
        <div key={index} className="book-card bg-white p-6 rounded-lg shadow-md mb-4">
          <h2 className="text-lg font-bold text-gray-900">{book.title}</h2>
          <p className="text-sm text-gray-600">Author: {book.author}</p>
          <p className="text-gray-700 mt-2">{book.synopsis}</p>
          <img 
          src={book.coverImage || '/path/to/placeholder-image.png'} 
          alt={`${book.title} cover`} 
          className="w-full h-64 object-cover rounded-md mt-4"
        />
        </div>
      ))}
    </div>
  );
};

export default ListBook;
