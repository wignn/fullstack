"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { SingleImageDropzone } from "./image"; 
import { SubmitButton } from "@/app/components/Book/buttons";
import { useEdgeStore } from "@/lib/edgeStore";

interface FormData {
  title: string;
  author: string;
  synopsis: string;
  coverImage: File | null;
}

interface FileUrls {
  url: string;
  thumbnailUrl: string;
}

const CreateBookForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    synopsis: "",
    coverImage: null,
  });
  const [file, setFile] = useState<File>();
  const [url, setUrl] = useState<FileUrls>();
  const [progress, setProgress] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    const uploadUrlToDatabase = async () => {
      if (url) {
        try {
          await axios.post("http://localhost:4000/book/create", {
            ...formData,
            coverImage: url.url,
            publishedAt: new Date(),
          });
        } catch (error) {
          console.error("Error uploading URL to database:", error);
        }
      }
    };

    uploadUrlToDatabase();
  }, [url, formData]);

  const handleImageUpload = async () => {
    if (file) {
      const result = await edgestore.myPublicImage.upload({
        file,
        onProgressChange: (progress) => {
          setProgress(progress);
        },
      });
      setUrl({
        url: result.url || "",
        thumbnailUrl: result.thumbnailUrl || "",
      });
      setProgress(0); 
      console.log(result.url);
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
      await handleImageUpload();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg max-w-lg mx-auto mt-8 shadow-xl border border-gray-300">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg bg-opacity-95">
        {["title", "author", "synopsis"].map((field) => (
          <div className="mb-6" key={field}>
            <label htmlFor={field} className="block text-sm font-semibold text-gray-700 capitalize">
              {field}
            </label>
            {field === "synopsis" ? (
              <textarea
                name={field}
                id={field}
                rows={4}
                className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder={`Enter ${field}...`}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
              />
            ) : (
              <input
                type="text"
                name={field}
                id={field}
                className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder={`Enter ${field}...`}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
              />
            )}
            {formErrors[field] && <p className="mt-2 text-sm text-red-600">{formErrors[field]}</p>}
          </div>
        ))}

        <div className="mb-6">
          <label htmlFor="coverImage" className="block text-sm font-semibold text-gray-700">
            Cover Image
          </label>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 1,
            }}
            onChange={(file) => {
              setFile(file);
            }}
          />
          {formErrors.coverImage && <p className="mt-2 text-sm text-red-600">{formErrors.coverImage}</p>}
        </div>

        {progress > 0 && (
          <div className="w-full bg-gray-200 rounded-full mt-4">
            <div
              className="bg-blue-500 text-xs font-medium text-black text-center p-0.5 leading-none rounded-full"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}

        <SubmitButton label="Save" />
      </form>
    </div>
  );
};

export default CreateBookForm;
