# Admin Management Dashboard - Project Documentation

**Version**: 1.0.0  
**Framework**: Next.js 16.0.10  
**Last Updated**: January 2026

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Next.js Framework Basics](#nextjs-framework-basics)
3. [Project Structure](#project-structure)
4. [Important Files & Directories](#important-files--directories)
5. [Technology Stack](#technology-stack)
6. [Getting Started](#getting-started)
7. [Key Features](#key-features)

---

## Project Overview

The **Admin Management Dashboard** is a modern web application built with Next.js that provides an administrative interface for managing employees, projects, issues, and team communications. It integrates with a backend API to handle bug triage, employee management, and project tracking.

### Purpose
- Manage employee information and assignments
- Track and assign GitHub issues to team members
- Monitor project progress and team performance
- Facilitate team communication through messaging
- Provide real-time dashboard analytics

---

## Next.js Framework Basics

### What is Next.js?

Next.js is a **React-based framework** that provides a complete solution for building modern web applications. It extends React with powerful features like server-side rendering, routing, and optimization.

### Key Concepts Used in This Project

#### 1. **App Router** (Next.js 13+)
This project uses the modern **App Router** architecture, which organizes pages using the `app/` directory structure.

```
app/
├── page.tsx          → Home page (/)
├── layout.tsx        → Root layout wrapper
└── dashboard/
    └── page.tsx      → Dashboard page (/dashboard)
```

- **`page.tsx`**: Defines a route's UI
- **`layout.tsx`**: Wraps pages with shared UI (navbar, sidebar, etc.)
- **`loading.tsx`**: Shows loading states automatically

#### 2. **File-Based Routing**
Routes are created automatically based on folder structure:

| File Path | URL Route |
|-----------|-----------|
| `app/page.tsx` | `/` |
| `app/dashboard/page.tsx` | `/dashboard` |
| `app/dashboard/employees/page.tsx` | `/dashboard/employees` |
| `app/dashboard/projects/page.tsx` | `/dashboard/projects` |

#### 3. **Server vs Client Components**

**Server Components** (default):
- Render on the server
- Can directly access databases/APIs
- Better performance, smaller bundle size

**Client Components** (with `"use client"`):
- Render in the browser
- Can use React hooks (useState, useEffect)
- Handle user interactions

```tsx
"use client"  // This makes it a Client Component

import { useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  // ... interactive logic
}
```

#### 4. **Built-in Optimizations**
- **Automatic code splitting**: Only loads code needed for each page
- **Image optimization**: `next/image` component optimizes images
- **Font optimization**: Automatically optimizes Google Fonts
- **Fast Refresh**: Instant feedback during development

---

## Project Structure

```
Admin Management Dashboard/
│
├── app/                          # Application routes (App Router)
│   ├── layout.tsx               # Root layout with global styles
│   ├── page.tsx                 # Login page (/)
│   ├── globals.css              # Global CSS styles
│   └── dashboard/               # Dashboard section
│       ├── layout.tsx           # Dashboard layout with sidebar
│       ├── page.tsx             # Main dashboard (/dashboard)
│       ├── employees/           # Employee management
│       ├── issues/              # Issue tracking
│       ├── messages/            # Team messaging
│       ├── projects/            # Project management
│       └── settings/            # User settings
│
├── components/                   # Reusable React components
│   ├── ui/                      # Shadcn UI components (57 files)
│   ├── dialogs/                 # Modal dialogs
│   ├── sidebar.tsx              # Navigation sidebar
│   ├── dashboard-content.tsx    # Dashboard main content
│   ├── employees-content.tsx    # Employee list view
│   ├── issue-assignment-content.tsx  # Issue assignment UI
│   └── messages-content.tsx     # Messaging interface
│
├── lib/                         # Utility libraries
│   ├── api/                     # API integration layer
│   │   ├── client.ts           # HTTP client wrapper
│   │   ├── config.ts           # API endpoints configuration
│   │   ├── types.ts            # TypeScript type definitions
│   │   └── services/           # API service modules
│   │       ├── auth.service.ts
│   │       ├── employee.service.ts
│   │       ├── project.service.ts
│   │       └── ...
│   └── utils.ts                # Helper functions
│
├── hooks/                       # Custom React hooks
│   ├── use-mobile.ts           # Mobile detection hook
│   └── use-toast.ts            # Toast notification hook
│
├── public/                      # Static assets
│   ├── icon.svg                # App icon
│   └── placeholder-*.png       # Placeholder images
│
├── styles/                      # Additional stylesheets
│   └── globals.css
│
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── package.json                # Dependencies & scripts
├── components.json             # Shadcn UI configuration
└── API_DOCUMENTATION.md        # Backend API reference
```

---

## Important Files & Directories

### 1. **`package.json`**
Defines project dependencies and scripts.

**Key Scripts:**
```json
{
  "scripts": {
    "dev": "next dev",        // Start development server
    "build": "next build",    // Build for production
    "start": "next start",    // Start production server
    "lint": "eslint ."        // Run code linting
  }
}
```

**Major Dependencies:**
- **`next`** (16.0.10): The Next.js framework
- **`react`** (19.2.0): UI library
- **`typescript`**: Type safety
- **`tailwindcss`**: Utility-first CSS framework
- **`@radix-ui/*`**: Accessible UI components
- **`lucide-react`**: Icon library
- **`recharts`**: Chart library for analytics
- **`zod`**: Schema validation
- **`react-hook-form`**: Form management

### 2. **`next.config.mjs`**
Configures Next.js behavior.

```javascript
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,  // Allows build with TS errors (dev only)
  },
  images: {
    unoptimized: true,        // Disables image optimization
  },
}
```

### 3. **`tsconfig.json`**
TypeScript compiler configuration.

**Important Settings:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]  // Enables "@/" imports (e.g., @/components/ui/button)
    },
    "jsx": "react-jsx",  // JSX transformation mode
    "strict": true       // Strict type checking
  }
}
```

### 4. **`app/layout.tsx`** (Root Layout)
Wraps all pages with shared structure.

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-[#0f172a]">
        {children}
        <Analytics />  // Vercel Analytics integration
      </body>
    </html>
  )
}
```

**Features:**
- Sets dark mode globally
- Loads Google Fonts (Geist, Geist Mono)
- Includes Vercel Analytics
- Defines metadata (title, icons)

### 5. **`app/page.tsx`** (Login Page)
The application entry point at `/`.

**Key Features:**
- Client component (`"use client"`)
- Form state management with React hooks
- Authentication via `authService.login()`
- Password visibility toggle
- Error handling and loading states
- Redirects to `/dashboard` on success

### 6. **`app/dashboard/layout.tsx`** (Dashboard Layout)
Wraps all dashboard pages with sidebar navigation.

```tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
```

### 7. **`lib/api/config.ts`** (API Configuration)
Centralized API endpoint definitions.

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  TIMEOUT: 30000,
}

export const ENDPOINTS = {
  LOGIN: '/login',
  EMPLOYEES: '/admin/employees',
  PROJECTS: '/projects',
  // ... all endpoints
}
```

**Environment Variable:**
- `NEXT_PUBLIC_API_BASE_URL`: Set in `.env.local` to change API server

### 8. **`lib/api/client.ts`** (HTTP Client)
Wrapper around `fetch()` for API calls.

**Features:**
- Automatic JWT token attachment
- Request/response interceptors
- Error handling
- TypeScript type safety
- Timeout management

### 9. **`lib/api/services/`** (API Services)
Organized API calls by feature:

- **`auth.service.ts`**: Login, register, logout
- **`employee.service.ts`**: Employee CRUD operations
- **`project.service.ts`**: Project management
- **`issue.service.ts`**: Issue tracking
- **`dashboard.service.ts`**: Analytics data

**Example Usage:**
```typescript
import { employeeService } from '@/lib/api/services/employee.service'

const employees = await employeeService.getAll()
```

### 10. **`components/ui/`** (Shadcn UI Components)
Pre-built, accessible UI components (57 components):

- `button.tsx`, `input.tsx`, `card.tsx`
- `dialog.tsx`, `dropdown-menu.tsx`, `select.tsx`
- `table.tsx`, `tabs.tsx`, `toast.tsx`
- And many more...

**Customizable** via Tailwind CSS classes.

### 11. **`components.json`** (Shadcn Configuration)
Defines how Shadcn UI components are generated.

```json
{
  "style": "new-york",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### 12. **`app/globals.css`** (Global Styles)
Contains:
- Tailwind CSS imports
- CSS custom properties for theming
- Dark mode color variables
- Global utility classes

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... theme colors */
  }
}
```

---

## Technology Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first styling
- **Shadcn UI**: Accessible component library
- **Radix UI**: Headless UI primitives
- **Lucide React**: Icon library
- **Recharts**: Data visualization

### Forms & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Form validation integration

### State Management
- React hooks (useState, useEffect)
- Local storage for session persistence

### API Integration
- Custom HTTP client (`lib/api/client.ts`)
- JWT authentication
- RESTful API communication

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

---

## Getting Started

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **pnpm** package manager
- Backend API running (see `API_DOCUMENTATION.md`)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Configure environment:**
   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

### Default Login Credentials
- **Username**: `admin`
- **Password**: `admin123`

---

## Key Features

### 1. **Authentication System**
- JWT-based authentication
- Secure login/logout
- Token storage in localStorage
- Protected routes

### 2. **Dashboard Analytics**
- Real-time team performance metrics
- Issue tracking statistics
- Project progress visualization
- Activity feed

### 3. **Employee Management**
- Add/edit/delete employees
- Track employee workload
- Monitor online status
- View specializations and skills

### 4. **Issue Assignment**
- AI-powered bug triage
- Manual issue assignment
- GitHub integration
- Priority-based sorting

### 5. **Project Tracking**
- Link GitHub repositories
- Monitor project status
- Track deadlines
- Progress indicators

### 6. **Team Messaging**
- Send messages to employees
- Message history
- Subject and content formatting

### 7. **Settings Management**
- Notification preferences
- Password change
- User profile settings

---

## Next.js Routing in This Project

### Route Structure

```
/                           → Login Page (app/page.tsx)
/dashboard                  → Main Dashboard (app/dashboard/page.tsx)
/dashboard/employees        → Employee List (app/dashboard/employees/page.tsx)
/dashboard/issues           → Issue Tracking (app/dashboard/issues/page.tsx)
/dashboard/messages         → Messaging (app/dashboard/messages/page.tsx)
/dashboard/projects         → Projects (app/dashboard/projects/page.tsx)
/dashboard/settings         → Settings (app/dashboard/settings/page.tsx)
```

### Navigation
The `components/sidebar.tsx` component handles navigation using Next.js `Link` component:

```tsx
import Link from 'next/link'

