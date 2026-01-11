import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const cartItemsCount = cart ? 1 : 0 // Since we store only one combo

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-lg border-b border-red-900 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo Section WITH IMAGE */}
            <Link to="/" className="flex items-center space-x-3" onClick={closeMobileMenu}>
              {/* Logo Image */}
              <img
                src="/WhatsApp Image 2026-01-04 at 10.10.26 PM.jpeg"
                alt="BABA SHOPPING Logo"
                className="h-10 w-10 lg:h-12 lg:w-12 object-cover rounded-lg border-2 border-red-600"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23dc2626'/%3E%3Ctext x='50' y='50' font-size='40' text-anchor='middle' dy='.3em' fill='white' font-family='Arial'%3EB%3C/text%3E%3C/svg%3E"
                }}
              />
              <div>
                <span className="text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  BABA SHOPPING
                </span>
                <p className="text-xs italic text-red-400 font-semibold -mt-1 hidden lg:block">
                  DANGER DEALS, DEADLY SAVINGS
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors font-medium">
                Home
              </Link>
              <Link to="/#combos" className="text-gray-300 hover:text-white transition-colors font-medium">
                Products
              </Link>
              <Link to="/cart" className="text-gray-300 hover:text-white transition-colors font-medium flex items-center">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <>
                  <Link to="/order-status" className="text-gray-300 hover:text-white transition-colors font-medium">
                    My Orders
                  </Link>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white text-sm font-semibold">Hi, {user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-gray-800 hover:bg-red-800 text-white rounded-lg text-sm transition-all"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 border border-red-600 text-red-400 hover:bg-red-900/30 rounded-lg transition-all text-sm font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 lg:hidden">
              <Link to="/cart" className="relative">
                <div className="p-2 rounded-lg bg-gray-900/60">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </Link>
              
              <button
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg bg-gray-900/60"
              >
                {mobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-gray-900/95 border-t border-gray-800 mb-4 rounded-b-lg">
              <div className="py-4 px-4">
                <div className="flex flex-col space-y-4">
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white transition-colors py-2 font-medium text-center"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                  <Link
                    to="/#combos"
                    className="text-gray-300 hover:text-white transition-colors py-2 font-medium text-center"
                    onClick={closeMobileMenu}
                  >
                    Products
                  </Link>
                  <Link
                    to="/cart"
                    className="text-gray-300 hover:text-white transition-colors py-2 font-medium text-center flex items-center justify-center"
                    onClick={closeMobileMenu}
                  >
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                  
                  {user ? (
                    <>
                      <Link
                        to="/order-status"
                        className="text-gray-300 hover:text-white transition-colors py-2 font-medium text-center"
                        onClick={closeMobileMenu}
                      >
                        My Orders
                      </Link>
                      <div className="pt-4 border-t border-gray-800">
                        <div className="flex flex-col items-center space-y-3 mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-white text-sm font-semibold">{user.name}</span>
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full py-2 bg-gray-800 hover:bg-red-800 text-white rounded-lg transition-all font-medium"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="pt-4 border-t border-gray-800 space-y-3">
                      <Link
                        to="/login"
                        className="block w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all text-center font-medium"
                        onClick={closeMobileMenu}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block w-full py-3 border border-red-600 text-red-400 hover:bg-red-900/30 rounded-lg transition-all text-center font-medium"
                        onClick={closeMobileMenu}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar