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

    const formData = await req.formData()
    
    // Extract form fields
    const fullName = formData.get('fullName')
    const fatherName = formData.get('fatherName')
    const fatherCnic = formData.get('fatherCnic')
    const applicantCnic = formData.get('applicantCnic')
    const phone = formData.get('phone')
    const emergencyContact = formData.get('emergencyContact')
    const email = formData.get('email')
    const program = formData.get('program')
    const qualification = formData.get('qualification')
    const address = formData.get('address')

    // Validate required fields
    if (!fullName || !fatherName || !fatherCnic || !applicantCnic || !phone || !emergencyContact || !email || !program || !qualification || !address) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate reference number
    const referenceNumber = `GBIST-2026-${Math.floor(1000 + Math.random() * 9000)}`

    // Insert admission record
    const { data: admission, error: admissionError } = await supabaseClient
      .from('admissions')
      .insert({
        reference_number: referenceNumber,
        full_name: fullName,
        father_name: fatherName,
        father_cnic: fatherCnic,
        applicant_cnic: applicantCnic,
        phone,
        emergency_contact: emergencyContact,
        email,
        program,
        qualification,
        address,
      })
      .select()
      .single()

    if (admissionError) throw admissionError

    // Handle file uploads
    const documentTypes = ['matric', 'cnic', 'photos', 'character', 'domicile', 'father_cnic']
    const uploadedDocs = []

    for (const docType of documentTypes) {
      const file = formData.get(docType)
      if (file && file instanceof File) {
        const fileName = `${referenceNumber}/${docType}_${Date.now()}_${file.name}`
        
        const { data: uploadData, error: uploadError } = await supabaseClient.storage
          .from('admission-docs')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data: docRecord, error: docError } = await supabaseClient
          .from('admission_documents')
          .insert({
            admission_id: admission.id,
            document_type: docType,
            file_name: file.name,
            file_url: uploadData.path,
            file_size: file.size,
            mime_type: file.type,
          })
          .select()
          .single()

        if (docError) throw docError
        uploadedDocs.push(docRecord)
      }
    }

    // Send confirmation email
    const emailHtml = `
      <h2>Admission Application Received - ${referenceNumber}</h2>
      <p>Dear ${fullName},</p>
      <p>Thank you for applying to <strong>Gulzar Begum Institute of Science & Technology</strong>. Your application has been received successfully.</p>
      <h3>Application Details:</h3>
      <ul>
        <li><strong>Reference Number:</strong> ${referenceNumber}</li>
        <li><strong>Program:</strong> ${program}</li>
        <li><strong>Full Name:</strong> ${fullName}</li>
        <li><strong>Father's Name:</strong> ${fatherName}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Email:</strong> ${email}</li>
      </ul>
      <p>Our admissions office will review your application and contact you for document verification. Please bring original documents when visiting.</p>
      <p>For queries, call us at 0333 5908355 or email gbist676@gmail.com</p>
      <hr>
      <p><small>This is an automated message. Please do not reply.</small></p>
    `

    // Send email using Supabase's email (or configure with Resend/SendGrid)
    const { error: emailError } = await supabaseClient.functions.invoke('send-email', {
      body: {
        to: email,
        subject: `GBIST Admission Confirmation - ${referenceNumber}`,
        html: emailHtml,
      }
    })

    if (emailError) {
      console.error('Email send failed:', emailError)
      // Don't fail the request if email fails
    }

    // Also notify admin
    const adminEmailHtml = `
      <h2>New Admission Application - ${referenceNumber}</h2>
      <p>A new admission application has been submitted.</p>
      <h3>Applicant Details:</h3>
      <ul>
        <li><strong>Reference:</strong> ${referenceNumber}</li>
        <li><strong>Name:</strong> ${fullName}</li>
        <li><strong>Father's Name:</strong> ${fatherName}</li>
        <li><strong>Program:</strong> ${program}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Address:</strong> ${address}</li>
      </ul>
      <p>Documents uploaded: ${uploadedDocs.length}/6</p>
    `

    await supabaseClient.functions.invoke('send-email', {
      body: {
        to: 'gbist676@gmail.com',
        subject: `New Admission: ${fullName} - ${program} (${referenceNumber})`,
        html: adminEmailHtml,
      }
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        referenceNumber,
        message: 'Application submitted successfully!' 
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