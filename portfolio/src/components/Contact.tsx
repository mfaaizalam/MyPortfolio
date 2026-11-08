import {FormEvent, useRef, useState} from 'react'
import {primary} from './ui'
const field = 'w-full rounded-2xl border border-line bg-card px-4 py-3 text-sm outline-none transition-shadow focus:shadow-card focus-visible:outline-2 focus-visible:outline-accent'
export default function Contact() {
  const t0 = useRef(Date.now()); const [st, setSt] = useState<'idle'|'sending'|'ok'|'err'>('idle'); const [msg, setMsg] = useState('')
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = e.currentTarget, d = Object.fromEntries(new FormData(f))
    setSt('sending'); setMsg('')
    try {
      const r = await fetch('/api/contact', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...d,elapsed:Date.now()-t0.current})})
      const j = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(j.error || 'Could not send your message.')
      setSt('ok'); setMsg('Message sent. I will reply by email soon.'); f.reset(); t0.current = Date.now()
    } catch (er) { setSt('err'); setMsg(er instanceof Error ? er.message : 'Could not send your message.') }
  }
  return <form onSubmit={submit} className="grid gap-4 rounded-card border border-line bg-card p-6 shadow-card sm:p-8" noValidate>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-1.5 text-sm font-semibold">Name<input name="name" required maxLength={100} autoComplete="name" className={field}/></label>
      <label className="grid gap-1.5 text-sm font-semibold">Email<input name="email" type="email" required maxLength={200} autoComplete="email" className={field}/></label></div>
    <label className="grid gap-1.5 text-sm font-semibold">Subject<input name="subject" required maxLength={150} className={field}/></label>
    <label className="grid gap-1.5 text-sm font-semibold">Message<textarea name="message" required rows={6} maxLength={5000} className={field}/></label>
    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0"/>
    <div className="flex flex-wrap items-center gap-4"><button disabled={st==='sending'} className={`${primary} disabled:opacity-60`}>{st==='sending'?'Sending...':'Send message'}</button>
      <p role="status" aria-live="polite" className={`text-sm ${st==='err'?'text-red-700':'text-muted'}`}>{msg}</p></div>
  </form>
}
