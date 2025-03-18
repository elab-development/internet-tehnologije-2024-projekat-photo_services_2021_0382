import React, { useState } from "react";
import useServices from "../hooks/useServices";
import useCategories from "../hooks/useCategories";
import Card from "../components/Card";

// Stranica za prikaz svih dostupnih usluga
const Services = () => {
  // State za pretragu, sortiranje, filtriranje i paginaciju
  const [page, setPage] = useState(1); // Trenutna stranica
  const [search, setSearch] = useState(""); // Tekst pretrage
  const [sort, setSort] = useState(""); // Sortiranje po ceni
  const [category, setCategory] = useState(""); // Filtriranje po kategoriji

  // Dohvatanje svih usluga i kategorija pomoću custom hook-ova
  const { allServices, loading: servicesLoading } = useServices();
  const { categories, loading: categoriesLoading } = useCategories();

  // Filtriranje usluga na osnovu korisničkog unosa
  let filteredServices = [...allServices];

  // Pretraga usluga po imenu
  if (search) {
    filteredServices = filteredServices.filter(service =>
      service.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filtriranje usluga po izabranoj kategoriji
  if (category) {
    const categoryId = parseInt(category, 10);
    filteredServices = filteredServices.filter(
      service => service.service_category_id === categoryId
    );
  }

  // Sortiranje usluga po ceni (rastuce ili opadajuće)
  if (sort) {
    filteredServices.sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });
  }

  // Paginacija - prikaz po 6 usluga na stranici
  const perPage = 6;
  const totalServices = filteredServices.length;
  const lastPage = Math.ceil(totalServices / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + perPage);

  // Funkcije za ažuriranje filtera
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

  // Navigacija kroz stranice paginacije
  const goToPage = (p) => {
    if (p >= 1 && p <= lastPage) {
      setPage(p);
    }
  };

  // Kreiranje niza brojeva stranica za prikaz u paginaciji
  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  // Prikaz loading indikatora dok se učitavaju usluge ili kategorije
  if (servicesLoading || categoriesLoading) {
    return <p>Loading services...</p>;
  }

  return (
    <div className="services-container">
      <h1>All Services</h1>

      {/* Filter bar za pretragu, sortiranje i filtriranje usluga */}
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

      {/* Prikaz usluga u grid rasporedu */}
      <div className="services-grid">
        {paginatedServices.map((service) => {
          // Pronalazak imena kategorije na osnovu ID-a
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

      {/* Paginacija - prikaz brojeva stranica i navigacija */}
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
