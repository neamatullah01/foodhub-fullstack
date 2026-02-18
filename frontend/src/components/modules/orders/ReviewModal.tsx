/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addReview } from "@/services/review.service";

export function ReviewModal({
  providerId,
  orderId,
}: {
  providerId: string;
  orderId: string;
}) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }

    setIsSubmitting(true);
    try {
      await addReview({ providerId, orderId, rating, comment });
      toast.success("Review submitted successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-[#FFC222] text-black hover:bg-[#FFC222]"
        >
          <Star className="w-4 h-4 mr-2" />
          Rate Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate your experience</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {/* Star Rating Selection */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating
                      ? "fill-[#FFC222] text-[#FFC222]"
                      : "text-slate-300 dark:text-slate-600"
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Tell us what you liked about the food..."
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            className="resize-none h-32"
          />

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-[#FFC222] text-black hover:bg-[#e5ae1e]"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
