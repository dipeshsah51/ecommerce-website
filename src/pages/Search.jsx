import React, { useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/common/ProductCard";
import Breadcrumb from "../components/common/Breadcrumb";
import { products, categories } from "../data/products";

export default function Search({ addToCart }) {
  const { categoryId } = useParams();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";

  const [sort, setSort] = useState("relevance");
  const [maxPrice, setMaxPrice] = useState(60000);
  const [rating, setRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const categoryName = categories.find(
    (c) => c.id === categoryId
  )?.name;

  const filtered = useMemo(() => {
    let result = products.filter(
      (p) =>
        (!categoryId || p.category === categoryId) &&
        (!q ||
          `${p.title} ${p.brand}`
            .toLowerCase()
            .includes(q.toLowerCase())) &&
        p.price <= maxPrice &&
        p.rating >= rating
    );

    if (sort === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [categoryId, q, sort, maxPrice, rating]);

  const clearFilters = () => {
    setMaxPrice(60000);
    setRating(0);
  };

  const pageTitle = q
    ? `Results for "${q}"`
    : categoryName || "All Products";

  return (
    <main className="search-page container">

      <Breadcrumb
        items={[
          categoryName || "Search results",
        ]}
      />

      {/* PAGE HEADER */}
      <section className="search-page-header">
        <div>
          <span className="section-label">
            {categoryName ? "CATEGORY" : "SHOP"}
          </span>

          <h1>{pageTitle}</h1>

          <p>
            Showing <strong>{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="search-actions">
          <button
            className="mobile-filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>

          <label className="sort-box">
            <span>Sort by</span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </label>
        </div>
      </section>

      {/* LISTING */}
      <div className="search-layout">

        {/* FILTERS */}
        <aside
          className={`search-filters card ${
            showFilters ? "show-mobile" : ""
          }`}
        >
          <div className="filter-header">
            <h3>
              <SlidersHorizontal size={18} />
              Filters
            </h3>

            <button
              className="close-filter"
              onClick={() => setShowFilters(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="filter-section">
            <div className="filter-title">
              <h4>Price</h4>
              <span>
                Up to ₹{maxPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <input
              className="price-range"
              type="range"
              min="500"
              max="60000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />

            <div className="price-labels">
              <span>₹500</span>
              <span>₹60,000</span>
            </div>
          </div>

          <div className="filter-section">
            <h4>Customer Rating</h4>

            {[4, 3, 2].map((r) => (
              <label className="filter-check" key={r}>
                <input
                  type="checkbox"
                  checked={rating === r}
                  onChange={() =>
                    setRating(rating === r ? 0 : r)
                  }
                />

                <span>
                  {r}★ & above
                </span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h4>Availability</h4>

            <label className="filter-check">
              <input type="checkbox" />
              <span>Fast delivery</span>
            </label>

            <label className="filter-check">
              <input type="checkbox" />
              <span>In stock</span>
            </label>
          </div>

          <div className="filter-section">
            <h4>Discount</h4>

            <label className="filter-check">
              <input type="checkbox" />
              <span>20% or more</span>
            </label>

            <label className="filter-check">
              <input type="checkbox" />
              <span>30% or more</span>
            </label>
          </div>

          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear all filters
          </button>
        </aside>

        {/* PRODUCTS */}
        <section className="search-results">

          <div className="results-topbar">
            <span>
              {filtered.length}{" "}
              {filtered.length === 1
                ? "product"
                : "products"}{" "}
              found
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          ) : (
            <div className="empty search-empty card">
              <div className="empty-icon">🔍</div>

              <h2>No products found</h2>

              <p>
                Try changing your search term or adjusting
                your filters.
              </p>

              <button
                className="btn btn-primary"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}