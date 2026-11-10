import React from 'react';
import { Link } from 'react-router-dom';
import { onImgError } from './ProductCard';

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '100%', label: 'Authentic Products' },
  { value: '25+', label: 'Global Tech Brands' },
  { value: '24/7', label: 'Expert Tech Support' },
];

const productLines = [
  {
    slug: 'phones',
    icon: 'fas fa-mobile-alt',
    title: 'Flagship Smartphones',
    image: '/img/shop/iphone-purple.jpg',
    desc: 'The latest iPhone, Samsung Galaxy Ultra, and foldable devices with official warranty, 5G performance, and pro-grade camera systems.',
    highlights: ['Apple iPhone Series', 'Samsung Galaxy S & Z Series', 'Official 1-Year Warranty'],
  },
  {
    slug: 'computers',
    icon: 'fas fa-laptop',
    title: 'Laptops, Tablets & Workstations',
    image: '/img/1.png',
    desc: 'From ultra-light MacBook Air and M-series MacBook Pro workstations to iPad Pro tablets and business laptops built for creators and professionals.',
    highlights: ['MacBook Pro & Air', 'iPad Pro Liquid Retina', 'Creator & Business Laptops'],
  },
  {
    slug: 'headphones',
    icon: 'fas fa-headphones',
    title: 'Premium Audio & Headphones',
    image: '/img/shop/airpods-max.jpg',
    desc: 'Studio-quality over-ear headphones and true wireless earbuds featuring active noise cancellation, spatial audio, and all-day comfort.',
    highlights: ['AirPods Max & Pro 2', 'Galaxy Buds Series', 'Active Noise Cancellation'],
  },
  {
    slug: 'smart-watches',
    icon: 'far fa-clock',
    title: 'Smart Watches & Wearables',
    image: '/img/shop/watch.jpg',
    desc: 'Stay connected and track your health, workouts, sleep, and ECG with the latest Apple Watch and fitness wearables.',
    highlights: ['Apple Watch Series 9 & SE', 'Health & ECG Sensors', 'Water-Resistant Designs'],
  },
  {
    slug: 'cameras',
    icon: 'fas fa-camera',
    title: 'Pro Cameras & Cinema Gear',
    image: '/img/shop/camera.jpg',
    desc: 'Cinema and mirrorless cameras engineered for filmmakers, content creators, and photographers demanding 6K RAW quality and high dynamic range.',
    highlights: ['6K Digital Film Cameras', 'Interchangeable Lenses', 'Studio & Vlog Ready'],
  },
  {
    slug: 'gaming',
    icon: 'fas fa-gamepad',
    title: 'Gaming Laptops & Displays',
    image: '/img/shop/laptop-gaming.jpg',
    desc: 'High-refresh gaming laptops powered by NVIDIA RTX graphics, RGB mechanical keyboards, and low-latency smart displays.',
    highlights: ['ASUS ROG Strix RTX Series', '240Hz IPS Displays', 'Game-Mode Smart TVs'],
  },
];

const values = [
  {
    icon: 'fas fa-certificate',
    title: '100% Genuine & Sealed',
    text: 'Every device we sell is factory-sealed, sourced directly from authorized distributors, and backed by an official manufacturer warranty.',
  },
  {
    icon: 'fas fa-shipping-fast',
    title: 'Fast & Insured Delivery',
    text: 'Orders ship within 24 hours with full transit insurance and real-time tracking right to your doorstep.',
  },
  {
    icon: 'fas fa-hand-holding-usd',
    title: 'Transparent Best Pricing',
    text: 'Direct partnerships allow us to offer competitive everyday prices and up to 50% seasonal tech deals with zero hidden fees.',
  },
  {
    icon: 'fas fa-headset',
    title: 'Dedicated Tech Specialists',
    text: 'Need help choosing between specs or setting up your new device? Our specialists are available 24/7 to guide you.',
  },
];

