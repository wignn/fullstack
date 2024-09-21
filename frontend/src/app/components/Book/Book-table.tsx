"use client";
import { useEffect, useState } from "react";
import { GetBook } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { EditButton, DeleteButton, ChapterBtn, Genre } from "./buttons";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Loading from "../Loading";

const BookTable = ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const [books, setBooks] = useState([]);
  const session = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const result = async () => {
        const fetchedBooks = await GetBook(query, currentPage);
        if (fetchedBooks) {
          setBooks(fetchedBooks);
        }
      };
      result();
    } catch (error) {
      console.error("Error fetching books:", error);
    }finally
{
  setLoading(false)
}
  }, [query, currentPage, session]);

  if(loading){
    return(
      <Loading/>
    )
  }

  const handleDelete = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <div className="flex justify-center items-center w-full min-h-full">
      <table className="w-full text-sm text-left text-black bg-white border-slate-900 bg-opacity-20 shadow-lg border-2">
        <thead className="text-sm text-black uppercase bg-transparent border-slate-900 shadow-lg border-b">
          <tr>
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Cover</th>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">Author</th>
            <th className="py-3 px-6">Genre</th>
            <th className="py-3 px-6">Publish</th>
            <th className="py-3 px-6 text-center">Last Updated</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr
                key={book.id}
                className="bg-transparent text-black border-b border-slate-950 h-20"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={300}
                    height={300}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-3 px-6">{book.title}</td>
                <td className="py-3 px-6">{book.author}</td>
                <td className="py-3 px-6">{book.genre}</td>
                <td className="py-3 px-6">
                  {formatDate(book.publishedAt.toString())}
                </td>
                <td className="py-3 px-6">
                  {formatDate(book.updatedAt.toString())}
                </td>
                <td className="flex justify-center gap-1 py-3">
                  <EditButton id={book.id} />
                  <DeleteButton id={book.id} onDelete={handleDelete} />
                  <ChapterBtn id={book.id} />
                  <Genre id={book.id} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-3 px-6 text-center text-gray-500">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
