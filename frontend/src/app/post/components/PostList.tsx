'use client';

import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { DeleteButton } from "./button";
import img from '../../../../public/1.jpg';
import { useSession } from "next-auth/react";

export default function PostListClient({ posts }:any) {
  const { data: session } = useSession();

  return (
    <ul className="space-y-4">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <li
            key={post.id}
            className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <div className="flex">
              <Image
                src={img}
                width={30}
                height={30}
                alt="User avatar"
                className="cursor-pointer rounded-full"
              />
              <p className="mt-1 mx-2">{post.have}</p>
            </div>
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-2">{post.content}</p>
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-auto rounded-md object-cover"
              />
            )}
            <p className="text-gray-500 text-sm mt-2">
              {formatDate(post.createdAt.toString())}
            </p>
            <div className="mt-2 flex justify-end">
              {(session?.user?.name === post.author || session?.user?.name === "Admin") && <DeleteButton id={post.id} />}
            </div>
          </li>
        ))
      ) : (
        <li className="text-center text-gray-500">No posts available.</li>
      )}
    </ul>
  );
}
