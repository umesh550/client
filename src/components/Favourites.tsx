import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: number;
  title: string;
  images: string[];
  price: number;
  area: number;
}

export default function Favorites() {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("/api/user/favorites");
      setFavorites(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch favorites.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const removeFavorite = async (propertyId: number) => {
    try {
      await axios.delete(`/api/user/favorites/${propertyId}`);
      setFavorites((prev) => prev.filter((fav) => fav.id !== propertyId));
      toast({
        title: "Success",
        description: "Property removed from favorites.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove property from favorites.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      {loading ? (
        <p>Loading...</p> // Show loading text
      ) : favorites.length === 0 ? (
        <p>No favorites found.</p> // Handle empty state
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((property) => (
            <Card key={property.id}>
              <CardHeader>
                <CardTitle>{property.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <p className="text-lg font-semibold">
                  ${property.price.toLocaleString()}
                </p>
                <p>{property.area} sqft</p>
                <div className="mt-4 flex justify-between">
                  <Button onClick={() => navigate(`/property/${property.id}`)}>
                    View Details
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => removeFavorite(property.id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
