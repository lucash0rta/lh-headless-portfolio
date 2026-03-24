import { NextResponse } from 'next/server'

const RESEND_API_URL = 'https://api.resend.com/emails'
const CONTACT_TO_EMAIL = 'lhorta@proton.me'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = String(formData.get('email') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const website = String(formData.get('website') || '').trim()

  if (website) {
    return NextResponse.redirect(new URL('/landing/sent.html', request.url), 303)
  }

  if (!email || !message) {
    return new NextResponse('Missing email or message.', { status: 400 })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL

  if (!resendApiKey || !contactFromEmail) {
    return new NextResponse('Contact form is not configured yet.', { status: 500 })
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: [CONTACT_TO_EMAIL],
      subject: 'New message from lucashorta.com',
      html: `<p><strong>Reply to:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(
        message
      ).replace(/\n/g, '<br />')}</p>`,
      text: `Reply to: ${email}\n\n${message}`,
      reply_to: email,
    }),
  })

  if (!response.ok) {
    return new NextResponse('Unable to send message right now.', { status: 502 })
  }

  return NextResponse.redirect(new URL('/landing/sent.html', request.url), 303)
}
