import CreateForm from "@/app/components/Book/create-form";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/NavbarComponents";

const createBookPage = () => {
  return (
    <div className="bg-slate-500 ">
      <Navbar/>
    <div className="max-w-md mx-auto mt-5 mb-7 ">
      
      <CreateForm />
    </div>
    <Footer/>
    </div>
  );
};

export default createBookPage;