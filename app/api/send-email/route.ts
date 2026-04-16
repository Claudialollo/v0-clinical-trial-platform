import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { to, subject, body, from } = await req.json()

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "NEBix Trial <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      text: body,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: 500 })
  }

  return NextResponse.json({ success: true, id: data.id })
}
