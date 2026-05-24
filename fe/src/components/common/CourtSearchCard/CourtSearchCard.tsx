import React from "react";
import { Link } from "react-router-dom";
import "./CourtSearchCard.css";

interface Props {
  court: {
    _id: string;
    name: string;
    address: string;
    city: string;
    district: string;
    slug?: string;
    phone?: string;
    email?: string;
    [key: string]: any;
  };
}

const CourtSearchCard: React.FC<Props> = ({ court }) => {
  const defaultImage =
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
        <rect width="600" height="400" fill="#e5e7eb" />
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="28">
          ${court.name}
        </text>
      </svg>
    `);
  const firstImage = Array.isArray(court.images) ? court.images[0] : undefined;
  const primaryFieldImage = Array.isArray(court.fieldImages) ? court.fieldImages[0] : undefined;
  const imageUrl = firstImage || primaryFieldImage?.image_url || court.primaryImage?.image_url || defaultImage;
  
  const targetSlug = court.slug || court._id;

  return (
    <Link to={`/complexes/${targetSlug}`} className="court-card-link" aria-label={`Open ${court.name}`}>
      <article className="court-card">
        <div className="card-image-wrap">
          <img src={imageUrl} alt={primaryFieldImage?.alt_text || court.name} />
        </div>
        <div className="card-body">
          <h3 className="card-title">{court.name}</h3>
          <p className="card-address">{court.address}</p>
          <p className="card-location">
            {court.district && <span>{court.district}</span>}
            {court.city && <span> • {court.city}</span>}
          </p>
          {court.phone && <p className="card-phone">{court.phone}</p>}
        </div>
      </article>
    </Link>
  );
};

export default CourtSearchCard;
