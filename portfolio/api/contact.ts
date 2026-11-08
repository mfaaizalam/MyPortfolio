
// Vercel Serverless Function
// Email credentials are stored securely in environment variables.

const hits = new Map<string, number[]>()

// Escape HTML to prevent HTML injection in email content.
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c] as string)
  )

export default async function handler(req: any, res: any) {
  // Only allow POST requests.
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  // Parse request body.
  let b: any = req.body

  try {
    if (typeof b === 'string') {
      b = JSON.parse(b)
    }
  } catch {
    return res.status(400).json({
      error: 'Invalid request',
    })
  }

  b = b || {}

  // Honeypot spam protection.
  if (b.website) {
    return res.status(200).json({ ok: true })
  }

  // Minimum form completion time.
  if (typeof b.elapsed !== 'number' || b.elapsed < 3000) {
    return res.status(400).json({
      error: 'Please take a moment to fill in the form, then try again.',
    })
  }

  // Basic rate limiting.
  const ip = String(
    req.headers['x-forwarded-for'] || 'x'
  )
    .split(',')[0]
    .trim()

  const now = Date.now()

  const recent = (hits.get(ip) || []).filter(
    (t) => now - t < 3600_000
  )

  if (recent.length >= 5) {
    return res.status(429).json({
      error: 'Too many messages. Please try again later.',
    })
  }

  // Sanitize input.
  const clean = (v: unknown, max: number) =>
    typeof v === 'string' ? v.trim().slice(0, max) : ''

  const name = clean(b.name, 100)
  const email = clean(b.email, 200)
  const subject = clean(b.subject, 150)
  const message = clean(b.message, 5000)

  // Validate required fields.
  if (!name || !subject || message.length < 10) {
    return res.status(400).json({
      error:
        'Please fill in every field (message at least 10 characters).',
    })
  }

  // Validate email address.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      error: 'Please enter a valid email address.',
    })
  }

  // Prevent header injection.
  if (/[\r\n]/.test(name + email + subject)) {
    return res.status(400).json({
      error: 'Invalid characters in form.',
    })
  }

  // Read environment variables.
  const {
    RESEND_API_KEY,
    CONTACT_TO_EMAIL,
    CONTACT_FROM_EMAIL,
  } = process.env

  if (
    !RESEND_API_KEY ||
    !CONTACT_TO_EMAIL ||
    !CONTACT_FROM_EMAIL
  ) {
    return res.status(500).json({
      error: 'Email is not configured on the server.',
    })
  }

  // Professional email HTML template.
  const html = `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: auto;
      padding: 28px;
      color: #222;
      background: #ffffff;
      border: 1px solid #eeeeee;
      border-radius: 12px;
    ">

      <h2 style="
        margin: 0 0 10px;
        font-size: 23px;
        color: #111111;
      ">
        New Portfolio Inquiry
      </h2>

      <p style="color: #666; font-size: 14px;">
        You have received a new message through your portfolio website.
      </p>

      <hr style="
        border: 0;
        border-top: 1px solid #eeeeee;
        margin: 24px 0;
      " />

      <p><strong>Name:</strong> ${esc(name)}</p>

      <p><strong>Email:</strong> ${esc(email)}</p>

      <p><strong>Subject:</strong> ${esc(subject)}</p>

      <div style="
        background: #f7f7f7;
        padding: 18px;
        border-radius: 8px;
        margin-top: 24px;
      ">
        <strong style="font-size: 15px;">Message</strong>

        <p style="
          white-space: pre-wrap;
          line-height: 1.7;
          color: #444;
          font-size: 14px;
        ">${esc(message)}</p>
      </div>

      <hr style="
        border: 0;
        border-top: 1px solid #eeeeee;
        margin: 24px 0;
      " />

      <p style="
        font-size: 12px;
        color: #888;
        text-align: center;
      ">
        Sent through Muhammad Faaiz Alam's portfolio website.
      </p>

    </div>
  `

  // Plain text fallback.
  const text = `
New Portfolio Inquiry

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent through Muhammad Faaiz Alam's portfolio website.
  `

  try {
    // Send email using Resend API.
    const response = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL,
          to: [CONTACT_TO_EMAIL],

          // Reply directly to the visitor.
          reply_to: email,

          subject: `[Portfolio] ${subject}`,

          html,
          text,
        }),
      }
    )

    if (!response.ok) {
      const errorDetails = await response.text()

      console.error('Resend API error:', errorDetails)

      return res.status(502).json({
        error:
          'The email service rejected the message. Please try again later.',
      })
    }

    // Record successful submission.
    hits.set(ip, [...recent, now])

    return res.status(200).json({
      ok: true,
      message: 'Your message has been sent successfully!',
    })

  } catch (error) {
    console.error('Email sending failed:', error)

    return res.status(500).json({
      error: 'Unable to send your message. Please try again later.',
    })
  }
}
