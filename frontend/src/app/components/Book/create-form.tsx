"use client";

import { useState } from "react";
import { saveBook } from "@/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/app/components/Book/buttons";

const CreateBookForm = () => {
  const [state, formAction] = useFormState(saveBook, null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg max-w-lg mx-auto mt-8 shadow-xl border border-gray-300">
      <form
        action={formAction}
        className="bg-white p-6 rounded-lg shadow-lg bg-opacity-95"
      >
        {/* Title Field */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Enter book title..."
          />
          {state?.Error?.title && (
            <p className="mt-2 text-sm text-red-600" id="title-error">
              {state.Error.title}
            </p>
          )}
        </div>

        {/* Author Field */}
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block text-sm font-semibold text-gray-700"
          >
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Enter author name..."
          />
          {state?.Error?.author && (
            <p className="mt-2 text-sm text-red-600" id="author-error">
              {state.Error.author}
            </p>
          )}
        </div>

        {/* Synopsis Field */}
        <div className="mb-6">
          <label
            htmlFor="synopsis"
            className="block text-sm font-semibold text-gray-700"
          >
            Synopsis
          </label>
          <textarea
            name="synopsis"
            id="synopsis"
            rows={4}
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Enter a brief synopsis..."
          />
          {state?.Error?.synopsis && (
            <p className="mt-2 text-sm text-red-600" id="synopsis-error">
              {state.Error.synopsis}
            </p>
          )}
        </div>

        {/* Cover Image Field with Preview */}
        <div className="mb-6">
          <label
            htmlFor="coverImage"
            className="block text-sm font-semibold text-gray-700"
          >
            Cover Image
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            accept="image/*"
            className="mt-2 block w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            onChange={handleImageChange}
          />
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Image Preview"
                className="w-full h-auto max-h-64 object-contain rounded-lg shadow-md"
              />
            </div>
          )}
          {state?.Error?.coverImage && (
            <p className="mt-2 text-sm text-red-600" id="coverImage-error">
              {state.Error.coverImage}
            </p>
          )}
        </div>

        {/* Error Message */}
        {state?.message && (
          <div className="mb-6" id="message-error" aria-live="polite">
            <p className="text-sm text-red-600">{state.message}</p>
          </div>
        )}

        {/* Submit Button */}
        <SubmitButton label="Save" />
      </form>
    </div>
  );
};

export default CreateBookForm;
