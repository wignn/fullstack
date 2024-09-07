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
  profile: Profile; // Ensure profile has an image field
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
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading users...</p>;
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-zinc-600 p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-slate-700 rounded-lg shadow-lg p-6">
              <div className="flex items-center">
                <Image
                  src={user.profile?.image || "/default-avatar.png"} // Fallback to default image
                  alt={user.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{user.name}</h2>
                  <p className="text-gray-500">ID: {user.id}</p>
                  <p
                    className={`text-sm mt-1 ${
                      user.isOnline ? "text-green-500" : "text-red-500"
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
