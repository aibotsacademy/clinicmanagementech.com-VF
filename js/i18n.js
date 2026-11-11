/* Clinic Management Tech · Spanish translation
   index.html is written in English. When the visitor's language is Spanish
   (or they pick ES), every text node and attribute found in ES below is
   replaced. Keys are the English text exactly as it appears (spaces collapsed).
   To edit a Spanish text, change its value here. */
(() => {
  'use strict';
  const lang = window.CMT_LANG === 'es' ? 'es' : 'en';

  const ES = {
    // nav + hero
    'Diagnose my clinic': 'Diagnosticar mi clínica',
    'Before & after': 'Antes y después', 'See how it works': 'Ver cómo funciona', 'Scroll': 'Desliza',
    'One console for your clinic. One app for each patient.': 'Una consola para tu clínica. Una app para cada paciente.',
    'GEO positioning': 'Posicionamiento GEO',
    'The doctor dictates. AI drafts the note, items and invoice for review.': 'El médico dicta. La IA prepara la nota, los ítems y la factura para revisión.',
    'Book and confirm without calling.': 'Agenda y confirma sin llamar.', 'Every visit compared with Day 0.': 'Cada visita comparada con el Día 0.',
    'Morning and night, prescribed by her doctor.': 'Mañana y noche, recetada por su médico.', 'Her routine, in one tap.': 'Su rutina, en un toque.',
    'A direct line to the clinic.': 'Una línea directa con la clínica.', 'Clinic team': 'Equipo de la clínica',
    'Do I have to replace my current system?': '¿Tengo que cambiar mi sistema actual?',
    'No. We start where your clinic needs it most and connect the rest step by step.': 'No. Empezamos donde tu clínica más lo necesita y conectamos el resto paso a paso.',
    'No. It supports the doctor; the decision is always theirs.': 'No. Apoya al médico; la decisión siempre es suya.',
    'The ones your clinic already carries, plus your own line.': 'Las que tu clínica ya trabaja, más tu propia línea.',
    'Where do the before & after photos come from?': '¿De dónde salen las fotos de antes y después?',
    'From your own patients, captured with the app and shared only with their consent.': 'De tus propias pacientes, capturadas con la app y compartidas solo con su consentimiento.',
    'No one can. We improve the signals AI relies on and measure the result every month.': 'Nadie puede. Mejoramos las señales en las que se basa la IA y medimos el resultado cada mes.',
    "Yes. The app and the shop carry your clinic's identity.": 'Sí. La app y la tienda llevan la identidad de tu clínica.',
    '30 minutes, on a video call, with a case like yours.': '30 minutos, por videollamada, con un caso como el tuyo.',
    'Clinic console': 'Consola de la clínica',
    'How it works': 'Cómo funciona', 'Console': 'Consola', 'GEO': 'GEO',
    'What does the clinic console include?': '¿Qué incluye la consola de la clínica?',
    "Schedule, records and consents, treatments, before & after, products, inventory, payments, daily close and follow-up. Every module is connected to the patient's app, so what your team does reaches her and what she does reaches your team.": 'Agenda, expediente y consentimientos, tratamientos, antes y después, productos, inventario, cobros, cierre y seguimiento. Cada módulo está conectado a la app de la paciente: lo que hace tu equipo le llega a ella y lo que hace ella le llega a tu equipo.',
    'Can you guarantee ChatGPT will recommend my clinic?': '¿Pueden garantizar que ChatGPT recomiende mi clínica?',
    'No one can guarantee what an AI will answer. What we do is improve the signals AI assistants rely on (your Google profile, reviews, treatment pages, structured data and mentions) and measure every month how often your clinic appears and is recommended.': 'Nadie puede garantizar lo que responderá una IA. Lo que hacemos es mejorar las señales en las que se basan los asistentes (tu perfil de Google, reseñas, páginas de tratamientos, datos estructurados y menciones) y medir cada mes cuántas veces aparece y se recomienda tu clínica.',
    'Solutions': 'Soluciones', 'Patient app': 'App del paciente', 'Clinic shop': 'Tienda de la clínica', 'Clinics': 'Clínicas', 'FAQ': 'Preguntas',
    'Book a demo': 'Agendar una demo', 'Platform for aesthetic clinics': 'Plataforma para clínicas estéticas',
    'Your clinic, your doctors and your patients,': 'Tu clínica, tus médicos y tus pacientes,', 'connected.': 'conectados.',
    "From the first consultation to care at home: facial analysis, scheduling, records, an AI assistant and a shop for each patient's skincare routine, in one platform.": 'De la primera consulta al cuidado en casa: análisis facial, agenda, expediente, un asistente con IA y una tienda para la rutina de cada paciente, en una sola plataforma.',
    'See the clinic shop': 'Ver la tienda', 'Scroll: this is the patient app': 'Desliza: esta es la app del paciente',
    'Two photos': 'Dos fotos', 'Same conditions,': 'Mismas condiciones,', 'every visit.': 'en cada visita.',
    "The app guides the patient on light, distance and pose, then takes the front and profile photos on its own. Today's image is comparable with the next one.": 'La app guía a la paciente con la luz, la distancia y la pose, y toma sola las fotos de frente y de perfil. La imagen de hoy se puede comparar con la siguiente.',
    'Light': 'Luz', 'Distance': 'Distancia', 'Pose': 'Pose', '468 points': '468 puntos', 'A precise map': 'Un mapa preciso', 'of every face.': 'de cada rostro.',
    'A dense facial mesh locates brows, eyes, nose, lips and jawline. Everything that follows is calculated from these points.': 'Una malla facial densa ubica cejas, ojos, nariz, labios y mandíbula. Todo lo demás se calcula desde estos puntos.',
    'Landmarks': 'Puntos', 'Proportion': 'Proporción', 'and symmetry.': 'y simetría.',
    "Facial thirds and left–right balance, as numbers. A support for the professional's assessment, never a diagnosis.": 'Tercios faciales y equilibrio entre ambos lados, en números. Un apoyo para la valoración profesional, nunca un diagnóstico.',
    'Symmetry': 'Simetría', 'Skin': 'Piel', 'Skin,': 'La piel,', 'zone by zone.': 'zona por zona.',
    'Forehead, cheeks, T-zone, chin and eye contour are read separately, so the doctor can match each zone with a treatment and a home routine.': 'Frente, mejillas, zona T, mentón y contorno de ojos se leen por separado, para que el médico asigne a cada zona un tratamiento y una rutina en casa.',
    'Forehead': 'Frente', 'Redness': 'Rojez', 'Glow': 'Glow', 'One score that': 'Un puntaje que', 'moves with the plan.': 'avanza con el plan.',
    "Structure and skin summarized in a Glow score. It is the patient's Day 0, and it rises as treatments and the routine take effect.": 'Estructura y piel resumidas en un puntaje Glow. Es el Día 0 de la paciente y sube a medida que el tratamiento y la rutina hacen efecto.',
    'Day': 'Día', 'Report': 'Reporte', 'A report that': 'Un reporte que', 'stays with her.': 'se queda con ella.',
    'The patient gets a plain-language report in her app, with the routine her doctor recommends. The clinic sees everything in its console.': 'La paciente recibe en su app un reporte en palabras simples, con la rutina que su médico recomienda. La clínica lo ve todo en su consola.',
    'Photos': 'Fotos', 'Next': 'Próxima', 'auto-compare': 'comparación automática',
    'One platform': 'Una plataforma', '3 sides': '3 lados', 'Clinic console': 'Consola de la clínica', 'Schedule · records · sales': 'Agenda · expediente · ventas',
    'Doctor': 'Médico', 'Analysis · notes · routine': 'Análisis · notas · rutina', 'Visits · progress · shop': 'Citas · progreso · tienda',
    'Capture checks': 'Controles de captura', 'Photo 1 of 2': 'Foto 1 de 2', 'Pass': 'OK', 'Recognition': 'Reconocimiento', 'Front photo': 'Foto frontal',
    'Brows, eyes, nose, lips, jawline': 'Cejas, ojos, nariz, labios, mandíbula', 'Structure': 'Estructura', 'Proportion index': 'Índice de proporción',
    'Skin by zone': 'Piel por zona', 'Index 0–1': 'Índice 0–1', 'Forehead · luminosity': 'Frente · luminosidad', 'Cheek · redness': 'Mejilla · rojez',
    'Chin · uniformity': 'Mentón · uniformidad', 'Eye contour · fine lines': 'Contorno de ojos · líneas finas', 'Baseline': 'Línea base', 'Day 0': 'Día 0',
    'Glow score': 'Puntaje Glow', 'Structure and skin combined': 'Estructura y piel combinadas', 'Saved': 'Guardado', 'Photos (front + profile)': 'Fotos (frente + perfil)',
    'Recommended routine': 'Rutina recomendada', 'Ready to buy': 'Lista para comprar', 'Next visit': 'Próxima visita', 'Auto-compare': 'Comparación automática', 'Overview': 'Inicio',

    // modules + connected
    'Facial analysis': 'Análisis facial', '468 points, Day 0': '468 puntos, Día 0', 'Schedule & records': 'Agenda y expediente', 'One file per patient': 'Un expediente por paciente',
    'Visits, progress, routine': 'Citas, progreso, rutina', 'Skincare, prescribed': 'Skincare recetado', 'Savia AI': 'Savia IA', 'Answers 24/7': 'Responde 24/7',
    'What happens in the clinic': 'Lo que pasa en la clínica', 'reaches the patient.': 'llega a su paciente.',
    'What the doctor decides, the clinic manages and the patient follows at home. No loose spreadsheets, no lost chats, nothing typed twice.': 'Lo que el médico decide, la clínica lo gestiona y la paciente lo sigue en casa. Sin hojas sueltas, sin chats perdidos, sin digitar dos veces.',
    'The clinic': 'La clínica', 'Runs everything from one console': 'Maneja todo desde una consola', 'Schedule by professional and room': 'Agenda por profesional y por sala',
    'Treatments, products and invoices': 'Tratamientos, productos y facturas', 'Automatic reminders and follow-up': 'Recordatorios y seguimiento automáticos',
    'The doctor': 'El médico', 'Assesses and prescribes': 'Valora y receta', 'Photos, analysis and notes in one file': 'Fotos, análisis y notas en un expediente',
    'Dictates the visit, AI writes the note': 'Dicta la consulta y la IA redacta la nota', 'Prescribes a home routine in two taps': 'Receta una rutina en casa en dos toques',
    'The patient': 'La paciente', 'Has her clinic in her pocket': 'Tiene su clínica en el bolsillo', 'Books and confirms visits': 'Agenda y confirma sus citas',
    'Sees her progress against Day 0': 'Ve su progreso contra el Día 0', 'Buys her routine from the clinic': 'Compra su rutina en la clínica',
    'Savia · AI': 'Savia · IA', 'Answers and follows up': 'Responde y da seguimiento', 'Answers patients day and night': 'Atiende pacientes de día y de noche',
    'Reminds check-ups and refills': 'Recuerda controles y reposiciones', 'Flags anything urgent to the team': 'Avisa al equipo de cualquier urgencia',

    // solutions + voice note
    'Four moments of the patient,': 'Cuatro momentos de la paciente,', 'one system.': 'un solo sistema.',
    'From the moment someone searches for a clinic to the day she reorders her sunscreen. Pick where your clinic needs help first.': 'Desde que alguien busca una clínica hasta el día en que vuelve a pedir su protector solar. Elige dónde necesita ayuda tu clínica primero.',
    'For the doctor': 'Para el médico', 'From voice note': 'De la nota de voz', 'to invoice.': 'a la factura.',
    "The doctor dictates. AI drafts the clinical note, lists the services and products used, and once the doctor approves, the invoice and the patient's aftercare go out on their own.": 'El médico dicta. La IA prepara la nota clínica, lista los servicios y productos usados y, cuando el médico aprueba, la factura y los cuidados de la paciente salen solos.',
    "Nothing is saved without the doctor's review": 'Nada se guarda sin la revisión del médico', 'Products used are deducted from stock': 'Los productos usados se descuentan del inventario',
    "The patient's routine and aftercare reach her app": 'La rutina y los cuidados llegan a la app de la paciente',
    'Voice note': 'Nota de voz', 'Draft': 'Borrador', 'Services': 'Servicios', 'Review': 'Revisión', 'Invoice': 'Factura',
    '“Toxin on the forehead and frown lines, 20 units. No reactions. Recommend SPF and the calming routine, check-up in 15 days.”': '“Toxina en frente y entrecejo, 20 unidades. Sin reacciones. Recomendar SPF y la rutina calmante, control en 15 días.”',
    'Clinical note · AI draft': 'Nota clínica · borrador de IA', 'Procedure': 'Procedimiento', 'Botulinum toxin, forehead and glabella': 'Toxina botulínica, frente y glabela',
    'Dose': 'Dosis', 'Events': 'Eventos', 'No immediate reactions': 'Sin reacciones inmediatas', 'Plan': 'Plan',
    'Check-up in 15 days · daily SPF 50 · calming routine': 'Control en 15 días · SPF 50 diario · rutina calmante', 'Detected items': 'Ítems detectados',
    'Toxin application, 2 zones': 'Aplicación de toxina, 2 zonas', 'Total': 'Total', 'Doctor review': 'Revisión del médico',
    'Note approved and signed': 'Nota aprobada y firmada', 'Check-up booked in 15 days': 'Control agendado en 15 días',
    "Routine sent to the patient's app": 'Rutina enviada a la app de la paciente', '2 products deducted from stock': '2 productos descontados del inventario',
    'Invoice · ready to send': 'Factura · lista para enviar', 'Patient': 'Paciente', 'Laura G. (example)': 'Laura G. (ejemplo)', 'Items': 'Ítems',
    '1 service · 2 products': '1 servicio · 2 productos', 'Sent to': 'Enviada a', "Email and the patient's app": 'Correo y app de la paciente',
    "Example values. Invoicing connects to your country's provider.": 'Valores de ejemplo. La facturación se conecta con el proveedor de tu país.',

    // patient app
    'Your clinic, in your': 'Tu clínica, en el bolsillo', "patients' pocket.": 'de tus pacientes.',
    'Care continues at home. Patients follow their doctor\'s instructions, see their progress, buy their routine and come back.': 'El cuidado sigue en casa. Las pacientes siguen las indicaciones de su médico, ven su progreso, compran su rutina y vuelven.',
    'My appointments': 'Mis citas', 'Book, confirm or reschedule without calling. Reminders cut no-shows.': 'Agenda, confirma o reprograma sin llamar. Los recordatorios reducen las ausencias.',
    'My progress': 'Mi progreso', 'Photos, scores and notes from her doctor, compared with Day 0.': 'Fotos, puntajes y notas de su médico, comparados con el Día 0.',
    'Proportion, symmetry and skin by zone, explained in plain words.': 'Proporción, simetría y piel por zona, explicadas en palabras simples.',
    'My routine': 'Mi rutina', 'Morning and night steps prescribed by her doctor, with reminders.': 'Pasos de mañana y noche recetados por su médico, con recordatorios.',
    'The exact products of her routine, from your clinic, in one tap.': 'Los productos exactos de su rutina, de tu clínica, en un toque.',
    'Messages & Savia': 'Mensajes y Savia', 'A direct line to the clinic and an assistant that answers instantly.': 'Una línea directa con la clínica y un asistente que responde al instante.',
    'TH': 'JU', 'MO': 'LU', 'TU': 'MA', 'Post-treatment check-up': 'Control post-tratamiento', 'Thursday · 10:30 a.m.': 'Jueves · 10:30 a. m.', 'Confirmed': 'Confirmada',
    'Deep facial cleansing': 'Limpieza facial profunda', 'Monday 18 · 4:00 p.m.': 'Lunes 18 · 4:00 p. m.', 'Pending': 'Pendiente',
    'New facial analysis': 'Nuevo análisis facial', 'Tuesday 26 · 9:00 a.m.': 'Martes 26 · 9:00 a. m.', 'New': 'Nueva',
    'Week 6': 'Semana 6', 'Week 12': 'Semana 12', 'Session 3 of 4': 'Sesión 3 de 4', 'Note from your doctor': 'Nota de tu médico',
    'Progress photos': 'Fotos de progreso', 'Day 0 vs. today': 'Día 0 vs. hoy', 'View': 'Ver', 'points': 'puntos', 'symmetry': 'simetría', 'glow': 'glow',
    'MORNING': 'MAÑANA', 'NIGHT': 'NOCHE', 'Cleanse': 'Limpiar', 'Antioxidant': 'Antioxidante', 'Protect': 'Proteger',
    'SPF runs out in ~6 days': 'Tu SPF se acaba en ~6 días', 'Reorder from your clinic': 'Repónlo en tu clínica', 'Reorder': 'Reponer',
    'Rx': 'Rx', 'Your routine · 3 items': 'Tu rutina · 3 productos', 'Recommended by your doctor': 'Recomendada por tu médico', 'Add all': 'Agregar todo',
    'Messages': 'Mensajes', "Can I wear makeup after today's session?": '¿Me puedo maquillar después de la sesión de hoy?',
    'Wait 24 hours. Then your tinted SPF works as light coverage.': 'Espera 24 horas. Después, tu SPF con color sirve como cobertura ligera.',
    'Perfect. Can I pick up the cream on Thursday?': 'Perfecto. ¿Puedo recoger la crema el jueves?', "Yes, it's reserved at reception. See you Thursday!": 'Sí, queda reservada en recepción. ¡Nos vemos el jueves!',

    // shop
    'The routine her doctor prescribes,': 'La rutina que receta su médico,', 'one tap away.': 'a un toque.',
    'Each patient leaves with a home routine built from the brands your clinic trusts. She buys it in her app, picks it up at reception or gets it delivered, and the sale lands in her file and in your numbers.': 'Cada paciente sale con una rutina en casa armada con las marcas en las que confía tu clínica. La compra en su app, la recoge en recepción o se la envían, y la venta queda en su expediente y en tus números.',
    '+ your brands': '+ tus marcas', 'Clinic console · Prescribe a routine': 'Consola de la clínica · Recetar una rutina', 'Try it': 'Pruébalo',
    'Example patient · Glow 84 · cheek redness 0.13': 'Paciente de ejemplo · Glow 84 · rojez en mejillas 0.13',
    '1 · Treatment plan': '1 · Plan de tratamiento', '2 · Home routine (built from the plan)': '2 · Rutina en casa (armada desde el plan)',
    "Send to the patient's app": 'Enviar a la app de la paciente', 'What just happened': 'Lo que acaba de pasar',
    'Nothing yet. Choose a plan and send the routine.': 'Todavía nada. Elige un plan y envía la rutina.',
    'Simulation with example data. Nothing is saved.': 'Simulación con datos de ejemplo. No se guarda nada.', 'Restart': 'Reiniciar',
    'Prescription → purchase': 'Receta → compra', 'Each routine step is linked to a product in your catalog, so following the doctor is one tap.': 'Cada paso de la rutina está ligado a un producto de tu catálogo, así seguir al médico es un toque.',
    'Kits per treatment': 'Kits por tratamiento', 'Post-laser, peel, melasma or anti-aging kits, sold with the procedure or added later.': 'Kits post-láser, peeling, melasma o antiedad, vendidos con el procedimiento o después.',
    'Automatic refills': 'Reposición automática', 'The app knows when a product is about to run out and invites a reorder from your clinic, not from a pharmacy.': 'La app sabe cuándo un producto está por acabarse e invita a reponerlo en tu clínica, no en la farmacia.',
    'Stock & sales': 'Inventario y ventas', 'Inventory, orders for pickup or delivery, and sales per professional in the same console.': 'Inventario, pedidos para recoger o enviar y ventas por profesional en la misma consola.',
    'Example catalog and prices. Brand names and product photos belong to their owners; each clinic loads its own catalog, prices and suppliers.': 'Catálogo y precios de ejemplo. Las marcas y fotos de producto pertenecen a sus dueños; cada clínica carga su propio catálogo, precios y proveedores.',

    // savia
    'AI patient assistant': 'Asistente de pacientes con IA', 'Meet Savia.': 'Te presentamos a Savia.', 'She talks to your patients.': 'Ella habla con tus pacientes.',
    "Savia answers day and night, in your clinic's voice. She explains results, sends aftercare, keeps the routine on track, helps reorder products and books the next check-up. Your team sees every conversation.": 'Savia responde de día y de noche, con la voz de tu clínica. Explica resultados, envía cuidados, mantiene la rutina al día, ayuda a reponer productos y agenda el próximo control. Tu equipo ve cada conversación.',
    'Explains results': 'Explica resultados', 'Glow, symmetry and skin by zone, in everyday language, without diagnosing.': 'Glow, simetría y piel por zona, en lenguaje cotidiano y sin diagnosticar.',
    'Routine and products': 'Rutina y productos', 'Which product goes when, and a reorder link before it runs out.': 'Qué producto va cuándo, y un enlace para reponerlo antes de que se acabe.',
    'Books the next visit': 'Agenda la próxima cita', "The request lands in your clinic's schedule.": 'La solicitud llega a la agenda de tu clínica.',
    'Alerts your team': 'Alerta a tu equipo', 'Pain, swelling or anything unusual is flagged right away.': 'Dolor, inflamación o algo fuera de lo normal se avisa de inmediato.',
    "Your clinic's assistant · Online": 'Asistente de tu clínica · En línea', 'AI': 'IA', "Hi! I'm": '¡Hola! Soy',
    '. I can explain your analysis, help with aftercare and your routine, or book your next visit.': '. Puedo explicarte tu análisis, ayudarte con los cuidados y tu rutina, o agendar tu próxima cita.',
    'Explain my results': 'Explícame mis resultados', 'My routine products': 'Productos de mi rutina', 'Makeup after my session?': '¿Maquillaje después de la sesión?',
    'Book my next check-up': 'Agendar mi próximo control', 'Chat as a patient': 'Chatear como paciente', 'Demo using the example patient from this page.': 'Demo con la paciente de ejemplo de esta página.',

    // clinic dashboard
    'For clinics and doctors': 'Para clínicas y médicos', 'Your whole clinic,': 'Toda tu clínica,', 'in one console.': 'en una consola.',
    'Fewer repetitive tasks, more time with patients. Schedule, records, analysis, shop and follow-up in one place.': 'Menos tareas repetitivas, más tiempo con pacientes. Agenda, expediente, análisis, tienda y seguimiento en un solo lugar.',
    'Home': 'Inicio', 'Schedule': 'Agenda', 'Patients': 'Pacientes', 'Records': 'Expedientes', 'Analysis': 'Análisis', 'Shop': 'Tienda',
    'Good morning, Doctor': 'Buenos días, doctora', 'Sample view': 'Vista de ejemplo', "Today's visits": 'Citas de hoy', '3 to confirm': '3 por confirmar',
    'Active patients': 'Pacientes activos', 'in follow-up': 'en seguimiento', 'Shop this month': 'Tienda este mes', '41 orders': '41 pedidos', 'resolved by Savia': 'resueltos por Savia',
    "Today's schedule": 'Agenda de hoy', 'See all': 'Ver todo', 'New patient · Room 1': 'Paciente nueva · Sala 1', 'Session 3 of 4 · vs. Day 0': 'Sesión 3 de 4 · vs. Día 0',
    'Pickup · post-laser kit': 'Retiro · kit post-láser', 'Reception · paid in app': 'Recepción · pagado en la app', 'Peel session': 'Sesión de peeling', 'Cabin 2': 'Cabina 2',
    'Follow-up': 'Seguimiento', '5 patients': '5 pacientes', 'are due for a check-up this week': 'tienen control esta semana', '12 SPF refills': '12 reposiciones de SPF',
    'due: reminders sent': 'pendientes: recordatorios enviados', '3 orders': '3 pedidos', 'ready for pickup': 'listos para retirar', 'Low stock:': 'Inventario bajo:',
    'SCHEDULE': 'AGENDA', 'Frictionless booking': 'Agendar sin fricción', 'Patients book from the app; your team sees one calendar by professional and room.': 'Las pacientes agendan desde la app; tu equipo ve un solo calendario por profesional y sala.',
    'RECORD': 'EXPEDIENTE', 'History, photos, analysis, notes, consents and purchases together.': 'Historia, fotos, análisis, notas, consentimientos y compras juntos.',
    'RETENTION': 'FIDELIZACIÓN', 'Follow-up that sells': 'Seguimiento que vende', 'Visible progress, routines and refills keep patients coming back to your clinic.': 'El progreso visible, las rutinas y las reposiciones hacen que las pacientes vuelvan a tu clínica.',

    // shift + steps
    'The shift': 'El cambio', 'Three moments that today': 'Momentos que hoy', 'get lost on paper.': 'se pierden en papel.', 'Without a platform': 'Sin plataforma',
    'Before-and-after photos in different light': 'Fotos de antes y después con distinta luz', 'Notes typed after hours, invoices by hand': 'Notas digitadas fuera de horario, facturas a mano',
    'The routine is a paper note the patient loses': 'La rutina es un papel que la paciente pierde', 'She buys the products at a pharmacy, or never': 'Compra los productos en la farmacia, o nunca',
    'Nobody knows when the next check-up is due': 'Nadie sabe cuándo le toca el próximo control', 'With Clinic Management Tech': 'Con Clinic Management Tech',
    'Guided capture, compared with Day 0': 'Captura guiada, comparada con el Día 0', 'Voice note to clinical note and invoice': 'De nota de voz a nota clínica y factura',
    'The routine lives in her app, with reminders': 'La rutina vive en su app, con recordatorios', 'She buys it from your clinic in one tap': 'La compra en tu clínica en un toque',
    'Check-ups and refills followed up on their own': 'Controles y reposiciones con seguimiento automático', 'We set up your clinic': 'Configuramos tu clínica',
    'Services, professionals, hours, brand and your product catalog.': 'Servicios, profesionales, horarios, marca y tu catálogo de productos.',
    'Each patient gets her Day 0': 'Cada paciente recibe su Día 0', 'A guided analysis at the first visit and access to her app, with her routine.': 'Un análisis guiado en la primera visita y acceso a su app, con su rutina.',
    'Follow-up runs on its own': 'El seguimiento corre solo', 'Check-ups, reminders, refills and messages go out without extra work.': 'Controles, recordatorios, reposiciones y mensajes salen sin trabajo extra.',

    // GEO + FAQ
    'AI visibility': 'Visibilidad en IA', 'When a patient asks ChatGPT…': 'Cuando una paciente le pregunta a ChatGPT…', 'does your clinic show up?': '¿aparece tu clínica?',
    'More patients find clinics by asking AI assistants. We diagnose your digital presence and help you get found and recommended.': 'Cada vez más pacientes encuentran clínicas preguntándole a la IA. Diagnosticamos tu presencia digital y te ayudamos a que te encuentren y recomienden.',
    'Get your GEO diagnosis': 'Pide tu diagnóstico GEO', 'Which aesthetic medicine clinics are there in my city?': '¿Qué clínicas de medicina estética hay en mi ciudad?',
    'Your clinic': 'Tu clínica', 'Recommended here?': '¿Recomendada aquí?', 'Does your clinic show up?': '¿Aparece tu clínica?',
    'What clinics': 'Lo que suelen', 'ask us.': 'preguntar las clínicas.',
    'Who is Clinic Management Tech for?': '¿Para quién es Clinic Management Tech?',
    'Aesthetic medicine and aesthetic dermatology clinics, medical spas and practices that treat the face or body and want to connect their team with their patients.': 'Clínicas de medicina estética y dermatología estética, medical spas y consultorios que tratan rostro o cuerpo y quieren conectar a su equipo con sus pacientes.',
    'Do I have to replace my current system?': '¿Tengo que cambiar mi sistema actual?',
    'No. We start where your clinic needs it most, and connect or migrate what you already use step by step.': 'No. Empezamos donde tu clínica más lo necesita y conectamos o migramos lo que ya usas, paso a paso.',
    'Does the facial analysis replace a medical assessment?': '¿El análisis facial reemplaza la valoración médica?',
    'No. It is a support tool to document and explain proportion, symmetry and skin. The assessment and the treatment decision always belong to the doctor.': 'No. Es una herramienta de apoyo para documentar y explicar proporción, simetría y piel. La valoración y la decisión del tratamiento siempre son del médico.',
    'How does the clinic shop work?': '¿Cómo funciona la tienda de la clínica?',
    'You load the products you sell, with your prices and stock. When the doctor prescribes a routine, each step links to a product, and the patient can buy it in her app for pickup at reception or delivery. Orders, stock and sales appear in your console.': 'Cargas los productos que vendes, con tus precios e inventario. Cuando el médico receta una rutina, cada paso se liga a un producto y la paciente lo compra en su app para recoger en recepción o recibir en casa. Pedidos, inventario y ventas aparecen en tu consola.',
    'Which brands can I sell?': '¿Qué marcas puedo vender?',
    'The ones your clinic already carries or distributes, such as Colorescience, Sensilis, SkinCeuticals, ISDIN or Heliocare, plus your own line. The catalog is yours; we do not sell products to your patients.': 'Las que tu clínica ya trabaja o distribuye, como Colorescience, Sensilis, SkinCeuticals, ISDIN o Heliocare, además de tu propia línea. El catálogo es tuyo; nosotros no les vendemos productos a tus pacientes.',
    'How do patients pay?': '¿Cómo pagan las pacientes?',
    'Online with the payment provider your clinic chooses, or at reception when they pick up. Payment setup depends on your country and is part of onboarding.': 'En línea con el proveedor de pagos que elija tu clínica, o en recepción al retirar. La configuración de pagos depende de tu país y es parte de la puesta en marcha.',
    'What does Savia do?': '¿Qué hace Savia?',
    'Savia talks to your patients: she explains their analysis, sends aftercare and routine guidance, reminds refills, books check-ups and flags anything urgent to your team. She never gives a diagnosis, and your team can step into any conversation.': 'Savia habla con tus pacientes: explica su análisis, envía cuidados e indicaciones de rutina, recuerda reposiciones, agenda controles y avisa a tu equipo de cualquier urgencia. Nunca da diagnósticos y tu equipo puede entrar en cualquier conversación.',
    'Can I use my own brand?': '¿Puedo usar mi propia marca?', "Yes. The app and the shop carry your clinic's identity so your patients recognize them as yours.": 'Sí. La app y la tienda llevan la identidad de tu clínica para que tus pacientes las reconozcan como tuyas.',

    // CTA + form + footer + widget
    'Book a demo ': 'Agendar una demo', 'Connect your clinic': 'Conecta tu clínica', 'with your patients.': 'con tus pacientes.',
    "Tell us about your clinic and we'll show you the platform on a video call, with a case like yours.": 'Cuéntanos de tu clínica y te mostramos la plataforma en una videollamada, con un caso como el tuyo.',
    'A live facial analysis and Day 0 report': 'Un análisis facial en vivo y su reporte Día 0', 'Your clinic shop with your own brands': 'La tienda de tu clínica con tus propias marcas',
    'A proposal for your team, with no commitment': 'Una propuesta para tu equipo, sin compromiso', 'Request your demo': 'Solicita tu demo',
    'Your name': 'Tu nombre', 'Clinic and city': 'Clínica y ciudad', 'Email': 'Correo', 'WhatsApp': 'WhatsApp', 'Professionals': 'Profesionales',
    'Just me': 'Solo yo', '2 to 5': '2 a 5', '6 to 15': '6 a 15', 'More than 15': 'Más de 15', 'Most interested in': 'Me interesa más',
    'Everything': 'Todo', 'Patient app & follow-up': 'App del paciente y seguimiento', 'Savia for patients': 'Savia para pacientes', 'AI visibility (GEO)': 'Visibilidad en IA (GEO)',
    'Request demo': 'Solicitar demo', 'Request received': 'Solicitud recibida', 'Demo': 'Demo',
    'Clinic Management Tech · Your clinic and your patients, connected': 'Clinic Management Tech · Tu clínica y tus pacientes, conectados',
    'Type your message': 'Escribe tu mensaje', "Demo patient view. Savia gives general guidance; your clinic's team makes clinical decisions.": 'Vista de paciente de demo. Savia da orientación general; las decisiones clínicas son del equipo de tu clínica.',
    "Hi, I'm": 'Hola, soy', '. Try me the way a patient would.': '. Pruébame como lo haría una paciente.',

    // attributes
    'Clinic Management Tech, home': 'Clinic Management Tech, inicio', 'Main': 'Principal', 'Open menu': 'Abrir menú', 'Language': 'Idioma',
    'The facial analysis in the patient app': 'El análisis facial en la app del paciente',
    'Screen recording of the facial analysis in the patient app. Simulated person.': 'Grabación de pantalla del análisis facial en la app del paciente. Persona simulada.',
    'Jump to step': 'Ir al paso', 'Modules': 'Módulos', 'App features': 'Funciones de la app', 'Example brands': 'Marcas de ejemplo',
    'Which products are in my routine?': '¿Qué productos lleva mi rutina?', 'Dr. Laura Méndez': 'Dra. Laura Méndez', 'Lumière Clinic, Miami': 'Clínica Lumière, San José',
    'you@clinic.com': 'tu@clinica.com', '+1 305 555 0123': '+506 8888 7777', 'Footer': 'Pie de página',
    "Savia, your clinic's AI assistant": 'Savia, la asistente con IA de tu clínica', 'Close chat': 'Cerrar chat', 'Ask Savia anything…': 'Pregúntale lo que quieras a Savia…',
    'Send': 'Enviar', 'Hide': 'Ocultar', 'Open chat with Savia': 'Abrir chat con Savia'
  };

  const META = {
    title: 'Clinic Management Tech | Tu clínica, tus médicos y tus pacientes, conectados',
    description: 'Clinic Management Tech conecta clínicas estéticas, médicos y pacientes en una plataforma: análisis facial, agenda, expediente digital, asistente con IA, app del paciente y tienda para la rutina de skincare de cada paciente.'
  };

  const norm = (t) => t.replace(/\s+/g, ' ').trim();
  const translate = (root) => {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: (n) => n.parentElement.closest('script,style,svg') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(n => {
      const k = norm(n.nodeValue); if (!k || !(k in ES)) return;
      const lead = /^\s/.test(n.nodeValue) ? ' ' : '', trail = /\s$/.test(n.nodeValue) ? ' ' : '';
      n.nodeValue = lead + ES[k] + trail;
    });
    root.querySelectorAll('[placeholder],[aria-label],[alt],[data-ask]').forEach(el => {
      ['placeholder', 'aria-label', 'alt', 'data-ask'].forEach(a => { const v = el.getAttribute(a); if (v && ES[norm(v)]) el.setAttribute(a, ES[norm(v)]); });
    });
  };

  if (lang === 'es') {
    translate(document.body);
    document.title = META.title;
    const d = document.querySelector('meta[name="description"]'); if (d) d.content = META.description;
  }
  document.documentElement.classList.remove('i18n-wait');

  // ES / EN switch
  document.querySelectorAll('[data-lang]').forEach(b => {
    b.classList.toggle('on', b.dataset.lang === lang);
    b.setAttribute('aria-pressed', b.dataset.lang === lang);
    b.addEventListener('click', () => {
      if (b.dataset.lang === lang) return;
      try { localStorage.setItem('cmt-lang', b.dataset.lang); } catch (_) {}
      const u = new URL(location.href); u.searchParams.set('lang', b.dataset.lang); location.href = u.toString();
    });
  });
})();
