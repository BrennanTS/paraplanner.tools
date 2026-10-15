// Mobile menu: hamburger toggles a full-screen navigation overlay.
(() => {
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("site-nav");
  if (!btn || !nav) return;
  const root = document.documentElement;
  const mobile = matchMedia("(max-width: 720px)");

  function set(open) {
    root.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) nav.querySelector("a")?.focus({ preventScroll: true });
  }

  btn.addEventListener("click", () => set(!root.classList.contains("menu-open")));
  nav.addEventListener("click", e => { if (e.target.closest("a")) set(false); });
  addEventListener("keydown", e => {
    if (e.key === "Escape" && root.classList.contains("menu-open")) { set(false); btn.focus(); }
  });
  mobile.addEventListener("change", e => { if (!e.matches) set(false); });
})();
