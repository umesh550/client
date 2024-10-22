import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

// Define types for Property and Inquiry
interface Property {
  id: string;
  title: string;
  price: number;
  area: number;
  approved: boolean;
}

interface Inquiry {
  id: string;
  message: string;
  property: Property;
  buyer: {
    fullName: string;
  };
  createdAt: string;
}

export default function SellerDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/seller/properties");
        setProperties(response.data);
      } catch (error) {
        setError("Error fetching properties");
      } finally {
        setLoadingProperties(false);
      }
    };

    const fetchInquiries = async () => {
      try {
        const response = await axios.get("/api/seller/inquiries");
        setInquiries(response.data);
      } catch (error) {
        setError("Error fetching inquiries");
      } finally {
        setLoadingInquiries(false);
      }
    };

    fetchProperties();
    fetchInquiries();
  }, []);

  // Handle case where user might be null
  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You must be logged in to view this dashboard.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
      <p className="mb-4">Welcome, {user.fullName}!</p>

      <Link
        to="/add-property"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 inline-block"
      >
        Add New Property
      </Link>

      <h2 className="text-xl font-semibold mb-2">Your Properties</h2>
      {loadingProperties ? (
        <p>Loading properties...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p>Price: ${property.price.toLocaleString()}</p>
              <p>Area: {property.area} sqft</p>
              <p>
                Status: {property.approved ? "Approved" : "Pending Approval"}
              </p>
              <Link
                to={`/edit-property/${property.id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Inquiries</h2>
      {loadingInquiries ? (
        <p>Loading inquiries...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : inquiries.length === 0 ? (
        <p>No inquiries found.</p>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div key={inquiry.id} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold">
                {inquiry.property.title}
              </h3>
              <p className="text-gray-600">{inquiry.message}</p>
              <p className="text-sm text-gray-500">
                From: {inquiry.buyer.fullName}
              </p>
              <p className="text-sm text-gray-500">
                Received on: {new Date(inquiry.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
