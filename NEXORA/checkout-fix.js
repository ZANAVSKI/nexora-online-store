/* NEXORA checkout hardening: one real checkout path, no demo interception. */
(function () {
  'use strict';

  function qs(s) { return document.querySelector(s); }
  function token() { return localStorage.getItem('nexora_access_token') || ''; }
  function toast(msg, type) {
    if (typeof window.showToast === 'function') window.showToast(msg, type || 'error');
  }
  function cartItems() {
    return (typeof window.NEXORA_GET_CART === 'function') ? window.NEXORA_GET_CART() : [];
  }
  function openCheckoutReal() {
    var items = cartItems();
    if (!items.length) {
      toast('კალათა ცარიელია', 'error');
      return;
    }
    var modal = qs('#checkout-modal');
    if (!modal) {
      toast('Checkout ფორმა ვერ მოიძებნა', 'error');
      return;
    }
    if (typeof window.updateCheckoutSummary === 'function') window.updateCheckoutSummary();
    modal.classList.add('active', 'open');
    document.body.classList.add('modal-open');
  }

  async function submitRealOrder(form) {
    var items = cartItems();
    if (!items.length) { toast('კალათა ცარიელია', 'error'); return; }

    var name = (form.querySelector('[name="name"]')?.value || '').trim();
    var email = (form.querySelector('[name="email"]')?.value || '').trim();
    var phone = (form.querySelector('[name="phone"]')?.value || '').trim();
    var city = (form.querySelector('[name="city"]')?.value || '').trim();
    var address = (form.querySelector('[name="address"]')?.value || '').trim();
    var delivery = (form.querySelector('[name="delivery"]')?.value || 'standard');
    var payment = (form.querySelector('[name="payment"]:checked')?.value || 'cash');
    var note = (form.querySelector('[name="note"]')?.value || '').trim();

    if (!name || !phone || !city || !address) {
      toast('გთხოვ ყველა საჭირო ველი შეავსო', 'error');
      return;
    }

    var payload = {
      items: items.map(function (x) {
        return {
          id: Number(x.id),
          variantId: Number(x.variantId || 0),
          quantity: Math.max(1, Math.floor(Number(x.quantity) || 1))
        };
      }),
      name: name,
      email: email,
      phone: phone,
      city: city,
      address: address,
      delivery: delivery,
      payment: payment,
      note: note,
      promoCode: ''
    };

    var promo = null;
    try {
      promo = JSON.parse(localStorage.getItem('nexora_v2') || '{}').promo || null;
    } catch (_) {}
    if (promo && promo.code) payload.promoCode = String(promo.code);

    var subtotal = items.reduce(function (sum, item) {
      var product = (typeof window.getProductById === 'function') ? window.getProductById(item.id) : null;
      if (!product) return sum;
      var qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
      return sum + Number(product.price || 0) * qty;
    }, 0);
    var deliveryFee = delivery === 'express' ? 10 : delivery === 'pickup' ? 0 : 5;
    payload.discount = promo ? Math.round(subtotal * Number(promo.discount || 0) / 100) : 0;

    var headers = { 'Content-Type': 'application/json' };
    if (token()) headers.Authorization = 'Bearer ' + token();

    var button = form.querySelector('button[type="submit"]');
    var oldText = button ? button.innerHTML : '';
    if (button) { button.disabled = true; button.innerHTML = 'იქმნება შეკვეთა...'; }

    try {
      var res = await fetch('/api/orders', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
      var body = {};
      try { body = await res.json(); } catch (_) {}
      if (!res.ok) throw new Error(body.error || 'შეკვეთა ვერ შეიქმნა');

      if (!body.orderId) throw new Error('სერვერმა შეკვეთის ნომერი არ დააბრუნა');

      if (typeof window.NEXORA_SET_CART === 'function') window.NEXORA_SET_CART([]);
      if (typeof window.saveStorage === 'function') window.saveStorage();
      if (typeof window.updateCartCount === 'function') window.updateCartCount();
      if (typeof window.renderCart === 'function') window.renderCart();
      if (typeof window.closeCheckout === 'function') window.closeCheckout();
      if (typeof window.closeCart === 'function') window.closeCart();

      toast('შეკვეთა #' + body.orderId + ' წარმატებით შეიქმნა', 'success');
      if (typeof window.NEXORA_SHOW_ORDER_SUCCESS === 'function') {
        window.NEXORA_SHOW_ORDER_SUCCESS(body.order || { id: body.orderId, total: 0 });
      }
    } catch (err) {
      toast(err && err.message ? err.message : 'შეკვეთა ვერ შეიქმნა', 'error');
    } finally {
      if (button) { button.disabled = false; button.innerHTML = oldText; }
    }
  }

  document.addEventListener('click', function (event) {
    var button = event.target && event.target.closest ? event.target.closest('[data-checkout], .checkout-btn') : null;
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    openCheckoutReal();
  }, true);

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form || form.id !== 'checkout-form') return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    submitRealOrder(form);
  }, true);

  window.NEXORA_OPEN_CHECKOUT = openCheckoutReal;
})();
