import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext.tsx";

// Define types for property and inquiry
interface Property {
  id: number;
  title: string;
  price: number;
  area: number;
}

interface Inquiry {
  id: number;
  property: Property;
  message: string;
  createdAt: string;
}

// Define the User type (assuming it has fullName)
interface User {
  fullName: string;
}

export default function BuyerDashboard() {
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]); // Specify type as array of Property
  const [inquiries, setInquiries] = useState<Inquiry[]>([]); // Specify type as array of Inquiry
  const { user } = useAuth() as { user: User | null }; // Add type for useAuth hook

  // Fetching favorite properties and inquiries on component mount
  useEffect(() => {
    const fetchFavoriteProperties = async () => {
      try {
        const response = await axios.get<Property[]>(
          "/api/buyer/favorite-properties"
        ); // Specify expected response type
        setFavoriteProperties(response.data); // Update state with the fetched properties
      } catch (error) {
        console.error("Error fetching favorite properties:", error); // Log errors
      }
    };

    const fetchInquiries = async () => {
      try {
        const response = await axios.get<Inquiry[]>("/api/buyer/inquiries"); // Specify expected response type
        setInquiries(response.data); // Update state with the fetched inquiries
      } catch (error) {
        console.error("Error fetching inquiries:", error); // Log errors
      }
    };

    fetchFavoriteProperties(); // Call function to fetch favorite properties
    fetchInquiries(); // Call function to fetch inquiries
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>
      {user && <p className="mb-4">Welcome, {user.fullName}!</p>}{" "}
      {/* Ensure user is not null */}
      <h2 className="text-xl font-semibold mb-2">Favorite Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {favoriteProperties.map((property) => (
          <div key={property.id} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold">{property.title}</h3>
            <p>Price: ${property.price.toLocaleString()}</p>{" "}
            {/* Price formatted */}
            <p>Area: {property.area} sqft</p> {/* Property area */}
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-2">Your Inquiries</h2>
      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold">{inquiry.property.title}</h3>
            <p className="text-gray-600">{inquiry.message}</p>{" "}
            {/* Inquiry message */}
            <p className="text-sm text-gray-500">
              Sent on: {new Date(inquiry.createdAt).toLocaleDateString()}{" "}
              {/* Inquiry sent date */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
