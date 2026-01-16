import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, auth: { isAuthenticated, loading } }) => {
    if (loading) return null;
    return !isAuthenticated && !loading ? <Navigate to="/login" /> : children;
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.node
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute)
