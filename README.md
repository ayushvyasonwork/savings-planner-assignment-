# Savings Planner

A web application for creating and tracking savings goals with real-time progress updates.

## Setup Instructions

### Prerequisites
- Node.js 18.17+
- npm/yarn/pnpm/bun

### Installation

```bash
# Clone repository
git clone https://github.com/ayushvyasonwork/savings-planner-assignment-.git
cd savings-planner-assignment-

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to access the app.

### Available Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Run production build
npm run lint     # Code linting
```

## Tech Stack & Design Decisions

### Framework & UI
- **Next.js 16** - Chosen for server-side rendering capabilities and optimal performance
- **React 19** - Latest React with improved hooks and component patterns
- **TypeScript** - Type safety for better developer experience and fewer bugs

### State Management
- **Redux Toolkit** - Centralized state management for goals and financial data
  - `goalsSlice.ts` - Manages savings goals state and actions
  - `fxSlice.ts` - Handles financial calculations and fx data
- Custom hooks (`useAppSelector`, `useAppDispatch`) for type-safe store access

### Styling & UI/UX
- **Tailwind CSS 4** - Utility-first CSS for rapid UI development
- **Framer Motion** - Smooth animations for better user experience
- **Lucide React** - Lightweight icon library

### Utilities
- **date-fns** - Date manipulation and formatting
- **clsx/tailwind-merge** - Conditional CSS class management

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
│   ├── AddGoalForm.tsx
│   ├── AddContributionForm.tsx
│   ├── GoalCard.tsx
│   ├── DashboardHeader.tsx
│   └── ui/Modal.tsx
├── store/            # Redux configuration
│   ├── slices/
│   │   ├── goalsSlice.ts
│   │   └── fxSlice.ts
│   ├── hooks.ts
│   └── index.ts
└── lib/              # Utilities
```

## Key Features

- Create and manage multiple savings goals
- Track contributions and progress
- Real-time dashboard with visual feedback
- Responsive design for all devices
- Type-safe Redux state management

## Development

```bash
npm run dev   # Watch mode with hot reload
npm run lint  # Check code quality
npm run build # Build for production
```

---

**Version**: 0.1.0 | **Last Updated**: January 2026
