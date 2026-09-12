import React from "react";
import { formatPrice } from "../../data/products";
import { Link } from "react-router-dom";

export default function OrderSummary({ cart, checkout = true }) {
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;
  return <aside className="summary card"><h2>Order Summary</h2><div><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div><div><span>Shipping</span><b>{shipping ? formatPrice(shipping) : "FREE"}</b></div><div><span>Estimated tax</span><b>{formatPrice(tax)}</b></div><hr/><div className="total"><span>Total</span><b>{formatPrice(total)}</b></div>{checkout && <Link to="/checkout" className="btn btn-primary full">Proceed to Checkout</Link>}<small className="secure">🔒 Secure checkout · Your payment information is protected</small></aside>;
}