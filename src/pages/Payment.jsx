import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Payment = () => {
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()
  const [screenshot, setScreenshot] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setScreenshot(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePaymentComplete = async () => {
    setIsProcessing(true)
    
    try {
      // Save payment info
      const paymentData = {
        screenshot: screenshot ? screenshot.name : null,
        timestamp: new Date().toISOString(),
        orderId: `BABA${Date.now().toString().slice(-8)}`
      }
      localStorage.setItem('baba_payment', JSON.stringify(paymentData))
      
      // Clear cart
      clearCart()
      
      // Remove cart and order from localStorage
      localStorage.removeItem('baba_order')
      
      // Force state update
      setTimeout(() => {
        // Navigate to order status
        navigate('/order-status', { 
          replace: true,
          state: { 
            paymentSuccess: true,
            orderId: paymentData.orderId 
          }
        })
      }, 100)
      
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  if (!cart) {
    navigate('/cart', { replace: true })
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Complete Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">UPI Payment</h2>
              
              <div className="text-center">
                <div className="w-64 h-64 mx-auto bg-gray-900 rounded-2xl flex items-center justify-center mb-6 border-2 border-dashed border-gray-700">
                  <div className="text-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded ${
                              i % 2 === 0 ? 'bg-purple-600' : 'bg-pink-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      Scan QR with UPI app
                    </div>
                  </div>
                </div>
                <div className="text-center mb-6">
                  <div className="text-gray-400 mb-2">UPI ID</div>
                  <div className="text-xl font-mono text-white bg-gray-900/50 py-2 px-4 rounded-lg inline-block">
                    babashopping@upi
                  </div>
                </div>

                {/* Screenshot Upload */}
                <div className="mt-6">
                  <label className="block text-gray-300 mb-3">Upload Payment Screenshot</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-2xl p-6 text-center hover:border-purple-600 transition-colors">
                    <input
                      type="file"
                      id="screenshot"
                      accept="image/*"
                      onChange={handleScreenshotUpload}
                      className="hidden"
                    />
                    <label htmlFor="screenshot" className="cursor-pointer">
                      {previewUrl ? (
                        <div className="space-y-4">
                          <div className="w-32 h-32 mx-auto rounded-lg overflow-hidden">
                            <img 
                              src={previewUrl} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-green-400">
                            ✓ Screenshot uploaded
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setScreenshot(null)
                              setPreviewUrl('')
                            }}
                            className="text-sm text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 mx-auto bg-gray-900 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-white font-semibold">Upload Payment Proof</div>
                            <div className="text-gray-400 text-sm mt-1">
                              Upload screenshot after payment
                            </div>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                  <p className="text-gray-500 text-sm mt-3">
                    Upload screenshot of successful payment for faster verification
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 mb-6">
              <h3 className="text-xl font-bold text-white mb-6">Order Details</h3>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300">{cart.name}</span>
                  <span className="text-xl font-bold text-white">₹{cart.price}</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  {cart.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-400 text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Display Selected Sizes */}
                {cart.selectedSize && (
                  <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Selected Sizes</h4>
                    <div className="space-y-1">
                      {cart.selectedSize.dress && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Dress Size:</span>
                          <span className="text-white">{cart.selectedSize.dress}</span>
                        </div>
                      )}
                      {cart.selectedSize.shoes && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Shoes Size:</span>
                          <span className="text-white">{cart.selectedSize.shoes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-700 pt-6">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-bold text-white">Total Amount</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                    ₹{cart.price}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl p-6 border border-purple-800">
              <h4 className="text-lg font-bold text-white mb-4">Secure Payment</h4>
              <p className="text-gray-300 mb-6">
                Your payment is secured with 256-bit SSL encryption. We only accept UPI payments for security.
              </p>
              
              <button
                onClick={handlePaymentComplete}
                disabled={isProcessing}
                className={`w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold text-lg transition-all hover:scale-[1.02] flex items-center justify-center space-x-3 ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Payment</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-gray-500 text-sm">
                  Need help? Email us at{' '}
                  <a href="mailto:babashopping@gmail.com" className="text-purple-400 hover:text-purple-300">
                    babashopping@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment