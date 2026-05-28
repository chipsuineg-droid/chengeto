const fs = require('fs');

// Read both files
let app = fs.readFileSync('src/App.jsx', 'utf8');
let css = fs.readFileSync('src/index.css', 'utf8');

// ── CSS: replace from the "Responsive adjust" comment to end of file ─────────
const cssMarker = '/* Responsive adjust */';
const cssIdx = css.indexOf(cssMarker);
if (cssIdx < 0) { console.error('CSS marker not found'); process.exit(1); }
const cssBefore = css.slice(0, cssIdx);

const newMobileCSS = `/* Desktop: hide mobile-only elements */
.mobile-header-right   { display: none; }
.mob-bottom-nav        { display: none; }
.mobile-explore-section{ display: none; }
.mob-podcast-card      { display: none; }

@media (max-width: 768px) {
  .desktop-nav { display: none !important; }
  .mobile-header-right { display: flex; align-items: center; gap: 8px; }
  .nav-header { padding: 10px 16px !important; height: 60px; min-height: 60px; }
  .logo-title-text { font-size: 15px !important; }
  .logo-sub-text   { font-size: 9px !important; }
  .logo-icon-wrap img { width: 32px !important; height: 36px !important; }
  body { padding-bottom: 70px; }
  .mob-hamburger { width:42px;height:42px;background:rgba(5,150,105,0.12);border:none;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;padding:0; }
  .mob-hamburger span { display:block;width:20px;height:2.5px;background:var(--color-primary);border-radius:2px; }
  .mob-icon-btn { width:36px;height:36px;background:transparent;border:none;font-size:18px;cursor:pointer;border-radius:8px;display:flex;align-items:center;justify-content:center; }
  .mob-drawer-overlay { position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.55);backdrop-filter:blur(3px);animation:fadeIn 0.2s ease; }
  .mob-drawer { position:absolute;top:0;right:0;width:min(82vw,310px);height:100%;background:var(--color-bg-base);box-shadow:-8px 0 40px rgba(0,0,0,0.25);display:flex;flex-direction:column;animation:slideInRight 0.28s cubic-bezier(0.34,1.1,0.64,1);overflow-y:auto; }
  @keyframes slideInRight { from{transform:translateX(100%)} to{transform:translateX(0)} }
  .mob-drawer-head { display:flex;align-items:center;justify-content:space-between;padding:20px 18px 16px;border-bottom:1px solid var(--color-border); }
  .mob-drawer-close { width:36px;height:36px;border-radius:50%;background:var(--color-bg-card);border:1px solid var(--color-border);font-size:16px;cursor:pointer;color:var(--color-text-muted);display:flex;align-items:center;justify-content:center; }
  .mob-drawer-nav { flex:1;padding:10px 12px;display:flex;flex-direction:column;gap:2px; }
  .mob-drawer-item { display:flex;align-items:center;gap:14px;padding:14px;border-radius:14px;border:none;background:transparent;cursor:pointer;text-align:left;transition:background 0.15s; }
  .mob-drawer-item:active,.mob-drawer-item--active { background:var(--color-primary-light) !important; }
  .mob-drawer-item-icon { font-size:22px;width:32px;text-align:center;flex-shrink:0; }
  .mob-drawer-item-label { font-size:16px;font-weight:600;color:var(--color-text-main);flex:1; }
  .mob-drawer-item--active .mob-drawer-item-label { color:var(--color-primary);font-weight:800; }
  .mob-drawer-item-dot { width:8px;height:8px;border-radius:50%;background:var(--color-primary);flex-shrink:0; }
  .mob-drawer-auth { padding:16px;border-top:1px solid var(--color-border); }
  .mob-bottom-nav { display:flex !important;position:fixed;bottom:0;left:0;right:0;height:64px;z-index:998;background:var(--color-bg-base);border-top:1px solid var(--color-border);box-shadow:0 -4px 20px rgba(0,0,0,0.08); }
  .mob-tab-btn { flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:none;background:transparent;cursor:pointer;padding:6px 4px 8px;-webkit-tap-highlight-color:transparent; }
  .mob-tab-icon { font-size:20px;line-height:1; }
  .mob-tab-label { font-size:9px;font-weight:600;color:var(--color-text-muted);white-space:nowrap; }
  .mob-tab-btn--active .mob-tab-icon { filter:drop-shadow(0 0 5px rgba(5,150,105,0.7)); }
  .mob-tab-btn--active .mob-tab-label { color:var(--color-primary);font-weight:800; }
  .hero-banner { padding:80px 20px 32px !important;min-height:auto !important; }
  .hero-title  { font-size:34px !important; }
  .hero-subtitle { font-size:13px !important;max-width:300px;margin:0 auto 24px !important; }
  .hero-shona { font-size:10px !important; }
  .breathe-btn,.breathe-btn-secondary { width:100% !important;min-width:unset !important;padding:15px 20px !important;font-size:15px !important;border-radius:14px !important; }
  .mob-podcast-card { display:block !important;margin:12px 16px 0;background:rgba(10,28,18,0.94);border-radius:16px;padding:14px 16px 10px;cursor:pointer;border:1px solid rgba(74,222,128,0.2);box-shadow:0 4px 20px rgba(0,0,0,0.3);-webkit-tap-highlight-color:transparent; }
  .mob-podcast-card-inner { display:flex;align-items:center;gap:12px; }
  .mob-podcast-ep-badge { width:44px;height:44px;border-radius:12px;background:rgba(5,150,105,0.22);border:1.5px solid rgba(74,222,128,0.28);display:flex;align-items:center;justify-content:center;flex-shrink:0; }
  .mob-podcast-info { flex:1;min-width:0; }
  .mob-podcast-meta { font-size:10px;font-weight:700;color:rgba(74,222,128,0.85);letter-spacing:0.5px;text-transform:uppercase;margin-bottom:2px; }
  .mob-podcast-title { font-size:14px;font-weight:800;color:#fff;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
  .mob-podcast-guest { font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
  .mob-podcast-play { width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.15);border:1.5px solid rgba(255,255,255,0.25);color:#fff;font-size:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0; }
  .mob-podcast-progress { margin-top:10px; }
  .mob-podcast-bar { height:3px;border-radius:3px;background:rgba(255,255,255,0.15);overflow:hidden;margin-bottom:4px; }
  .mob-podcast-fill { height:100%;border-radius:3px;background:#4ade80;transition:width 0.2s linear; }
  .mob-podcast-times { display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,0.4);font-variant-numeric:tabular-nums; }
  .mobile-explore-section { display:block !important;background:var(--color-bg-base);padding:22px 16px 18px;border-top:1px solid var(--color-border); }
  .mobile-explore-title { font-size:17px;font-weight:800;color:var(--color-text-main);margin:0 0 14px; }
  .mobile-explore-grid { display:grid;grid-template-columns:repeat(5,1fr);gap:8px; }
  .mobile-explore-card { display:flex;flex-direction:column;align-items:center;gap:5px;background:var(--color-bg-card);border:1.5px solid var(--color-border);border-radius:14px;padding:11px 4px 9px;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:transform 0.15s; }
  .mobile-explore-card:active { transform:scale(0.95); }
  .mobile-explore-card-icon { width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px; }
  .mobile-explore-card-label { font-size:10px;font-weight:800;color:var(--color-text-main);text-align:center; }
  .mobile-explore-card-sub { font-size:8px;color:var(--color-text-muted);text-align:center;line-height:1.3;opacity:0.8;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
  .glass-card { padding:16px !important; }
  .grid-container { grid-template-columns:1fr !important;padding:0 16px !important; }
}
@media (max-width: 380px) {
  .mobile-explore-grid { grid-template-columns:repeat(3,1fr); }
  .mob-drawer { width:90vw; }
}
.hide-scrollbar::-webkit-scrollbar { display:none; }
.hide-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
`;

fs.writeFileSync('src/index.css', cssBefore + newMobileCSS, 'utf8');
console.log('CSS written OK, length:', (cssBefore + newMobileCSS).length);
