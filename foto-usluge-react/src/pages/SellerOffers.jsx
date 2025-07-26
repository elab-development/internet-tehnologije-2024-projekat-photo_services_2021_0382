import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const SellerOffers = () => {
  const [offers, setOffers]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent]     = useState(null);
  const [price, setPrice]         = useState("");
  const [status, setStatus]       = useState("pending");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/offers/seller");
      // normalize response shape
      let arr = [];
      if (Array.isArray(res.data)) {
        arr = res.data;
      } else if (Array.isArray(res.data.data)) {
        arr = res.data.data;
      } else if (Array.isArray(res.data.offers)) {
        arr = res.data.offers;
      }
      setOffers(arr);
      setError("");
    } catch {
      setError("Failed to load offers.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (offer) => {
    setCurrent(offer);
    setPrice(offer.price);
    setStatus(offer.status);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/offers/${current.id}`,
        { price, status }
      );
      closeModal();
      fetchOffers();
    } catch {
      alert("Update failed.");
    }
  };

  if (loading) return <p className="so-loading">Loading…</p>;
  if (error)   return <p className="so-error">{error}</p>;

  return (
    <div className="so-container">
      <h1>Offers Received</h1>

      {offers.length === 0 ? (
        <p className="so-empty">
          There are no offers for your services yet.
        </p>
      ) : (
        <div className="so-table-wrap">
          <table className="so-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Buyer</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((o) => (
                <tr key={o.id}>
                  <td>{o.service.name}</td>
                  <td>{o.buyer.email}</td>
                  <td>${o.price}</td>
                  <td>{o.payment_type}</td>
                  <td>{o.date}</td>
                  <td className="so-notes">{o.notes || "—"}</td>
                  <td className={`so-status so-${o.status}`}>
                    {o.status}
                  </td>
                  <td>
                    <button
                      className="so-edit-btn"
                      onClick={() => openModal(o)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && current && (
        <div className="so-modal-overlay">
          <div className="so-modal-content">
            <button className="so-modal-close" onClick={closeModal}>
              <IoClose size={20} />
            </button>
            <h2>Edit Offer</h2>
            <div className="so-readonly">
              <p><strong>Service:</strong> {current.service.name}</p>
              <p><strong>Buyer:</strong> {current.buyer.email}</p>
            </div>
            <form className="so-form" onSubmit={handleUpdate}>
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>

              <button type="submit" className="so-submit-btn">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOffers;
