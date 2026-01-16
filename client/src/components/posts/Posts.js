import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import {getPosts} from '../../actions/post'

const Posts = ({getPosts, post:{posts, loading}}) => {

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1>Posts</h1>
          <p>Posts content here</p>
        </div>
      )}
    </Fragment>
  )
}

Posts.propTypes = {
getPosts: PropTypes.func.isRequired,
post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ 
    post: state.post
})

export default connect(mapStateToProps, {getPosts})(Posts)

