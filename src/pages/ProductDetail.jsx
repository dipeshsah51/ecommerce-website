import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Zap,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

import Breadcrumb from "../components/common/Breadcrumb";
import RatingStars from "../components/common/RatingStars";
import Carousel from "../components/common/Carousel";
import { getProduct, products, formatPrice } from "../data/products";

export default function ProductDetail({
  addToCart,
  wishlist = [],
  toggleWishlist,
}) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = getProduct(productId);

  const [image, setImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");

  if (!product) {
    return (
      <main className="product-not-found">
        <div className="product-not-found-box">
          <h1>Product not found</h1>
          <p>
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Link to="/search" className="primary-button">
            Continue Shopping →
          </Link>
        </div>
      </main>
    );
  }

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const wished = wishlist.some((item) => item.id === product.id);

  const increaseQty = () => {
    if (product.stock && qty < product.stock) {
      setQty(qty + 1);
    }
  };

  const decreaseQty = () => {
    setQty(Math.max(1, qty - 1));
  };

  const previousImage = () => {
    setImage((current) =>
      current === 0 ? product.images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setImage((current) =>
      current === product.images.length - 1 ? 0 : current + 1
    );
  };

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(product, qty);
    }
  };

  const handleBuyNow = () => {
    if (addToCart) {
      addToCart(product, qty);
    }

    navigate("/checkout");
  };

  return (
    <main className="product-detail-page">
      <div className="product-detail-container">

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            product.brand,
            product.title,
          ]}
        />

        {/* Product Main Area */}
        <section className="product-main">

          {/* ================= GALLERY ================= */}
          <section className="product-gallery">

            <div className="product-thumbnails">
              {product.images.map((img, index) => (
                <button
                  type="button"
                  key={img}
                  className={
                    image === index
                      ? "product-thumbnail active"
                      : "product-thumbnail"
                  }
                  onClick={() => setImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${index + 1}`}
                  />
                </button>
              ))}
            </div>

            <div className="product-main-image">

              <button
                type="button"
                className="gallery-arrow gallery-prev"
                onClick={previousImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>

              <img
                src={product.images[image]}
                alt={product.title}
              />

              <button
                type="button"
                className="gallery-arrow gallery-next"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>

              {discount > 0 && (
                <span className="gallery-discount">
                  {discount}% OFF
                </span>
              )}
            </div>
          </section>

          {/* ================= PRODUCT INFO ================= */}
          <section className="product-info">

            {product.brand && (
              <span className="product-brand">
                {product.brand}
              </span>
            )}

            <h1>{product.title}</h1>

            {/* Rating */}
            <div className="product-rating-row">
              <span className="rating-number">
                {product.rating}
              </span>

              <RatingStars value={product.rating} />

              <span className="rating-count">
                {product.reviews?.toLocaleString() || 0} ratings
              </span>
            </div>

            <div className="product-divider" />

            {/* Price */}
            <div className="product-price">
              <strong>
                {formatPrice(product.price)}
              </strong>

              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <>
                    <del>
                      {formatPrice(product.originalPrice)}
                    </del>

                    <span className="price-discount">
                      {discount}% off
                    </span>
                  </>
                )}
            </div>

            <p className="tax-info">
              Inclusive of applicable taxes
            </p>

            {/* Offers */}
            <div className="product-offers">
              <div className="offers-heading">
                <span>🔥</span>
                <strong>Available offers</strong>
              </div>

              <div className="offer-item">
                <Check size={15} />
                <span>
                  Bank offer: Save extra 10% with selected cards
                </span>
              </div>

              <div className="offer-item">
                <Check size={15} />
                <span>
                  No-cost EMI available on eligible orders
                </span>
              </div>

              <div className="offer-item">
                <Check size={15} />
                <span>
                  Special discounts available on selected products
                </span>
              </div>
            </div>

            {/* Delivery */}
            <div className="delivery-section">
              <h3>Delivery</h3>

              <div className="pincode-box">
                <input
                  type="text"
                  placeholder="Enter pincode"
                  maxLength="6"
                  aria-label="Enter delivery pincode"
                />

                <button type="button">
                  Check
                </button>
              </div>

              <div className="delivery-message">
                <Truck size={16} />
                <span>
                  FREE delivery on eligible orders
                </span>
              </div>
            </div>

            {/* Stock */}
            <div
              className={
                product.stock > 0
                  ? product.stock < 10
                    ? "product-stock low"
                    : "product-stock"
                  : "product-stock out"
              }
            >
              {product.stock > 0
                ? product.stock < 10
                  ? `Only ${product.stock} left in stock`
                  : "In stock"
                : "Out of stock"}
            </div>

            {/* Mobile action buttons */}
            <div className="mobile-product-actions">

              <div className="quantity-control">
                <span>Quantity</span>

                <div className="quantity-buttons">
                  <button
                    type="button"
                    onClick={decreaseQty}
                    disabled={qty <= 1}
                  >
                    <Minus size={15} />
                  </button>

                  <strong>{qty}</strong>

                  <button
                    type="button"
                    onClick={increaseQty}
                    disabled={
                      product.stock !== undefined &&
                      qty >= product.stock
                    }
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="product-action-cart"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                type="button"
                className="product-action-buy"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                <Zap size={18} />
                Buy Now
              </button>

            </div>
          </section>

          {/* ================= BUY BOX ================= */}
          <aside className="product-buybox">

            <div className="buybox-price">
              {formatPrice(product.price)}
            </div>

            <p className="buybox-delivery">
              FREE delivery available
            </p>

            <div className="buybox-stock">
              <span className="stock-dot" />
              {product.stock > 0
                ? "In stock"
                : "Currently unavailable"}
            </div>

            {/* Quantity */}
            <div className="quantity-control">
              <span>Quantity</span>

              <div className="quantity-buttons">
                <button
                  type="button"
                  onClick={decreaseQty}
                  disabled={qty <= 1}
                >
                  <Minus size={15} />
                </button>

                <strong>{qty}</strong>

                <button
                  type="button"
                  onClick={increaseQty}
                  disabled={
                    product.stock !== undefined &&
                    qty >= product.stock
                  }
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <button
              type="button"
              className="buybox-cart"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <button
              type="button"
              className="buybox-buy"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <Zap size={18} />
              Buy Now
            </button>

            <button
              type="button"
              className={
                wished
                  ? "buybox-wishlist selected"
                  : "buybox-wishlist"
              }
              onClick={() => toggleWishlist(product)}
            >
              <Heart
                size={18}
                fill={wished ? "currentColor" : "none"}
              />

              {wished
                ? "Saved to Wishlist"
                : "Add to Wishlist"}
            </button>

            {/* Seller */}
            <div className="seller-info">

              <div className="seller-title">
                Sold by ShopSphere Sellers
              </div>

              <p>
                Secure transaction · 7-day return policy
              </p>

              <div className="seller-feature">
                <ShieldCheck size={17} />
                <span>Secure payments</span>
              </div>

              <div className="seller-feature">
                <Truck size={17} />
                <span>Reliable delivery</span>
              </div>

            </div>
          </aside>
        </section>

        {/* ================= PRODUCT DETAILS ================= */}
        <section className="product-details-section">

          <div className="product-tabs">
            {[
              ["description", "Description"],
              ["specifications", "Specifications"],
              ["box", "What's in the box"],
            ].map(([key, label]) => (
              <button
                type="button"
                key={key}
                className={tab === key ? "active" : ""}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="product-tab-content">

            {tab === "description" && (
              <div className="description-content">
                <h2>Product Description</h2>

                <p>
                  {product.description}
                </p>
              </div>
            )}

            {tab === "specifications" && (
              <div className="specifications-content">
                <h2>Product Specifications</h2>

                {product.specs &&
                Object.keys(product.specs).length > 0 ? (
                  <table>
                    <tbody>
                      {Object.entries(product.specs).map(
                        ([key, value]) => (
                          <tr key={key}>
                            <th>{key}</th>
                            <td>{value}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                ) : (
                  <p>
                    Product specifications are currently
                    unavailable.
                  </p>
                )}
              </div>
            )}

            {tab === "box" && (
              <div className="box-content">
                <h2>What's in the box?</h2>

                <ul>
                  <li>
                    <Check size={16} />
                    <span>1 × {product.title}</span>
                  </li>

                  <li>
                    <Check size={16} />
                    <span>
                      Documentation and accessories
                    </span>
                  </li>

                  <li>
                    <Check size={16} />
                    <span>
                      Warranty information
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* ================= REVIEWS ================= */}
        <Reviews product={product} />

        {/* ================= SIMILAR PRODUCTS ================= */}
        <Carousel
          title="Similar products"
          products={products
            .filter((item) => item.id !== product.id)
            .slice(0, 4)}
          addToCart={addToCart}
        />
      </div>
    </main>
  );
}

/* =========================================================
   REVIEWS
========================================================= */

function Reviews({ product }) {
  const rating = product.rating || 0;
  const reviews = product.reviews || 0;

  return (
    <section className="product-reviews">

      <div className="reviews-heading">
        <div>
          <span className="section-label">
            CUSTOMER FEEDBACK
          </span>

          <h2>Customer reviews</h2>

          <p>
            See what customers are saying about this product.
          </p>
        </div>
      </div>

      <div className="review-overview">

        <div className="review-score">
          <strong>{rating}</strong>

          <RatingStars value={rating} />

          <span>
            {reviews.toLocaleString()} ratings
          </span>
        </div>

        <div className="review-bars">

          {[5, 4, 3, 2, 1].map((star) => {

            const percentage =
              star === 5
                ? 72
                : star === 4
                ? 18
                : star === 3
                ? 6
                : 3;

            return (
              <div
                className="review-bar-row"
                key={star}
              >
                <span>{star} star</span>

                <div className="review-bar">
                  <span
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <small>{percentage}%</small>
              </div>
            );
          })}

        </div>
      </div>

      <div className="review-list">

        <article className="customer-review">

          <div className="review-top">
            <RatingStars value={5} />

            <span className="verified-review">
              ✓ Verified Purchase
            </span>
          </div>

          <h3>
            Great product and excellent value
          </h3>

          <p>
            The quality is very good and delivery was quick.
            The product matches the description perfectly.
          </p>

          <small>
            Helpful · 42
          </small>

        </article>

        <article className="customer-review">

          <div className="review-top">
            <RatingStars value={4} />

            <span className="verified-review">
              ✓ Verified Purchase
            </span>
          </div>

          <h3>
            Worth the price
          </h3>

          <p>
            Good build quality and easy to use.
            I would recommend this product.
          </p>

          <small>
            Helpful · 18
          </small>

        </article>

      </div>
    </section>
  );
}