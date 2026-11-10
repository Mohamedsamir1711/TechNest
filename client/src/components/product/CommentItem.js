import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/product'

const CommentItem = ({ comment: { _id, user, name, avatar, date, text }, productId, auth, deleteComment }) => {
  return (
    <Fragment>
      <div className="product bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
            {text}
          </p>
          <p className="product-date">
            Posted on {new Date(date).toLocaleDateString()}
          </p>
          {!auth.loading && user === auth.user._id && (
            <button type="button" className="btn btn-danger" onClick={e => deleteComment(productId, _id)}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  productId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
