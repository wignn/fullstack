import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DarkModeToggle from "./components/darkToggle";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Header Section */}
      <header className="w-full bg-white shadow-md p-6 flex justify-between items-center dark:bg-gray-800 dark:shadow-gray-900">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">My Awesome App</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Home</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Features</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Pricing</a></li>
            <li><a href="#" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center bg-blue-600 text-white py-24 px-8 w-full dark:bg-blue-800 dark:text-gray-200">
        <h2 className="text-4xl font-extrabold mb-4">Welcome to My Awesome App</h2>
        <p className="text-lg mb-8">The best solution for managing your tasks efficiently and effectively.</p>

        <DarkModeToggle />
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-16 px-8 bg-white dark:bg-gray-900">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8 dark:text-gray-200">Features</h3>
        <div className="flex flex-wrap justify-center space-x-4">
          <div className="bg-gray-200 p-6 rounded-lg shadow-md w-80 mb-4 dark:bg-gray-700 dark:text-gray-200">
            <h4 className="text-xl font-semibold mb-2">Feature 1</h4>
            <p className="text-gray-700 dark:text-gray-300">Description of feature 1 goes here.</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-md w-80 mb-4 dark:bg-gray-700 dark:text-gray-200">
            <h4 className="text-xl font-semibold mb-2">Feature 2</h4>
            <p className="text-gray-700 dark:text-gray-300">Description of feature 2 goes here.</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-md w-80 mb-4 dark:bg-gray-700 dark:text-gray-200">
            <h4 className="text-xl font-semibold mb-2">Feature 3</h4>
            <p className="text-gray-700 dark:text-gray-300">Description of feature 3 goes here.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-blue-600 text-white p-6 text-center dark:bg-blue-800">
        <p className="text-sm">© 2024 My Awesome App. All rights reserved.</p>
      </footer>
    </main>
  );
}
