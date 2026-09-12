import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import { products } from "../data/products";

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <main className="home-page">

      {/* HERO SECTION */}
<section className="hero-section">
  <div className="hero-content">
    <span className="hero-label">
      ✦ BIG SAVINGS · LIMITED TIME
    </span>

    <h1>
      Everything you need,
      <br />
      <span>all in one place.</span>
    </h1>

    <p>
      Discover amazing products, exclusive deals and everyday
      essentials — all from one trusted marketplace.
    </p>

    <div className="hero-actions">
      <Link to="/deals" className="primary-button">
        Shop today's deals
        <span>→</span>
      </Link>

      <Link to="/search" className="secondary-button">
        Explore products
        <span>→</span>
      </Link>
    </div>

    <div className="hero-features">
      <div>
        <strong>10K+</strong>
        <span>Products</span>
      </div>

      <div>
        <strong>4.8★</strong>
        <span>Customer rating</span>
      </div>

      <div>
        <strong>24/7</strong>
        <span>Support</span>
      </div>
    </div>
  </div>

  <div className="hero-visual">
    <div className="hero-image-wrapper">
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
        alt="Shopping collection"
      />

      <div className="hero-floating-card">
        <span>🔥</span>
        <div>
          <strong>Today's Deals</strong>
          <small>Up to 50% off</small>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* CATEGORY SECTION */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="section-label">EXPLORE</span>
            <h2>Shop by category</h2>
          </div>

          <Link to="/search">Explore all →</Link>
        </div>

        <div className="category-grid">
          <Link to="/category/electronics" className="category-card">
            <span>💻</span>
            <strong>Electronics</strong>
            <small>Latest gadgets</small>
          </Link>

          <Link to="/category/fashion" className="category-card">
            <span>👕</span>
            <strong>Fashion</strong>
            <small>Style for everyone</small>
          </Link>

          <Link to="/category/home-kitchen" className="category-card">
            <span>🏠</span>
            <strong>Home & Kitchen</strong>
            <small>Make your home better</small>
          </Link>

          <Link to="/category/beauty" className="category-card">
            <span>✨</span>
            <strong>Beauty</strong>
            <small>Beauty essentials</small>
          </Link>

          <Link to="/category/sports" className="category-card">
            <span>⚽</span>
            <strong>Sports</strong>
            <small>Gear & equipment</small>
          </Link>

          <Link to="/category/books" className="category-card">
            <span>📚</span>
            <strong>Books</strong>
            <small>Read something great</small>
          </Link>
        </div>
      </section>


      {/* PRODUCTS */}
      <section className="home-section products-section">
        <div className="section-heading">
          <div>
            <span className="section-label">POPULAR NOW</span>
            <h2>Popular products</h2>
          </div>

          <Link to="/search">View all →</Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>


      {/* DEAL BANNER */}
      <section className="deal-banner">
        <div>
          <span>LIMITED TIME OFFER</span>

          <h2>
            Save more on
            <br />
            today's best deals.
          </h2>

          <p>
            Discover discounts across electronics, fashion,
            home and more.
          </p>

          <Link to="/deals" className="primary-button">
            View all deals →
          </Link>
        </div>

        <div className="deal-number">
          <strong>50%</strong>
          <span>OFF</span>
        </div>
      </section>


      {/* WHY SHOPSPHERE */}
      <section className="home-section">
        <div className="section-heading centered">
          <span className="section-label">SHOP WITH CONFIDENCE</span>
          <h2>Why ShopSphere?</h2>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <span>🚚</span>
            <h3>Fast Delivery</h3>
            <p>
              Get your products delivered quickly and safely.
            </p>
          </div>

          <div className="benefit-card">
            <span>🔒</span>
            <h3>Secure Shopping</h3>
            <p>
              Your shopping experience is designed with security in mind.
            </p>
          </div>

          <div className="benefit-card">
            <span>↩️</span>
            <h3>Easy Returns</h3>
            <p>
              Simple return options for eligible products.
            </p>
          </div>

          <div className="benefit-card">
            <span>💬</span>
            <h3>Customer Support</h3>
            <p>
              We're here to help whenever you need us.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}