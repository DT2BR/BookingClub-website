import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  ChevronLeft, 
  Activity, 
  ShieldCheck,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import moment from 'moment';
import type { Booking } from '../../services/booking.api'; 
import type { BookingDetailResponse } from '../../services/bookingDetail.api';
import { getBookingDetailApi } from '../../services/bookingDetail.api'; 
import { createVnpayPaymentApi } from '../../services/booking.api';
import './BookingDetail.scss'; 

interface FinalDisplayData {
  bookingId: string;
  complexName: string;
  status: "confirmed" | "completed" | "pending" | "cancelled";
  bookingDate: string;
  totalPrice: number;
  qrCodeUrl?: string;
  slots: any[];
  primaryImageUrl: string;
  address: string;
  sportType: string;
  amenities: string[];
  paymentMethod: string;
  discount: number;
}

const BookingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const bookingFromProps = location.state?.bookingData as Booking | undefined;
  const [displayData, setDisplayData] = useState<FinalDisplayData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusPayment, setStatusPayment] = useState<boolean>(false);
    useEffect(() => {
    const fetchAndMergeDetails = async () => {
      try {
        setLoading(true);
        if (!id) return;
        
        const response: BookingDetailResponse = await getBookingDetailApi(id);

        setDisplayData({
          bookingId: id,
          complexName: bookingFromProps?.complex_id?.name || "Khu Phức Hợp Thể Thao",
          status: bookingFromProps?.status || "pending",
          sportType: bookingFromProps?.complex_id?.sport_type || "N/A",
          bookingDate: bookingFromProps?.booking_date || new Date().toISOString(),
          totalPrice: bookingFromProps ? Number(bookingFromProps.total_price.$numberDecimal) : 0,
          qrCodeUrl: bookingFromProps && (bookingFromProps.status === "confirmed" || bookingFromProps.status === "completed") ? bookingFromProps.qr_code_url : undefined, 
          slots: response?.ListBookingDetail || [],
          primaryImageUrl: response?.primary_image_url || "https://images.unsplash.com/photo-1541250848049-b4f71413cc30?q=80&w=600&auto=format&fit=crop",
          address: bookingFromProps?.complex_id?.address || "Địa chỉ sân chưa được cập nhật", 
          amenities: ["Wifi miễn phí", "Bãi đỗ xe", "Phòng thay đồ", "Nước uống mát", "Hệ thống đèn LED"], 
          paymentMethod: "Chuyển khoản ngân hàng", 
          discount: 0 
        });

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu chi tiết đặt sân:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMergeDetails();
  }, [id, bookingFromProps]);

  const handlePayment = async (id: string ) => {
      try {
        // Implementation for payment
         const paymentRes = await createVnpayPaymentApi(id);
         window.location.href = paymentRes.paymentUrl; 
      } catch (error) {
        console.error("Payment failed:", error);
      }
    };

  if (loading) {
    return (
      <div className="booking-loading-screen">
        <div className="spinner"></div>
        <p>Đang tải chi tiết đơn hàng...</p>
      </div>
    );
  }

  if (!displayData) {
    return (
      <div className="booking-error-screen">
        <p>Không tìm thấy thông tin đơn hàng này!</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
  <div className="booking-detail-page">
    
    {/* 1. Thanh điều hướng Header */}
    <div className="detail-header">
      <button onClick={() => navigate(-1)} className="back-btn">
        <ChevronLeft size={20} />
        <span>Quay lại danh sách</span>
      </button>
      <div className="order-id-block">
        <p className="label">Mã đơn hàng</p>
        <p className="value">#{displayData.bookingId}</p>
      </div>
    </div>

    <div className="grid-layout-60-40">
      
      <div className="col-left-60 content-stack">
        
        {/* Card Thông tin Cụm Sân */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="complex-summary-card"
        >
          <div className="card-header-flex">
            <div>
              <span className="complex-badge">{displayData.sportType}</span>
              <h1 className="complex-title">{displayData.complexName}</h1>
              <p className="complex-meta">
                <MapPin size={16} />
                <span>{displayData.address}</span>
              </p>
            </div>
            <span className={`status-pill status-${displayData.status}`}>
              {displayData.status}
            </span>
          </div>

          <div className="amenities-section">
            <p className="section-title">Tiện ích đi kèm tại sân</p>
            <div className="amenities-list">
              {displayData.amenities.map((amenity, idx) => (
                <span key={idx} className="amenity-badge">{amenity}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Danh sách các Slot chi tiết */}
        <div className="slots-wrapper content-stack">
          <h3 className="slots-container-header">
            <Activity size={18} />
            <span>Danh Sách Suất Đặt Sân Chi Tiết</span>
          </h3>

          {displayData.slots.map((slot, index) => (
            <motion.div 
              key={slot._id} 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: index * 0.08 }}
              className="slot-card-premium"
            >
              <div className="slot-top-bar">
                <div className="left-info">
                  <span className="subfield-id-tag">SubField ID: {slot._id?.substring(0, 6).toUpperCase()}</span>
                  <h4 className="field-title">{slot.sub_field_id?.name || "Sân chưa đặt tên"}</h4>
                  <span className="sport-badge">{slot.sub_field_id?.field_type || "Chưa xác định"}</span>
                </div>

                <div className="right-timing">
                  <p className="timing-label">Thời gian ca chơi</p>
                  <div className="date-highlight">{moment(slot.play_date).format('DD/MM/YYYY')}</div>
                  <div className="time-flex">
                    <Clock size={14} />
                    <span>Ca: {slot.start_time} - {slot.end_time}</span>
                  </div>
                  <div className="price-tag-small">{slot.price?.toLocaleString('vi-VN')} đ</div>
                </div>
              </div>

              <div className="slot-banner-image">
                <img src={displayData.primaryImageUrl} alt={slot.sub_field_id?.name} />
                <div className="image-overlay-gradient">
                  <span className="premium-label">Sân Tiêu Chuẩn Cao Cấp</span>
                  <p className="premium-desc">Hệ thống chiếu sáng LED chống lóa, thảm trải chống chấn thương chất lượng cao.</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="col-right-40 content-stack">
{displayData.status === 'confirmed' || displayData.status === 'completed' ? (
  
  /* TRƯỜNG HỢP 1: ĐÃ THANH TOÁN (confirmed / completed) -> HIỆN QR CHECK-IN */
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="checkin-qr-card"
  >
    <p className="qr-title">Mã Check-in Sân Suất Chơi</p>
    <div className="qr-frame">
      {displayData.qrCodeUrl ? (
        <img src={displayData.qrCodeUrl} alt="Check-in QR" />
      ) : (
        <div className="qr-loader">QR Code đang được tạo...</div>
      )}
    </div>
    <p className="qr-helper-text">Đưa mã QR này cho nhân viên tại quầy check-in khi bạn đến cụm sân để vào cửa.</p>
  </motion.div>

) : displayData.status === 'pending' ? (

  /* TRƯỜNG HỢP 2: CHƯA THANH TOÁN (pending) -> HIỆN BOX HỐI THÚC THANH TOÁN VNPAY */
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="payment-pending-card"
  >
    <div className="warning-icon-animation">
      <div className="pulse-ring"></div>
      {/* Sử dụng Icon Clock đồng bộ màu xanh cao cấp đã phối lại */}
      <Clock size={22} color="#4f46e5" />
    </div>
    
    <h3 className="pay-title">Đơn hàng chờ thanh toán</h3>
    <p className="pay-desc">
      Suất chơi của bạn đang được hệ thống giữ chỗ tạm thời. Vui lòng hoàn tất thanh toán để nhận ngay mã QR check-in vào sân.
    </p>

    <div className="payment-alert-box">
      <span className="alert-dot"></span>
      <span>Hết hạn giữ sân sau <b>10 phút</b></span>
    </div>

    {/* Nút bấm xử lý gọi cổng thanh toán VNPAY */}
    <button 
      onClick={() => handlePayment(displayData.bookingId)} 
      className="btn-pay-now-premium"
    >
      <span className="btn-text">Thanh toán ngay bằng VNPAY</span>
      <span className="btn-arrow">→</span>
    </button>
  </motion.div>

) : null}        

        {/* Card Hóa đơn */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="billing-receipt-card"
        >
          <h3>
            <ShieldCheck size={18} />
            <span>Thông Tin Thanh Toán</span>
          </h3>

          <div className="receipt-rows-group">
            <div className="receipt-row">
              <span>Phương thức</span>
              <span className="row-value icon-flex"><CreditCard size={14} />{displayData.paymentMethod}</span>
            </div>
            <div className="receipt-row">
              <span>Ngày tạo hóa đơn</span>
              <span className="row-value">{moment(displayData.bookingDate).format('HH:mm - DD/MM/YYYY')}</span>
            </div>
            <div className="receipt-row">
              <span>Mã giảm giá</span>
              <span className="row-value unapplied">Không áp dụng</span>
            </div>
            <div className="receipt-row">
              <span>Giảm giá trực tiếp</span>
              <span className="discount-value">-{displayData.discount} đ</span>
            </div>
            <div className="divider-line" />
            <div className="grand-total-row">
              <span>Tổng tiền thanh toán</span>
              <span className="price-tag">{displayData.totalPrice.toLocaleString('vi-VN')} đ</span>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-download-pdf">Tải Hóa Đơn PDF</button>
            <button className="btn-contact-manager">
              <Phone size={14} />
              <span>Liên hệ Ban quản lý sân</span>
            </button>
          </div>
        </motion.div>
      </div>

    </div>
  </div>
);
};

export default BookingDetail;