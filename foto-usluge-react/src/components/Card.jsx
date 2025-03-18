import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, description, category, price, link, className = "" }) => {
  return (
    <div className={`card ${className}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="card-category">{category}</p>
      <button className="price-btn">${price}</button>
      <Link to={link} className="view-details-btn">
        View Details
      </Link>
    </div>
  );
};

export default Card;
