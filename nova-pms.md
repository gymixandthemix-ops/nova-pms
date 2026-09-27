# BUILD NOVA PMS — CLOUD-NATIVE HOTEL PROPERTY MANAGEMENT SYSTEM

You are an expert product architect, senior full-stack engineer, hotel PMS specialist, UX designer, database architect, and security engineer.

Build a production-ready **multi-tenant cloud-native Hotel Property Management System (PMS)** called **NOVA PMS**.

NOVA is designed to be a modern alternative to legacy hotel PMS platforms. The **reservation and availability engine is the core of the system**, and all other modules must connect to it.

Do not create a static mockup or a collection of disconnected screens.

Build a real application architecture with:

* Real database models
* Real authentication
* Multi-tenancy
* Role-based permissions
* Reservation logic
* Availability calculations
* Room assignment
* Check-in/check-out
* Folios
* Payments
* Housekeeping
* Maintenance
* Audit logs
* Real-time updates
* API architecture
* Validation
* Error handling
* Responsive UI

If the platform cannot implement a backend feature immediately, create the correct architecture and interfaces so the feature can be implemented later. Do not fake critical hotel operations with hardcoded data.

---

# 1. PRODUCT VISION

NOVA PMS should feel like a modern operating system for hotels.

Primary users:

* General Managers
* Front Office Managers
* Receptionists
* Reservation Agents
* Housekeeping
* Maintenance
* Revenue Managers
* Accounting
* Hotel Owners
* Administrators

NOVA must support:

```text
Organization
    ↓
Properties
    ↓
Departments / Users
    ↓
Rooms / Inventory
    ↓
Reservations
    ↓
Guests
    ↓
Folios / Payments
    ↓
Operations
```

The architecture must support one organization operating multiple hotels.

Example:

```text
Atlas Hospitality Group
│
├── Casablanca Hotel
│   ├── 120 rooms
│   └── Restaurant
│
├── Marrakech Resort
│   ├── 220 rooms
│   └── 3 restaurants
│
└── Rabat Hotel
    └── 80 rooms
```

---

# 2. CORE ARCHITECTURE

Use a **modular monolith for the MVP**, not microservices.

Architecture:

```text
NOVA
│
├── Web Application
│
├── API
│
├── PostgreSQL
│
├── Redis
│
└── Background Jobs
```

Internally organize the backend into modules:

```text
Auth
Organizations
Properties
Rooms
Guests
Reservations
Availability
Rates
Housekeeping
Maintenance
Billing
Payments
Reports
Communications
Notifications
Audit
```

The architecture must allow modules to be extracted into independent services later.

---

# 3. TECHNOLOGY STACK

## Frontend

Use:

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* TanStack Query
* React Router
* Zustand
* React Hook Form
* Zod
* date-fns

## Backend

Prefer:

* Node.js
* TypeScript
* Fastify
* Prisma
* PostgreSQL
* Redis
* WebSockets
* BullMQ

If the AI builder has a different supported backend stack, preserve the same architecture and database behavior rather than forcing unsupported technologies.

---

# 4. DESIGN DIRECTION

NOVA must look like a **premium modern hotel operations platform**, not a generic admin dashboard.

Design principles:

* Clean
* Professional
* Premium
* Fast
* Dense but readable
* Hotel-industry oriented
* Desktop-first for reception
* Mobile-first for housekeeping
* Fully responsive
* Accessible
* Clear information hierarchy

Use:

* Dark navy / deep neutral primary interface
* White/light content areas where appropriate
* Subtle borders
* Rounded but not excessively rounded components
* Clear status badges
* Strong typography
* Compact tables
* Professional data visualization
* Smooth transitions
* Keyboard shortcuts
* Command palette

Avoid:

* Generic SaaS templates
* Excessive gradients
* Huge cards
* Excessive empty space
* Cartoon-style graphics
* Fake statistics
* Decorative UI that reduces operational efficiency

The interface should feel suitable for a real 4–5 star hotel.

---

# 5. GLOBAL NAVIGATION

Create the main application shell:

