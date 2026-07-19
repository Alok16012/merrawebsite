-- Change enrollment number default from ENR- prefix to MPEC- prefix
ALTER TABLE students
  ALTER COLUMN enrollment_number
  SET DEFAULT 'MPEC-' || floor(random() * 900000 + 100000)::text;

-- Update existing ENR-XXXXXXX or ENR-XXXXXXX(letter) → MPEC-XXXXXXX (digits only)
UPDATE students
SET enrollment_number = 'MPEC-' || regexp_replace(enrollment_number, '^ENR-([0-9]+).*$', '\1')
WHERE enrollment_number ~* '^ENR-[0-9]';
