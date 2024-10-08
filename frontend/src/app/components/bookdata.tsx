"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Axios from "axios";
import { btnDataBookMark } from "@/app/bookmark/dataMark";
import { sessionData } from "@/lib/session";
import { Bookmark } from "../bookmark/bookMarkbtn";
import { IoBookmark } from "react-icons/io5";
import Navbar from "./NavbarComponents";
import Loading from "./Loading";
import { useSession } from "next-auth/react";

const BookDetails = () => {
  const pathname = usePathname();
  const bookId = pathname.split("/").pop();
  const [book, setBook] = useState<any>(null);
  const [chapters, setChapters] = useState([]);
  const [hasBookmark, setHasBookmark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const API = process.env.NEXT_PUBLIC_API || "http://localhost:4000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookResponse, chaptersResponse] = await Promise.all([
          Axios.get(`${API}/book/${bookId}`),
          Axios.get(`${API}/book/${bookId}/chapters`),
        ]);
        setBook(bookResponse.data);
        setChapters(chaptersResponse.data);
        const sessionPage = await useSession();
        setSession(sessionPage);
        const session = await sessionData();
        const userId = session?.user?.id;
        const bookmarkStatus = await btnDataBookMark(userId, bookId);
        setHasBookmark(bookmarkStatus);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookId]);

  if (loading) return <Loading />;

  if (!book)
    return (
      <p className="text-center mt-10 text-xl text-gray-400">Book not found.</p>
    );

  const generateChapterUrl = (chapterTitle: string) => {
    return `/${book.title.replace(/ /g, "-")}/${chapterTitle.replace(
      / /g,
      "-"
    )}`;
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white md:p-8 p-4">
        <div className="relative mb-10">
          <Image
            src={book.coverImage}
            alt={book.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center p-4">
            <h1 className="md:text-5xl text-2xl font-extrabold mb-4">
              {book.title}
            </h1>
            <p className="text-lg md:text-xl font-semibold text-gray-300">
              {book.author}
            </p>
            <div className="mt-4 md:text-lg text-base font-medium text-gray-400">
              {book.genre.map((g: any) => g.name).join(", ")}
            </div>
            <span
              className={`inline-block px-4 py-2 mt-6 rounded-full text-white ${
                book.status === "Ongoing" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {book.status}
            </span>
          </div>
        </div>
        <div className="flex justify-center p-4">
          <div className="relative md:w-[350px] w-[175px] md:h-[500px] h-[250px] overflow-hidden rounded-lg shadow-xl flex justify-center">
            <Image
              src={book.coverImage}
              alt={book.title}
              width={350}
              height={500}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
        <div className="justify-center flex p-4 pb-6">
          {session}
          {!hasBookmark && <Bookmark id={book.id} />}
          {hasBookmark && <IoBookmark size={30} />}
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="md:text-3xl text-xl font-bold mb-4 text-gray-100">
              Synopsis
            </h2>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              {book.synopsis}
            </p>
          </div>

          {/* Chapters */}
          <div className="mt-10">
            <h2 className="text-lg mx-5 md:text-2xl font-bold mb-4 text-gray-100">
              Chapters
            </h2>
            {chapters.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {chapters.map((chapter, index) => (
                  <li
                    key={index}
                    className="text-base text-gray-300 bg-gray-800 p-2 md:p-3 rounded-md shadow-sm hover:bg-gray-700 transition"
                  >
                    <Link href={generateChapterUrl(chapter.title)}>
                      <span className="mr-2">{index + 1}</span>
                      <span className="truncate">{chapter.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center mt-4 text-gray-400">
                No chapters available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
