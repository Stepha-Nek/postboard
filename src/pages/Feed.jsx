import { useEffect, useState } from 'react'
import API from '../api/axios'
import PostCard from '../components/PostCard'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [timer, setTimer] = useState(null)

  const loadPosts = async (q = '') => {
    setLoading(true)
    try {
      const { data } = await API.get('/posts/', { params: { limit: 50, skip: 0, search: q } })
      setPosts(data)
    } catch {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadPosts() }, [])

  const handleSearch = (val) => {
    setSearch(val)
    clearTimeout(timer)
    setTimer(setTimeout(() => loadPosts(val), 400))
  }

  const handleDeleted = (id) => setPosts(prev => prev.filter(p => (p.Post || p).id !== id))

  const handleEdited = (id, updates) => {
    setPosts(prev => prev.map(item => {
      const post = item.Post || item
      if (post.id !== id) return item
      return item.Post ? { ...item, Post: { ...post, ...updates } } : { ...post, ...updates }
    }))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <input
        type="text"
        value={search}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Search posts…"
        className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-sm mb-6 focus:outline-none focus:border-orange-500"
      />

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white border border-stone-200 rounded-xl p-5 animate-pulse">
              <div className="h-4 bg-stone-200 rounded w-2/3 mb-3"></div>
              <div className="h-3 bg-stone-100 rounded w-full mb-2"></div>
              <div className="h-3 bg-stone-100 rounded w-4/5"></div>
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center text-stone-400 py-16">
          <p className="text-3xl font-bold text-stone-200 mb-2">No posts yet</p>
          <p>Be the first to share something.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((item) => {
            const post = item.Post || item
            const votes = item.votes ?? 0
            return (
              <PostCard
                key={post.id}
                post={post}
                votes={votes}
                onDeleted={handleDeleted}
                onEdited={handleEdited}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}