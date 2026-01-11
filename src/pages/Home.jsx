import React from 'react'
import ComboCard from '../components/ComboCard'

const combos = [
  {
    id: 1,
    name: "Premium Fashion Combo",
    price: 4000,
    tag: "Most Popular",
    description: "Perfect for parties and special occasions. Includes 2 premium ethnic dresses, designer shoes, branded sunglasses, and an elegant watch.",
    items: [
      "2 Stylish Ethnic Dresses",
      "1 Designer Shoes",
      "1 Branded Sunglasses",
      "1 Elegant Watch",
      "Free Delivery",
      "Gift Packaging"
    ],
    dressImages: [
      "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/k/b/c/l-kajukatri-pair-black-deer-original-imahg2hdryc5fvyg.jpeg?q=70",
      "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/d/z/r/l-aasatin-torontocn-original-imahhpdzty7uehey.jpeg?q=70"
    ],
    shoesImage: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/e/h/z/-original-imahg3u6sywzrr6t.jpeg?q=70",
    sunglassesImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    watchImage: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    name: "Deluxe Fashion Combo",
    price: 5000,
    tag: "Best Value",
    description: "Our premium combo with 3 designer ethnic dresses, luxury shoes, high-end sunglasses, and premium watch. Best value for money.",
    items: [
      "3 Stylish Ethnic Dresses",
      "1 Designer Shoes",
      "1 Branded Sunglasses",
      "1 Elegant Watch",
      "Free Delivery + Gift",
      "Priority Shipping"
    ],
    dressImages: [
      "https://m.media-amazon.com/images/I/61hY8Xbn9pL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/61x+uMvPmqL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/514IqNLaysL._AC_UL480_FMwebp_QL65_.jpg"
    ],
    shoesImage: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/e/h/z/-original-imahg3u6sywzrr6t.jpeg?q=70",
    sunglassesImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    watchImage: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    name: "Basic Fashion Combo",
    price: 2200,
    tag: "Budget Friendly",
    description: "Perfect budget combo with 2 stylish dresses, designer shoes, and elegant watch. Great value for everyday wear.",
    items: [
      "2 Stylish Dresses",
      "1 Designer Shoes",
      "1 Elegant Watch",
      "Free Delivery",
      "Basic Packaging"
    ],
    dressImages: [
      "https://m.media-amazon.com/images/I/71RiFU3KvLL._AC_UL480_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/71RrV+Lbq+L._AC_UL480_FMwebp_QL65_.jpg"
    ],
    shoesImage: "https://m.media-amazon.com/images/I/41cSg6D19-L._SY300_SX300_QL70_FMwebp_.jpg",
    sunglassesImage: null,
    watchImage: "https://m.media-amazon.com/images/I/61Bt0wETtbL._AC_UL480_FMwebp_QL65_.jpg"
  }
]

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-slate-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              BABA SHOPPING
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Premium fashion packages with real product photos. Perfect for every occasion.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#combos" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all">
              View Combos
            </a>
            <a href="#why-us" className="px-8 py-3 border border-purple-600 text-purple-400 hover:bg-purple-900/30 rounded-lg font-semibold transition-all">
              Why Choose Us
            </a>
          </div>
        </div>
      </div>

      {/* Combos Section */}
      <div id="combos" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Exclusive Fashion Combos</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our premium curated fashion packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {combos.map((combo) => (
            <div key={combo.id} className="flex justify-center">
              <ComboCard combo={combo} />
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div id="why-us" className="bg-gradient-to-br from-gray-900 to-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose BABA SHOPPING?</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We provide high-quality fashion combos with real product images. Each item is carefully 
              selected and photographed to ensure you know exactly what you're getting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">📸</span>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">Real Product Photos</h3>
              <p className="text-gray-400 text-center">
                See actual product images before buying. No stock photos, only real product photography.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">Premium Quality</h3>
              <p className="text-gray-400 text-center">
                Only top brands and high-quality materials. Each item is carefully selected by fashion experts.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-4">Fast Delivery</h3>
              <p className="text-gray-400 text-center">
                Free delivery across India with priority shipping for premium combos. Track your order in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home