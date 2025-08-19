# Qrosto Restaurant Ordering App

A modern restaurant ordering web application built with Next.js and shadcn/ui, designed for Arabic RTL layout.

## Features

- 🍽️ **Categorized Menu Display**: Browse menu items organized by categories
- 🛒 **Shopping Cart**: Add items with quantities, view cart total
- 📱 **Mobile-First Design**: Optimized for mobile phone usage
- 🌐 **Arabic RTL Support**: Full right-to-left layout support
- 🎨 **Custom Theme**: Uses restaurant brand colors (#E6E6DC and #103935)
- ⚡ **Loading States**: Skeleton loaders while fetching data
- 📋 **Order Submission**: Submit orders with table number input
- 🔌 **Real Backend**: Fetches data and posts orders to your API

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide React
- **Deployment**: Netlify ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend running at `http://localhost:3000`

### Configuration

This app expects a Rails backend exposing endpoints like:

- GET `http://localhost:3000/api/v1/restaurants/{restaurant_id}.json`
- POST `http://localhost:3000/api/v1/restaurants/{restaurant_id}/orders.json`

Update `lib/api.ts` if your base URL changes.

### Installation

```bash
git clone <your-repo-url>
cd qrosto-client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Restaurant

Use this demo restaurant ID: `res_ZR3MY7ygGdXKoiw0p5KrblED`.
The landing page links to `/restaurants/res_ZR3MY7ygGdXKoiw0p5KrblED`.

## Backend Integration

Implemented in `lib/api.ts`:
- `fetchRestaurantInfo(id)` – returns `{ id, name, logo, status }` and handles 404 vs network errors
- `fetchMenuItems(id)` – returns an array of menu items with `category`; UI groups by category
- `submitOrder(id, order)` – posts the order with unit prices per item

Error handling:
- 404 restaurant → Not found page
- Network error → “try again later” page
- Order failure → inline message; user can resubmit

## Price Formatting

- Prices are formatted as western numerals with commas, e.g., `100,000`
- Currency: Syrian pounds `ل.س`

## Project Structure

```
qrosto-client/
├── app/
├── components/
├── contexts/
├── lib/
│   └── api.ts
├── types/
└── netlify.toml
```

## Deployment

- Netlify configuration is provided in `netlify.toml`
- Build: `npm run build` | Start: `npm run start`

## Notes

- Restaurant theming is unified for all restaurants (no dynamic theme per API)
- RTL and Rubik font are applied globally
