import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const DJRatingReviews = ({ dj, onSubmitReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [helpfulReviews, setHelpfulReviews] = useState([]);

  // Calculate rating distribution
  const ratingDistribution = {
    5: 75,
    4: 15,
    3: 7,
    2: 2,
    1: 1
  };

  const handleSubmitReview = () => {
    if (!newReview.comment.trim()) {
      toast.error('Please write a review');
      return;
    }
    
    toast.success('Review submitted!', {
      description: 'Thank you for your feedback.'
    });
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '' });
    
    if (onSubmitReview) {
      onSubmitReview(newReview);
    }
  };

  const toggleHelpful = (reviewId) => {
    setHelpfulReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary fill-primary" />
            Ratings & Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Overall Rating */}
            <div className="text-center md:text-left">
              <div className="flex items-baseline gap-2 justify-center md:justify-start">
                <span className="text-5xl font-bold text-primary">{dj.rating}</span>
                <span className="text-muted-foreground">/5</span>
              </div>
              <div className="flex items-center gap-1 justify-center md:justify-start my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= Math.round(dj.rating) ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {dj.totalReviews} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm w-8">{rating}★</span>
                  <Progress value={ratingDistribution[rating]} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground w-10">
                    {ratingDistribution[rating]}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Write Review Button */}
          <div className="mt-6 pt-6 border-t border-border/50">
            {!showReviewForm ? (
              <Button variant="outline" onClick={() => setShowReviewForm(true)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Write a Review
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-8 h-8 ${star <= newReview.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Review</label>
                  <Textarea
                    placeholder="Share your experience with this DJ..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSubmitReview}>Submit Review</Button>
                  <Button variant="ghost" onClick={() => setShowReviewForm(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Reviews</h3>
        {dj.reviews?.map((review) => (
          <Card key={review.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    {review.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.user}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${star <= review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 ${helpfulReviews.includes(review.id) ? 'text-primary' : ''}`}
                    onClick={() => toggleHelpful(review.id)}
                  >
                    <ThumbsUp className={`w-4 h-4 mr-1 ${helpfulReviews.includes(review.id) ? 'fill-primary' : ''}`} />
                    Helpful
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DJRatingReviews;
