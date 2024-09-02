"use client";

import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { book, genre } from "../data";
import addGenre from "@/lib/actionGenre";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Navbar from "@/app/components/NavbarComponents";
const BookDetails = () => {
  const [state, formAction] = useFormState(addGenre, null);
  const [books, setBooks] = useState();
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<Set<string>>(
    new Set()
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const bookId = pathname.split("/").pop(); // Extract bookId from the pathname

  useEffect(() => {
    const fetchBooksAndGenres = async () => {
      try {
        const bookData = await book(bookId);
        setBooks(bookData); // Wrap single book data in an array
        const genreData = await genre();
        setGenres(genreData);
      } catch (err) {
        setError("Failed to load books or genres.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooksAndGenres();
  }, [bookId]);

  const handleCheckboxChange = (genreId: string) => {
    setSelectedGenreIds((prevSelectedGenreIds) => {
      const newSelectedGenreIds = new Set(prevSelectedGenreIds);
      if (newSelectedGenreIds.has(genreId)) {
        newSelectedGenreIds.delete(genreId);
      } else {
        newSelectedGenreIds.add(genreId);
      }
      return newSelectedGenreIds;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!bookId) {
      setError("Book ID is missing.");
      return;
    }
    const formData = new FormData();
    formData.append("bookId", bookId);
    selectedGenreIds.forEach((genreId) => formData.append("genreId", genreId));

    formAction(formData);
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }
  return (
    <div>
      <form action={formAction}>
        <div className="min-h-screen bg-gray-900 text-white md:p-8 p-0">
          {/* Hero Section */}
          <div className="relative mb-10">
            <Image
              src={books[0].coverImage}
              alt={books[0].title}
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
              <h1 className="text-5xl font-extrabold mb-4">{books.title}</h1>
              <p className="text-xl font-semibold text-gray-300">
                {books.author}
              </p>
              <p className="mt-4 text-lg font-medium text-gray-400">
                {books.genre}
              </p>
              <span
                className={`inline-block px-4 py-2 mt-6 rounded-full text-white ${
                  books.status === "Available" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {books.status}
              </span>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className="flex justify-center p-4">
            <div className="relative w-[350px] h-[500px] overflow-hidden rounded-lg shadow-xl flex justify-center">
              <Image
                src={books[0].coverImage}
                alt={books[0].title}
                width={350}
                height={500}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
          {/* Synopsis */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4 text-gray-100">
                Synopsis
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {books[0].synopsis}
              </p>
            </div>

            {/* Chapters */}
            <div className="mt-10">
              <h2 className="text-3xl font-bold mb-4 text-gray-100">
                Chapters
              </h2>
              {books.length > 0 && (
                <div className="">
                  <ul>
                    {books.map((book) => (
                      <li key={book.id} className="mb-6">
                        <ul className="list-disc pl-5 mt-2">
                          {book.genre.map((genre) => (
                            <li key={genre.id}>
                              <strong>{genre.name}</strong>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {genres.map((genre) => (
                <div key={genre.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={genre.id}
                    checked={selectedGenreIds.has(genre.id)}
                    onChange={() => handleCheckboxChange(genre.id)}
                    className="mr-2 h-5 w-5 accent-blue-500"
                  />
                  <label className="text-lg">{genre.name}</label>
                </div>
              ))}
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookDetails;
