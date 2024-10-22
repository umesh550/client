import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the type for a review
interface Review {
  rating: number;
  comment: string;
  user: {
    fullName: string;
  };
  createdAt: string; // Assuming this is in ISO format
}

interface PropertyReviewsProps {
  propertyId: string; // Adjust the type based on your prop type
}

export default function PropertyReviews({ propertyId }: PropertyReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, [propertyId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/properties/${propertyId}/reviews`);
      setReviews(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch reviews.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`/api/properties/${propertyId}/reviews`, newReview);
      toast({
        title: "Review Submitted",
        description: "Your review has been successfully submitted.",
      });
      setNewReview({ rating: 0, comment: "" });
      fetchReviews();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Property Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p>{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  By {review.user.fullName} on{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
          <div>
            <label className="block mb-2">Your Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer ${
                    star <= newReview.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                />
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block mb-2">
              Your Review
            </label>
            <Textarea
              id="comment"
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="Write your review here..."
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
