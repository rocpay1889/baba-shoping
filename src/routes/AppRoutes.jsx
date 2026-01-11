import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Payment from '../pages/Payment'
import OrderStatus from '../pages/OrderStatus'
import ProtectedRoute from '../components/ProtectedRoute'

function AppRoutes() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-slate-900">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/order-status" element={
            <ProtectedRoute>
              <OrderStatus />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default AppRoutes