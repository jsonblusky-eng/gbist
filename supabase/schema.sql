-- Supabase Database Schema for GBIST
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admissions table
CREATE TABLE admissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reference_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  father_cnic TEXT NOT NULL,
  applicant_cnic TEXT NOT NULL,
  phone TEXT NOT NULL,
  emergency_contact TEXT NOT NULL,
  email TEXT NOT NULL,
  program TEXT NOT NULL,
  qualification TEXT NOT NULL,
  address TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admission documents table
CREATE TABLE admission_documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admission_id UUID REFERENCES admissions(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('matric', 'cnic', 'photos', 'character', 'domicile', 'father_cnic')),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policies: Allow anonymous inserts (for form submissions)
CREATE POLICY "Allow anonymous insert admissions" ON admissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous insert documents" ON admission_documents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Policies: Allow authenticated users to read their own data
CREATE POLICY "Allow authenticated read admissions" ON admissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read documents" ON admission_documents
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated read contacts" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_admissions_updated_at BEFORE UPDATE ON admissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket for admission documents
INSERT INTO storage.buckets (id, name, public) VALUES ('admission-docs', 'admission-docs', false);

-- Storage policies
CREATE POLICY "Allow anonymous upload admission docs" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'admission-docs');

CREATE POLICY "Allow authenticated read admission docs" ON storage.objects
  FOR SELECT USING (bucket_id = 'admission-docs' AND auth.role() = 'authenticated');