import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { useShop } from '../../context/ShopContext';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const { cartCount, wishlist } = useShop();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userRef = useRef(null);

  // close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setUserOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onDoc = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/catalog${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  };

  const onLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="promo-bar">
        <div className="tn-container promo-inner">
          <p className="promo-big">Up to <span>50% OFF</span></p>
          <div className="promo-text">
            <strong>Big Tech Sale</strong>
            <small>Limited time offers on your favorite devices</small>
          </div>
          <Link to="/catalog" className="tn-btn tn-btn-mint tn-btn-sm">
            Shop the Sale <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <nav className="main-nav">
        <div className="tn-container nav-inner">
          <Link to="/" className="brand">
            Tech<span>Nest</span>
          </Link>

          <form className="nav-search" onSubmit={onSearch}>
            <i className="fas fa-search"></i>
            <input
              type="search"
              placeholder="Search for products, brands and more..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/catalog">Categories</NavLink></li>
            <li><NavLink to="/about">About us</NavLink></li>
            <li><NavLink to="/products">Community</NavLink></li>
          </ul>

          <div className="nav-icons">
            <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
              <i className="far fa-heart"></i>
              {wishlist.length > 0 && <span className="badge-dot">{wishlist.length}</span>}
            </Link>
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <i className="fas fa-shopping-cart"></i>
              {cartCount > 0 && <span className="badge-dot">{cartCount}</span>}
            </Link>
            <div className="user-menu" ref={userRef}>
              <button type="button" className="icon-btn" aria-label="Account" onClick={() => setUserOpen(!userOpen)}>
                <i className="far fa-user"></i>
              </button>
              {userOpen && !loading && (
                <div className="dropdown">
                  {isAuthenticated ? (
                    <>
                      <div className="dropdown-head">Hi, {user ? user.name : 'there'}</div>
                      <Link to="/dashboard"><i className="fas fa-th-large"></i> Dashboard</Link>
                      <Link to="/products"><i className="far fa-comments"></i> Community</Link>
                      <Link to="/wishlist"><i className="far fa-heart"></i> Wishlist</Link>
                      <a href="#!" onClick={onLogout}><i className="fas fa-sign-out-alt"></i> Logout</a>
                    </>
                  ) : (
                    <>
                      <Link to="/login"><i className="fas fa-sign-in-alt"></i> Sign In</Link>
                      <Link to="/register"><i className="fas fa-user-plus"></i> Create Account</Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <button type="button" className="icon-btn burger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
              <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { logout })(Navbar);
