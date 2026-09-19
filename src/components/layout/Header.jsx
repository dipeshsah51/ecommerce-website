import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  MapPin,
  X,
  Heart,
  Package,
} from "lucide-react";
import { categories } from "../../data/products";

export default function Header({ cartCount }) {
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setMenu(false);
    }
  };

  return (
    <header className="site-header">

      {/* Main Header */}
      <div className="topbar">

        {/* Logo */}
        <Link to="/" className="logo">
          Shop<span>Sphere</span>
        </Link>

        {/* Delivery Location */}
        <button className="location" type="button">
          <MapPin size={18} />

          <span>
            Deliver to
            <strong>Chennai 600089</strong>
          </span>
        </button>

        {/* Search */}
        <form className="searchbar" onSubmit={submit}>
          <select
            aria-label="Search category"
            defaultValue="All"
            onChange={(e) => {
              if (e.target.value !== "All") {
                navigate(`/category/${e.target.value}`);
                setMenu(false);
              }
            }}
          >
            <option value="All">All</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands and more..."
          />

          <button type="submit" aria-label="Search">
            <Search size={21} />
          </button>
        </form>

        {/* Account */}
        <Link className="nav-link account-link" to="/account">
          <User size={19} />

          <span>
            Hello, Sign in
            <strong>Account & Lists</strong>
          </span>
        </Link>

        {/* Orders */}
        <Link className="nav-link orders-link" to="/account/orders">
          <Package size={19} />

          <span>
            Returns
            <strong>& Orders</strong>
          </span>
        </Link>

        {/* Wishlist */}
        <Link className="nav-link wishlist-link" to="/account/wishlist">
          <Heart size={20} />

          <span>
            My
            <strong>Wishlist</strong>
          </span>
        </Link>

        {/* Cart */}
        <Link className="cart-link" to="/cart">
          <div className="cart-icon-wrapper">
            <ShoppingCart size={27} />

            {cartCount > 0 && (
              <b className="cart-badge">{cartCount}</b>
            )}
          </div>

          <strong>Cart</strong>
        </Link>

        {/* Mobile Menu */}
        <button
          className="mobile-menu"
          type="button"
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Secondary Navigation */}
      <nav className={`subnav ${menu ? "open" : ""}`}>

        <button
          className="all-btn"
          type="button"
          onClick={() => setMenu(!menu)}
        >
          <Menu size={19} />
          <span>All</span>
        </button>

        {categories.slice(0, 7).map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            onClick={() => setMenu(false)}
          >
            {category.name}
          </Link>
        ))}

        <Link to="/deals" onClick={() => setMenu(false)}>
          Today's Deals
        </Link>

        <Link to="/help" onClick={() => setMenu(false)}>
          Customer Service
        </Link>

        <Link to="/seller/demo" onClick={() => setMenu(false)}>
          Sell
        </Link>
      </nav>

    </header>
  );
}