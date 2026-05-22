import axios from "../utils/axios.customize";

export interface FeaturedCourtItem {
  _id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  district: string;
  sport_type: string;
  image_url: string;
  image_alt: string;
  price_value: number;
  price_display: string;
  rating: number;
  review_count: number;
}

export interface FeaturedCourtsResponse {
  tab: string;
  total: number;
  items: FeaturedCourtItem[];
}

export const getFeaturedCourtsApi = (tab: string) => {
  return axios.get<FeaturedCourtsResponse>("/api/v1/sportcomplex/featured", {
    params: { tab },
  });
};