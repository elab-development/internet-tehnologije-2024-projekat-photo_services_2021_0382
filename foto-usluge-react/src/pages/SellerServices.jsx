// src/pages/SellerServices.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import useCategories from "../hooks/useCategories";
import { IoClose } from "react-icons/io5";

const SellerServices = () => {
  const [services, setServices]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [page, setPage]             = useState(1);
  const [modalOpen, setModalOpen]   = useState(false);

  // form fields
  const [name, setName]             = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice]           = useState("");
  const [category, setCategory]     = useState("");

  const perPage = 6;
  const { categories, loading: catLoading } = useCategories();

  // set auth header & fetch initial
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchServices(page);
  }, [page]);

  const fetchServices = async (pg = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/services/seller?per_page=${perPage}&page=${pg}`
      );
      setServices(res.data.services);
      setError("");
    } catch {
      setError("Failed to load your services.");
    } finally {
      setLoading(false);
    }
  };

  // create
  const handleCreate = async e => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/services", {
        name,
        description,
        price,
        service_category_id: category
      });
      closeModal();
      fetchServices(page);
    } catch (err) {
      alert(err.response?.data?.error || "Create failed");
    }
  };

  // edit price
  const updatePrice = async (id, newPrice) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/services/${id}`, { price: newPrice });
      fetchServices(page);
    } catch {
      alert("Update failed");
    }
  };

  const openModal = () => {
    setModalOpen(true);
    // reset
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
  };
  const closeModal = () => setModalOpen(false);

  if (loading || catLoading) return <p className="ss-loading">Loading…</p>;
  if (error)                  return <p className="ss-error">{error}</p>;

  return (
    <div className="ss-container">
      <div className="ss-header">
        <h1>Your Services</h1>
        <button className="ss-add-btn" onClick={openModal}>Add Service</button>
      </div>

      {services.length === 0 ? (
        <p className="ss-empty">
          You haven’t created any services yet. Click “Add Service” to get started!
        </p>
      ) : (
        <div className="ss-grid">
          {services.map(s => (
            <div key={s.id} className="ss-card" style={{ width: "110%"}}>
              <h3>{s.name}</h3>
              <p className="ss-desc">{s.description}</p>
              <div className="ss-price-row">
                <span className="ss-price">${s.price}</span>
                <button
                  className="ss-edit-price-btn"
                  onClick={() => {
                    const np = prompt("New price:", s.price);
                    if (np) updatePrice(s.id, np);
                  }}
                >
                  Edit Price
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {services.length > 0 && (
        <div className="ss-pagination">
          <button
            onClick={() => page>1 && setPage(p=>p-1)}
            disabled={page === 1}
          >Prev</button>
          <span>Page {page}</span>
          <button onClick={() => setPage(p=>p+1)}>Next</button>
        </div>
      )}

      {modalOpen && (
        <div className="ss-modal-overlay">
          <div className="ss-modal-content">
            <button className="ss-modal-close" onClick={closeModal}>
              <IoClose size={24}/>
            </button>
            <h2>Add New Service</h2>
            <form className="ss-create-form" onSubmit={handleCreate}>
              <label>Name</label>
              <input
                style={{ width: "96%"}}
                type="text"
                value={name}
                onChange={e=>setName(e.target.value)}
                required
              />

              <label>Category</label>
              <select
                value={category}
                onChange={e=>setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map(c=>(
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <label>Price</label>
              <input
                style={{ width: "96%"}}
                type="number"
                value={price}
                onChange={e=>setPrice(e.target.value)}
                required
              />

              <label>Description</label>
              <textarea
                style={{ width: "96%"}}
                rows="3"
                value={description}
                onChange={e=>setDescription(e.target.value)}
                required
              />

              <button type="submit" className="ss-create-submit">
                Create Service
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerServices;
