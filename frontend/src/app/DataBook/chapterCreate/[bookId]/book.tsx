"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { saveChapter } from "./dataChapter";
import CreateButtonChapter from "../btn";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreateChapterForm = () => {
  const pathname = usePathname();
  const bookId = pathname.split("/").pop();
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
  
    const formData = new FormData(event.target);
    formData.set('content', content); 
    
    const response = await saveChapter(null, formData);
    if (response && response.Error) {
      setErrorMessage("Failed to create chapter. Please try again.");
    } else {
      setSuccessMessage("Chapter created successfully!");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg w-full mx-auto mt-8 shadow-xl border border-gray-300">
      <form
        className="bg-white p-6 rounded-lg shadow-md bg-opacity-90"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="bookId" value={bookId} />
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="Chapter Title..."
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-900"
          >
            Content
          </label>
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            className="w-full min-h-56"
          />
        </div>
        {successMessage && (
          <div className="text-green-600 mb-4">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-600 mb-4">{errorMessage}</div>
        )}
        <div className=" mt-20 ">
        <CreateButtonChapter label="Save" />
        </div>
      </form>

      {/* Preview Section */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Preview:</h2>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default CreateChapterForm;
