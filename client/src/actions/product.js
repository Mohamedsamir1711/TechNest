import { GET_PRODUCTS, PRODUCT_ERROR, ADD_LIKE, REMOVE_LIKE, DELETE_PRODUCT, UPDATE_LIKES, ADD_PRODUCT, ADD_COMMENT, REMOVE_COMMENT, GET_PRODUCT } from "./types";
import axios from "axios";
import { setAlert } from "./alerts";


// Get products
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");
    console.log("Products fetched:", res.data);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  }
    catch (err) {
    console.error("Error fetching products:", err);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response?.statusText || 'Error', status: err.response?.status },
    });
  } 
};

// Add like to a product
export const addLike = id => async (dispatch) => {
  try {
    const res = await axios.put(`/api/products/like/${id}`);
    dispatch({
      type: ADD_LIKE,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response?.statusText || 'Error', status: err.response?.status },
    });
  }
};

// Update like to a product
export const updateLike = id => async (dispatch) => {
  try {
    const res = await axios.put(`/api/products/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response?.statusText || 'Error', status: err.response?.status },
    });
  }
};

// Remove like from a product
export const removeLike = id => async (dispatch) => {
  try {
    const res = await axios.put(`/api/products/unlike/${id}`);
    dispatch({
      type: REMOVE_LIKE,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response?.statusText || 'Error', status: err.response?.status },
    });
  }
};

// Delete a product
export const deleteProduct = id => async (dispatch) => {
  try {
    await axios.delete(`/api/products/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: id
    });
    dispatch(setAlert('Product removed', 'success'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response?.statusText || 'Error', status: err.response?.status },
    });
  }
};

// Add a product
export const addProduct = formData => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/products', formData, config);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data
    });
    dispatch(setAlert('Product created', 'success'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response?.statusText || 'Error', status: err.response?.status },
    });
  }
};

// Add comment to a product
export const addComment = (productId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post(`/api/products/comment/${productId}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert('Comment added', 'success'));
  }
    catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response?.statusText || 'Error', status: err.response?.status },
    });
  }
};

// Delete comment from a product
export const deleteComment = (productId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/comment/${productId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });
    dispatch(setAlert('Comment removed', 'success'));
  }
    catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response?.statusText || 'Error', status: err.response?.status },
    });
  }
};

// Get product
export const getProduct = id => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    console.log("Products fetched:", res.data);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
  }
    catch (err) {
    console.error("Error fetching products:", err);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response?.statusText || 'Error', status: err.response?.status },
    });
  } 
};
