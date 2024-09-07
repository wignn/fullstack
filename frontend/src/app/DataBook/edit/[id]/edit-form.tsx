"use client";

import { useFormState } from "react-dom";
import { updateBook } from "@/lib/actions";
import { SubmitButton } from "@/app/components/Book/buttons";
import type { Book } from "@prisma/client";

const UpdateForm = ({ book }: { book: Book }) => {
  const updateBookById = updateBook.bind(null, book.id);
  const [state, formAction] = useFormState(updateBookById, null);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <form action={formAction} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
            placeholder="Book Title..."
            defaultValue={book.title}
          />
          {state?.Error?.title && (
            <p className="mt-2 text-sm text-red-600" id="title-error">
              {state.Error.title}
            </p>
          )}
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-semibold text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
            placeholder="Author Name..."
            defaultValue={book.author}
          />
          {state?.Error?.author && (
            <p className="mt-2 text-sm text-red-600" id="author-error">
              {state.Error.author}
            </p>
          )}
        </div>

        {/* Synopsis */}
        <div>
          <label htmlFor="synopsis" className="block text-sm font-semibold text-gray-700">
            Synopsis
          </label>
          <textarea
            name="synopsis"
            id="synopsis"
            rows={4}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
            placeholder="Enter a brief synopsis..."
            defaultValue={book.synopsis}
          />
          {state?.Error?.synopsis && (
            <p className="mt-2 text-sm text-red-600" id="synopsis-error">
              {state.Error.synopsis}
            </p>
          )}
        </div>

        {/* Cover Image */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-semibold text-gray-700">
            Cover Image
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
          />
          {state?.Error?.coverImage && (
            <p className="mt-2 text-sm text-red-600" id="coverImage-error">
              {state.Error.coverImage}
            </p>
          )}
        </div>

        {/* Error Message */}
        {state?.message && (
          <div id="message-error" aria-live="polite" aria-atomic="true">
            <p className="mt-4 text-sm text-red-600">{state.message}</p>
          </div>
        )}

        {/* Submit Button */}
        <SubmitButton label="Update" />
      </form>
    </div>
  );
};

export default UpdateForm;
