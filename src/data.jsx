// ============================================================
//  data.jsx — Contenido editorial de MagiMate
//  Edita aquí todos los textos, precios y datos del sitio.
// ============================================================

// ── TODO: Actualiza con info real del profesor ──────────────
export const PROFESOR = {
  nombre: 'Prof. Moisés Tejeda Loya',         // ← nombre real
  rol: 'Fundador de MagiMate',
  credencial: 'Lic. en Arquitectura con 26 años de experiencia dando clases',   // ← carrera/universidad real
  bio1: 'Toda mi vida ha sido una búsqueda constante de respuestas. Hoy que las conozco deseo compartirlas. Las matemáticas son el lenguaje universal de todas las ciencias.',
  bio2: 'Entiendo el miedo a equivocarse. Por eso MagiMate no es solo una asesoría: es una experiencia diseñada para devolverte la confianza que el sistema educativo tradicional no siempre da.',
  foto: null, // ← pon aquí la ruta: '/foto-profesor.jpg'
}

// ── TODO: Define tus precios reales ────────────────────────
export const PAQUETES = [
  {
    id: 'individual',
    emoji: '🚀',
    nombre: 'Sesión Individual',
    desc: 'Ideal para un examen próximo o un tema puntual.',
    precio: 'desde $250',       // ← precio real
    nota: 'por sesión',
    ahorro: null,
    color: '#4182FA',
    features: [
      '1 sesión de 60 min',
      'Pizarra digital interactiva',
      'Material de apoyo post-clase',
      'Atención 1 a 1 exclusiva',
    ],
    destacado: false,
  },
  {
    id: 'mensual',
    emoji: '⚡',
    nombre: 'Paquete Mensual',
    desc: '4 sesiones para avanzar de forma constante.',
    precio: '$899',       // ← precio real
    nota: 'por mes',
    ahorro: 'Ahorras 10%',
    color: '#FF6B6B',
    features: [
      '4 sesiones de 60 min',
      'Plan de estudio personalizado',
      'Material de refuerzo',
      'Acceso a grabaciones',
      'Seguimiento semanal de progreso',
    ],
    destacado: true,
  },
  {
    id: 'intensivo',
    emoji: '🏆',
    nombre: 'Paquete Intensivo',
    desc: '8 sesiones para resultados profundos y rápidos.',
    precio: '$1,599',       // ← precio real
    nota: 'paquete completo',
    ahorro: 'Ahorras 20%',
    color: '#6BCB77',
    features: [
      '8 sesiones de 60 min',
      'Diagnóstico avanzado',
      'Simulacros de examen',
      'Reporte de progreso final',
      'Sesión de cierre con retroalimentación',
    ],
    destacado: false,
  },
]

export const AUDIENCIAS = [
  { emoji: '🧒', label: 'Niños', rango: '8 – 12 años', color: '#FFD93D', bg: '#FFF9E6', desc: 'Fundamentos matemáticos con juegos y ejemplos visuales súper divertidos.' },
  { emoji: '🎒', label: 'Adolescentes', rango: '12 – 17 años', color: '#FF6B6B', bg: '#FFF0F0', desc: 'Álgebra, geometría, estadística base y preparación para exámenes de admisión.' },
  { emoji: '🎓', label: 'Universitarios', rango: '18 – 25 años', color: '#4182FA', bg: '#EEF4FF', desc: 'Cálculo integral y diferencial, estadística y matemáticas financieras, investigación de operaciones.' },
  { emoji: '💼', label: 'Adultos', rango: '25+ años', color: '#6BCB77', bg: '#F0FBF1', desc: 'Actualización profesional y matemáticas aplicadas al trabajo.' },
]

export const PASOS = [
  { num: '01', emoji: '📝', titulo: 'Agenda gratis', desc: 'Reserva tu diagnóstico de 15 min sin costo y sin compromiso. Solo tú y el profesor.' },
  { num: '02', emoji: '🎯', titulo: 'Tu plan a la medida', desc: 'Diseñamos juntos un programa adaptado a tus materias, ritmo y objetivos.' },
  { num: '03', emoji: '💻', titulo: 'Aprende en línea', desc: 'Pizarra digital, recursos visuales y ejercicios en tiempo real, desde cualquier dispositivo.' },
  { num: '04', emoji: '📈', titulo: 'Mide tu avance', desc: 'Seguimiento semana a semana hasta que las matemáticas dejen de darte miedo.' },
]

