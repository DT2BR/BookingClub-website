

export interface ReviewUser {
    _id: string;
    name: string;
    email: string;
    avatar_url: string;
}

export interface ReviewItem {
    review_id: number;
    userName: string;
    avatarUrl?: string;
    rating: number;
    comment: string;
    created_at: string;
}

export interface ReviewStats {
    avgRating: number;
    totalReviews: number;

    ratingBreakdown: {
        [key: string]: number;
    };

    reviews: ReviewItem[];
}
