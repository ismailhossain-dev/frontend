# 📚 BookCourier - Library-to-Home Delivery System

A modern library delivery management system that allows users to request book pickup and delivery from nearby libraries, making it easier for students, researchers, and readers to borrow and return books without physically visiting the library.

## 🔗 Live URL

[bookcourier12.vercel.app](#)

## 📋 Purpose

BookCourier bridges the gap between libraries and readers by providing a convenient book delivery service. Users can browse available books, place orders, track deliveries, and manage their reading list all from the comfort of their homes.

## ✨ Key Features

### User Features

- **Browse Books**: Explore a wide collection of books with detailed information
- **Smart Search & Sort**: Find books quickly by name and sort by price
- **Order Management**: Place orders, track status, and cancel pending orders
- **Secure Payment**: Integrated payment system for book orders
- **Wishlist System**: Save favorite books for later
- **Review & Rating**: Share feedback on ordered books
- **Order History**: View all past orders and invoices
- **Profile Management**: Update personal information and profile picture



### Admin Features

- **User Management**: Promote users to librarian or admin roles
- **Book Moderation**: Publish, unpublish, or delete any book
- **Complete Control**: Oversee all platform activities

### Additional Features

- **Authentication**: Secure login with email/password and social login
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Real-time Updates**: Live order status tracking
- **Coverage Map**: View delivery-available cities
- **JWT Security**: Protected routes with token verification

## 🛠️ NPM Packages Used

### Frontend

- `react` - UI library
- `react-router-dom` - Routing and navigation
- `firebase` - Authentication and hosting
- `axios` - HTTP requests
- `react-hook-form` - Form handling
- `react-hot-toast` - Notifications
- `@tanstack/react-query` - Data fetching and caching
- `swiper` - Banner slider
- `react-icons` - Icon components
- `tailwindcss` - Styling framework
- `daisyui` - UI components
- `react-leaflet` - Map integration
- `stripe` - Payment processing

### Backend

- `express` - Server framework
- `mongodb` - Database
- `dotenv` - Environment variables
- `cors` - Cross-origin resource sharing
- `jsonwebtoken` - JWT authentication
- `stripe` - Payment processing
- `firebase-admin` - Firebase token verification

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- Firebase Account
- Stripe Account

### Installation

1. Clone the repositories

```bash
git clone <client-repo-url>
git clone <server-repo-url>
```

2. Install dependencies

```bash
# Client
cd client
npm install

# Server
cd server
npm install
```

3. Set up environment variables

```bash
# Client .env.local
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=your_backend_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_key

# Server .env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
```

4. Run the application

```bash
# Client
npm run dev

# Server
npm run dev
```




**Built with ❤️ by [Ismail Hossain]**
