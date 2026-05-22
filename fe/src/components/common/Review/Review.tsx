import React from 'react';
import { StarRating } from '../StarRating/StarRating';
import './Review.css';
import { type ReviewItem } from '../../../types/review';
import defaultAvatar from '../../../assets/avatar-placeholder.png';

export interface ReviewProps {
  overallRating: number;
  totalReviews: number;
  reviews: ReviewItem[];
  onShowAllClick?: () => void;
}

export const Review: React.FC<ReviewProps> = ({
  overallRating,
  totalReviews,
  reviews,
  onShowAllClick
}) => {
  return (
    <div className="ui-review-container">

      {/* TỔNG QUAN ĐIỂM SỐ */}
      <div className="review-header-simple">
        <h2 className="title">Reviews</h2>
        <div className="score-badge">
          <span className="star-icon">★</span>
          <span className="score-number">{(overallRating || 0).toFixed(1)}</span>
          <span className="total-count">({totalReviews} reviews)</span>
        </div>
      </div>

      <hr className="divider" />

      {/* DANH SÁCH BÌNH LUẬN (CHIA 2 CỘT) */}
      <div className="reviews-grid">
        {(reviews || []).map((review) => (
          <div key={review.review_id} className="review-card">
            <div className="reviewer-info">
              <img
                src={review.avatarUrl || defaultAvatar}
                alt="avatar"
                className="avatar"
                onError={(e) => {
                  e.currentTarget.src = defaultAvatar;
                }}
              />
              <div className="reviewer-details">
                <div className="reviewer-name">{review.userName}</div>
                <div className="individual-rating">
                  <StarRating rating={review.rating} readonly={true} />
                  <span className="review-date">{review.created_at}</span>
                </div>
              </div>
            </div>
            <p className="review-text">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* NÚT BẤM XEM THÊM */}
      {totalReviews > reviews.length && (
        <button className="btn-show-all" onClick={onShowAllClick}>
          Show All {totalReviews} Reviews
        </button>
      )}

    </div>
  );
};

export default Review;
