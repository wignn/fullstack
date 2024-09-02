import Footer from '../components/Footer'
import RegisterForm from '../components/FromRegister'
import Navbar from '../components/NavbarComponents'

export default async function register (){
  return(
    <div className='bg-slate-700'>
      <Navbar/>
    <RegisterForm/>
    <Footer/>
    </div>
  )
}
