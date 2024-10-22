import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

interface Property {
  title: string;
  description: string;
  price: string;
  area: string;
  type: string;
  images: File[];
}

export default function EditPropertyForm() {
  const [property, setProperty] = useState<Property>({
    title: "",
    description: "",
    price: "",
    area: "",
    type: "FOR_SALE",
    images: [],
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get<Property>(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch property details.",
          variant: "destructive",
        });
      }
    };
    fetchProperty();
  }, [id, toast]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setProperty((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(property).forEach(([key, value]) => {
      if (key === "images") {
        (value as File[]).forEach((file, index) => {
          formData.append(`images[${index}]`, file);
        });
      } else {
        formData.append(key, value.toString());
      }
    });

    try {
      await axios.put(`/api/properties/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({
        title: "Property Updated",
        description: "Your property has been successfully updated.",
      });
      navigate("/seller-dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update property. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Property</CardTitle>
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
            <Label htmlFor="images">Add More Images</Label>
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
            Update Property
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
