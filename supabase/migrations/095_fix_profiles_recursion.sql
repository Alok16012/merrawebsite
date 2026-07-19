-- Fix: "infinite recursion detected in policy for relation profiles" (42P17)
-- The admin policy on profiles queried profiles inside its own USING clause.
-- A SECURITY DEFINER helper bypasses RLS for the role lookup, breaking the loop.

CREATE OR REPLACE FUNCTION public.get_my_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid()
$$;

REVOKE ALL ON FUNCTION public.get_my_role() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_my_role() TO authenticated;

DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;
CREATE POLICY "Admins can manage all profiles"
  ON profiles FOR ALL
  USING (public.get_my_role() = 'admin')
  WITH CHECK (public.get_my_role() = 'admin');
