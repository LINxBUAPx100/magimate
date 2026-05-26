# MagiMate — Descubre el Genio en Ti

Landing page oficial de **MagiMate**, asesorías de matemáticas personalizadas para toda Latinoamérica.

## 🚀 Inicio rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview
```

## 📁 Estructura del proyecto

```
magimate/
├── public/
│   └── favicon.svg          ← Reemplazar con logo final
├── src/
│   ├── App.jsx              ← Componentes de todas las secciones
│   ├── data.jsx             ← TODOS los textos y contenido editable
│   ├── index.css            ← Variables CSS y estilos globales
│   └── main.jsx             ← Punto de entrada React
├── .github/
│   └── workflows/
│       └── deploy.yml       ← Auto-deploy a GitHub Pages
├── index.html
├── package.json
└── vite.config.js
```

## ✏️ Personalización

### Textos y precios
Edita **`src/data.jsx`** — ahí están todos los textos, precios y datos del sitio.
Busca los comentarios `// TODO:` para saber qué cambiar.

### Colores
Edita las variables CSS en **`src/index.css`** en la sección `:root`.

### Logo
Reemplaza el marcador `M²` en `Navbar` y `Footer` dentro de `src/App.jsx`
con un componente `<img src="/tu-logo.svg" />`.

## 🌐 Deploy

### GitHub Pages (gratis)
1. Sube el proyecto a un repositorio de GitHub
2. Ve a `Settings > Pages`
3. En "Source" selecciona **GitHub Actions**
4. Haz push a `main` — el deploy es automático

### Vercel (recomendado, también gratis)
1. Conecta tu repo en [vercel.com](https://vercel.com)
2. Framework: **Vite** — detectado automáticamente
3. Deploy en segundos

### Dominio personalizado
Una vez desplegado, agrega tu dominio en la configuración de GitHub Pages o Vercel.

## 📋 TODOs pendientes

- [ ] Agregar logo vector real (reemplazar `M²`)
- [ ] Agregar foto del profesor (reemplazar placeholder)
- [ ] Definir precios reales en `data.jsx`
- [ ] Conectar formulario (Formspree / EmailJS / WhatsApp)
- [ ] Agregar links reales a redes sociales en `data.jsx`
- [ ] Reemplazar testimoniales de ejemplo por reseñas reales
- [ ] Comprar dominio y configurar
- [ ] Agregar Google Analytics / Facebook Pixel

## 🛠 Stack

- **React 18** + **Vite 5**
- CSS puro con variables (sin frameworks externos)
- **Fuentes**: Fredoka One (display) + Nunito (cuerpo)
- Deploy via **GitHub Actions** → GitHub Pages
