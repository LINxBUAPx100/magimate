import { useState, useEffect } from 'react'
import { Icon } from './icons.jsx'
import {
  PROFESOR, PAQUETES, AUDIENCIAS, PASOS,
  FAQS, TESTIMONIALES, REDES, MATERIAS, CONTACTO,
} from './data.jsx'

const PAQUETE_GRATIS = 'Diagnóstico gratuito (15 min)'

/* ══════════════════════════════════════════════
   HOOK: useReveal — fade-in al hacer scroll
   ══════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal')]

    // Marcamos con un atributo (data-show), NO con una clase: React controla el
    // className de cada elemento y lo reescribiría al re-renderizar (p.ej. al abrir
    // una pregunta del FAQ), borrando una clase añadida por fuera. Un data-* que
    // React no conoce sobrevive a los re-renders.
    const show = (el) => el.setAttribute('data-show', '')

    // Sin IntersectionObserver: mostrar todo de una vez (nunca ocultar contenido).
    if (typeof IntersectionObserver === 'undefined') {
      els.forEach(show)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { show(e.target); obs.unobserve(e.target) }
      }),
      { threshold: 0, rootMargin: '0px 0px 80px 0px' }
    )
    els.forEach(el => obs.observe(el))

    // Red de seguridad: si el observer no revelara un elemento que ya está dentro
    // (o por encima) de la ventana, lo mostramos igual con un barrido en scroll y
    // un failsafe por tiempo. Garantiza que NINGÚN contenido quede oculto.
    const sweep = () => {
      let pending = 0
      els.forEach(el => {
        if (el.hasAttribute('data-show')) return
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight + 80) { show(el); obs.unobserve(el) }
        else pending++
      })
      if (pending === 0) window.removeEventListener('scroll', sweep)
    }
    window.addEventListener('scroll', sweep, { passive: true })
    const t = setTimeout(sweep, 1200)

    return () => { obs.disconnect(); clearTimeout(t); window.removeEventListener('scroll', sweep) }
  }, [])
}

/* ══════════════════════════════════════════════
   MARKER — subrayado de marcador animado
   ══════════════════════════════════════════════ */
function Marker({ children, color = 'var(--yellow)' }) {
  return (
    <span className="marker">
      <svg className="marker-svg" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M3 8.5C23 2.5 43 12 61 6 79 0 99 9 117 5"
          pathLength="100" fill="none" stroke={color}
          strokeWidth="5" strokeLinecap="round" opacity="0.85"
        />
      </svg>
      {children}
    </span>
  )
}

/* ══════════════════════════════════════════════
   OLA DIVISORIA — el abrazo entre secciones
   ══════════════════════════════════════════════ */
