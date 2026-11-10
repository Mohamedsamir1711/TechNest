import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../data/catalog';
import { onImgError } from './ProductCard';

const Cart = () => {
  const { cartItems, cartTotal, updateQty, removeFromCart } = useShop();
  const shipping = cartTotal > 99 || cartTotal === 0 ? 0 : 15;
  const tax = Math.round(cartTotal * 0.05);

  return (
    <div className="tn-container page-pad">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link><i className="fas fa-chevron-right"></i><span>Shopping Cart</span>
      </nav>
      <h1 className="page-title">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-shopping-cart"></i>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/catalog" className="tn-btn tn-btn-dark">Start shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map(({ id, qty, product }) => (
              <div key={id} className="cart-item">
                <Link to={`/product/${product.slug}`} className="cart-img">
                  <img src={product.image} alt={product.name} onError={onImgError} />
                </Link>
                <div className="cart-info">
                  <Link to={`/product/${product.slug}`}>{product.name}</Link>
                  <small>#{product.id.padStart(6, '0')}</small>
                </div>
                <div className="qty">
                  <button type="button" onClick={() => updateQty(id, qty - 1)} aria-label="Decrease"><i className="fas fa-minus"></i></button>
                  <span>{qty}</span>
                  <button type="button" onClick={() => updateQty(id, qty + 1)} aria-label="Increase"><i className="fas fa-plus"></i></button>
                </div>
                <strong className="cart-price">{formatPrice(product.price * qty)}</strong>
                <button type="button" className="icon-btn" onClick={() => removeFromCart(id)} aria-label="Remove"><i className="fas fa-times"></i></button>
              </div>
            ))}
          </div>
          <aside className="summary">
            <h3>Order Summary</h3>
            <div className="sum-row"><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div>
            <div className="sum-row"><span>Estimated Tax</span><strong>{formatPrice(tax)}</strong></div>
            <div className="sum-row"><span>Shipping</span><strong>{shipping ? formatPrice(shipping) : 'Free'}</strong></div>
            <div className="sum-row total"><span>Total</span><strong>{formatPrice(cartTotal + tax + shipping)}</strong></div>
            <button type="button" className="tn-btn tn-btn-dark tn-btn-block tn-btn-lg">Checkout</button>
            <Link to="/catalog" className="tn-btn tn-btn-outline tn-btn-block">Continue shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;

