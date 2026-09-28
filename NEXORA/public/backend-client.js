/* NEXORA backend bridge: API is the source of truth; localStorage is only a UI cache. */
(function () {
  'use strict';
  const API = '/api';
  const TOKEN_KEY = 'nexora_access_token';
  const STATE_KEY = 'nexora_v2';

  function token(){ return localStorage.getItem(TOKEN_KEY) || ''; }
  function state(){ try { return JSON.parse(localStorage.getItem(STATE_KEY) || '{}') || {}; } catch { return {}; } }
  function saveState(s){ localStorage.setItem(STATE_KEY, JSON.stringify(s)); }
  function headers(json=true){ const h={}; if(json) h['Content-Type']='application/json'; if(token()) h.Authorization='Bearer '+token(); return h; }
  async function request(path, options={}) {
    const res = await fetch(API+path, Object.assign({headers:Object.assign({}, headers(true), options.headers||{})}, options));
    let body=null; try{ body=await res.json(); }catch{}
    if(!res.ok){ const err=new Error(body?.error || 'Request failed'); err.status=res.status; throw err; }
    return body;
  }
  function toast(msg,type='success'){ if(typeof showToast==='function') showToast(msg,type); else console.log(msg); }
  function cacheAuth(user){ const s=state(); s.auth={registered:true,name:user.name,email:user.email}; s.profile={name:user.name,email:user.email}; saveState(s); }
  async function sync() {
    try {
      const p=await request('/products');
      if(Array.isArray(p.products) && typeof products!=='undefined'){ products.splice(0,products.length,...p.products); if(typeof renderProducts==='function') renderProducts(); if(typeof renderEnhancedProducts==='function') renderEnhancedProducts(); }
    } catch(e){ console.warn('Product API sync failed',e.message); }
    if(!token()) return;
    try {
      const me=await request('/me'); cacheAuth(me.user);
      const [orders,tickets,notes,favs]=await Promise.all([request('/orders'),request('/tickets'),request('/notifications'),request('/me/favorites')]);
      const s=state(); s.orders=orders.orders||[]; s.tickets=tickets.tickets||[]; s.notifications=(notes.notifications||[]).map(n=>({id:n.id,title:n.title,body:n.body,time:n.time,read:n.read})); s._favoritesServer=favs.favorites||[]; saveState(s);
      if(typeof favorites!=='undefined' && Array.isArray(favs.favorites)){ favorites.splice(0,favorites.length,...favs.favorites.map(Number)); if(typeof saveStorage==='function') saveStorage(); }
    } catch(e){ if(e.status===401){localStorage.removeItem(TOKEN_KEY);} else console.warn('Account sync failed',e.message); }
    if(typeof updateAccountNav==='function') updateAccountNav();
    if(typeof updateToolBadges==='function') updateToolBadges();
  }

  document.addEventListener('submit', async function(ev){
    const form=ev.target;
    if(!(form instanceof HTMLFormElement)) return;

    if(form.id==='nexora-auth-form'){
      ev.preventDefault(); ev.stopImmediatePropagation();
      const tab=form.closest('.auth-content')?.querySelector('[data-auth-tab].active')?.dataset.authTab || (form.querySelector('[name="name"]')?.value.trim()?'register':'login');
      const email=form.email.value.trim().toLowerCase(), password=form.password.value, name=(form.name?.value.trim()||email.split('@')[0]||'NEXORA Member');
      try{
        const result=await request(tab==='register'?'/auth/register':'/auth/login',{method:'POST',body:JSON.stringify(tab==='register'?{name,email,password}:{email,password})});
        localStorage.setItem(TOKEN_KEY,result.token); cacheAuth(result.user); toast(tab==='register'?'Account წარმატებით შეიქმნა':'NEXORA-ში შესვლა წარმატებულია'); setTimeout(()=>location.reload(),250);
      }catch(e){ toast(e.message,'error'); }
      return;
    }

    if(form.id==='nexora-profile-form'){
      ev.preventDefault(); ev.stopImmediatePropagation();
      try{ const r=await request('/me',{method:'PUT',body:JSON.stringify({name:form.name.value.trim(),email:form.email.value.trim()})}); localStorage.setItem(TOKEN_KEY,r.token); cacheAuth(r.user); toast('პროფილი შენახულია'); setTimeout(()=>location.reload(),250); }catch(e){toast(e.message,'error');}
      return;
    }

    if(form.id==='checkout-form'){
      ev.preventDefault(); ev.stopImmediatePropagation();
      let s=state(); const rawCart=JSON.parse(localStorage.getItem('nexora_cart')||'[]'); if(!rawCart.length){toast('კალათა ცარიელია','error');return;}
      const user=s.auth?.registered?null:null; const data=new FormData(form); let discount=0; try{discount=s.promo?.discount?Math.round(rawCart.reduce((sum,x)=>{const p=(typeof products!=='undefined')?products.find(p=>Number(p.id)===Number(x.id)):null; return sum+(p?p.price*Number(x.quantity||1):0)},0)*Number(s.promo.discount)/100):0;}catch{}
      try{
        const result=await request('/orders',{method:'POST',body:JSON.stringify({items:rawCart,name:String(data.get('name')||'Guest'),email:String(data.get('email')||s.auth?.email||''),phone:String(data.get('phone')||''),city:String(data.get('city')||''),address:String(data.get('address')||''),delivery:String(data.get('delivery')||'standard'),payment:String(data.get('payment')||'cash'),note:String(data.get('note')||''),discount,promoCode:(s.promo?.code||'')})});
        s.orders=s.orders||[]; if(result.order) s.orders.unshift(result.order); s.notifications=s.notifications||[]; s.notifications.unshift({id:Date.now(),title:'შეკვეთა შეიქმნა',body:'Order #'+result.orderId+' წარმატებით დადასტურდა.',time:new Date().toLocaleString('ka-GE')}); s.promo=null; saveState(s); localStorage.setItem('nexora_cart','[]'); if(typeof updateCartCount==='function') updateCartCount(); if(typeof renderCart==='function') renderCart(); toast('შეკვეთა #'+result.orderId+' შეიქმნა'); if(window.NEXORA_SHOW_ORDER_SUCCESS) window.NEXORA_SHOW_ORDER_SUCCESS(result.order);
      }catch(e){toast(e.message,'error');}
      return;
    }

    if(form.id==='support-form'){
      ev.preventDefault(); ev.stopImmediatePropagation();
      if(!token()){ toast('Support-ისთვის ჯერ შედი ანგარიშში','error'); return; }
      try{ const result=await request('/tickets',{method:'POST',body:JSON.stringify({subject:form.subject?.value.trim()||'Support',message:form.message?.value.trim()||''})}); const s=state(); s.tickets=s.tickets||[]; if(result.ticket) s.tickets.unshift(result.ticket); saveState(s); toast('Support ticket შეიქმნა'); form.reset(); }catch(e){toast(e.message,'error');}
      return;
    }

    if(form.classList.contains('review-form')){
      ev.preventDefault(); ev.stopImmediatePropagation();
      if(!token()){toast('შეფასების დასაწერად ანგარიშში უნდა შეხვიდე','error');return;}
      const box=form.closest('.product-review-box'), productId=box?.closest('.modal-product-info')?.dataset?.productId || form.dataset.productId;
      const info=typeof selectedProduct!=='undefined'?selectedProduct:null; const id=Number(productId||info?.id||0);
      try{ await request('/products/'+id+'/reviews',{method:'POST',body:JSON.stringify({rating:Number(form.rating.value),text:String(form.text.value).trim()})}); toast('შეფასება დაემატა'); setTimeout(()=>location.reload(),250);}catch(e){toast(e.message,'error');}
    }
  }, true);

  document.addEventListener('click', async function(ev){
    const b=ev.target.closest('[data-favorite]'); if(!b || !token()) return;
    const id=Number(b.dataset.favorite);
    try { const active=b.classList.contains('active'); await request('/me/favorites/'+id,{method:active?'DELETE':'POST'}); } catch(e){ console.warn('Favorite sync failed',e.message); }
  }, true);

  window.NEXORA_API={request,sync,token,logout:()=>{localStorage.removeItem(TOKEN_KEY);const s=state();s.auth={registered:false,name:'',email:''};saveState(s);location.reload();}};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(sync,300)); else setTimeout(sync,300);
})();

