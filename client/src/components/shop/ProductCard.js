import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { formatPrice, IMG_FALLBACK } from '../../data/catalog';

export const onImgError = (e) => {
  if (!e.currentTarget.src.endsWith('placeholder.svg')) e.currentTarget.src = IMG_FALLBACK;
};

const ProductCard = ({ product, cta = 'Add to Cart' }) => {
  const { addToCart, toggleWishlist, inWishlist } = useShop();
  const navigate = useNavigate();
  const liked = inWishlist(product.id);

  const onCta = (e) => {
    e.preventDefault();
    addToCart(product.id);
    if (cta === 'Buy Now') navigate('/cart');
  };

  return (
    <div className="pcard">
      <button
        type="button"
        className={`pcard-like ${liked ? 'is-liked' : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <i className={liked ? 'fas fa-heart' : 'far fa-heart'}></i>
      </button>
      <Link to={`/product/${product.slug}`} className="pcard-media">
        <img src={product.image} alt={product.name} onError={onImgError} loading="lazy" />
      </Link>
      <Link to={`/product/${product.slug}`} className="pcard-name">
        {product.name}
      </Link>
      <div className="pcard-price">
        {product.oldPrice && <span className="old">{formatPrice(product.oldPrice)}</span>}
        <span>{formatPrice(product.price)}</span>
      </div>
      <button type="button" className="tn-btn tn-btn-dark pcard-cta" onClick={onCta}>
        {cta}
      </button>
    </div>
  );
};

export default ProductCard;

