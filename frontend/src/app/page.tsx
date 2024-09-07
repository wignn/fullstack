import HomePage from "../../../api buangan/HomeComponent.Main";
import g1 from "../../public/asset/Omniscient-FirstPersons-Viewpoint.jpg";
import BookDetails from "./components/bookdata";
import BooksLatest from "./components/BookLatest";
import EmailToAdmin from "./components/emailToAdmin";
import FeatureList from "./components/Extend";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center bg-hero-pattern bg-cover">
        <h1 className="text-5xl font-bold mb-4">
          Selamat Datang di Dunia Novelku
        </h1>
        <p className="text-xl mb-6">
          Jelajahi petualangan yang menegangkan di setiap babnya
        </p>
        <a
          href="#features"
          className="bg-blue-600 px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
        >
          Baca Sekarang
        </a>
      </section>

      {/* 6 Features Section */}
      <section id="features" className="py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Fitur-Fitur Unggulan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <Feature
            title="Genre Populer"
            description="Fantasi, Sci-Fi, Drama, dan banyak lagi genre yang siap menemani hari-harimu."
            icon="/asset/Seducing-the-Student-Council-President.jpg"
          />
          <Feature
            title="Pembaruan Berkala"
            description="Nikmati bab baru setiap minggu dengan jadwal rilis yang teratur."
            icon="/asset/Omniscient-FirstPersons-Viewpoint.jpg"
          />
          <Feature
            title="Akses Gratis"
            description="Baca gratis atau nikmati keuntungan lebih dengan langganan premium."
            icon="/asset/121c842eed7d511eff13c323ae5072d2_551458_ori (1).jpg"
          />
          <Feature
            title="Komunitas Pembaca"
            description="Diskusikan cerita dan bagikan pendapatmu bersama komunitas penggemar."
            icon="/asset/Fake-Saint-Of-The-Year.jpg"
          />
          <Feature
            title="Tersedia di Berbagai Format"
            description="Nikmati dalam bentuk audio book, e-book, atau bahkan cetakan fisik."
            icon="/asset/Hong.Biyeon.full.4201699.jpg"
          />
          <Feature
            title="Login"
            description="Nikmati dalam bentuk audio book, e-book, atau bahkan cetakan fisik."
            icon="/asset/semple.jpg"
          />
        </div>
      </section>
      <FeatureList />
      <BooksLatest/>
      <EmailToAdmin />
      
    </div>
  );
}

// Komponen Feature untuk menampilkan fitur dengan gambar
function Feature({ title, description, icon }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-64 h-80 mb-4 relative overflow-hidden rounded-lg">
        <img src={icon} alt={title} className="object-cover w-full h-full" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-lg">{description}</p>
    </div>
  );
}
