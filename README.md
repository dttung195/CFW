# Code Fun Website

A modern, responsive website for Code Fun, a technology education center dedicated to empowering students with cutting-edge programming skills.

## Features

- Modern UI with responsive design
- Interactive components
- Course catalog with filtering and search
- Contact form with validation
- Floating action buttons for quick navigation

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Router
- React Icons

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cfweb.git
cd cfweb
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
cfweb/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── layout/    # Layout components
│   │   └── shared/    # Shared components
│   ├── pages/         # Page components
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.ts     # Vite configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production-ready app
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## License

MIT
