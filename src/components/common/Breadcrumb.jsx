import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
  return <div className="breadcrumb"><Link to="/">Home</Link>{items.map((item, i) => <React.Fragment key={i}><span>/</span><span>{item}</span></React.Fragment>)}</div>;
}