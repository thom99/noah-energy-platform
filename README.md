# Nova Energy Operations Platform

Interactive frontend concept created as part of the interview process for Van Gooi.

## Overview

Nova is a concept for an operational energy-management interface designed to help users monitor facilities, understand system performance and progressively drill down from portfolio-level information to individual assets.

The prototype explores the following information hierarchy:

Portfolio → Location → Asset → Historical / Operational Detail

## Prototype scope

The application includes:

- Portfolio overview
- Facility status monitoring
- Energy production and consumption visualization
- Operational availability
- Operating cost overview
- Asset monitoring
- Battery performance
- Active alerts
- Maintenance notes
- Simulated battery operating modes

All data used in the application is mocked.

The operating controls are purely demonstrative and are not connected to a real energy-management system.

## Technical approach

Built with:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Lucide Icons

The application uses the Next.js App Router.

Server Components are used for data retrieval and page composition, while Client Components are introduced only where browser-side interaction is required, such as charts, forms and operating-mode controls.

## Architecture

The prototype separates the data layer from presentation:

```text
Mock data
   ↓
Data access layer
   ↓
Server pages
   ↓
Reusable UI components
   ↓
Client interactions