export const categories = [
  { name: "Pizza", emoji: "🍕", count: "240+ places", color: "#FFF0EC", accent: "#FF6B35" },
  { name: "Burger", emoji: "🍔", count: "180+ places", color: "#FFF4E0", accent: "#FF9500" },
  { name: "Biryani", emoji: "🍛", count: "320+ places", color: "#F0FFF4", accent: "#00B341" },
  { name: "Chinese", emoji: "🥡", count: "150+ places", color: "#F0F4FF", accent: "#4361EE" },
  { name: "Desserts", emoji: "🍰", count: "210+ places", color: "#FFF0F6", accent: "#E23744" },
  { name: "South Indian", emoji: "🫕", count: "190+ places", color: "#FFFBF0", accent: "#F4A22D" },
];

export const restaurants = [
  {
    id: 1,
    name: "The Spice Garden",
    cuisine: "North Indian • Mughlai",
    rating: 4.8,
    deliveryTime: "25-35 min",
    offer: "50% off up to ₹120",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    priceForTwo: "₹600 for two",
    promoted: true,
  },
  {
    id: 2,
    name: "Bella Italia",
    cuisine: "Italian • Pizza • Pasta",
    rating: 4.6,
    deliveryTime: "30-40 min",
    offer: "Free delivery",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    priceForTwo: "₹800 for two",
    promoted: false,
  },
  {
    id: 3,
    name: "Wok Express",
    cuisine: "Chinese • Pan Asian",
    rating: 4.5,
    deliveryTime: "20-30 min",
    offer: "20% off",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80",
    priceForTwo: "₹450 for two",
    promoted: false,
  },
  {
    id: 4,
    name: "Burger Republic",
    cuisine: "American • Burgers",
    rating: 4.7,
    deliveryTime: "15-25 min",
    offer: "Buy 1 Get 1",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    priceForTwo: "₹500 for two",
    promoted: true,
  },
  {
    id: 5,
    name: "Biryani Blues",
    cuisine: "Biryani • Mughlai • Kebabs",
    rating: 4.9,
    deliveryTime: "35-45 min",
    offer: "30% off orders above ₹299",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80",
    priceForTwo: "₹700 for two",
    promoted: false,
  },
  {
    id: 6,
    name: "Sweet Cravings",
    cuisine: "Desserts • Ice Cream • Bakery",
    rating: 4.4,
    deliveryTime: "20-30 min",
    offer: "Flat ₹50 off",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80",
    priceForTwo: "₹350 for two",
    promoted: false,
  },
];

export const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    avatar: "PS",
    rating: 5,
    text: "SevenBites completely changed how I order food. The delivery is always on time, and the food quality is consistently excellent. Highly recommend!",
    color: "#E23744",
  },
  {
    name: "Arjun Mehta",
    location: "Bangalore",
    avatar: "AM",
    rating: 5,
    text: "The app is so intuitive and the variety of restaurants is incredible. I've discovered so many hidden gems in my city thanks to SevenBites.",
    color: "#FF6B6B",
  },
  {
    name: "Sneha Reddy",
    location: "Hyderabad",
    avatar: "SR",
    rating: 5,
    text: "Live order tracking is a game changer! I love knowing exactly where my food is. Plus the deals and offers save me so much money every week.",
    color: "#4361EE",
  },
];

export const faqs = [
  {
    question: "How long does delivery typically take?",
    answer: "Delivery times vary by restaurant and your location. Most orders arrive within 25-45 minutes. You can see the estimated delivery time on each restaurant's page and track your order in real-time.",
  },
  {
    question: "What areas does SevenBites serve?",
    answer: "SevenBites currently operates in 50+ cities across India, including Mumbai, Delhi, Bangalore, Hyderabad, Pune, Chennai, and more. We're expanding rapidly to new cities every month.",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is placed, you'll receive real-time updates at every step — from the restaurant accepting your order, to preparation, to the delivery partner picking it up and heading to your location.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major payment methods including UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery. All online payments are secured with 256-bit encryption.",
  },
  {
    question: "Can I schedule a delivery in advance?",
    answer: "Yes! You can schedule orders up to 2 days in advance. Just select your preferred date and time during checkout and we'll make sure your food arrives fresh and hot at the scheduled time.",
  },
  {
    question: "What if my order arrives late or incorrect?",
    answer: "Your satisfaction is our priority. If your order arrives late or something is wrong, please contact our 24/7 support team. We'll resolve the issue immediately and offer appropriate compensation.",
  },
];

export const stats = [
  { value: "10,000+", label: "Restaurant Partners", icon: "🏪" },
  { value: "500K+", label: "Orders Delivered", icon: "📦" },
  { value: "50+", label: "Cities Served", icon: "🌆" },
  { value: "4.8★", label: "Average Rating", icon: "⭐" },
];

export const howItWorks = [
  {
    step: "01",
    title: "Search Food",
    desc: "Tell us what you're craving or search by restaurant name, cuisine, or dish.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Choose Restaurant",
    desc: "Browse menus, compare ratings, check delivery times and pick your favourite.",
    icon: "🏪",
  },
  {
    step: "03",
    title: "Place Your Order",
    desc: "Customise your order, apply offers, and checkout securely in seconds.",
    icon: "🛒",
  },
  {
    step: "04",
    title: "Enjoy Your Meal",
    desc: "Sit back and track your order live as it makes its way to your door.",
    icon: "😋",
  },
];
