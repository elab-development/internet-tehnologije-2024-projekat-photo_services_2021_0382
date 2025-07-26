// src/pages/ServiceDetails.jsx
import React, { useState, useEffect } from "react";
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

  // ─── Attach Bearer token if present ───────────────────────
  const token = sessionStorage.getItem("token");
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"];

  // ─── Load service / category / seller ────────────────────
  const { service, loading: svcLoading, error: svcError } = useServiceDetails(id);
  const { categories, loading: catLoading }               = useCategories();
  const categoryName = categories.find(c => c.id === service?.service_category_id)?.name || "default";
  const imageUrl     = usePicsum(categoryName);

  const sellerId                                = service?.seller_id;
  const { user: seller, loading: sellerLoading } = useUser(sellerId);

  // ─── Fetch all offers for this service ────────────────
  const [offers, setOffers]              = useState([]);
  const [loadingOffers, setLoadingOffers]= useState(true);
  useEffect(() => {
    if (!service) return;
    setLoadingOffers(true);
    axios
      .get(`http://127.0.0.1:8000/api/services/${service.id}/offers`)
      .then(({ data }) => {
        // resource returns array
        const arr = Array.isArray(data) ? data : data.data || [];
        setOffers(arr);
      })
      .catch(console.error)
      .finally(() => setLoadingOffers(false));
  }, [service]);

  // ─── Compute accepted offer & highest bid ──────────────
  const acceptedOffer = offers.find(o => o.status === "accepted") || null;
  const highestOffer  = offers.length
    ? offers.reduce((max, o) => o.price > max.price ? o : max, offers[0])
    : null;

  // ─── Offer‐modal state ─────────────────────────────────
  const [modalOpen, setModalOpen]     = useState(false);
  const [offerPrice, setOfferPrice]   = useState("");
  const [paymentType, setPaymentType] = useState("credit card");
  const [date, setDate]               = useState(new Date().toISOString().slice(0,10));
  const [notes, setNotes]             = useState("");
  const [formError, setFormError]     = useState("");
  const [submitting, setSubmitting]   = useState(false);

  // initialize offerPrice from the service’s base price
  useEffect(() => {
    if (service?.price != null) setOfferPrice(service.price);
  }, [service]);

  // ─── Early returns ───────────────────────────────────
  if (svcLoading || catLoading || loadingOffers) return <p>Loading…</p>;
  if (svcError   || !service)                   return <p>Service not found.</p>;

  // ─── Handlers ──────────────────────────────────────
  const openModal  = () => { setFormError(""); setNotes(""); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      // 1) create the offer (buyer)
      await axios.post("http://127.0.0.1:8000/api/offers", {
        service_id:   service.id,
        seller_id:    service.seller_id,
        price:        offerPrice,
        payment_type: paymentType,
        date,
        notes,
      });
      // 2) bump the service base price
      await axios.patch(`http://127.0.0.1:8000/api/services/${service.id}`, {
        price: offerPrice
      });
      alert("🎉 Offer submitted!");
      closeModal();
      navigate("/my-offers");
    } catch (err) {
      setFormError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to submit offer."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Modal JSX ──────────────────────────────────────
  const modal = (
    <div className="offer-modal-overlay">
      <div className="offer-modal-content modern-modal">
        <button className="close-btn" onClick={closeModal}>
          <IoClose size={24}/>
        </button>

        {/* Seller header */}
        {sellerLoading
          ? <p>Loading seller…</p>
          : seller && (
            <div className="modern-header">
              <img
                src={seller.profile_picture}
                alt={seller.name}
                className="seller-avatar"
              />
              <div>
                <h2 className="seller-name">{seller.name}</h2>
                <p className="seller-role">
                  {seller.role.charAt(0).toUpperCase()+seller.role.slice(1)}
                </p>
              </div>
            </div>
          )
        }

        {/* Show highest bid so far */}
        {highestOffer && (
          <p className="highest-bid">
            🔝 Highest bid: <strong>${highestOffer.price}</strong><br/>
            by <em>{highestOffer.buyer.name}</em>
          </p>
        )}

        {/* Service info */}
        <div className="service-info">
          <h3>{service.name}</h3>
          <p className="service-desc">{service.description}</p>
          <p className="service-price">
            Base Price: <strong>${service.price}</strong>
          </p>
        </div>

        {/* Offer form */}
        <form className="offer-form" onSubmit={handleSubmit}>
          {formError && <p className="error">{formError}</p>}

          <div className="form-row">
            <div className="form-group">
              <label>Offer Price</label>
              <input
                type="number"
                min={service.price}
                value={offerPrice}
                onChange={e => setOfferPrice(e.target.value)}
                required
              />
              <small>You may bid above the base price.</small>
            </div>
          </div>

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

          <button
            type="submit"
            className="btn-submit"
            disabled={submitting}
          >
            {submitting ? "Submitting…" : "Submit Offer"}
          </button>
        </form>
      </div>
    </div>
  );

  // ─── Main JSX ───────────────────────────────────────
  return (
    <>
      <div className="service-details-container">
        <div className="service-details-image">
          <img src={imageUrl} alt={service.name}/>
        </div>
        <div className="service-details-content">
          <h1 className="service-details-title">{service.name}</h1>
          <p className="service-details-description">{service.description}</p>
          <p className="service-details-price">
            <strong>Price:</strong> ${service.price}
          </p>
          <p className="service-details-category">
            <strong>Category:</strong> {categoryName}
          </p>

          {acceptedOffer ? (
            <p className="contracted-msg">
              🔒 This service has already been contracted by&nbsp;
              <strong>{acceptedOffer.buyer.name}</strong>.
            </p>
          ) : (
            <div className="service-details-buttons">
              <button className="offer-btn" onClick={openModal}>
                Make an Offer
              </button>
              <button className="back-btn" onClick={() => navigate(-1)}>
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>

      {modalOpen && ReactDOM.createPortal(modal, document.body)}
    </>
  );
};

export default ServiceDetails;
