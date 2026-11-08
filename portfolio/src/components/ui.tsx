import {ReactNode} from 'react'; import {motion} from 'framer-motion'; import {theme} from '../config/theme'
export const btn = 'inline-flex items-center justify-center rounded-button px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
export const primary = `${btn} bg-accent text-accentText hover:shadow-hover`
export const secondary = `${btn} border border-line bg-card text-ink hover:shadow-hover`
export function Reveal({children}:{children:ReactNode}) {
  const a = theme.animation; if (!a.enabled) return <>{children}</>
  return <motion.div initial={{opacity:0,y:a.reveal.distance*a.intensity}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:a.reveal.duration}}>{children}</motion.div>
}
export const Section = ({id,title,children}:{id:string;title:string;children:ReactNode}) =>
  <section id={id} className="mx-auto max-w-6xl px-6 py-20"><Reveal><h2 className="mb-10 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>{children}</Reveal></section>
export const GH = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/></svg>
export const LI = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.600 0 4.300 2.400 4.300 5.500v6.200zM5.300 7.400a2.100 2.100 0 1 1 0-4.100 2.100 2.100 0 0 1 0 4.100zM7.100 20.500H3.600V9h3.500v11.500z"/></svg>
