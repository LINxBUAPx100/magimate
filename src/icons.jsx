// ============================================================
//  icons.jsx — Sistema de iconos SVG de MagiMate
//  Trazos de 1.8px, esquinas redondeadas, rejilla de 24px.
//  Uso: <Icon name="check" size={20} />
// ============================================================

const ICONS = {
  /* ── básicos ── */
  check: <path d="M5 12.5l4.2 4.3L19 7" />,
  cross: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  'arrow-right': <path d="M4 12h15m-6-6l6 6-6 6" />,
  'arrow-down': <path d="M12 4v15m-6-6l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  send: <path d="M21.5 2.5L11 13m10.5-10.5L14.8 21.6a.4.4 0 01-.75.03L11 13l-8.63-3.05a.4.4 0 01.02-.76L21.5 2.5z" />,
  star: <path d="M12 2.8l2.8 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.1l-5.6 3 1.1-6.3L2.9 9.4l6.3-.9z" fill="currentColor" stroke="none" />,
  sparkle: <path d="M12 3l1.8 5.4a2 2 0 001.3 1.3L20.5 11.5l-5.4 1.8a2 2 0 00-1.3 1.3L12 20l-1.8-5.4a2 2 0 00-1.3-1.3L3.5 11.5l5.4-1.8a2 2 0 001.3-1.3L12 3z" />,

  /* ── audiencias ── */
  shapes: (
    <>
      <circle cx="7.2" cy="7" r="3.6" />
      <rect x="13.6" y="3.4" width="7" height="7" rx="1.6" />
      <path d="M12 13.8l4.6 7.2H7.4L12 13.8z" />
    </>
  ),
  backpack: (
    <>
      <rect x="5.5" y="7" width="13" height="13.5" rx="3.2" />
      <path d="M9 7V5.4a3 3 0 016 0V7M8.8 20.5v-4.1a2 2 0 012-2h2.4a2 2 0 012 2v4.1M5.5 12.5h13" />
    </>
  ),
  cap: (
    <>
      <path d="M2.5 9.3L12 4.8l9.5 4.5L12 13.8 2.5 9.3z" />
      <path d="M6.6 11.4v4.4c0 1.6 2.4 3 5.4 3s5.4-1.4 5.4-3v-4.4M21.5 9.5v5.2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12.5" rx="2.2" />
      <path d="M9 7.5V6a2 2 0 012-2h2a2 2 0 012 2v1.5M3.5 12.8h17" />
    </>
  ),

  /* ── pasos / servicios ── */
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15.5" rx="2.2" />
      <path d="M4 10.2h16M8.2 3v4M15.8 3v4M8.5 14.5l2.3 2.3 4.4-4.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4.2" width="18" height="13" rx="2.2" />
      <path d="M9 20.5h6M12 17.2v3.3M7.5 12.2l2.4-2.4 2 2 3.6-3.6" />
    </>
  ),
  chart: (
    <>
      <path d="M4 16.8l5.4-5.4 3.5 3.5 7-7" />
      <path d="M14.6 7.9h5.3v5.3" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 15.2l-3.2-3.2s.4-2.6 2.1-4.9C13.5 3.6 17.5 2.7 21 3c.3 3.5-.6 7.5-4.1 10.1-2.3 1.7-4.9 2.1-4.9 2.1z" />
      <path d="M8.8 12L5 12.6s.6-2.9 2-3.8c1-.7 2.6-.4 2.6-.4M12 15.2l-.6 3.8s2.9-.6 3.8-2c.7-1 .4-2.6.4-2.6M4.5 16.5c-1.3 1.1-1.7 4.4-1.7 4.4s3.3-.4 4.4-1.7" />
    </>
  ),
  bolt: <path d="M13 2.5L3.8 13.7h7.1l-.9 7.8 9.2-11.2h-7.1l.9-7.8z" />,
  trophy: (
    <>
      <path d="M7 3.5h10v6a5 5 0 01-10 0v-6z" />
      <path d="M7 5H4.8a2.3 2.3 0 000 4.6H7M17 5h2.2a2.3 2.3 0 010 4.6H17M12 14.5v3M8.5 20.5h7M9.5 17.5h5l.7 3h-6.4l.7-3z" />
    </>
  ),

  /* ── credenciales / misc ── */
  bulb: (
    <>
      <path d="M9 14.8a5.8 5.8 0 117.3-5.7c0 1.4-.5 2.6-1.5 3.6-.8.8-1.5 1.4-1.7 2.4" />
      <path d="M9.6 18h4.8M10.6 21h2.8M9 14.8h6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M3.2 12h17.6M12 3.2c2.3 2.4 3.6 5.5 3.6 8.8s-1.3 6.4-3.6 8.8c-2.3-2.4-3.6-5.5-3.6-8.8s1.3-6.4 3.6-8.8z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 21.5s7.5-3.2 7.5-9V5.8L12 2.8 4.5 5.8v6.7c0 5.8 7.5 9 7.5 9z" />
      <path d="M9 11.6l2.1 2.1 4-4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M12 6.8V12l3.4 2.2" />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="6" width="13.5" height="12" rx="2.4" />
      <path d="M16 10.4l5.5-3.2v9.6L16 13.6" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M10.2 8.9v6.2l5-3.1-5-3.1z" fill="currentColor" stroke="none" />
    </>
  ),
  users: (
    <>
      <circle cx="12" cy="8.2" r="3.7" />
      <path d="M5 20.2c.8-3.6 3.5-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  pencil: (
    <>
      <path d="M4 20l1-4L16.6 4.4a2.1 2.1 0 013 3L8 19l-4 1z" />
      <path d="M13.6 7.4l3 3" />
    </>
  ),
  mail: (
    <>
      <rect x="3.2" y="5.2" width="17.6" height="13.6" rx="2.2" />
      <path d="M3.8 7.5l8.2 5.8 8.2-5.8" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.8 11.6a8.8 8.8 0 01-12.7 7.9L3.3 20.7l1.3-4.6a8.8 8.8 0 1116.2-4.5z" />
      <path d="M9.2 8.9c0 .3-.2 2 1.6 3.9 1.9 1.8 3.6 1.7 3.9 1.6.4-.1.9-.7.8-1.1 0-.3-1.2-1-1.5-1-.4 0-.6.6-1 .5-.4-.1-1-.5-1.4-1-.5-.4-.9-1-1-1.4-.1-.4.5-.6.5-1 0-.3-.7-1.5-1-1.5-.4-.1-1 .4-1.1.8 0 .1 0 .2.2 1.2z" fill="currentColor" stroke="none" />
    </>
  ),

  /* ── redes sociales ── */
  instagram: (
    <>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.6" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M16.5 3h-2.3a4.4 4.4 0 00-4.4 4.4v2.8H7v3.6h2.8V21h3.7v-7.2h2.7l.7-3.6h-3.4V7.6a1 1 0 011-1h2V3z" />,
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.2l5 2.8-5 2.8V9.2z" fill="currentColor" stroke="none" />
    </>
  ),
  tiktok: <path d="M16.2 3.5c.4 2.4 2 4 4.3 4.2v3.2c-1.7 0-3.2-.5-4.3-1.4v6.3a6 6 0 11-6-6c.3 0 .6 0 .9.1v3.3a2.8 2.8 0 101.9 2.6V3.5h3.2z" />,
}

export function Icon({ name, size = 22, stroke = 1.8, ...props }) {
  const glyph = ICONS[name]
  if (!glyph) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {glyph}
    </svg>
  )
}
