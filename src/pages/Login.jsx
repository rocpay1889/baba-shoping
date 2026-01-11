import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captcha: ''
  })
  const [error, setError] = useState('')
  const [captchaText, setCaptchaText] = useState('')
  const captchaRef = useRef(null)
  const { login } = useAuth()
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (!formData.email || !formData.password || !formData.captcha) {
      setError('Please fill in all fields')
      return
    }

    if (formData.captcha !== captchaText) {
      setError('Invalid CAPTCHA. Please try again.')
      generateCaptcha()
      setFormData(prev => ({ ...prev, captcha: '' }))
      return
    }

    const result = login(formData.email, formData.password)
    if (result.success) {
      navigate('/')
    } else {
      setError('Login failed. Please try again.')
      generateCaptcha()
    }
  }

  const refreshCaptcha = () => {
    generateCaptcha()
    setFormData(prev => ({ ...prev, captcha: '' }))
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">B</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Login to VIP Account</h1>
            <p className="text-gray-400">Enter your credentials to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
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

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Enter your password"
                required
              />
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

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all hover:scale-[1.02] mb-4"
            >
              Sign In
            </button>

            <div className="text-center text-gray-400">
              <span>Don't have an account? </span>
              <Link to="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                Sign up now
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                For demo: Use any valid email and password
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login