```text
NOVA
│
├── Dashboard
│
├── Front Desk
│   ├── Arrivals
│   ├── Departures
│   ├── In-House
│   ├── Room Rack
│   └── Walk-In
│
├── Reservations
│   ├── Search
│   ├── Calendar
│   ├── New Reservation
│   └── Groups
│
├── Rooms
│   ├── Room Rack
│   ├── Room Types
│   ├── Blocks
│   └── Maintenance
│
├── Housekeeping
│   ├── Board
│   ├── Tasks
│   └── Inspections
│
├── Guests
│   ├── Profiles
│   ├── History
│   └── VIP
│
├── Billing
│   ├── Folios
│   ├── Payments
│   ├── Invoices
│   └── Cashier
│
├── Revenue
│   ├── Rates
│   ├── Pickup
│   ├── Forecast
│   └── Restrictions
│
├── Reports
│
├── Communications
│
└── Settings
```

Show the active property and current user in the application header.

Allow authorized users to switch between properties.

---

# 6. MULTI-TENANCY

Implement tenant isolation from the beginning.

Hierarchy:

```text
Organization
    ↓
Property
    ↓
Department
    ↓
User
    ↓
Permissions
```

Every hotel-specific database entity must be associated with the appropriate organization/property.

Never allow a user from Organization A to access Organization B data.

Enforce tenant isolation at the backend/API level.

Do not rely only on frontend filtering.

---

# 7. DATABASE

Use PostgreSQL.

Use UUID primary keys.

Use timestamps.

Use foreign keys and indexes.

Use appropriate unique constraints.

Core tables:

```text
organizations

properties

users
roles
permissions
role_permissions
user_roles

buildings
floors

room_types
rooms
room_features
room_type_features
room_blocks

guests

rate_plans
cancellation_policies
daily_rates
room_type_daily_inventory

reservations
reservation_rooms
reservation_guests

folios
folio_items
payments
payment_allocations

housekeeping_tasks
maintenance_tickets

communications
notifications

audit_logs
```

---

# 8. ORGANIZATIONS

Create:

```text
organizations
```

Fields:

```text
id
name
legal_name
country
currency
timezone
status
created_at
updated_at
```

---

# 9. PROPERTIES

Create:

```text
properties
```

Fields:

```text
id
organization_id
name
code
address
city
country
phone
email
timezone
currency
check_in_time
check_out_time
status
created_at
updated_at
```

---

# 10. USERS AND RBAC

Create:

```text
users
roles
permissions
role_permissions
user_roles
```

Users:

```text
id
organization_id
first_name
last_name
email
phone
password_hash
status
last_login_at
created_at
updated_at
```

Default roles:

```text
SUPER_ADMIN
OWNER
GENERAL_MANAGER
FRONT_OFFICE_MANAGER
FRONT_DESK
RESERVATIONS
HOUSEKEEPING
MAINTENANCE
ACCOUNTING
REVENUE_MANAGER
AUDITOR
```

Do NOT hard-code permissions inside React components.

Implement RBAC through database permissions.

Example permissions:

```text
reservation.read
reservation.create
reservation.modify
reservation.cancel
reservation.checkin
reservation.checkout

room.read
room.modify
room.block

guest.read
guest.modify

folio.read
folio.modify
payment.create

housekeeping.read
housekeeping.modify

maintenance.read
maintenance.modify

reports.read
settings.modify
```

---

# 11. ROOMS

Create:

```text
room_types
rooms
room_features
room_type_features
room_blocks
```

Room type fields:

```text
id
property_id
name
code
description
max_adults
max_children
base_occupancy
size_m2
status
```

Examples:

```text
STD
DEL
EXEC
JUNIOR
SUITE
PRESIDENTIAL
```

Rooms:

```text
id
property_id
room_type_id
building_id
floor
room_number
status
housekeeping_status
front_office_status
is_out_of_order
created_at
updated_at
```

Room statuses:

```text
VACANT
OCCUPIED
RESERVED
DIRTY
CLEAN
INSPECTED
OUT_OF_ORDER
OUT_OF_SERVICE
```

---

# 12. GUESTS

Create a reusable guest profile.

```text
guests
```

Fields:

