import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { name, phone, email, subject, message } = await req.json()

    if (!name || !phone || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Insert contact record
    const { data: contact, error: contactError } = await supabaseClient
      .from('contacts')
      .insert({
        full_name: name,
        phone,
        email,
        subject,
        message,
      })
      .select()
      .single()

    if (contactError) throw contactError

    // Send confirmation email to user
    const userEmailHtml = `
      <h2>Message Received - GBIST Contact Form</h2>
      <p>Dear ${name},</p>
      <p>Thank you for contacting <strong>Gulzar Begum Institute of Science & Technology</strong>. We have received your message and will get back to you shortly.</p>
      <h3>Your Message:</h3>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
      <hr>
      <p>For urgent queries, call us at 0333 5908355 or email gbist676@gmail.com</p>
      <p><small>This is an automated confirmation. Please do not reply.</small></p>
    `

    await supabaseClient.functions.invoke('send-email', {
      body: {
        to: email,
        subject: `GBIST: We received your message - ${subject}`,
        html: userEmailHtml,
      }
    })

    // Notify admin
    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p>A new contact form has been submitted.</p>
      <h3>Contact Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Subject:</strong> ${subject}</li>
      </ul>
      <h3>Message:</h3>
      <p>${message}</p>
    `

    await supabaseClient.functions.invoke('send-email', {
      body: {
        to: 'gbist676@gmail.com',
        subject: `New Contact: ${name} - ${subject}`,
        html: adminEmailHtml,
      }
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully!' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})