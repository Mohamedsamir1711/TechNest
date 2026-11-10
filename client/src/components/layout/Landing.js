import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard, { onImgError } from '../shop/ProductCard'
import { categories, byTag, products, formatPrice } from '../../data/catalog'

const slides = [
  {
    eyebrow: 'Pro.Beyond.',
    title: <>iPhone 14 <strong>Pro</strong></>,
    text: 'Created to change everything for the better. For everyone.',
    image: '/img/shop/iphone-black.jpg',
    to: '/catalog/phones',
  },
  {
    eyebrow: 'Epic. Everyday.',
    title: <>Galaxy S24 <strong>Ultra</strong></>,
    text: 'Galaxy AI is here. Titanium frame, 200MP camera and built-in S Pen.',
    image: '/img/4.png',
    to: '/catalog/phones',
  },
  {
    eyebrow: 'Supercharged.',
    title: <>MacBook <strong>Pro</strong></>,
    text: 'Mind-blowing performance with all-day battery life.',
    image: '/img/1.png',
    to: '/catalog/computers',
  },
];

const tabs = [
  { key: 'new', label: 'New Arrival' },
  { key: 'bestseller', label: 'Bestseller' },
  { key: 'featured', label: 'Featured Products' },
];

const features = [
  { icon: 'fas fa-truck', title: 'Free Shipping', text: 'On orders over $99' },
  { icon: 'fas fa-shield-alt', title: 'Secure Payment', text: '100% secure checkout' },
  { icon: 'fas fa-headset', title: '24/7 Support', text: "We're here to help" },
  { icon: 'fas fa-undo', title: 'Easy Returns', text: '30-day return policy' },
];