```text
id
organization_id
first_name
last_name
email
phone
date_of_birth
nationality
country
id_type
id_number
id_expiry
address
vip_level
notes
created_at
updated_at
```

Do not duplicate guest records for every stay.

Use:

```text
Guest
 ↓
Reservation
 ↓
Stay
```

---

# 13. RESERVATION ENGINE

This is the most important component of NOVA.

Do NOT make a reservation equal to a room.

Use:

```text
Reservation
│
├── Reservation Guests
│
├── Reservation Rooms
│
├── Charges
│
├── Payments
│
├── Notes
│
└── Events
```

Reservation fields:

```text
id
property_id
confirmation_number
status
source
channel
market_segment
created_by
guest_id
arrival_date
departure_date
adults
children
currency
total_amount
balance_due
special_requests
created_at
updated_at
```

Statuses:

```text
INQUIRY
OPTION
CONFIRMED
CHECKED_IN
CHECKED_OUT
CANCELLED
NO_SHOW
```

Generate unique confirmation numbers such as:

```text
NVA-82931
```

---

# 14. RESERVATION ROOMS

One reservation can contain multiple rooms.

Create:

```text
reservation_rooms
```

Fields:

```text
id
reservation_id
room_type_id
room_id
rate_plan_id
adults
children
arrival_date
departure_date
nightly_rate
total_amount
status
```

Example:

```text
John Smith
Confirmation NVA-82931

2 × Deluxe
1 × Suite
```

All rooms remain under one reservation.

---

# 15. RATE PLANS

Create:

```text
rate_plans
```

Fields:

```text
id
property_id
name
code
room_type_id
base_rate
currency
meal_plan
cancellation_policy_id
min_stay
max_stay
status
```

Examples:

```text
BAR
BB
NONREF
CORPORATE
LONG_STAY
OTA
WEEKEND
PROMO
```

Create cancellation policies separately.

---

# 16. DAILY INVENTORY AND RATES

Never depend only on a single base rate.

Create:

```text
room_type_daily_inventory
```

Fields:

```text
id
property_id
room_type_id
date
total_rooms
available_rooms
stop_sell
min_stay
max_stay
```

Create:

```text
daily_rates
```

Fields:

```text
id
rate_plan_id
room_type_id
date
rate
currency
```

This enables future dynamic pricing.

---

# 17. AVAILABILITY ENGINE

Build a dedicated availability service.

Example query:

```text
10 October → 13 October
2 adults
Deluxe
```

Endpoint:

```text
POST /api/v1/availability/search
```

Request:

```json
{
  "propertyId": "property_123",
  "arrival": "2026-10-10",
  "departure": "2026-10-13",
  "rooms": [
    {
      "roomTypeId": "deluxe",
      "adults": 2,
      "children": 0
    }
  ]
}
```

Availability must account for:

* Physical inventory
* Existing reservations
* Arrival date
* Departure date
* Cancellation
* Room assignment
* Room type
* Room blocks
* Maintenance
* Out-of-order rooms
* Stop sell
* Minimum stay
* Maximum stay
* Occupancy restrictions
* Overbooking rules

Overlap logic:

```text
existing.arrival < requested.departure
AND
existing.departure > requested.arrival
```

Return:

```json
{
  "roomType": "Deluxe",
  "available": 7,
  "rate": 125,
  "currency": "EUR",
  "total": 375
}
```

Availability must be calculated server-side.

---

# 18. DOUBLE-BOOKING PROTECTION

This is critical.

Never rely on frontend availability checks.

Reservation creation must be transactional.

Conceptually:

```text
BEGIN TRANSACTION

LOCK relevant inventory

CHECK availability

CREATE reservation

CREATE reservation_rooms

UPDATE inventory

COMMIT
```

If two users attempt to sell the final available room:

```text
User A → succeeds

User B → receives availability conflict
```

Use PostgreSQL transactions/locking or another database-level concurrency strategy.

The database is the final authority.

---

# 19. ROOM CALENDAR

Create NOVA's signature screen:

```text
ROOM CALENDAR
```

Example:

```text
                    OCTOBER 2026

ROOM       10       11       12       13       14
────────────────────────────────────────────────────
101        █████████████████
           Ahmed Smith

102                  █████████████
                     Maria Jones

103        CLEAN     ███████████████████
                     John Doe

104        OUT OF ORDER

105        █████████████████████
           Corporate Booking
```

The calendar must support:

* Day view
* Week view
* Multi-day timeline
* Horizontal scrolling
* Search
* Filters
* Room type filtering
* Floor filtering
* Housekeeping status
* Reservation status
* Drag-and-drop room assignment

Do not rely only on colors.

Every status should also have text/icons.

---

# 20. DRAG-AND-DROP ROOM ASSIGNMENT

Allow receptionists to drag a reservation to a room.

Before assignment validate:

```text
Correct room type?
Available?
Not blocked?
Not under maintenance?
No overlapping reservation?
Occupancy compatible?
```

If invalid:

```text
Cannot assign Room 208.

Reason:
Room occupied from 11–15 October.
```

If valid:

```text
Room assigned successfully.
```

All assignments must be persisted through the API.

---

# 21. FRONT DESK DASHBOARD

Create a real operational dashboard.

Show:

```text
Today's arrivals
Today's departures
Current in-house guests
Available rooms
Dirty rooms
Clean rooms
Inspected rooms
Out-of-order rooms
Outstanding balances
VIP arrivals
Late check-outs
No-shows
```

Provide quick actions:

```text
New Reservation
Walk-In
Check-In
Check-Out
Assign Room
Search Guest
Open Room Rack
```

Do not populate metrics with fake static numbers once the backend exists.

---

# 22. NEW RESERVATION SCREEN

Create a fast receptionist workflow.

Structure:

```text
NEW RESERVATION

Guest
[ Search guest... ] [+ New Guest ]

Arrival       Departure       Guests
10 Oct        13 Oct          2 Adults

ROOM
Deluxe
€125 / night
[SELECT]

RATE
BAR
Breakfast included

TOTAL
€375

[SAVE OPTION]
[CONFIRM RESERVATION]
```

Use Zod validation.

Prevent invalid dates.

Prevent departure before arrival.

Show real-time availability.

Calculate totals server-side.

---

# 23. RESERVATION DETAIL WORKSPACE

Create a powerful reservation workspace.

Example:

```text
Reservation #NVA-82931

John Smith

STAY
10 Oct → 13 Oct
Deluxe 208

STATUS
CONFIRMED

PAYMENT
€375
Paid €100
Balance €275

TIMELINE
10:21 Reservation created
10:23 Payment received
10:24 Confirmation sent
11:04 Room assigned

ACTIONS

[CHECK IN]
[CHANGE ROOM]
[MODIFY]
[CANCEL]
[ADD CHARGE]
[PAYMENT]
[SEND CONFIRMATION]
```

Include tabs:

```text
Overview
Stay
Guest
Folio
Payments
Notes
Timeline
Communications
Audit
```

---

# 24. CHECK-IN

Build a dedicated check-in workflow.

Steps:

```text
Find reservation
↓
Verify guest
↓
Verify identity/document
↓
Confirm room
↓
Review payment/balance
↓
Collect required information
↓
Check in
```

On check-in:

```text
Reservation status → CHECKED_IN
Room status → OCCUPIED
Housekeeping state → appropriate occupied state
```

Record audit event.

---

# 25. CHECK-OUT

Workflow:

```text
Open reservation
↓
Review folio
↓
Add final charges
↓
Collect remaining payment
↓
Close folio
↓
Check out guest
```

After check-out:

```text
Reservation → CHECKED_OUT
Room → DIRTY
```

Trigger housekeeping workflow.

---

# 26. FOLIO AND PAYMENTS

Never put payments directly inside reservations.

Create:

```text
folios
folio_items
payments
payment_allocations
```

Example:

```text
ROOM                 €375
BREAKFAST             €45
MINIBAR               €18
─────────────────────────
TOTAL                €438

PAID                 €200
─────────────────────────
BALANCE              €238
```

Support:

* Multiple payments
* Partial payments
* Split payments
* Multiple payment methods
* Charges
* Refunds
* Discounts
* Taxes
* Service charges
* Folio closure

---

# 27. HOUSEKEEPING

