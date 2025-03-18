import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useServiceDetails from "../hooks/useServiceDetails";
import useCategories from "../hooks/useCategories";
import usePicsum from "../hooks/usePicsum";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { service, loading: serviceLoading, error } = useServiceDetails(id);
  const { categories, loading: categoriesLoading } = useCategories();

  const categoryName =
    service && categories.length > 0
      ? (categories.find(cat => cat.id === service.service_category_id)?.name || "default")
      : "default";

  const imageUrl = usePicsum(categoryName);

  if (serviceLoading || categoriesLoading) {
    return <p>Loading service details...</p>;
  }

  if (error || !service) {
    return <p>Service not found.</p>;
  }

  return (
    <div className="service-details-container">
      <div className="service-details-image">
        <img src={imageUrl} alt={service.name} />
      </div>
      <div className="service-details-content">
        <h1 className="service-details-title">{service.name}</h1>
        <p className="service-details-description">{service.description}</p>
        <p className="service-details-price">Price: ${service.price}</p>
        <p className="service-details-category">
          Category: {categoryName}
        </p>
        <div className="service-details-buttons">
          <button
            className="offer-btn"
            onClick={() => alert("... NOT IMPLEMENTED YET ...")}
          >
            Make an Offer
          </button>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
