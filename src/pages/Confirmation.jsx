
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  Truck,
  CreditCard,
  MapPin,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { formatPrice } from "../data/products";

export default function Confirmation() {
  const location = useLocation();

  const order =
    location.state?.order ||
    JSON.parse(localStorage.getItem("lastOrder") || "null");

  if (!order) {
    return (
      <main className="confirmation-page">
        <div className="confirmation-container">
          <section className="confirmation-success">
            <h1>No recent order found</h1>

            <p>
              We couldn't find a recent order to display.
            </p>

            <Link
              className="confirmation-primary-button"
              to="/"
            >
              <ShoppingBag size={18} />
              Continue shopping
            </Link>
          </section>
        </div>
      </main>
    );
  }

  const total = order.items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  return (
    <main className="confirmation-page">
      <div className="confirmation-container">

        {/* Success Header */}
        <section className="confirmation-success">
          <div className="confirmation-icon">
            <CheckCircle2 size={42} strokeWidth={2.2} />
          </div>

          <span className="confirmation-eyebrow">
            ORDER CONFIRMED
          </span>

          <h1>Order placed successfully!</h1>

          <p>
            Thank you for shopping with ShopSphere. Your order has been
            successfully placed and is now being prepared.
          </p>

          <div className="confirmation-order-id">
            <span>Order number</span>
            <strong>#{order.id}</strong>
          </div>
        </section>

        {/* Delivery Information */}
        <section className="confirmation-grid">

          <div className="confirmation-card">
            <div className="confirmation-card-icon">
              <Truck size={20} />
            </div>

            <div>
              <span>Estimated delivery</span>
              
            </div><strong>{order.delivery}</strong>
<small>We'll notify you when your order ships.</small>
          </div>

          <div className="confirmation-card">
            <div className="confirmation-card-icon">
              <Package size={20} />
            </div>

            <div>
              <span>Order status</span>
              <strong>Order confirmed</strong>
              <small>Your order is being prepared.</small>
            </div>
          </div>

          <div className="confirmation-card">
            <div className="confirmation-card-icon">
              <CreditCard size={20} />
            </div>

            <div>
              <span>Payment</span>
              <div>
  <span>Payment</span>
  <strong>{order.payment}</strong>
  <small>Your selected payment method.</small>
</div>
              <small>Your selected payment method was processed.</small>
            </div>
          </div>

          <div className="confirmation-card">
            <div className="confirmation-card-icon">
              <MapPin size={20} />
            </div>

            <div>
              <span>Delivery address</span>
              <strong>Shipping address</strong>
              <small>Your order will be delivered to your selected address.</small>
            </div>
          </div>

        </section>

        {/* Order Timeline */}
        <section className="confirmation-details">
          {/* Ordered Products */}
<section className="confirmation-details">

  <div className="confirmation-details-header">
    <div>
      <span className="confirmation-eyebrow">
        ORDER DETAILS
      </span>
      <h2>Items in your order</h2>
    </div>
  </div>

  <div className="confirmation-products">

    {order.items.map(({ product, quantity }) => (
      <div
        className="confirmation-product"
        key={product.id}
      >
        <div className="confirmation-product-image">
          <img
            src={product.images?.[0]}
            alt={product.title}
          />
        </div>

        <div className="confirmation-product-info">
          <small>{product.brand}</small>

          <h3>{product.title}</h3>

          <span>
            Quantity: {quantity}
          </span>
        </div>

        <strong>
          {formatPrice(product.price * quantity)}
        </strong>
      </div>
    ))}

    <div className="confirmation-total">
      <span>Order total</span>
      <strong>{formatPrice(total)}</strong>
    </div>

  </div>

</section>

          <div className="confirmation-details-header">
            <div>
              <span className="confirmation-eyebrow">
                WHAT'S NEXT
              </span>
              <h2>Your order journey</h2>
            </div>
          </div>

          <div className="order-timeline">

            <div className="timeline-item active">
              <div className="timeline-icon">
                <CheckCircle2 size={18} />
              </div>

              <div>
                <strong>Order confirmed</strong>
                <p>Your order has been received successfully.</p>
              </div>
            </div>

            <div className="timeline-line" />

            <div className="timeline-item">
              <div className="timeline-icon">
                <Package size={18} />
              </div>

              <div>
                <strong>Preparing your order</strong>
                <p>Our team will prepare your products for shipping.</p>
              </div>
            </div>

            <div className="timeline-line" />

            <div className="timeline-item">
              <div className="timeline-icon">
                <Truck size={18} />
              </div>

              <div>
                <strong>Out for delivery</strong>
                <p>Your package will be on its way to you.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Actions */}
        <section className="confirmation-actions">

          <Link
            className="confirmation-primary-button"
            to="/account/orders"
          >
            <Package size={18} />
            Track your order
            <ArrowRight size={17} />
          </Link>

          <Link
            className="confirmation-secondary-button"
            to="/"
          >
            <ShoppingBag size={18} />
            Continue shopping
          </Link>

        </section>

        {/* Support */}
        <div className="confirmation-support">
          <strong>Need help with your order?</strong>
          <span>
            Our customer support team is available to help you.
          </span>
          <Link to="/contact">Contact support →</Link>
        </div>

      </div>
    </main>
  );
}

