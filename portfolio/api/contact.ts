// Vercel serverless function. Secrets live only in environment variables.
const hits = new Map<string, number[]>()
const esc = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] as string))
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  let b: any = req.body; try { if (typeof b === 'string') b = JSON.parse(b) } catch { return res.status(400).json({ error: 'Invalid request' }) }
  b = b || {}
  if (b.website) return res.status(200).json({ ok: true })                       // honeypot: pretend success
  if (typeof b.elapsed !== 'number' || b.elapsed < 3000) return res.status(400).json({ error: 'Please take a moment to fill in the form, then try again.' })
  const ip = String(req.headers['x-forwarded-for'] || 'x').split(',')[0].trim(), now = Date.now()
  const recent = (hits.get(ip) || []).filter(t => now - t < 3600_000)
  if (recent.length >= 5) return res.status(429).json({ error: 'Too many messages. Please try again later.' })
  const clean = (v: unknown, max: number) => typeof v === 'string' ? v.trim().slice(0, max) : ''
  const name = clean(b.name, 100), email = clean(b.email, 200), subject = clean(b.subject, 150), message = clean(b.message, 5000)
  if (!name || !subject || message.length < 10) return res.status(400).json({ error: 'Please fill in every field (message at least 10 characters).' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' })
  if (/[\r\n]/.test(name + email + subject)) return res.status(400).json({ error: 'Invalid characters in form.' })
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return res.status(500).json({ error: 'Email is not configured on the server.' })
  const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: CONTACT_FROM_EMAIL, to: [CONTACT_TO_EMAIL], reply_to: email, subject: `[Portfolio] ${subject}`,
      html: `<p><b>From:</b> ${esc(name)} &lt;${esc(email)}&gt;</p><p><b>Subject:</b> ${esc(subject)}</p><hr><p style="white-space:pre-wrap">${esc(message)}</p>`, text: `From: ${name} <${email}>\n\n${message}` }) })
  if (!r.ok) return res.status(502).json({ error: 'The email service rejected the message. Please try again later.' })
  hits.set(ip, [...recent, now]); return res.status(200).json({ ok: true })
}
