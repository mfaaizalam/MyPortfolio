// All values resolve to CSS variables that src/config/theme.ts writes at startup.
export default {content:['./index.html','./src/**/*.{ts,tsx}'],theme:{extend:{
colors:{bg:'var(--c-bg)',ink:'var(--c-ink)',muted:'var(--c-muted)',card:'var(--c-card)',line:'var(--c-line)',accent:'var(--c-accent)',accentText:'var(--c-accentText)'},
fontFamily:{sans:'var(--font-sans)'},
borderRadius:{card:'var(--r-card)',button:'var(--r-button)',image:'var(--r-image)'},
boxShadow:{card:'var(--sh-card)',hover:'var(--sh-hover)'}}},plugins:[]}
