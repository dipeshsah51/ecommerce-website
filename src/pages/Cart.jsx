import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Heart, Plus, Minus, ShoppingBag } from "lucide-react";
import OrderSummary from "../components/cart/OrderSummary";
import { formatPrice } from "../data/products";

export default function Cart({ cart, updateQty, removeFromCart }) {
  if (!cart.length) {
    return (
      <main className="container cart-page">
        <div className="empty-cart card">
          <div className="empty-cart-icon">
            <ShoppingBag size={38} />
          </div>

          <h1>Your Shopping Cart is Empty</h1>

          <p>
            Looks like you haven't added anything to your cart yet.
          </p>

          <Link className="btn btn-primary" to="/search">
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <main className="container cart-page">

      {/* PAGE HEADER */}
      <div className="cart-header">
        <div>
          <span className="section-label">YOUR SHOPPING BAG</span>
          <h1>Shopping Cart</h1>
          <p>
            {totalItems}{" "}
            {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <Link to="/search" className="continue-shopping">
          ← Continue Shopping
        </Link>
      </div>

      <div className="cart-layout">

        {/* CART ITEMS */}
        <section className="cart-main">

          <div className="cart-card card">

            <div className="cart-card-header">
              <h2>Your Items</h2>
              <span>{totalItems} items</span>
            </div>

            {cart.map(({ product, quantity }) => (
              <article className="cart-item" key={product.id}>

                <Link
                  to={`/product/${product.id}`}
                  className="cart-image"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                  />
                </Link>

                <div className="cart-info">

                  <small className="cart-brand">
                    {product.brand}
                  </small>

                  <Link to={`/product/${product.id}`}>
                    <h3>{product.title}</h3>
                  </Link>

                  <span className="cart-stock">
                    ✓ In stock
                  </span>

                  <p className="delivery">
                    ✓ Fast delivery available
                  </p>

                  <div className="cart-actions">

                    <div className="quantity">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQty(
                            product.id,
                            quantity - 1
                          )
                        }
                      >
                        <Minus size={15} />
                      </button>

                      <b>{quantity}</b>

                      <button
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQty(
                            product.id,
                            quantity + 1
                          )
                        }
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    <button
                      className="cart-action-btn"
                      onClick={() =>
                        removeFromCart(product.id)
                      }
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>

                    <button className="cart-action-btn">
                      <Heart size={15} />
                      Save for later
                    </button>

                  </div>
                </div>

                <div className="cart-price">
                  <strong>
                    {formatPrice(
                      product.price * quantity
                    )}
                  </strong>

                  {quantity > 1 && (
                    <small>
                      {formatPrice(product.price)} each
                    </small>
                  )}
                </div>

              </article>
            ))}
          </div>

          {/* SAVED FOR LATER */}
          <div className="saved card">
            <div className="saved-header">
              <Heart size={19} />
              <h2>Saved for later</h2>
            </div>

            <p>
              Items you save will appear here.
            </p>
          </div>

          {/* SHOPPING BENEFITS */}
          <div className="cart-benefits">

            <div>
              <span>🔒</span>
              <div>
                <strong>Secure Payment</strong>
                <small>Protected checkout</small>
              </div>
            </div>

            <div>
              <span>🚚</span>
              <div>
                <strong>Fast Delivery</strong>
                <small>Reliable shipping</small>
              </div>
            </div>

            <div>
              <span>↩️</span>
              <div>
                <strong>Easy Returns</strong>
                <small>Simple return policy</small>
              </div>
            </div>

          </div>

        </section>

        {/* ORDER SUMMARY */}
        <aside className="cart-summary">
          <OrderSummary cart={cart} />
        </aside>

      </div>
    </main>
  );
}