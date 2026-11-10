import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { categories, getCategory, products } from '../../data/catalog';

const PER_PAGE = 9;

const priceRanges = [
  { key: 'u500', label: 'Under $500', test: (p) => p.price < 500 },
  { key: '500-1000', label: '$500 - $1,000', test: (p) => p.price >= 500 && p.price < 1000 },
  { key: '1000-1500', label: '$1,000 - $1,500', test: (p) => p.price >= 1000 && p.price < 1500 },
  { key: 'o1500', label: 'Over $1,500', test: (p) => p.price >= 1500 },
];

const FilterGroup = ({ title, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`fgroup ${open ? 'open' : ''}`}>
      <button type="button" className="fgroup-head" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <i className={`fas fa-chevron-${open ? 'up' : 'down'}`}></i>
      </button>
      {open && <div className="fgroup-body">{children}</div>}
    </div>
  );
};

const CheckRow = ({ checked, onChange, label, count }) => (
  <label className="check-row">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="box"><i className="fas fa-check"></i></span>
    <span className="lbl">{label}</span>
    {count !== undefined && <span className="cnt">{count}</span>}
  </label>
);

const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

const Catalog = () => {
  const { category } = useParams();
  const [params] = useSearchParams();
  const q = (params.get('q') || '').toLowerCase();
  const cat = category ? getCategory(category) : null;

  const [brands, setBrands] = useState([]);
  const [brandSearch, setBrandSearch] = useState('');
  const [prices, setPrices] = useState([]);
  const [memory, setMemory] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('rating');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // reset filters when category / search changes
  useEffect(() => {
    setBrands([]); setPrices([]); setMemory([]); setMinRating(0); setPage(1);
  }, [category, q]);

  useEffect(() => setPage(1), [brands, prices, memory, minRating, sort]);

  const base = useMemo(
    () =>
      products.filter(
        (p) => (!cat || p.category === cat.slug) && (!q || `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q))
      ),
    [cat, q]
  );

  const brandCounts = useMemo(() => {
    const m = {};
    base.forEach((p) => (m[p.brand] = (m[p.brand] || 0) + 1));
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [base]);

  const memoryOptions = useMemo(() => {
    const s = new Set();
    base.forEach((p) => p.storage.forEach((x) => /GB|TB/.test(x) && s.add(x)));
    const val = (x) => parseFloat(x) * (x.includes('TB') ? 1024 : 1);
    return [...s].sort((a, b) => val(a) - val(b));
  }, [base]);

  const filtered = useMemo(() => {
    let list = base.filter(
      (p) =>
        (!brands.length || brands.includes(p.brand)) &&
        (!prices.length || priceRanges.some((r) => prices.includes(r.key) && r.test(p))) &&
        (!memory.length || p.storage.some((s) => memory.includes(s))) &&
        p.rating >= minRating
    );
    const sorters = {
      rating: (a, b) => b.rating - a.rating,
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      newest: (a, b) => Number(b.id) - Number(a.id),
    };
    return [...list].sort(sorters[sort]);
  }, [base, brands, prices, memory, minRating, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const activeCount = brands.length + prices.length + memory.length + (minRating ? 1 : 0);

  const clearAll = () => { setBrands([]); setPrices([]); setMemory([]); setMinRating(0); };

  return (
    <div className="tn-container catalog-page">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <i className="fas fa-chevron-right"></i>
        <Link to="/catalog">Catalog</Link>
        {cat && (<><i className="fas fa-chevron-right"></i><span>{cat.name}</span></>)}
        {q && (<><i className="fas fa-chevron-right"></i><span>“{params.get('q')}”</span></>)}
      </nav>

      <div className="catalog-layout">
        <aside className={`filters ${showFilters ? 'open' : ''}`}>
          <div className="filters-mobile-head">
            <strong>Filters</strong>
            <button type="button" className="icon-btn" onClick={() => setShowFilters(false)} aria-label="Close filters">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <FilterGroup title="Category" defaultOpen>
            <Link to="/catalog" className={`cat-link ${!cat ? 'active' : ''}`}>All products <span className="cnt">{products.length}</span></Link>
            {categories.map((c) => (
              <Link key={c.slug} to={`/catalog/${c.slug}`} className={`cat-link ${cat && cat.slug === c.slug ? 'active' : ''}`}>
                {c.name} <span className="cnt">{products.filter((p) => p.category === c.slug).length}</span>
              </Link>
            ))}
          </FilterGroup>

          <FilterGroup title="Brand" defaultOpen>
            <div className="fsearch">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search" value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)} />
            </div>
            {brandCounts
              .filter(([b]) => b.toLowerCase().includes(brandSearch.toLowerCase()))
              .map(([b, n]) => (
                <CheckRow key={b} label={b} count={n} checked={brands.includes(b)} onChange={() => setBrands(toggle(brands, b))} />
              ))}
          </FilterGroup>

          <FilterGroup title="Price">
            {priceRanges.map((r) => (
              <CheckRow key={r.key} label={r.label} checked={prices.includes(r.key)} onChange={() => setPrices(toggle(prices, r.key))} />
            ))}
          </FilterGroup>

          {memoryOptions.length > 0 && (
            <FilterGroup title="Built-in memory">
              {memoryOptions.map((m) => (
                <CheckRow key={m} label={m} checked={memory.includes(m)} onChange={() => setMemory(toggle(memory, m))} />
              ))}
            </FilterGroup>
          )}

          <FilterGroup title="Customer rating">
            {[4.5, 4, 0].map((r) => (
              <label key={r} className="check-row">
                <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} />
                <span className="box round"><i className="fas fa-circle"></i></span>
                <span className="lbl">{r ? <>{r}+ <i className="fas fa-star star"></i></> : 'Any rating'}</span>
              </label>
            ))}
          </FilterGroup>

          {activeCount > 0 && (
            <button type="button" className="tn-btn tn-btn-outline tn-btn-block" onClick={clearAll}>
              Clear filters ({activeCount})
            </button>
          )}
        </aside>
        {showFilters && <div className="filters-backdrop" onClick={() => setShowFilters(false)} />}

        <section className="catalog-main">
          <div className="catalog-toolbar">
            <p>Selected Products: <strong>{filtered.length}</strong></p>
            <div className="toolbar-right">
              <button type="button" className="tn-btn tn-btn-outline tn-btn-sm filters-toggle" onClick={() => setShowFilters(true)}>
                <i className="fas fa-sliders-h"></i> Filters {activeCount > 0 && `(${activeCount})`}
              </button>
              <div className="select-wrap">
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
                  <option value="rating">By rating</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>

          {visible.length ? (
            <div className="product-grid cols-3">
              {visible.map((p) => <ProductCard key={p.id} product={p} cta="Buy Now" />)}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fas fa-search"></i>
              <h3>No products found</h3>
              <p>Try changing or clearing your filters.</p>
              <button type="button" className="tn-btn tn-btn-dark" onClick={clearAll}>Clear filters</button>
            </div>
          )}

          {pages > 1 && (
            <div className="pagination">
              <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Previous page">
                <i className="fas fa-chevron-left"></i>
              </button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button key={n} type="button" className={n === page ? 'active' : ''} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button type="button" disabled={page === pages} onClick={() => setPage(page + 1)} aria-label="Next page">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Catalog;

