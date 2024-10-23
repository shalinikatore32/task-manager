import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/pagenotfound.css';

function PageNotFound() {
  return (
    <div className="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <Link to="/dashboard">Go to Home</Link>
  </div>
  )
}

export default PageNotFound
