import React from "react";
import { Link, Routes, Route, useParams } from "react-router-dom";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Heart,
  ShieldCheck,
  ChevronRight,
  ShoppingBag,
  Clock3,
} from "lucide-react";
import { orders } from "../data/orders";
import { formatPrice } from "../data/products";

function getAccountOrders() {
  const savedOrders = JSON.parse(
    localStorage.getItem("orders") || "[]"
  );

  if (savedOrders.length === 0) {
    return orders;
  }

  const accountOrders = savedOrders.map((order) => ({
    ...order,
    status: "Order confirmed",
  }));

  return [
    ...accountOrders,
    ...orders.filter(
      (order) =>
        !accountOrders.some(
          (savedOrder) => savedOrder.id === order.id
        )
    ),
  ];
}
export default function Account({
  wishlist = [],
  toggleWishlist,
  addToCart,
}) {
  return (
    <div className="account-page">
      <div className="account-container">

        {/* Account Header */}
        <div className="account-header">
          <div>
            <span className="account-eyebrow">MY ACCOUNT</span>
            <h1>Account & Settings</h1>
            <p>Manage your profile, orders, addresses and preferences.</p>
          </div>

          <div className="account-user-badge">
            <div className="account-avatar">
              <User size={24} />
            </div>
            <div>
              <strong>Welcome back!</strong>
              <span>ShopSphere customer</span>
            </div>
          </div>
        </div>

        <div className="account-layout">

          {/* Sidebar */}
          <aside className="account-sidebar">

            <div className="account-sidebar-title">
              <span>ACCOUNT MENU</span>
            </div>

            <nav className="account-nav">

              <Link to="/account" className="account-nav-link">
                <User size={18} />
                <span>Dashboard</span>
                <ChevronRight size={15} />
              </Link>

              <Link to="/account/orders" className="account-nav-link">
                <Package size={18} />
                <span>My Orders</span>
                <ChevronRight size={15} />
              </Link>

              <Link to="/account/addresses" className="account-nav-link">
                <MapPin size={18} />
                <span>Addresses</span>
                <ChevronRight size={15} />
              </Link>

              <Link to="/account/payment-methods" className="account-nav-link">
                <CreditCard size={18} />
                <span>Payment Methods</span>
                <ChevronRight size={15} />
              </Link>

              <Link to="/account/wishlist" className="account-nav-link">
                <Heart size={18} />
                <span>Wishlist</span>
                <small>{wishlist.length}</small>
                <ChevronRight size={15} />
              </Link>

              <Link to="/account/settings" className="account-nav-link">
                <ShieldCheck size={18} />
                <span>Login & Security</span>
                <ChevronRight size={15} />
              </Link>

            </nav>

            <div className="account-help-box">
              <strong>Need help?</strong>
              <p>Our support team is here to help.</p>
              <Link to="/help">Contact support →</Link>
            </div>

          </aside>

          {/* Content */}
          <section className="account-content">

            <Routes>

              {/* Dashboard */}
              <Route
                index
                element={<Dashboard wishlist={wishlist} />}
              />

              {/* Orders */}
              <Route
                path="orders"
                element={<Orders />}
              />

              {/* Order Details */}
              <Route
                path="orders/:id"
                element={<OrderDetail />}
              />

              <Route
  path="addresses"
  element={<Addresses />}
/>

              {/* Payment Methods */}
<Route
  path="payment-methods"
  element={<PaymentMethods />}
/>

              {/* Wishlist */}
<Route
  path="wishlist"
  element={
    <WishlistPage
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
      addToCart={addToCart}
    />
  }
/>

              {/* Security */}
<Route
  path="settings"
  element={<LoginSecurity />}
/>
            </Routes>

          </section>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ wishlist }) {
  const accountOrders = getAccountOrders();
  const recentOrders = accountOrders.slice(0, 3);

  return (
    <div>

      <div className="account-content-heading">
        <div>
          <span className="account-eyebrow">OVERVIEW</span>
          <h2>Your Dashboard</h2>
          <p>Here's a quick overview of your ShopSphere account.</p>
        </div>
      </div>

      {/* Quick Cards */}
      <div className="account-quick-grid">

        <Link to="/account/orders" className="account-quick-card">
          <div className="quick-card-icon">
            <Package size={22} />
          </div>

          <div>
            <strong>{accountOrders.length}</strong>
            <span>Total Orders</span>
          </div>

          <ChevronRight size={18} />
        </Link>

        <Link to="/account/orders" className="account-quick-card">
          <div className="quick-card-icon">
            <Clock3 size={22} />
          </div>

          <div>
            <strong>Track</strong>
            <span>Recent Orders</span>
          </div>

          <ChevronRight size={18} />
        </Link>

        <Link to="/account/wishlist" className="account-quick-card">
          <div className="quick-card-icon">
            <Heart size={22} />
          </div>

          <div>
            <strong>{wishlist.length}</strong>
            <span>Wishlist Items</span>
          </div>

          <ChevronRight size={18} />
        </Link>

        <Link to="/account/addresses" className="account-quick-card">
          <div className="quick-card-icon">
            <MapPin size={22} />
          </div>

          <div>
            <strong>Manage</strong>
            <span>Delivery Address</span>
          </div>

          <ChevronRight size={18} />
        </Link>

      </div>


      {/* Recent Orders */}
      <div className="account-panel">

        <div className="account-panel-header">
          <div>
            <h3>Recent Orders</h3>
            <p>Your latest ShopSphere purchases.</p>
          </div>

          <Link to="/account/orders">
            View all →
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="recent-orders">

            {recentOrders.map((order) => (
              <Link
                to={`/account/orders/${order.id}`}
                className="recent-order"
                key={order.id}
              >

                <div className="recent-order-icon">
                  <ShoppingBag size={19} />
                </div>

                <div className="recent-order-info">
                  <strong>Order #{order.id}</strong>
                  <span>{order.date}</span>
                </div>

                <span className="order-status">
                  {order.status}
                </span>

                <ChevronRight size={18} />

              </Link>
            ))}

          </div>
        ) : (
          <div className="account-empty">
            <Package size={32} />
            <h3>No orders yet</h3>
            <p>Your orders will appear here after you make a purchase.</p>
            <Link to="/" className="account-action-button">
              Start Shopping
            </Link>
          </div>
        )}

      </div>


      {/* Account Shortcuts */}
      <div className="account-panel">

        <div className="account-panel-header">
          <div>
            <h3>Manage Your Account</h3>
            <p>Quick access to important account settings.</p>
          </div>
        </div>

        <div className="account-shortcuts">

          <Link to="/account/addresses">
            <MapPin size={20} />
            <div>
              <strong>Manage Addresses</strong>
              <span>Add or edit your delivery addresses.</span>
            </div>
            <ChevronRight size={17} />
          </Link>

          <Link to="/account/payment-methods">
            <CreditCard size={20} />
            <div>
              <strong>Payment Methods</strong>
              <span>Manage your saved payment options.</span>
            </div>
            <ChevronRight size={17} />
          </Link>

          <Link to="/account/settings">
            <ShieldCheck size={20} />
            <div>
              <strong>Login & Security</strong>
              <span>Manage your profile and security.</span>
            </div>
            <ChevronRight size={17} />
          </Link>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   ORDERS
