import axios from "../utils/axios.customize";

export interface BookingDetailItem {
  _id: string;
  booking_id: string;
  sub_field_id: {
    _id: string;
    name: string; // Tên sân nhỏ (Ví dụ: "Sân số 1")
    field_type: "badminton" | "football" | "tennis" | "basketball" | "volleyball" | "pickleball";
  };
  play_date: string;
  price: number;
  start_time: string; // Định dạng "HH:mm"
  end_time: string;   // Định dạng "HH:mm"
}

export interface BookingDetailResponse {
  ListBookingDetail: BookingDetailItem[];
  primary_image_url?: string;
}

export const getBookingDetailApi = (
  bookingId: string
): Promise<BookingDetailResponse> => {
  return axios.get(`/api/v1/bookings/${bookingId}/details`);
};

