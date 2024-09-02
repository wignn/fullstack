import Navbar from "./NavbarComponents";
import Footer from "./Footer";
import Image from "next/image";
import Semple from "../../../public/backimg.jpg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import EmailToAdmin from '@/app/components/emailToAdmin'
import Loading from "./Loading";

export default async function Home() {
  let session = null;
  let isLoading = true;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Error fetching session data:", error);
  } finally {
    isLoading = false;
  }

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="container mx-auto flex-1 p-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between py-20">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Our Landing Page
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8">
              Discover our services and solutions tailored for your success.
            </p>
            <a
              href="#services"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full transition"
            >
              Get Started
            </a>
          </div>
          <div className="mt-8 md:mt-0">
            <Image
              src={Semple}
              alt="Hero Image"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-10">About Us</h2>
          <p className="text-lg text-center max-w-3xl mx-auto">
            We are a team of professionals dedicated to providing top-notch
            services. Our mission is to help you achieve your goals with the
            best solutions tailored to your needs.
          </p>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-800 rounded-lg">
  <h2 className="text-3xl font-bold text-center mb-10">Feature</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4">
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-center flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-4">Post</h3>
        <p className="text-gray-400">
          The Dashboard is a feature that allows users to easily post and
          manage content. It offers an intuitive interface for creating,
          editing, and organizing posts, making content management
          streamlined and efficient.
        </p>
      </div>
      <Link href="/post">
        <button className="w-32 h-10 mt-4 px-5 text-white font-semibold border border-blue-500 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Post
        </button>
      </Link>
    </div>
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-center flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-4">Dashboard</h3>
        <p className="text-gray-400">
          The Book Dashboard provides a simple interface to manage and
          explore your collection. It shows key stats, lets you search by
          title or author, and displays detailed book info with cover
          images.
        </p>
      </div>
      <Link href="/dashboard">
        <button className="w-32 h-10 mt-4 px-5 text-white font-semibold border border-blue-500 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Dashboard
        </button>
      </Link>
    </div>
    <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-center flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-4">Profile</h3>
        <p className="text-gray-400">
          The Profile feature allows users to view and edit their personal
          information, including updating their profile photo and other
          details. It provides an easy way to manage and customize your
          profile to keep it up to date.
        </p>
      </div>
      <Link href="/profile">
        <button className="w-32 h-10 mt-4 px-5 text-white font-semibold border border-blue-500 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Profile
        </button>
      </Link>
    </div>
   
  </div>
   <div className="flex justify-center">
    {session?.user?.name === "Admin" && (
        <Link href="/admin">
          <button className="w-32 h-20 mt-4 px-5 text-white font-semibold border border-blue-500 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            Admin Dasboard
          </button>
        </Link>
      )}
      </div>
</section>
    <EmailToAdmin/>
      </main>

      <Footer />
    </div>
  );
}
