# Phase 1: Backend Core Implementation Plan

This phase focuses on setting up the fundamental infrastructure: the database schema in Supabase and the automated payment/membership logic.

## Proposed Changes

### Database Schema (Supabase)

We need to define the following tables to support the business logic:

1.  **profiles**: Extends Supabase Auth users.
    - `id` (uuid, primary key, refs auth.users)
    - `email` (text)
    - `full_name` (text)
    - `membership_expires_at` (timestamp) - Null if never subscribed.
    - `referred_by` (uuid, refs profiles.id)
    - `created_at` (timestamp)

2.  **payments**: Audit log of all payment attempts.
    - `id` (uuid, primary key)
    - `user_id` (uuid, refs profiles.id)
    - `external_id` (text) - MercadoPago preference ID or payment ID.
    - `amount` (numeric)
    - `status` (text) - e.g., 'pending', 'approved', 'rejected'.
    - `created_at` (timestamp)

3.  **tickets**: Raffle entries.
    - `id` (uuid, primary key)
    - `user_id` (uuid, refs profiles.id)
    - `payment_id` (uuid, refs payments.id)
    - `created_at` (timestamp)

### Backend Logic (Next.js API Routes / Supabase Edge Functions)

#### [NEW] [route.ts](file:///d:/Mis%20Documentos/0%20-%20TRABAJO/2%20-%20IWON/450audiovisual-app/450audiovisual-app/app/api/webhooks/mercadopago/route.ts)
- Receives webhook from MercadoPago.
- Validates payment status.
- Deduplicates events based on `external_id`.
- Updates `membership_expires_at` in `profiles` (extends 30 days).
- Creates a new `tickets` entry for the user.
- Creates or updates the user profile if it doesn't exist (onboarding).

## Verification Plan

### Automated Tests
- Mock MercadoPago webhook requests to verify:
    - User creation/update logic.
    - Date extension logic (ensure it's additive if already active).
    - Ticket generation.
- SQL tests for RLS policies.

### Manual Verification
- Manually trigger the webhook with a tool like Postman.
- Check Supabase dashboard for data consistency.
