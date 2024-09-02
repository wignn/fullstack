// pages/posts.tsx
import Navbar from "@/app/components/NavbarComponents";
import PostForm from "../components/PostForm";
import Footer from "@/app/components/Footer";

export default function PostsPage() {
  return (
    <div className="bg-slate-500 min-h-full">
      <Navbar />
      <div className="text-black justify-center flex items-center my-10">
        <PostForm />
      </div>
      <Footer/>
    </div>
  );
}
