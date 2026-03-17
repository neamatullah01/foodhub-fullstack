/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { Star, CheckCircle2 } from "lucide-react";
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
import { addReview, getMyReview } from "@/services/review.service";

interface ExistingReview {
  rating: number;
  comment: string;
}

export function ReviewModal({
  providerId,
  orderId,
  mealId,
}: {
  providerId: string;
  orderId: string;
  mealId: string;
}) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReview, setIsLoadingReview] = useState(false);
  const [existingReview, setExistingReview] = useState<ExistingReview | null>(
    null,
  );

  useEffect(() => {
    async function checkExistingReview() {
      if (open) {
        setIsLoadingReview(true);
        try {
          const result = await getMyReview(mealId);
          if (result.data) {
            setExistingReview(result.data);
          }
        } catch (error) {
          console.error("Failed to check existing review", error);
        } finally {
          setIsLoadingReview(false);
        }
      } else {
        setRating(0);
        setComment("");
        setExistingReview(null);
      }
    }

    checkExistingReview();
  }, [open, mealId]);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addReview({
        providerId,
        orderId,
        mealId,
        rating,
        comment,
      });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Review submitted successfully!");

      setExistingReview({ rating, comment });
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
          <DialogTitle>
            {existingReview ? "Your Review" : "Rate your experience"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          {isLoadingReview ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFC222]"></div>
            </div>
          ) : existingReview ? (
            <div className="flex flex-col items-center text-center gap-4 bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Thanks for your feedback!
                </h3>
                <div className="flex justify-center gap-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 ${
                        star <= existingReview.rating
                          ? "fill-[#FFC222] text-[#FFC222]"
                          : "text-slate-300 dark:text-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {existingReview.comment && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 italic">
                  "{existingReview.comment}"
                </p>
              )}
              <Button
                onClick={() => setOpen(false)}
                variant="outline"
                className="mt-4 w-full"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
