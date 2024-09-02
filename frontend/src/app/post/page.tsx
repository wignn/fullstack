import { articels } from "@/lib/data";
import { Create } from "./components/button";
import PostListClient from "./components/PostList";
import Navbar from "../components/NavbarComponents";
import Footer from "../components/Footer";

export default async function PostList() {
  let posts = [];
  try {
    posts = await articels();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <div className="bg-slate-800">
      <Navbar />
      <div className="mx-auto min-h-screen bg-gradient-to-r bg-gray-400 shadow-md rounded-lg max-w-4xl p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 justify-center flex">
          Post List
        </h2>
        <div className="mb-2">
          <Create />
        </div>
        <PostListClient posts={posts} />
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}
