import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/catalog';

const Footer = () => (
  <footer className="site-footer">
    <div className="tn-container footer-grid">
      <div className="footer-brand">
        <Link to="/" className="brand brand-light">Tech<span>Nest</span></Link>
        <p>Your trusted destination for the latest tech gadgets. Quality, innovation, and great prices - all in one place.</p>
        <div className="socials">
          <a href="#!" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#!" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="#!" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
      <div>
        <h4>Categories</h4>
        <ul>
          {categories.map((c) => (
            <li key={c.slug}><Link to={`/catalog/${c.slug}`}>{c.name}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <h4>About us</h4>
        <ul>
          <li><Link to="/about">Our Story</Link></li>
          <li><Link to="/products">Community</Link></li>
          <li><Link to="/catalog">Our Products</Link></li>
          <li><a href="#!">Careers</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact us</h4>
        <ul>
          <li><a href="#!">Support</a></li>
          <li><a href="#!">Track order</a></li>
          <li><a href="#!">Terms of delivery</a></li>
          <li><a href="#!">Live Chat</a></li>
        </ul>
      </div>
    </div>
    <div className="tn-container footer-bottom">
      <span>© {new Date().getFullYear()} TechNest. All rights reserved.</span>
      <span>Privacy Policy · Terms of Use</span>
    </div>
  </footer>
);

export default Footer;

