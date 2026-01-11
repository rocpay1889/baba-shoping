import React, { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)

  const addToCart = (combo) => {
    setCart(combo)
  }

  const removeFromCart = () => {
    setCart(null)
  }

  const clearCart = () => {
    setCart(null)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}