import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { courts } from "../mockData";

import "./FeaturedCourtsSection.css";

const tabs = [
  "Tất cả",
  "Đề xuất",
  "Phổ biến",
  "Gần đây",
];

function FeaturedCourtsSection() {
  const [activeTab, setActiveTab] =
    useState("Tất cả");

  const navigate = useNavigate();

  return (
    <section className="featured-section">
      <div className="section-header">
        <h2>Sân nổi bật</h2>

        <p>
          Khám phá các sân thể thao chất lượng
          cao.
        </p>
      </div>

      <div className="court-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={
              activeTab === tab ? "active" : ""
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="courts-grid">
        {courts.map((court) => (
          <div
            className="court-card"
            key={court._id}
          >
            <div className="court-image">
              <img
                src={court.image}
                alt={court.name}
              />
            </div>

            <div className="court-content">
              <span className="court-sport">
                {court.sport}
              </span>

              <h3>{court.name}</h3>

              <p>{court.location}</p>

              <div className="court-bottom">
                <strong>{court.price}</strong>

                <button
                  onClick={() =>
                    navigate(
                      `/complexes/${court.slug}`
                    )
                  }
                >
                  Đặt ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="view-more-wrapper">
        <button className="view-more-btn">
          Xem thêm
        </button>
      </div>
    </section>
  );
}

export default FeaturedCourtsSection;
