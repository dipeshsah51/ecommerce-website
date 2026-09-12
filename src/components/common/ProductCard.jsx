import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { formatPrice } from "../../data/products";

export default function ProductCard({ product, addToCart }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrap">
        <img src={product.images[0]} alt={product.title} loading="lazy" />
      </Link>
      {product.badge && <span className="badge">{product.badge}</span>}
      <div className="product-card-body">
        <small className="brand">{product.brand}</small>
        <Link to={`/product/${product.id}`} className="product-title">{product.title}</Link>
        <div className="rating"><span>{product.rating}</span> <Star size={14} fill="currentColor"/> <small>({product.reviews.toLocaleString()})</small></div>
        <div className="price">{formatPrice(product.price)} <del>{formatPrice(product.originalPrice)}</del> <em>{discount}% off</em></div>
        {product.fastDelivery && <small className="delivery">✓ Fast delivery available</small>}
        <button className="btn btn-primary full" onClick={() => addToCart(product)}><ShoppingCart size={16}/> Add to Cart</button>
      </div>
    </article>
  );
}