-- Seed departments (course categories from the Meera website), their
-- University/Board sub-sections (Bihar-focused), and academic sessions.

-- Departments
INSERT INTO departments (name, is_active)
SELECT v.name, true FROM (VALUES
  ('Engineering & Technical'),
  ('Medical & Paramedical'),
  ('Agriculture & Science'),
  ('Teaching (B.Ed / D.El.Ed)'),
  ('ITI & Diploma'),
  ('Library Science')
) AS v(name)
WHERE NOT EXISTS (SELECT 1 FROM departments d WHERE d.name = v.name);

-- University/Board sub-sections per department
INSERT INTO department_sub_sections (department_id, name, is_active)
SELECT d.id, v.sub_name, true
FROM (VALUES
  ('Engineering & Technical',    'Bihar Engineering University (BEU)'),
  ('Engineering & Technical',    'Aryabhatta Knowledge University (AKU)'),
  ('Engineering & Technical',    'SBTE Bihar (Polytechnic)'),
  ('Engineering & Technical',    'Private / Deemed University'),
  ('Medical & Paramedical',      'Bihar University of Health Sciences (BUHS)'),
  ('Medical & Paramedical',      'Aryabhatta Knowledge University (AKU)'),
  ('Medical & Paramedical',      'Bihar Nurses Registration Council (BNRC)'),
  ('Medical & Paramedical',      'Private Medical / Nursing College'),
  ('Agriculture & Science',      'Bihar Agricultural University (BAU, Sabour)'),
  ('Agriculture & Science',      'RPCAU Pusa'),
  ('Agriculture & Science',      'Patliputra University (PPU)'),
  ('Agriculture & Science',      'Magadh University'),
  ('Teaching (B.Ed / D.El.Ed)',  'B.R.A. Bihar University (BRABU)'),
  ('Teaching (B.Ed / D.El.Ed)',  'Lalit Narayan Mithila University (LNMU)'),
  ('Teaching (B.Ed / D.El.Ed)',  'Magadh University'),
  ('Teaching (B.Ed / D.El.Ed)',  'Patliputra University (PPU)'),
  ('Teaching (B.Ed / D.El.Ed)',  'Nalanda Open University (NOU)'),
  ('ITI & Diploma',              'NCVT'),
  ('ITI & Diploma',              'SCVT Bihar'),
  ('ITI & Diploma',              'SBTE Bihar'),
  ('Library Science',            'Nalanda Open University (NOU)'),
  ('Library Science',            'Lalit Narayan Mithila University (LNMU)'),
  ('Library Science',            'IGNOU')
) AS v(dept_name, sub_name)
JOIN departments d ON d.name = v.dept_name
WHERE NOT EXISTS (
  SELECT 1 FROM department_sub_sections s
  WHERE s.department_id = d.id AND s.name = v.sub_name
);

-- Academic sessions
INSERT INTO sessions (name, is_active)
SELECT v.name, true FROM (VALUES
  ('2024-25'),
  ('2025-26'),
  ('2026-27')
) AS v(name)
WHERE NOT EXISTS (SELECT 1 FROM sessions s WHERE s.name = v.name);
