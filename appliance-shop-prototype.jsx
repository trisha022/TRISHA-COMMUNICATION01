import React, { useState, useMemo } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Star,
  ChevronRight,
  Truck,
  ShieldCheck,
  CreditCard,
  Package,
  Plus,
  Minus,
  ArrowUpRight,
  Smartphone,
  Laptop,
  Tv,
  Headphones,
} from "lucide-react";

/* ---------- bespoke line icons (to match lucide's stroke style) ---------- */
const iconProps = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

const FridgeIcon = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="5" y="2" width="14" height="20" rx="1.5" />
    <line x1="5" y1="9" x2="19" y2="9" />
    <line x1="8" y1="4.5" x2="8" y2="7" />
    <line x1="8" y1="11.5" x2="8" y2="14" />
  </svg>
);
const WasherIcon = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <circle cx="12" cy="13" r="5.2" />
    <circle cx="12" cy="13" r="2" />
    <line x1="7" y1="6" x2="8.6" y2="6" />
    <line x1="10.2" y1="6" x2="11.8" y2="6" />
  </svg>
);
const MicrowaveIcon = (p) => (
  <svg {...iconProps} {...p}>
    <rect x="2.5" y="6" width="19" height="12" rx="1.2" />
    <rect x="4.5" y="8" width="11" height="8" rx="0.6" />
    <line x1="18" y1="9" x2="19.5" y2="9" />
    <line x1="18" y1="11.5" x2="19.5" y2="11.5" />
    <circle cx="18.7" cy="14.3" r="0.9" />
  </svg>
);

/* ---------------------------------- data ---------------------------------- */
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "phones", label: "Phones", icon: Smartphone },
  { id: "computers", label: "Laptops", icon: Laptop },
  { id: "tv", label: "TV & audio", icon: Tv },
  { id: "cooling", label: "Refrigeration", icon: FridgeIcon },
  { id: "laundry", label: "Laundry", icon: WasherIcon },
  { id: "kitchen", label: "Kitchen", icon: MicrowaveIcon },
];

const PRODUCTS = [
  { id: 1, brand: "Modul", name: "Halcyon 5G Phone", category: "phones", icon: Smartphone, price: 549, oldPrice: null, badge: "New", specs: [["Display", "6.4\""], ["Battery", "5000 mAh"], ["Storage", "128 GB"]] },
  { id: 2, brand: "Norr", name: "Slate Laptop 14", category: "computers", icon: Laptop, price: 899, oldPrice: null, badge: null, specs: [["Screen", "14\" 2.8K"], ["RAM", "16 GB"], ["Battery life", "18 hr"]] },
  { id: 3, brand: "Kessel", name: "QuietDrum Washer 9kg", category: "laundry", icon: WasherIcon, price: 649, oldPrice: 749, badge: "Sale", specs: [["Capacity", "9 kg"], ["Spin speed", "1400 rpm"], ["Noise", "48 dB"]] },
  { id: 4, brand: "Arva", name: "Frame TV 55\"", category: "tv", icon: Tv, price: 429, oldPrice: null, badge: null, specs: [["Panel", "4K QLED"], ["Refresh", "120 Hz"], ["HDMI ports", "4"]] },
  { id: 5, brand: "Fenn", name: "CoolCube Fridge 380L", category: "cooling", icon: FridgeIcon, price: 799, oldPrice: null, badge: null, specs: [["Capacity", "380 L"], ["Energy", "A++"], ["Noise", "34 dB"]] },
  { id: 6, brand: "Modul", name: "Aria Wireless Earbuds", category: "tv", icon: Headphones, price: 89, oldPrice: 109, badge: "Sale", specs: [["Battery", "7 hr + 24 hr case"], ["ANC", "Yes"], ["Weight", "4.8 g"]] },
  { id: 7, brand: "Kessel", name: "FreshAir Microwave 25L", category: "kitchen", icon: MicrowaveIcon, price: 119, oldPrice: null, badge: null, specs: [["Capacity", "25 L"], ["Power", "900 W"], ["Presets", "8"]] },
  { id: 8, brand: "Norr", name: "Grid Bookshelf Speaker", category: "tv", icon: Headphones, price: 149, oldPrice: null, badge: "New", specs: [["Output", "60 W"], ["Connectivity", "Bluetooth 5.3"], ["Pairing", "Stereo pair"]] },
];

