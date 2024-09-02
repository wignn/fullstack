
"use client";

import { useFormState } from "react-dom";
import { saveBook, updateBook } from "@/lib/actions";
import { SubmitButton } from "@/app/components/Book/buttons";
import type { Book } from "@prisma/client";

const UpdateForm = ({ book }: { book: Book }) => {
  const updateBookById = updateBook.bind(null , book.id)
  const [state, formAction] = useFormState( updateBookById, null);

  return (
    <div>
      <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="title" className="block text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Book Title..."
            defaultValue={book.title}
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.title}</p>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="author" className="block text-sm font-medium text-gray-900">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Author Name..."
            defaultValue={book.author}
          />
          <div id="author-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.author}</p>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-900">
            synopsis
          </label>
          <input
            type="text"
            name="synopsis"
            id="synopsis"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="synopsis..."
            defaultValue={book.synopsis}
          />
          <div id="genre-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.genre}</p>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-900">
            Cover Image
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Cover Image URL..."
          />
          <div id="coverImage-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.coverImage}</p>
          </div>
        </div>
        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.message}</p>
        </div>
        <SubmitButton label="Update" />
      </form>
    </div>
  );
};

export default UpdateForm;
