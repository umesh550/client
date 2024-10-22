import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Define the type for a property
interface Property {
  id: number; // Adjust the type based on your API response
  title: string;
  description: string;
  price: number;
  area: number;
  type: "FOR_SALE" | "FOR_RENT"; // Assuming type is either "FOR_SALE" or "FOR_RENT"
}

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties");
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch properties");
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
            <p className="text-gray-600 mb-2">{property.description}</p>
            <p className="font-bold mb-2">
              Price: ${property.price.toLocaleString()}
            </p>
            <p className="mb-2">Area: {property.area} sqft</p>
            <p className="mb-4">
              Type: {property.type === "FOR_SALE" ? "For Sale" : "For Rent"}
            </p>
            <Link
              to={`/property/${property.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
