# Nimble Holidays — Laravel + React + Inertia starter

A responsive homepage redesign based on the supplied `Nimble Holidays.html` prototype and the Nimble Holidays brief. It uses a white, editorial interface, real destination photography, the logo-inspired blue/cyan/green/yellow/orange/red palette, destination selection, and a custom quotation form.

## Included
- `resources/js/Pages/Home.jsx` — React/Inertia homepage and client-side destination selection.
- `resources/css/app.css` — responsive design styles and palette.
- `routes/web.php` — homepage and enquiry route.
- `prototype/original-nimble-holidays.html` — original uploaded prototype preserved for reference.

## Install into a Laravel app
This folder is a starter overlay, not a complete Laravel installation. Create a Laravel app, then install/configure Inertia React and Tailwind using the current official Laravel/Inertia setup instructions. Copy these files into the matching paths in your app.

Typical existing-app requirements:
- Laravel
- `inertiajs/inertia-laravel`
- `@inertiajs/react`, `react`, `react-dom`
- Tailwind CSS and Vite
- An Inertia root Blade view and `resources/js/app.jsx` entry point

Ensure your `resources/js/app.jsx` resolves `./Pages/${name}.jsx` and imports `../css/app.css`.

## Important setup before production
1. Put the supplied logo file at `public/images/nimble-logo.png` (transparent PNG or SVG preferred). The header has a text fallback until the image exists.
2. Configure a real Nimble Holidays WhatsApp number in the links. Current links open WhatsApp with a prefilled general message but do not specify the business recipient.
3. Implement `App\\Http\\Controllers\\TripEnquiryController` and a `TripEnquiry` model/migration with validation, database persistence, notification/CRM integration, spam protection, and privacy/retention policy. The POST route is a placeholder until this controller is created.
4. Destination images are remote Unsplash image URLs. Replace with licensed/owned assets and local optimized variants before launch; confirm each image matches its caption.
5. Review travel copy, service availability, contact details, legal pages, and SEO metadata with the business.

## Form data captured in the UI
Name, WhatsApp, residence, dates, adult/child counts, accommodation preference, budget/currency, optional services, notes, and selected destination IDs. The backend is intentionally not represented as finished; persist and validate this data before accepting real enquiries.
