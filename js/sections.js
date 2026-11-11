/* Clinic Management Tech · scroll-driven sections
   Story (clinic · doctor · patient), clinic console, before & after, GEO.
   Both languages live here: T('English', 'Español'). */
(() => {
  'use strict';
  const L = window.CMT_LANG === 'es' ? 'es' : 'en';
  const T = (en, es) => (L === 'es' ? es : en);
  const CFG = window.CMT_CONFIG || {};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ico = (id) => `<svg><use href="#${id}"/></svg>`;
  const photo = (id) => (window.CMT_CATALOG ? `<span class="pimg">${window.CMT_CATALOG.photo(id)}</span>` : '');
  // Real photos from Unsplash (free license). Swap for your own anytime.
  const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&w=${w}&q=70`;
  // Before & after model photo: CMT_CONFIG.BA_PHOTO (index.html).
  const BA_BEFORE = 'https://i.ibb.co/Rk9m95km/Retrato-cli-nico-de-mujer-natural-1.png';
  const BA = (w) => CFG.BA_PHOTO || 'https://i.ibb.co/TBgRk7nR/Retrato-de-belleza-con-mon-o-despeinado-2.png';

  /* Scroll helper: a tall section with a sticky stage. Calls fn(progress 0..1). */
  const scrollTrack = (section, fn) => {
    const run = () => {
      const r = section.getBoundingClientRect(), span = section.offsetHeight - innerHeight;
      fn(Math.min(Math.max(-r.top / (span || 1), 0), 0.9999));
    };
    addEventListener('scroll', run, { passive: true }); addEventListener('resize', run); run();
  };
  const jump = (section, i, n) => scrollTo({ top: section.offsetTop + (section.offsetHeight - innerHeight) * ((i + .3) / n), behavior: reduce ? 'auto' : 'smooth' });


  /* Screens shown in the story card for each moment */
  const MOCK = {
    chat: () => `<div class="mk">
      <div class="mk-top"><span>◎ ChatGPT</span><small>${T('also in Gemini', 'también en Gemini')}</small></div>
      <div class="mk-q">${T('Which clinic do you recommend for melasma in San José?', '¿Qué clínica me recomiendas para melasma en San José?')}</div>
      <div class="mk-a"><p>${T('These clinics stand out for melasma, with doctor-led plans and good reviews:', 'Estas clínicas destacan para melasma, con planes guiados por médicos y buenas reseñas:')}</p>
        <div class="mk-hit"><i class="logo"></i><div><b>${T('Your clinic', 'Tu clínica')}</b><span>★ 4.9 · 212 ${T('reviews', 'reseñas')} · ${T('Melasma, peels, laser', 'Melasma, peelings, láser')}</span></div></div>
        <i class="mk-sk" style="width:86%"></i><i class="mk-sk" style="width:64%"></i></div>
      <div class="mk-in">${T('Ask anything', 'Pregunta lo que quieras')}<span>↑</span></div></div>`,
    cal: () => {
      const days = T(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], ['Lun', 'Mar', 'Mié', 'Jue', 'Vie']), nums = [17, 18, 19, 20, 21];
      return `<div class="mk mk-calw">
      <div class="mk-top"><span><b class="gcal">31</b> Google Calendar</span><small>${T('November 2026', 'Noviembre 2026')}</small></div>
      <div class="cal-grid">
        <span></span>${days.map((d, i) => `<span class="cal-d${i === 1 ? ' on' : ''}">${d}<b>${nums[i]}</b></span>`).join('')}
        ${['8', '9', '10', '11', '12'].map((h, r) => `<span class="cal-h">${h}:00</span>${days.map((_, c) => `<span class="cal-c">${r === 1 && c === 1 ? `<em class="ev on">${T('Facial assessment', 'Valoración facial')}<small>9:00 – 9:45 · ${T('Your clinic', 'Tu clínica')}</small></em>` : (r === 0 && c === 3) || (r === 3 && c === 0) || (r === 2 && c === 4) ? '<em class="ev"></em>' : ''}</span>`).join('')}`).join('')}
      </div>
      <div class="cal-note">✓ ${T('Deposit paid · reminder 24 h before', 'Reserva pagada · recordatorio 24 h antes')}</div></div>`;
    },
    app: () => `<div class="mk-phone"><img src="assets/app-analysis.jpg" alt="${T('Facial analysis in the patient app', 'Análisis facial en la app de la paciente')}"></div>`,
    pay: () => `<div class="mk mk-payw">
      <div class="mk-top dark"><span><i class="logo"></i> ${T('Clinic console · Checkout', 'Consola · Cobro')}</span><small>Laura G.</small></div>
      <div class="pay-l"><span class="av">PL</span><span>${T('Chemical peel · session 1/4', 'Peeling químico · sesión 1/4')}</span><b>$180</b></div>
      <div class="pay-l">${photo('clean')}<span>Sensilis Purify Essential Cleanser</span><b>$32</b></div>
      <div class="pay-l">${photo('spf')}<span>Colorescience Face Shield SPF 50</span><b>$69</b></div>
      <div class="pay-t"><span>Total</span><b>$281</b></div>
      <div class="pay-m"><span class="on">${T('Card', 'Tarjeta')}</span><span>${T('In app', 'En la app')}</span><span>${T('Cash', 'Efectivo')}</span></div>
      <div class="pay-ok"><span>✓ ${T('Paid', 'Pagado')}</span><span>✓ ${T('Invoice sent', 'Factura enviada')}</span><span>✓ ${T('Stock −2', 'Inventario −2')}</span></div></div>`
  };

  /* =========================================================
     1 · STORY · one patient, three screens
     ========================================================= */
  const STORY = [
    { mock: 'chat', day: T('Day −3', 'Día −3'), t: T('She finds you', 'Te encuentra'),
      c: T('New lead, source: AI search', 'Nuevo prospecto, origen: búsqueda en IA'), d: T('Nothing to do yet', 'Nada que hacer todavía'), p: T('Asks ChatGPT, finds your clinic', 'Pregunta a ChatGPT y encuentra tu clínica') },
    { mock: 'cal', day: T('Day −2', 'Día −2'), t: T('She books', 'Agenda'),
      c: T('Visit in the schedule, deposit paid', 'Cita en agenda, reserva pagada'), d: T('Sees her pre-visit form', 'Ve su formulario previo'), p: T('Books, pays and signs consent', 'Agenda, paga y firma el consentimiento') },
    { mock: 'app', day: T('Day 0', 'Día 0'), t: T('First visit', 'Primera consulta'),
      c: T('Record opens with photos and analysis', 'Se abre el expediente con fotos y análisis'), d: T('Measures, explains, dictates the note', 'Mide, explica y dicta la nota'), p: T('Gets her Day 0 report', 'Recibe su reporte Día 0') },
    { mock: 'pay', day: T('Day 0', 'Día 0'), t: T('Treatment and payment', 'Tratamiento y cobro'),
      c: T('One charge, stock and close updated', 'Un cobro; inventario y cierre al día'), d: T('Logs dose and lot, prescribes routine', 'Registra dosis y lote, receta la rutina'), p: T('Pays and gets her aftercare', 'Paga y recibe sus cuidados') },
    { img: '1620916297397-a4a5402a3c6c', day: T('Weeks 1–6', 'Semanas 1–6'), t: T('At home', 'En casa'),
      c: T('Orders and refills come in', 'Entran pedidos y reposiciones'), d: T('Sees routine adherence', 'Ve si cumple la rutina'), p: T('Follows her routine, reorders in the app', 'Sigue su rutina y repone en la app') },
    { img: '1534528741775-53994a69daeb', day: T('Week 12', 'Semana 12'), t: T('Check-up and loyalty', 'Control y fidelización'),
      c: T('Next session offered, review requested', 'Próxima sesión ofrecida, reseña solicitada'), d: T('Compares against Day 0', 'Compara contra el Día 0'), p: T('Sees her progress, books again', 'Ve su progreso y vuelve a agendar') }
  ];
  const story = document.getElementById('story');
  if (story) {
    story.style.setProperty('--n', STORY.length);
    story.innerHTML = `
      <div class="sx-stage"><div class="wrap">
        <div class="sx-head"><span class="eyebrow">${T('How it connects', 'Cómo se conecta')}</span><h2 class="h-sec">${T('One patient,', 'Una paciente,')} <em>${T('three screens.', 'tres pantallas.')}</em></h2></div>
        <div class="story">
          <div class="st-photo">
            ${STORY.map((s, i) => s.mock ? `<div class="slide mk-${s.mock}" data-i="${i}">${MOCK[s.mock]()}</div>` : `<img class="slide" src="${U(s.img)}" alt="" onerror="this.style.visibility='hidden'" loading="lazy" data-i="${i}">`).join('')}
            <div class="st-cap"><time id="st-day"></time><b id="st-t"></b></div>
          </div>
          <div class="st-side">
            <div class="st-dots" role="tablist">${STORY.map((s, i) => `<button type="button" data-i="${i}" aria-label="${s.t}"><i></i></button>`).join('')}</div>
            <div class="lane"><span class="lane-h"><span class="ic">${ico('i-folder')}</span>${T('Clinic', 'Clínica')}</span><p id="st-c"></p></div>
            <div class="lane"><span class="lane-h"><span class="ic">${ico('i-face')}</span>${T('Doctor', 'Médico')}</span><p id="st-d"></p></div>
            <div class="lane"><span class="lane-h"><span class="ic">${ico('i-phone')}</span>${T('Patient', 'Paciente')}</span><p id="st-p"></p></div>
          </div>
        </div>
      </div></div>`;
    const imgs = [...story.querySelectorAll('.st-photo .slide')], dots = [...story.querySelectorAll('.st-dots button')];
    let cur = -1;
    const show = (i) => {
      if (i === cur) return; cur = i; const s = STORY[i];
      imgs.forEach((im, j) => im.classList.toggle('on', j === i));
      dots.forEach((d, j) => { d.classList.toggle('on', j === i); d.classList.toggle('done', j < i); });
      ['day', 't', 'c', 'd', 'p'].forEach(k => { story.querySelector('#st-' + k).textContent = s[k]; });
      story.querySelectorAll('.lane').forEach(l => { l.classList.remove('swap'); void l.offsetWidth; l.classList.add('swap'); });
    };
    dots.forEach((d, i) => d.addEventListener('click', () => jump(story, i, STORY.length)));
    scrollTrack(story, (p) => show(Math.floor(p * STORY.length)));
  }

  /* =========================================================
     2 · CLINIC CONSOLE · module by module, driven by scroll
     ========================================================= */
  const MODS = [
    { ic: 'i-cal', n: T('Schedule', 'Agenda'),
      k: [[T('Today', 'Hoy'), '18', T('visits', 'citas')], [T('Occupancy', 'Ocupación'), '86%', T('rooms', 'salas')], [T('No-shows', 'Ausencias'), '2%', T('with reminders', 'con recordatorios')]],
      r: [['09:00', T('Laura G. · Assessment', 'Laura G. · Valoración'), T('Deposit paid', 'Reserva pagada')], ['10:30', T('Ana R. · Toxin', 'Ana R. · Toxina'), T('Confirmed', 'Confirmada')], ['15:30', T('Carla V. · Check-up', 'Carla V. · Control'), T('Auto-compare', 'Comparación')]],
      a: T('She books and confirms from her app.', 'Ella agenda y confirma desde su app.') },
    { ic: 'i-folder', n: T('Records', 'Expediente'),
      k: [[T('Records', 'Expedientes'), '1,284', T('342 active', '342 activos')], [T('Consents', 'Consentimientos'), '100%', T('signed online', 'firmados en línea')], [T('Voice notes', 'Notas por voz'), '71%', T('this month', 'este mes')]],
      r: [['LG', T('Laura G. · Melasma · Day 0', 'Laura G. · Melasma · Día 0'), T('Consent ✓', 'Consentimiento ✓')], ['AR', T('Ana R. · Toxin, 3 zones', 'Ana R. · Toxina, 3 zonas'), T('Note signed', 'Nota firmada')], ['SM', T('Sofía M. · Peel 2/4', 'Sofía M. · Peeling 2/4'), T('Photos ✓', 'Fotos ✓')]],
      a: T('She fills in her history before the visit.', 'Ella llena su historia antes de la cita.') },
    { ic: 'i-spark', n: T('Treatments', 'Tratamientos'),
      k: [[T('Sessions', 'Sesiones'), '312', T('this month', 'este mes')], [T('Active plans', 'Planes activos'), '128', T('multi-session', 'de varias sesiones')], [T('Completion', 'Completados'), '74%', T('of plans', 'de los planes')]],
      r: [['TX', T('Toxin · 20 U · Lot B2291', 'Toxina · 20 U · Lote B2291'), T('Dr. Méndez', 'Dra. Méndez')], ['HA', T('Filler · 1 ml · Lot HA-0417', 'Relleno · 1 ml · Lote HA-0417'), 'Dr. Ruiz'], ['PL', T('Peel · session 2 of 4', 'Peeling · sesión 2 de 4'), T('Cabin 2', 'Cabina 2')]],
      a: T('She sees each session done and the next one.', 'Ella ve cada sesión hecha y la próxima.') },
    { ic: 'i-face', n: T('Before & after', 'Antes y después'),
      k: [[T('Comparisons', 'Comparaciones'), '212', T('vs. Day 0', 'vs. Día 0')], [T('Glow gain', 'Mejora Glow'), '+6.2', T('average', 'promedio')], [T('Same conditions', 'Mismas condiciones'), '96%', T('of captures', 'de capturas')]],
      ba: true, r: [],
      a: T('She sees her results when the doctor shares them.', 'Ella ve sus resultados cuando el médico los comparte.') },
    { ic: 'i-bag', n: T('Products', 'Productos'),
      k: [[T('Catalog', 'Catálogo'), '86', T('products', 'productos')], [T('Routines', 'Rutinas'), '143', T('prescribed', 'recetadas')], [T('Shop', 'Tienda'), '$6,480', T('this month', 'este mes')]],
      r: [['@vitc', 'SkinCeuticals C E Ferulic', T('38 sold', '38 vendidos')], ['@spf', 'Colorescience Face Shield SPF 50', T('61 sold', '61 vendidos')], ['@b5', 'La Roche-Posay Cicaplast B5+', T('44 sold', '44 vendidos')]],
      a: T('She buys her routine in one tap.', 'Ella compra su rutina en un toque.') },
    { ic: 'i-box', n: T('Inventory', 'Inventario'),
      k: [['SKUs', '86', T('3 locations', '3 ubicaciones')], [T('Low stock', 'Stock bajo'), '4', T('to reorder', 'por pedir')], [T('Expiring', 'Por vencer'), '3', T('≤ 60 days', '≤ 60 días')]],
      r: [['@b5', T('Cicaplast B5+ · 6 units', 'Cicaplast B5+ · 6 unidades'), T('Low', 'Bajo')], ['HA', T('Filler · exp. Feb 2027', 'Relleno · vence feb 2027'), T('Expiring', 'Por vencer')], ['@spf', T('Face Shield SPF 50 · 22', 'Face Shield SPF 50 · 22'), 'OK']],
      a: T('Her online order reserves stock.', 'Su pedido en línea reserva inventario.') },
    { ic: 'i-doc', n: T('Payments', 'Cobros'),
      k: [[T('Today', 'Hoy'), '$4,920', T('collected', 'cobrado')], [T('Pending', 'Pendiente'), '$640', T('2 patients', '2 pacientes')], [T('In app', 'En la app'), '38%', T('of payments', 'de los pagos')]],
      r: [['LG', T('Laura G. · Peel + kit', 'Laura G. · Peeling + kit'), T('Paid', 'Pagado')], ['AR', T('Ana R. · Deposit', 'Ana R. · Reserva'), T('In app', 'En app')], ['SM', T('Sofía M. · Package', 'Sofía M. · Paquete'), T('2 of 4', '2 de 4')]],
      a: T('She pays from her phone.', 'Ella paga desde su celular.') },
    { ic: 'i-check', n: T('Daily close', 'Cierre'),
      k: [[T('Sales', 'Ventas'), '$4,920', T('today', 'hoy')], [T('Services / products', 'Servicios / productos'), '72/28', '%'], [T('Difference', 'Diferencia'), '$0', T('closed 7:42 p.m.', 'cerrado 7:42 p. m.')]],
      r: [['$', T('Card', 'Tarjeta'), '$3,310'], ['$', T('Cash', 'Efectivo'), '$780'], ['$', T('Transfer / app', 'Transferencia / app'), '$830']],
      a: T('Her in-app payments are already in the close.', 'Sus pagos en la app ya están en el cierre.') },
    { ic: 'i-repeat', n: T('Follow-up', 'Seguimiento'),
      k: [[T('Check-ups', 'Controles'), '5', T('this week', 'esta semana')], [T('Refills', 'Reposiciones'), '12', T('due', 'pendientes')], [T('Inactive', 'Inactivas'), '23', T('90+ days', '90+ días')]],
      r: [['LG', T('Laura G. · Week 12', 'Laura G. · Semana 12'), T('Booked', 'Agendado')], ['AR', T('Ana R. · SPF runs out', 'Ana R. · Se acaba su SPF'), T('Reminder', 'Recordatorio')], ['CV', T('Carla V. · Review', 'Carla V. · Reseña'), '5★']],
      a: T('She gets the reminder and rebooks.', 'Ella recibe el recordatorio y reagenda.') }
  ];
  const cons = document.getElementById('clinics');
  if (cons) {
    cons.style.setProperty('--n', MODS.length);
    cons.innerHTML = `
      <div class="sx-stage"><div class="wrap">
        <div class="sx-head center"><span class="eyebrow both">${T('Clinic console', 'Consola de la clínica')}</span><h2 class="h-sec">${T('Your whole clinic,', 'Toda tu clínica,')} <em>${T('one console.', 'una consola.')}</em></h2></div>
        <div class="laptop">
          <div class="lid"><div class="dash">
            <div class="side" role="tablist"><i class="logo"></i>${MODS.map((m, i) => `<button type="button" role="tab" data-m="${i}">${ico(m.ic)}<span>${m.n}</span><i class="mbar"></i></button>`).join('')}</div>
            <div class="main" id="cons-main" aria-live="polite"></div>
          </div></div>
          <div class="base"></div>
        </div>
      </div></div>`;
    const main = cons.querySelector('#cons-main'), tabs = [...cons.querySelectorAll('.side button')];
    const lead = (x) => x.startsWith('@') ? photo(x.slice(1)) : `<span class="av">${x}</span>`;
    let cur = -1;
    const showMod = (i) => {
      if (i === cur) return; cur = i; const m = MODS[i];
      tabs.forEach((b, j) => { b.classList.toggle('on', j === i); b.setAttribute('aria-selected', j === i); });
      const tab = tabs[i]; if (tab.parentElement.scrollWidth > tab.parentElement.clientWidth) tab.parentElement.scrollTo({ left: tab.offsetLeft - 40, behavior: 'smooth' });
      main.innerHTML = `
        <div class="main-h"><b>${m.n}</b><span>${i + 1} / ${MODS.length}</span></div>
        <div class="kpis k3">${m.k.map(([l, v, s]) => `<div class="kpi"><span>${l}</span><b>${v}</b><i>${s}</i></div>`).join('')}</div>
        ${m.ba ? `<div class="ba-mini"><figure><img src="${(CFG.CASES && CFG.CASES[0] && CFG.CASES[0].before) || BA_BEFORE}" alt="" onerror="this.style.visibility='hidden'"><figcaption>${T('Day 0', 'Día 0')}</figcaption></figure><figure><img src="${(CFG.CASES && CFG.CASES[0] && CFG.CASES[0].after) || BA(400)}" alt="" onerror="this.style.visibility='hidden'"><figcaption>${T('Week 12', 'Semana 12')}</figcaption></figure></div>` : ''}
        ${m.r.length ? `<div class="panel">${m.r.map(([x, t, s]) => `<div class="crow">${lead(x)}<span>${t}</span><em>${s}</em></div>`).join('')}</div>` : ''}
        <div class="in-app">${ico('i-phone')}<p>${m.a}</p></div>`;
    };
    tabs.forEach((b, i) => b.addEventListener('click', () => jump(cons, i, MODS.length)));
    scrollTrack(cons, (p) => {
      const f = p * MODS.length, i = Math.floor(f);
      showMod(i);
      tabs.forEach((b, j) => b.style.setProperty('--f', j < i ? 1 : j === i ? (f - i).toFixed(3) : 0));
    });
  }

  /* =========================================================
     3 · BEFORE & AFTER · scroll moves the divider
     Put your clinic's real, consented cases in CMT_CONFIG.CASES:
     [{ before:'url', after:'url', label:'Melasma · week 12' }]
     Without cases, the demo shows a capture vs. its analysis.
     ========================================================= */
  const results = document.getElementById('results');
  if (results) {
    /* Facial landmarks in % of a 4:5 frame (x 0–100, y 0–125). Adjust per photo with
       CASES[0].landmarks = { before:[[x,y],…], after:[[x,y],…] } (same 21 points, same order). */
    const LM_BEFORE = [[50,18],[37,38],[63,38],[32,45],[44,46],[56,46],[68,45],[50,46],[50,60],[50,64],[29,58],[71,58],[43,73],[57,73],[50,70],[50,77],[31,84],[69,84],[50,96],[27,36],[73,36]];
    const LM_AFTER  = [[50,18],[37,37],[63,37],[32,44.5],[44,46],[56,46],[68,44.5],[50,46],[50,60],[50,64],[28,56],[72,56],[42.5,72.5],[57.5,72.5],[50,69.5],[50,78],[32,82],[68,82],[50,95],[27,36],[73,36]];
    const EDGES = [[0,19],[0,20],[19,10],[20,11],[10,16],[11,17],[16,18],[17,18],[1,3],[1,4],[2,5],[2,6],[3,4],[5,6],[4,7],[5,7],[7,8],[8,9],[9,14],[10,8],[11,8],[3,10],[6,11],[12,14],[14,13],[13,15],[15,12],[16,12],[17,13],[15,18],[10,12],[11,13],[1,19],[2,20]];
    const DEFAULT_CASE = [{ before: 'https://i.ibb.co/Rk9m95km/Retrato-cli-nico-de-mujer-natural-1.png', after: 'https://i.ibb.co/TBgRk7nR/Retrato-de-belleza-con-mon-o-despeinado-2.png', label: T('After', 'Después'), illustrative: true,
      scores: [['Glow', 84, 91], [T('Symmetry', 'Simetría'), 94.7, 95.6], [T('Redness', 'Rojez'), 0.13, 0.06]],
      // [label, before, after, unit, decimals]
      geometry: [
        [T('Upper third', 'Tercio superior'), 33.1, 33.0, '%', 1],
        [T('Middle third', 'Tercio medio'), 34.2, 33.6, '%', 1],
        [T('Lower third', 'Tercio inferior'), 32.7, 33.4, '%', 1],
        [T('Jaw angle', 'Ángulo mandibular'), 128, 124, '°', 0],
        [T('Lip ratio (lower/upper)', 'Proporción labial (inf/sup)'), 1.4, 1.6, '', 1],
        [T('Facial index (height/width)', 'Índice facial (alto/ancho)'), 1.31, 1.34, '', 2]
      ] }];
    const cases = Array.isArray(CFG.CASES) && CFG.CASES.length ? CFG.CASES : DEFAULT_CASE;
    const c = cases[0], lmA = (c.landmarks && c.landmarks.before) || LM_BEFORE, lmB = (c.landmarks && c.landmarks.after) || LM_AFTER;
    const scores = c.scores || [], geom = c.geometry || [];
    const dec = (v) => (String(v).split('.')[1] || '').length;
    const scoreHTML = scores.length ? `<div class="ba-scores">${scores.map(([l, a, z]) => `<div><span>${l}</span><b data-a="${a}" data-b="${z}" data-d="${dec(z)}">${a}</b></div>`).join('')}</div>` : '';
    const geomHTML = geom.length ? `<div class="geo-tbl"><div class="gt-h"><span>${T('Facial geometry', 'Geometría facial')}</span><span>${T('Before', 'Antes')}</span><span>${T('After', 'Después')}</span></div>${geom.map(([l, a, z, u, d]) => {
      const diff = z - a; return `<div class="gt-r"><span>${l}</span><b>${a.toFixed(d)}${u}</b><b class="gt-b" data-a="${a}" data-b="${z}" data-d="${d}" data-u="${u}">${a.toFixed(d)}${u}</b><em class="${diff === 0 ? '' : 'mv'}">${diff > 0 ? '+' : ''}${diff.toFixed(d)}${u}</em></div>`; }).join('')}</div>` : '';
    const mesh = (pts, cls) => `<g class="${cls}">${EDGES.map(([i, j]) => `<line x1="${pts[i][0]}" y1="${pts[i][1]}" x2="${pts[j][0]}" y2="${pts[j][1]}"/>`).join('')}${pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".8"/>`).join('')}</g>`;
    const thirds = (pts) => `<g class="thirds">${[0, 1, 9, 18].map(i => `<line x1="12" x2="88" y1="${pts[i][1]}" y2="${pts[i][1]}"/>`).join('')}<line x1="50" x2="50" y1="10" y2="118" class="mid"/></g>`;
    results.innerHTML = `
      <div class="sx-stage"><div class="wrap ba-wrap">
        <div class="sx-head"><span class="eyebrow">${T('Before & after', 'Antes y después')}</span><h2 class="h-sec">${T('Measured the same way,', 'Medido igual,')} <em>${T('every visit.', 'en cada visita.')}</em></h2>
          <ul class="ba-chips"><li>${T('Same light', 'Misma luz')}</li><li>${T('Same distance', 'Misma distancia')}</li><li>${T('Same angle', 'Mismo ángulo')}</li></ul>
          ${scoreHTML}${geomHTML}
        </div>
        <div class="ba-frame geo-on" id="ba-frame">
          <div class="ba-a"><img src="${c.before}" alt="${T('Before', 'Antes')}" onerror="this.style.visibility='hidden'"><svg class="geo-svg" viewBox="0 0 100 125" preserveAspectRatio="none">${thirds(lmA)}${mesh(lmA, 'm-a')}</svg></div>
          <div class="ba-b" id="ba-b"><img src="${c.after}" alt="${T('After', 'Después')}" onerror="this.style.visibility='hidden'"><svg class="geo-svg" viewBox="0 0 100 125" preserveAspectRatio="none">${thirds(lmB)}${mesh(lmA, 'm-ghost')}${mesh(lmB, 'm-b')}</svg></div>
          <span class="ba-line" id="ba-line"><i>⟷</i></span>
          <span class="ba-tag l">${T('Before', 'Antes')}</span>
          <span class="ba-tag r">${c.label || T('After', 'Después')}</span>
          <button type="button" class="geo-toggle" id="geo-toggle" aria-pressed="true">◇ ${T('Geometry', 'Geometría')}</button>
          <div class="geo-legend"><span><i class="lg-a"></i>${T('Before', 'Antes')}</span><span><i class="lg-b"></i>${T('After', 'Después')}</span></div>
        </div>
        <p class="fine ba-note">${c.illustrative ? T('Illustrative images and values. Show your clinic\'s real cases here, only with consent.', 'Imágenes y valores ilustrativos. Aquí van los casos reales de tu clínica, solo con consentimiento.') : T('Shared with the patient\'s consent.', 'Compartido con el consentimiento de la paciente.')}</p>
      </div></div>`;
    const frame = results.querySelector('#ba-frame'), b = results.querySelector('#ba-b'), line = results.querySelector('#ba-line');
    const nums = [...results.querySelectorAll('.ba-scores b, .gt-b')];
    const tg = results.querySelector('#geo-toggle');
    tg.addEventListener('click', () => { const on = frame.classList.toggle('geo-on'); tg.setAttribute('aria-pressed', on); });
    scrollTrack(results, (p) => {
      const k = Math.min(Math.max((p - .1) / .7, 0), 1), x = 100 - k * 100;
      b.style.clipPath = `inset(0 0 0 ${x}%)`; line.style.left = x + '%';
      frame.style.setProperty('--geo', Math.min(p / .12, 1).toFixed(2));
      nums.forEach(n => { const a = +n.dataset.a, z = +n.dataset.b; n.textContent = (a + (z - a) * k).toFixed(+n.dataset.d) + (n.dataset.u || ''); });
    });
  }

  /* =========================================================
     4 · GEO strategy · phases light up as you scroll
     ========================================================= */
  const PHASES = [
    [T('Week 1', 'Semana 1'), T('Diagnose', 'Diagnóstico'), T('Real patient questions asked to ChatGPT, Gemini, Perplexity and Google AI.', 'Preguntas reales de pacientes a ChatGPT, Gemini, Perplexity y Google IA.')],
    [T('Weeks 2–4', 'Semanas 2–4'), T('Foundations', 'Bases técnicas'), T('Google profile, consistent data, schema.org, doctor credentials.', 'Perfil de Google, datos consistentes, schema.org, credenciales médicas.')],
    [T('Month 2+', 'Mes 2+'), T('Content AI can cite', 'Contenido que la IA cite'), T('One page per treatment and city, signed by your doctors.', 'Una página por tratamiento y ciudad, firmada por tus médicos.')],
    [T('Ongoing', 'Continuo'), T('Reputation', 'Reputación'), T('Reviews requested after every check-up, from the console.', 'Reseñas solicitadas después de cada control, desde la consola.')],
    [T('Monthly', 'Mensual'), T('Measure & adjust', 'Medir y ajustar'), T('Share of AI answers, position and cited sources.', 'Participación en respuestas de IA, posición y fuentes citadas.')]
  ];
  const SIGNALS = [[T('Google profile', 'Perfil de Google'), 82, 94], [T('Reviews', 'Reseñas'), 64, 88], [T('Treatment pages', 'Páginas de tratamientos'), 38, 85], [T('Structured data', 'Datos estructurados'), 20, 90], [T('Mentions', 'Menciones'), 45, 72]];
  const geo = document.getElementById('geo');
  if (geo) {
    geo.style.setProperty('--n', PHASES.length);
    geo.innerHTML = `
      <div class="sx-stage"><div class="wrap geo-wrap">
        <div class="geo-l">
          <span class="eyebrow">${T('GEO strategy', 'Estrategia GEO')}</span>
          <h2 class="h-sec">${T('When a patient asks AI…', 'Cuando una paciente le pregunta a la IA…')} <em>${T('does your clinic show up?', '¿aparece tu clínica?')}</em></h2>
          <ol class="phases">${PHASES.map(([w, t, d], i) => `<li><span class="ph-n">${i + 1}</span><div><span class="ph-w">${w}</span><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
          <a class="btn btn-gold" id="geo-link" href="${CFG.GEO_URL || '#demo'}">${T('Free GEO diagnosis', 'Diagnóstico GEO gratis')} ${ico('i-arrow')}</a>
        </div>
        <div class="geo-r">
          <div class="gpt" aria-hidden="true">
            <div class="top">◎ ChatGPT</div>
            <div class="q">${T('Best clinic for melasma in San José?', '¿Mejor clínica para melasma en San José?')}</div>
            <div class="a"><div class="sk" style="width:90%"></div><div class="hit" id="geo-hit"><i class="logo"></i><div><b>${T('Your clinic', 'Tu clínica')}</b><br><span>${T('cited: website · reviews', 'citada: sitio web · reseñas')}</span></div></div><div class="sk" style="width:70%"></div></div>
          </div>
          <div class="signals">
            <h3>${T('AI visibility signals', 'Señales de visibilidad en IA')}</h3>
            ${SIGNALS.map(([l, a, z]) => `<div class="sig" data-a="${a}" data-b="${z}"><span>${l}</span><b>${a}</b><i style="--v:${a}%"></i></div>`).join('')}
            <p class="fine">${T('Example clinic: before → after GEO work. No one can guarantee AI answers.', 'Clínica de ejemplo: antes → después del trabajo GEO. Nadie puede garantizar lo que responde una IA.')}</p>
          </div>
        </div>
      </div></div>`;
    const lis = [...geo.querySelectorAll('.phases li')], sigs = [...geo.querySelectorAll('.sig')], hit = geo.querySelector('#geo-hit');
    scrollTrack(geo, (p) => {
      const f = p * PHASES.length, i = Math.floor(f);
      lis.forEach((li, j) => { li.classList.toggle('on', j === i); li.classList.toggle('done', j < i); });
      const k = Math.min(p / .85, 1);
      sigs.forEach(s => { const a = +s.dataset.a, z = +s.dataset.b, v = Math.round(a + (z - a) * k); s.querySelector('b').textContent = v; s.querySelector('i').style.setProperty('--v', v + '%'); });
      hit.classList.toggle('lit', k > .55);
    });
  }
})();