function Wave({ fill = '#FFFFFF', position = 'bottom' }) {
  return (
    <div className={`wave wave-${position}`} aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={fill} />
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════════
   SÍMBOLOS MATEMÁTICOS FLOTANTES (decorativos)
   ══════════════════════════════════════════════ */
const SYMS = [
  { s: '∑', pos: { top: '14%', left: '4%' },   size: 72, color: 'var(--sky)',    delay: 0,   rot: -8 },
  { s: 'π', pos: { top: '66%', left: '6%' },   size: 52, color: 'var(--yellow)', delay: 1.1, rot: 6 },
  { s: '∞', pos: { top: '16%', right: '6%' },  size: 60, color: 'var(--coral)',  delay: 0.5, rot: -4 },
  { s: '√', pos: { bottom: '15%', right: '8%' }, size: 48, color: 'var(--green)', delay: 1.7, rot: 10 },
  { s: 'Δ', pos: { top: '40%', left: '45%' },  size: 38, color: 'var(--purple)', delay: 2.2, rot: -10 },
  { s: '÷', pos: { bottom: '30%', left: '16%' }, size: 42, color: 'var(--mist)', delay: 0.8, rot: 5 },
  { s: '%', pos: { bottom: '42%', right: '20%' }, size: 44, color: 'var(--yellow)', delay: 1.4, rot: -12 },
  { s: '±', pos: { top: '74%', right: '34%' }, size: 40, color: 'var(--coral)', delay: 2.6, rot: 8 },
]

function FloatingSymbols() {
  return (
    <div className="float-syms" aria-hidden="true">
      {SYMS.map((x, i) => (
        <span key={i} className="float-sym" style={{
          ...x.pos,
          fontSize: x.size,
          color: x.color,
          '--rot': `${x.rot}deg`,
          animationDelay: `${x.delay}s`,
          animationDuration: `${6 + i * 0.7}s`,
        }}>
          {x.s}
        </span>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: 'Para quién',    href: '#audiencia' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Paquetes',      href: '#servicios' },
  { label: 'El Profesor',      href: '#sobre-mi' },
  { label: 'FAQ',           href: '#faq' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Si el menú móvil queda abierto y el viewport pasa a escritorio,
  // ciérralo para no dejar el scroll bloqueado.
  useEffect(() => {
    if (!menuOpen) return
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [menuOpen])

  return (
    <>
      <nav className={`nav ${scrolled || menuOpen ? 'nav-scrolled' : ''}`}>
        <a href="#inicio" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-mark">M²</div>
          <span className="logo-text">MagiMate</span>
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">{l.label}</a>
            </li>
          ))}
          <li>
            <a href="#contacto" className="btn btn-yellow nav-cta">
              Clase gratis
              <Icon name="arrow-right" size={15} stroke={2.4} />
            </a>
          </li>
        </ul>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <Icon name={menuOpen ? 'cross' : 'menu'} size={26} stroke={2.2} />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
              <Icon name="arrow-right" size={18} />
            </a>
          ))}
          <a href="#contacto" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Clase gratis de 15 min
          </a>
        </div>
      )}
    </>
  )
}

/* ══════════════════════════════════════════════
   HERO — con pizarra de gráfica animada
   ══════════════════════════════════════════════ */
