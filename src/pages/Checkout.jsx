import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Truck,
  CreditCard,
  ClipboardCheck,
  ShieldCheck,
  Check,
} from "lucide-react";
import OrderSummary from "../components/cart/OrderSummary";
import { formatPrice } from "../data/products";

export default function Checkout({ cart }) {
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("UPI");
  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <main className="container checkout-page">
        <div className="empty-checkout card">
          <h1>No items to checkout</h1>
          <p>Add some products to your cart before continuing.</p>
          <Link to="/cart" className="btn btn-primary">
            Go to Cart
          </Link>
        </div>
      </main>
    );
  }

  const next = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      navigate("/checkout/confirmation");
    }
  };

  const steps = [
    { name: "Address", icon: MapPin },
    { name: "Delivery", icon: Truck },
    { name: "Payment", icon: CreditCard },
    { name: "Review", icon: ClipboardCheck },
  ];

  return (
    <main className="container checkout-page">

      {/* HEADER */}
      <div className="checkout-header">
        <div>
          <span className="section-label">SECURE CHECKOUT</span>
          <h1>Complete your order</h1>
          <p>Review your details and place your order securely.</p>
        </div>

        <div className="checkout-security">
          <ShieldCheck size={18} />
          <span>Secure checkout</span>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="checkout-progress">
        {steps.map((item, index) => {
          const number = index + 1;
          const Icon = item.icon;

          return (
            <React.Fragment key={item.name}>
              <div
                className={`checkout-step ${
                  step >= number ? "active" : ""
                }`}
              >
                <div className="step-icon">
                  {step > number ? (
                    <Check size={16} />
                  ) : (
                    <Icon size={16} />
                  )}
                </div>

                <span>{item.name}</span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`step-line ${
                    step > number ? "active" : ""
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="checkout-layout">

        {/* MAIN CHECKOUT */}
        <section className="checkout-main">

          {/* ADDRESS */}
          {step === 1 && (
            <div className="card checkout-card">
              <div className="checkout-card-title">
                <div>
                  <span className="step-number">1</span>
                  <div>
                    <h2>Delivery Address</h2>
                    <p>Where should we deliver your order?</p>
                  </div>
                </div>
              </div>

              <label className="address-option selected">
                <input
                  type="radio"
                  defaultChecked
                  name="address"
                />

                <div className="address-content">
                  <div className="address-top">
                    <b>Dipesh Kumar Sah</b>
                    <span>Home</span>
                  </div>

                  <p>
                    SRM University Hostel, Ramapuram,
                    Chennai, Tamil Nadu 600089
                  </p>

                  <small>Phone: +91 XXXXX XXXXX</small>
                </div>
              </label>

              <button className="btn btn-secondary add-address">
                + Add a new address
              </button>
            </div>
          )}

          {/* DELIVERY */}
          {step === 2 && (
            <div className="card checkout-card">
              <div className="checkout-card-title">
                <div>
                  <span className="step-number">2</span>
                  <div>
                    <h2>Delivery Options</h2>
                    <p>Choose how you'd like to receive your order.</p>
                  </div>
                </div>
              </div>

              <div className="delivery-options">
                {[
                  {
                    title: "Standard Delivery",
                    description: "3–5 business days",
                    price: "FREE",
                    icon: "🚚",
                  },
                  {
                    title: "Express Delivery",
                    description: "1–2 business days",
                    price: "₹149",
                    icon: "⚡",
                  },
                  {
                    title: "Scheduled Delivery",
                    description: "Choose a convenient date",
                    price: "Available",
                    icon: "📅",
                  },
                ].map((option, index) => (
                  <label
                    className="delivery-option"
                    key={option.title}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      defaultChecked={index === 0}
                    />

                    <span className="delivery-option-icon">
                      {option.icon}
                    </span>

                    <span className="delivery-option-info">
                      <b>{option.title}</b>
                      <small>{option.description}</small>
                    </span>

                    <strong>{option.price}</strong>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENT */}
          {step === 3 && (
            <div className="card checkout-card">
              <div className="checkout-card-title">
                <div>
                  <span className="step-number">3</span>
                  <div>
                    <h2>Payment Method</h2>
                    <p>Select your preferred payment method.</p>
                  </div>
                </div>
              </div>

              <div className="payment-options">
                {[
                  "UPI",
                  "Credit / Debit Card",
                  "Net Banking",
                  "Cash on Delivery",
                ].map((method) => (
                  <label
                    className={`payment-option ${
                      payment === method ? "selected" : ""
                    }`}
                    key={method}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === method}
                      onChange={() => setPayment(method)}
                    />

                    <span>
                      {method === "UPI" && "📱"}
                      {method === "Credit / Debit Card" && "💳"}
                      {method === "Net Banking" && "🏦"}
                      {method === "Cash on Delivery" && "💵"}
                    </span>

                    <b>{method}</b>
                  </label>
                ))}
              </div>

              {payment === "UPI" && (
                <div className="payment-form">
                  <label>
                    UPI ID
                    <input
                      placeholder="name@bank"
                      type="text"
                    />
                  </label>

                  <small>
                    Example: yourname@oksbi
                  </small>
                </div>
              )}

              {payment === "Credit / Debit Card" && (
                <div className="payment-form card-form">
                  <label>
                    Card Number
                    <input
                      placeholder="1234 5678 9012 3456"
                      type="text"
                    />
                  </label>

                  <div className="payment-form-row">
                    <label>
                      Expiry Date
                      <input
                        placeholder="MM/YY"
                        type="text"
                      />
                    </label>

                    <label>
                      CVV
                      <input
                        placeholder="•••"
                        type="password"
                      />
                    </label>
                  </div>
                </div>
              )}

              {payment === "Cash on Delivery" && (
                <div className="cod-message">
                  <strong>Cash on Delivery selected</strong>
                  <p>
                    Pay when your order is delivered to your address.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* REVIEW */}
          {step === 4 && (
            <div className="card checkout-card">
              <div className="checkout-card-title">
                <div>
                  <span className="step-number">4</span>
                  <div>
                    <h2>Review Your Order</h2>
                    <p>Check everything before placing your order.</p>
                  </div>
                </div>
              </div>

              <div className="review-products">
                {cart.map(({ product, quantity }) => (
                  <div
                    className="checkout-product"
                    key={product.id}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                    />

                    <div>
                      <h3>{product.title}</h3>
                      <small>
                        {product.brand} · Quantity: {quantity}
                      </small>
                    </div>

                    <strong>
                      {formatPrice(product.price * quantity)}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="review-details">
                <div>
                  <span>Delivery address</span>
                  <strong>
                    SRM University Hostel, Ramapuram,
                    Chennai 600089
                  </strong>
                </div>

                <div>
                  <span>Payment method</span>
                  <strong>{payment}</strong>
                </div>
              </div>
            </div>
          )}

          {/* BUTTONS */}
          <div className="checkout-buttons">
            {step > 1 && (
              <button
                className="btn btn-secondary"
                onClick={() => setStep(step - 1)}
              >
                ← Back
              </button>
            )}

            <button
              className="btn btn-primary checkout-next"
              onClick={next}
            >
              {step === 4 ? "Place Order" : "Continue →"}
            </button>
          </div>

        </section>

        {/* SUMMARY */}
        <aside className="checkout-summary">
          <OrderSummary cart={cart} checkout={false} />

          <div className="checkout-trust">
            <ShieldCheck size={18} />
            <div>
              <strong>Safe & Secure</strong>
              <small>Your payment information is protected.</small>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}