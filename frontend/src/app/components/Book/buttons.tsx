"use client";

import Link from "next/link";
import { IoAddSharp,IoBook , IoPencil, IoTrashOutline, IoAdd } from "react-icons/io5";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deleteBook } from "@/lib/actions";

const BUTTON_PADDING_X = "px-5";
const BUTTON_PADDING_Y = "py-2";
const BUTTON_TEXT_SIZE = "text-sm";
const BUTTON_RADIUS = "rounded-sm";

export const CreateButton = () => {
  return (
    <Link
      href="/DataBook/BookCreate"
      className={`inline-flex items-center space-x-1 text-white bg-blue-700 hover:bg-blue-800 ${BUTTON_PADDING_X} ${BUTTON_PADDING_Y} ${BUTTON_RADIUS} ${BUTTON_TEXT_SIZE}`}
    >
      <IoAddSharp size={20} />
      Create
    </Link>
  );
};

export const ChapterBtn = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/DataBook/chapterCreate/${id}`}
      className={`inline-flex items-center space-x-1 border  border-gray-300 text-white bg-transparent hover:bg-blue-800 ${BUTTON_PADDING_X} ${BUTTON_PADDING_Y} ${BUTTON_RADIUS} ${BUTTON_TEXT_SIZE}`}
    >
      <IoAdd size={20} />
    </Link>
  );
};
export const Genre = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/DataBook/genre/${id}`}
      className={`inline-flex items-center space-x-1 border  border-gray-300 text-white bg-transparent hover:bg-blue-800 ${BUTTON_PADDING_X} ${BUTTON_PADDING_Y} ${BUTTON_RADIUS} ${BUTTON_TEXT_SIZE}`}
    >
      <IoBook size={20} />
    </Link>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/DataBook/edit/${id}`}
      className={`inline-flex items-center justify-center text-white bg-transparent border ${BUTTON_RADIUS} border-gray-300 hover:bg-gray-100 ${BUTTON_PADDING_X} ${BUTTON_PADDING_Y}`}
    >
      <IoPencil size={20} />
    </Link>
  );
};

export const DeleteButton = ({ id }: { id: any }) => {
  const DeleteContactWithId = deleteBook.bind(null, id);
  console.log(`this buton in dataBook${id}`)
  return (
    <form action={DeleteContactWithId}>
      <button
        type="submit"
        className={`inline-flex items-center justify-center text-white bg-transparent border ${BUTTON_RADIUS} border-gray-300 hover:bg-gray-100 ${BUTTON_PADDING_X} ${BUTTON_PADDING_Y}`}
      >
        <IoTrashOutline size={20} />
      </button>
    </form>
  );
};

export const SubmitButton = ({ label} ) => {
  const { pending } = useFormStatus();

  const className = clsx(
    "text-white bg-gradient-to-r from-blue-400 to-purple-600 p-6 rounded-lg shadow-lg hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-3 text-center",
    {
      "opacity-50 cursor-progress": pending,
    }
  );

  return (
    <button type="submit" className={className} disabled={pending}>
      {label === "save" ? (
        <span>{pending ? "Saving..." : "Save"}</span>
      ) : (
        <span>{pending ? "Updating..." : "Update"}</span>
      )}
    </button>
  );
};


interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
}

export const SubmitButtonPost = ({ label, disabled }: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={disabled} // Disable button if the form is submitting
    className={`w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-transform duration-300 ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-blue-600'
    }`}
  >
    {label}
  </button>
);