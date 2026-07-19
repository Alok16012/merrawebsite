-- lead_form_fields: config table for the dynamic lead form
-- (was created out-of-band in the original project; recreated here so
-- migrations 029/030 that upsert into it can run on a fresh database)

create table if not exists lead_form_fields (
  id uuid primary key default gen_random_uuid(),
  field_key text not null unique,
  label text not null,
  field_type text not null default 'text',
  is_required boolean not null default false,
  is_active boolean not null default true,
  is_system boolean not null default false,
  options jsonb,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table lead_form_fields enable row level security;

create policy "Authenticated can read form fields"
  on lead_form_fields for select
  using (auth.role() = 'authenticated');

create policy "Authenticated can manage form fields"
  on lead_form_fields for all
  using (auth.role() = 'authenticated');

-- Seed the standard system fields used by the lead form
insert into lead_form_fields (field_key, label, field_type, is_required, is_active, is_system, display_order) values
  ('full_name',          'Full Name',            'text',   true,  true, true, 10),
  ('phone',              'Phone',                'phone',  true,  true, true, 20),
  ('email',              'Email',                'email',  false, true, true, 30),
  ('city',               'City',                 'text',   false, true, true, 40),
  ('state',              'State',                'text',   false, true, true, 50),
  ('source',             'Source',               'select', false, true, true, 60),
  ('status',             'Status',               'select', false, true, true, 70),
  ('course_id',          'Course',               'select', false, true, true, 80),
  ('sub_course_id',      'Sub Course',           'select', false, true, true, 90),
  ('session_id',         'Session',              'select', false, true, true, 95),
  ('assigned_to',        'Assigned To',          'select', false, true, true, 140),
  ('next_followup_date', 'Next Follow-up Date',  'date',   false, true, true, 150),
  ('next_followup_time', 'Next Follow-up Time',  'text',   false, true, true, 160),
  ('total_fee',          'Total Fee',            'number', false, true, true, 170),
  ('amount_paid',        'Amount Paid',          'number', false, true, true, 180),
  ('notes',              'Notes',                'textarea', false, true, true, 190)
on conflict (field_key) do nothing;
