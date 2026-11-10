import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addProduct } from '../../actions/product'

const ProductForm = ({ addProduct }) => {
  const [text, setText] = useState('');

  const onChange = e => setText(e.target.value);

  return (
    <div className="product-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={e => {
        e.preventDefault();
        addProduct({ text });
        setText('');
      }}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a product"
          value={text}
          onChange={e => onChange(e)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  )
}

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
}

export default connect(null, { addProduct })(ProductForm)
