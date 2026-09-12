import React from "react";
import ProductCard from "./ProductCard";

export default function Carousel({ title, products, addToCart }) {
  return <section className="section"><div className="section-heading"><h2>{title}</h2><a>See all</a></div><div className="product-row">{products.map(p => <ProductCard key={p.id} product={p} addToCart={addToCart}/>)}</div></section>;
}