const Landing = () => {
  const [slide, setSlide] = useState(0);
  const [tab, setTab] = useState('new');

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setSlide((s) => (s - 1 + slides.length) % slides.length);
  const next = () => setSlide((s) => (s + 1) % slides.length);
  const current = slides[slide];

  const tabProducts = byTag(tab).slice(0, 8);
  const discounts = products.filter((p) => p.oldPrice).slice(0, 4);

  return (
    <div className="home">
      {/* ---------- Hero ---------- */}
      <section className="tn-container">
        <div className="hero">
          <div className="hero-copy" key={slide}>
            <p className="hero-eyebrow">{current.eyebrow}</p>
            <h1 className="hero-title">{current.title}</h1>
            <p className="hero-text">{current.text}</p>
            <Link to={current.to} className="tn-btn tn-btn-mint">
              Shop Now <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="hero-media" key={`m${slide}`}>
            <div className="hero-glow"></div>
            <img src={current.image} alt="" onError={onImgError} />
          </div>
          <button type="button" className="hero-arrow left" onClick={prev} aria-label="Previous slide">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button type="button" className="hero-arrow right" onClick={next} aria-label="Next slide">
            <i className="fas fa-chevron-right"></i>
          </button>
          <div className="hero-dots">
            {slides.map((_, i) => (
              <button key={i} type="button" className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Promo grid ---------- */}
      <section className="tn-container promo-grid">
        <div className="promo-left">
          <Link to="/catalog/phones" className="tile tile-wide tile-light">
            <img src="/img/4.png" alt="Galaxy S24 Ultra" onError={onImgError} />
            <div>
              <h3>Galaxy S24 Ultra</h3>
              <p>Titanium design, 200MP camera and Galaxy AI to bring your ideas to life.</p>
              <span className="tn-btn tn-btn-outline tn-btn-sm">Shop Now <i className="fas fa-arrow-right"></i></span>
            </div>
          </Link>
          <Link to="/catalog/headphones" className="tile tile-mint">
            <img src="/img/shop/airpods-max.jpg" alt="AirPods Max" onError={onImgError} />
            <div>
              <h3>Apple <strong>AirPods Max</strong></h3>
              <p>Computational audio. Listen, it's powerful.</p>
            </div>
          </Link>
          <Link to="/catalog/smart-watches" className="tile tile-dark">
            <div className="plate"><img src="/img/shop/watch.jpg" alt="Apple Watch" onError={onImgError} /></div>
            <div>
              <h3>Apple <strong>Watch S9</strong></h3>
              <p>Smarter. Brighter. Mightier.</p>
            </div>
          </Link>
        </div>
        <Link to="/catalog/computers" className="tile tile-tall tile-light">
          <div>
            <h3 className="xl">Macbook <strong>Pro</strong></h3>
            <p>The new MacBook Pro delivers game-changing performance for pro users. Up to 22 hours of battery life.</p>
            <span className="tn-btn tn-btn-outline tn-btn-sm">Shop Now <i className="fas fa-arrow-right"></i></span>
          </div>
          <img src="/img/1.png" alt="MacBook Pro" onError={onImgError} />
        </Link>
      </section>

      {/* ---------- Browse by category ---------- */}
      <section className="tn-container section">
        <div className="section-head">
          <h2>Browse By Category</h2>
          <Link to="/catalog" className="view-all">View All <i className="fas fa-arrow-right"></i></Link>
        </div>
        <div className="cat-grid">
          {categories.map((c) => (
            <Link key={c.slug} to={`/catalog/${c.slug}`} className="cat-card">
              <i className={c.icon}></i>
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Product tabs ---------- */}
      <section className="tn-container section">
        <div className="section-head">
          <div className="tabs">
            {tabs.map((t) => (
              <button key={t.key} type="button" className={tab === t.key ? 'active' : ''} onClick={() => setTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>
          <Link to="/catalog" className="view-all">View All <i className="fas fa-arrow-right"></i></Link>
        </div>
        <div className="product-grid cols-4">
          {tabProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="tn-container">
        <div className="features">
          {features.map((f) => (
            <div key={f.title} className="feature">
              <i className={f.icon}></i>
              <div>
                <strong>{f.title}</strong>
                <small>{f.text}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Banner tiles ---------- */}
      <section className="tn-container banner-tiles section">
        {[
          { title: 'Popular Products', text: 'Discover our best-selling gadgets loved by thousands of customers.', img: '/img/shop/smartwatch-orange.jpg', to: '/catalog/smart-watches' },
          { title: 'iPad Pro', text: 'Powerful M2 chip, stunning display and all-day battery.', img: '/img/shop/ipad.jpg', to: '/catalog/computers' },
          { title: 'Samsung Galaxy', text: 'Innovation in every detail. Explore the Galaxy lineup.', img: '/img/shop/galaxy-phone.jpg', to: '/catalog/phones' },
        ].map((b) => (
          <Link key={b.title} to={b.to} className="btile">
            <img src={b.img} alt={b.title} onError={onImgError} />
            <h3>{b.title}</h3>
            <p>{b.text}</p>
            <span className="tn-btn tn-btn-outline tn-btn-sm">Shop Now <i className="fas fa-arrow-right"></i></span>
          </Link>
        ))}
        <Link to="/catalog/gaming" className="btile btile-dark">
          <div className="plate"><img src="/img/shop/laptop-gaming.jpg" alt="Gaming laptop" onError={onImgError} /></div>
          <h3>Gaming Laptops</h3>
          <p>RTX graphics and high refresh screens built to win.</p>
          <span className="tn-btn tn-btn-mint tn-btn-sm">Shop Now <i className="fas fa-arrow-right"></i></span>
        </Link>
      </section>

      {/* ---------- Discounts ---------- */}
      <section className="tn-container">
        <div className="discounts">
          <div className="discounts-copy">
            <p>Discounts up to</p>
            <h2>50% OFF</h2>
            <small>On selected products</small>
            <Link to="/catalog" className="tn-btn tn-btn-dark">Shop All Deals <i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="discounts-list">
            {discounts.map((p) => (
              <Link key={p.id} to={`/product/${p.slug}`} className="dcard">
                <span className="dbadge">-{Math.round((1 - p.price / p.oldPrice) * 100)}%</span>
                <img src={p.image} alt={p.name} onError={onImgError} />
                <p>{p.name}</p>
                <div className="pcard-price">
                  <span>{formatPrice(p.price)}</span>
                  <span className="old">{formatPrice(p.oldPrice)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA banner ---------- */}
      <section className="tn-container section">
        <div className="cta-banner">
          <div className="cta-copy">
            <h2>Your Next <strong>Tech Upgrade</strong> Awaits</h2>
            <p>Top brands. Best prices. Fast delivery.</p>
            <Link to="/catalog" className="tn-btn tn-btn-mint">Shop Now <i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="cta-media">
            <div className="plate lg"><img src="/img/1.png" alt="" onError={onImgError} /></div>
            <div className="plate"><img src="/img/3.png" alt="" onError={onImgError} /></div>
            <div className="plate"><img src="/img/shop/watch.jpg" alt="" onError={onImgError} /></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing;
