import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

// Define the type for a property
interface Property {
  id: string;
  title: string;
  price: number;
  area: number;
  type: "FOR_SALE" | "FOR_RENT";
  images: string[];
}

export default function PropertySearch() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<{
    search: string;
    type: string;
    minPrice: string;
    maxPrice: string;
    minArea: string;
    maxArea: string;
  }>({
    search: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/properties", { params: filters });
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  // Define the type for the event parameter
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, type: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Search Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search properties..."
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                name="type"
                value={filters.type}
                onValueChange={handleTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="FOR_SALE">For Sale</SelectItem>
                  <SelectItem value="FOR_RENT">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="minPrice">Min Price</Label>
              <Input
                id="minPrice"
                name="minPrice"
                type="number"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min Price"
              />
            </div>
            <div>
              <Label htmlFor="maxPrice">Max Price</Label>
              <Input
                id="maxPrice"
                name="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max Price"
              />
            </div>
            <div>
              <Label htmlFor="minArea">Min Area</Label>
              <Input
                id="minArea"
                name="minArea"
                type="number"
                value={filters.minArea}
                onChange={handleFilterChange}
                placeholder="Min Area"
              />
            </div>
            <div>
              <Label htmlFor="maxArea">Max Area</Label>
              <Input
                id="maxArea"
                name="maxArea"
                type="number"
                value={filters.maxArea}
                onChange={handleFilterChange}
                placeholder="Max Area"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardContent className="p-4">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-gray-600">
                ${property.price.toLocaleString()}
              </p>
              <p className="text-gray-600">{property.area} sqft</p>
              <p className="text-gray-600">
                {property.type === "FOR_SALE" ? "For Sale" : "For Rent"}
              </p>
              <Button
                className="mt-2"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
