/* Savia · AI patient assistant (demo)
   With CMT_CONFIG.ENDPOINT she uses your Apps Script backend (action:'chat',
   audience:'patient'); otherwise a local rules engine answers. */
(() => {
  'use strict';
  const { $, $$, post, CFG, T, L } = window.CMT;
  const PATIENT = { glow: 84, symmetry: 94.7, proportion: 0.92, forehead: 0.74, redness: 0.13, chin: 0.74, eyes: 0 };
  const ag = { body: $('#ag-body'), input: $('#ag-text'), send: $('#ag-send'), lead: {}, transcript: [], flow: null, awaiting: null, busy: false, started: false,
    mode: CFG.ENDPOINT ? 'llm' : 'local', sid: 'savia-' + Date.now().toString(36), tz: Intl.DateTimeFormat().resolvedOptions().timeZone || '' };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (v) => esc(v).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const down = () => { ag.body.scrollTop = ag.body.scrollHeight; };
  const pad = (n) => String(n).padStart(2, '0');

  /* ----- routine text, from the same catalog as the shop ----- */
  const routineText = () => {
    const s = window.CMT.shop; if (!s) return T('Your routine is in the **My routine** tab of the app.', 'Tu rutina está en la pestaña **Mi rutina** de la app.');
    const p = s.current(), line = (ids) => ids.map(id => `${s.CATALOG[id].brand} ${s.CATALOG[id].name}`).join(' · ');
    return T(`Your **${p.name}** routine:\n\n**Morning**: ${line(p.am)}.\n**Night**: ${line(p.pm)}.\n\nAll of it is in the **Clinic shop** tab: pick it up at reception or get it delivered.`,
      `Tu rutina **${p.name}**:\n\n**Mañana**: ${line(p.am)}.\n**Noche**: ${line(p.pm)}.\n\nTodo está en la pestaña **Tienda de la clínica**: retíralo en recepción o recíbelo en casa.`);
  };

  /* ----- booking flow ----- */
  const DOW = T(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']), MON = T(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']);
  const nextDays = () => { const out = [], d = new Date(); while (out.length < 6) { d.setDate(d.getDate() + 1); if (d.getDay()) out.push({ label: L === 'es' ? `${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}` : `${DOW[d.getDay()]} ${MON[d.getMonth()]} ${d.getDate()}`, iso: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` }); } return out; };
  const to24 = (h) => { const m = String(h).toLowerCase().match(/(\d{1,2})(?::(\d{2}))?\s*(a\.?\s?m|p\.?\s?m)?/); if (!m) return ''; let H = +m[1]; if (m[3] && m[3][0] === 'p' && H < 12) H += 12; if (m[3] && m[3][0] === 'a' && H === 12) H = 0; return H > 23 ? '' : `${pad(H)}:${m[2] || '00'}`; };
  const LABELS = T({ nombre: 'Name', motivo: 'Visit', dia: 'Day', hora: 'Time', whatsapp: 'WhatsApp' }, { nombre: 'Nombre', motivo: 'Motivo', dia: 'Día', hora: 'Hora', whatsapp: 'WhatsApp' });
  const FIELDS = [
    { k: 'nombre', q: T('Of course. What name is the appointment under?', 'Claro. ¿A nombre de quién agendo la cita?'), parse: (t) => t.replace(/^(my name is|i am|i'm|it's|under|me llamo|soy|a nombre de|mi nombre es)\s+/i, '').replace(/[.!,]+$/, '').split(/\s+/).slice(0, 4).map(w => w[0].toUpperCase() + w.slice(1)).join(' ') },
    { k: 'motivo', pre: (l) => T(`Thanks, **${l.nombre.split(' ')[0]}**. `, `Gracias, **${l.nombre.split(' ')[0]}**. `), q: T('What is the visit for?', '¿Para qué es la cita?'), chips: T(['Follow-up check-up', 'Treatment session', 'New facial analysis', 'Something else'], ['Control de seguimiento', 'Sesión de tratamiento', 'Nuevo análisis facial', 'Otra cosa']) },
    { k: 'dia', q: T('Which day suits you?', '¿Qué día te queda bien?'), days: true },
    { k: 'hora', q: T('And what time?', '¿Y a qué hora?'), chips: T(['9:00 a.m.', '11:00 a.m.', '2:00 p.m.', '4:30 p.m.', 'Another time'], ['9:00 a. m.', '11:00 a. m.', '2:00 p. m.', '4:30 p. m.', 'Otra hora']) },
    { k: 'whatsapp', q: T('Last one: which WhatsApp number should the clinic confirm on? Include the country code.', 'Última: ¿a qué WhatsApp te confirma la clínica? Incluye el código de país.'), tel: true,
      validate: (t) => t.replace(/\D/g, '').length >= 8 || T('That number looks incomplete. Please include the country code, for example **+1 305 555 0123**.', 'Ese número parece incompleto. Incluye el código de país, por ejemplo **+506 8888 7777**.') }
  ];
  const nextField = () => FIELDS.find(f => !ag.lead[f.k]);

  /* ----- knowledge base ----- */
  const MENU = T(['Explain my results', 'Which products are in my routine?', 'Aftercare after my session', 'Book my next check-up'],
    ['Explícame mis resultados', '¿Qué productos lleva mi rutina?', 'Cuidados después de mi sesión', 'Agendar mi próximo control']);
  // Patterns match English and Spanish; replies follow the page language.
  const KB = [
    [/explain my results|my results|my analysis|my report|my numbers|how did i do|mis resultados|mi análisis|mi analisis|mi reporte|explícame|explicame/i, T(
      `Here's your Day 0 analysis in plain words:\n\n• **Glow ${PATIENT.glow}/100**: your overall starting point.\n• **Symmetry ${PATIENT.symmetry}/100**: both sides are very balanced.\n• **Proportion ${PATIENT.proportion}**: your facial thirds are close to even.\n• **Cheek redness ${PATIENT.redness}**: low, your cheeks look calm.\n• **Forehead luminosity ${PATIENT.forehead}**: good, even light.\n\nAt every check-up we measure the same way and compare. Your doctor will go over it with you; this isn't a diagnosis.`,
      `Este es tu análisis Día 0 en palabras simples:\n\n• **Glow ${PATIENT.glow}/100**: tu punto de partida general.\n• **Simetría ${PATIENT.symmetry}/100**: ambos lados están muy equilibrados.\n• **Proporción ${PATIENT.proportion}**: tus tercios faciales están casi parejos.\n• **Rojez en mejillas ${PATIENT.redness}**: baja, tus mejillas se ven tranquilas.\n• **Luminosidad de la frente ${PATIENT.forehead}**: buena y pareja.\n\nEn cada control medimos igual y comparamos. Tu médico lo revisa contigo; esto no es un diagnóstico.`)],
    [/glow/i, T(`Your **Glow score is ${PATIENT.glow}**. It combines structure, balance and skin into one number from 0 to 100. It's your starting point, and you'll see it move in **My progress**.`,
      `Tu **puntaje Glow es ${PATIENT.glow}**. Combina estructura, equilibrio y piel en un número de 0 a 100. Es tu punto de partida y lo verás avanzar en **Mi progreso**.`)],
    [/symmetr|balanc|simetr|equilibr/i, T(`Your **symmetry is ${PATIENT.symmetry} out of 100**. Each point is compared with its pair on the other side. Above 90 is very balanced; nobody is a perfect 100.`,
      `Tu **simetría es ${PATIENT.symmetry} de 100**. Cada punto se compara con su par del otro lado. Más de 90 es muy equilibrado; nadie tiene un 100 perfecto.`)],
    [/proportion|thirds|proporci|tercios/i, T(`Your **proportion index is ${PATIENT.proportion}**, where 1.00 would mean the three thirds of your face are exactly even. Yours are well balanced.`,
      `Tu **índice de proporción es ${PATIENT.proportion}**, donde 1.00 sería que los tres tercios de tu cara son exactamente iguales. Los tuyos están bien equilibrados.`)],
    [/red(ness)?\b|cheek|irritat|sensitiv|rojez|rojeces|mejilla|irrita|sensib/i, T(`Your **cheek redness is ${PATIENT.redness}** on a 0 to 1 scale, which is low. If it rises after a session it's usually temporary; your soothing cream helps, and the doctor compares it at your check-up.`,
      `Tu **rojez en mejillas es ${PATIENT.redness}** en una escala de 0 a 1, o sea baja. Si sube después de una sesión suele ser temporal; tu crema calmante ayuda y el médico lo compara en tu control.`)],
    [/refill|run(s|ning)? out|reorder|re-order|empty|repon|reposici|se acab|se me acab|volver a pedir/i, T(
      'I keep track of that for you. A few days before a product runs out, I\'ll send you a **reorder link** to the clinic shop, so you never skip a step. You can also reorder anytime from **Clinic shop**.',
      'Yo me encargo de eso. Unos días antes de que se acabe un producto te envío un **enlace para reponerlo** en la tienda de la clínica, para que no te saltes ningún paso. También puedes pedirlo cuando quieras desde **Tienda de la clínica**.')],
    [/buy|order|shop|store|purchase|where (can|do) i (get|find)|price of|how much is|comprar|compro|pedido|tienda|dónde (lo )?consigo|donde (lo )?consigo|cuánto cuesta|cuanto cuesta/i, 'shop'],
    [/routine|products?|morning|night|cream|serum|cleanser|skin ?care|rutina|productos?|mañana|noche|crema|sérum|serum|limpiador|colorescience|sensilis|skinceuticals|isdin|heliocare|roche/i, 'routine'],
    [/makeup|after (my|the|today'?s)?\s?(session|treatment)|aftercare|post[- ]?treatment|gym|sauna|exercise|maquill|después de (mi|la) sesi|despues de (mi|la) sesi|cuidados|post ?tratamiento|gimnasio|ejercicio/i, T(
      'General aftercare for the first days:\n\n• **No makeup for 24 hours.** After that, your tinted SPF works as light coverage.\n• Avoid sun, sauna and intense exercise for **48 hours**.\n• Wash gently with lukewarm water and your cleanser.\n• **SPF 50** every morning.\n\nAlways follow the specific instructions your doctor gave you. If something doesn\'t feel right, tell me and I\'ll alert the clinic.',
      'Cuidados generales para los primeros días:\n\n• **Sin maquillaje por 24 horas.** Después, tu SPF con color sirve como cobertura ligera.\n• Evita sol, sauna y ejercicio intenso por **48 horas**.\n• Lava con suavidad, con agua tibia y tu limpiador.\n• **SPF 50** todas las mañanas.\n\nSigue siempre las indicaciones específicas de tu médico. Si algo no se siente bien, dímelo y aviso a la clínica.')],
    [/sunscreen|spf|\bsun\b|protector|bloqueador|\bsol\b/i, T('Yes: **SPF 50 every morning**, and reapply every 2 to 3 hours outdoors. It\'s the step that protects your results the most. Yours is in your routine and in the clinic shop.',
      'Sí: **SPF 50 todas las mañanas**, y reaplica cada 2 a 3 horas si estás al aire libre. Es el paso que más protege tus resultados. El tuyo está en tu rutina y en la tienda de la clínica.')],
    [/diagnos|disease|is (it|this) (bad|serious|normal)|should i worry|cancer|mole|enfermedad|es grave|es normal|me preocupo|lunar/i, T('I can explain your readings, but I can\'t give a diagnosis. Your doctor is the right person for that. Shall I **book a check-up** or send your question to the team?',
      'Puedo explicarte tus lecturas, pero no puedo dar un diagnóstico. Para eso está tu médico. ¿Te **agendo un control** o le paso tu pregunta al equipo?')],
    [/reschedul|cancel|change my (appointment|visit)|reprogram|cambiar (mi|la) cita|mover (mi|la) cita/i, 'resched'],
    [/privacy|who can see|my data|my photos|delete|privacidad|quién ve|quien ve|mis datos|mis fotos|borrar/i, T('Your photos and results are only visible to you and your clinic\'s team. The clinic can walk you through your data anytime.',
      'Tus fotos y resultados solo los ven tú y el equipo de tu clínica. La clínica te explica tus datos cuando quieras.')],
    [/next (visit|check)|how often|when should i (come|return)|próximo control|proximo control|cada cuánto|cada cuanto|cuándo vuelvo|cuando vuelvo/i, T('Most plans include a **check-up every 4 to 6 weeks**, compared with your Day 0. Want me to book the next one?',
      'La mayoría de los planes incluye un **control cada 4 a 6 semanas**, comparado con tu Día 0. ¿Te agendo el próximo?')],
    [/thank|great|perfect|awesome|gracias|genial|perfecto|excelente/i, T('You\'re welcome! I\'m here whenever you need me.', '¡Con gusto! Aquí estoy cuando me necesites.')]
  ];
  const URGENT = /pain|hurt|swell|bleed|fever|allerg|\brash|blister|infect|emergenc|can'?t breathe|trouble breathing|bruis|dolor|duele|hinch|inflam|sangr|fiebre|alergi|ampolla|infecc|emergencia|no puedo respirar|moret/i;
  const isBook = (t) => /\b(book|appointment|schedule|reserve|check-?up|next visit|agendar|agenda|agéndame|agendame|cita|reservar|control)\b/i.test(t);
  const isQ = (t) => /[?¿]/.test(t) || /^(what|how|which|can|could|do|does|is|are|will|should|why|when|qué|que|cómo|como|cuál|cual|puedo|se puede|por qué|cuándo|cuando)\b/i.test(t);

  /* ----- UI helpers ----- */
  const addMsg = (who, text) => { const d = document.createElement('div'); d.className = 'msg ' + who; d.innerHTML = fmt(text); ag.body.appendChild(d); ag.transcript.push({ role: who === 'me' ? 'user' : 'model', text }); down(); };
  const typing = () => { const t = document.createElement('div'); t.className = 'typing'; t.innerHTML = '<i></i><i></i><i></i>'; ag.body.appendChild(t); down(); return t; };
  const bot = async (text) => { const t = typing(); await sleep(Math.min(450 + text.length * 8, 1500)); t.remove(); addMsg('bot', text); };
  const clearChips = () => $$('.chips', ag.body).forEach(c => c.remove());
  const chips = (list, solidFirst) => {
    const box = document.createElement('div'); box.className = 'chips';
    list.forEach((it, i) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = it.label || it; if (solidFirst && !i) b.className = 'solid'; b.onclick = () => handle(b.textContent, typeof it === 'string' ? null : it); box.appendChild(b); });
    ag.body.appendChild(box); down();
  };
  const card = (h, html) => { const c = document.createElement('div'); c.className = 'card-sum'; c.innerHTML = `<h4>${h}</h4>${html}`; ag.body.appendChild(c); down(); };

  const alertClinic = async (t) => {
    await bot(T('I\'m sorry you\'re dealing with this. I\'m **alerting the clinic team now** so someone contacts you as soon as possible.', 'Lamento que estés pasando por esto. **Estoy avisando ya al equipo de la clínica** para que te contacten lo antes posible.'));
    const s = document.createElement('div'); s.className = 'sos'; s.innerHTML = T('<b>Clinic team alerted</b>Your message was flagged as a priority.', '<b>Equipo de la clínica avisado</b>Tu mensaje quedó marcado como prioridad.'); ag.body.appendChild(s); down();
    await bot(T('If swelling, pain or redness is getting worse quickly, or you have any trouble breathing, **call your local emergency number** right away.', 'Si la inflamación, el dolor o la rojez empeoran rápido, o te cuesta respirar, **llama de inmediato al número de emergencias** de tu país.'));
    post({ action: 'alert', sessionId: ag.sid, message: t, transcript: ag.transcript });
  };

  const answer = async (t) => {
    const hit = KB.find(([re]) => re.test(t));
    if (!hit) { await bot(T('Good question. I\'ll pass it to your clinic\'s team so they can answer you personally. Anything else I can help with?', 'Buena pregunta. Se la paso al equipo de tu clínica para que te responda personalmente. ¿Te ayudo con algo más?')); return chips(MENU); }
    if (hit[1] === 'resched') { await bot(T('No problem, let\'s find a new time.', 'Sin problema, busquemos otra hora.')); ag.lead = { motivo: T('Reschedule', 'Reprogramar') }; ag.flow = 'book'; return askNext(); }
    if (hit[1] === 'routine' || hit[1] === 'shop') {
      await bot(routineText());
      if (!ag.flow) chips(T(['Open the clinic shop', 'When should I reorder?', 'Book my next check-up'], ['Abrir la tienda', '¿Cuándo debo reponer?', 'Agendar mi próximo control']));
      return;
    }
    await bot(hit[1]);
    if (!ag.flow) chips(MENU.filter(m => m.toLowerCase() !== t.toLowerCase()).slice(0, 3));
  };

  const askNext = async (again) => {
    const f = nextField();
    ag.input.setAttribute('inputmode', f && f.tel ? 'tel' : 'text');
    if (!f) return summary();
    await bot((again ? T('Back to your appointment. ', 'Volvamos a tu cita. ') : (f.pre ? f.pre(ag.lead) : '')) + f.q);
    if (f.days) chips(nextDays()); else if (f.chips) chips(f.chips);
  };
  const summary = async () => {
    ag.awaiting = 'confirm';
    await bot(T('Here are your appointment details:', 'Estos son los datos de tu cita:'));
    card(T('Your appointment', 'Tu cita'), `<dl>${Object.keys(LABELS).map(k => `<dt>${LABELS[k]}</dt><dd>${esc(ag.lead[k] || '—')}</dd>`).join('')}</dl>`);
    chips(T(['Send request', 'Change something'], ['Enviar solicitud', 'Cambiar algo']), true);
  };
  const calURL = (l) => {
    if (!l.fecha_iso || !l.hora_24) return '';
    const [y, m, d] = l.fecha_iso.split('-').map(Number), [H, M] = l.hora_24.split(':').map(Number);
    const s = new Date(y, m - 1, d, H, M), e = new Date(s.getTime() + 45 * 60000);
    const f = (x) => `${x.getFullYear()}${pad(x.getMonth() + 1)}${pad(x.getDate())}T${pad(x.getHours())}${pad(x.getMinutes())}00`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(l.motivo + T(' (to be confirmed)', ' (por confirmar)'))}&dates=${f(s)}/${f(e)}${ag.tz ? '&ctz=' + encodeURIComponent(ag.tz) : ''}`;
  };
  const submitBooking = async () => {
    ag.awaiting = null; ag.flow = null;
    await post({ action: 'appointment', sessionId: ag.sid, appointment: { ...ag.lead, estado: 'solicitada', idioma: L }, transcript: ag.transcript, tz: ag.tz });
    const l = ag.lead;
    const hr = String(l.hora).replace(/\.$/, '');
    await bot(T(`Done! I sent your request for **${l.dia}** at **${hr}**. The clinic will confirm on WhatsApp at ${l.whatsapp}.`, `¡Listo! Envié tu solicitud para el **${l.dia}** a las **${hr}**. La clínica te confirma por WhatsApp al ${l.whatsapp}.`));
    const cal = calURL(l);
    if (cal) card(T('Next step', 'Siguiente paso'), `<a class="btn btn-line" href="${cal}" target="_blank" rel="noopener">${T('Add to my calendar', 'Agregar a mi calendario')}</a>`);
    ag.lead = {};
    chips(MENU.slice(0, 3));
  };

  const viaLocal = async (t, item) => {
    if (/^(open the clinic shop|abrir la tienda)$/i.test(t)) { close(); location.hash = '#shop'; return; }
    if (ag.awaiting === 'confirm') {
      if (/^(send|yes\b|confirm|ok|sure|correct|enviar|sí|si\b|confirmo|dale|correcto)/i.test(t)) return submitBooking();
      if (/chang|edit|^no\b|cambiar|editar/i.test(t)) { ag.awaiting = 'edit'; await bot(T('Sure, what would you like to change?', 'Claro, ¿qué quieres cambiar?')); return chips(Object.values(LABELS)); }
      await answer(t); return chips(T(['Send request', 'Change something'], ['Enviar solicitud', 'Cambiar algo']), true);
    }
    if (ag.awaiting === 'edit') {
      const k = Object.keys(LABELS).find(x => LABELS[x].toLowerCase() === t.toLowerCase());
      if (k) { delete ag.lead[k]; if (k === 'dia') delete ag.lead.fecha_iso; if (k === 'hora') delete ag.lead.hora_24; ag.awaiting = null; return askNext(); }
      return chips(Object.values(LABELS));
    }
    if (ag.flow === 'book') {
      const f = nextField(); if (!f) return summary();
      const valid = f.validate ? f.validate(t) === true : true;
      if (!item && isQ(t) && !(f.validate && valid)) { await answer(t); return askNext(true); }
      if (!valid) { await bot(f.validate(t)); return; }
      if (/^(another time|something else|otra hora|otra cosa)$/i.test(t)) { await bot(f.k === 'hora' ? T('Sure, type the time that works for you.', 'Claro, escribe la hora que te sirve.') : T('Tell me briefly what the visit is for.', 'Cuéntame brevemente para qué es la cita.')); return; }
      ag.lead[f.k] = f.parse ? f.parse(t) : t;
      if (f.k === 'dia') ag.lead.fecha_iso = item && item.iso ? item.iso : '';
      if (f.k === 'hora') ag.lead.hora_24 = to24(t);
      return askNext();
    }
    if (/^(hi|hello|hey|good (morning|afternoon|evening)|hola|buenas|buenos días|buenos dias|buenas tardes|buenas noches)[\s!.,]*$/i.test(t)) { await bot(T('Hi! How can I help you today?', '¡Hola! ¿En qué te ayudo hoy?')); return chips(MENU); }
    if (URGENT.test(t)) return alertClinic(t);
    if (isBook(t)) { ag.flow = 'book'; return askNext(); }
    return answer(t);
  };

  const viaLLM = async (t) => {
    const ty = typing();
    try {
      const r = await fetch(CFG.ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'chat', audience: 'patient', lang: L, sessionId: ag.sid, history: ag.transcript.slice(-24), patient: PATIENT, routine: routineText(), appointment: ag.lead, tz: ag.tz, page: location.href }) });
      const j = await r.json();
      if (!j.ok || !j.reply) throw new Error(j.error || 'No reply');
      ty.remove();
      Object.entries(j.appointment || {}).forEach(([k, v]) => { if (v != null && String(v).trim()) ag.lead[k] = String(v).trim(); });
      addMsg('bot', j.reply);
      if (Array.isArray(j.quick_replies) && j.quick_replies.length) chips(j.quick_replies.slice(0, 5));
    } catch (e) { ty.remove(); console.warn('Savia offline, using local mode:', e); ag.mode = 'local'; await viaLocal(t); }
  };

  const handle = async (raw, item, wait) => {
    const text = String(raw || '').trim(); if (!text) return;
    if (!ag.started) await start(true);
    if (wait) while (ag.busy) await sleep(150);
    if (ag.busy) return;
    ag.busy = true; ag.send.disabled = true;
    clearChips(); addMsg('me', text); ag.input.value = ''; grow();
    try { ag.mode === 'llm' && !/^(open the clinic shop|abrir la tienda)$/i.test(text) ? await viaLLM(text) : await viaLocal(text, item); }
    finally { ag.busy = false; ag.send.disabled = false; }
  };
  const start = async (quiet) => {
    if (ag.started) return; ag.started = true; ag.busy = true;
    await bot(T('Hi! I\'m **Savia**, your clinic\'s assistant. Your Day 0 analysis and your routine are ready.', '¡Hola! Soy **Savia**, la asistente de tu clínica. Tu análisis Día 0 y tu rutina ya están listos.'));
    if (!quiet) { await bot(T('I can explain your results, help with your routine and products, or book your next visit.', 'Puedo explicarte tus resultados, ayudarte con tu rutina y productos, o agendar tu próxima cita.')); chips(MENU); }
    ag.busy = false;
  };

  const grow = () => { ag.input.style.height = 'auto'; ag.input.style.height = Math.min(ag.input.scrollHeight, 110) + 'px'; };
  ag.input.addEventListener('input', grow);
  ag.input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); handle(ag.input.value); } });
  $('#ag-form').addEventListener('submit', (e) => { e.preventDefault(); handle(ag.input.value); });

  /* ----- open / close ----- */
  const panel = $('#agent'), launch = $('#ag-launch'), tip = $('#ag-tip');
  const mobile = () => matchMedia('(max-width:640px)').matches;
  const fit = () => {
    if (!panel.classList.contains('open') || !mobile() || !window.visualViewport) { panel.style.height = panel.style.top = ''; return; }
    panel.style.height = visualViewport.height + 'px'; panel.style.top = visualViewport.offsetTop + 'px'; down();
  };
  if (window.visualViewport) { visualViewport.addEventListener('resize', fit); visualViewport.addEventListener('scroll', fit); }
  const open = (ask) => {
    panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false');
    launch.classList.add('on', 'seen'); launch.setAttribute('aria-expanded', 'true');
    tip.classList.remove('show'); document.body.classList.toggle('ag-lock', mobile()); fit();
    if (ask) handle(ask, null, true); else start();
    if (matchMedia('(hover:hover)').matches) setTimeout(() => ag.input.focus({ preventScroll: true }), 300);
  };
  const close = () => {
    panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true');
    launch.classList.remove('on'); launch.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('ag-lock'); fit();
  };
  launch.addEventListener('click', () => panel.classList.contains('open') ? close() : open());
  $('#ag-x').addEventListener('click', () => { close(); launch.focus(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('open')) { close(); launch.focus(); } });
  tip.addEventListener('click', (e) => {
    if (e.target.id === 'ag-tip-x') { tip.classList.remove('show'); try { sessionStorage.setItem('savia-tip', '1'); } catch (_) {} return; }
    open();
  });
  const track = $('#scrolly'); let tipShown = false;
  addEventListener('scroll', () => {
    if (tipShown || ag.started || scrollY < track.offsetTop + track.offsetHeight - innerHeight * .5) return;
    tipShown = true; let dismissed = false; try { dismissed = !!sessionStorage.getItem('savia-tip'); } catch (_) {}
    if (!dismissed) tip.classList.add('show');
  }, { passive: true });
  $$('[data-open-savia]').forEach(a => a.addEventListener('click', (e) => { e.preventDefault(); open(); }));
  $$('[data-ask]').forEach(b => b.addEventListener('click', () => open(b.dataset.ask)));
})();
