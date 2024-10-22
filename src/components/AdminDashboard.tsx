import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

interface Property {
  id: string;
  title: string;
  price: number;
  area: number;
  approved: boolean;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/admin/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchUsers();
    fetchProperties();
  }, []);

  const handleApproveProperty = async (propertyId: string) => {
    try {
      await axios.post(`/api/admin/properties/${propertyId}/approve`);
      setProperties(
        properties.map((p) =>
          p.id === propertyId ? { ...p, approved: true } : p
        )
      );
    } catch (error) {
      console.error("Error approving property:", error);
    }
  };

  const handleRemoveProperty = async (propertyId: string) => {
    try {
      await axios.delete(`/api/admin/properties/${propertyId}`);
      setProperties(properties.filter((p) => p.id !== propertyId));
    } catch (error) {
      console.error("Error removing property:", error);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {user ? <p className="mb-4">Welcome, {user.fullName}!</p> : null}

      <h2 className="text-xl font-semibold mb-2">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.fullName}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleRemoveUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold mb-2 mt-8">Properties</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Area</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="border px-4 py-2">{property.title}</td>
                <td className="border px-4 py-2">
                  ${property.price.toLocaleString()}
                </td>
                <td className="border px-4 py-2">{property.area} sqft</td>
                <td className="border px-4 py-2">
                  {property.approved ? "Approved" : "Pending"}
                </td>
                <td className="border px-4 py-2">
                  {!property.approved && (
                    <button
                      onClick={() => handleApproveProperty(property.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                    >
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveProperty(property.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
