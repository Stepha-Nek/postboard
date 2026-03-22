# Postboard — Frontend

A modern social media web application built with React and Tailwind CSS, where users can create, read, update and delete posts, vote on content, and interact with other users.

🌐 **Live App:** [postboard-sigma.vercel.app](https://postboard-sigma.vercel.app)  
🔗 **Backend Repository:** [github.com/Stepha-Nek/fastapi-crud-app](https://github.com/Stepha-Nek/fastapi-crud-app)

---

## Tech Stack

- **React 18** — UI framework
- **Tailwind CSS** — Styling
- **Vite** — Build tool
- **Axios** — HTTP client
- **React Router** — Client-side navigation
- **React Hot Toast** — Notifications

---

## Features

- Browse all posts without logging in
- Register and login with JWT authentication
- Create, edit and delete your own posts
- Upvote and downvote posts
- Search posts by title
- Protected routes — only authenticated users can create posts
- Fully connected to a live REST API backend

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/Stepha-Nek/postboard.git
cd postboard

# Install dependencies
npm install

# Create a .env file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root folder:
```
VITE_API_URL=https://web-production-99e01.up.railway.app
```

### Run Locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

---

## Deployment

This frontend is deployed on **Vercel**. Every push to the `main` branch triggers an automatic redeployment.

---

## Project Structure
```
src/
├── api/
│   └── axios.js          # Axios instance with auth interceptor
├── components/
│   ├── Navbar.jsx         # Navigation bar
│   ├── PostCard.jsx       # Individual post card with vote and edit
│   └── ProtectedRoute.jsx # Route guard for authenticated users
├── context/
│   └── AuthContext.jsx    # Global auth state management
├── pages/
│   ├── Feed.jsx           # Home page with all posts
│   ├── Login.jsx          # Login page
│   ├── Register.jsx       # Registration page
│   └── CreatePost.jsx     # Create new post page
├── App.jsx                # Route definitions
└── main.jsx               # App entry point
```

---

## Author

**Nneka Oguh**  
[GitHub](https://github.com/Stepha-Nek) · [LinkedIn](https://linkedin.com/in/nneka-oguh)

---

## Related

- 🔗 [Postboard Backend — FastAPI REST API](https://github.com/Stepha-Nek/fastapi-crud-app)
