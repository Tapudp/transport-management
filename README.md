# Overview
A React-based mobile-first application for managing transporters, tracking transactions, and searching trucks. Designed primarily for mobile devices with responsive layouts for all screen sizes.

# Features
- User authentication with mobile OTP
- Transporter management (add, view, track balances)
- Transaction history viewing
- Truck search functionality
- Responsive design optimized for mobile

# Installation
## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

# Setup Steps
## 1. Clone the repository
```
git clone <repository-url>
cd transport-management-app
```

## 2. Install dependencies
```
npm install
```

## 3. Environment Setup
Create a .env file in the root directory with your environment variables:
```
REACT_APP_API_BASE_URL=http://your-api-url.com
```

## 4. Run the development server
```
npm start
```

## 5. Open in browser
The application will automatically open in your default browser at http://localhost:3000


# Folder Structure
```
transport-management-app/
├── public/                  # Static files
│   ├── index.html           # Main HTML template
│   └── ...                  # Other static assets
│
├── src/
│   ├── components/          # Reusable components
│   │   ├── Footer.js        # Bottom navigation
│   │   ├── Header.js        # Top navigation bar
│   │   ├── FormInput.js     # Form input component
│   │   └── TransporterCard.js # Transporter list item
│   │
│   ├── pages/               # Application screens
│   │   ├── Login.js         # Login/OTP screen
│   │   ├── TotalCredit.js   # Transporter list
│   │   ├── AddTransporter.js # Add new transporter
│   │   ├── ViewTransporter.js # Transporter details
│   │   └── SearchTruck.js   # Truck search screen
│   │
│   ├── styles/              # Global styles
│   │   └── globalStyles.js  # Global CSS styles
│   │
│   ├── App.js               # Main application component
│   ├── AppRouter.js         # Application routing
│   └── index.js            # Entry point
│
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies
└── README.md               # This documentation
```

# Building for Production
## 1. Create production build
```
npm run build
```

## 2. Serve the production build locally
You can serve the production build using:
```
npm install -g serve
serve -s build
```

## Development Scripts
- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (advanced)


# License
[Specify your license here]

This README provides comprehensive instructions for setting up, developing, building, and deploying the Transport Management System application. The mobile-first design ensures optimal performance on handheld devices while maintaining functionality on desktop browsers.