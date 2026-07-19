-- Replace old client's seeded course with Meera Prakash Education Center's
-- actual course list (same list as the public website, src/lib/site.ts).

DELETE FROM sub_courses WHERE course_id IN (SELECT id FROM courses WHERE name = 'Frontend Skill Sikho');
DELETE FROM courses WHERE name = 'Frontend Skill Sikho';

INSERT INTO courses (name, is_active)
SELECT v.name, true FROM (VALUES
  ('B.Tech'),
  ('M.Tech'),
  ('Polytechnic (Diploma)'),
  ('MBBS'),
  ('BAMS (Ayurveda)'),
  ('BHMS (Homeopathy)'),
  ('B.Sc Nursing'),
  ('ANM'),
  ('GNM'),
  ('D.Pharm'),
  ('B.Pharm'),
  ('B.Sc Agriculture'),
  ('B.Sc (General)'),
  ('B.Ed'),
  ('D.El.Ed'),
  ('B.Sc B.Ed / BA B.Ed'),
  ('M.Ed'),
  ('B.P.Ed'),
  ('ITI (All Trades)'),
  ('B.Lib (B.Lis)'),
  ('M.Lib (M.Lis)')
) AS v(name)
WHERE NOT EXISTS (SELECT 1 FROM courses c WHERE c.name = v.name);
