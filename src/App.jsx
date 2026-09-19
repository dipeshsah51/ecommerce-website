import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import Seller from "./pages/Seller";
import Deals from "./pages/Deals";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import { products } from "./data/products";

export default function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist") || "[]"));
  const [toast, setToast] = useState("");

  const saveCart = (next) => {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const addToCart = (product, quantity = 1) => {
    const existing = cart.find((item) => item.product.id === product.id);
    const next = existing
      ? cart.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      : [...cart, { product, quantity }];
    saveCart(next);
    setToast(`${product.title} added to cart`);
    setTimeout(() => setToast(""), 2200);
  };

  const updateQty = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    saveCart(cart.map((item) => item.product.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id) => saveCart(cart.filter((item) => item.product.id !== id));

  const toggleWishlist = (product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    const next = exists ? wishlist.filter((p) => p.id !== product.id) : [...wishlist, product];
    setWishlist(next);
    localStorage.setItem("wishlist", JSON.stringify(next));
    setToast(exists ? "Removed from wishlist" : "Added to wishlist");
    setTimeout(() => setToast(""), 1800);
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <main className="main-content">
        <Routes>
          <Route
  path="/"
  element={
    <Home
      addToCart={addToCart}
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
    />
  }
/>
          <Route
  path="/search"
  element={
    <Search
      addToCart={addToCart}
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
    />
  }
/>
          <Route
  path="/category/:categoryId"
  element={
    <Search
      addToCart={addToCart}
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
    />
  }
/>
          <Route path="/product/:productId" element={<ProductDetail addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
          <Route
  path="/cart"
  element={
    <Cart
  cart={cart}
  updateQty={updateQty}
  removeFromCart={removeFromCart}
  wishlist={wishlist}
  toggleWishlist={toggleWishlist}
  addToCart={addToCart}
/>
  }
/>
          <Route
  path="/checkout"
  element={
    <Checkout
      cart={cart}
      onOrderPlaced={() => saveCart([])}
    />
  }
/>
          <Route path="/checkout/confirmation" element={<Confirmation />} />
          <Route
  path="/account/*"
  element={
    <Account
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
      addToCart={addToCart}
    />
  }
/>
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/register" element={<Auth mode="register" />} />
          <Route path="/forgot-password" element={<Auth mode="forgot" />} />
          <Route path="/seller/:sellerId" element={<Seller products={products} addToCart={addToCart} />} />
          <Route path="/deals" element={<Deals products={products} addToCart={addToCart} />} />
<Route path="/help" element={<Help />} />
<Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}