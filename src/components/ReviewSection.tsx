import React, { useState } from 'react';
import { Star, MessageSquare, Trash2, Edit2, Loader2, User } from 'lucide-react';
import { useCalculatorReviews, Review } from '../hooks/useReviews';
import { useAuth } from '../contexts/AuthContext';

interface ReviewSectionProps {
  calculatorId: string;
}

export default function ReviewSection({ calculatorId }: ReviewSectionProps) {
  const { reviews, loading, userReview, averageRating, addReview, updateReview, deleteReview } = useCalculatorReviews(calculatorId);
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartReview = () => {
    if (userReview) {
      setRating(userReview.rating);
      setComment(userReview.comment || '');
    } else {
      setRating(0);
      setComment('');
    }
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    setSubmitLoading(true);
    setError('');
    
    try {
      if (userReview) {
        await updateReview(userReview.id, rating, comment);
      } else {
        await addReview(rating, comment);
      }
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!userReview) return;
    if (!window.confirm('Are you sure you want to delete your review?')) return;
    
    try {
      await deleteReview(userReview.id);
      setIsEditing(false);
      setRating(0);
      setComment('');
    } catch (err: any) {
      setError(err.message || 'Failed to delete review');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Loading reviews...
      </div>
    );
  }

  return (
    <div className="mt-12 border-t pt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold flex items-center mb-2">
            <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
            Reviews & Ratings
          </h2>
          <div className="flex items-center text-gray-600">
            <div className="flex items-center mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold mr-1">{averageRating > 0 ? averageRating.toFixed(1) : 'No ratings yet'}</span>
            <span>({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
          </div>
        </div>
        
        {user ? (
          !isEditing && (
            <button
              onClick={handleStartReview}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {userReview ? 'Edit Your Review' : 'Write a Review'}
            </button>
          )
        ) : (
          <div className="text-sm border bg-gray-50 border-gray-200 rounded-lg p-3 text-gray-500">
            Log in to leave a review
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 mb-6 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-lg mb-4">{userReview ? 'Edit Your Review' : 'Write a Review'}</h3>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Comment (optional)</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 dark:border-gray-600 min-h-[100px]"
              placeholder="What did you think of this calculator?"
              maxLength={2000}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-x-3">
              <button
                type="submit"
                disabled={submitLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center"
              >
                {submitLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
            {userReview && (
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 p-2"
                title="Delete review"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>
      )}

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Be the first to leave a review!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="p-5 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                      {rev.userDisplayName || 'Anonymous User'}
                      {rev.userId === user?.uid && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {rev.createdAt?.toDate ? rev.createdAt.toDate().toLocaleDateString() : 'Just now'}
                      {rev.updatedAt?.toMillis() > rev.createdAt?.toMillis() && ' (edited)'}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= rev.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              {rev.comment && (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{rev.comment}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
