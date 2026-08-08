# Frontend Handoff: Search, Filters, Add Property, Auth

Date: 2026-08-06

This doc captures the API and payload contracts after the latest land-focused updates.

## 1) Search and listing API contracts

### A. Keyword search endpoint
- Endpoint: `GET /api/properties/search`
- Purpose: keyword and lightweight filter search.
- Supported query params:
  - `q` (string) keyword
  - `type` (string) listing type from UI (`buy` is mapped to `sale` server-side)
  - `city` (string)
  - `propertyName` (string)
  - `propertyType` (string)
- Backward compatibility:
  - `landType` is accepted as fallback for `propertyType`.

Example:
- `/api/properties/search?q=plot&city=Hyderabad&propertyType=HMDA Approved Plot`

### B. Filter/list endpoint
- Endpoint: `GET /api/properties`
- Purpose: list properties by applied filters.
- Supported query params (current FE use):
  - `listingType` (string)
  - `cityName` (string)
  - `propertyType` (string)
  - `minPrice` (number)
  - `maxPrice` (number)
- Backward compatibility:
  - `landType` is accepted as fallback for `propertyType`.

Example:
- `/api/properties?listingType=sale&cityName=Hyderabad&propertyType=Agricultural Land&minPrice=1000000&maxPrice=5000000`

## 2) Home search behavior

- Default city: `Hyderabad`
- Default land type: `All`
- Suggestions are capped to 5 items.
- Home search sends `propertyType` (not `landType`) when not `All`.

## 3) Search page sidebar behavior

Sidebar now exposes only:
- City
- Land Type
- Min Price
- Max Price

Removed from sidebar:
- Bedrooms
- Status
- Size/area widgets

## 4) Add property payload changes

### Removed from FE flow
- `floorPlan`
- district/county mapping field previously flowing as `county`

### Current pricing behavior
- `totalPrice` is auto-calculated from:
  - `landSize * pricePerUnit`
- `totalPrice` is read-only in UI.

## 5) Backend strict removal status for floor plan

- API/controller mapping no longer accepts or writes `floorPlan` from request payloads.
- Entity-level `floorPlan` field has been removed.
- DB migration added to drop `floor_plan` column:
  - `landbazaar-server/supabase/migrations/20260806120000_drop_floor_plan_column.sql`

## 6) Auth/password policy contract

Updated password rule (applies to register/login/change/reset):
- Minimum 6 characters
- Alphanumeric only (`A-Z`, `a-z`, `0-9`)

## 7) Authenticated endpoints validated locally

Validated on updated server instance:
- `GET /api/auth/profile`
- `GET /api/properties/my-properties`
- `PUT /api/auth/change-password`

Notes:
- Railway authenticated smoke test was not possible without a currently valid verified account credential.
- Local smoke was run with seeded verified user and password revert was performed.

## 8) Frontend implementation checklist

- Use `propertyType` everywhere in FE query construction.
- Keep `landType` parsing only as a fallback when reading existing URLs.
- Do not send `floorPlan` or district/county in add/edit payload.
- Keep add-property total price derived from land size and price per unit.
- Follow 6+ alphanumeric password validation on all auth forms.