Housekeeping must be mobile-first.

Board:

```text
HOUSEKEEPING

TODAY

🔴 Room 204    DIRTY
🟡 Room 205    CLEANING
🟢 Room 206    INSPECTED
🔴 Room 207    DIRTY
⚠️ Room 208    MAINTENANCE
```

Room workflow:

```text
Room 204

[START CLEANING]

☐ Bathroom
☐ Bed
☐ Towels
☐ Amenities
☐ Vacuum
☐ Inspection

[MARK CLEAN]
```

Supervisor can:

```text
CLEAN
↓
INSPECTED
```

Changing room state must update the central room status.

---

# 28. MAINTENANCE

Create:

```text
maintenance_tickets
```

Fields:

```text
id
property_id
room_id
created_by
assigned_to
priority
category
description
status
created_at
resolved_at
```

Example:

```text
Room 405
AC not cooling
HIGH
Assigned: Ahmed
```

Maintenance rooms must be excluded from sellable inventory according to their status/rules.

---

# 29. GUEST PROFILE

Guest profile should show:

```text
Personal information
Contact information
Identity information
Preferences
VIP level
Past stays
Current reservations
Future reservations
Total spend
Notes
Communication history
```

Use one guest profile across all stays.

---

# 30. REAL-TIME SYSTEM

Implement WebSockets.

Example:

```text
Reception changes Room 305
        ↓
Backend
        ↓
WebSocket event
        ↓
Reception PC
Housekeeping tablet
Manager dashboard
```

Events:

```text
reservation.created
reservation.updated
reservation.cancelled

room.status_changed
room.assigned

housekeeping.task_created
housekeeping.completed

payment.received

maintenance.created
maintenance.resolved
```

UI should update without requiring a page refresh.

---

# 31. API

Use versioned APIs:

```text
/api/v1
```

Authentication:

```text
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET  /auth/me
```

Properties:

```text
GET    /properties
POST   /properties
GET    /properties/:id
PATCH  /properties/:id
```

Rooms:

```text
GET    /properties/:id/rooms
POST   /rooms
GET    /rooms/:id
PATCH  /rooms/:id
POST   /rooms/:id/block
POST   /rooms/:id/unblock
```

Availability:

```text
POST /availability/search
GET  /availability/calendar
```

Reservations:

```text
GET    /reservations
POST   /reservations
GET    /reservations/:id
PATCH  /reservations/:id
POST   /reservations/:id/confirm
POST   /reservations/:id/cancel
POST   /reservations/:id/check-in
POST   /reservations/:id/check-out
POST   /reservations/:id/assign-room
```

Guests:

```text
GET   /guests
POST  /guests
GET   /guests/:id
PATCH /guests/:id
GET   /guests/:id/stays
```

Folios:

```text
GET  /folios/:id
POST /folios/:id/items
POST /folios/:id/payments
POST /folios/:id/close
```

Housekeeping:

```text
GET   /housekeeping/board
PATCH /housekeeping/rooms/:roomId
POST  /housekeeping/tasks
PATCH /housekeeping/tasks/:id
```

---

# 32. COMMAND BAR

Create a global command bar:

```text
⌘ K   Search or ask NOVA...
```

Examples:

```text
Find John Smith

Show rooms arriving today

Which rooms are dirty?

Show today's departures

Create reservation for Ahmed for 2 nights
```

The command bar must use authorized backend operations.

Do not allow unrestricted AI-generated SQL.

---

# 33. AI ASSISTANT

Build AI architecture so that AI acts through controlled tools.

Architecture:

```text
User
 ↓
NOVA AI Assistant
 ↓
Tool authorization
 ↓
NOVA API
 ↓
Database
```

For read operations:

```text
"Show today's arrivals."
```

AI may call:

```text
get_arrivals(date)
```

For destructive operations:

```text
"Cancel reservation NVA-821."
```

The assistant must show:

```text
Reservation NVA-821
John Smith
28–30 September
Cancellation fee: €50

[CONFIRM CANCELLATION]
```

Only explicit user confirmation executes the destructive API action.

Never allow AI to directly modify the database.

---

# 34. NOTIFICATIONS

