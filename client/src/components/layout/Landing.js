import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import {connect} from  'react-redux'
import PropTypes from 'prop-types'

const Landing = ({isAauthenticated}) => {
  if(isAauthenticated){
    return <Navigate to ="/dashboard" />
  }

  return (
     <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">E Commerce store</h1>
          <p className="lead">
            Tech products from various brands at one place
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAauthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAauthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
