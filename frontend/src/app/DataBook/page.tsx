import Search from "../components/Book/search";
import BookTable from "@/app/components/Book/Book-table";
import { CreateButton } from "@/app/components/Book/buttons";
import { GetbookPages } from "@/lib/data";
import Pagination from "../components/Book/pagination";
import Navbar from "../components/NavbarComponents";
import Footer from '@/app/components/Footer';

const DataBook = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await GetbookPages(query);

  return (
    <div className="bg-slate-500 min-h-screen flex flex-col justify-between">
      <Navbar />
      
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <Search />
            <CreateButton />
          </div>
          
          {/* Table Section */}
          <div className="w-full">
            <BookTable query={query} currentPage={currentPage} />
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-8">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DataBook;
