import React, { Suspense } from "react";
import BookDetails from "@/app/components/bookdata";
import { getBookById } from "@/lib/data";
import { notFound } from "next/navigation";
import Spinner from "@/app/components/spin";



const UpdateBookPage = async ({ params }: { params: any }) => {
  const id = params.id;
  const Book = await getBookById(id);
  
  if (!Book) {
    notFound();
  }

  return (
    <div >
      <Suspense fallback={<Spinner />}>
        <BookDetails book={Book} />
      </Suspense>
    </div>
  );
};

export default UpdateBookPage;
