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

    // ✅ Save token (basic)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data))

    navigate('/')
  } catch (err) {
    setError('Server error. Please try again later.')
    generateCaptcha()
  }
}
