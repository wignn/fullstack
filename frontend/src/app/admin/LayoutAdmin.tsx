'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/NavbarComponents';

export default function AdminLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar />
      <div className={`min-h-screen ${darkMode ? 'bg-slate-500' : 'bg-white'} text-dark-text flex`}>
        {/* Sidebar */}
        <aside className={`w-64 p-6 ${darkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <nav>
            <ul>
              <li className="mb-4">
                <Link href="/admin">
                  <p className={`block p-2 rounded ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-300'}`}>
                    Dashboard
                  </p>
                </Link>
              </li>
              
              <li className="mb-4">
                <Link href="/admin/settings">
                  <p className={`block p-2 rounded ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-300'}`}>
                    Settings
                  </p>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/admin/Create">
                  <p className={`block p-2 rounded ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-300'}`}>
                    Create
                  </p>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/admin/allUsers">
                  <p className={`block p-2 rounded ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-300'}`}>
                    Create
                  </p>
                </Link>
              </li>
            </ul>
          </nav>
          <button
            className={`mt-auto block p-2 rounded ${darkMode ? 'bg-slate-600 text-white hover:bg-slate-500' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            Toggle Dark Mode
          </button>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${darkMode ? 'text-white' : 'text-black'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
