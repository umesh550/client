import { FormEvent, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Define the type for the property state
interface PropertyState {
  title: string;
  description: string;
  price: string;
  area: string;
  type: string;
  images: File[];
}

export default function CreatePropertyForm() {
  const { toast } = useToast(); // Properly destructuring toast here
  const [property, setProperty] = useState<PropertyState>({
    title: "",
    description: "",
    price: "",
    area: "",
    type: "FOR_SALE",
    images: [],
  });
  const navigate = useNavigate();

  // Type the form change event for form inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file uploads with the correct type for file input
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setProperty((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  // Type the form submission event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    Object.keys(property).forEach((key) => {
      if (key === "images") {
        property.images.forEach((image) => formData.append("images", image));
      } else {
        formData.append(key, (property as any)[key]); // Cast to any for dynamic key
      }
    });

    try {
      await axios.post("/api/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({
        title: "Property Created",
        description:
          "Your property has been successfully created and is pending approval.",
      });
      navigate("/seller-dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create property. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Property</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={property.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={property.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={property.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area (sqft)</Label>
              <Input
                id="area"
                name="area"
                type="number"
                value={property.area}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              name="type"
              value={property.type}
              onValueChange={(value) =>
                setProperty((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FOR_SALE">For Sale</SelectItem>
                <SelectItem value="FOR_RENT">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <Input
              id="images"
              name="images"
              type="file"
              multiple
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
          <Button type="submit" className="w-full">
            Create Property
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
