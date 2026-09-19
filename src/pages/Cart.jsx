import React from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Heart,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

import OrderSummary from "../components/cart/OrderSummary";
import { formatPrice } from "../data/products";

export default function Cart({
  cart,
  updateQty,
  removeFromCart,
  wishlist = [],
  toggleWishlist,
}) {
  /* ================= EMPTY CART ================= */

  if (!cart.length) {
    return (
      <main className="cart-page">
        <div className="cart-container">

          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={42} strokeWidth={1.7} />
            </div>

            <span className="cart-section-label">
              SHOPSPHERE CART
            </span>

            <h1>Your cart is empty</h1>

            <p>
              You haven't added anything to your cart yet.
              Explore our products and find something you'll love.
            </p>

            <Link
              to="/search"
              className="empty-cart-button"
            >
              Start Shopping
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Empty Cart Benefits */}

          <div className="cart-benefits empty-benefits">

            <div className="cart-benefit">
              <div className="cart-benefit-icon">
                <ShieldCheck size={21} />
              </div>

              <div>
                <strong>Secure Checkout</strong>
                <span>Your payment information is protected.</span>
              </div>
            </div>

            <div className="cart-benefit">
              <div className="cart-benefit-icon">
                <Truck size={21} />
              </div>

              <div>
                <strong>Fast Delivery</strong>
                <span>Reliable delivery to your doorstep.</span>
              </div>
            </div>

            <div className="cart-benefit">
              <div className="cart-benefit-icon">
                <RotateCcw size={21} />
              </div>

              <div>
                <strong>Easy Returns</strong>
                <span>Simple returns on eligible products.</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    );
  }

  /* ================= CART CALCULATIONS ================= */

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  /* ================= MAIN CART ================= */

  return (
    <main className="cart-page">

      <div className="cart-container">

        {/* PAGE HEADER */}

        <header className="cart-header">

          <div>
            <span className="cart-section-label">
              YOUR SHOPPING BAG
            </span>

            <h1>Shopping Cart</h1>

            <p>
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Link
            to="/search"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>

        </header>

        {/* CART CONTENT */}

        <div className="cart-layout">

          {/* ================= LEFT SIDE ================= */}

          <section className="cart-main">

            <div className="cart-items-card">

              {/* Card Header */}

              <div className="cart-card-header">

                <div>
                  <h2>Your Items</h2>
                  <span>
                    {totalItems}{" "}
                    {totalItems === 1 ? "product" : "products"}
                  </span>
                </div>

                <span className="cart-secure-label">
                  <ShieldCheck size={15} />
                  Secure Cart
                </span>

              </div>

              {/* Cart Items */}

              <div className="cart-items">

                {cart.map(({ product, quantity }) => {

                  const itemTotal =
                    product.price * quantity;

                  const wished = wishlist.some(
                    (item) => item.id === product.id
                  );

                  return (
                    <article
                      className="cart-item"
                      key={product.id}
                    >

                      {/* Product Image */}

                      <Link
                        to={`/product/${product.id}`}
                        className="cart-product-image"
                      >
                        <img
                          src={product.images?.[0]}
                          alt={product.title}
                        />
                      </Link>

                      {/* Product Information */}

                      <div className="cart-product-info">

                        {product.brand && (
                          <small className="cart-brand">
                            {product.brand}
                          </small>
                        )}

                        <Link
                          to={`/product/${product.id}`}
                          className="cart-product-title"
                        >
                          {product.title}
                        </Link>

                        <div className="cart-item-rating">
                          <span>
                            {product.rating || 0} ★
                          </span>

                          <small>
                            ({(product.reviews || 0).toLocaleString()})
                          </small>
                        </div>

                        <div className="cart-stock">
                          <span className="stock-check">
                            ✓
                          </span>

                          {product.stock === 0
                            ? "Out of stock"
                            : product.stock < 10
                            ? `Only ${product.stock} left`
                            : "In stock"}
                        </div>

                        {product.fastDelivery && (
                          <div className="cart-delivery">
                            <Truck size={14} />
                            Fast delivery available
                          </div>
                        )}

                        {/* Actions */}

                        <div className="cart-item-actions">

                          <div className="cart-quantity">

                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQty(
                                  product.id,
                                  Math.max(
                                    1,
                                    quantity - 1
                                  )
                                )
                              }
                              disabled={quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>

                            <strong>{quantity}</strong>

                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQty(
                                  product.id,
                                  product.stock
                                    ? Math.min(
                                        product.stock,
                                        quantity + 1
                                      )
                                    : quantity + 1
                                )
                              }
                              disabled={
                                product.stock !== undefined &&
                                quantity >= product.stock
                              }
                            >
                              <Plus size={14} />
                            </button>

                          </div>

                          <button
                            type="button"
                            className="cart-text-action"
                            onClick={() =>
                              removeFromCart(product.id)
                            }
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>

                          <button
                            type="button"
                            className={
                              wished
                                ? "cart-text-action saved"
                                : "cart-text-action"
                            }
                            onClick={() => {
                              toggleWishlist(product);
                              removeFromCart(product.id);
                            }}
                          >
                            <Heart
                              size={14}
                              fill={
                                wished
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                            Save for later
                          </button>

                        </div>

                      </div>

                      {/* Price */}

                      <div className="cart-item-price">

                        <strong>
                          {formatPrice(itemTotal)}
                        </strong>

                        {quantity > 1 && (
                          <span>
                            {formatPrice(product.price)} each
                          </span>
                        )}

                      </div>

                    </article>
                  );
                })}

              </div>
            </div>

            {/* ================= SAVED FOR LATER ================= */}

            {wishlist.length > 0 && (
              <section className="saved-for-later">

                <div className="saved-header">

                  <div>
                    <span className="cart-section-label">
                      YOUR SAVED ITEMS
                    </span>

                    <h2>Saved for later</h2>
                  </div>

                  <Heart size={20} />
                </div>

                <div className="saved-items">

                  {wishlist.map((product) => (
                    <article
                      className="saved-item"
                      key={product.id}
                    >

                      <Link
                        to={`/product/${product.id}`}
                        className="saved-product-image"
                      >
                        <img
                          src={product.images?.[0]}
                          alt={product.title}
                        />
                      </Link>

                      <div className="saved-product-info">

                        <small>
                          {product.brand}
                        </small>

                        <Link
                          to={`/product/${product.id}`}
                        >
                          <h3>{product.title}</h3>
                        </Link>

                        <strong>
                          {formatPrice(product.price)}
                        </strong>

                        <div className="saved-actions">

                          <button
                            type="button"
                            className="saved-move-button"
                            onClick={() => {
                              toggleWishlist(product);

                              const existing = cart.find(
                                (item) =>
                                  item.product.id ===
                                  product.id
                              );

                              if (existing) {
                                updateQty(
                                  product.id,
                                  existing.quantity + 1
                                );
                              }
                            }}
                          >
                            Move to Cart
                          </button>

                          <button
                            type="button"
                            className="saved-remove-button"
                            onClick={() =>
                              toggleWishlist(product)
                            }
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>

                        </div>
                      </div>

                    </article>
                  ))}

                </div>
              </section>
            )}

            {/* ================= BENEFITS ================= */}

            <div className="cart-benefits">

              <div className="cart-benefit">

                <div className="cart-benefit-icon">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <strong>Secure Payment</strong>
                  <span>Protected checkout</span>
                </div>

              </div>

              <div className="cart-benefit">

                <div className="cart-benefit-icon">
                  <Truck size={21} />
                </div>

                <div>
                  <strong>Fast Delivery</strong>
                  <span>Reliable shipping</span>
                </div>

              </div>

              <div className="cart-benefit">

                <div className="cart-benefit-icon">
                  <RotateCcw size={21} />
                </div>

                <div>
                  <strong>Easy Returns</strong>
                  <span>Simple return policy</span>
                </div>

              </div>

            </div>

          </section>

          {/* ================= ORDER SUMMARY ================= */}

          <aside className="cart-summary">

            <div className="cart-summary-sticky">

              <OrderSummary cart={cart} />

              <div className="cart-summary-security">

                <ShieldCheck size={17} />

                <span>
                  Safe and secure checkout
                </span>

              </div>

            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}