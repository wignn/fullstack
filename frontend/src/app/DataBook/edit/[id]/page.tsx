import Navbar from "@/app/components/NavbarComponents";
import UpdateForm from "./edit-form";
import { getBookById } from "@/lib/data";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";

const UpdateBookPage = async ({ params }: { params: any }) => {
  const id = params.id;
  console.log('Fetching book with ID:', id);
  const Book = await getBookById(id);

  if (!Book) {
    notFound();
  }

  return (
   <div>
    <Navbar/>
   <div className="bg-zinc-500">
    <div className="max-w-2xl mx-auto bg-zinc-600 p-6  shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-1">Update Book</h1>
      <UpdateForm book={Book} />
    </div>
    </div>
    </div>
  );
};

export default UpdateBookPage;
