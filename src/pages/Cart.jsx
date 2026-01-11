import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Cart = () => {
  const { cart, removeFromCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  // Check if cart is null or empty
  if (!cart) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">
            {window.location.pathname === '/order-status' 
              ? 'Your order has been placed successfully!' 
              : 'Add amazing fashion combos to get started'}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all"
          >
            Browse Combos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Your Shopping Cart</h1>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{cart.name}</h2>
              <div className="space-y-2">
                {cart.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              
              {/* Display Selected Sizes if available */}
              {cart.selectedSize && (
                <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Selected Sizes</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {cart.selectedSize.dress && (
                      <div>
                        <span className="text-gray-400">Dress Size:</span>
                        <span className="text-white ml-2 font-semibold">{cart.selectedSize.dress}</span>
                      </div>
                    )}
                    {cart.selectedSize.shoes && (
                      <div>
                        <span className="text-gray-400">Shoes Size:</span>
                        <span className="text-white ml-2 font-semibold">{cart.selectedSize.shoes}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                ₹{cart.price}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-gray-700">
            <button
              onClick={removeFromCart}
              className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-semibold transition-all"
            >
              Remove Item
            </button>
            <div className="text-right">
              <div className="text-gray-400 mb-2">Total Amount</div>
              <div className="text-3xl font-bold text-white">₹{cart.price}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link
            to="/"
            className="px-6 py-3 border border-purple-600 text-purple-400 hover:bg-purple-900/30 rounded-lg font-semibold transition-all mb-4 md:mb-0"
          >
            Continue Shopping
          </Link>
          <button
            onClick={handleCheckout}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all hover:scale-[1.02]"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart