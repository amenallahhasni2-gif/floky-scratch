
-- Additive: introduce collections layer + product_images, extend drops with status enum-like column
-- Existing tables (drops, categories, products, product_variants, orders, delivery_fees) are preserved.

-- 1. Extend drops with new status/timing columns (mirror existing is_live/release_date)
ALTER TABLE public.drops
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'upcoming'
    CHECK (status IN ('upcoming','live','paused','ended')),
  ADD COLUMN IF NOT EXISTS starts_at timestamptz,
  ADD COLUMN IF NOT EXISTS ends_at timestamptz,
  ADD COLUMN IF NOT EXISTS sort_order int NOT NULL DEFAULT 0;

-- Backfill status from existing is_live/is_archived flags
UPDATE public.drops SET status = CASE
  WHEN is_archived THEN 'ended'
  WHEN is_live THEN 'live'
  ELSE 'upcoming'
END WHERE status = 'upcoming';

-- 2. Collections table (new layer between drops and categories)
CREATE TABLE IF NOT EXISTS public.collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id uuid REFERENCES public.drops(id) ON DELETE CASCADE,
  slug text NOT NULL,
  title text NOT NULL,
  subtitle text,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (drop_id, slug)
);

GRANT SELECT ON public.collections TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.collections TO authenticated;
GRANT ALL ON public.collections TO service_role;

ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view collections of live drops"
  ON public.collections FOR SELECT
  USING (
    drop_id IS NULL OR EXISTS (
      SELECT 1 FROM public.drops d
      WHERE d.id = collections.drop_id
        AND d.status IN ('live','paused','ended')
    )
  );

CREATE POLICY "Admins manage collections"
  ON public.collections FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE TRIGGER collections_set_updated_at
  BEFORE UPDATE ON public.collections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. Attach categories to collections (nullable for backward compat with existing flat categories)
ALTER TABLE public.categories
  ADD COLUMN IF NOT EXISTS collection_id uuid REFERENCES public.collections(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS sort_order int NOT NULL DEFAULT 0;

-- 4. product_images (optional; existing products.images text[] preserved)
CREATE TABLE IF NOT EXISTS public.product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.product_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_images TO authenticated;
GRANT ALL ON public.product_images TO service_role;

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view product images"
  ON public.product_images FOR SELECT USING (true);

CREATE POLICY "Admins manage product images"
  ON public.product_images FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 5. Add sold_out flag to products (additive)
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS sold_out boolean NOT NULL DEFAULT false;
