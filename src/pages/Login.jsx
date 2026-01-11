import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captcha: ''
  })
  const [error, setError] = useState('')
  const [captchaText, setCaptchaText] = useState('')
  const captchaRef = useRef(null)
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

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // 🔐 LOGIN API CONNECTED
  const handleSubmit = async (e) => {
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

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Login failed')
        generateCaptcha()
        return
      }

      // save login data
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))

      navigate('/')
    } catch (err) {
      setError('Server error. Please try again later.')
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
            <h1 className="text-3xl font-bold text-white mb-2">
              Login to VIP Account
            </h1>
            <p className="text-gray-400">
              Enter your credentials to continue
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-300 mb-2">
                Enter CAPTCHA *
              </label>
              <div className="flex items-center space-x-4 mb-3">
                <div
                  ref={captchaRef}
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-center font-mono text-xl font-bold tracking-wider text-white select-none"
                >
                  {captchaText}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="px-4 py-3 bg-gray-700 text-white rounded-lg"
                >
                  ↻
                </button>
              </div>
              <input
                type="text"
                name="captcha"
                value={formData.captcha}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="Type the CAPTCHA above"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold mb-4"
            >
              Sign In
            </button>

            <div className="text-center text-gray-400">
              <span>Don't have an account? </span>
              <Link to="/signup" className="text-purple-400">
                Sign up now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
