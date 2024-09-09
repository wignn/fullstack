"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import AdminLayout from "../LayoutAdmin";

interface Profile {
  image: string;
}

interface User {
  id: string;
  name: string;
  profile: Profile;
  isOnline: boolean;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const Api = process.env.NEXT_PUBLIC_API || "http://localhost:4000";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${Api}/users`);
        const userData = response.data;
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [Api]);

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading users...</p>;
  }

  return (
    <AdminLayout>
      <div className="min-h-screen p-4 sm:p-6 md:p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-slate-700 rounded-lg shadow-lg p-4 sm:p-6">
              <div className="flex items-center">
                <Image
                  src={user.profile?.image || "/default-avatar.png"}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="ml-3">
                  <h2 className="text-md sm:text-lg font-semibold">{user.name}</h2>
                  <p className="text-gray-400">ID: {user.id}</p>
                  <p
                    className={`text-sm mt-1 ${
                      user.isOnline ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {user.isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
