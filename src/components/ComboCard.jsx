import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const ComboCard = ({ combo }) => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToCart, cart } = useCart()
  const [showDetails, setShowDetails] = useState(false)
  const [showSizeModal, setShowSizeModal] = useState(false)
  const [selectedSize, setSelectedSize] = useState({
    dress: 'M',
    shoes: '7'
  })

  const dressSizes = ['S', 'M', 'L', 'XL']
  const shoesSizes = ['4', '5', '6', '7', '8', '9']

  const handleAddToCart = () => {
    const comboWithSize = {
      ...combo,
      selectedSize: selectedSize
    }
    addToCart(comboWithSize)
  }

  const handleBuyNowClick = () => {
    if (!user) {
      navigate('/login')
      return
    }
    setShowSizeModal(true)
  }

  const confirmBuyNow = () => {
    const comboWithSize = {
      ...combo,
      selectedSize: selectedSize
    }
    addToCart(comboWithSize)
    setShowSizeModal(false)
    navigate('/checkout')
  }

  const handleViewDetails = () => {
    setShowDetails(true)
  }

  const handleSizeChange = (type, size) => {
    setSelectedSize(prev => ({
      ...prev,
      [type]: size
    }))
  }

  return (
    <>
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 hover:-translate-y-1 w-full">
        {/* Tag and Price */}
        <div className="flex items-center justify-between mb-6">
          <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-pink-900 rounded-full text-sm font-semibold text-purple-200">
            {combo.tag}
          </span>
          <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            ₹{combo.price}
          </span>
        </div>

        {/* Combo Name */}
        <h3 className="text-2xl font-bold text-white mb-6">{combo.name}</h3>
        
        {/* Features List */}
        <div className="space-y-3 mb-8">
          {combo.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
              <span className="text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          {/* Top Row - Add to Cart and View Details */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-semibold transition-all hover:scale-[1.02]"
            >
              Add to Cart
            </button>
            <button
              onClick={handleViewDetails}
              className="flex-1 py-3 border border-purple-600 text-purple-400 hover:bg-purple-900/30 rounded-lg font-semibold transition-all hover:scale-[1.02]"
            >
              View Details
            </button>
          </div>

          {/* Bottom Row - Buy Now (Full Width) */}
          <button
            onClick={handleBuyNowClick}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all hover:scale-[1.02]"
          >
            Buy Now
          </button>
        </div>

        {/* Added to Cart Indicator */}
        {cart && cart.id === combo.id && (
          <div className="mt-4 p-2 bg-green-900/30 border border-green-800 rounded-lg text-center">
            <span className="text-green-400 text-sm">✓ Added to cart</span>
          </div>
        )}
      </div>

      {/* Size Selection Modal (for Buy Now) */}
      {showSizeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-md w-full border border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Select Sizes for {combo.name}</h2>
                <button
                  onClick={() => setShowSizeModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Dress Size Selection */}
                <div>
                  <label className="block text-white font-semibold mb-3">Select Dress Size</label>
                  <div className="grid grid-cols-4 gap-2">
                    {dressSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange('dress', size)}
                        className={`py-3 rounded-lg transition-all ${
                          selectedSize.dress === size
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shoes Size Selection */}
                <div>
                  <label className="block text-white font-semibold mb-3">Select Shoes Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {shoesSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange('shoes', size)}
                        className={`py-3 rounded-lg transition-all ${
                          selectedSize.shoes === size
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Sizes Summary */}
                <div className="bg-gray-900/50 rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-2">Selected Sizes:</h3>
                  <div className="flex justify-between">
                    <div>
                      <span className="text-gray-400">Dress: </span>
                      <span className="text-white font-semibold">{selectedSize.dress}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Shoes: </span>
                      <span className="text-white font-semibold">{selectedSize.shoes}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowSizeModal(false)}
                    className="flex-1 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmBuyNow}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Combo Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">{combo.name} - Detailed View</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-pink-900 rounded-full text-lg font-semibold text-purple-200">
                    {combo.tag}
                  </span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                    ₹{combo.price}
                  </span>
                </div>
                <p className="text-gray-300 text-lg">
                  {combo.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Dress Images */}
                {combo.dressImages && combo.dressImages.map((image, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={image} 
                        alt={`Dress ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-semibold mb-2">
                        {combo.id === 1 ? `Stylish Dress ${index + 1}` : 
                         combo.id === 2 ? `Designer Dress ${index + 1}` : 
                         `Casual Dress ${index + 1}`}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Premium quality fabric with elegant design
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Shoes Image */}
                <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={combo.shoesImage} 
                      alt="Designer Shoes"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-2">Designer Shoes</h4>
                    <p className="text-gray-400 text-sm">
                      Comfortable and stylish footwear
                    </p>
                  </div>
                </div>

                {/* Sunglasses Image (if available) */}
                {combo.sunglassesImage && (
                  <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={combo.sunglassesImage} 
                        alt="Branded Sunglasses"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-semibold mb-2">Branded Sunglasses</h4>
                      <p className="text-gray-400 text-sm">
                        UV protected with premium frame
                      </p>
                    </div>
                  </div>
                )}

                {/* Watch Image */}
                <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={combo.watchImage} 
                      alt="Elegant Watch"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-2">Elegant Watch</h4>
                    <p className="text-gray-400 text-sm">
                      Premium watch with leather strap
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Combo Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {combo.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => {
                    handleAddToCart()
                    setShowDetails(false)
                  }}
                  className="flex-1 py-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg font-semibold text-lg transition-all hover:scale-[1.02]"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    setShowDetails(false)
                    setShowSizeModal(true)
                  }}
                  className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold text-lg transition-all hover:scale-[1.02]"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ComboCard