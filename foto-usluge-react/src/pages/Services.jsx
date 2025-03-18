import React, { useState } from "react";
import useServices from "../hooks/useServices";
import useCategories from "../hooks/useCategories";
import Card from "../components/Card";

const Services = () => {
  // States for filtering & pagination
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  // Fetch all services & categories (client-side filtering)
  const { allServices, loading: servicesLoading } = useServices();
  const { categories, loading: categoriesLoading } = useCategories();

  // Client-side filter/sort/pagination:
  let filteredServices = [...allServices];

  // Filter by name (search)
  if (search) {
    filteredServices = filteredServices.filter(service =>
      service.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter by category ID (as stored in service_category_id)
  if (category) {
    const categoryId = parseInt(category, 10);
    filteredServices = filteredServices.filter(
      service => service.service_category_id === categoryId
    );
  }

  // Sort by price (if sort is "asc" or "desc")
  if (sort) {
    filteredServices.sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });
  }

  // Client-side pagination: 6 services per page
  const perPage = 6;
  const totalServices = filteredServices.length;
  const lastPage = Math.ceil(totalServices / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + perPage);

  // Handlers for filter bar inputs
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  // Pagination helpers
  const goToPage = (p) => {
    if (p >= 1 && p <= lastPage) {
      setPage(p);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  if (servicesLoading || categoriesLoading) {
    return <p>Loading services...</p>;
  }

  return (
    <div className="services-container">
      <h1>All Services</h1>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={handleSearchChange}
        />

        <select value={sort} onChange={handleSortChange}>
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <select value={category} onChange={handleCategoryChange}>
          <option value="">Filter by Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {paginatedServices.map((service) => {
          // Look up category name from the categories array
          const categoryObj = categories.find(
            (cat) => cat.id === service.service_category_id
          );
          const categoryName = categoryObj ? categoryObj.name : "";
          return (
            <Card
              key={service.id}
              title={service.name}
              description={service.description}
              category={categoryName}
              price={service.price}
              link={`/services/service/${service.id}`}
              className="service-card"
            />
          );
        })}
      </div>

      {/* Pagination */}
      {lastPage > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
          >
            Prev
          </button>

          {pageNumbers.map((p) => (
            <button
              key={p}
              className={`pagination-btn ${p === page ? "active" : ""}`}
              onClick={() => goToPage(p)}
            >
              {p}
            </button>
          ))}

          <button
            className="pagination-btn"
            onClick={() => goToPage(page + 1)}
            disabled={page >= lastPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