const AboutUs = () => {
  return (
    <div className="about-page">
      <div className="tn-container">
        <nav className="breadcrumbs">
          <Link to="/">Home</Link>
          <i className="fas fa-chevron-right"></i>
          <span>About Us</span>
        </nav>

        {/* ---------- Hero ---------- */}
        <section className="about-hero">
          <div className="about-hero-copy">
            <span className="about-pill">Welcome to TechNest</span>
            <h1>
              Your Trusted Home for <strong>Next-Gen Technology</strong>
            </h1>
            <p>
              TechNest is a modern electronics storefront built for tech enthusiasts, creators, and everyday users. We bring together the world's most iconic devices—smartphones, laptops, audio gear, smartwatches, cameras, and gaming hardware—in one seamless shopping experience.
            </p>
            <div className="about-hero-actions">
              <Link to="/catalog" className="tn-btn tn-btn-mint">
                Explore Our Products <i className="fas fa-arrow-right"></i>
              </Link>
              <Link to="/products" className="tn-btn tn-btn-outline-light">
                Join Community
              </Link>
            </div>
          </div>
          <div className="about-hero-visual">
            <div className="about-hero-card main">
              <img src="/img/shop/iphone-purple.jpg" alt="Flagship Smartphones" onError={onImgError} />
            </div>
            <div className="about-hero-card sub top">
              <img src="/img/shop/airpods-max.jpg" alt="Premium Audio" onError={onImgError} />
            </div>
            <div className="about-hero-card sub bottom">
              <img src="/img/shop/watch.jpg" alt="Smart Watches" onError={onImgError} />
            </div>
          </div>
        </section>

        {/* ---------- Stats ---------- */}
        <section className="about-stats">
          {stats.map((s) => (
            <div key={s.label} className="about-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        {/* ---------- Story & Mission ---------- */}
        <section className="about-story section">
          <div className="about-story-card">
            <span className="about-eyebrow">Our Story</span>
            <h2>Built to Make Buying Tech Simple, Honest & Exciting</h2>
            <p>
              Buying a new phone, laptop, or camera shouldn't feel overwhelming. We started <strong>TechNest</strong> with a clear mission: curate only the best-performing devices on the market, present their real specifications clearly, and deliver them fast at fair, transparent prices.
            </p>
            <p>
              Whether you're upgrading to the newest flagship smartphone, building a creative workstation around MacBook Pro and iPad Pro, or picking up noise-cancelling headphones for your daily commute, TechNest carefully verifies every product so you can shop with complete confidence.
            </p>
          </div>
          <div className="about-mission-grid">
            <div className="mission-box mint">
              <i className="fas fa-bullseye"></i>
              <h3>Our Mission</h3>
              <p>Empower people with authentic, cutting-edge technology backed by honest guidance, fast shipping, and reliable after-sales care.</p>
            </div>
            <div className="mission-box dark">
              <i className="fas fa-eye"></i>
              <h3>Our Vision</h3>
              <p>To become the most trusted online destination where discovering, comparing, and owning the latest tech feels effortless.</p>
            </div>
          </div>
        </section>

        {/* ---------- What We Offer / Product Lines ---------- */}
        <section className="section">
          <div className="about-sec-head">
            <span className="about-eyebrow">What We Offer</span>
            <h2>Discover Our Product Ecosystem</h2>
            <p>We specialize in six core technology categories, carefully selected from industry-leading brands like Apple, Samsung, ASUS, Dell, and Blackmagic.</p>
          </div>

          <div className="about-products-grid">
            {productLines.map((item) => (
              <div key={item.slug} className="about-pcard">
                <div className="about-pcard-top">
                  <div className="about-pcard-img">
                    <img src={item.image} alt={item.title} onError={onImgError} />
                  </div>
                  <span className="about-pcard-icon">
                    <i className={item.icon}></i>
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <ul className="about-pcard-list">
                  {item.highlights.map((h) => (
                    <li key={h}>
                      <i className="fas fa-check-circle"></i> {h}
                    </li>
                  ))}
                </ul>
                <Link to={`/catalog/${item.slug}`} className="tn-btn tn-btn-outline tn-btn-sm">
                  Browse {item.title.split(' ')[0]} <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Why Choose TechNest ---------- */}
        <section className="section">
          <div className="about-sec-head">
            <span className="about-eyebrow">Why TechNest</span>
            <h2>The TechNest Promise</h2>
            <p>Every order is backed by our commitment to quality, speed, and customer satisfaction.</p>
          </div>

          <div className="about-values-grid">
            {values.map((v) => (
              <div key={v.title} className="about-value-card">
                <div className="about-value-icon">
                  <i className={v.icon}></i>
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Bottom CTA ---------- */}
        <section className="section">
          <div className="cta-banner">
            <div className="cta-copy">
              <h2>
                Ready to Find Your <strong>Next Device?</strong>
              </h2>
              <p>Browse our full catalog of phones, laptops, smartwatches, and accessories with up to 50% off selected deals.</p>
              <Link to="/catalog" className="tn-btn tn-btn-mint">
                Shop the Catalog <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            <div className="cta-media">
              <div className="plate lg">
                <img src="/img/1.png" alt="MacBook Pro" onError={onImgError} />
              </div>
              <div className="plate">
                <img src="/img/shop/ipad.jpg" alt="iPad Pro" onError={onImgError} />
              </div>
              <div className="plate">
                <img src="/img/shop/earbuds.jpg" alt="Wireless Earbuds" onError={onImgError} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;