const TRUST = [
  { icon: Truck, label: "Free delivery", sub: "On orders over $50" },
  { icon: ShieldCheck, label: "2-year warranty", sub: "On every order" },
  { icon: CreditCard, label: "Pay in 4", sub: "No interest, no fees" },
  { icon: Package, label: "30-day returns", sub: "Free and easy" },
];

/* --------------------------------- helpers -------------------------------- */
const money = (n) => `$${n.toFixed(2)}`;

function SpecRow({ label, value }) {
  return (
    <div className="spec-row">
      <span className="spec-label">{label}</span>
      <span className="spec-dots" />
      <span className="spec-value">{value}</span>
    </div>
  );
}

function CornerTicks() {
  return (
    <>
      <span className="tick tick-tl" />
      <span className="tick tick-tr" />
      <span className="tick tick-bl" />
      <span className="tick tick-br" />
    </>
  );
}

/* ---------------------------------- app ---------------------------------- */
export default function ApplianceShop() {
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const products = useMemo(
    () => (category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category]
  );

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const changeQty = (id, delta) =>
    setCart((c) => {
      const next = { ...c, [id]: (c[id] || 0) + delta };
      if (next[id] <= 0) delete next[id];
      return next;
    });

  const cartLines = Object.entries(cart).map(([id, qty]) => ({
    product: PRODUCTS.find((p) => p.id === Number(id)),
    qty,
  }));
  const cartCount = cartLines.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cartLines.reduce((s, l) => s + l.qty * l.product.price, 0);

  return (
    <div className="shop-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .shop-app {
          --bg: #EFF2EC;
          --panel: #FFFFFF;
          --ink: #14181C;
          --muted: #5C6862;
          --line: #CBD2C6;
          --accent: #2F55E8;
          --accent-ink: #FFFFFF;
          --warm: #E8912F;
          font-family: 'IBM Plex Mono', monospace;
          background: var(--bg);
          color: var(--ink);
          min-height: 100vh;
          line-height: 1.5;
        }
        .shop-app * { box-sizing: border-box; }
        .display {
          font-family: 'Archivo', sans-serif;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }

        /* header */
        .header {
          position: sticky; top: 0; z-index: 30;
          background: var(--bg);
          border-bottom: 1px solid var(--line);
        }
        .header-row { display: flex; align-items: center; justify-content: space-between; height: 68px; }
        .logo { display: flex; align-items: center; gap: 8px; font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 19px; }
        .logo-mark { width: 10px; height: 10px; background: var(--accent); }
        .nav { display: none; gap: 28px; font-size: 13px; }
        .nav a { color: var(--muted); text-decoration: none; cursor: pointer; }
        .nav a:hover { color: var(--ink); }
        .header-actions { display: flex; align-items: center; gap: 14px; }
        .icon-btn { display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border: 1px solid var(--line); background: var(--panel); cursor: pointer; position: relative; color: var(--ink); }
        .icon-btn:hover { border-color: var(--ink); }
        .cart-count { position: absolute; top: -7px; right: -7px; background: var(--accent); color: #fff; font-size: 10px; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        @media (min-width: 860px) { .nav { display: flex; } .menu-toggle { display: none; } }

        /* hero */
        .hero { border-bottom: 1px solid var(--line); background: var(--panel); overflow: hidden; }
        .hero-grid { display: grid; grid-template-columns: 1fr; gap: 32px; padding: 48px 0 40px; }
        @media (min-width: 860px) { .hero-grid { grid-template-columns: 1.1fr 0.9fr; align-items: center; padding: 64px 0; } }
        .eyebrow-line { display: flex; align-items: center; gap: 10px; color: var(--muted); font-size: 12px; margin-bottom: 18px; }
        .eyebrow-line::before { content: ""; width: 22px; height: 1px; background: var(--muted); }
        .hero h1 { font-size: 38px; line-height: 1.05; margin: 0 0 18px; }
        @media (min-width: 860px) { .hero h1 { font-size: 52px; } }
        .hero p.desc { color: var(--muted); font-size: 14px; max-width: 42ch; margin: 0 0 26px; }
        .hero-specs { display: flex; flex-wrap: wrap; gap: 22px; margin-bottom: 30px; }
        .hero-spec b { display: block; font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 18px; }
        .hero-spec span { color: var(--muted); font-size: 11px; }
        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

        .btn { font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 600; padding: 13px 22px; border: 1px solid var(--ink); cursor: pointer; background: transparent; color: var(--ink); }
        .btn-solid { background: var(--ink); color: var(--bg); }
        .btn-solid:hover { background: var(--accent); border-color: var(--accent); }
        .btn:hover { border-color: var(--accent); color: var(--accent); }
        .btn-accent { background: var(--accent); border-color: var(--accent); color: #fff; }
        .btn-accent:hover { opacity: 0.9; }

        /* hero device illustration */
        .device-frame { position: relative; display: flex; align-items: center; justify-content: center; height: 340px; }
        .device-body { width: 150px; height: 300px; border: 2px solid var(--ink); border-radius: 22px; position: relative; background: linear-gradient(160deg, #f7f8f5, #e4e8de); }
        .device-notch { position: absolute; top: 14px; left: 50%; transform: translateX(-50%); width: 44px; height: 6px; background: var(--ink); border-radius: 4px; }
        .dim-line { position: absolute; color: var(--muted); font-size: 11px; display: flex; align-items: center; gap: 6px; }
        .dim-line.top { top: -30px; left: 50%; transform: translateX(-50%); }
        .dim-line.side { top: 50%; right: -78px; transform: translateY(-50%); flex-direction: column; }
        .dim-line .bar { background: var(--line); }
        .dim-line.top .bar { width: 150px; height: 1px; }
        .dim-line.side .bar { width: 1px; height: 60px; }
        .tag-pill { position: absolute; border: 1px solid var(--line); background: var(--panel); font-size: 10.5px; padding: 5px 9px; display: flex; align-items: center; gap: 6px; }
        .tag-pill .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }
        .tag-pill.p1 { top: 26px; left: -10px; }
        .tag-pill.p2 { bottom: 60px; right: -30px; }
        .tag-pill.p3 { bottom: 10px; left: 0; }

        /* category strip */
        .cat-strip { display: flex; gap: 10px; overflow-x: auto; padding: 22px 0; }
        .cat-chip { display: flex; align-items: center; gap: 8px; white-space: nowrap; padding: 9px 16px; border: 1px solid var(--line); background: var(--panel); font-size: 12.5px; cursor: pointer; color: var(--muted); }
        .cat-chip.active { border-color: var(--ink); color: var(--ink); background: var(--ink); color: var(--bg); }
        .cat-chip:hover:not(.active) { border-color: var(--ink); color: var(--ink); }

        /* section heading */
        .section-head { display: flex; align-items: baseline; justify-content: space-between; margin: 8px 0 22px; }
        .section-head h2 { font-size: 24px; margin: 0; }
        .section-head .count { color: var(--muted); font-size: 12px; }

        /* product grid */
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; padding-bottom: 50px; }
        @media (min-width: 700px) { .grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1000px) { .grid { grid-template-columns: repeat(4, 1fr); } }

        .card { position: relative; background: var(--panel); border: 1px solid var(--line); padding: 16px; display: flex; flex-direction: column; gap: 10px; }
        .tick { position: absolute; width: 8px; height: 8px; border: 1px solid var(--ink); opacity: 0; transition: opacity .15s; }
        .card:hover .tick { opacity: 1; }
        .tick-tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .tick-tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
        .tick-bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
        .tick-br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

        .card-badge { position: absolute; top: 10px; left: 10px; font-size: 10px; padding: 3px 8px; background: var(--warm); color: var(--ink); font-weight: 600; z-index: 2; }
        .card-badge.new { background: var(--accent); color: #fff; }
        .card-media { height: 110px; display: flex; align-items: center; justify-content: center; background: repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 10px); color: var(--muted); }
        .card-brand { font-size: 10.5px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
        .card-name { font-weight: 600; font-size: 13.5px; }
        .spec-row { display: flex; align-items: baseline; gap: 6px; font-size: 10.5px; color: var(--muted); }
        .spec-dots { flex: 1; border-bottom: 1px dotted var(--line); transform: translateY(-3px); }
        .spec-value { color: var(--ink); }
        .card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 8px; }
        .price-block { display: flex; align-items: baseline; gap: 8px; }
        .price { font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 17px; }
        .old-price { color: var(--muted); font-size: 12px; text-decoration: line-through; }
        .add-btn { width: 34px; height: 34px; border: 1px solid var(--ink); display: flex; align-items: center; justify-content: center; cursor: pointer; background: transparent; }
        .add-btn:hover { background: var(--ink); color: var(--bg); }

        /* trust bar */
        .trust-bar { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: var(--panel); }
        .trust-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; padding: 28px 0; }
        @media (min-width: 700px) { .trust-grid { grid-template-columns: repeat(4, 1fr); } }
        .trust-item { display: flex; gap: 12px; align-items: flex-start; }
        .trust-item b { display: block; font-size: 13px; }
        .trust-item span { color: var(--muted); font-size: 11.5px; }

        /* footer */
        .footer { padding: 40px 0 30px; }
        .footer-grid { display: grid; grid-template-columns: 1fr; gap: 28px; }
        @media (min-width: 700px) { .footer-grid { grid-template-columns: 1.4fr 1fr 1fr 1fr; } }
        .footer h4 { font-size: 12px; margin: 0 0 12px; color: var(--muted); }
        .footer a { display: block; color: var(--ink); text-decoration: none; font-size: 13px; margin-bottom: 8px; }
        .footer a:hover { color: var(--accent); }
        .footer-bottom { margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); flex-wrap: wrap; gap: 10px; }

        /* cart drawer */
        .overlay { position: fixed; inset: 0; background: rgba(20,24,20,0.35); z-index: 40; }
        .drawer { position: fixed; top: 0; right: 0; height: 100%; width: 100%; max-width: 380px; background: var(--panel); z-index: 50; display: flex; flex-direction: column; border-left: 1px solid var(--line); }
        .drawer-head { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid var(--line); }
        .drawer-body { flex: 1; overflow-y: auto; padding: 16px 20px; display: flex; flex-direction: column; gap: 16px; }
        .drawer-line { display: flex; gap: 12px; align-items: center; border-bottom: 1px solid var(--line); padding-bottom: 14px; }
        .drawer-line .lname { font-size: 13px; font-weight: 600; }
        .drawer-line .lbrand { font-size: 10.5px; color: var(--muted); text-transform: uppercase; }
        .qty-ctrl { display: flex; align-items: center; gap: 8px; border: 1px solid var(--line); }
        .qty-ctrl button { width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; color: var(--ink); }
        .qty-ctrl button:hover { color: var(--accent); }
        .drawer-foot { border-top: 1px solid var(--line); padding: 18px 20px; }
        .subtotal-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 14px; }
        .empty-cart { color: var(--muted); font-size: 13px; text-align: center; margin-top: 40px; }
      `}</style>

      {/* header */}
      <header className="header">
        <div className="wrap header-row">
          <div className="logo">
            <span className="logo-mark" />
            KESSEL &amp; CO
          </div>
          <nav className="nav">
            <a>Phones</a>
            <a>Laptops</a>
            <a>TV &amp; audio</a>
            <a>Appliances</a>
            <a>Deals</a>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" aria-label="Search"><Search size={17} /></button>
            <button className="icon-btn" aria-label="Cart" onClick={() => setCartOpen(true)}>
              <ShoppingCart size={17} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button className="icon-btn menu-toggle" aria-label="Menu" onClick={() => setMenuOpen((m) => !m)}>
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow-line">New arrival · Modul Halcyon 5G</div>
            <h1 className="display">Everyday tech, built to outlast the upgrade cycle.</h1>
            <p className="desc">Phones, laptops, and home appliances chosen for reliability first. Every listing ships with real specs, not marketing copy.</p>
            <div className="hero-specs">
              <div className="hero-spec"><b>6.4"</b><span>DISPLAY</span></div>
              <div className="hero-spec"><b>5000mAh</b><span>BATTERY</span></div>
              <div className="hero-spec"><b>IP68</b><span>WATER RESISTANT</span></div>
              <div className="hero-spec"><b>$549</b><span>PRICE</span></div>
            </div>
            <div className="hero-ctas">
              <button className="btn btn-solid" onClick={() => addToCart(1)}>Add to cart</button>
              <button className="btn">View full specs</button>
            </div>
          </div>
          <div className="device-frame">
            <div className="dim-line top"><span className="bar" />6.4"</div>
            <div className="dim-line side"><span className="bar" />162g</div>
            <div className="device-body"><div className="device-notch" /></div>
            <div className="tag-pill p1"><span className="dot" />128GB storage</div>
            <div className="tag-pill p2"><span className="dot" />5G ready</div>
            <div className="tag-pill p3"><span className="dot" />2-yr warranty</div>
          </div>
        </div>
      </section>

      <div className="wrap">
        {/* categories */}
        <div className="cat-strip">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`cat-chip${category === c.id ? " active" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.icon && <c.icon size={14} />}
              {c.label}
            </button>
          ))}
        </div>

        {/* products */}
        <div className="section-head">
          <h2 className="display">Shop the catalog</h2>
          <span className="count">{products.length} items</span>
        </div>
        <div className="grid">
          {products.map((p) => (
            <div className="card" key={p.id}>
              <CornerTicks />
              {p.badge && <span className={`card-badge${p.badge === "New" ? " new" : ""}`}>{p.badge === "New" ? "New" : "Sale"}</span>}
              <div className="card-media"><p.icon size={40} strokeWidth={1.2} /></div>
              <div>
                <div className="card-brand">{p.brand}</div>
                <div className="card-name">{p.name}</div>
              </div>
              <div>
                {p.specs.map(([label, value]) => (
                  <SpecRow key={label} label={label} value={value} />
                ))}
              </div>
              <div className="card-footer">
                <div className="price-block">
                  <span className="price">{money(p.price)}</span>
                  {p.oldPrice && <span className="old-price">{money(p.oldPrice)}</span>}
                </div>
                <button className="add-btn" onClick={() => addToCart(p.id)} aria-label="Add to cart">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* trust bar */}
      <div className="trust-bar">
        <div className="wrap trust-grid">
          {TRUST.map((t) => (
            <div className="trust-item" key={t.label}>
              <t.icon size={20} strokeWidth={1.4} />
              <div>
                <b>{t.label}</b>
                <span>{t.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <div className="logo" style={{ marginBottom: 12 }}>
              <span className="logo-mark" />
              KESSEL &amp; CO
            </div>
            <p style={{ color: "var(--muted)", fontSize: 12.5, maxWidth: "32ch" }}>
              Phones, computers, and home appliances with honest specs and a 2-year warranty on everything we sell.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <a>Phones</a>
            <a>Laptops</a>
            <a>TV &amp; audio</a>
            <a>Kitchen</a>
          </div>
          <div>
            <h4>Support</h4>
            <a>Track an order</a>
            <a>Returns</a>
            <a>Warranty</a>
            <a>Contact us</a>
          </div>
          <div>
            <h4>Store</h4>
            <a>Find a location</a>
            <a>Installation service</a>
            <a>Trade-in program</a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 Kessel &amp; Co. Prototype layout for demonstration.</span>
          <span>Prices shown in USD</span>
        </div>
      </footer>

      {/* cart drawer */}
      {cartOpen && (
        <>
          <div className="overlay" onClick={() => setCartOpen(false)} />
          <div className="drawer">
            <div className="drawer-head">
              <span className="display" style={{ fontSize: 16 }}>Your cart ({cartCount})</span>
              <button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={16} /></button>
            </div>
            <div className="drawer-body">
              {cartLines.length === 0 && <div className="empty-cart">Your cart is empty. Add a product to see it here.</div>}
              {cartLines.map(({ product, qty }) => (
                <div className="drawer-line" key={product.id}>
                  <product.icon size={28} strokeWidth={1.3} />
                  <div style={{ flex: 1 }}>
                    <div className="lbrand">{product.brand}</div>
                    <div className="lname">{product.name}</div>
                    <div style={{ fontSize: 12, marginTop: 4 }}>{money(product.price)}</div>
                  </div>
                  <div className="qty-ctrl">
                    <button onClick={() => changeQty(product.id, -1)}><Minus size={13} /></button>
                    <span style={{ fontSize: 12, minWidth: 14, textAlign: "center" }}>{qty}</span>
                    <button onClick={() => changeQty(product.id, 1)}><Plus size={13} /></button>
                  </div>
                </div>
              ))}
            </div>
            {cartLines.length > 0 && (
              <div className="drawer-foot">
                <div className="subtotal-row">
                  <span>Subtotal</span>
                  <span className="display" style={{ fontSize: 16 }}>{money(cartTotal)}</span>
                </div>
                <button className="btn btn-accent" style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: 8 }}>
                  Checkout <ArrowUpRight size={15} />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
