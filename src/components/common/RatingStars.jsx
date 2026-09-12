import React from "react";
import { Star } from "lucide-react";

export default function RatingStars({ value = 5 }) {
  return <span className="stars">{[1,2,3,4,5].map(n => <Star key={n} size={16} fill={n <= Math.round(value) ? "currentColor" : "none"} />)}</span>;
}