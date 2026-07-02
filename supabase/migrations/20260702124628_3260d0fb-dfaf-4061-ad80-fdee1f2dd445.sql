
-- 1. Fix profiles is_admin self-escalation: trigger to prevent non-admins from changing is_admin
CREATE OR REPLACE FUNCTION public.prevent_is_admin_self_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.is_admin IS DISTINCT FROM OLD.is_admin THEN
    IF NOT public.is_admin() THEN
      NEW.is_admin := OLD.is_admin;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS prevent_is_admin_escalation ON public.profiles;
CREATE TRIGGER prevent_is_admin_escalation
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_is_admin_self_escalation();

-- Also revoke direct column update from authenticated as defense in depth
REVOKE UPDATE (is_admin) ON public.profiles FROM authenticated, anon;

-- 2. Fix orders guest exposure: ensure NULL user_id can't be selected by authenticated users
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (user_id IS NOT NULL AND auth.uid() = user_id);

-- Restrict guest order insert to anon only with NULL user_id, authenticated must own
DROP POLICY IF EXISTS "Users can insert their own orders" ON public.orders;
CREATE POLICY "Authenticated users can insert their own orders"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Guests can insert guest orders"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

-- 3. Fix waitlist RLS always-true: require valid email
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist;
CREATE POLICY "Anyone can join waitlist"
ON public.waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- 4. Fix mutable search_path on functions + tighten EXECUTE privileges
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.decrement_stock(p_variant_id uuid, p_quantity integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.product_variants
  SET stock = stock - p_quantity
  WHERE id = p_variant_id AND stock >= p_quantity;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'INSUFFICIENT_STOCK' USING hint = p_variant_id::text;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.profiles WHERE id = auth.uid()),
    false
  );
$$;

-- 5. Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated where not needed
-- decrement_stock: server-only
REVOKE EXECUTE ON FUNCTION public.decrement_stock(uuid, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.decrement_stock(uuid, integer) TO service_role;

-- is_admin: needed inside RLS. RLS runs as querying role, so keep executable by authenticated. Revoke from anon.
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;

-- prevent_is_admin_self_escalation: trigger-only
REVOKE EXECUTE ON FUNCTION public.prevent_is_admin_self_escalation() FROM PUBLIC, anon, authenticated;