Use background jobs.

Architecture:

```text
Reservation confirmed
       ↓
Event
       ↓
BullMQ
       ↓
Notification worker
       ├── Email
       ├── SMS
       └── WhatsApp
```

The reservation request must not wait for external notification providers.

Create notification statuses:

```text
PENDING
PROCESSING
SENT
FAILED
CANCELLED
```

---

# 35. REDIS

Use Redis for:

```text
Sessions
Rate limiting
Short-lived availability cache
WebSocket presence
Background job queues
Temporary locks
```

Do not use Redis as the authoritative reservation database.

PostgreSQL is the source of truth.

---

# 36. SECURITY

NOVA handles sensitive hotel information.

Implement:

```text
HTTPS
JWT access tokens
Refresh tokens
RBAC
Tenant isolation
Rate limiting
Input validation
Zod
SQL injection protection
Audit logging
Encryption at rest
Encrypted secrets
2FA architecture
Session management
```

Never expose:

* Password hashes
* Authentication secrets
* Payment secrets
* Internal database errors
* Tenant data across organizations

Use secure environment variables.

---

# 37. AUDIT LOGGING

Every important operational action should generate an audit event.

Create:

```text
audit_logs
```

Fields:

```text
id
organization_id
property_id
user_id
action
entity_type
entity_id
old_values
new_values
ip_address
created_at
```

Example:

```text
Yassine
changed
Room 305
from
Clean
to
Out of Order

27 Sep 2026 16:32
```

Audit logs must be immutable to ordinary users.

---

# 38. REPORTS

Implement initial reports:

## Occupancy

```text
Available rooms
Occupied rooms
Out of order
Occupancy %
```

## ADR

```text
Room revenue / rooms sold
```

## RevPAR

```text
Room revenue / available rooms
```

## Pickup

```text
Today's bookings
vs yesterday
vs 7 days ago
```

## Channel production

```text
Direct
Booking.com
Expedia
Walk-in
Corporate
Travel agents
```

Allow date-range filtering and property filtering.

---

# 39. BOOKING ENGINE

Prepare architecture for a public hotel booking engine.

Guest workflow:

```text
Choose dates
↓
Choose room
↓
Choose rate
↓
Guest information
↓
Payment
↓
Confirmation
```

The booking engine MUST use the exact same availability engine as the PMS.

Never create a second independent inventory system.

---

# 40. OTA / CHANNEL MANAGER ARCHITECTURE

Prepare the integration layer for:

```text
NOVA
 ↓
Channel Manager
 ↓
Booking.com
Expedia
Agoda
```

When NOVA sells a room:

```text
NOVA inventory
↓
Channel Manager
↓
OTA inventory decreases
```

When OTA receives a booking:

```text
OTA
↓
Channel Manager
↓
NOVA
↓
Reservation created
↓
Inventory updated
```

For MVP, create integration interfaces/stubs rather than fake live OTA connections.

---

# 41. PROJECT STRUCTURE

Frontend:

```text
src/
│
├── app/
│   ├── router.tsx
│   ├── providers.tsx
│   └── config.ts
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── data-table/
│   ├── date-picker/
│   └── money/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── reservations/
│   ├── rooms/
│   ├── housekeeping/
│   ├── guests/
│   ├── billing/
│   ├── revenue/
│   ├── reports/
│   ├── communications/
│   └── settings/
│
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   ├── websocket.ts
│   ├── dates.ts
│   └── currency.ts
│
├── stores/
│   ├── authStore.ts
│   ├── propertyStore.ts
│   └── uiStore.ts
│
├── types/
│
└── main.tsx
```

Backend:

```text
server/
└── src/
    ├── app.ts
    ├── server.ts
    │
    ├── modules/
    │   ├── auth/
    │   ├── organizations/
    │   ├── properties/
    │   ├── rooms/
    │   ├── guests/
    │   ├── reservations/
    │   ├── availability/
    │   ├── rates/
    │   ├── housekeeping/
    │   ├── maintenance/
    │   ├── billing/
    │   ├── payments/
    │   ├── reports/
    │   └── communications/
    │
    ├── database/
    │   ├── prisma/
    │   └── migrations/
    │
    ├── jobs/
    │   ├── reservationExpiry.ts
    │   ├── notifications.ts
    │   └── dailyReports.ts
    │
    ├── websocket/
    │
    ├── middleware/
    │   ├── auth.ts
    │   ├── tenant.ts
    │   └── permissions.ts
    │
    └── utils/
```

