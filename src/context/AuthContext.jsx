import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('baba_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const userData = { 
      id: Date.now(), 
      email, 
      name: email.split('@')[0],
      token: Math.random().toString(36).substring(7)
    }
    setUser(userData)
    localStorage.setItem('baba_user', JSON.stringify(userData))
    return { success: true }
  }

  const signup = (email, password, name) => {
    const userData = { 
      id: Date.now(), 
      email, 
      name,
      token: Math.random().toString(36).substring(7)
    }
    setUser(userData)
    localStorage.setItem('baba_user', JSON.stringify(userData))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('baba_user')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}