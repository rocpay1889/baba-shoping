import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const OrderStatus = () => {
  const [order, setOrder] = useState(null)
  const [showTracking, setShowTracking] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Check if coming from payment completion
    const storedOrder = localStorage.getItem('baba_order')
    const storedPayment = localStorage.getItem('baba_payment')
    
    if (storedOrder) {
      const orderData = JSON.parse(storedOrder)
      const paymentData = storedPayment ? JSON.parse(storedPayment) : {}
      
      // Generate order ID if not present
      if (!orderData.orderId) {
        orderData.orderId = `BABA${Date.now().toString().slice(-8)}`
      }
      
      // Add payment info
      orderData.payment = paymentData
      orderData.orderDate = new Date().toISOString()
      
      setOrder(orderData)
    }
    
    // If state passed from payment page
    if (location.state?.paymentSuccess) {
      setShowTracking(true)
    }
  }, [location.state])

  const handleTrackOrder = () => {
    setShowTracking(true)
  }

  const getTrackingStatus = () => {
    if (!order) return {}
    
    const orderDate = new Date(order.orderDate || order.date || new Date())
    const now = new Date()
    const hoursDiff = Math.abs(now - orderDate) / 36e5
    
    if (hoursDiff < 2) {
      return {
        status: "Order Confirmed",
        description: "Your order has been confirmed and is being processed.",
        color: "text-blue-400",
        bgColor: "bg-blue-900/30",
        borderColor: "border-blue-800",
        progress: 25,
        estimatedDelivery: "Within 5-7 days"
      }
    } else if (hoursDiff < 24) {
      return {
        status: "Processing",
        description: "Your order is being prepared for shipment.",
        color: "text-yellow-400",
        bgColor: "bg-yellow-900/30",
        borderColor: "border-yellow-800",
        progress: 50,
        estimatedDelivery: "Within 4-6 days"
      }
    } else if (hoursDiff < 48) {
      return {
        status: "Shipped",
        description: "Your order has been shipped and is on the way.",
        color: "text-purple-400",
        bgColor: "bg-purple-900/30",
        borderColor: "border-purple-800",
        progress: 75,
        estimatedDelivery: "Within 2-4 days"
      }
    } else {
      return {
        status: "Out for Delivery",
        description: "Your order is out for delivery today.",
        color: "text-green-400",
        bgColor: "bg-green-900/30",
        borderColor: "border-green-800",
        progress: 90,
        estimatedDelivery: "Today or Tomorrow"
      }
    }
  }

  const getOrderSteps = () => {
    return [
      { 
        step: 1, 
        name: "Order Placed", 
        icon: "📦",
        completed: true 
      },
      { 
        step: 2, 
        name: "Confirmed", 
        icon: "✅",
        completed: true 
      },
      { 
        step: 3, 
        name: "Processing", 
        icon: "⚙️",
        completed: order ? getTrackingStatus().progress >= 50 : false 
      },
      { 
        step: 4, 
        name: "Shipped", 
        icon: "🚚",
        completed: order ? getTrackingStatus().progress >= 75 : false 
      },
      { 
        step: 5, 
        name: "Delivered", 
        icon: "🏠",
        completed: order ? getTrackingStatus().progress >= 90 : false 
      }
    ]
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">No Order Found</h1>
          <p className="text-gray-400 mb-8">
            You don't have any recent orders. Place an order to track its status.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-lg font-semibold transition-all"
          >
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  const tracking = getTrackingStatus()
  const orderSteps = getOrderSteps()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Order Confirmation Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-5xl">🎉</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Order <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Confirmed!</span>
          </h1>
          <p className="text-xl text-gray-400">Thank you for your purchase</p>
        </div>

        {/* Order Summary */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 mb-8">
          <div className="text-center mb-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Order ID: {order.orderId}
            </div>
            <div className="text-gray-400 mt-2">
              {new Date(order.orderDate || order.date).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Order Details</h3>
            <div className="bg-gray-900/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-white font-semibold text-lg">{order.combo?.name}</div>
                  <div className="text-gray-400 text-sm mt-2">
                    {order.combo?.items?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">₹{order.combo?.price}</div>
              </div>
              
              {/* Display Selected Sizes */}
              {order.combo?.selectedSize && (
                <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Selected Sizes</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {order.combo.selectedSize.dress && (
                      <div>
                        <span className="text-gray-400">Dress Size:</span>
                        <span className="text-white ml-2 font-semibold">{order.combo.selectedSize.dress}</span>
                      </div>
                    )}
                    {order.combo.selectedSize.shoes && (
                      <div>
                        <span className="text-gray-400">Shoes Size:</span>
                        <span className="text-white ml-2 font-semibold">{order.combo.selectedSize.shoes}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Delivery Information</h3>
            <div className="bg-gray-900/50 rounded-xl p-6">
              <div className="space-y-3">
                <div>
                  <div className="text-gray-400 text-sm">Delivering to</div>
                  <div className="text-white">{order.name}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Address</div>
                  <div className="text-white">{order.address}, {order.city}, {order.state} - {order.pincode}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Contact</div>
                  <div className="text-white">{order.phone} • {order.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Track Order Section */}
          {showTracking ? (
            <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-xl p-6 border border-red-800">
              <h3 className="text-xl font-bold text-white mb-4">Order Tracking</h3>
              
              {/* Status Badge */}
              <div className={`p-4 rounded-lg mb-6 ${tracking.bgColor} border ${tracking.borderColor}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className={`font-semibold ${tracking.color}`}>{tracking.status}</span>
                </div>
                <p className="text-gray-300 mt-3">{tracking.description}</p>
                <div className="mt-4">
                  <div className="text-gray-400 text-sm mb-2">Estimated Delivery: {tracking.estimatedDelivery}</div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${tracking.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Order Placed</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>

              {/* Order Steps */}
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-4">Order Journey</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {orderSteps.map((step) => (
                    <div key={step.step} className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-xl ${
                        step.completed 
                          ? 'bg-gradient-to-br from-red-600 to-orange-600 text-white' 
                          : 'bg-gray-800 text-gray-500'
                      }`}>
                        {step.icon}
                      </div>
                      <div className={`text-sm ${
                        step.completed ? 'text-white' : 'text-gray-500'
                      }`}>
                        {step.name}
                      </div>
                      {step.completed && (
                        <div className="text-green-400 text-xs mt-1">✓</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tracking Updates */}
              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">Tracking Updates</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-white font-semibold">Order Confirmed</div>
                      <div className="text-gray-400 text-sm">Order #{order.orderId} has been confirmed</div>
                      <div className="text-gray-500 text-xs">Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-white font-semibold">Payment Received</div>
                      <div className="text-gray-400 text-sm">Payment of ₹{order.combo?.price} received successfully</div>
                      <div className="text-gray-500 text-xs">Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={handleTrackOrder}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-lg font-semibold text-lg transition-all hover:scale-[1.02] inline-flex items-center space-x-3"
              >
                <span>Track Your Order</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <p className="text-gray-500 text-sm mt-3">
                Click to track your order status and delivery updates
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/"
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-lg font-semibold transition-all hover:scale-[1.02] text-center"
          >
            Continue Shopping
          </Link>
          {!showTracking && (
            <button
              onClick={handleTrackOrder}
              className="px-8 py-3 border border-red-600 text-red-400 hover:bg-red-900/30 rounded-lg font-semibold transition-all text-center"
            >
              Track Order
            </button>
          )}
          <button
            onClick={() => window.print()}
            className="px-8 py-3 border border-gray-600 text-gray-400 hover:bg-gray-800/30 rounded-lg font-semibold transition-all text-center"
          >
            Print Invoice
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Need help with your order? Email us at{' '}
            <a href="mailto:babashopping@gmail.com" className="text-red-400 hover:text-red-300">
              babashopping@gmail.com
            </a>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            We'll send tracking updates to {order.email} and {order.phone}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderStatus