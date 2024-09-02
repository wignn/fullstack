import ProfileSettingsClient from "@/app/components/setting";
import Navbar from "@/app/components/NavbarComponents";
import Footer from "@/app/components/Footer";

export default async function ProfileSettings() {
  return (
    <div className="bg-slate-600">
      <Navbar />
      <div className="">
      <ProfileSettingsClient /></div>
      <Footer />
    </div>
  );
}
