"use client";

import { saveBook } from "@/lib/action/Book";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/app/components/Book/buttons";

const CreateBookForm = () => {
  const [state, formAction] = useFormState(saveBook, null);

  return (
    <div className=" bg-slate-500 bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-lg max-w-md mx-auto mt-8 shadow-xl border border-gray-300">
      <form
        action={formAction}
        className="bg-white p-6 rounded-lg shadow-md bg-opacity-90"
      >
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
            placeholder="Book Title..."
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.title}</p>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-900"
          >
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="Author Name..."
          />
          <div id="author-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.author}</p>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="synopsis"
            className="block text-sm font-medium text-gray-900"
          >
            synopsis
          </label>
          <input
            type="text"
            name="synopsis"
            id="synopsis"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="synopsis..."
          />
          <div id="synopsis-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.Error?.synopsis}</p>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-gray-900"
          >
            Cover Image URL
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />
          <div id="coverImage-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {state?.Error?.coverImage}
            </p>
          </div>
        </div>
        <div className="mb-5">
          <div id="message-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.message}</p>
          </div>
        </div>
        <SubmitButton label="Save" />
      </form>
    </div>
  );
};

export default CreateBookForm;
