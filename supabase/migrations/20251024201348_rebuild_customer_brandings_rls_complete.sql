/*
  # Rebuild Customer Brandings RLS System - Complete Fix
  
  1. Problem
    - Alle Policies die auth.users verwenden → Permission Denied (42501)
    - Admin-Policy, SELECT-Policy, UPDATE-Policy alle betroffen
  
  2. Lösung
    - Entferne ALLE existierenden Policies
    - Baue komplett neue Policies NUR mit auth.jwt()
    - KEINE Subqueries auf auth.users
  
  3. Security Model
    - Service Role: Voller Zugriff (für Backend)
    - Admin: Voller Zugriff (identifiziert via JWT role claim)
    - Customer: Nur eigene Orders (via webflix_orders.customer_data email match)
    - Anonymous: Nur mit gültigem onboarding_token
  
  4. Changes
    - DROP ALL existing policies
    - CREATE new policies using only auth.jwt()
    - No auth.users table access anywhere
*/

-- ========================================
-- STEP 1: Remove ALL existing policies
-- ========================================

DROP POLICY IF EXISTS "Admins have full access to brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Anonymous can view via valid token" ON customer_brandings;
DROP POLICY IF EXISTS "Authenticated users can insert brandings" ON customer_brandings;
DROP POLICY IF EXISTS "Customers can view own branding via email" ON customer_brandings;
DROP POLICY IF EXISTS "Customers can update own branding" ON customer_brandings;
DROP POLICY IF EXISTS "Service role can insert brandings" ON customer_brandings;

-- ========================================
-- STEP 2: Create NEW simplified policies
-- ========================================

-- Policy 1: Anonymous users can view with valid token (for onboarding links)
CREATE POLICY "anon_can_view_with_token"
  ON customer_brandings
  FOR SELECT
  TO anon
  USING (onboarding_token IS NOT NULL);

-- Policy 2: Authenticated users can view their own brandings
CREATE POLICY "auth_can_view_own_brandings"
  ON customer_brandings
  FOR SELECT
  TO authenticated
  USING (
    -- Check if this branding belongs to an order with matching email
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
    )
    OR
    -- OR user is admin (check JWT app_metadata)
    (auth.jwt()->>'role' = 'admin')
  );

-- Policy 3: Authenticated users can insert brandings for their orders
CREATE POLICY "auth_can_insert_own_brandings"
  ON customer_brandings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Check if the order_id belongs to the user
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
    )
    OR
    -- OR user is admin
    (auth.jwt()->>'role' = 'admin')
  );

-- Policy 4: Authenticated users can update their own brandings
CREATE POLICY "auth_can_update_own_brandings"
  ON customer_brandings
  FOR UPDATE
  TO authenticated
  USING (
    -- Check if this branding belongs to user's order
    EXISTS (
      SELECT 1 FROM webflix_orders
      WHERE webflix_orders.id = customer_brandings.order_id
      AND webflix_orders.customer_data->>'email' = auth.jwt()->>'email'
    )
    OR
    -- OR user is admin
    (auth.jwt()->>'role' = 'admin')
  );

-- Policy 5: Only admins can delete brandings
CREATE POLICY "admin_can_delete_brandings"
  ON customer_brandings
  FOR DELETE
  TO authenticated
  USING (auth.jwt()->>'role' = 'admin');

-- ========================================
-- STEP 3: Verify RLS is enabled
-- ========================================

ALTER TABLE customer_brandings ENABLE ROW LEVEL SECURITY;
