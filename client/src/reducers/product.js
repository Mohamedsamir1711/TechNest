import { GET_PRODUCTS, PRODUCT_ERROR, ADD_LIKE, REMOVE_LIKE, DELETE_PRODUCT, ADD_PRODUCT, REMOVE_COMMENT, UPDATE_LIKES, ADD_COMMENT, GET_PRODUCT } from '../actions/types';

const initialState = {
  products: [],
  product: null,
  loading: true,
  error: {}
};

export default function productReducer(state = initialState, action) {
  const { type, payload } = action;
    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
                loading: false
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false
            };
        case PRODUCT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case ADD_LIKE:
        case REMOVE_LIKE:
            return {
                ...state,
                products: state.products.map(product =>
                    product._id === payload.id ? { ...product, likes: payload.likes } : product
                ),
                loading: false
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product._id !== payload),
                loading: false
            };
        case ADD_PRODUCT:
            return {
                ...state,
                products: [payload, ...state.products],
                loading: false
            };
        case ADD_COMMENT:
            return {
                ...state,
                product: { ...state.product, comments: payload },
                loading: false
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                product: {
                    ...state.product,
                    comments: state.product.comments.filter(comment => comment._id !== payload)
                },
                loading: false
            };
        case UPDATE_LIKES:
            return {
                ...state,
                products: state.products.map(product =>
                    product._id === payload.id ? { ...product, likes: payload.likes } : product
                ),
                loading: false
            };
            
        default:
            return state;
    }
}
