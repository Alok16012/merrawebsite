-- Rebrand mentorship managed_by value: 'dcw' → 'mpec'
ALTER TABLE student_mentorships DROP CONSTRAINT IF EXISTS student_mentorships_managed_by_check;
UPDATE student_mentorships SET managed_by = 'mpec' WHERE managed_by = 'dcw';
ALTER TABLE student_mentorships ALTER COLUMN managed_by SET DEFAULT 'mpec';
ALTER TABLE student_mentorships ADD CONSTRAINT student_mentorships_managed_by_check CHECK (managed_by IN ('mpec', 'self'));
