import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import { products } from "../data/products";

export default function Home({
  addToCart,
  wishlist,
  toggleWishlist,
}) {
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

{/* DEALS SECTION */}
<section className="section deals-section">
  <div className="section-heading">
    <div>
      <span className="section-eyebrow">LIMITED TIME</span>
      <h2>Today's Best Deals 🔥</h2>
    </div>

    <Link to="/deals" className="section-link">
      View all deals →
    </Link>
  </div>

  <div className="deals-banner">
    <div className="deals-content">
      <span className="deals-label">⚡ FLASH SALE</span>

      <h3>
        Save more on
        <br />
        your favorite products.
      </h3>

      <p>
        Grab limited-time offers before they're gone.
        New deals added regularly.
      </p>

      <Link to="/deals" className="deals-button">
        Shop deals →
      </Link>
    </div>

    <div className="deals-stats">
      <div>
        <strong>50%</strong>
        <span>Maximum discount</span>
      </div>

      <div>
        <strong>24h</strong>
        <span>Limited offers</span>
      </div>

      <div>
        <strong>100+</strong>
        <span>Products on sale</span>
      </div>
    </div>
  </div>
</section>

      {/* CATEGORY SECTION */}
<section className="home-section category-section">
  <div className="section-heading">
    <div>
      <span className="section-label">EXPLORE</span>
      <h2>Shop by category</h2>
      <p className="section-description">
        Find everything you need across our popular categories.
      </p>
    </div>

    <Link to="/search" className="section-link">
      Explore all →
    </Link>
  </div>

  <div className="category-grid">

    <Link to="/category/electronics" className="category-card">
      <div className="category-icon">
        💻
      </div>
      <strong>Electronics</strong>
      <span>Latest gadgets</span>
    </Link>

    <Link to="/category/fashion" className="category-card">
      <div className="category-icon">
        👕
      </div>
      <strong>Fashion</strong>
      <span>Style for everyone</span>
    </Link>

    <Link to="/category/home-kitchen" className="category-card">
      <div className="category-icon">
        🏠
      </div>
      <strong>Home & Kitchen</strong>
      <span>Make your home better</span>
    </Link>

    <Link to="/category/beauty" className="category-card">
      <div className="category-icon">
        ✨
      </div>
      <strong>Beauty</strong>
      <span>Beauty essentials</span>
    </Link>

    <Link to="/category/sports" className="category-card">
      <div className="category-icon">
        ⚽
      </div>
      <strong>Sports</strong>
      <span>Gear & equipment</span>
    </Link>

    <Link to="/category/books" className="category-card">
      <div className="category-icon">
        📚
      </div>
      <strong>Books</strong>
      <span>Read something great</span>
    </Link>

  </div>
</section>

{/* POPULAR PRODUCTS SECTION */}
<section className="home-section products-section">
  <div className="section-heading">
    <div>
      <span className="section-label">POPULAR NOW</span>
      <h2>Popular products</h2>
      <p className="section-description">
        Discover products customers are loving right now.
      </p>
    </div>

    <Link to="/search" className="section-link">
      View all →
    </Link>
  </div>

  <div className="product-grid">
    {featuredProducts.map((product) => (
      <ProductCard
  key={product.id}
  product={product}
  addToCart={addToCart}
  wishlist={wishlist}
  onWishlist={toggleWishlist}
/>
    ))}
  </div>

  <div className="products-view-more">
    <Link to="/search" className="products-more-button">
      Explore more products
      <span>→</span>
    </Link>
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
<section className="home-section benefits-section">
  <div className="section-heading centered">
    <div>
      <span className="section-label">SHOP WITH CONFIDENCE</span>
      <h2>Why choose ShopSphere?</h2>
      <p className="section-description">
        A simple, secure and reliable shopping experience from
        browsing to delivery.
      </p>
    </div>
  </div>

  <div className="benefits-grid">

    <div className="benefit-card">
      <div className="benefit-icon">
        🚚
      </div>

      <div>
        <h3>Fast Delivery</h3>
        <p>
          Get your favorite products delivered quickly
          and safely to your doorstep.
        </p>
      </div>
    </div>

    <div className="benefit-card">
      <div className="benefit-icon">
        🔒
      </div>

      <div>
        <h3>Secure Payments</h3>
        <p>
          Shop with confidence with a secure and
          trustworthy shopping experience.
        </p>
      </div>
    </div>

    <div className="benefit-card">
      <div className="benefit-icon">
        ↩️
      </div>

      <div>
        <h3>Easy Returns</h3>
        <p>
          Simple return options are available for
          eligible products.
        </p>
      </div>
    </div>

    <div className="benefit-card">
      <div className="benefit-icon">
        💬
      </div>

      <div>
        <h3>Customer Support</h3>
        <p>
          Get help whenever you need it from our
          customer support team.
        </p>
      </div>
    </div>

  </div>
</section>

    </main>
  );
}