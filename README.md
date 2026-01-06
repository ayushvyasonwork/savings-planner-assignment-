# Savings Planner

A modern, intuitive web application for tracking and managing your savings goals. Built with **Next.js 16**, **React 19**, **Redux Toolkit**, and **Tailwind CSS**, this application helps users create, monitor, and achieve their financial savings targets with ease.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Contributing](#contributing)

## Overview

Savings Planner is a full-stack web application designed to help users manage their financial goals. Users can create savings goals, track their progress, and make contributions towards their targets. The application provides an intuitive dashboard with real-time updates and visual feedback on goal progress.

## Features

- 📊 **Create Savings Goals** - Easily add new savings targets with customizable details
- 💰 **Track Contributions** - Record contributions towards your savings goals
- 📈 **Real-time Progress** - Visual representation of goal progress and current balance
- 🎨 **Modern UI** - Responsive and clean interface built with Tailwind CSS
- 🔄 **State Management** - Redux-based state management for predictable data flow
- ✨ **Smooth Animations** - Beautiful animations powered by Framer Motion
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🎯 **Goal Tracking** - Monitor multiple savings goals simultaneously

## Project Architecture

### Architecture Overview

```
Client Layer (Next.js React App)
    ↓
State Management Layer (Redux Toolkit)
    ├── Goals Slice (goalsSlice.ts)
    └── FX Slice (fxSlice.ts)
    ↓
Component Layer
    ├── Page Components (page.tsx)
    ├── Feature Components
    │   ├── DashboardHeader
    │   ├── GoalCard
    │   ├── AddGoalForm
    │   └── AddContributionForm
    └── UI Components
        └── Modal
    ↓
Styling Layer (Tailwind CSS + Framer Motion)
```

### State Management Flow

The application uses **Redux Toolkit** for centralized state management:

- **Goals Slice**: Manages all savings goals and their associated data
- **FX Slice**: Manages foreign exchange or financial calculation data
- **Custom Hooks**: Provides typed access to Redux store (`useAppSelector`, `useAppDispatch`)

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.1.1 |
| **UI Library** | React 19.2.3 |
| **State Management** | Redux Toolkit 2.11.2 |
| **Styling** | Tailwind CSS 4 + PostCSS |
| **Animations** | Framer Motion 12.24.7 |
| **Icons** | Lucide React 0.562.0 |
| **Date Handling** | date-fns 4.1.0 |
| **Type Safety** | TypeScript 5 |
| **Linting** | ESLint 9 |

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.17 or later)
- **npm** (version 9 or later) or **yarn**, **pnpm**, or **bun**
- **Git** (for cloning the repository)

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/ayushvyasonwork/savings-planner-assignment-.git
cd savings-planner
```

Or if using HTTPS:

```bash
git clone https://github.com/ayushvyasonwork/savings-planner-assignment-.git
cd savings-planner
```

### Step 2: Install Dependencies

Using **npm**:
```bash
npm install
```

Or using **yarn**:
```bash
yarn install
```

Or using **pnpm**:
```bash
pnpm install
```

Or using **bun**:
```bash
bun install
```

### Step 3: Verify Installation

Ensure all dependencies are installed correctly:
```bash
npm list
```

## Running the Project

### Development Mode

Start the development server with hot-reloading:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application for production:

```bash
npm run build
```

### Start Production Server

Run the production build:

```bash
npm start
```

This will serve the optimized production build.

### Linting

Check code quality and style issues:

```bash
npm run lint
```

## Project Structure

```
savings-planner/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout component
│   │   ├── page.tsx       # Main dashboard page
│   │   ├── providers.tsx  # Redux provider setup
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── AddContributionForm.tsx    # Form to add contributions
│   │   ├── AddGoalForm.tsx            # Form to create savings goals
│   │   ├── DashboardHeader.tsx        # Header component
│   │   ├── GoalCard.tsx               # Individual goal card display
│   │   └── ui/
│   │       └── Modal.tsx              # Reusable modal component
│   ├── lib/
│   │   └── utils.ts       # Utility functions
│   └── store/             # Redux store configuration
│       ├── index.ts       # Store setup
│       ├── hooks.ts       # Custom Redux hooks
│       └── slices/        # Redux slices
│           ├── goalsSlice.ts    # Goals state and actions
│           └── fxSlice.ts       # FX/financial state and actions
├── .eslintrc.config.mjs   # ESLint configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.mjs     # PostCSS configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies
├── package-lock.json      # Locked dependency versions
└── README.md              # Project documentation
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build application for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

## Configuration

### TypeScript Configuration

The project uses strict TypeScript settings. Check `tsconfig.json` for configuration details.

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.ts` with:
- Custom color schemes
- Responsive breakpoints
- Plugin configurations

### ESLint

Code quality is maintained using ESLint. Configuration is in `eslint.config.mjs`.

## How to Use the Application

1. **Access the Dashboard**: Open the application in your browser
2. **Create a Goal**: Click the "Add Goal" button and fill in the goal details
3. **Add Contributions**: Click on a goal card and add contributions towards that goal
4. **Track Progress**: View real-time progress updates on each goal card
5. **Manage Goals**: Edit or delete goals as needed

## Development Workflow

### Making Changes

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to the codebase

3. Test your changes:
   ```bash
   npm run dev
   ```

4. Lint your code:
   ```bash
   npm run lint
   ```

5. Commit your changes:
   ```bash
   git add .
   git commit -m "Add your commit message here"
   ```

6. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

## Troubleshooting

### Port 3000 Already in Use

If port 3000 is already in use, you can specify a different port:
```bash
npm run dev -- -p 3001
```

### Node Modules Issues

If you encounter issues with node modules:
```bash
rm -rf node_modules
npm install
```

On Windows:
```bash
rmdir /s /q node_modules
npm install
```

### Build Errors

Clear the Next.js cache and rebuild:
```bash
rm -rf .next
npm run build
```

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on the GitHub repository or contact the development team.

---

**Last Updated**: January 2026
**Version**: 0.1.0
