import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Signed out')
    navigate('/')
  }

  return (
    <nav className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="font-bold text-xl tracking-tight">
        Post<span className="text-orange-500">board</span>
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm text-stone-400">{user.email}</span>
            <Link to="/create"
              className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2 rounded transition">
              + New Post
            </Link>
            <button onClick={handleLogout}
              className="border border-stone-600 hover:border-stone-400 text-sm px-4 py-2 rounded transition">
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link to="/login"
              className="border border-stone-600 hover:border-stone-400 text-sm px-4 py-2 rounded transition">
              Sign in
            </Link>
            <Link to="/register"
              className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2 rounded transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}