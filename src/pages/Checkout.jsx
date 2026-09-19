import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MapPin,
  Truck,
  CreditCard,
  ClipboardCheck,
  ShieldCheck,
  Check,
  Lock,
  ChevronRight,
} from "lucide-react";

import OrderSummary from "../components/cart/OrderSummary";
import { formatPrice } from "../data/products";

export default function Checkout({ cart, onOrderPlaced }) {
  const location = useLocation();

  const checkoutCart =
    location.state?.buyNow || cart;
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("UPI");
  const [delivery, setDelivery] = useState("Standard Delivery");

  const navigate = useNavigate();

  if (!checkoutCart.length) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <div className="empty-checkout">
            <div className="empty-checkout-icon">
              <ClipboardCheck size={40} />
            </div>

            <span className="checkout-label">
              SECURE CHECKOUT
            </span>

            <h1>No items to checkout</h1>

            <p>
              Your cart is empty. Add some products before
              continuing to checkout.
            </p>

            <Link
              to="/cart"
              className="checkout-primary-button"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const steps = [
    {
      name: "Address",
      icon: MapPin,
    },
    {
      name: "Delivery",
      icon: Truck,
    },
    {
      name: "Payment",
      icon: CreditCard,
    },
    {
      name: "Review",
      icon: ClipboardCheck,
    },
  ];

  const nextStep = () => {
  if (step < 4) {
    setStep(step + 1);
  } else {
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: checkoutCart,
      payment,
      delivery,
      address: {
        name: "Dipesh Kumar Sah",
        address: "SRM University Hostel, Ramapuram, Chennai, Tamil Nadu 600089",
        phone: "+91 XXXXX XXXXX",
      },
    };

    const existingOrders = JSON.parse(
  localStorage.getItem("orders") || "[]"
);

localStorage.setItem(
  "orders",
  JSON.stringify([order, ...existingOrders])
);

localStorage.setItem("lastOrder", JSON.stringify(order));
    if (onOrderPlaced) {
  onOrderPlaced();
}

    navigate("/checkout/confirmation", {
      state: {
        order,
      },
    });
  }
};

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <main className="checkout-page">

      <div className="checkout-container">

        {/* ================= HEADER ================= */}

        <header className="checkout-header">

          <div>
            <span className="checkout-label">
              SECURE CHECKOUT
            </span>

            <h1>Complete your order</h1>

            <p>
              Review your information and place your order
              securely.
            </p>
          </div>

          <div className="checkout-security">
            <Lock size={16} />
            <span>Secure checkout</span>
          </div>

        </header>

        {/* ================= PROGRESS ================= */}

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
                  <div className="checkout-step-icon">

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
                    className={`checkout-step-line ${
                      step > number ? "active" : ""
                    }`}
                  />
                )}

              </React.Fragment>
            );
          })}

        </div>

        {/* ================= CHECKOUT LAYOUT ================= */}

        <div className="checkout-layout">

          <section className="checkout-main">

            {/* ================= ADDRESS ================= */}

            {step === 1 && (
              <section className="checkout-card">

                <div className="checkout-card-header">

                  <div className="checkout-title-icon">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <h2>Delivery Address</h2>
                    <p>
                      Where should we deliver your order?
                    </p>
                  </div>

                </div>

                <label className="address-card selected">

                  <input
                    type="radio"
                    name="address"
                    defaultChecked
                  />

                  <div className="address-radio" />

                  <div className="address-content">

                    <div className="address-top">
                      <strong>Dipesh Kumar Sah</strong>

                      <span>HOME</span>
                    </div>

                    <p>
                      SRM University Hostel, Ramapuram,
                      Chennai, Tamil Nadu 600089
                    </p>

                    <small>
                      Phone: +91 XXXXX XXXXX
                    </small>

                  </div>

                </label>

                <button
                  type="button"
                  className="add-address-button"
                >
                  + Add a new address
                </button>

              </section>
            )}

            {/* ================= DELIVERY ================= */}

            {step === 2 && (
              <section className="checkout-card">

                <div className="checkout-card-header">

                  <div className="checkout-title-icon">
                    <Truck size={19} />
                  </div>

                  <div>
                    <h2>Delivery Options</h2>
                    <p>
                      Choose how you'd like to receive your order.
                    </p>
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
                  ].map((option) => (

                    <label
                      key={option.title}
                      className={`delivery-option ${
                        delivery === option.title
                          ? "selected"
                          : ""
                      }`}
                    >

                      <input
                        type="radio"
                        name="delivery"
                        checked={
                          delivery === option.title
                        }
                        onChange={() =>
                          setDelivery(option.title)
                        }
                      />

                      <span className="delivery-radio" />

                      <span className="delivery-option-icon">
                        {option.icon}
                      </span>

                      <span className="delivery-option-info">

                        <strong>
                          {option.title}
                        </strong>

                        <small>
                          {option.description}
                        </small>

                      </span>

                      <b>{option.price}</b>

                    </label>

                  ))}

                </div>

              </section>
            )}

            {/* ================= PAYMENT ================= */}

            {step === 3 && (
              <section className="checkout-card">

                <div className="checkout-card-header">

                  <div className="checkout-title-icon">
                    <CreditCard size={19} />
                  </div>

                  <div>
                    <h2>Payment Method</h2>
                    <p>
                      Select your preferred payment method.
                    </p>
                  </div>

                </div>

                <div className="payment-options">

                  {[
                    ["UPI", "📱"],
                    ["Credit / Debit Card", "💳"],
                    ["Net Banking", "🏦"],
                    ["Cash on Delivery", "💵"],
                  ].map(([method, icon]) => (

                    <label
                      key={method}
                      className={`payment-option ${
                        payment === method
                          ? "selected"
                          : ""
                      }`}
                    >

                      <input
                        type="radio"
                        name="payment"
                        checked={payment === method}
                        onChange={() =>
                          setPayment(method)
                        }
                      />

                      <span className="payment-radio" />

                      <span className="payment-icon">
                        {icon}
                      </span>

                      <strong>{method}</strong>

                    </label>

                  ))}

                </div>

                {/* UPI */}

                {payment === "UPI" && (
                  <div className="payment-form">

                    <label>
                      UPI ID

                      <input
                        type="text"
                        placeholder="name@bank"
                      />
                    </label>

                    <small>
                      Example: yourname@oksbi
                    </small>

                  </div>
                )}

                {/* Card */}

                {payment === "Credit / Debit Card" && (
                  <div className="payment-form">

                    <label>
                      Card Number

                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                      />
                    </label>

                    <div className="payment-form-row">

                      <label>
                        Expiry Date

                        <input
                          type="text"
                          placeholder="MM/YY"
                        />
                      </label>

                      <label>
                        CVV

                        <input
                          type="password"
                          placeholder="•••"
                        />
                      </label>

                    </div>

                    <small>
                      🔒 Your payment information is secure.
                    </small>

                  </div>
                )}

                {/* COD */}

                {payment === "Cash on Delivery" && (
                  <div className="cod-message">

                    <div>
                      <strong>
                        Cash on Delivery selected
                      </strong>

                      <p>
                        Pay when your order is delivered
                        to your address.
                      </p>
                    </div>

                  </div>
                )}

                {/* Net Banking */}

                {payment === "Net Banking" && (
                  <div className="netbanking-message">

                    <strong>
                      Net Banking
                    </strong>

                    <p>
                      You will be able to select your bank
                      during the payment process.
                    </p>

                  </div>
                )}

              </section>
            )}

            {/* ================= REVIEW ================= */}

            {step === 4 && (
              <section className="checkout-card">

                <div className="checkout-card-header">

                  <div className="checkout-title-icon">
                    <ClipboardCheck size={19} />
                  </div>

                  <div>
                    <h2>Review Your Order</h2>
                    <p>
                      Check everything before placing your order.
                    </p>
                  </div>

                </div>

                {/* Products */}

                <div className="review-products">

                  {checkoutCart.map(({ product, quantity }) => (

                    <div
                      className="checkout-product"
                      key={product.id}
                    >

                      <div className="checkout-product-image">
                        <img
                          src={product.images?.[0]}
                          alt={product.title}
                        />
                      </div>

                      <div className="checkout-product-info">

                        <small>
                          {product.brand}
                        </small>

                        <h3>
                          {product.title}
                        </h3>

                        <span>
                          Quantity: {quantity}
                        </span>

                      </div>

                      <strong>
                        {formatPrice(
                          product.price * quantity
                        )}
                      </strong>

                    </div>

                  ))}

                </div>

                {/* Review Information */}

                <div className="review-information">

                  <div className="review-information-box">

                    <MapPin size={17} />

                    <div>
                      <span>Delivery Address</span>

                      <strong>
                        SRM University Hostel,
                        Ramapuram, Chennai 600089
                      </strong>
                    </div>

                  </div>

                  <div className="review-information-box">

                    <CreditCard size={17} />

                    <div>
                      <span>Payment Method</span>

                      <strong>{payment}</strong>
                    </div>

                  </div>

                  <div className="review-information-box">

                    <Truck size={17} />

                    <div>
                      <span>Delivery Method</span>

                      <strong>{delivery}</strong>
                    </div>

                  </div>

                </div>

              </section>
            )}

            {/* ================= NAVIGATION ================= */}

            <div className="checkout-navigation">

              {step > 1 ? (
                <button
                  type="button"
                  className="checkout-back-button"
                  onClick={previousStep}
                >
                  ← Back
                </button>
              ) : (
                <Link
                  to="/cart"
                  className="checkout-back-button"
                >
                  ← Return to Cart
                </Link>
              )}

              <button
                type="button"
                className="checkout-next-button"
                onClick={nextStep}
              >
                {step === 4
                  ? "Place Order"
                  : "Continue"}

                <ChevronRight size={17} />
              </button>

            </div>

          </section>

          {/* ================= SUMMARY ================= */}

          <aside className="checkout-summary">

            <div className="checkout-summary-sticky">

              <OrderSummary
  cart={checkoutCart}
  checkout={false}
/>

              <div className="checkout-trust">

                <ShieldCheck size={19} />

                <div>
                  <strong>Safe & Secure</strong>

                  <small>
                    Your payment information is protected.
                  </small>
                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>
    </main>
  );
}