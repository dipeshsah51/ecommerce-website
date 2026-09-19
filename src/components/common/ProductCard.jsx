import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { formatPrice } from "../../data/products";

export default function ProductCard({
  product,
  addToCart,
  onWishlist,
  wishlist = [],
}) {
  const navigate = useNavigate();

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const discount =
    product.originalPrice &&
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (addToCart) {
      addToCart(product);
    }
  };

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (onWishlist) {
      onWishlist(product);
    }
  };

  return (
    <article className="product-card">

      {/* Product Image */}
<div className="product-image-container">
  <Link
    to={`/product/${product.id}`}
    className="product-image-wrap"
    aria-label={`View ${product.title}`}
  >
    <img
      src={product.images?.[0]}
      alt={product.title}
      loading="lazy"
    />
  </Link>

  {/* Discount Badge */}
  {discount > 0 && (
    <span className="product-discount-badge">
      {discount}% OFF
    </span>
  )}

  {/* Wishlist */}
  <button
    type="button"
    className={`product-wishlist ${
      isWishlisted ? "active" : ""
    }`}
    onClick={handleWishlist}
    aria-label={
      isWishlisted
        ? `Remove ${product.title} from wishlist`
        : `Add ${product.title} to wishlist`
    }
  >
    <Heart
      size={18}
      fill={isWishlisted ? "currentColor" : "none"}
    />
  </button>
</div>

      {/* Product Information */}
      <div className="product-card-body">

        {/* Brand */}
        {product.brand && (
          <small className="brand">
            {product.brand}
          </small>
        )}

        {/* Product Badge */}
        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        {/* Product Title */}
        <Link
          to={`/product/${product.id}`}
          className="product-title"
        >
          {product.title}
        </Link>

        {/* Rating */}
        <div
          className="rating"
          aria-label={`${product.rating ?? 0} out of 5 stars`}
        >
          <span>{product.rating ?? 0}</span>

          <Star
            size={14}
            fill="currentColor"
            strokeWidth={1.5}
          />

          <small>
            ({(product.reviews ?? 0).toLocaleString()})
          </small>
        </div>

        {/* Price */}
        <div className="price">
          <strong>
            {formatPrice(product.price)}
          </strong>

          {product.originalPrice &&
            product.originalPrice > product.price && (
              <del>
                {formatPrice(product.originalPrice)}
              </del>
            )}

          {discount > 0 && (
            <em>
              {discount}% off
            </em>
          )}
        </div>

        {/* Fast Delivery */}
        {product.fastDelivery && (
          <small className="delivery">
            ✓ Fast delivery available
          </small>
        )}

        {/* Stock */}
        {product.stock !== undefined && (
          <small
            className={
              product.stock > 0
                ? "stock available"
                : "stock unavailable"
            }
          >
            {product.stock > 0
              ? `${product.stock} available`
              : "Out of stock"}
          </small>
        )}

       {/* Actions */}
<div className="product-card-actions">

  {/* Add To Cart */}
  <button
    type="button"
    className="btn btn-primary product-cart-button"
    onClick={handleAddToCart}
    disabled={product.stock === 0}
  >
    <ShoppingCart size={16} />

    {product.stock === 0
      ? "Out of Stock"
      : "Add to Cart"}
  </button>

  {/* Buy Now */}
<button
  type="button"
  className="product-buy-button"
  onClick={() =>
    navigate("/checkout", {
      state: {
        buyNow: [
          {
            product,
            quantity: 1,
          },
        ],
      },
    })
  }
  disabled={product.stock === 0}
>
  Buy Now
</button>

</div>
      </div>
    </article>
  );
}