/** SINGLE SOURCE OF TRUTH for look & motion. Edit only this file to re-theme the site. */
export const theme = {
  colors: { bg:'rgb(246, 245, 239)', ink:'#111111', muted:'#555555', card:'#FFFFFF', line:'#DEDED8', accent:'#111111', accentText:'#FFFFFF' },
  fonts: { sans:"'Times New Roman', system-ui, sans-serif", url:'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap' },
  radius: { card:'1.5rem', button:'9999px', image:'2rem' },
  shadows: { card:'0 1px 2px rgba(17,17,17,.04), 0 8px 30px rgba(17,17,17,.06)', hover:'0 14px 44px rgba(17,17,17,.13)' },
  animation: {
    enabled: true,          // master switch: UI reveals + 3D motion
    intensity: 1,           // 0..2 multiplier for all motion
    transition: '0.3s cubic-bezier(.2,.8,.2,1)',
    reveal: { duration: 0.7, distance: 24 },
  },
  background: {
    enabled: true,          // turn the whole 3D scene off
    opacity: 0.9,
    stars:   { count: 1600, size: 0.03, color: '#111111', opacity: 0.55 },
    galaxy:  { arms: 3, radius: 11, twist: 1.4, spinSpeed: 0.03, tilt: 1.05 },
    network: { nodes: 38, linkDistance: 3.6, nodeSize: 0.11, nodeColor: '#111111', lineColor: '#111111', lineOpacity: 0.18, glow: 0.25 },
    code:    { enabled: true, color: '#555555', snippets: ['GET /api/v1/projects','@app.post("/auth/login")','SELECT * FROM users;','jwt.encode(payload, key)','class UserRepository:','POST /rag/query 200 OK','async def get_db():'] },
    mouse:   { enabled: true, strength: 0.5 },
    scroll:  { enabled: true, strength: 0.0015 },
  },
}
export function applyTheme() {
  const r = document.documentElement.style, c = theme.colors
  Object.entries(c).forEach(([k, v]) => r.setProperty(`--c-${k}`, v))
  r.setProperty('--font-sans', theme.fonts.sans)
  Object.entries(theme.radius).forEach(([k, v]) => r.setProperty(`--r-${k}`, v))
  r.setProperty('--sh-card', theme.shadows.card); r.setProperty('--sh-hover', theme.shadows.hover)
  r.setProperty('--tr', theme.animation.transition)
  const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = theme.fonts.url; document.head.appendChild(l)
}
