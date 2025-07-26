import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const MyOffers = () => {
  const [offers, setOffers]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [modalOpen, setModalOpen]   = useState(false);
  const [selected, setSelected]     = useState(null);
  const [paymentType, setPaymentType] = useState("");
  const [date, setDate]             = useState("");
  const [notes, setNotes]           = useState("");
  const [submitting, setSubmitting] = useState(false);

  // set token header once
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/offers/buyer");
      // Laravel ResourceCollection usually lives in res.data.data
      setOffers(Array.isArray(res.data) ? res.data : res.data.data || []);
    } catch (e) {
      setError("Failed to load your offers.");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (offer) => {
    setSelected(offer);
    setPaymentType(offer.payment_type);
    setDate(offer.date);
    setNotes(offer.notes || "");
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/offers/${selected.id}`, {
        payment_type: paymentType,
        date,
        notes
      });
      closeModal();
      fetchOffers();
    } catch {
      alert("Update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Really delete this offer?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/offers/${id}`);
      setOffers((o) => o.filter((x) => x.id !== id));
    } catch {
      alert("Delete failed.");
    }
  };

  if (loading) return <p className="mo-loading">Loading…</p>;
  if (error)   return <p className="mo-error">{error}</p>;

  return (
    <div className="mo-container">
      <h1>My Offers</h1>

      <div className="offers-grid">
        {offers.map((off) => (
          <div key={off.id} className="offer-card">
            <h3 className="offer-title">{off.service.name}</h3>
            <p><strong>Price:</strong> ${off.price}</p>
            <p><strong>Payment:</strong> {off.payment_type}</p>
            <p><strong>Date:</strong> {off.date}</p>
            <p><strong>Notes:</strong> {off.notes || "—"}</p>
            <div className="offer-card-buttons">
              <button className="btn-edit"  onClick={() => openEdit(off)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(off.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <h2>Edit Offer</h2>
              <button className="close-btn" onClick={closeModal}>
                <IoClose size={20} />
              </button>
            </header>

            <section className="read-only-group">
              <div className="row">
                <label>Service</label>
                <div className="text-readonly">{selected.service.name}</div>
              </div>
              <div className="row">
                <label>Description</label>
                <div className="text-readonly description">
                  {selected.service.description}
                </div>
              </div>
              <div className="row">
                <label>Price</label>
                <div className="text-readonly">${selected.price}</div>
              </div>
            </section>

            <form className="modal-form" onSubmit={handleUpdate}>
              <div className="editable-group">
                <div className="row">
                  <label>Payment Type</label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    required
                  >
                    <option value="credit card">Credit Card</option>
                    <option value="cash">Cash</option>
                    <option value="bank transfer">Bank Transfer</option>
                  </select>
                </div>
                <div className="row">
                  <label>Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="row notes-row">
                  <label>Notes</label>
                  <textarea
                    rows="3"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <footer className="modal-footer">
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? "Updating…" : "Update Offer"}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOffers;
