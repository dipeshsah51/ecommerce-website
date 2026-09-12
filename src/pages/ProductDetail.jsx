import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Zap, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import Breadcrumb from "../components/common/Breadcrumb";
import RatingStars from "../components/common/RatingStars";
import Carousel from "../components/common/Carousel";
import { getProduct, products, formatPrice } from "../data/products";

export default function ProductDetail({ addToCart, wishlist, toggleWishlist }) {
  const { productId } = useParams();
  const product = getProduct(productId);
  const [image, setImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  if (!product) return <div className="container empty"><h1>Product not found</h1><Link to="/search">Continue shopping</Link></div>;
  const discount = Math.round((1-product.price/product.originalPrice)*100);
  const wished = wishlist.some(p=>p.id===product.id);
  return <div className="container"><Breadcrumb items={[product.brand, product.title]}/><div className="product-main">
    <section className="gallery"><div className="thumbs">{product.images.map((img,i)=><button className={image===i?"active":""} key={img} onClick={()=>setImage(i)}><img src={img} alt="thumbnail"/></button>)}</div><div className="main-image"><img src={product.images[image]} alt={product.title}/></div></section>
    <section className="info"><small className="brand">{product.brand}</small><h1>{product.title}</h1><div className="rating"><b>{product.rating}</b> <RatingStars value={product.rating}/> <a>{product.reviews.toLocaleString()} ratings</a></div><hr/><div className="price big">{formatPrice(product.price)} <del>{formatPrice(product.originalPrice)}</del> <em>{discount}% off</em></div><p className="tax">Inclusive of applicable taxes</p><div className="offers"><b>Available offers</b><p>🏷️ Bank offer: Save extra 10% with selected cards</p><p>💳 No-cost EMI available on eligible orders</p></div><h3>Delivery</h3><div className="pincode"><input placeholder="Enter pincode"/><button>Check</button></div><p className="delivery">✓ FREE delivery on eligible orders</p><p className={product.stock<10?"stock low":"stock"}>{product.stock<10?"Only "+product.stock+" left in stock":"In stock"}</p></section>
    <aside className="buybox card"><div className="price">{formatPrice(product.price)}</div><p>FREE delivery available</p><div className="quantity"><span>Quantity:</span><button onClick={()=>setQty(Math.max(1,qty-1))}><Minus size={15}/></button><b>{qty}</b><button onClick={()=>setQty(qty+1)}><Plus size={15}/></button></div><button className="btn btn-yellow full" onClick={()=>addToCart(product,qty)}><ShoppingCart/> Add to Cart</button><button className="btn btn-primary full" onClick={()=>{addToCart(product,qty); location.href="/checkout"}}><Zap/> Buy Now</button><button className={`wishlist ${wished?"selected":""}`} onClick={()=>toggleWishlist(product)}><Heart fill={wished?"currentColor":"none"}/> {wished?"Saved to Wishlist":"Add to Wishlist"}</button><div className="seller"><b>Sold by ShopSphere Sellers</b><p>Secure transaction · 7-day return policy</p><span><ShieldCheck/> Secure payments</span><span><Truck/> Reliable delivery</span></div></aside>
  </div><div className="details-tabs"><div className="tabs">{["description","specifications","box"].map(t=><button className={tab===t?"active":""} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div><div className="tab-content">{tab==="description"&&<p>{product.description}</p>}{tab==="specifications"&&<table><tbody>{Object.entries(product.specs).map(([k,v])=><tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody></table>}{tab==="box"&&<ul><li>1 × {product.title}</li><li>Documentation and accessories</li><li>Warranty information</li></ul>}</div></div><Reviews product={product}/><Carousel title="Similar products" products={products.filter(p=>p.id!==product.id).slice(0,4)} addToCart={addToCart}/></div>;
}

function Reviews({product}) {
 return <section className="reviews section"><h2>Customer reviews</h2><div className="review-overview"><div className="review-score"><b>{product.rating}</b><RatingStars value={product.rating}/><small>{product.reviews.toLocaleString()} ratings</small></div><div className="bars">{[5,4,3,2,1].map(n=><div key={n}><span>{n} star</span><i><b style={{width:`${n===5?72:n===4?18:5}%`}}/></i><small>{n===5?72:n===4?18:5}%</small></div>)}</div></div><div className="review card"><RatingStars value={5}/><h4>Great product and excellent value</h4><p>Verified Purchase · The quality is very good and delivery was quick. The product matches the description.</p><small>Helpful · 42</small></div><div className="review card"><RatingStars value={4}/><h4>Worth the price</h4><p>Good build quality and easy to use. I would recommend it.</p><small>Helpful · 18</small></div></section>;
}