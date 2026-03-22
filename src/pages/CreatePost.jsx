import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'
import toast from 'react-hot-toast'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post('/posts/', { title, content, published })
      toast.success('Post published!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">New post</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-xl p-6 space-y-4 shadow-sm">
        <div>
          <label className="block text-sm text-stone-500 mb-1">Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
            placeholder="Give your post a title…"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-stone-500 mb-1">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            className="w-full border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500"
            placeholder="Write something…"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
            className="accent-orange-500"
          />
          <label htmlFor="published" className="text-sm text-stone-500">
            Publish immediately
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-stone-900 hover:bg-stone-700 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-50">
          {loading ? 'Publishing…' : 'Publish post'}
        </button>
      </form>
    </div>
  )
}