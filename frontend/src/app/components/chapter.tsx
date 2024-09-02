"use client";

import { useState, useEffect } from "react";
import { testts } from "../[Book]/[id]/content";
import { usePathname, useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";

const ChapterContent = () => {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  const [previousChapter, setPreviousChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textSize, setTextSize] = useState("text-base"); 
  const pathname = usePathname();
  const router = useRouter();

  let pathParts = pathname.split('/').filter(part => part);
  if (pathParts.length < 2) {
    throw new Error("Invalid URL structure");
  }
  let bookTitle = decodeURIComponent(pathParts[0]).replace(/-/g, " ");
  let chapterTitle = decodeURIComponent(pathParts[1]).replace(/-/g, " ");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        console.log(`Fetching book with title: ${bookTitle}`);
        console.log(`Fetching chapter with title: ${chapterTitle}`);

        const bookData = await testts(bookTitle);
        if (!bookData) {
          throw new Error("Book not found");
        }

        const chapter = bookData.chapters.find(chap => chap.title === chapterTitle);
        if (!chapter) {
          throw new Error("Chapter not found");
        }

        const chapterIndex = bookData.chapters.findIndex(chap => chap.title === chapterTitle);
        if (chapterIndex === -1) {
          throw new Error("Current chapter index not found");
        }

        const nextChapter = bookData.chapters[chapterIndex + 1] || null;
        const previousChapter = bookData.chapters[chapterIndex - 1] || null;

        setContent({ chapter });
        setNextChapter(nextChapter);
        setPreviousChapter(previousChapter);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" && nextChapter) {
        router.push(`/${bookTitle.replace(/ /g, "-")}/${nextChapter.title.replace(/ /g, "-")}`);
      } else if (event.key === "ArrowLeft" && previousChapter) {
        router.push(`/${bookTitle.replace(/ /g, "-")}/${previousChapter.title.replace(/ /g, "-")}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextChapter, previousChapter, bookTitle, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading content: {error.message}</div>;
  }

  if (!content) {
    return <div>No content found.</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full md:max-w-4xl mx-auto bg-gray-800 text-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-center">{content.chapter.title}</h1>
          <select
            className="bg-gray-700 text-white rounded px-2 py-1"
            value={textSize}
            onChange={(e) => setTextSize(e.target.value)}
          >
            <option value="text-sm">Small</option>
            <option value="text-base">Medium</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
          </select>
        </div>
        <section className={`mt-5 ${textSize}`} dangerouslySetInnerHTML={{ __html: content.chapter.content }} />
        <div className="mt-5 flex justify-between w-full mb-16">
          <div className="flex-1 text-left">
            {previousChapter && (
              <button
                onClick={() => router.push(`/${bookTitle.replace(/ /g, "-")}/${previousChapter.title.replace(/ /g, "-")}`)}
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded hover:bg-gradient-to-l hover:from-gray-500 hover:to-gray-600 transition duration-200"
              >
                Previous Chapter
              </button>
            )}
          </div>
          <div className="flex-1 text-right">
            {nextChapter && (
              <button
                onClick={() => router.push(`/${bookTitle.replace(/ /g, "-")}/${nextChapter.title.replace(/ /g, "-")}`)}
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded hover:bg-gradient-to-l hover:from-gray-500 hover:to-gray-600 transition duration-200"
              >
                Next Chapter
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterContent;
