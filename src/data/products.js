export const categories = [
  { id: "electronics", name: "Electronics", icon: "💻" },
  { id: "fashion", name: "Fashion", icon: "👕" },
  { id: "home", name: "Home & Kitchen", icon: "🏠" },
  { id: "beauty", name: "Beauty", icon: "✨" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "books", name: "Books", icon: "📚" },
];

export const products = [
  {
    id: "p1",
    title: "Pro Wireless Noise Cancelling Headphones",
    brand: "SoundMax",
    category: "electronics",
    price: 4999,
    originalPrice: 7999,
    rating: 4.6,
    reviews: 1248,
    stock: 14,
    badge: "Bestseller",
    fastDelivery: true,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900"
    ],
    description: "Premium over-ear headphones with active noise cancellation, rich bass and up to 40 hours of battery life.",
    specs: { "Battery": "40 hours", "Connectivity": "Bluetooth 5.3", "Warranty": "1 year" }
  },
  {
    id: "p2",
    title: "Ultra HD 4K Smart TV 55 inch",
    brand: "VisionPro",
    category: "electronics",
    price: 42999,
    originalPrice: 59999,
    rating: 4.5,
    reviews: 842,
    stock: 8,
    badge: "Deal",
    fastDelivery: true,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=900",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=900"
    ],
    description: "Cinematic 4K display, smart streaming apps, voice control and immersive audio.",
    specs: { "Display": "55-inch 4K", "OS": "Smart TV OS", "Warranty": "2 years" }
  },
  {
    id: "p3",
    title: "Everyday Cotton Premium T-Shirt",
    brand: "UrbanWear",
    category: "fashion",
    price: 699,
    originalPrice: 1199,
    rating: 4.3,
    reviews: 532,
    stock: 35,
    badge: "Popular",
    fastDelivery: true,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900"
    ],
    description: "Soft, breathable cotton T-shirt designed for everyday comfort.",
    specs: { "Material": "100% Cotton", "Fit": "Regular", "Sizes": "S, M, L, XL" }
  },
  {
    id: "p4",
    title: "Ergonomic Office Chair",
    brand: "WorkNest",
    category: "home",
    price: 8999,
    originalPrice: 12999,
    rating: 4.4,
    reviews: 319,
    stock: 11,
    badge: "Deal",
    fastDelivery: false,
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=900",
      "https://images.unsplash.com/photo-1505843490701-5be5d6a6d0a8?w=900"
    ],
    description: "Adjustable ergonomic chair with lumbar support and breathable mesh back.",
    specs: { "Back": "Breathable mesh", "Armrests": "Adjustable", "Warranty": "3 years" }
  },
  {
    id: "p5",
    title: "Running Shoes for Men",
    brand: "SprintX",
    category: "sports",
    price: 2499,
    originalPrice: 3999,
    rating: 4.2,
    reviews: 721,
    stock: 22,
    badge: "Bestseller",
    fastDelivery: true,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=900"
    ],
    description: "Lightweight running shoes with responsive cushioning for daily training.",
    specs: { "Upper": "Mesh", "Sole": "EVA", "Sizes": "7-12" }
  },
  {
    id: "p6",
    title: "The Complete JavaScript Guide",
    brand: "TechBooks",
    category: "books",
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 2105,
    stock: 50,
    badge: "Top Rated",
    fastDelivery: true,
    images: [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=900",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900"
    ],
    description: "A practical guide to modern JavaScript, from fundamentals to advanced applications.",
    specs: { "Pages": "720", "Edition": "3rd", "Language": "English" }
  }
];

export const getProduct = (id) => products.find((p) => p.id === id);
export const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;
