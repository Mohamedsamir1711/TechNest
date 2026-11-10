import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { products } from '../../data/catalog';
import ProductCard from './ProductCard';

const Wishlist = () => {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="tn-container page-pad">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link><i className="fas fa-chevron-right"></i><span>Wishlist</span>
      </nav>
      <h1 className="page-title">Wishlist <small>({items.length})</small></h1>
      {items.length ? (
        <div className="product-grid cols-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="empty-state">
          <i className="far fa-heart"></i>
          <h3>Your wishlist is empty</h3>
          <p>Tap the heart on any product to save it for later.</p>
          <Link to="/catalog" className="tn-btn tn-btn-dark">Browse products</Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;

