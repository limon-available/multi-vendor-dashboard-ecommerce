# Admin and Seller Dashboard - Multi-Vendor Ecommerce

React dashboard application for platform admins and sellers.

This app handles admin operations, seller onboarding, seller product management, seller orders, payment withdrawals, Stripe Connect onboarding, dashboards, and real-time admin/seller/customer chat.

## Tech Stack

- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- Socket.IO Client
- ApexCharts
- Stripe Connect flow through backend APIs

## Main Features

- Admin login
- Seller registration and login
- Seller approval, activation, and deactivation
- Admin dashboard analytics
- Seller dashboard analytics
- Category management
- Product management
- Product banner management
- Admin order management
- Seller order management
- Seller withdrawal requests
- Admin withdrawal approval
- Stripe Connect seller onboarding
- Admin-to-seller support chat
- Seller-to-customer chat

## Prerequisites

- Node.js 20+
- npm
- Running backend API
- Backend configured with Stripe, Cloudinary, MongoDB, and JWT secret

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in this directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

For production, use deployed HTTPS URLs:

```env
REACT_APP_API_URL=https://your-backend-domain.com
REACT_APP_SOCKET_URL=https://your-backend-domain.com
```

## Development

```bash
npm start
```

Default local URL:

```text
http://localhost:3001
```

## Production Build

```bash
npm run build
```

The optimized static output is generated in:

```text
build/
```

## API Configuration

API and socket configuration is centralized in:

```text
src/config/app.js
src/api/api.js
src/utils/socket.js
src/utils/utils.js
```

Avoid hardcoding backend URLs in views or reducers. Use the shared config and Axios instance.

## Important Routes

Admin:

- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/dashboard/category` - Category management
- `/admin/dashboard/sellers-request` - Pending seller requests
- `/admin/dashboard/sellers` - Active sellers
- `/admin/dashboard/deactive-sellers` - Deactivated sellers
- `/admin/dashboard/orders` - Orders
- `/admin/dashboard/payment-request` - Withdrawal requests
- `/admin/dashboard/chat-sellers` - Seller support chat

Seller:

- `/login` - Seller login
- `/register` - Seller registration
- `/seller/dashboard` - Seller dashboard
- `/seller/dashboard/add-product` - Add product
- `/seller/dashboard/products` - Product list
- `/seller/dashboard/orders` - Seller orders
- `/seller/dashboard/payments` - Seller payments
- `/seller/dashboard/profile` - Seller profile
- `/seller/dashboard/chat-support` - Admin support chat
- `/seller/dashboard/chat-customer` - Customer chat

## Backend Requirements

The backend must include this dashboard URL in `CLIENT_ORIGINS`.

For Stripe Connect, set backend `DASHBOARD_URL` to this app's deployed URL:

```env
DASHBOARD_URL=https://your-dashboard-domain.com
```

## Deployment Notes

- Deploy as a static React build on Vercel, Netlify, or similar hosting.
- Set all `REACT_APP_*` variables in the hosting provider.
- Ensure backend CORS allows the deployed dashboard URL.
- Ensure backend cookies are configured for HTTPS in production.
- Restrict admin bootstrap after creating the first admin.

## Verification

```bash
npm run build
```

The current build passes, but the app still has existing ESLint warnings that should be cleaned before enforcing CI lint checks.

