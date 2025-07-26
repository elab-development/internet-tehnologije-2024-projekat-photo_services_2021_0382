// src/pages/SellerAnalytics.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SellerAnalytics = () => {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get("http://127.0.0.1:8000/api/seller/analytics")
      .then((res) => setStats(res.data))
      .catch(() => setError("Failed to load analytics."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="analytics-loading">Loading…</p>;
  if (error)   return <p className="analytics-error">{error}</p>;

  const {
    total_offers,
    pending_offers,
    accepted_offers,
    rejected_offers,
    total_revenue,
    average_offer,
    monthly_data = [],
  } = stats;

  return (
    <div className="analytics-container">
      <h1 className="analytics-header">Seller Analytics</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{total_offers}</div>
          <div className="stat-label">Total Offers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{pending_offers}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{accepted_offers}</div>
          <div className="stat-label">Accepted</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{rejected_offers}</div>
          <div className="stat-label">Rejected</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            ${Number(total_revenue || 0).toFixed(2)}
          </div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            ${Number(average_offer || 0).toFixed(2)}
          </div>
          <div className="stat-label">Avg. Offer</div>
        </div>
      </div>

      <div className="chart-container">
        <h2>Offers Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthly_data}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="offers" name="Offers" fill="#000" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container">
        <h2>Revenue Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={monthly_data}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#FFD300"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SellerAnalytics;
