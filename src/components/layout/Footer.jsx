import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">

      {/* Newsletter */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-content">
          <span className="footer-eyebrow">
            STAY IN THE LOOP
          </span>

          <h2>Get the latest deals in your inbox.</h2>

          <p>
            Subscribe for exclusive offers, new products and
            shopping updates.
          </p>
        </div>

        <form
          className="newsletter-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
          />

          <button type="submit">
            Subscribe
          </button>
        </form>
      </div>


      {/* Main Footer */}
      <div className="footer-main">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Shop<span>Sphere</span>
          </Link>

          <p>
            Your trusted online marketplace for everyday
            products, great deals and a simple shopping
            experience.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              <Facebook size={17} />
            </a>

            <a href="#" aria-label="Instagram">
              <Instagram size={17} />
            </a>

            <a href="#" aria-label="Twitter">
              <Twitter size={17} />
            </a>

            <a href="#" aria-label="YouTube">
              <Youtube size={17} />
            </a>
          </div>
        </div>


        {/* Shop */}
        <div className="footer-column">
          <h3>Shop</h3>

          <Link to="/search">All Products</Link>
          <Link to="/deals">Today's Deals</Link>
          <Link to="/category/electronics">
            Electronics
          </Link>
          <Link to="/category/fashion">
            Fashion
          </Link>
          <Link to="/category/home-kitchen">
            Home & Kitchen
          </Link>
        </div>


        {/* Help */}
        <div className="footer-column">
          <h3>Help</h3>

          <Link to="/account">Your Account</Link>
          <Link to="/orders">Your Orders</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/contact">Contact Us</Link>
        </div>


        {/* Information */}
        <div className="footer-column">
          <h3>Information</h3>

          <Link to="/about">About ShopSphere</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/returns">Returns & Refunds</Link>
          <Link to="/shipping">Shipping Information</Link>
        </div>


        {/* Contact */}
        <div className="footer-column footer-contact">
          <h3>Contact</h3>

          <div>
            <MapPin size={16} />
            <span>Chennai, India</span>
          </div>

          <div>
            <Mail size={16} />
            <span>support@shopsphere.com</span>
          </div>

          <div>
            <Phone size={16} />
            <span>24/7 Customer Support</span>
          </div>
        </div>

      </div>


      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ShopSphere.
          All rights reserved.
        </p>

        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/returns">Returns</Link>
        </div>
      </div>

    </footer>
  );
}