---

# 42. MONOREPO

Preferred structure:

```text
nova-pms/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── ui/
│   ├── types/
│   ├── validation/
│   └── config/
│
├── docker-compose.yml
├── package.json
└── pnpm-workspace.yaml
```

If the builder cannot create a monorepo, maintain clear separation between frontend, backend, shared types, and validation.

---

# 43. MVP SCREENS

Do NOT attempt to build 100 screens initially.

Build these 12 core screens first:

```text
01 Login

02 Dashboard

03 Front Desk

04 Room Calendar

05 Reservation Search

06 New Reservation

07 Reservation Detail

08 Guest Profile

09 Check-In

10 Check-Out / Folio

11 Housekeeping Board

12 Settings
```

These screens must be connected to real application state and database operations.

---

# 44. MVP DATABASE

Start with:

```text
organizations
properties
users
roles
permissions
user_roles

room_types
rooms
room_blocks

guests

rate_plans
daily_rates
room_type_daily_inventory

reservations
reservation_rooms
reservation_guests

folios
folio_items
payments
payment_allocations

housekeeping_tasks
maintenance_tickets

audit_logs
notifications
```

---

# 45. END-TO-END MVP WORKFLOW

The application must support this complete loop:

```text
ADMIN
 ↓
Create Hotel
 ↓
Create Room Types
 ↓
Create Rooms
 ↓
Create Rate Plan
 ↓
Set Rates
 ↓
Open Inventory
 ↓
────────────────────────
GUEST / RESERVATION AGENT
 ↓
Search availability
 ↓
Select room
 ↓
Enter details
 ↓
Reservation created
 ↓
────────────────────────
FRONT DESK
 ↓
See arrival
 ↓
Assign room
 ↓
Check-in
 ↓
Add charges
 ↓
Payment
 ↓
Check-out
 ↓
────────────────────────
HOUSEKEEPING
 ↓
Room becomes DIRTY
 ↓
Clean
 ↓
Inspect
 ↓
Room becomes AVAILABLE
```

This is the minimum real hotel operating loop.

---

# 46. RESERVATION DATA MODEL PRINCIPLE

The architecture must revolve around:

```text
             PROPERTY
                 │
                 ▼
            ROOM TYPE
                 │
                 ▼
               ROOM
                 │
                 ▼
        INVENTORY / DATE
                 │
                 ▼
          RESERVATION
                 │
          ┌──────┴──────┐
          ▼             ▼
        GUEST          FOLIO
                        │
                     PAYMENT
```

Do not violate this structure by creating disconnected reservation logic.

---

# 47. DEVELOPMENT PHASES

Build incrementally.

## Phase 1 — Foundation

```text
Authentication
Multi-tenancy
Property setup
Users
Roles
Room types
Rooms
```

## Phase 2 — Reservation Engine

```text
Guests
Rates
Availability
Reservations
Room assignment
Cancellation
Modification
```

## Phase 3 — Front Desk

```text
Dashboard
Arrivals
Departures
Check-in
Check-out
Room rack
Walk-in
```

## Phase 4 — Operations

```text
Housekeeping
Maintenance
Tasks
Notifications
```

## Phase 5 — Finance

```text
Folios
Charges
Payments
Invoices
Cashier
```

## Phase 6 — Commercial

```text
Booking engine
Promotions
Rate management
OTA/channel manager
```

## Phase 7 — Intelligence

```text
AI assistant
Revenue analytics
Forecasting
Automations
```

---

# 48. BUILDING RULES

Follow these rules strictly:

### Rule 1

Do not build a fake frontend-only PMS.

### Rule 2

Do not use hardcoded reservations once database functionality exists.

### Rule 3

Do not put business-critical logic only in React.

### Rule 4

Availability must be calculated by the backend.

### Rule 5

PostgreSQL is the source of truth.