export const FAQS = [
  {
    q: '¿Cómo es una clase en línea con MagiMate?',
    a: 'Nos conectamos por videollamada. Usamos una pizarra digital compartida donde el profesor escribe, dibuja y resuelve ejercicios en tiempo real — igual que presencial, pero sin que tengas que moverte. Al terminar recibes resumen y ejercicios de práctica.',
  },
  {
    q: '¿Las asesorías son personalizadas?',
    a: 'Sí, 100%. No hay grupos ni videos pregrabados: el profesor se dedica exclusivamente a ti durante toda la sesión. El ritmo, los ejemplos y los temas se ajustan a lo que necesitas ese día.',
  },
  {
    q: '¿Cuál es el costo y cómo se paga?',
    a: 'El precio varía según el paquete elegido. Aceptamos transferencia bancaria, tarjeta de crédito/débito y "transferencias internacionales". Agenda tu diagnóstico gratuito y te mandamos el tarifario completo.',
  },
  {
    q: '¿Para qué nivel educativo son las asesorías?',
    a: 'Para todos: desde niños de primaria hasta universitarios y adultos. Álgebra, cálculo, estadística, geometría, matemáticas financieras y más.',
  },
  {
    q: '¿Qué necesito para conectarme?',
    a: 'Solo una computadora, tablet o celular con cámara y micrófono, más una conexión estable a internet. Sin instalar nada especial.',
  },
  {
    q: '¿Puedo cancelar o reprogramar?',
    // TODO: Define tu política real de cancelación
    a: 'Sí. Con al menos 24 horas de anticipación puedes reprogramar sin ningún costo. Entendemos que los estudiantes tienen horarios cambiantes.',
  },
]

// ── TODO: Reemplaza con testimoniales reales de tus alumnos ─
export const TESTIMONIALES = [
  {
    texto: '"Llevaba dos semestres reprobando cálculo. Con MagiMate en 4 semanas entendí cosas que no había comprendido en dos años."',
    nombre: 'Alejandra M.',
    meta: 'Ingeniería Industrial · CDMX',
    iniciales: 'AM',
    color: '#4182FA',
  },
  {
    texto: '"Tenía miedo de las clases en línea, pero fue mejor que presencial. El profe usa pizarra digital y puedo ver la clase cuando quiero."',
    nombre: 'Carlos R.',
    meta: 'Preparatoria · Guadalajara',
    iniciales: 'CR',
    color: '#FF6B6B',
  },
  {
    texto: '"El diagnóstico gratis me convenció. Ningún otro tutor se tomó el tiempo de entender mi problema antes de cobrarme."',
    nombre: 'Valeria P.',
    meta: 'Contaduría · Monterrey',
    iniciales: 'VP',
    color: '#6BCB77',
  },
]

// ── TODO: Agrega tus redes sociales reales ─────────────────
export const REDES = [
  { label: 'Instagram', url: 'https://instagram.com/magimate' },
  { label: 'TikTok',    url: '' },
  { label: 'YouTube',   url: '' },
  { label: 'Facebook',  url: 'https://facebook.com/magimate' },
]

// ── TODO: Conecta el formulario (Formspree/EmailJS/WhatsApp) ─
export const CONTACTO = {
  email: 'contacto@magimate.com',        // ← tu correo real
  whatsapp: 'https://wa.me/529984415640', // ← tu número real
  formspreeId: 'XXXXXXXX',              // ← ID de Formspree si lo usas
}

export const MATERIAS = [
  'Aritmética básica',
  'Álgebra',
  'Estadística',
  'Geometría',
  'Trigonometría',
  'Cálculo Diferencial',
  'Cálculo Integral',
  'Estadística',
  'Probabilidad',
  'Matemáticas Financieras',
  'Geometría Analítica',
  'Otra / No estoy seguro',
]
