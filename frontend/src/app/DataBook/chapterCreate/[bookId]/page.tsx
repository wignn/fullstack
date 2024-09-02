import Navbar from "@/app/components/NavbarComponents"
import CreateChapterForm from "./book"
import Footer from "@/app/components/Footer"

const chapter =()=>{

  return (
    <div className="bg-slate-500">
    <Navbar/>
    <div className="mb-10">
    <CreateChapterForm/></div>
    <Footer/>
    </div>
  )
}
export default chapter