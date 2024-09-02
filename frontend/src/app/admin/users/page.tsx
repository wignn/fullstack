import { dataUser } from "./userData";
import AdminLayout from "../LayoutAdmin";


const User = async () => {
 
  const data = await dataUser();

  return (
    <AdminLayout>
      <div className="mx-auto p-5 max-w-6xl bg-gray-800 text-white font-sans rounded-lg shadow-md">
        <h1 className="text-center mb-5 text-2xl font-bold">Data Pengguna</h1>
        {data.length > 0 ? (
          <table className="w-full border-collapse overflow-x-auto">
            <thead>
              <tr>
                <th className="bg-gray-700 text-white p-3 text-left">ID</th>
                <th className="bg-gray-700 text-white p-3 text-left">Email</th>
                <th className="bg-gray-700 text-white p-3 text-left">Nama</th>
                <th className="bg-gray-700 text-white p-3 text-left">Role</th>
                <th className="bg-gray-700 text-white p-3 text-left">Dibuat Pada</th>
                <th className="bg-gray-700 text-white p-3 text-left">Status</th> {/* New Column for Online Status */}
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id} className="border-b border-gray-600">
                  <td className="p-3 text-left text-gray-300">{user.id}</td>
                  <td className="p-3 text-left text-gray-300">{user.email}</td>
                  <td className="p-3 text-left text-gray-300">{user.name}</td>
                  <td className="p-3 text-left text-gray-300">{user.role}</td>
                  <td className="p-3 text-left text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-left">
                    {/* Display online status */}
                    {user.isOnline ? (
                      <span className="text-green-500">Online</span>
                    ) : (
                      <span className="text-red-500">Offline</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center p-5 text-gray-400">Loading data...</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default User;
