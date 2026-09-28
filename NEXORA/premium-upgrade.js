
/* =========================================================
   NEXORA PREMIUM EXPERIENCE 2026
   UI-only enhancements layered on top of the existing store.
   ========================================================= */
(function () {
    "use strict";

    const DEAL_KEY = "nexora_deal_end_v1";

    function pad(n) { return String(n).padStart(2, "0"); }
    function escLocal(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m])); }

    function getDealEnd() {
        let end = Number(localStorage.getItem(DEAL_KEY) || 0);
        if (!end || end < Date.now()) {
            end = Date.now() + 24 * 60 * 60 * 1000;
            localStorage.setItem(DEAL_KEY, String(end));
        }
        return end;
    }

    function ensureAnnouncement() {
        if (document.querySelector(".nexora-announcement")) return;
        const bar = document.createElement("div");
        bar.className = "nexora-announcement";
        bar.innerHTML = '<div class="announcement-inner"><span><b>NEW</b> NEXORA Premium Store is live</span><span class="announcement-divider">•</span><span>Free pickup available</span><span class="announcement-divider">•</span><span>Support replies inside your account</span><button type="button" aria-label="Close announcement">×</button></div>';
        document.body.prepend(bar);
        bar.querySelector("button").addEventListener("click", () => bar.remove());
    }

    function ensureDeals() {
        if (document.querySelector("#nexora-deals") || typeof products === "undefined") return;
        const saleProducts = products.filter(p => p.oldPrice && p.oldPrice > p.price).slice(0, 3);
        if (!saleProducts.length) return;
        const section = document.createElement("section");
        section.className = "section nexora-deals-section";
        section.id = "nexora-deals";
        section.innerHTML = `
            <div class="container">
                <div class="deal-hero reveal visible">
                    <div class="deal-copy">
                        <span class="section-label">LIMITED OFFER</span>
                        <h2>დღეს უფრო <em>ჭკვიანურად</em> იყიდე.</h2>
                        <p>შერჩეული პროდუქტები სპეციალური ფასით. შეთავაზება დროებითია.</p>
                        <div class="deal-timer" id="nexora-deal-timer"><span><b>00</b><small>საათი</small></span><i>:</i><span><b>00</b><small>წუთი</small></span><i>:</i><span><b>00</b><small>წამი</small></span></div>
                    </div>
                    <div class="deal-products">${saleProducts.map(p => {
                        const pct = Math.round((1 - p.price / p.oldPrice) * 100);
                        return `<button class="deal-product" type="button" data-deal-product="${p.id}"><span class="deal-product-badge">-${pct}%</span><span class="deal-product-art"><span>${escLocal(p.brand)}</span></span><span class="deal-product-name">${escLocal(p.name)}</span><strong>${formatPrice(p.price)}</strong><del>${formatPrice(p.oldPrice)}</del><small>${escLocal(p.storage)} • ${escLocal(p.color)}</small></button>`;
                    }).join("")}</div>
                </div>
            </div>`;
        const target = document.querySelector("#categories") || document.querySelector(".categories-section");
        if (target) target.parentNode.insertBefore(section, target);
        else document.querySelector("main")?.appendChild(section);
        section.querySelectorAll("[data-deal-product]").forEach(b => b.addEventListener("click", () => openProductModal(Number(b.dataset.dealProduct))));
    }

    function updateDealTimer() {
        const box = document.querySelector("#nexora-deal-timer");
        if (!box) return;
        let diff = Math.max(0, getDealEnd() - Date.now());
        const h = Math.floor(diff / 3600000); diff -= h * 3600000;
        const m = Math.floor(diff / 60000); diff -= m * 60000;
        const s = Math.floor(diff / 1000);
        const spans = box.querySelectorAll("b");
        if (spans[0]) spans[0].textContent = pad(h);
        if (spans[1]) spans[1].textContent = pad(m);
        if (spans[2]) spans[2].textContent = pad(s);
    }

    function ensureTrustStrip() {
        if (document.querySelector(".nexora-trust-strip")) return;
        const strip = document.createElement("section");
        strip.className = "nexora-trust-strip";
        strip.innerHTML = `<div class="container"><div class="trust-grid"><div><span class="trust-icon">✓</span><strong>Secure checkout</strong><small>შეკვეთის flow დაცულია</small></div><div><span class="trust-icon">↗</span><strong>Fast delivery</strong><small>აირჩიე Standard ან Express</small></div><div><span class="trust-icon">◉</span><strong>24/7 Support</strong><small>Ticket + chat ერთ სივრცეში</small></div><div><span class="trust-icon">⌁</span><strong>Easy returns</strong><small>დეტალები Support-თან</small></div></div></div>`;
        const shop = document.querySelector(".shop-section");
        if (shop) shop.parentNode.insertBefore(strip, shop.nextSibling);
    }

    function ensureMobileDock() {
        if (document.querySelector(".nexora-mobile-dock")) return;
        const dock = document.createElement("nav");
        dock.className = "nexora-mobile-dock";
        dock.innerHTML = `
            <button type="button" data-dock="home"><span>⌂</span><small>მთავარი</small></button>
            <button type="button" data-dock="shop"><span>▦</span><small>მაღაზია</small></button>
            <button type="button" data-dock="favorites"><span>♡</span><small>Wishlist</small></button>
            <button type="button" data-dock="cart"><span>🛒</span><small>კალათა</small><b id="dock-cart-count">0</b></button>
            <button type="button" data-dock="account"><span>◉</span><small>Account</small></button>`;
        document.body.appendChild(dock);
        dock.querySelector('[data-dock="home"]').onclick = () => location.hash = "home";
        dock.querySelector('[data-dock="shop"]').onclick = () => document.querySelector("#shop")?.scrollIntoView({behavior:"smooth"});
        dock.querySelector('[data-dock="favorites"]').onclick = () => typeof openWishlist === "function" && openWishlist();
        dock.querySelector('[data-dock="cart"]').onclick = () => typeof openCart === "function" && openCart();
        dock.querySelector('[data-dock="account"]').onclick = () => typeof openAccount === "function" && openAccount();
        syncDockCart();
    }

    function syncDockCart() {
        const a = document.querySelector("#cart-count");
        const b = document.querySelector("#dock-cart-count");
        if (a && b) b.textContent = a.textContent;
    }

    function ensureBackTop() {
        if (document.querySelector("#nexora-back-top")) return;
        const b = document.createElement("button");
        b.id = "nexora-back-top";
        b.type = "button";
        b.innerHTML = "↑";
        b.setAttribute("aria-label", "Back to top");
        document.body.appendChild(b);
        b.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));
        window.addEventListener("scroll", () => b.classList.toggle("show", window.scrollY > 700));
    }

    function ensureScrollProgress() {
        if (document.querySelector(".nexora-scroll-progress")) return;
        const p = document.createElement("div");
        p.className = "nexora-scroll-progress";
        document.body.appendChild(p);
        function update() {
            const doc = document.documentElement;
            const total = doc.scrollHeight - doc.clientHeight;
            p.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
        }
        window.addEventListener("scroll", update, {passive:true});
        update();
    }

    function patchCartCount() {
        const original = window.updateCartCount;
        if (typeof original !== "function" || original.__premiumWrapped) return;
        const wrapped = function() { original.apply(this, arguments); syncDockCart(); };
        wrapped.__premiumWrapped = true;
        window.updateCartCount = wrapped;
    }

    function start() {
        ensureAnnouncement();
        ensureDeals();
        ensureTrustStrip();
        ensureMobileDock();
        ensureBackTop();
        ensureScrollProgress();
        patchCartCount();
        updateDealTimer();
        setInterval(updateDealTimer, 1000);
        setInterval(syncDockCart, 800);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(start, 150));
    else setTimeout(start, 150);
})();
