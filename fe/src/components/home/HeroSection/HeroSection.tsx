import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Eye,
  MapPinned,
} from "lucide-react";

import { featuredCourt } from "../mockData";

import "./HeroSection.css";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-left">
          <span className="hero-tag">
            Booking sân thể thao dễ dàng
          </span>

          <h1>
            ĐẶT SÂN NHANH CHÓNG
            <br />
            TRẢI NGHIỆM CHUYÊN NGHIỆP
          </h1>

          <p>
            Tìm kiếm và đặt sân thể thao yêu thích
            chỉ trong vài phút.
          </p>

          <div className="hero-buttons">
            <button
              className="hero-primary-btn"
              onClick={() =>
                navigate(
                  `/complexes/${featuredCourt.slug}`
                )
              }
            >
              <CalendarDays size={18} /> Đặt sân ngay
            </button>

            <button
              className="hero-secondary-btn"
              onClick={() =>
                navigate(`/complexes/search`)
              }
            >
              <Eye size={18} /> Xem sân
            </button>
            <button
              className="hero-secondary-btn hero-map-btn"
              onClick={() => navigate("/map")}
            >
              <MapPinned size={18} /> Xem bản đồ
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src={featuredCourt.image}
            alt={featuredCourt.name}
          />

          <div className="hero-court-info">
            <h3>{featuredCourt.name}</h3>

            <p>{featuredCourt.location}</p>
          </div>
        </div>
      </div>

      <div className="hero-search">

      </div>
    </section>
  );
}

export default HeroSection;
