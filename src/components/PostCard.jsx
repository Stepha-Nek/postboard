import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'
import toast from 'react-hot-toast'

export default function PostCard({ post, votes, onDeleted, onEdited }) {
  const { user } = useAuth()
  const [voteCount, setVoteCount] = useState(votes)
  const [voted, setVoted] = useState(false)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const handleVote = async () => {
    if (!user) { toast.error('Sign in to vote'); return }
    const dir = voted ? 0 : 1
    try {
      await API.post('/vote/', { post_id: post.id, dir })
      setVoted(!voted)
      setVoteCount(prev => voted ? prev - 1 : prev + 1)
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Vote failed')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return
    try {
      await API.delete(`/posts/${post.id}`)
      toast.success('Post deleted')
      onDeleted(post.id)
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Delete failed')
    }
  }

  const handleUpdate = async () => {
    try {
      await API.put(`/posts/${post.id}`, { title, content, published: post.published })
      toast.success('Post updated')
      setEditing(false)
      onEdited(post.id, { title, content })
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Update failed')
    }
  }

  const isOwner = user && user.id === post.owner_id

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      {editing ? (
        <div className="space-y-3">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
          />
          <div className="flex gap-2">
            <button onClick={handleUpdate}
              className="bg-stone-900 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-stone-700 transition">
              Save
            </button>
            <button onClick={() => setEditing(false)}
              className="border border-stone-300 text-sm px-4 py-1.5 rounded-lg hover:bg-stone-50 transition">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <h2 className="font-semibold text-lg leading-snug">{post.title}</h2>
            {post.published
              ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Published</span>
              : <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">Draft</span>
            }
          </div>

          <p className="text-sm text-stone-500 mb-1">by user_{post.owner_id}</p>
          <p className="text-sm text-stone-700 leading-relaxed mb-4">{post.content}</p>

          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            <button
              onClick={handleVote}
              className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition
                ${voted
                  ? 'border-orange-400 text-orange-500 bg-orange-50'
                  : 'border-stone-200 text-stone-500 hover:border-orange-300'}`}>
              ▲ <span>{voteCount}</span>
            </button>

            {isOwner && (
              <div className="flex gap-2">
                <button onClick={() => setEditing(true)}
                  className="text-xs border border-stone-200 px-3 py-1.5 rounded-lg hover:bg-stone-50 transition">
                  Edit
                </button>
                <button onClick={handleDelete}
                  className="text-xs border border-stone-200 px-3 py-1.5 rounded-lg hover:border-red-300 hover:text-red-500 transition">
                  Delete
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}