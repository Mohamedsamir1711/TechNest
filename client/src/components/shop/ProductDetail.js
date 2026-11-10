import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard, { onImgError } from './ProductCard';
import { useShop } from '../../context/ShopContext';
import { formatPrice, getCategory, getProductBySlug, products } from '../../data/catalog';

const sampleReviews = [
  { name: 'Grace Carey', date: '24 January, 2023', rating: 4, text: 'I was a bit nervous to be buying a secondhand device from this store, but I couldn\'t be happier with my purchase! It arrived in perfect condition, works flawlessly and the delivery was super fast.' },
  { name: 'Ronald Richards', date: '24 January, 2023', rating: 5, text: 'This product has been a lifesaver for me. Performance is excellent, battery lasts all day and the screen is simply gorgeous. Highly recommend to anyone looking for an upgrade.' },
  { name: 'Darcy King', date: '24 January, 2023', rating: 4, text: 'Great value for the price. Build quality feels premium, setup took minutes. Only wish it came in more colors.' },
];

const Stars = ({ value }) => (
  <span className="stars" aria-label={`${value} out of 5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <i key={i} className={value >= i ? 'fas fa-star' : value >= i - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
    ))}
  </span>
);

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);
  const { addToCart, toggleWishlist, inWishlist } = useShop();

  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(0);
  const [storage, setStorage] = useState(0);
  const [moreText, setMoreText] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImg(0); setColor(0); setStorage(product ? product.storage.length - 1 : 0);
    setMoreText(false); setMoreDetails(false);
  }, [slug, product]);

  const related = useMemo(
    () => (product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : []),
    [product]
  );

  if (!product) {
    return (
      <div className="tn-container empty-state page-pad">
        <i className="fas fa-box-open"></i>
        <h3>Product not found</h3>
        <p>The product you're looking for doesn't exist or was removed.</p>
        <Link to="/catalog" className="tn-btn tn-btn-dark">Back to catalog</Link>
      </div>
    );
  }

  const cat = getCategory(product.category);
  const liked = inWishlist(product.id);

  // rating distribution derived from total reviews
  const total = product.reviews;
  const dist = [
    ['Excellent', Math.round(total * 0.8)],
    ['Good', Math.round(total * 0.09)],
    ['Average', Math.round(total * 0.03)],
    ['Below Average', Math.round(total * 0.06)],
  ];
  dist.push(['Poor', Math.max(0, total - dist.reduce((s, d) => s + d[1], 0))]);

  const onAdd = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="pdp">
      {/* ---------- Top ---------- */}
      <section className="tn-container">
        <nav className="breadcrumbs">
          <Link to="/">Home</Link>
          <i className="fas fa-chevron-right"></i>
          <Link to="/catalog">Catalog</Link>
          <i className="fas fa-chevron-right"></i>
          <Link to={`/catalog/${cat.slug}`}>{cat.name}</Link>
          <i className="fas fa-chevron-right"></i>
          <span className="truncate">{product.name}</span>
        </nav>

        <div className="pdp-top">
          <div className="gallery">
            <div className="thumbs">
              {product.gallery.map((g, i) => (
                <button key={i} type="button" className={i === activeImg ? 'active' : ''} onClick={() => setActiveImg(i)}>
                  <img src={g} alt="" onError={onImgError} />
                </button>
              ))}
            </div>
            <div className="main-img">
              <img src={product.gallery[activeImg]} alt={product.name} onError={onImgError} />
            </div>
          </div>

          <div className="pdp-info">
            <h1>{product.name}</h1>
            <div className="pdp-rating">
              <Stars value={product.rating} /> <span>{product.rating}</span> <a href="#reviews">({product.reviews} reviews)</a>
            </div>
            <div className="pdp-price">
              <span>{formatPrice(product.price)}</span>
              {product.oldPrice && <span className="old">{formatPrice(product.oldPrice)}</span>}
            </div>

            <div className="opt-row">
              <span className="opt-label">Select color :</span>
              <div className="swatches">
                {product.colors.map((c, i) => (
                  <button
                    key={c}
                    type="button"
                    className={`swatch ${i === color ? 'active' : ''}`}
                    style={{ background: c }}
                    onClick={() => setColor(i)}
                    aria-label={`Color ${c}`}
                  />
                ))}
              </div>
            </div>

            {product.storage.length > 1 && (
              <div className="storage-opts">
                {product.storage.map((s, i) => (
                  <button key={s} type="button" className={i === storage ? 'active' : ''} onClick={() => setStorage(i)}>{s}</button>
                ))}
              </div>
            )}

            <div className="spec-chips">
              {product.specs.map((s) => (
                <div key={s.label} className="spec-chip">
                  <i className={s.icon}></i>
                  <div>
                    <small>{s.label}</small>
                    <strong>{s.value}</strong>
                  </div>
                </div>
              ))}
            </div>

            <p className={`pdp-desc ${moreText ? 'expanded' : ''}`}>
              {product.description}{' '}
              {!moreText && <button type="button" className="link-btn" onClick={() => setMoreText(true)}>more...</button>}
            </p>

            <div className="pdp-actions">
              <button type="button" className={`tn-btn tn-btn-outline tn-btn-lg ${liked ? 'is-liked' : ''}`} onClick={() => toggleWishlist(product.id)}>
                <i className={liked ? 'fas fa-heart' : 'far fa-heart'}></i> {liked ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
              <button type="button" className="tn-btn tn-btn-dark tn-btn-lg" onClick={onAdd}>
                {added ? <><i className="fas fa-check"></i> Added</> : 'Add to Cart'}
              </button>
            </div>
            <button type="button" className="link-btn buy-now" onClick={() => { addToCart(product.id); navigate('/cart'); }}>
              Buy it now <i className="fas fa-arrow-right"></i>
            </button>

            <div className="perks">
              <div><span><i className="fas fa-truck"></i></span><p><small>Free Delivery</small>1-2 day</p></div>
              <div><span><i className="fas fa-store"></i></span><p><small>In Stock</small>Today</p></div>
              <div><span><i className="fas fa-shield-alt"></i></span><p><small>Guaranteed</small>1 year</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Details ---------- */}
      <section className="pdp-band">
        <div className="tn-container">
          <div className="details-card">
            <h2>Details</h2>
            <p className="muted">
              Just as a book is judged by its cover, the first thing you notice when you pick up a modern device is the display and
              the build. Advanced technologies allow manufacturers to practically level the frames and cutouts, leaving no room for
              bold design solutions - and the {product.brand} {product.name.split(' ').slice(1, 4).join(' ')} gets everything right.
            </p>
            <div className={`spec-table ${moreDetails ? '' : 'collapsed'}`}>
              {product.details.map((g) => (
                <div key={g.title} className="spec-group">
                  <h3>{g.title}</h3>
                  {g.rows.map(([k, v]) => (
                    <div key={k} className="spec-row">
                      <span>{k}</span>
                      <span className="val">{Array.isArray(v) ? v.map((x) => <span key={x}>{x}</span>) : v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="center">
              <button type="button" className="tn-btn tn-btn-outline" onClick={() => setMoreDetails(!moreDetails)}>
                {moreDetails ? 'View Less' : 'View More'} <i className={`fas fa-chevron-${moreDetails ? 'up' : 'down'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      <section className="tn-container reviews" id="reviews">
        <h2>Reviews</h2>
        <div className="reviews-summary">
          <div className="score">
            <strong>{product.rating}</strong>
            <small>of {product.reviews} reviews</small>
            <Stars value={product.rating} />
          </div>
          <div className="bars">
            {dist.map(([label, n]) => (
              <div key={label} className="bar-row">
                <span>{label}</span>
                <div className="bar"><div style={{ width: `${total ? (n / total) * 100 : 0}%` }} /></div>
                <span className="n">{n}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/products" className="review-input">
          <span>Leave Comment</span>
          <i className="far fa-comment-dots"></i>
        </Link>

        <div className="review-list">
          {sampleReviews.map((r) => (
            <div key={r.name} className="review">
              <div className="avatar">{r.name.split(' ').map((x) => x[0]).join('')}</div>
              <div>
                <div className="review-head">
                  <strong>{r.name}</strong>
                  <small>{r.date}</small>
                </div>
                <Stars value={r.rating} />
                <p>{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Related ---------- */}
      {related.length > 0 && (
        <section className="tn-container section">
          <div className="section-head">
            <h2>Related Products</h2>
            <Link to={`/catalog/${cat.slug}`} className="view-all">View All <i className="fas fa-arrow-right"></i></Link>
          </div>
          <div className="product-grid cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;

