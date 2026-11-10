import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../../actions/product'
import Spinner from '../layout/Spinner'
import ProductItem from '../products/ProductItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Product = ({ getProduct, product: { product, loading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getProduct(id);
  }, [id, getProduct]);

  return loading || product === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/products' className='btn'>Back To Products</Link>
      <ProductItem product={product} showActions={false} />
      <CommentForm productId={product._id} />
      <div className="comments">
        {product.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} productId={product._id} />
        ))}
      </div>
    </Fragment>
  )
}

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  product: state.product
})

export default connect(mapStateToProps, { getProduct })(Product)
