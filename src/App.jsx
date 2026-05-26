import { useState, useEffect, useRef } from 'react'
import {
  PROFESOR, PAQUETES, AUDIENCIAS, PASOS,
  FAQS, TESTIMONIALES, REDES, MATERIAS, CONTACTO,
} from './data.jsx'

/* ══════════════════════════════════════════════
   HOOK: useReveal — scroll-triggered fade-in
   ══════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ══════════════════════════════════════════════
   FLOATING MATH SYMBOLS (decorative)
   ══════════════════════════════════════════════ */
const MATH_SYMBOLS = [
  { sym: '∑', top: '10%',  left: '3%',   size: 80,  delay: 0,    color: '#B1CDF9', rot: -10 },
  { sym: 'π', top: '65%',  left: '5%',   size: 60,  delay: 0.8,  color: '#FFD93D', rot: 8   },
  { sym: '∞', top: '20%',  right: '4%',  size: 70,  delay: 0.4,  color: '#FF6B6B', rot: -5  },
  { sym: '√', bottom:'12%',right: '6%',  size: 55,  delay: 1.2,  color: '#6BCB77', rot: 12  },
  { sym: '÷', top: '50%',  left: '47%',  size: 48,  delay: 0.6,  color: '#A78BFA', rot: -8  },
  { sym: 'Δ', top: '35%',  left: '8%',   size: 44,  delay: 1.5,  color: '#4182FA', rot: 5   },
  { sym: '%', bottom:'25%',left: '15%',  size: 50,  delay: 0.3,  color: '#FFD93D', rot: -15 },
  { sym: '±', top: '75%',  right: '10%', size: 46,  delay: 1.0,  color: '#FF6B6B', rot: 10  },
]

