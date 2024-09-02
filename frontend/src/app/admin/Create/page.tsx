import AdminLayout from '../LayoutAdmin';
import Link from 'next/link';

export default function Create() {
  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6">Create</h2>
      <div className="bg-dark-card p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold">Book Create</h3>
        <p className="mt-2">Creacte and edite Book</p>
        <Link href="/DataBook/BookCreate">
        <button className="w-32 h-10 mt-4 px-5 text-white font-semibold border border-blue-500 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create
        </button>
      </Link>
      </div>
      <div className="bg-dark-card p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold">Data book</h3>
        <p className="mt-2">Data Book</p>
        <Link href="/DataBook">
        <button className="w-32 h-10 mt-4 px-5 text-white font-semibold border border-blue-500 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Create
        </button>
      </Link>
      </div>
      <div className="bg-dark-card p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold">Create Genre</h3>
        <p className="mt-2">Create Genre for Books.</p>
          <Link href="/DataBook/genreCreate">
              <button className="w-32 h-10 mt-4 px-5 text-white font-semibold border border-blue-500 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Create
              </button>
          </Link>
      </div>
    </AdminLayout>
  );
}