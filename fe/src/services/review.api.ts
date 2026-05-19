import axios from "../utils/axios.customize";
import { type ReviewStats } from "../types/review";

const URL_API = "/api/v1/reviews";

export interface CreateReviewPayload {
  booking_id: string;
  rating: number;
  comment: string;
}

const createReviewApi = (payload: CreateReviewPayload) => {
  return axios.post(URL_API, payload);
}


export interface UpdateReviewPayload {
  rating: number;
  comment: string;
}

const updateReviewApi = (id: string, payload: UpdateReviewPayload) => {
  return axios.put(`${URL_API}/${id}`, payload);
}

export const getReviewStats = (complexId: string): Promise<ReviewStats> => {
  return axios.get("/api/v1/reviews/with-stats",
    {
      params: {
        complex_id: complexId,
      },
    }
  );
};

export { createReviewApi, updateReviewApi };
