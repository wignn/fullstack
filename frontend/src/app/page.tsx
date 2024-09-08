import BooksLatest from "./components/BookLatest"
import EmailToAdmin from "./components/emailToAdmin"
import FeatureList from "./components/Extend"
import Home from "./components/Hero"


const landing = ()=>{

  return (
    <div>
    <Home/>
    <FeatureList/>
    <BooksLatest/>
    <EmailToAdmin/>
    </div>
  )
}
export default landing;