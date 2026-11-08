import {lazy, Suspense} from 'react'; import {motion} from 'framer-motion'
import {profile as P, about, skills, projects, experiences} from './config/content'; import {theme} from './config/theme'
import {Section, Reveal, primary, secondary, GH, LI} from './components/ui'; import Contact from './components/Contact'; import Repos from './components/Repos'
const Background3D = lazy(() => import('./components/Background3D'))
const a = theme.animation, rise = (d:number) => a.enabled ? {initial:{opacity:0,y:20*a.intensity},animate:{opacity:1,y:0},transition:{duration:a.reveal.duration,delay:d}} : {}
const icon = 'rounded-button border border-line bg-card p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent'
export default function App() {
  return <>
    <Suspense fallback={null}><Background3D/></Suspense>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-button focus:bg-accent focus:px-4 focus:py-2 focus:text-accentText">Skip to content</a>
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/80 backdrop-blur"><nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#top" className="font-extrabold tracking-tight">{P.name}</a>
      <ul className="flex gap-6 text-sm font-semibold">{[['Work','#work'],['About','#about'],['Contact','#contact']].map(([n,h]) => <li key={n}><a href={h} className="text-muted transition-colors hover:text-ink">{n}</a></li>)}</ul></nav></header>
    <main id="main">
      <section id="top" className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 pb-16 pt-28 md:grid-cols-[1.2fr_1fr]">
        <div><motion.p {...rise(0)} className="mb-4 text-lg font-semibold text-muted">{P.intro}</motion.p>
          <motion.h1 {...rise(.1)} className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">{P.headline}</motion.h1>
          <motion.p {...rise(.2)} className="mt-5 text-lg font-semibold">{P.role}</motion.p>
          <motion.p {...rise(.3)} className="mt-4 max-w-md text-muted">{P.description}</motion.p>
          <motion.div {...rise(.4)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className={primary}>Explore My Work</a>
            <a href={P.cv} download={P.cvName} className={secondary}>Download CV</a>
            <a href={P.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={icon}><GH/></a>
            <a href={P.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={icon}><LI/></a></motion.div></div>
        <img src="/profile1.jpeg" alt="Portrait of Muhammad Faaiz Alam" width={400} height={480} className="aspect-[5/6] w-full rounded-image border border-line bg-card object-cover shadow-card"/>
      </section>
      <Section id="about" title="About"><div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4 text-muted"><p>{about}</p><p className="font-semibold text-ink">B.E. Software Engineering, NED University, 2024–2028</p></div>
        <ul className="flex flex-wrap content-start gap-2" aria-label="Skills">{skills.map(s => <li key={s} className="rounded-button border border-line bg-card px-4 py-2 text-sm font-semibold shadow-card">{s}</li>)}</ul></div></Section>
      <Section id="experience" title="Experience">
  <ol className="grid gap-6">
    {experiences.map(e => (
      <li key={e.role + e.company} className="rounded-card border border-line bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-xl font-extrabold">{e.role}</h3>
            <p className="text-sm font-semibold text-muted">{e.company}</p>
          </div>
          <p className="rounded-button border border-line px-3 py-1 text-xs font-semibold">{e.type} • {e.period} • {e.location}</p>
        </div>
        <p className="mt-4 text-sm">{e.description}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
          {e.responsibilities.map(r => <li key={r}>{r}</li>)}
        </ul>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {e.technologies.map(t => <li key={t} className="rounded-button border border-line px-3 py-1 text-xs font-semibold">{t}</li>)}
        </ul>
      </li>
    ))}
  </ol>
</Section>
      <Section id="work" title="Projects"><div className="grid gap-6 md:grid-cols-2">{projects.map(p => <article key={p.title} className="flex flex-col rounded-card border border-line bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
        <h3 className="text-xl font-extrabold">{p.title}</h3><p className="text-sm font-semibold text-muted">{p.kind}</p><p className="mt-3 text-sm">{p.desc}</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">{p.points.map(x => <li key={x}>{x}</li>)}</ul>
        <ul className="mt-5 flex flex-wrap gap-2">{p.tags.map(t => <li key={t} className="rounded-button border border-line px-3 py-1 text-xs font-semibold">{t}</li>)}</ul>
        <div className="mt-auto flex gap-3 pt-6">{p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className={secondary}>GitHub</a>}{p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className={primary}>Live demo</a>}</div></article>)}</div>
        <h3 className="mb-5 mt-16 text-xl font-extrabold">Latest on GitHub</h3><Repos/></Section>
      <Section id="cv" title="Curriculum Vitae"><div className="mb-5 flex flex-wrap gap-3"><a href={P.cv} download={P.cvName} className={primary}>Download CV</a><a href={P.cv} target="_blank" rel="noopener noreferrer" className={secondary}>Open PDF in new tab</a></div>
        <object data={`${P.cv}#view=FitH`} type="application/pdf" title="Curriculum vitae" className="h-[80vh] w-full rounded-card border border-line bg-card shadow-card"><p className="p-6 text-muted">Your browser cannot display PDFs inline. <a className="underline" href={P.cv}>Open the CV</a>.</p></object></Section>
      <Section id="contact" title="Contact"><div className="grid gap-10 md:grid-cols-[1fr_1.4fr]"><div className="space-y-4 text-muted"><p>Have a project, internship or backend role in mind? Send a message and it will land straight in my inbox.</p>
        <div className="flex gap-3"><a href={P.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={icon}><GH/></a><a href={P.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={icon}><LI/></a></div></div><Contact/></div></Section>
    </main>
    <footer className="border-t border-line py-8 text-center text-sm text-muted">© {new Date().getFullYear()} {P.name}</footer>
  </>
}
