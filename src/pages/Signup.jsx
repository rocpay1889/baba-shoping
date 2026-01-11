import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    captcha: ''
  })
  const [error, setError] = useState('')
  const [captchaText, setCaptchaText] = useState('')
  const captchaRef = useRef(null)
  const { signup } = useAuth()
  const navigate = useNavigate()

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let captcha = ''
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(captcha)
    return captcha
  }

  React.useEffect(() => {
    generateCaptcha()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    // Check all required fields
    if (!formData.firstName || !formData.lastName || !formData.phone || 
        !formData.email || !formData.password || !formData.confirmPassword || 
        !formData.captcha) {
      return 'Please fill in all fields'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address'
    }

    // Phone validation (Indian phone number)
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      return 'Please enter a valid 10-digit Indian phone number'
    }

    // Password validation
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long'
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match'
    }

    // CAPTCHA validation
    if (formData.captcha !== captchaText) {
      return 'Invalid CAPTCHA. Please try again.'
    }

    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      if (validationError.includes('CAPTCHA')) {
        generateCaptcha()
        setFormData(prev => ({ ...prev, captcha: '' }))
      }
      return
    }

    const fullName = `${formData.firstName} ${formData.lastName}`
    const result = signup(formData.email, formData.password, fullName)
    
    if (result.success) {
      navigate('/')
    } else {
      setError('Signup failed. Please try again.')
      generateCaptcha()
    }
  }

  const refreshCaptcha = () => {
    generateCaptcha()
    setFormData(prev => ({ ...prev, captcha: '' }))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">B</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create VIP Account</h1>
            <p className="text-gray-400">Join BABA SHOPPING premium experience</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="9876543210"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-300 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Create password"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-300 mb-2">Enter CAPTCHA *</label>
              <div className="flex items-center space-x-4 mb-3">
                <div 
                  ref={captchaRef}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-lg text-center font-mono text-xl font-bold tracking-wider text-white select-none"
                  style={{ 
                    letterSpacing: '5px',
                    background: 'linear-gradient(45deg, #1a1a2e 25%, #16213e 25%, #16213e 50%, #1a1a2e 50%, #1a1a2e 75%, #16213e 75%, #16213e)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  {captchaText}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                name="captcha"
                value={formData.captcha}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Type the CAPTCHA above"
                required
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 text-purple-600 bg-gray-900 border-gray-700 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-gray-300 text-sm">
                  I agree to the Terms & Conditions and Privacy Policy
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all hover:scale-[1.02] mb-4"
            >
              Create VIP Account
            </button>

            <div className="text-center text-gray-400">
              <span>Already have an account? </span>
              <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign in
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                For demo: All fields are required with valid data
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup