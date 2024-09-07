import { getSessionData } from "../../lib/test";
import Background from "../components/bg";
import Footer from "../components/Footer";
import Navbar from "../components/NavbarComponents";
import Profile from "../components/ProfileSettingsClient";

export default async function ProfileSettings() {
  const session = await getSessionData();
  const id = session?.user?.id;
  return (
    <div className="bg-slate-700">
      <Navbar />
      <div className="">
        <Profile id={id} />
      </div>
      <Footer />
    </div>
  );
}
