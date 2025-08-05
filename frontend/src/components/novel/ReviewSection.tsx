// src/components/novel/ReviewSection.tsx
import React, { useState } from 'react';
import { getNovelReviews } from '../../mockData';

interface ReviewSectionProps {
  novelId: string;
}

export default function ReviewSection({ novelId }: ReviewSectionProps) {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const novelIdNum = parseInt(novelId, 10);

  const reviews = getNovelReviews(novelIdNum);

  const submitReview = () => {
    if (userRating === 0 || reviewText.trim() === '') {
      alert('Vui lòng đánh giá sao và viết nhận xét');
      return;
    }
    
    // Logic gửi đánh giá lên server ở đây
    console.log(`Gửi đánh giá cho novel ${novelId}:`, { rating: userRating, content: reviewText });
    
    alert('Cảm ơn bạn đã đánh giá!');
    setUserRating(0);
    setReviewText('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Viết đánh giá</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Đánh giá sao
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setUserRating(star)}
                className={`w-8 h-8 flex items-center justify-center text-2xl cursor-pointer transition-colors ${
                  star <= userRating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'
                }`}
              >
                <i className={`ri-star-${star <= userRating ? 'fill' : 'line'}`}></i>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Nhận xét
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            maxLength={500}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-32 resize-none"
            placeholder="Chia sẻ cảm nghĩ của bạn về tác phẩm này..."
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{reviewText.length}/500 ký tự</p>
        </div>

        <button 
          onClick={submitReview}
          className="bg-blue-600 dark:bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors whitespace-nowrap cursor-pointer"
        >
          Gửi đánh giá
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Đánh giá từ độc giả ({reviews.length})
        </h2>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 pb-6 last:pb-0">
              <div className="flex items-start space-x-4">
                <img 
                  src={review.avatar}
                  alt={review.userName}
                  className="w-12 h-12 rounded-full object-cover object-top"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">{review.userName}</h4>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{review.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`ri-star-${i < review.rating ? 'fill' : 'line'} text-sm`}></i>
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">({review.rating}/5)</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}