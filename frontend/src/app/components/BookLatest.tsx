"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ReadButton } from "../[Book]/Bookbtn";

interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  updatedAt: string;
}

const timeAgo = (date: string) => {
  const now = new Date();
  const updatedDate = new Date(date);
  const differenceInSeconds = Math.floor(
    (now.getTime() - updatedDate.getTime()) / 1000
  );

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(differenceInSeconds / seconds);
    if (interval > 1) return `${interval} ${unit}s ago`;
    if (interval === 1) return `1 ${unit} ago`;
  }
  return "just now";
};

const truncateTitle = (title: string, maxLength: number) => {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
};

const BooksLatest = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chapters, setChapters] = useState<{ [key: number]: string | null }>(
    {}
  );
  const api = process.env.NEXT_PUBLIC_API || "http://localhost:4000";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${api}/book`);
        const sortedBooks = response.data.sort(
          (a: Book, b: Book) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        setBooks(sortedBooks);

        const chapterPromises = sortedBooks.map(async (book: Book) => {
          try {
            const chapterResponse = await axios.get(
              `${api}/book/${book.id}/chapters`
            );
            const chaptersData = chapterResponse.data;

            if (chaptersData.length > 0) {
              const lastChapter = chaptersData[chaptersData.length - 1];
              return { id: book.id, chapterTitle: lastChapter.title };
            }
            return { id: book.id, chapterTitle: null };
          } catch (err) {
            console.error(`Error fetching chapters for book ${book.id}`, err);
            return { id: book.id, chapterTitle: null };
          }
        });

        const chaptersResults = await Promise.all(chapterPromises);
        const chaptersMap = chaptersResults.reduce(
          (acc, { id, chapterTitle }) => {
            acc[id] = chapterTitle;
            return acc;
          },
          {} as { [key: number]: string | null }
        );
        setChapters(chaptersMap);
      } catch (err) {
        setError("Error fetching books");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [api]);

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

  // Display only 8 books on mobile devices
  const booksToDisplay = window.innerWidth < 768 ? books.slice(0, 8) : books;

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
        Latest Books
      </h1>
      <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-3 gap-7 justify-items-center">
        {booksToDisplay.map((book) => (
          <div
            key={book.id}
            className="flex flex-col items-center md:w-full w-32 gap-2 mx-2 max-w-max md:max-w-xs p-4 md:bg-gray-800 bg-none rounded-lg shadow-md"
          >
            <div className="md:w-full md:h-full w-28 h-48 mb-4 relative overflow-hidden rounded-lg">
              <img
                src={book.coverImage}
                alt={book.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 text-center">
              <h4 className="md:text-lg text-sm font-semibold mb-2">
                {truncateTitle(book.title, 16)}
              </h4>
              <p className="text-gray-400 md:text-sm text-xs ">
                by {book.author}
              </p>
            </div>
            <div className="mt-auto">
              <p className="text-gray-500 text-center text-xs">
                {timeAgo(book.updatedAt)}
              </p>
              <Link
                href={`/${book.title}/${chapters[book.id]}`}
                className="text-blue-400 md:text-sm text-xs mb-1 text-center justify-center flex"
              >
                {chapters[book.id] ? chapters[book.id] : " none "}
              </Link>{" "}
              <div className="justify-center flex">
                <Link
                  href={`/book/${book.id}`}
                  className="text-center w-14 md:w-20 py-2 md:py-3 text-sm md:text-base from-blue-300 to-purple-500 bg-gradient-to-tr flex items-center justify-center rounded-md h-6 hover:bg-blue-400 hover:to-purple-400 transition-colors duration-300"
                >
                  <p className="text-white">Read</p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksLatest;