========================================================= */

function Orders() {
  const accountOrders = getAccountOrders();

  return (
    <div>

      <div className="account-content-heading">
        <div>
          <span className="account-eyebrow">PURCHASE HISTORY</span>
          <h2>Your Orders</h2>
          <p>Track and manage your recent purchases.</p>
        </div>
      </div>

      {accountOrders.length > 0 ? (
        <div className="orders-list">

          {accountOrders.map((order) => (
            <div className="order-card-new" key={order.id}>

              <div className="order-card-top">
                <div>
                  <span>ORDER NUMBER</span>
                  <strong>#{order.id}</strong>
                </div>

                <div>
                  <span>ORDER DATE</span>
                  <strong>{order.date}</strong>
                </div>

                <span className="order-status">
                  {order.status}
                </span>
              </div>

              <div className="order-card-bottom">

                <div className="order-card-product">
                  <div className="order-product-icon">
                    <Package size={21} />
                  </div>

                  <div>
                    <strong>ShopSphere Order</strong>
                    <span>Your products are included in this order.</span>
                  </div>
                </div>

                <Link
                  to={`/account/orders/${order.id}`}
                  className="order-view-button"
                >
                  View Order
                  <ChevronRight size={16} />
                </Link>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="account-empty large">
          <Package size={40} />
          <h3>No orders found</h3>
          <p>You haven't placed any orders yet.</p>
          <Link to="/" className="account-action-button">
            Start Shopping
          </Link>
        </div>
      )}

    </div>
  );
}


/* =========================================================
   ORDER DETAIL
========================================================= */

function OrderDetail() {
  const { id } = useParams();

  const accountOrders = getAccountOrders();

  const order = accountOrders.find(
    (item) => String(item.id) === String(id)
  );

  if (!order) {
    return (
      <div>
        <div className="account-content-heading">
          <div>
            <span className="account-eyebrow">
              ORDER INFORMATION
            </span>

            <h2>Order Not Found</h2>

            <p>
              We couldn't find the order you're looking for.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const items = order.items || [];

  const total = items.length
    ? items.reduce(
        (sum, item) =>
          sum + item.product.price * item.quantity,
        0
      )
    : order.total || 0;

  return (
    <div>

      <div className="account-content-heading">
        <div>
          <span className="account-eyebrow">
            ORDER INFORMATION
          </span>

          <h2>Order Details</h2>

          <p>
            Track your order and view delivery information.
          </p>
        </div>
      </div>

      <div className="order-detail-card">

        {/* Order Status */}

        <div className="order-detail-header">

          <div>
            <span>ORDER STATUS</span>

            <strong>
              {order.status || "Order confirmed"}
            </strong>
          </div>

          <span className="order-status">
            Confirmed
          </span>

        </div>


        {/* Order Information */}

        <div className="shipping-info">

          <div className="shipping-info-header">
            <Package size={20} />

            <h3>Order Information</h3>
          </div>

          <p>
            <strong>Order ID:</strong>{" "}
            {order.id}
            <br />

            <strong>Order Date:</strong>{" "}
            {order.date || "—"}
            <br />

            <strong>Payment:</strong>{" "}
            {order.payment || "—"}
            <br />

            <strong>Delivery:</strong>{" "}
            {order.delivery || "—"}
          </p>

        </div>


        {/* Products */}

        <div className="shipping-info">

          <div className="shipping-info-header">
            <ShoppingBag size={20} />

            <h3>Items in Your Order</h3>
          </div>

          {items.length > 0 ? (

            items.map(({ product, quantity }) => (

              <div
                key={product.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "15px 0",
                  borderBottom: "1px solid #eee",
                }}
              >

                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain",
                  }}
                />

                <div style={{ flex: 1 }}>

                  <strong>
                    {product.title}
                  </strong>

                  <p>
                    Quantity: {quantity}
                  </p>

                </div>

                <strong>
                  {formatPrice(
                    product.price * quantity
                  )}
                </strong>

              </div>

            ))

          ) : (

            <p>
              No product information available.
            </p>

          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "18px",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >

            <span>
              Order Total
            </span>

            <strong>
              {formatPrice(total)}
            </strong>

          </div>

        </div>


        {/* Tracking */}

        <div className="tracking-section">

          <h3>Order Tracking</h3>

          <div className="tracking">

            {[
              "Ordered",
              "Shipped",
              "Out for delivery",
              "Delivered",
            ].map((status, index) => (

              <div
                className={`track-step ${
                  index === 0 ? "done" : ""
                }`}
                key={status}
              >

                <div className="track-number">
                  {index + 1}
                </div>

                <div>

                  <strong>
                    {status}
                  </strong>

                  <span>
                    {index === 0
                      ? "Your order has been received."
                      : "This step will be updated as your order progresses."}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* Shipping */}

        <div className="shipping-info">

          <div className="shipping-info-header">

            <MapPin size={20} />

            <h3>
              Shipping Address
            </h3>

          </div>

          <p>
            <strong>
              {order.address?.name ||
                "Dipesh Kumar Sah"}
            </strong>

            <br />

            {order.address?.address ||
              "SRM University Hostel, Ramapuram, Chennai, Tamil Nadu 600089"}

            {order.address?.phone && (
              <>
                <br />
                Phone: {order.address.phone}
              </>
            )}

          </p>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   SIMPLE ACCOUNT PAGE
========================================================= */

function SimplePage({ icon, title, description, text }) {
  return (
    <div>

      <div className="account-content-heading">
        <div>
          <span className="account-eyebrow">ACCOUNT</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="simple-account-card">

        <div className="simple-account-icon">
          {icon}
        </div>

        <h3>{title}</h3>

        <p>{text}</p>

        <button
          type="button"
          className="account-action-button secondary"
        >
          Edit
        </button>

      </div>

    </div>
  );
}
function Addresses() {
  return (
    <div className="addresses-page">

      <div className="account-content-heading">
        <div>
          <span className="account-eyebrow">DELIVERY</span>
          <h2>Your Addresses</h2>
          <p>Manage your saved delivery addresses.</p>
        </div>

        <button type="button" className="address-add-button">
          <MapPin size={18} />
          Add New Address
        </button>
      </div>

      <div className="addresses-grid">

        <article className="address-card-new">

          <div className="address-card-header">
            <div className="address-title">
              <div className="address-icon">
                <MapPin size={20} />
              </div>

              <div>
                <strong>Hostel Address</strong>
                <span className="address-default">DEFAULT</span>
              </div>
            </div>

            <button type="button" className="address-menu-button">
              ⋮
            </button>
          </div>

          <div className="address-details">
            <strong>Dipesh Kumar Sah</strong>

            <p>
              SRM Institute of Science and Technology<br />
              Ramapuram, Chennai<br />
              Tamil Nadu - 600089<br />
              India
            </p>

            <span className="address-phone">
              📞 Contact number
            </span>
          </div>

          <div className="address-card-actions">
            <button type="button" className="address-edit-button">
              Edit Address
            </button>

            <button type="button" className="address-remove-button">
              Remove
            </button>
          </div>

        </article>


        <button type="button" className="add-address-card">
          <div className="add-address-icon">
            +
          </div>

          <strong>Add a new address</strong>
          <span>Save another delivery address</span>
        </button>

      </div>

      <div className="address-info-box">
        <MapPin size={20} />

        <div>
          <strong>Delivery address information</strong>
          <p>
            You can add multiple addresses and choose the appropriate
            delivery address during checkout.
          </p>
        </div>
      </div>

    </div>
  );
}
function PaymentMethods() {
  return (
    <div className="payment-methods-page">

      <div className="account-content-heading">
        <div>
          <span className="account-eyebrow">PAYMENTS</span>
          <h2>Payment Methods</h2>
          <p>Manage your saved payment options.</p>
        </div>

        <button type="button" className="payment-add-button">
          <CreditCard size={18} />
          Add Payment Method
        </button>
      </div>

      <div className="payment-methods-grid">

        <article className="payment-card">

          <div className="payment-card-header">
            <div className="payment-icon">
              <CreditCard size={21} />
            </div>

            <div>
              <strong>UPI</strong>
              <span>Fast & secure payments</span>
            </div>

            <span className="payment-default">DEFAULT</span>
          </div>

          <div className="payment-card-body">
            <strong>UPI payment</strong>
            <p>
              Pay securely using your preferred UPI application.
            </p>
          </div>

          <div className="payment-card-actions">
            <button type="button">Edit</button>
            <button type="button">Remove</button>
          </div>

        </article>


        <button type="button" className="add-payment-card">
          <div className="add-payment-icon">
            +
          </div>

          <strong>Add a payment method</strong>

          <span>
            Add UPI, card or another payment option
          </span>
        </button>

      </div>

      <div className="payment-security-box">
        <ShieldCheck size={21} />

        <div>
          <strong>Your payment information is secure</strong>
          <p>
            Your payment details are protected and used only
            for processing your orders.
          </p>
        </div>
      </div>

    </div>
  );
}
function LoginSecurity() {
  return (
    <div className="login-security-page">
      <div className="account-content-heading">
        <div>
          <span className="account-eyebrow">ACCOUNT</span>
          <h2>Login & Security</h2>
          <p>Manage your account information and security settings.</p>
        </div>
      </div>

      {/* Account Information */}
      <section className="security-section">
        <div className="security-section-header">
          <div className="security-section-icon">
            <User size={20} />
          </div>

          <div>
            <h3>Account Information</h3>
            <p>Your basic account information.</p>
          </div>
        </div>

        <div className="security-info-list">
          <div className="security-info-row">
            <div>
              <span className="security-label">Full Name</span>
              <strong>Dipesh Kumar Sah</strong>
            </div>

            <button type="button" className="security-edit-button">
              Edit
            </button>
          </div>

          <div className="security-info-row">
            <div>
              <span className="security-label">Email Address</span>
              <strong>your-email@example.com</strong>
            </div>

            <button type="button" className="security-edit-button">
              Edit
            </button>
          </div>

          <div className="security-info-row">
            <div>
              <span className="security-label">Mobile Number</span>
              <strong>Not added</strong>
            </div>

            <button type="button" className="security-edit-button">
              Add
            </button>
          </div>
        </div>
      </section>

      {/* Password */}
      <section className="security-section">
        <div className="security-section-header">
          <div className="security-section-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h3>Password</h3>
            <p>Keep your account protected with a strong password.</p>
          </div>
        </div>

        <div className="security-action-row">
          <div>
            <strong>Account password</strong>
            <span>Last updated recently</span>
          </div>

          <button type="button" className="security-primary-button">
            Change Password
          </button>
        </div>
      </section>

      {/* Two-Factor Authentication */}
      <section className="security-section">
        <div className="security-section-header">
          <div className="security-section-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h3>Two-Factor Authentication</h3>
            <p>Add an extra layer of security to your account.</p>
          </div>
        </div>

        <div className="security-action-row">
          <div>
            <strong>Two-factor authentication</strong>
            <span>Recommended for better account security</span>
          </div>

          <span className="security-status security-status-off">
            OFF
          </span>
        </div>
      </section>

      {/* Login Activity */}
      <section className="security-section">
        <div className="security-section-header">
          <div className="security-section-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <h3>Login Activity</h3>
            <p>Review recent activity on your account.</p>
          </div>
        </div>

        <div className="login-activity-card">
          <div className="login-activity-dot"></div>

          <div className="login-activity-content">
            <strong>Current session</strong>
            <span>This device · Active now</span>
          </div>

          <span className="login-activity-active">
            Active
          </span>
        </div>
      </section>

      {/* Security Notice */}
      <div className="security-notice">
        <ShieldCheck size={21} />

        <div>
          <strong>Keep your account secure</strong>
          <p>
            Never share your password or verification codes with anyone.
            Use a strong and unique password for your account.
          </p>
        </div>
      </div>
    </div>
  );
}
function WishlistPage({ wishlist, toggleWishlist, addToCart }) {
  return (
    <div className="wishlist-page">
      <div className="account-content-heading">
        <div>
          <span className="account-eyebrow">SAVED ITEMS</span>
          <h2>Your Wishlist</h2>
          <p>
            Save products you love and keep them ready for later.
          </p>
        </div>

        <div className="wishlist-count">
          <Heart size={17} />
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <Heart size={32} />
          </div>

          <h3>Your wishlist is empty</h3>

          <p>
            You haven't saved any products yet. Browse our products
            and add your favorites to your wishlist.
          </p>

          <Link to="/search" className="wishlist-shop-button">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <article className="wishlist-card" key={product.id}>
              <div className="wishlist-image-wrapper">
                <img
  src={product.images?.[0]}
  alt={product.title}
  className="wishlist-image"
/>

                <button
                  type="button"
                  className="wishlist-remove-button"
                  onClick={() => toggleWishlist(product)}
                  aria-label="Remove from wishlist"
                >
                  <Heart size={17} fill="currentColor" />
                </button>
              </div>

              <div className="wishlist-card-content">
                <h3>{product.title}</h3>

                {product.rating && (
                  <div className="wishlist-rating">
                    <span>★</span>
                    {product.rating}
                  </div>
                )}

                <div className="wishlist-price">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </div>

                <div className="wishlist-actions">
                  <button
                    type="button"
                    className="wishlist-cart-button"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    className="wishlist-delete-button"
                    onClick={() => toggleWishlist(product)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}