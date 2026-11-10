import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <p className="muted" style={{ margin: '8px 0 24px' }}>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="tn-btn tn-btn-dark">Back to Home</Link>
    </div>
  )
}

export default NotFound
