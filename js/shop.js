/* Clinic Management Tech · clinic shop simulation
   The doctor picks a treatment plan, the routine is built from the catalog
   (js/catalog.js), sent to the patient's app, and she buys it. Example data only. */
(() => {
  'use strict';
  const { $, CFG } = window.CMT;
  const { CATALOG, PLANS, photo, T, L } = window.CMT_CATALOG;
  const DOCTOR = T('Dr. Méndez', 'Dra. Méndez'), PATIENT = 'Laura';

  const money = (n) => { try { return new Intl.NumberFormat('en-US', { style: 'currency', currency: CFG.CURRENCY || 'USD', maximumFractionDigits: 0 }).format(n); } catch (_) { return '$' + n; } };
  const els = { plans: $('#plans'), rx: $('#rx'), send: $('#rx-send'), log: $('#log'), ui: $('#shop-ui'), toast: $('#toast'), toastT: $('#toast-t'), reset: $('#sim-reset') };
  const EMPTY = `<li class="empty">${T('Nothing yet. Choose a plan and send the routine.', 'Todavía nada. Elige un plan y envía la rutina.')}</li>`;
  let st, clock, toastTimer;

  const items = (plan) => [...new Set([...plan.am, ...plan.pm])];
  const total = (ids) => ids.reduce((s, id) => s + CATALOG[id].price, 0);
  const plan = () => PLANS.find(p => p.id === st.plan);
  const sentPlan = () => PLANS.find(p => p.id === st.sent);
  const thumb = (id) => `<span class="pimg">${photo(id)}</span>`;

  const log = (text) => {
    if (els.log.querySelector('.empty')) els.log.innerHTML = '';
    clock += 1 + Math.floor(Math.random() * 2);
    const li = document.createElement('li');
    li.innerHTML = `<time>09:${String(clock).padStart(2, '0')}</time><span>${text}</span>`;
    els.log.appendChild(li);
  };
  const toast = (text) => {
    els.toastT.textContent = text; els.toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2600);
  };

  /* ----- clinic console ----- */
  const renderConsole = () => {
    els.plans.innerHTML = PLANS.map(p => `<button type="button" data-p="${p.id}" class="${p.id === st.plan ? 'on' : ''}" aria-pressed="${p.id === st.plan}">${p.name}</button>`).join('');
    const col = (title, ids) => `<div class="rx-col"><h4>${title}</h4><ol>${ids.map(id => `<li>${thumb(id)}<div>${CATALOG[id].name}<span>${CATALOG[id].brand} · ${CATALOG[id].type}</span></div></li>`).join('')}</ol></div>`;
    els.rx.innerHTML = col(T('Morning', 'Mañana'), plan().am) + col(T('Night', 'Noche'), plan().pm);
    els.send.disabled = st.sent === st.plan;
  };
  els.plans.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { st.plan = b.dataset.p; renderConsole(); } });
  els.send.addEventListener('click', () => {
    const p = plan(), n = items(p).length;
    st.sent = p.id; st.stage = 'routine'; st.cart = false;
    log(T(`<b>${DOCTOR}</b> prescribed the <b>${p.name}</b> routine: ${n} products, morning and night.`, `<b>${DOCTOR}</b> recetó la rutina <b>${p.name}</b>: ${n} productos, mañana y noche.`));
    log(T(`Routine and aftercare delivered to ${PATIENT}'s app. The app will remind each step.`, `Rutina y cuidados entregados en la app de ${PATIENT}. La app le recordará cada paso.`));
    toast(T(`New routine from ${DOCTOR}`, `Nueva rutina de ${DOCTOR}`));
    renderConsole(); renderPhone();
  });

  /* ----- patient phone ----- */
  const renderPhone = () => {
    if (st.stage === 'empty') {
      els.ui.innerHTML = `<div class="shop-h"><small>${T('Clinic shop', 'Tienda de la clínica')}</small><b>${T('Your routine', 'Tu rutina')}</b></div><div class="shop-empty">${T('When your doctor prescribes a routine, its products appear here, ready to buy from your clinic.', 'Cuando tu médico te recete una rutina, sus productos aparecen aquí, listos para comprar en tu clínica.')}</div>`;
      return;
    }
    const sent = sentPlan(), ids = items(sent), sum = total(ids);
    if (st.stage === 'done') {
      els.ui.innerHTML = `<div class="done-box"><span class="ic"><svg width="26" height="26"><use href="#i-check"/></svg></span><b>${T('Order', 'Pedido')} #${st.order} ${T('confirmed', 'confirmado')}</b>
        <p>${st.ship === 'pickup' ? T('Ready for pickup at reception. It\'s already paid.', 'Listo para retirar en recepción. Ya está pagado.') : T('On its way. You\'ll get a message with tracking.', 'Va en camino. Te llegará un mensaje con el seguimiento.')}</p>
        <p style="margin-top:8px">${ids.length} ${T('products', 'productos')} · ${money(sum)}</p>
        <p style="color:var(--gold-3);margin-top:8px">${T('We\'ll remind you before your SPF runs out.', 'Te avisamos antes de que se acabe tu SPF.')}</p></div>`;
      return;
    }
    const tag = (id) => [sent.am.includes(id) && T('AM', 'Mañana'), sent.pm.includes(id) && T('PM', 'Noche')].filter(Boolean).join(' · ');
    els.ui.innerHTML = `
      <div class="shop-h"><small>${T('From', 'De')} ${DOCTOR}</small><b>${sent.name}</b></div>
      <div class="shop-list">${ids.map(id => { const c = CATALOG[id]; return `<div class="prod">${thumb(id)}<div><b>${c.name}</b><span>${c.brand} · ${tag(id)}</span></div><em>${money(c.price)}</em></div>`; }).join('')}</div>
      <div class="shop-foot">
        ${st.cart ? `<div class="ship" role="group"><button type="button" data-s="pickup" class="${st.ship === 'pickup' ? 'on' : ''}">${T('Pick up at clinic', 'Retiro en clínica')}</button><button type="button" data-s="delivery" class="${st.ship === 'delivery' ? 'on' : ''}">${T('Delivery', 'Envío')}</button></div>` : ''}
        <div class="tot"><span>${ids.length} ${T('products', 'productos')}</span><b>${money(sum)}</b></div>
        <button class="btn btn-gold" type="button" data-act="${st.cart ? 'order' : 'cart'}">${st.cart ? T('Place order', 'Hacer pedido') : T('Add whole routine to cart', 'Agregar rutina al carrito')}</button>
      </div>`;
  };
  els.ui.addEventListener('click', (e) => {
    const s = e.target.closest('[data-s]');
    if (s) { st.ship = s.dataset.s; return renderPhone(); }
    const b = e.target.closest('[data-act]'); if (!b) return;
    const ids = items(sentPlan()), sum = total(ids);
    if (b.dataset.act === 'cart') {
      st.cart = true;
      log(T(`${PATIENT} added her full routine to the cart: <b>${money(sum)}</b>.`, `${PATIENT} agregó su rutina completa al carrito: <b>${money(sum)}</b>.`));
    } else {
      st.stage = 'done'; st.order = 1040 + Math.floor(Math.random() * 60);
      const spf = ids.map(id => CATALOG[id]).find(c => /SPF/.test(c.name));
      log(T(`Order <b>#${st.order}</b> placed · ${st.ship === 'pickup' ? 'pickup at reception' : 'home delivery'} · stock reserved.`, `Pedido <b>#${st.order}</b> · ${st.ship === 'pickup' ? 'retiro en recepción' : 'envío a domicilio'} · inventario reservado.`));
      log(T(`Sale recorded in ${PATIENT}'s file and in ${DOCTOR}'s sales.`, `Venta registrada en el expediente de ${PATIENT} y en las ventas de la ${DOCTOR}.`));
      if (spf) log(T(`Refill reminder scheduled: <b>${spf.brand} ${spf.name}</b> in ~${spf.days - 5} days.`, `Recordatorio de reposición programado: <b>${spf.brand} ${spf.name}</b> en ~${spf.days - 5} días.`));
      toast(T('Order confirmed', 'Pedido confirmado'));
    }
    renderPhone();
  });

  const reset = () => {
    st = { plan: PLANS[0].id, sent: null, stage: 'empty', cart: false, ship: 'pickup', order: 0 };
    clock = 40; els.log.innerHTML = EMPTY;
    renderConsole(); renderPhone();
  };
  els.reset.addEventListener('click', reset);
  reset();

  // Shared with Savia so she talks about the same routine.
  window.CMT.shop = { CATALOG, PLANS, current: () => PLANS.find(x => x.id === (st.sent || 'laser')), money };
})();
