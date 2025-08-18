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
- 🔄 **Mock Data**: Ready for backend integration

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

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd qrosto-client
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
qrosto-client/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with RTL support
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main menu page
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── menu-item.tsx      # Individual menu item
│   ├── cart-footer.tsx    # Sticky cart footer
│   └── menu-skeleton.tsx  # Loading skeleton
├── contexts/               # React contexts
│   └── cart-context.tsx   # Cart state management
├── lib/                    # Utility functions
│   └── mock-data.ts       # Mock API data
├── types/                  # TypeScript type definitions
│   └── index.ts           # App types
└── netlify.toml           # Netlify deployment config
```

## Customization

### Theme Colors

The app uses your specified brand colors:
- Primary: `#103935` (Dark Green)
- Secondary: `#E6E6DC` (Light Beige)

These are defined in `app/globals.css` and can be easily modified.

### Menu Data

Edit `lib/mock-data.ts` to customize:
- Restaurant information
- Menu categories and items
- Pricing and descriptions

### Backend Integration

Replace mock data functions in `lib/mock-data.ts` with real API calls:
- `fetchRestaurantInfo()` - Get restaurant details
- `fetchMenuItems()` - Get menu categories and items
- `submitOrder()` - Submit customer orders

## Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. The `netlify.toml` file is already configured
4. Deploy automatically on every push

### Manual Build

```bash
npm run build
npm run start
```

### Environment Variables

Create `.env.local` for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=your-backend-url
NEXT_PUBLIC_RESTAURANT_ID=your-restaurant-id
```

## Usage Flow

1. **Customer Experience**:
   - Customer scans QR code on table
   - Opens web app showing restaurant menu
   - Browses categorized menu items
   - Adds items to cart with quantities
   - Reviews cart and submits order
   - Enters table number
   - Receives order confirmation

2. **Restaurant Staff**:
   - Receives orders via backend
   - Processes and prepares food
   - Delivers to customer's table

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.

---

**Note**: This is a frontend-only implementation. Backend integration is required for production use.
