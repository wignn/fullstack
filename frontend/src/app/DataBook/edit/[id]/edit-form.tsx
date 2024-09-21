"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { SubmitButton } from "@/app/components/Book/buttons";
import { SingleImageDropzone } from "@/app/components/Book/image";
import type { Book } from "@prisma/client";
import { useEdgeStore } from "@/lib/edgeStore";

const UpdateForm = ({ book }: { book: Book }) => {
  const [formData, setFormData] = useState({
    title: book.title || "",
    author: book.author || "",
    synopsis: book.synopsis || "",
    coverImage: null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<{ url: string; thumbnailUrl: string } | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const { edgestore } = useEdgeStore();

  useEffect(() => {
    if (url) {
      handleUpdateBook();
    }
  }, [url]);

  const handleUpdateBook = async () => {
    try {
      await axios.put(`http://localhost:4000/book/update`, {
        ...formData,
        coverImage: url.url,
        publishedAt: new Date(),
        bookId: book.id,
      });
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.author) errors.author = "Author is required";
    if (!formData.synopsis) errors.synopsis = "Synopsis is required";
    if (!file) errors.coverImage = "Cover image is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await edgestore.myPublicImage.upload({
        file,
        onProgressChange: (progress) => setProgress(progress),
      });
      setUrl({
        url: result.url || "",
        thumbnailUrl: result.thumbnailUrl || "",
      });
      setProgress(0);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg max-w-lg mx-auto mt-8 shadow-xl border border-gray-300 transition-all duration-300">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg bg-opacity-95 transition-all duration-300">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-300"
            placeholder="Enter title..."
            value={formData.title}
            onChange={handleChange}
          />
          {formErrors.title && <p className="mt-2 text-sm text-red-600">{formErrors.title}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="author" className="block text-sm font-semibold text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-300"
            placeholder="Enter author..."
            value={formData.author}
            onChange={handleChange}
          />
          {formErrors.author && <p className="mt-2 text-sm text-red-600">{formErrors.author}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="synopsis" className="block text-sm font-semibold text-gray-700">Synopsis</label>
          <textarea
            name="synopsis"
            id="synopsis"
            rows={4}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all duration-300"
            placeholder="Enter synopsis..."
            value={formData.synopsis}
            onChange={handleChange}
          />
          {formErrors.synopsis && <p className="mt-2 text-sm text-red-600">{formErrors.synopsis}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="coverImage" className="block text-sm font-semibold text-gray-700">Cover Image</label>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 1,
            }}
            onChange={setFile}
          />
          {formErrors.coverImage && <p className="mt-2 text-sm text-red-600">{formErrors.coverImage}</p>}
        </div>

        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full mt-4">
            <div
              className="bg-blue-500 text-xs font-medium text-black text-center p-0.5 leading-none rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}

        <div className="mt-6">
          <SubmitButton label="Save" />
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
