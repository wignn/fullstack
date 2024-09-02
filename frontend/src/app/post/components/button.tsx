import Link from "next/link";
import { deletePost } from "@/lib/actions";
import { IoTrashOutline } from "react-icons/io5";

export const Create = () => {
    return (
      <Link href="/post/create">
        <button className="rounded-sm p-2 bg-gradient-to-r from-blue-500 to-purple-400 text-white hover:bg-gradient-to-l hover:from-blue-600 hover:to-purple-500 w-24 border-spacing-1">
          Create
        </button>
      </Link>
    );
  };

 export const DeleteButton = ({ id }: { id: string }) => {
    const DeleteButtonById = deletePost.bind(null, id);
    return (
      <form action={DeleteButtonById}>
        <button className="rounded-sm border p-1 hover:bg-gray-100 ml-auto">
          <IoTrashOutline size={20} />
        </button>
      </form>
    );
  };
