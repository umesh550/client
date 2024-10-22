import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext"; // Adjust the path if necessary
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function PropertyDetail() {
  const [property, setProperty] = useState<any>(null); // Adjust type as necessary
  const [inquiry, setInquiry] = useState("");
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/properties/${id}`);
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
  }, [id]);

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`/api/properties/${id}/inquiries`, { message: inquiry });
      toast({
        title: "Inquiry Sent",
        description: "Your inquiry has been sent to the seller.",
      });
      setInquiry("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!property) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{property.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="grid grid-cols-4 gap-2 mt-2">
                {property.images
                  .slice(1)
                  .map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.title} ${index + 2}`}
                      className="w-full h-auto rounded-lg"
                    />
                  ))}
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-2xl font-bold">
                ${property.price.toLocaleString()}
              </p>
              <p>{property.area} sqft</p>
              <p>{property.description}</p>
              <p>
                Type: {property.type === "FOR_SALE" ? "For Sale" : "For Rent"}
              </p>
              {user && user.role === "BUYER" && (
                <form onSubmit={handleInquiry} className="space-y-2">
                  <Textarea
                    value={inquiry}
                    onChange={(e) => setInquiry(e.target.value)}
                    placeholder="Enter your inquiry here..."
                    required
                  />
                  <Button type="submit">Send Inquiry</Button>
                </form>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
