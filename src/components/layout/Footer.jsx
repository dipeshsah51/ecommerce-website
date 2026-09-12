import React from "react";

export default function Footer() {
  return (
    <footer>
      <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top ↑</button>
      <div className="footer-grid">
        <div><h3>Get to Know Us</h3><a>About Us</a><a>Careers</a><a>Press Releases</a><a>Investor Relations</a></div>
        <div><h3>Connect</h3><a>Instagram</a><a>Facebook</a><a>LinkedIn</a><a>Twitter / X</a></div>
        <div><h3>Make Money</h3><a>Sell on ShopSphere</a><a>Affiliate Program</a><a>Advertise Products</a><a>Become a Partner</a></div>
        <div><h3>Payment & Help</h3><a>Payment Methods</a><a>Shipping Rates</a><a>Returns</a><a>Help Center</a></div>
      </div>
      <div className="footer-bottom"><b>ShopSphere</b><span>English · India</span><span>© 2026 ShopSphere. All rights reserved.</span></div>
    </footer>
  );
}