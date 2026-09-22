import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Using Resend for email (add RESEND_API_KEY to Supabase secrets)
// Alternative: Use SendGrid, Mailgun, or Supabase's built-in SMTP
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, subject, html, text } = await req.json()

    if (!to || !subject || (!html && !text)) {
      return new Response(
        JSON.stringify({ error: 'Missing required email fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Option 1: Using Resend (recommended)
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (resendApiKey) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'GBIST Admissions <admissions@gbist.edu.pk>',
          to: [to],
          subject,
          html: html || undefined,
          text: text || undefined,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Resend API error: ${error}`)
      }

      const data = await response.json()
      return new Response(
        JSON.stringify({ success: true, id: data.id }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Option 2: Using SendGrid (alternative)
    const sendgridApiKey = Deno.env.get('SENDGRID_API_KEY')
    
    if (sendgridApiKey) {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendgridApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: to }],
            subject,
          }],
          from: { email: 'admissions@gbist.edu.pk', name: 'GBIST Admissions' },
          content: [
            { type: 'text/html', value: html || '' },
            { type: 'text/plain', value: text || '' },
          ].filter(c => c.value),
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`SendGrid API error: ${error}`)
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Option 3: Supabase built-in email (requires SMTP config in Supabase)
    // This would use supabase.auth.admin.inviteUserByEmail or similar
    // For now, log the email (development only)
    console.log('EMAIL WOULD BE SENT:', { to, subject, html: html?.substring(0, 200) })
    
    return new Response(
      JSON.stringify({ success: true, note: 'Email logged (no email service configured)' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Email error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})