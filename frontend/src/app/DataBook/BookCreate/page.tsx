import CreateForm from "@/app/components/Book/create-form";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/NavbarComponents";

const createBookPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-500">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-lg mx-auto mt-10 mb-10">
          <CreateForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default createBookPage;
