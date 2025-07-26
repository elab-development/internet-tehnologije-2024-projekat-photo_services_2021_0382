import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoClose } from "react-icons/io5";

import useServiceDetails from "../hooks/useServiceDetails";
import useCategories      from "../hooks/useCategories";
import usePicsum          from "../hooks/usePicsum";
import useUser            from "../hooks/useUser";

const ServiceDetails = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  // ─── Attach Bearer token on every render ────────────────────────
  const token = sessionStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  // ─── ALL HOOKS AT THE TOP ────────────────────────────────────────
  const { service, loading: svcLoading, error: svcError } = useServiceDetails(id);
  const { categories, loading: catLoading }               = useCategories();
  const categoryName = categories.find(c => c.id === service?.service_category_id)?.name || "default";
  const imageUrl     = usePicsum(categoryName);

  const sellerId                                = service?.seller_id;
  const { user: seller, loading: sellerLoading } = useUser(sellerId);

  const [modalOpen, setModalOpen]     = useState(false);
  const [paymentType, setPaymentType] = useState("credit card");
  const [date, setDate]               = useState(new Date().toISOString().slice(0,10));
  const [notes, setNotes]             = useState("");
  const [formError, setFormError]     = useState("");
  const [submitting, setSubmitting]   = useState(false);
  // ────────────────────────────────────────────────────────────────

  // EARLY RETURNS (after all hooks)
  if (svcLoading || catLoading) return <p>Loading service…</p>;
  if (svcError   || !service)   return <p>Service not found.</p>;

  // Handlers
  const openModal  = () => { setFormError(""); setNotes(""); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/offers", {
        service_id:   service.id,
        seller_id:    service.seller_id,
        payment_type: paymentType,
        date,
        notes,
      });
      alert("🎉 Offer submitted!");
      closeModal();
      navigate("/my-offers");
    } catch (err) {
      const msg =
        err.response?.data?.error
        || err.response?.data?.message
        || "Failed to submit offer.";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Modal JSX
  const modal = (
    <div className="offer-modal-overlay">
      <div className="offer-modal-content modern-modal">
        <button className="close-btn" onClick={closeModal}>
          <IoClose size={24}/>
        </button>

        {/* Seller header */}
        {sellerLoading ? (
          <p>Loading seller…</p>
        ) : seller ? (
          <div className="modern-header">
            <img src={seller.profile_picture} alt={seller.name} className="seller-avatar"/>
            <div>
              <h2 className="seller-name">{seller.name}</h2>
              <p className="seller-role">
                {seller.role.charAt(0).toUpperCase() + seller.role.slice(1)}
              </p>
            </div>
          </div>
        ) : (
          <p className="error">Failed to load seller info.</p>
        )}

        {/* Service Info as plain text */}
        <div className="service-info">
          <h3 className="service-title">{service.name}</h3>
          <p className="service-desc">{service.description}</p>
          <p className="service-price">${service.price}</p>
        </div>

        {/* Offer Form */}
        <form className="offer-form" onSubmit={handleSubmit}>
          {formError && <p className="error">{formError}</p>}

          <div className="form-row">
            <div className="form-group">
              <label>Payment Type</label>
              <select
                value={paymentType}
                onChange={e => setPaymentType(e.target.value)}
                required
              >
                <option value="credit card">Credit Card</option>
                <option value="cash">Cash</option>
                <option value="bank transfer">Bank Transfer</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Notes</label>
              <textarea
                rows="4"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Any additional details…"
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Offer"}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <div className="service-details-container">
        <div className="service-details-image">
          <img src={imageUrl} alt={service.name} />
        </div>
        <div className="service-details-content">
          <h1 className="service-details-title">{service.name}</h1>
          <p className="service-details-description">{service.description}</p>
          <p className="service-details-price">Price: ${service.price}</p>
          <p className="service-details-category">Category: {categoryName}</p>
          <div className="service-details-buttons">
            <button className="offer-btn" onClick={openModal}>
              Make an Offer
            </button>
            <button className="back-btn" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>
      </div>

      {modalOpen && ReactDOM.createPortal(modal, document.body)}
    </>
  );
};

export default ServiceDetails;
