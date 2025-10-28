import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>("https://fakestoreapi.com/users");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center space-x-3 text-gray-600">
          <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-lg font-medium">Loading users</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold bg-red-50 px-6 py-3 rounded-xl shadow">
          {error}
        </p>
      </div>
    );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Users List</h1>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center py-10 text-lg">
          No users found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["ID", "Name", "Email", "Username", "City", "Phone"].map(
                  (header) => (
                    <th
                      key={header}
                      className="py-3 px-5 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50 transition-colors duration-150"
                >
                  <td className="py-3 px-5 text-sm text-gray-700">{user.id}</td>
                  <td className="py-3 px-5 text-sm text-gray-800 font-medium">
                    {user.name.firstname} {user.name.lastname}
                  </td>
                  <td className="py-3 px-5 text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="py-3 px-5 text-sm text-gray-700">
                    {user.username}
                  </td>
                  <td className="py-3 px-5 text-sm text-gray-700">
                    {user.address.city}
                  </td>
                  <td className="py-3 px-5 text-sm text-gray-700">
                    {user.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