function FloatingSymbols() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {MATH_SYMBOLS.map((s, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: s.top, left: s.left, right: s.right, bottom: s.bottom,
            fontSize: s.size,
            color: s.color,
            opacity: 0.18,
            fontFamily: 'var(--font-display)',
            animation: `float ${3 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
            transform: `rotate(${s.rot}deg)`,
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          {s.sym}
        </span>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════
   WAVE DIVIDER
   ══════════════════════════════════════════════ */
function Wave({ fill = '#FFFFFF', flip = false, style = {} }) {
  return (
    <div style={{ display: 'block', overflow: 'hidden', lineHeight: 0, transform: flip ? 'scaleY(-1)' : 'none', ...style }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 60 }}>
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill={fill} />
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Para quién', href: '#audiencia' },
    { label: 'Servicios',  href: '#servicios' },
    { label: 'Profe',      href: '#sobre-mi'  },
    { label: 'FAQ',        href: '#faq'        },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.9rem 5%',
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      boxShadow: scrolled ? '0 2px 20px rgba(28,74,166,0.1)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Logo */}
      {/* TODO: Reemplaza este bloque con tu logo SVG real cuando lo tengas */}
      <a href="#inicio" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 14,
          background: 'linear-gradient(135deg, var(--navy), var(--blue))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: 20, color: 'white',
          boxShadow: '0 4px 12px rgba(65,130,250,0.4)',
        }}>
          M²
        </div>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '1.35rem',
          color: scrolled ? 'var(--dark)' : 'white',
          transition: 'color 0.3s',
        }}>
          MagiMate
        </span>
      </a>

      {/* Desktop links */}
      <ul style={{ listStyle: 'none', display: 'flex', gap: '1.8rem', alignItems: 'center' }}
        className="nav-links-desktop">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} style={{
              textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem',
              color: scrolled ? 'var(--gray)' : 'rgba(255,255,255,0.85)',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--blue)'}
              onMouseLeave={e => e.target.style.color = scrolled ? 'var(--gray)' : 'rgba(255,255,255,0.85)'}
            >
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contacto" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem' }}>
            Clase gratis 🎯
          </a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menú"
        style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '1.5rem', color: scrolled ? 'var(--dark)' : 'white',
        }}
        className="hamburger"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 65, left: 0, right: 0, bottom: 0,
          background: 'white', zIndex: 199, padding: '2rem 5%',
          display: 'flex', flexDirection: 'column', gap: '1.5rem',
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: 'none', fontFamily: 'var(--font-display)',
                fontSize: '1.4rem', color: 'var(--dark)', borderBottom: '2px solid var(--off)',
                paddingBottom: '1rem',
              }}>
              {l.label}
            </a>
          ))}
          <a href="#contacto" className="btn-primary" style={{ textAlign: 'center' }}
            onClick={() => setMenuOpen(false)}>
            🎯 Clase gratis
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}

/* ══════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="inicio" style={{
      minHeight: '100vh', background: 'linear-gradient(150deg, var(--dark) 0%, #0f2d6b 60%, #1a3a8a 100%)',
      display: 'flex', alignItems: 'center', position: 'relative',
      overflow: 'hidden', padding: 'calc(5rem + 80px) 5% 2rem',
    }}>
      <FloatingSymbols />

      {/* Glowing orbs */}
      <div aria-hidden="true" style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(65,130,250,0.2) 0%, transparent 70%)',
        top: -150, right: -100, pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,217,61,0.08) 0%, transparent 70%)',
        bottom: 0, left: '15%', pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'center' }}>
        {/* Left: copy */}
        <div>
          {/* Colorful playful badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
            {['📚','➕','🧮','✖️','🎉'].map((e, i) => (
              <span key={i} style={{ fontSize: '1.3rem', animation: `float ${2.5 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>{e}</span>
            ))}
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 6vw, 4.2rem)', color: 'white', lineHeight: 1.05, marginBottom: '1.2rem' }}>
            Descubre<br />
            el <span style={{
              background: 'linear-gradient(90deg, var(--yellow), var(--coral))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>genio</span><br />
            en ti
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: '2rem', maxWidth: 460, fontWeight: 500 }}>
            Asesorías de matemáticas 100% personalizadas, en línea y para{' '}
            <span style={{ color: 'var(--sky)', fontWeight: 700 }}>todas las edades</span> —
            desde niños hasta adultos, en toda Latinoamérica.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#contacto" className="btn-primary" style={{ background: 'linear-gradient(135deg, var(--coral), #e85555)', boxShadow: '0 4px 20px rgba(255,107,107,0.4)', fontSize: '1.05rem' }}>
              🎯 Clase gratis de 15 min
            </a>
            <a href="#como-funciona" className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.8)' }}>
              Ver cómo funciona ↓
            </a>
          </div>

          {/* Social proof */}
          {/* TODO: Actualiza el número de alumnos cuando tengas datos reales */}
          <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex' }}>
              {['AL', 'MR', 'JG', 'VP'].map((ini, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: ['var(--blue)', 'var(--coral)', 'var(--green)', 'var(--purple)'][i],
                  border: '2.5px solid var(--dark)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.72rem',
                  color: 'white', marginLeft: i ? -10 : 0,
                }}>{ini}</div>
              ))}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)' }}>
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}>+50 alumnos</strong> ya mejoraron su calificación
            </p>
          </div>
        </div>

        {/* Right: card */}
        <div style={{ position: 'relative' }}>
          {/* Floating tags */}
          <div style={{
            position: 'absolute', top: -18, right: 10, zIndex: 2,
            background: 'var(--yellow)', color: '#4a3a00',
            fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.82rem',
            padding: '0.45rem 1.1rem', borderRadius: 'var(--radius-pill)',
            boxShadow: '0 4px 14px rgba(255,217,61,0.4)',
            animation: 'float 3s ease-in-out infinite',
          }}>
            ✨ 100% personalizado
          </div>
          <div style={{
            position: 'absolute', bottom: -14, left: -10, zIndex: 2,
            background: 'var(--green)', color: '#1a3d0a',
            fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.82rem',
            padding: '0.45rem 1.1rem', borderRadius: 'var(--radius-pill)',
            boxShadow: '0 4px 14px rgba(107,203,119,0.4)',
            animation: 'float2 3.5s ease-in-out infinite',
          }}>
            📈 +2 puntos en promedio
          </div>

          {/* Main card */}
          <div style={{
            background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(177,205,249,0.2)',
            borderRadius: 28, padding: '2rem', backdropFilter: 'blur(12px)',
          }}>
            {/* Mac-style top bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
              {['#FF6B6B', '#FFD93D', '#6BCB77'].map((c, i) => (
                <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginLeft: 8, fontWeight: 700 }}>
                MagiMate · Sesión en vivo
              </span>
            </div>

            {[
              '✓ Explicaciones adaptadas a tu ritmo',
              '✓ Pizarra digital + recursos visuales',
              '✓ Sesiones grabadas para repasar',
              '✓ Seguimiento de tu progreso',
              '✓ Desde cualquier dispositivo',
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '0.7rem 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                color: 'rgba(255,255,255,0.82)', fontSize: '0.95rem', fontWeight: 500,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: `rgba(${['65,130,250', '255,107,107', '107,203,119', '167,139,250', '255,217,61'][i]}, 0.2)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 800,
                  color: ['var(--sky)', 'var(--coral)', 'var(--green)', 'var(--purple)', 'var(--yellow)'][i],
                  flexShrink: 0,
                }}>✓</div>
                {item.replace('✓ ', '')}
              </div>
            ))}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '1.2rem' }}>
              {[['98%', 'Satisfacción'], ['1:1', 'Atención pura']].map(([num, lbl]) => (
                <div key={num} style={{
                  background: 'rgba(65,130,250,0.12)', border: '1px solid rgba(65,130,250,0.2)',
                  borderRadius: 14, padding: '0.9rem', textAlign: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', color: 'var(--sky)', display: 'block', lineHeight: 1 }}>{num}</span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Wave fill="#FFFFFF" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />

      <style>{`
        @media (max-width: 900px) {
          #inicio .container { grid-template-columns: 1fr !important; }
          #inicio .container > div:last-child { display: none; }
        }
      `}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════
   AUDIENCIA — Para quién
   ══════════════════════════════════════════════ */
function Audiencia() {
  return (
    <section id="audiencia" style={{ padding: 'var(--section-pad)', background: 'var(--white)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Para quién es</span>
          <h2 className="section-title">Matemáticas para <span style={{ color: 'var(--blue)' }}>todas las edades</span></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            No importa si eres estudiante de primaria, universitario o un profesional que quiere reforzar — aquí hay un lugar para ti.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.3rem' }}>
          {AUDIENCIAS.map((a, i) => (
            <div key={i} className={`reveal reveal-delay-${i}`}
              style={{
                background: a.bg, borderRadius: 24, padding: '2rem 1.6rem',
                border: `2.5px solid ${a.color}30`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${a.color}25` }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              <div style={{
                fontSize: '2.8rem', marginBottom: '1rem', display: 'block',
                animation: `float ${2.8 + i * 0.2}s ease-in-out infinite`, animationDelay: `${i * 0.4}s`,
              }}>
                {a.emoji}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: a.color, marginBottom: 4 }}>{a.label}</h3>
              <p style={{ fontSize: '0.8rem', fontWeight: 800, color: a.color, opacity: 0.6, marginBottom: '0.8rem', letterSpacing: 0.5 }}>{a.rango}</p>
              <p style={{ fontSize: '0.92rem', color: 'var(--gray)', lineHeight: 1.6 }}>{a.desc}</p>
              <div style={{
                marginTop: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: 6,
                fontWeight: 800, fontSize: '0.82rem', color: a.color,
              }}>
                Ver más →
              </div>
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
    'Pizarra digital, recursos visuales y tech educativa',
    'Flexibilidad total desde tu casa o dónde estés',
    'Un experto que ya pasó por donde tú estás',
    'Resultados medibles: más confianza, mejores notas',
  ]

  return (
    <section style={{ padding: 'var(--section-pad)', background: 'var(--off)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">El problema real</span>
          <h2 className="section-title">¿Te suena familiar?</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            No estás solo/a. La mayoría no tiene problemas con las matemáticas — los tiene con <em>cómo se las enseñan</em>.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Pain */}
          <div className="reveal" style={{ background: 'white', borderRadius: 24, padding: '2rem', border: '2px solid #FFE0E0' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#C0392B', marginBottom: '1.3rem' }}>❌ Sin MagiMate</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {pains.map((p, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.93rem', color: 'var(--gray)', lineHeight: 1.5 }}>
                  <span style={{ color: '#E74C3C', fontWeight: 800, flexShrink: 0, marginTop: 2 }}>✗</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow */}
          <div className="reveal reveal-delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '3rem' }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--blue), var(--navy))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '1.4rem', boxShadow: '0 4px 16px rgba(65,130,250,0.35)',
              animation: 'float 2.5s ease-in-out infinite',
            }}>→</div>
          </div>

          {/* Gain */}
          <div className="reveal reveal-delay-2" style={{ background: 'white', borderRadius: 24, padding: '2rem', border: '2px solid #C8F7D2' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#27AE60', marginBottom: '1.3rem' }}>✅ Con MagiMate</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {gains.map((g, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.93rem', color: 'var(--gray)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--green)', fontWeight: 800, flexShrink: 0, marginTop: 2 }}>✓</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #problema-grid { grid-template-columns: 1fr !important; }
          #problema-arrow { display: none !important; }
        }
      `}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════
   CÓMO FUNCIONA
   ══════════════════════════════════════════════ */
function ComoFunciona() {
  const COLORS = ['var(--blue)', 'var(--coral)', 'var(--green)', 'var(--purple)']
  const BG     = ['#EEF4FF', '#FFF0F0', '#F0FBF1', '#F5F0FF']

  return (
    <section id="como-funciona" style={{ padding: 'var(--section-pad)', background: 'var(--white)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">El proceso</span>
          <h2 className="section-title">Así de <span style={{ color: 'var(--coral)' }}>simple</span> funciona</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            En menos de 24 horas puedes tener tu primera sesión lista. Sin burocracia, sin complicaciones.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.3rem' }}>
          {PASOS.map((p, i) => (
            <div key={i}
              className={`reveal reveal-delay-${i}`}
              style={{
                background: BG[i], borderRadius: 24, padding: '2rem 1.6rem',
                border: `2px solid ${COLORS[i]}20`,
                position: 'relative', overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${COLORS[i]}25` }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              {/* Numero decorativo */}
              <span style={{
                position: 'absolute', top: -10, right: 16,
                fontFamily: 'var(--font-display)', fontSize: '5rem',
                color: COLORS[i], opacity: 0.08, lineHeight: 1,
                userSelect: 'none',
              }}>{p.num}</span>

              <span style={{ fontSize: '2.2rem', marginBottom: '1rem', display: 'block',
                animation: `float ${2.5 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.5}s`,
              }}>{p.emoji}</span>

              <div style={{
                display: 'inline-block', background: COLORS[i], color: 'white',
                fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.72rem',
                letterSpacing: 1.2, textTransform: 'uppercase',
                padding: '0.25rem 0.7rem', borderRadius: 'var(--radius-pill)',
                marginBottom: '0.8rem',
              }}>{p.num}</div>

              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--dark)', marginBottom: '0.6rem' }}>{p.titulo}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.6 }}>{p.desc}</p>
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
    <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #0f2060 100%)', position: 'relative', overflow: 'hidden', padding: 'var(--section-pad)' }}>
      <FloatingSymbols />
      <div className="container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <span className="section-label" style={{ color: 'var(--yellow)' }}>100% GRATUITO</span>
          <h2 className="section-title" style={{ color: 'white' }}>
            Antes de comprar,<br />
            <span style={{ color: 'var(--yellow)' }}>prueba sin riesgo</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: '1rem 0 2rem', fontSize: '1.05rem', fontWeight: 400 }}>
            15 minutos de diagnóstico gratuito para conocer tu nivel, tus objetivos y diseñar tu camino. Sin tarjeta, sin presión.
          </p>
          <a href="#contacto" className="btn-primary" style={{
            background: 'linear-gradient(135deg, var(--yellow), #f0a500)',
            color: '#4a3a00', boxShadow: '0 4px 20px rgba(255,217,61,0.4)',
          }}>
            🎯 Reservar mi lugar gratis
          </a>
        </div>

        <div className="reveal" style={{
          background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(177,205,249,0.2)',
          borderRadius: 24, padding: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.3rem' }}>
            <h4 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '1.1rem' }}>En tu diagnóstico gratuito...</h4>
            <span style={{
              background: 'var(--coral)', color: 'white', fontSize: '0.7rem',
              fontWeight: 800, padding: '3px 10px', borderRadius: 'var(--radius-pill)',
            }}>15 min</span>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
            {items.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--yellow)', fontWeight: 800, flexShrink: 0 }}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            💬 Por videollamada · Agenda en menos de 2 minutos
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #lead-magnet-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════
   SERVICIOS / PAQUETES
   ══════════════════════════════════════════════ */
function Servicios() {
  return (
    <section id="servicios" style={{ padding: 'var(--section-pad)', background: 'var(--off)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Paquetes</span>
          <h2 className="section-title">Elige tu <span style={{ color: 'var(--green)' }}>ritmo</span></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            A mayor compromiso, mayor ahorro. Todos los paquetes incluyen seguimiento personalizado.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {PAQUETES.map((pkg, i) => (
            <div key={pkg.id}
              className={`reveal reveal-delay-${i}`}
              style={{
                background: pkg.destacado ? 'var(--dark)' : 'white',
                borderRadius: 28, padding: '2.2rem 2rem',
                border: pkg.destacado ? `2.5px solid ${pkg.color}` : '2px solid var(--light)',
                position: 'relative', overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: pkg.destacado ? `0 8px 32px ${pkg.color}30` : 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${pkg.color}30` }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = pkg.destacado ? `0 8px 32px ${pkg.color}30` : '' }}
            >
              {pkg.destacado && (
                <div style={{
                  position: 'absolute', top: '1.2rem', right: '1.2rem',
                  background: pkg.color, color: 'white',
                  fontWeight: 800, fontSize: '0.7rem', letterSpacing: 1,
                  padding: '4px 12px', borderRadius: 'var(--radius-pill)',
                  textTransform: 'uppercase',
                }}>Más Popular</div>
              )}

              <span style={{ fontSize: '2.4rem', marginBottom: '1rem', display: 'block', animation: `float ${2.5 + i * 0.4}s ease-in-out infinite` }}>{pkg.emoji}</span>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: pkg.destacado ? 'white' : 'var(--dark)', marginBottom: '0.4rem' }}>{pkg.nombre}</h3>
              <p style={{ fontSize: '0.88rem', color: pkg.destacado ? 'rgba(255,255,255,0.5)' : 'var(--gray)', marginBottom: '1.5rem', lineHeight: 1.55 }}>{pkg.desc}</p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.8rem' }}>
                {pkg.features.map((f, fi) => (
                  <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: pkg.destacado ? 'rgba(255,255,255,0.75)' : 'var(--gray)' }}>
                    <span style={{ color: pkg.color, fontWeight: 800 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* TODO: Reemplaza $XXX con tu precio real */}
              <div style={{ marginBottom: '0.3rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: pkg.destacado ? pkg.color : pkg.color }}>{pkg.precio} MXN</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: pkg.destacado ? 'rgba(255,255,255,0.3)' : 'var(--gray)', marginBottom: '1.5rem' }}>
                {pkg.nota} {pkg.ahorro && <span style={{ color: 'var(--green)', fontWeight: 800 }}>· {pkg.ahorro}</span>}
              </p>

              <a href="#contacto" className="btn-primary" style={{
                width: '100%', justifyContent: 'center',
                background: pkg.destacado ? pkg.color : `${pkg.color}15`,
                color: pkg.destacado ? 'white' : pkg.color,
                boxShadow: pkg.destacado ? `0 4px 20px ${pkg.color}40` : 'none',
              }}>
                Empezar →
              </a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--gray)', fontSize: '0.9rem' }}>
          ¿No sabes cuál elegir? El diagnóstico gratuito lo resuelve. <a href="#contacto" style={{ color: 'var(--blue)', fontWeight: 700 }}>Agenda aquí →</a>
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
    { icon: '🎓', titulo: 'Formación académica', desc: PROFESOR.credencial },
    { icon: '💡', titulo: 'Metodología propia',   desc: 'Didáctica + tecnología educativa' },
    { icon: '🌎', titulo: 'Cobertura',             desc: 'Toda Latinoamérica' },
    { icon: '⚡', titulo: 'Resultado probado',      desc: 'Mejora real en calificaciones' },
  ]

  return (
    <section id="sobre-mi" style={{ padding: 'var(--section-pad)', background: 'white' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'center' }}>
        {/* Foto placeholder */}
        {/* TODO: Reemplaza este div por <img src="/foto-profesor.jpg" alt="..." style={{width:'100%',borderRadius:28,objectFit:'cover',aspectRatio:'4/5'}} /> */}
        <div className="reveal" style={{
          width: '100%', aspectRatio: '4/5', borderRadius: 28,
          background: 'linear-gradient(135deg, var(--navy), #1a3a85)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: '1rem',
          border: '3px dashed rgba(177,205,249,0.2)', position: 'relative',
          overflow: 'hidden',
        }}>
          <FloatingSymbols />
          <span style={{ fontSize: '5rem', position: 'relative', zIndex: 1 }}>👤</span>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
            Foto del Profesor
          </p>
        </div>

        <div className="reveal reveal-delay-1">
          <span className="section-label">Tu guía</span>
          <h2 className="section-title">{PROFESOR.nombre}</h2>
          <span style={{ color: 'var(--blue)', fontSize: '0.9rem', fontWeight: 800, display: 'block', marginBottom: '1.5rem' }}>{PROFESOR.rol}</span>

          <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '1rem' }}>{PROFESOR.bio1}</p>
          <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>{PROFESOR.bio2}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {creds.map((c, i) => (
              <div key={i} style={{
                background: 'var(--off)', border: '1.5px solid var(--light)',
                borderRadius: 16, padding: '1rem 1.2rem',
                display: 'flex', alignItems: 'flex-start', gap: 10,
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--mist)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--light)'}
              >
                <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <h5 style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--dark)', marginBottom: 2 }}>{c.titulo}</h5>
                  <p style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #sobre-mi .container { grid-template-columns: 1fr !important; }
          #sobre-mi .container > div:first-child { aspect-ratio: 3/2 !important; }
        }
      `}</style>
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
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Lo que dicen</span>
          {/* TODO: Actualiza cuando tengas testimoniales reales */}
          <h2 className="section-title">Historias <span style={{ color: 'var(--coral)' }}>reales</span></h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Primeros alumnos de MagiMate compartiendo su experiencia.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.3rem' }}>
          {TESTIMONIALES.map((t, i) => (
            <div key={i}
              className={`reveal reveal-delay-${i}`}
              style={{
                background: 'white', borderRadius: 24, padding: '2rem',
                border: '2px solid var(--light)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${t.color}20` }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              <div style={{ color: '#FFD93D', fontSize: '1rem', letterSpacing: 3, marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontSize: '0.95rem', color: 'var(--gray)', lineHeight: 1.75, marginBottom: '1.5rem', fontStyle: 'italic' }}>{t.texto}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '0.85rem', color: 'white', flexShrink: 0,
                  fontFamily: 'var(--font-body)',
                }}>{t.iniciales}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--dark)' }}>{t.nombre}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{t.meta}</div>
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
   FAQ — Accordion
   ══════════════════════════════════════════════ */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" style={{ padding: 'var(--section-pad)', background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Preguntas frecuentes</span>
          <h2 className="section-title">Todo lo que necesitas <span style={{ color: 'var(--purple)' }}>saber</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', maxWidth: 900, margin: '0 auto' }}>
          {FAQS.map((f, i) => (
            <div key={i}
              className={`reveal reveal-delay-${i % 2}`}
              style={{
                background: 'var(--off)', borderRadius: 20, overflow: 'hidden',
                border: openIdx === i ? '2px solid var(--blue)' : '2px solid var(--light)',
                transition: 'border-color 0.2s',
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '1.2rem 1.4rem', gap: '1rem', textAlign: 'left',
                  fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '0.95rem',
                  color: 'var(--dark)',
                }}
              >
                {f.q}
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: openIdx === i ? 'var(--blue)' : 'var(--light)',
                  color: openIdx === i ? 'white' : 'var(--navy)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', fontWeight: 700,
                  transition: 'all 0.2s', transform: openIdx === i ? 'rotate(45deg)' : 'none',
                }}>+</div>
              </button>
              {openIdx === i && (
                <div style={{ padding: '0 1.4rem 1.3rem', borderTop: '1px solid var(--light)' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.75, paddingTop: '1rem' }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #faq .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════
   CONTACTO — Formulario
   ══════════════════════════════════════════════ */
function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', materia: '', horario: '', mensaje: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // TODO: Conecta este submit a tu servicio preferido:
  // Opción A — Formspree: fetch(`https://formspree.io/f/${CONTACTO.formspreeId}`, { method:'POST', body: JSON.stringify(form), headers:{'Content-Type':'application/json'} })
  // Opción B — WhatsApp: reemplaza el form por un enlace a wa.me/
  // Opción C — EmailJS: usa la librería emailjs-com
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    // Simula envío por ahora — reemplaza con tu lógica real
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
  }

  return (
    <section id="contacto" style={{
      background: 'linear-gradient(150deg, var(--dark) 0%, #0f2060 100%)',
      padding: 'var(--section-pad)', position: 'relative', overflow: 'hidden',
    }}>
      <FloatingSymbols />
      <div className="container" style={{ position: 'relative', maxWidth: 720, textAlign: 'center' }}>
        <span className="section-label" style={{ color: 'var(--yellow)' }}>¿Listo?</span>
        <h2 className="section-title" style={{ color: 'white' }}>
          Tu primera clase es <span style={{ color: 'var(--yellow)' }}>gratis.</span><br />¿Qué tienes que perder?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.7, margin: '1rem auto 2rem', maxWidth: 500 }}>
          15 minutos pueden cambiar tu relación con las matemáticas para siempre.
        </p>

        {sent ? (
          <div style={{
            background: 'rgba(107,203,119,0.15)', border: '2px solid rgba(107,203,119,0.4)',
            borderRadius: 24, padding: '3rem', textAlign: 'center',
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem', animation: 'bounce-in 0.6s ease forwards' }}>🎉</div>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '1.6rem', marginBottom: '0.5rem' }}>¡Listo! Recibimos tu solicitud</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Te contactaremos en menos de 24 horas para agendar tu diagnóstico gratuito.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(177,205,249,0.15)',
            borderRadius: 28, padding: '2.5rem', textAlign: 'left',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {[
                { name: 'nombre', label: 'Tu nombre completo', placeholder: 'Ej. Sofía Martínez', type: 'text' },
                { name: 'email',  label: 'Correo electrónico',  placeholder: 'tu@correo.com',     type: 'email' },
              ].map(field => (
                <div key={field.name}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', marginBottom: '0.4rem' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type} name={field.name} required
                    placeholder={field.placeholder} value={form[field.name]}
                    onChange={handleChange}
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.07)',
                      border: '1.5px solid rgba(177,205,249,0.18)', borderRadius: 12,
                      padding: '0.75rem 1rem', color: 'white',
                      fontFamily: 'var(--font-body)', fontSize: '0.93rem', outline: 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', marginBottom: '0.4rem' }}>
                  Materia que necesitas
                </label>
                <select name="materia" value={form.materia} onChange={handleChange}
                  style={{
                    width: '100%', background: 'rgba(30,50,100,0.8)',
                    border: '1.5px solid rgba(177,205,249,0.18)', borderRadius: 12,
                    padding: '0.75rem 1rem', color: form.materia ? 'white' : 'rgba(255,255,255,0.3)',
                    fontFamily: 'var(--font-body)', fontSize: '0.93rem', outline: 'none',
                  }}>
                  <option value="" disabled>Selecciona...</option>
                  {MATERIAS.map(m => <option key={m} value={m} style={{ color: 'white', background: '#0D1B3E' }}>{m}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', marginBottom: '0.4rem' }}>
                  ¿Cuándo te viene bien? (opcional)
                </label>
                <input
                  type="text" name="horario" placeholder="Ej. Lunes tarde, fines de semana"
                  value={form.horario} onChange={handleChange}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.07)',
                    border: '1.5px solid rgba(177,205,249,0.18)', borderRadius: 12,
                    padding: '0.75rem 1rem', color: 'white',
                    fontFamily: 'var(--font-body)', fontSize: '0.93rem', outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'rgba(255,255,255,0.55)', marginBottom: '0.4rem' }}>
                Cuéntanos brevemente tu situación (opcional)
              </label>
              <textarea name="mensaje" rows={3} placeholder="Ej. Estoy en 2do semestre de ingeniería, me cuesta cálculo diferencial..."
                value={form.mensaje} onChange={handleChange}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.07)',
                  border: '1.5px solid rgba(177,205,249,0.18)', borderRadius: 12,
                  padding: '0.75rem 1rem', color: 'white',
                  fontFamily: 'var(--font-body)', fontSize: '0.93rem', outline: 'none',
                  resize: 'vertical',
                }} />
            </div>

            <button type="submit" className="btn-primary"
              disabled={sending}
              style={{
                width: '100%', justifyContent: 'center', fontSize: '1.05rem',
                background: sending ? '#666' : 'linear-gradient(135deg, var(--coral), #e85555)',
                boxShadow: sending ? 'none' : '0 4px 20px rgba(255,107,107,0.4)',
                cursor: sending ? 'not-allowed' : 'pointer',
              }}>
              {sending ? '⏳ Enviando...' : '🎯 Agendar mi diagnóstico gratuito'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)', marginTop: '0.8rem' }}>
              Sin spam. Sin compromisos. Respondemos en menos de 24 horas.
            </p>
          </form>
        )}

        {/* WhatsApp alternative */}
        {/* TODO: Actualiza con tu número real */}
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>¿Prefieres escribir directo?</span>
          <a href={CONTACTO.whatsapp} target="_blank" rel="noreferrer"
            style={{ color: 'var(--green)', fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none' }}>
            📱 WhatsApp →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          #contacto form > div:first-child,
          #contacto form > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

/* ══════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════ */
function Footer() {
  const navLinks = [
    { label: 'Inicio',         href: '#inicio'       },
    { label: 'Para quién',     href: '#audiencia'    },
    { label: 'Servicios',      href: '#servicios'    },
    { label: 'El Profesor',    href: '#sobre-mi'     },
    { label: 'FAQ',            href: '#faq'          },
    { label: 'Contacto',       href: '#contacto'     },
  ]

  return (
    <footer style={{ background: '#070F25', padding: '3.5rem 5% 2rem' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            {/* TODO: Reemplaza con logo real */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.8rem' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: 'linear-gradient(135deg, var(--navy), var(--blue))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontSize: 18, color: 'white',
              }}>M²</div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'white' }}>MagiMate</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
              El arte de imaginar. Asesorías de matemáticas personalizadas para toda Latinoamérica.
            </p>
            {/* Social */}
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.2rem' }}>
              {REDES.map(r => (
                <a key={r.label} href={r.url} target="_blank" rel="noreferrer"
                  title={r.label}
                  style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                    fontSize: '0.7rem', fontWeight: 800, fontFamily: 'var(--font-body)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'var(--sky)'; e.currentTarget.style.borderColor = 'var(--blue)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
                >
                  {r.label.substring(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <h5 style={{ fontWeight: 800, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: '1rem' }}>
                Navegar
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {navLinks.map(l => (
                  <li key={l.href}>
                    <a href={l.href} style={{
                      textDecoration: 'none', color: 'rgba(255,255,255,0.4)',
                      fontSize: '0.88rem', transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => e.target.style.color = 'var(--sky)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                    >{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 style={{ fontWeight: 800, fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: '1rem' }}>
                Contacto
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {/* TODO: Actualiza con datos reales */}
                <li><a href={`mailto:${CONTACTO.email}`} style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.88rem' }}>{CONTACTO.email}</a></li>
                <li><a href={CONTACTO.whatsapp} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.88rem' }}>WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '1.5rem' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.2)' }}>© 2025 MagiMate. Todos los derechos reservados.</p>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.12)' }}>Hecho con constancia, disciplina y éxito ✦</p>
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

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Audiencia />
        <Problema />
        <ComoFunciona />
        <LeadMagnet />
        <Servicios />
        <SobreMi />
        <Testimoniales />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}