function Board() {
  return (
    <div className="hero-board">
      <div className="board-chip c1">
        <Icon name="sparkle" size={15} stroke={2} />
        100% personalizado
      </div>
      <div className="board-chip c2">
        <Icon name="chart" size={15} stroke={2.2} />
        +2 puntos de promedio
      </div>

      <div className="board">
        <div className="board-head">
          <span className="board-dot" style={{ background: 'var(--coral)' }} />
          <span className="board-dot" style={{ background: 'var(--yellow)' }} />
          <span className="board-dot" style={{ background: 'var(--green)' }} />
          <span className="board-title">MagiMate · Pizarra digital</span>
          <span className="live-pill"><span className="live-dot" />EN VIVO</span>
        </div>

        <svg className="board-svg" viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gráfica de una parábola dibujándose en una pizarra digital">
          <defs>
            <pattern id="bgrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0v24" fill="none" stroke="rgba(177,205,249,0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="360" height="180" fill="url(#bgrid)" />

          {/* Ejes */}
          <line x1="44" y1="14" x2="44" y2="158" stroke="rgba(177,205,249,0.4)" strokeWidth="1.5" />
          <line x1="30" y1="150" x2="342" y2="150" stroke="rgba(177,205,249,0.4)" strokeWidth="1.5" />
          <path d="M44 8l-4.5 8h9z" fill="rgba(177,205,249,0.4)" />
          <path d="M348 150l-8-4.5v9z" fill="rgba(177,205,249,0.4)" />

          {/* Curva que se dibuja sola */}
          <path
            className="fx-curve"
            d="M62 28Q180 254 298 28"
            fill="none" stroke="#FFD93D" strokeWidth="3.5"
            strokeLinecap="round" pathLength="100"
          />

          {/* Vértice */}
          <g className="fx-point">
            <line x1="180" y1="141" x2="180" y2="150" stroke="rgba(255,217,61,0.5)" strokeDasharray="3 3" />
            <circle cx="180" cy="141" r="5" fill="#FFD93D" stroke="#0D1B3E" strokeWidth="2" />
          </g>

          {/* Etiqueta de la función */}
          <g className="fx-label">
            <rect x="132" y="12" width="96" height="27" rx="9" fill="rgba(65,130,250,0.16)" stroke="rgba(65,130,250,0.35)" />
            <text x="180" y="30" textAnchor="middle" fill="#B1CDF9" fontSize="13" fontWeight="600" fontFamily="'Fredoka', sans-serif">
              f(x) = x²
            </text>
          </g>
        </svg>

        <div className="board-list">
          {[
            ['monitor', 'Pizarra digital + recursos visuales', '65,130,250', 'var(--sky)'],
            ['users',   'Atención 1 a 1, a tu ritmo',          '255,107,107', 'var(--coral)'],
            ['video',   'Sesiones grabadas para repasar',      '107,203,119', 'var(--green)'],
            ['chart',   'Seguimiento de tu progreso',          '167,139,250', 'var(--purple)'],
            ['sparkle', 'Desde cualquier dispositivo',         '255,217,61',  'var(--yellow)'],
          ].map(([icon, label, rgb, color]) => (
            <div key={icon} className="board-item">
              <span className="board-check" style={{ background: `rgba(${rgb}, 0.18)`, color }}>
                <Icon name={icon} size={14} stroke={2.2} />
              </span>
              {label}
            </div>
          ))}
        </div>

        <div className="board-stats">
          <div className="stat-tile"><strong>98%</strong><span>Satisfacción</span></div>
          <div className="stat-tile"><strong>1:1</strong><span>Atención pura</span></div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <FloatingSymbols />

      <div className="hero-orb" aria-hidden="true" style={{
        width: 600, height: 600, top: -150, right: -100,
        background: 'radial-gradient(circle, rgba(65,130,250,0.18) 0%, transparent 70%)',
      }} />
      <div className="hero-orb" aria-hidden="true" style={{
        width: 420, height: 420, bottom: -60, left: '12%',
        background: 'radial-gradient(circle, rgba(255,217,61,0.07) 0%, transparent 70%)',
      }} />

      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <Icon name="sparkle" size={15} stroke={2} />
            Asesorías 1 a 1 · En línea · Toda Latinoamérica
          </div>

          <h1 className="hero-title">
            Descubre el<br />
            <Marker><span className="grad-text">genio</span></Marker> en ti
          </h1>

          <p className="hero-sub">
            Asesorías de matemáticas 100% personalizadas, en línea y para{' '}
            <strong>todas las edades</strong> — desde niños hasta adultos profesionales.
          </p>

          <div className="hero-actions">
            <a href="#contacto" className="btn btn-coral">
              Clase gratis de 15 min
              <Icon name="arrow-right" size={16} stroke={2.4} />
            </a>
            <a href="#como-funciona" className="btn btn-ghost-dark">
              Ver cómo funciona
              <Icon name="arrow-down" size={16} stroke={2.2} />
            </a>
          </div>

          {/* TODO: Actualiza el número de alumnos cuando tengas datos reales */}
          <div className="hero-proof">
            <div className="avatar-row">
              {[['AL', 'var(--blue)'], ['MR', 'var(--coral)'], ['JG', 'var(--green)'], ['VP', 'var(--purple)']].map(([ini, c]) => (
                <div key={ini} className="avatar" style={{ background: c }}>{ini}</div>
              ))}
            </div>
            <p><strong>+50 alumnos</strong> ya mejoraron su calificación</p>
          </div>
        </div>

        <Board />
      </div>

      <Wave fill="#FFFFFF" position="bottom" />
    </section>
  )
}

/* ══════════════════════════════════════════════
   MARQUEE — materias en movimiento
   ══════════════════════════════════════════════ */
function Marquee() {
  const items = MATERIAS.slice(0, -1)
  const seps = ['∑', 'π', '√', '∞', 'Δ', '÷']
  const sepColors = ['var(--blue)', 'var(--coral)', '#3DA94C', 'var(--purple)', '#E5A800', 'var(--navy)']

  const Row = () => (
    <div className="marquee-row" aria-hidden="true">
      {items.map((m, i) => (
        <span key={m} className="marquee-item">
          <span className="marquee-sym" style={{ color: sepColors[i % sepColors.length] }}>
            {seps[i % seps.length]}
          </span>
          {m}
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════
   AUDIENCIA — Para quién
   ══════════════════════════════════════════════ */
function Audiencia() {
  return (
    <section id="audiencia" style={{ padding: 'var(--section-pad)', background: 'var(--white)' }}>
      <div className="container">
        <div className="sec-head reveal">
          <span className="section-label">Para quién es</span>
          <h2 className="section-title">
            Matemáticas para <Marker color="var(--sky)">todas las edades</Marker>
          </h2>
          <p className="section-sub">
            No importa si eres estudiante de primaria, universitario o un profesional que quiere reforzar — aquí hay un lugar para ti.
          </p>
        </div>

        <div className="aud-grid">
          {AUDIENCIAS.map((a, i) => (
            <div key={a.label} className={`aud-card reveal reveal-delay-${i}`}
              style={{ '--c': a.color, '--card-bg': a.bg }}>
              <div className="icon-tile">
                <Icon name={a.icon} size={26} />
              </div>
              <h3>{a.label}</h3>
              <p className="aud-rango">{a.rango}</p>
              <p>{a.desc}</p>
              <a href="#servicios" className="aud-link">
                Ver paquetes
                <Icon name="arrow-right" size={14} stroke={2.4} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   PROBLEMA / SOLUCIÓN
   ══════════════════════════════════════════════ */
function Problema() {
  const pains = [
    'Grupos de 30 alumnos donde nadie te explica a ti',
    'Videos de YouTube que no pueden responderte',
    'Horarios fijos que no se adaptan a tu vida',
    'La sensación de que "las matemáticas no son para mí"',
    'Reprobando sin saber qué estás haciendo mal',
  ]
  const gains = [
    'Atención 100% para ti: el ritmo lo decides tú',
    'Pizarra digital, recursos visuales y tecnología educativa',
    'Flexibilidad total desde tu casa o donde estés',
    'Un experto que ya pasó por donde tú estás',
    'Resultados medibles: más confianza, mejores notas',
  ]

  return (
    <section style={{ padding: 'var(--section-pad)', background: 'var(--off)' }} className="grid-paper">
      <div className="container">
        <div className="sec-head reveal">
          <span className="section-label">El problema real</span>
          <h2 className="section-title">¿Te suena <Marker color="var(--coral)">familiar</Marker>?</h2>
          <p className="section-sub">
            No estás solo/a. La mayoría no tiene problemas con las matemáticas — los tiene con <em>cómo se las enseñan</em>.
          </p>
        </div>

        <div className="vs-grid">
          <div className="vs-card bad reveal">
            <h3 className="vs-title">
              <span className="icon-tile"><Icon name="cross" size={18} stroke={2.4} /></span>
              Sin MagiMate
            </h3>
            <ul>
              {pains.map(p => (
                <li key={p}><Icon name="cross" size={15} stroke={2.6} />{p}</li>
              ))}
            </ul>
          </div>

          <div className="vs-arrow reveal reveal-delay-1" aria-hidden="true">
            <Icon name="arrow-right" size={22} stroke={2.4} />
          </div>

          <div className="vs-card good reveal reveal-delay-2">
            <h3 className="vs-title">
              <span className="icon-tile"><Icon name="check" size={18} stroke={2.4} /></span>
              Con MagiMate
            </h3>
            <ul>
              {gains.map(g => (
                <li key={g}><Icon name="check" size={15} stroke={2.6} />{g}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   CÓMO FUNCIONA
   ══════════════════════════════════════════════ */
function ComoFunciona() {
  return (
    <section id="como-funciona" style={{ padding: 'var(--section-pad)', background: 'var(--white)' }}>
      <div className="container">
        <div className="sec-head reveal">
          <span className="section-label">El proceso</span>
          <h2 className="section-title">
            Así de <Marker color="var(--coral)">simple</Marker> funciona
          </h2>
          <p className="section-sub">
            En menos de 24 horas puedes tener tu primera sesión lista. Sin burocracia, sin complicaciones.
          </p>
        </div>

        <div className="steps-grid">
          {PASOS.map((p, i) => (
            <div key={p.num} className={`step-card reveal reveal-delay-${i}`}
              style={{ '--c': p.color, '--bg': p.bg }}>
              <span className="step-num" aria-hidden="true">{p.num}</span>
              <div className="icon-tile">
                <Icon name={p.icon} size={25} />
              </div>
              <div className="step-badge">Paso {p.num}</div>
              <h4>{p.titulo}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   LEAD MAGNET — Clase gratuita
   ══════════════════════════════════════════════ */
function LeadMagnet() {
  const items = [
    'Identificamos dónde perdiste el hilo exactamente',
    'Evaluamos tu nivel sin juicios ni presiones',
    'Diseñamos un plan de ruta personalizado',
    'Respondemos todas tus dudas sobre las clases en línea',
    'Te decimos honestamente si MagiMate es para ti',
  ]

  return (
    <section className="lead grid-paper-dark">
      <Wave fill="#FFFFFF" position="top" />
      <div className="container lead-grid">
        <div className="reveal">
          <span className="section-label">100% gratuito</span>
          <h2 className="section-title">
            Antes de decidir,<br />
            <Marker>prueba sin riesgo</Marker>
          </h2>
          <p className="lead-text">
            15 minutos de diagnóstico gratuito para conocer tu nivel, tus objetivos y diseñar tu camino. Sin tarjeta, sin presión.
          </p>
          <a href="#contacto" className="btn btn-yellow">
            <Icon name="calendar" size={17} stroke={2} />
            Reservar mi lugar gratis
          </a>
        </div>

        <div className="lead-card reveal reveal-delay-1">
          <div className="lead-card-head">
            <h4>En tu diagnóstico gratuito...</h4>
            <span className="lead-time">
              <Icon name="clock" size={12} stroke={2.4} />
              15 min
            </span>
          </div>
          <ul>
            {items.map(item => (
              <li key={item}>
                <Icon name="arrow-right" size={15} stroke={2.4} />
                {item}
              </li>
            ))}
          </ul>
          <div className="lead-card-foot">
            <Icon name="video" size={15} stroke={2} />
            Por videollamada · Agenda en menos de 2 minutos
          </div>
        </div>
      </div>

      <Wave fill="var(--off)" position="bottom" />
    </section>
  )
}

/* ══════════════════════════════════════════════
   COTIZACIONES / PAQUETES
   Al elegir un paquete se precarga en el formulario
   ══════════════════════════════════════════════ */
function Servicios({ onPick }) {
  return (
    <section id="servicios" style={{ padding: 'var(--section-pad)', background: 'var(--off)' }} className="grid-paper">
      <div className="container">
        <div className="sec-head reveal">
          <span className="section-label">Cotiza tu paquete</span>
          <h2 className="section-title">
            Elige tu <Marker color="var(--green)">ritmo</Marker>
          </h2>
          <p className="section-sub">
            A mayor compromiso, mayor ahorro. Todos los paquetes incluyen seguimiento personalizado y precios en pesos mexicanos.
          </p>
        </div>

        <div className="pkg-grid">
          {PAQUETES.map((pkg, i) => (
            <div key={pkg.id}
              className={`pkg-card reveal reveal-delay-${i} ${pkg.destacado ? 'featured' : ''}`}
              style={{ '--c': pkg.color }}>
              {pkg.destacado && (
                <div className="pkg-pop">
                  <Icon name="sparkle" size={12} stroke={2.4} />
                  Más popular
                </div>
              )}

              <div className="icon-tile">
                <Icon name={pkg.icon} size={26} />
              </div>

              <h3>{pkg.nombre}</h3>
              <p className="pkg-desc">{pkg.desc}</p>

              {/* TODO: Ajusta los precios reales en data.jsx */}
              <div className="pkg-price">
                {pkg.prefijo && <span className="pkg-prefix">{pkg.prefijo}</span>}
                <span className="pkg-amount">{pkg.precio}</span>
                <span className="pkg-mxn">MXN</span>
              </div>
              <div className="pkg-meta">
                {pkg.nota}
                {pkg.ahorro && <span className="pkg-save">{pkg.ahorro}</span>}
              </div>

              <hr className="pkg-divider" />

              <ul>
                {pkg.features.map(f => (
                  <li key={f}><Icon name="check" size={15} stroke={2.6} />{f}</li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`btn pkg-btn ${pkg.destacado ? 'pkg-btn-solid' : 'pkg-btn-soft'}`}
                onClick={() => onPick(pkg.nombre)}
              >
                Cotizar este paquete
                <Icon name="arrow-right" size={15} stroke={2.4} />
              </a>
            </div>
          ))}
        </div>

        <div className="pkg-trust reveal">
          <span><Icon name="shield" size={18} />Pago por transferencia o tarjeta</span>
          <span><Icon name="clock" size={18} />Reprograma con 24 h de anticipación</span>
          <span><Icon name="globe" size={18} />Disponible en toda Latinoamérica</span>
        </div>

        <p className="pkg-help">
          ¿No sabes cuál elegir? El diagnóstico gratuito lo resuelve.{' '}
          <a href="#contacto" onClick={() => onPick(PAQUETE_GRATIS)}>
            Agenda aquí
            <Icon name="arrow-right" size={14} stroke={2.4} />
          </a>
        </p>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   SOBRE EL PROFESOR
   ══════════════════════════════════════════════ */
function SobreMi() {
  const creds = [
    { icon: 'cap',   color: '#4182FA', titulo: 'Formación académica', desc: PROFESOR.credencial },
    { icon: 'bulb',  color: '#E5A800', titulo: 'Metodología propia',  desc: 'Didáctica + tecnología educativa' },
    { icon: 'globe', color: '#FF6B6B', titulo: 'Cobertura',           desc: 'Toda Latinoamérica' },
    { icon: 'chart', color: '#3DA94C', titulo: 'Resultado probado',   desc: 'Mejora real en calificaciones' },
  ]

  return (
    <section id="sobre-mi" style={{ padding: 'var(--section-pad)', background: 'white' }}>
      <div className="container sobre-grid">
        {/* TODO: Reemplaza por <img src={PROFESOR.foto} alt={PROFESOR.nombre} className="sobre-photo" style={{objectFit:'cover'}} /> cuando tengas la foto */}
        <div className="sobre-photo reveal">
          <div className="sobre-monogram">{PROFESOR.iniciales}</div>
          <p>Foto del profesor</p>
        </div>

        <div className="reveal reveal-delay-1">
          <span className="section-label">Tu guía</span>
          <h2 className="section-title">{PROFESOR.nombre}</h2>
          <span className="sobre-rol">{PROFESOR.rol}</span>

          <p className="sobre-bio">{PROFESOR.bio1}</p>
          <p className="sobre-bio">{PROFESOR.bio2}</p>

          <div className="creds-grid">
            {creds.map(c => (
              <div key={c.titulo} className="cred">
                <Icon name={c.icon} size={21} style={{ color: c.color }} />
                <div>
                  <h5>{c.titulo}</h5>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   TESTIMONIALES
   ══════════════════════════════════════════════ */
function Testimoniales() {
  return (
    <section style={{ padding: 'var(--section-pad)', background: 'var(--off)' }}>
      <div className="container">
        <div className="sec-head reveal">
          <span className="section-label">Lo que dicen</span>
          {/* TODO: Actualiza cuando tengas testimoniales reales */}
          <h2 className="section-title">
            Historias <Marker color="var(--coral)">reales</Marker>
          </h2>
          <p className="section-sub">Primeros alumnos de MagiMate compartiendo su experiencia.</p>
        </div>

        <div className="testi-grid">
          {TESTIMONIALES.map((t, i) => (
            <div key={t.nombre} className={`testi-card reveal reveal-delay-${i}`} style={{ '--c': t.color }}>
              <div className="testi-stars" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }, (_, s) => <Icon key={s} name="star" size={15} />)}
              </div>
              <blockquote>{t.texto}</blockquote>
              <div className="testi-who">
                <div className="testi-avatar">{t.iniciales}</div>
                <div>
                  <strong>{t.nombre}</strong>
                  <span>{t.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   FAQ — Acordeón con altura animada
   ══════════════════════════════════════════════ */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" style={{ padding: 'var(--section-pad)', background: 'white' }}>
      <div className="container">
        <div className="sec-head reveal">
          <span className="section-label">Preguntas frecuentes</span>
          <h2 className="section-title">
            Todo lo que necesitas <Marker color="var(--purple)">saber</Marker>
          </h2>
        </div>

        <div className="faq-grid">
          {FAQS.map((f, i) => (
            <div key={f.q} className={`faq-item reveal reveal-delay-${i % 2} ${openIdx === i ? 'open' : ''}`}>
              <button
                className="faq-q"
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                aria-expanded={openIdx === i}
              >
                {f.q}
                <span className="faq-x"><Icon name="plus" size={16} stroke={2.4} /></span>
              </button>
              <div className="faq-body">
                <div className="faq-inner">
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   CONTACTO — Cotización por WhatsApp
   El formulario arma el mensaje y abre WhatsApp
   con todo listo para enviar. Sin backend.
   ══════════════════════════════════════════════ */
const WA_NUMERO = CONTACTO.whatsapp.replace(/\D/g, '')

function buildWhatsAppUrl(form) {
  const lines = [
    `¡Hola! Soy ${form.nombre}.`,
    `Me interesa: ${form.paquete || PAQUETE_GRATIS}`,
    form.materia && `Materia: ${form.materia}`,
    form.horario && `Disponibilidad: ${form.horario}`,
    form.mensaje && `Mi situación: ${form.mensaje}`,
    `Mi correo: ${form.email}`,
  ].filter(Boolean).join('\n')
  return `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(lines)}`
}

function Contacto({ pick }) {
  const [form, setForm] = useState({ nombre: '', email: '', paquete: PAQUETE_GRATIS, materia: '', horario: '', mensaje: '' })
  const [sent, setSent] = useState(false)
  const [waUrl, setWaUrl] = useState('')

  // pick es un objeto nuevo en cada clic (nonce), así el efecto corre siempre,
  // incluso al re-elegir el mismo paquete.
  useEffect(() => {
    if (pick) {
      setForm(f => ({ ...f, paquete: pick.nombre }))
      setSent(false)
    }
  }, [pick])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = buildWhatsAppUrl(form)
    setWaUrl(url)
    window.open(url, '_blank', 'noopener')
    setSent(true)
  }

  return (
    <section id="contacto" className="contacto grid-paper-dark">
      <Wave fill="#FFFFFF" position="top" />
      <FloatingSymbols />
      <div className="contacto-inner">
        <span className="section-label">¿Listo para empezar?</span>
        <h2 className="section-title">
          Tu primera clase es <Marker>gratis.</Marker><br />
          ¿Qué tienes que perder?
        </h2>
        <p className="contacto-sub">
          Cuéntanos qué necesitas y recibe tu cotización al instante por WhatsApp.
        </p>

        {sent ? (
          <div className="sent-card">
            <div className="sent-icon">
              <Icon name="check" size={32} stroke={3} />
            </div>
            <h3>¡Tu cotización va en camino!</h3>
            <p>
              Se abrió WhatsApp con tu mensaje listo — solo presiona enviar.
              Te respondemos en menos de 24 horas para agendar tu diagnóstico gratuito.
            </p>
            <div className="sent-actions">
              <a href={waUrl} target="_blank" rel="noreferrer" className="btn btn-yellow">
                <Icon name="whatsapp" size={17} stroke={2} />
                Abrir WhatsApp de nuevo
              </a>
              <button className="btn btn-ghost-dark" onClick={() => setSent(false)}>
                Editar mi solicitud
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-card">
            <div className="form-row">
              <div className="field">
                <label htmlFor="f-nombre">Tu nombre completo</label>
                <input id="f-nombre" type="text" name="nombre" required
                  placeholder="Ej. Sofía Martínez" value={form.nombre} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="f-email">Correo electrónico</label>
                <input id="f-email" type="email" name="email" required
                  placeholder="tu@correo.com" value={form.email} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="f-paquete">¿Qué quieres cotizar?</label>
                <select id="f-paquete" name="paquete" value={form.paquete} onChange={handleChange}>
                  <option value={PAQUETE_GRATIS}>{PAQUETE_GRATIS}</option>
                  {PAQUETES.map(p => (
                    <option key={p.id} value={p.nombre}>
                      {p.nombre} · {p.precio} MXN {p.nota}
                    </option>
                  ))}
                </select>
                {pick && pick.nombre === form.paquete && form.paquete !== PAQUETE_GRATIS && (
                  <span className="field-hint">
                    <Icon name="sparkle" size={13} stroke={2.2} />
                    Paquete precargado desde cotizaciones
                  </span>
                )}
              </div>
              <div className="field">
                <label htmlFor="f-materia">Materia que necesitas</label>
                <select id="f-materia" name="materia" value={form.materia} onChange={handleChange}>
                  <option value="" disabled>Selecciona...</option>
                  {MATERIAS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="f-horario">¿Cuándo te viene bien? (opcional)</label>
                <input id="f-horario" type="text" name="horario"
                  placeholder="Ej. Lunes tarde, fines de semana"
                  value={form.horario} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="f-mensaje">Tu situación (opcional)</label>
                <input id="f-mensaje" type="text" name="mensaje"
                  placeholder="Ej. Me cuesta cálculo diferencial..."
                  value={form.mensaje} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="btn btn-block" style={{
              background: 'var(--green)', color: '#11331a',
              boxShadow: '0 5px 20px rgba(107,203,119,0.35)', fontSize: '1.02rem',
            }}>
              <Icon name="whatsapp" size={18} stroke={2} />
              Enviar mi cotización por WhatsApp
            </button>

            <p className="form-note">
              Se abre WhatsApp con tu mensaje ya escrito — tú decides cuándo enviarlo. Sin spam, sin compromisos.
            </p>
          </form>
        )}

        <div className="contacto-alt">
          <span>¿Prefieres otro medio?</span>
          <a href={CONTACTO.whatsapp} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" size={15} stroke={2.2} />
            WhatsApp directo
          </a>
          <a href={`mailto:${CONTACTO.email}`} className="alt-mail">
            <Icon name="mail" size={15} stroke={2} />
            {CONTACTO.email}
          </a>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════ */
function Footer() {
  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    ...NAV_LINKS,
    { label: 'Contacto', href: '#contacto' },
  ]
  const redes = REDES.filter(r => r.url)

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="logo-mark" style={{ width: 40, height: 40, fontSize: 17 }}>M²</div>
              <span className="logo-text" style={{ color: 'white' }}>MagiMate</span>
            </div>
            <p>El arte de imaginar. Asesorías de matemáticas personalizadas para toda Latinoamérica.</p>
            <div className="footer-social">
              {redes.map(r => (
                <a key={r.label} href={r.url} target="_blank" rel="noreferrer" title={r.label} aria-label={r.label}>
                  <Icon name={r.icon} size={17} stroke={1.7} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h5>Navegar</h5>
              <ul>
                {navLinks.map(l => (
                  <li key={l.href + l.label}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h5>Contacto</h5>
              <ul>
                <li>
                  <a href={`mailto:${CONTACTO.email}`}>
                    <Icon name="mail" size={15} stroke={2} />
                    {CONTACTO.email}
                  </a>
                </li>
                <li>
                  <a href={CONTACTO.whatsapp} target="_blank" rel="noreferrer">
                    <Icon name="whatsapp" size={15} stroke={2} />
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MagiMate. Todos los derechos reservados.</p>
          <p className="footer-made">
            Hecho con constancia, disciplina y éxito
            <Icon name="sparkle" size={13} stroke={2} />
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════
   ROOT APP
   ══════════════════════════════════════════════ */
export default function App() {
  useReveal()
  // pick = { nombre, nonce }. El nonce cambia en cada clic para que el efecto
  // de Contacto reaccione incluso al re-elegir el mismo paquete dos veces.
  const [pick, setPick] = useState(null)
  const handlePick = (nombre) => setPick(p => ({ nombre, nonce: (p?.nonce ?? 0) + 1 }))

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Audiencia />
        <Problema />
        <ComoFunciona />
        <LeadMagnet />
        <Servicios onPick={handlePick} />
        <SobreMi />
        <Testimoniales />
        <FAQ />
        <Contacto pick={pick} />
      </main>
      <Footer />
    </>
  )
}
