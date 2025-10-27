/*
  # Create Cybersecurity Website Schema

  ## Overview
  This migration creates all necessary tables for a cybersecurity information portal
  including articles, alerts, reports, bulletins, documentation, and incident declarations.

  ## New Tables

  ### 1. articles
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Article title
  - `summary` (text) - Brief summary
  - `content` (text) - Full article content
  - `image_url` (text) - Featured image URL
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. alertes
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Alert title
  - `summary` (text) - Brief description
  - `content` (text) - Full alert details
  - `gravity` (text) - Severity level: 'critical', 'high', 'medium', 'low'
  - `status` (text) - Current status: 'active', 'in_progress', 'resolved'
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. rapports
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Report title
  - `summary` (text) - Brief description
  - `category` (text) - Report category
  - `file_url` (text) - PDF or document URL
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Record creation timestamp

  ### 4. bulletins
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Bulletin title
  - `summary` (text) - Brief description
  - `content` (text) - Full bulletin content
  - `category` (text) - Bulletin category
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Record creation timestamp

  ### 5. documentation
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Document title
  - `type` (text) - Document type: 'video', 'article', 'legal', 'pdf'
  - `category` (text) - Content category
  - `url` (text) - Resource URL
  - `thumbnail_url` (text) - Preview image URL
  - `description` (text) - Brief description
  - `created_at` (timestamptz) - Record creation timestamp

  ### 6. incidents
  - `id` (uuid, primary key) - Unique identifier
  - `reporter_name` (text) - Name of person reporting
  - `reporter_email` (text) - Email of reporter
  - `reporter_phone` (text) - Phone number
  - `incident_type` (text) - Type of incident
  - `severity` (text) - Severity level
  - `description` (text) - Detailed description
  - `organization` (text) - Affected organization
  - `status` (text) - Processing status (default: 'submitted')
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for articles, alertes, rapports, bulletins, and documentation
  - Authenticated write access for incidents table only
*/

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  image_url text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create alertes table
CREATE TABLE IF NOT EXISTS alertes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  gravity text NOT NULL CHECK (gravity IN ('critical', 'high', 'medium', 'low')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'in_progress', 'resolved')),
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create rapports table
CREATE TABLE IF NOT EXISTS rapports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  category text NOT NULL,
  file_url text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create bulletins table
CREATE TABLE IF NOT EXISTS bulletins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create documentation table
CREATE TABLE IF NOT EXISTS documentation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL CHECK (type IN ('video', 'article', 'legal', 'pdf')),
  category text NOT NULL,
  url text NOT NULL,
  thumbnail_url text,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_name text NOT NULL,
  reporter_email text NOT NULL,
  reporter_phone text,
  incident_type text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  description text NOT NULL,
  organization text,
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE alertes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rapports ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulletins ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentation ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can view articles"
  ON articles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view alertes"
  ON alertes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view rapports"
  ON rapports FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view bulletins"
  ON bulletins FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can view documentation"
  ON documentation FOR SELECT
  TO anon, authenticated
  USING (true);

-- Incidents submission policy
CREATE POLICY "Anyone can submit incidents"
  ON incidents FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS articles_published_at_idx ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS alertes_published_at_idx ON alertes(published_at DESC);
CREATE INDEX IF NOT EXISTS rapports_published_at_idx ON rapports(published_at DESC);
CREATE INDEX IF NOT EXISTS bulletins_published_at_idx ON bulletins(published_at DESC);
CREATE INDEX IF NOT EXISTS alertes_status_idx ON alertes(status);
CREATE INDEX IF NOT EXISTS incidents_created_at_idx ON incidents(created_at DESC);