/* Strong checkout confirmation: backend order is the source of truth. */
(function(){
  'use strict';
  function showOrderSuccess(order){
    const old=document.getElementById('nx-order-success'); if(old) old.remove();
    const wrap=document.createElement('div'); wrap.id='nx-order-success'; wrap.className='nx-order-success';
    const money=v=>new Intl.NumberFormat('ka-GE',{maximumFractionDigits:0}).format(Number(v)||0)+' ₾';
    wrap.innerHTML=`<div class="nx-order-success-card"><div class="nx-order-success-icon">✓</div><span class="section-label">ORDER CONFIRMED</span><h2>შეკვეთა წარმატებით შეიქმნა</h2><p>შეკვეთა უკვე ჩაიწერა NEXORA-ს database-ში და Admin-ს გამოუჩნდა.</p><div class="nx-order-success-id">#${String(order.id||'').replace(/[^A-Za-z0-9_-]/g,'')} · ${money(order.total)}</div><button class="btn btn-primary" id="nx-order-success-close">ჩემი შეკვეთების ნახვა →</button></div>`;
    document.body.appendChild(wrap);
    document.getElementById('nx-order-success-close').onclick=()=>{wrap.remove();if(typeof openOrders==='function')openOrders();};
  }
  window.NEXORA_SHOW_ORDER_SUCCESS=showOrderSuccess;
})();
