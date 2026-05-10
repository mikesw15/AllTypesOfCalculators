import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export interface Review {
  id: string;
  userId: string;
  userDisplayName: string | null;
  calculatorId: string;
  rating: number;
  comment?: string;
  createdAt: any;
  updatedAt: any;
}

export function useCalculatorReviews(calculatorId: string) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!calculatorId) return;

    const q = query(
      collection(db, 'reviews'),
      where('calculatorId', '==', calculatorId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      
      // Sort client-side to avoid needing a Firestore composite index
      fetchedReviews.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() || Date.now();
        const timeB = b.createdAt?.toMillis() || Date.now();
        return timeB - timeA;
      });

      setReviews(fetchedReviews);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [calculatorId]);

  const addReview = async (rating: number, comment: string) => {
    if (!user) throw new Error('Must be logged in to review');
    
    await addDoc(collection(db, 'reviews'), {
      userId: user.uid,
      userDisplayName: user.displayName || 'Anonymous User',
      calculatorId,
      rating,
      comment: comment.trim() || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  };

  const updateReview = async (reviewId: string, rating: number, comment: string) => {
    if (!user) throw new Error('Must be logged in to review');
    
    const reviewRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewRef, {
      rating,
      comment: comment.trim() || null,
      updatedAt: serverTimestamp()
    });
  };

  const deleteReview = async (reviewId: string) => {
    if (!user) throw new Error('Must be logged in to review');
    
    const reviewRef = doc(db, 'reviews', reviewId);
    await deleteDoc(reviewRef);
  };

  const userReview = reviews.find(r => r.userId === user?.uid);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return {
    reviews,
    loading,
    userReview,
    averageRating,
    addReview,
    updateReview,
    deleteReview
  };
}
