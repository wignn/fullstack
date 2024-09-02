import UpdateForm from "./edit-form"
import { getBookById } from "@/lib/data";
import { notFound } from "next/navigation";

const UpdateBookPage = async ({ params }:{params:any}) => {
  const id = params.id;
  console.log('Fetching book with ID:', id); 
  const Book = await getBookById(id);
  
  if (!Book) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Book</h1>
      <UpdateForm book={Book} />
    </div>
  );
};
export default UpdateBookPage;