### Rule 6

Never trust the frontend for permissions.

### Rule 7

Prevent double bookings using database-level transactional protection.

### Rule 8

Do not allow AI to directly access the database.

### Rule 9

Destructive AI actions require explicit confirmation.

### Rule 10

Every hotel-specific query must enforce tenant/property authorization.

### Rule 11

Do not start with microservices.

### Rule 12

Do not build OTA integrations before the internal reservation engine is reliable.

### Rule 13

Do not generate placeholder functionality disguised as production functionality.

### Rule 14

Use realistic demo seed data only for development/demo mode.

### Rule 15

Keep business logic modular and testable.

---

# 49. TESTING REQUIREMENTS

Create tests for the reservation engine.

At minimum test:

```text
One room available
No room available
Two simultaneous booking attempts
Overlapping reservation
Same-day arrival/departure
Cancellation
Room change
Multiple rooms in one reservation
Room type availability
Out-of-order room
Maintenance room
Minimum stay
Maximum stay
Stop sell
Partial payment
Full payment
Check-in
Check-out
```

The most important test:

```text
Two users attempt to reserve the final available room simultaneously.
Only one reservation may succeed.
```

---

# 50. DEMO DATA

Create a development/demo hotel:

```text
Atlas Casablanca Hotel
```

Example:

```text
120 rooms
Multiple room types
Multiple rate plans
Demo guests
Demo reservations
Demo housekeeping states
Demo maintenance tickets
```

Clearly identify demo data as demo data.

Do not mix demo data into production tenants.

---

# 51. DEPLOYMENT

For MVP, use a simple managed architecture.

Preferred:

```text
Frontend
Vercel / Cloudflare

Backend
Railway / Render / Fly.io / AWS

PostgreSQL
Managed PostgreSQL

Redis
Managed Redis

Object Storage
S3-compatible
```

Later, architecture can move toward:

```text
AWS
│
├── CloudFront
├── ECS/EKS
├── RDS PostgreSQL
├── ElastiCache Redis
├── S3
└── CloudWatch
```

Do NOT introduce Kubernetes for the initial MVP.

---

# 52. IMPLEMENTATION PRIORITY

Build in this exact order:

```text
1. Project foundation
2. PostgreSQL / Prisma
3. Authentication
4. Organization / property tenancy
5. RBAC
6. Room types
7. Rooms
8. Guests
9. Rate plans
10. Daily rates
11. Daily inventory
12. Availability engine
13. Reservation creation
14. Reservation modification
15. Reservation cancellation
16. Room assignment
17. Room calendar
18. Check-in
19. Folio
20. Payments
21. Check-out
22. Housekeeping
23. Maintenance
24. Audit logging
25. WebSockets
26. Notifications
27. Reports
28. Booking engine architecture
29. OTA architecture
30. AI command center
```

Do not jump ahead to AI, OTA, or advanced revenue management before the reservation engine works correctly.

---

# 53. FIRST BUILD OBJECTIVE

The first usable build must allow a hotel administrator to:

```text
Create organization
↓
Create property
↓
Create room types
↓
Create rooms
↓
Create rate plan
↓
Set daily rates
↓
Create guest
↓
Search availability
↓
Create reservation
↓
Assign room
↓
View reservation on room calendar
↓
Check guest in
↓
Add folio charges
↓
Record payment
↓
Check guest out
↓
Automatically mark room DIRTY
↓
Housekeeping cleans room
↓
Supervisor inspects room
↓
Room becomes available
```

This workflow must actually work end-to-end.

---

# 54. FINAL PRODUCT STANDARD

NOVA should not feel like a prototype.

It should feel like the foundation of a serious hotel PMS.

Prioritize:

1. Reservation correctness
2. Inventory correctness
3. Data integrity
4. Tenant isolation
5. Security
6. Operational speed
7. Clear UX
8. Real-time updates
9. Auditability
10. Extensibility

The reservation and availability engine is the heart of NOVA.

Everything else must be built around it.

Start by generating the project architecture, database schema, authentication, tenancy model, core navigation, and the first functional reservation workflow.

Do not generate a superficial mockup.

Build the actual application foundation.
