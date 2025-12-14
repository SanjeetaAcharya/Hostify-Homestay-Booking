# Hostify - Homestay Booking Platform

A modern, responsive homestay booking platform built with Next.js 15, TypeScript, and Tailwind CSS. This project demonstrates pixel-perfect UI recreation, dynamic routing, and state management.

## Demo

**Screen Recording:** [Watch Demo Video] (https://github.com/user-attachments/assets/7880ebdb-70f0-46f7-94e8-587fdb80ac93
)

> The screen recording demonstrates all features including property browsing, search functionality, property details, like/unlike persistence, authentication flows, responsive design, and theme toggle.

## Features

### Core Features

- **Property Listings** - Browse through 12 curated homestay properties with search and filter capabilities
- **Property Details** - View comprehensive property information including images, amenities, host details, and similar stays
- **Search Functionality** - Search properties by location, check-in/check-out dates, and number of guests
- **Like/Unlike Properties** - Save favorite properties with persistent storage across sessions
- **User Authentication** - Sign up and login with form validation and error handling
- **Responsive Design** - Fully responsive layout optimized for desktop and mobile devices

### Technical Features

- **Dynamic Routing** - Next.js App Router with dynamic property routes
- **State Management** - Zustand for global state management
- **Local Storage Persistence** - Liked properties persist across browser sessions
- **Form Validation** - Client-side validation with real-time error feedback
- **Image Optimization** - Next.js Image component for optimized loading
- **Type Safety** - TypeScript for enhanced code quality
- **Animations** - Smooth transitions using Framer Motion
- **Theme Toggle** - Light/Dark mode support with persistence

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Image Handling:** Next.js Image Optimization

## Project Structure

```
hostify-app/
├── .next/                          # Next.js build output
├── app/
│   ├── page.tsx                    # Homepage (Listings)
│   ├── layout.tsx                  # Root layout with Header
│   ├── globals.css                 # Global styles
│   ├── login/
│   │   └── page.tsx                # Login page
│   ├── property/
│   │   └── [id]/
│   │       └── page.tsx            # Dynamic property details page
│   └── signup/
│       └── page.tsx                # Sign up page
├── components/
│   ├── Footer.tsx                  # Footer with links
│   ├── Header.tsx                  # Navigation header with auth
│   ├── PropertyCard.tsx            # Reusable property card component
│   └── SearchBar.tsx               # Search form component
├── data/
│   └── properties.json             # Dummy property data (12 properties)
├── lib/                            # Utility functions (if needed)
├── node_modules/                   # Dependencies
├── public/
│   └── images/                     # Static images
│       ├── auth-background.jpg
│       ├── hostify-logo.png
│       └── search-background.png
├── store/
│   ├── useAuthStore.ts             # Authentication state (Zustand)
│   ├── usePropertyStore.ts         # Liked properties state (Zustand)
│   ├── useSearchStore.ts           # Search filters state (Zustand)
│   └── useThemeStore.ts            # Theme toggle state (Zustand)
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/SanjeetaAcharya/hostify-app.git
cd hostify-app
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open your browser and navigate to

```
http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

## Pages Overview

### Homepage (/)

- Hero section with search bar
- Filter buttons for property categories
- Responsive grid of property cards (1-4 columns based on screen size)
- Like/unlike functionality with heart icon
- Each card displays property image, name, location, price, and rating

### Property Details (/property/[id])

- Large image gallery with main image and thumbnail grid
- Property information (title, location, capacity)
- Host details with join date
- Comprehensive description
- Complete amenities list
- Map section with location
- Sticky booking card with price breakdown and reserve button
- Similar stays section with related properties

### Sign Up (/signup)

- Email, password, and confirm password fields
- Real-time form validation
- Email format validation
- Password length requirement (minimum 6 characters)
- Password match confirmation
- Error messages for invalid inputs
- Redirects to homepage on successful signup

### Login (/login)

- Email and password fields
- Form validation with error feedback
- Forgot password link
- Redirects to homepage on successful login
- Updates header to show user email and logout button

## Key Implementation Details

### State Management with Zustand

Four separate stores for clean state separation:

**usePropertyStore** - Manages liked properties

- Tracks array of liked property IDs
- Toggle like/unlike functionality
- Persists to localStorage using Zustand persist middleware

**useSearchStore** - Manages search filters

- Location input
- Check-in and check-out dates
- Number of guests
- State persists across navigation

**useAuthStore** - Manages authentication

- Login status
- User information (email)
- Login and logout functions

**useThemeStore** - Manages theme

- Dark/Light mode toggle
- Persists theme preference to localStorage

### Dynamic Routing

Routes:

```
/ → Homepage
/property/[id] → Property details (dynamic)
/signup → Sign up page
/login → Login page
```

### Form Validation

Client-side validation includes:

- Email must be valid format (contains '@' and domain)
- Password minimum 6 characters
- Confirm password must match password
- Real-time error clearing as user types
- Visual error indicators with red borders and messages

### Persistent Storage

Liked properties and theme preferences are stored in localStorage:

- Survives page refreshes
- Survives browser restarts
- Automatic synchronization with UI state

## Design Implementation

- **Primary Color:** Orange (#FF8D28) for call-to-action buttons and branding
- **Typography:** Roboto font family for clean readability
- **Layout:** Container-based responsive design
- **Images:** Optimized using Next.js Image component
- **Hover Effects:** Subtle scale transforms for interactivity
- **Grid System:** Responsive columns (mobile to desktop)
- **Animations:** Framer Motion for smooth page transitions

## Future Enhancements

Potential improvements for production deployment:

- Implement actual search and filter logic with backend
- Add date picker component for booking dates
- Integrate Google Maps API for interactive maps
- Add complete booking flow with payment processing
- Implement user reviews and ratings system
- Add property comparison feature
- Create user profile and booking history pages
- Advanced filtering options (price range, amenities)
- Backend API integration
- Database for persistent data storage

## Development Notes

This is a frontend-only implementation:

- Uses dummy data from local JSON file
- No backend or API integration
- Authentication is simulated (no real user accounts)
- Images served via Unsplash placeholder service
- All interactions are client-side only

## Dependencies

Core dependencies:

```json
{
  "next": "^16.0.8",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "zustand": "^5.0.2",
  "lucide-react": "latest",
  "framer-motion": "^11.0.0",
  "tailwindcss": "^3.4.1",
  "typescript": "^5"
}
```

## Deployment

This project can be deployed to:

- Vercel
- Netlify
- Any Node.js hosting platform

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

## License

This project is for educational and portfolio purposes.
