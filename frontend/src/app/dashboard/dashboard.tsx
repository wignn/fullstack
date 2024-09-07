
import Image from "next/image";
import {formatDate} from "@/lib/utils";
import {ReadButton} from "@/app/[Book]/Bookbtn";
import {GetDashboard} from "./dashboardAction";
import Search from "../components/searchBook";
import Navbar from "../components/NavbarComponents";

interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    publishedAt: Date;
    coverImage?: string;
}

interface DashboardProps {
    query: string;
}

export default async function Dashboard({query}: DashboardProps) {
    const books: Book[] = await GetDashboard(query);
    // console.log(books);

    const totalBooks = books.length;
    const borrowedBooks = books.filter(book => book.status === 'Drop').length;
    const Ongoing = totalBooks - borrowedBooks;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8">
            <header className="flex justify-between items-center bg-gray-800 p-4 sm:p-6 rounded-md shadow-lg">
                <h1 className="text-xl sm:text-2xl font-bold text-white mr-3">Dashboard</h1>
                <Search/>
            </header>

            {/* Statistics */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8">
                <div className="flex-1 bg-gray-800 p-4 sm:p-6 rounded-md shadow-md text-center">
                    <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-gray-200">
                        Total Books
                    </h2>
                    <p className="text-2xl sm:text-3xl font-semibold text-white">
                        {totalBooks}
                    </p>
                </div>
                <div className="flex-1 bg-gray-800 p-4 sm:p-6 rounded-md shadow-md text-center">
                    <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-gray-200">
                        Borrowed Books
                    </h2>
                    <p className="text-2xl sm:text-3xl font-semibold text-white">
                        {borrowedBooks}
                    </p>
                </div>
                <div className="flex-1 bg-gray-800 p-4 sm:p-6 rounded-md shadow-md text-center">
                    <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-gray-200">
                        Available Books
                    </h2>
                    <p className="text-2xl sm:text-3xl font-semibold text-white">
                        {Ongoing}
                    </p>
                </div>
            </div>

            {/* Books List */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-md shadow-md mt-6 sm:mt-8">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-200">
                    Daftar Buku
                </h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {books.map((book) => (
                        <li key={book.id} className="flex flex-col justify-between px-2 py-4">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-48 md:h-72 object-cover rounded-md mb-4 shadow-sm"
                            />
                            <h3 className="text-md sm:text-lg font-semibold text-white">
                                {book.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-400">
                                {book.author}
                            </p>
                            <p className="text-sm sm:text-base text-gray-400">
                                Published At: {formatDate(book.publishedAt.toString())}
                            </p>
                            <div className="mt-2 sm:mt-4 flex justify-center">
                                <ReadButton
                                    id={book.id}/>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