<Link href="/dashboard/employees">
  Employees
</Link>
```

### Programmatic Navigation
Using `useRouter` hook:

```tsx
import { useRouter } from 'next/navigation'

const router = useRouter()
router.push('/dashboard')  // Navigate to dashboard
```

---

## API Integration Pattern

### 1. **Define Endpoint** (`lib/api/config.ts`)
```typescript
export const ENDPOINTS = {
  EMPLOYEES: '/admin/employees',
}
```

### 2. **Create Service** (`lib/api/services/employee.service.ts`)
```typescript
export const employeeService = {
  async getAll() {
    return apiClient.get<Employee[]>(ENDPOINTS.EMPLOYEES)
  },
}
```

### 3. **Use in Component**
```tsx
"use client"

import { employeeService } from '@/lib/api/services/employee.service'

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    employeeService.getAll().then(response => {
      if (response.data) setEmployees(response.data)
    })
  }, [])

  return <div>{/* Render employees */}</div>
}
```

---

## Best Practices Used

1. **TypeScript**: Full type safety across the project
2. **Component Organization**: Separation of UI, business logic, and API calls
3. **Reusable Components**: Shadcn UI component library
4. **Centralized API**: Single source of truth for endpoints
5. **Error Handling**: Consistent error handling across API calls
6. **Loading States**: User feedback during async operations
7. **Responsive Design**: Mobile-first Tailwind CSS approach
8. **Dark Mode**: Consistent dark theme throughout

---

## Additional Resources

- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **React Documentation**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Shadcn UI**: [ui.shadcn.com](https://ui.shadcn.com)
- **Backend API**: See `API_DOCUMENTATION.md` in this directory

---

## Troubleshooting

### Common Issues

**1. API Connection Failed**
- Ensure backend server is running on port 8000
- Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`

**2. Build Errors**
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors with `npm run lint`

**3. Authentication Issues**
- Clear localStorage: `localStorage.clear()`
- Verify backend `/login` endpoint is working

**4. Port Already in Use**
- Change port: `npm run dev -- -p 3001`

---

*For backend API documentation, refer to `API_DOCUMENTATION.md`*
