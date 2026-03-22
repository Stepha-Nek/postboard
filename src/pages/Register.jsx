import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'
import toast from 'react-hot-toast'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/users/', { email, password })
      toast.success('Account created! Please sign in.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-stone-200 rounded-xl p-8 w-full max-w-md shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Create account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-stone-500 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-stone-500 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
              placeholder="Min 8 characters"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 hover:bg-stone-700 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50">
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-stone-500 mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}