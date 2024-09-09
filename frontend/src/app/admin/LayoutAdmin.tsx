"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/NavbarComponents';

export default function AdminLayout({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar />
      <div className={`min-h-screen ${darkMode ? 'bg-slate-500' : 'bg-white'} text-dark-text flex`}>
        {/* Sidebar */}
        {sidebarOpen && ( // Menampilkan sidebar jika sidebarOpen true
          <aside className={`md:w-52 w-32 p-6 ${darkMode ? 'bg-slate-700' : 'bg-gray-100'} transition-all duration-300`}>
            <h3 className="text-base font-bold mb-6">Admin Dashboard</h3>
            <nav>
              <ul>
                <li className="mb-4">
                  <Link href="/admin">
                    <p className={`text-xs md:text-base block p-2 rounded ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-300'}`}>
                      Dashboard
                    </p>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/admin/settings">
                    <p className={`block p-2 text-xs md:text-base rounded ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-300'}`}>
                      Settings
                    </p>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/admin/Create">
                    <p className={`block p-2 text-xs md:text-base rounded ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-300'}`}>
                      Create
                    </p>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/admin/allUsers">
                    <p className={`block p-2 text-xs md:text-base rounded ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-300'}`}>
                      All Users
                    </p>
                  </Link>
                </li>
              </ul>
            </nav>
            <button
              className={`text-xs md:text-base  mt-auto block p-2 rounded ${darkMode ? 'bg-slate-600 text-white hover:bg-slate-500' : 'text-xs md:text-base  bg-gray-300 text-black hover:bg-gray-400'}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              Toggle Dark Mode
            </button>
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 p-6 ${darkMode ? 'text-white' : 'text-black'} transition-all duration-300`}>
          <button
            className={`mb-4 p-2 rounded ${darkMode ? 'bg-slate-600 text-white hover:bg-slate-500 md:h-14 md:w-14 text-xs' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>
          {children}
        </main>
      </div>
    </div>
  );
}
