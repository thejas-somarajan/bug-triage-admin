# Next.js Framework & Project Documentation

## 1. What is Next.js?

**Next.js** is a React-based framework that simplifies building full-stack web applications. It provides features like:

- **File-based Routing** — Pages are created by adding files to the `app/` directory. No manual route configuration needed.
- **Server & Client Components** — Components render on the server by default for performance; add `"use client"` at the top to make them interactive in the browser.
- **Layouts** — Shared UI (headers, sidebars) can wrap pages automatically using `layout.tsx` files.
- **API Routes** — Backend API endpoints can live alongside your frontend code.
- **Built-in Optimizations** — Automatic image optimization, font loading, code splitting, and more.

> **This project uses:** Next.js **16**, React **19**, TypeScript, and Tailwind CSS **v4**.

---

## 2. Project Folder Structure

```
Admin Management Dashboard/
│
├── app/                        # ← All pages & routes live here
│   ├── layout.tsx              # Root layout (HTML shell, fonts, metadata)
│   ├── page.tsx                # Login page (the "/" route)
│   ├── globals.css             # Global CSS styles
│   └── dashboard/              # "/dashboard" route group
│       ├── layout.tsx          # Dashboard layout (sidebar + content area)
│       ├── page.tsx            # Dashboard home page
│       ├── loading.tsx         # Loading skeleton shown during navigation
│       ├── employees/page.tsx  # "/dashboard/employees"
│       ├── issues/page.tsx     # "/dashboard/issues"
│       ├── messages/page.tsx   # "/dashboard/messages"
│       ├── projects/page.tsx   # "/dashboard/projects"
│       └── settings/page.tsx   # "/dashboard/settings"
│
├── components/                 # ← Reusable UI components
│   ├── sidebar.tsx             # Navigation sidebar
│   ├── dashboard-content.tsx   # Main dashboard view
│   ├── employees-content.tsx   # Employee management view
│   ├── issue-assignment-content.tsx  # Issue/task assignment view
│   ├── messages-content.tsx    # Messaging interface
│   ├── theme-provider.tsx      # Dark/light theme wrapper
│   ├── dialogs/                # Modal dialogs (add employee, add project, etc.)
│   └── ui/                     # 57 shadcn/ui primitives (Button, Input, Card, etc.)
│
├── lib/                        # ← Utility & API logic
│   ├── utils.ts                # Helper functions (e.g., cn() for classnames)
│   └── api/
│       ├── client.ts           # HTTP client (handles auth tokens, requests)
│       ├── config.ts           # API base URL & endpoint configuration
│       ├── types.ts            # TypeScript type definitions for API data
│       └── services/           # One service file per API domain:
│           ├── auth.service.ts
│           ├── dashboard.service.ts
│           ├── employee.service.ts
│           ├── issue.service.ts
│           ├── message.service.ts
│           ├── project.service.ts
│           ├── activity.service.ts
│           └── settings.service.ts
│
├── hooks/                      # ← Custom React hooks
│   ├── use-mobile.ts           # Detects mobile screen size
│   └── use-toast.ts            # Toast notification management
│
├── public/                     # ← Static assets (icons, images)
├── styles/                     # ← Additional stylesheets
│
├── package.json                # Dependencies & npm scripts
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── postcss.config.mjs          # PostCSS config (for Tailwind)
```

---

## 3. Key Files Explained

### `app/layout.tsx` — Root Layout
The **root layout** wraps every page in the app. It sets up:
- The `<html>` and `<body>` tags
- Google Fonts (`Geist` and `Geist Mono`)
- Global metadata (page title, favicon)
- Vercel Analytics
- Dark theme (`className="dark"`)

> Every page in the app is rendered *inside* this layout.

### `app/page.tsx` — Login Page
This is the **entry point** of the app (the `/` route). It renders a login form that:
- Takes a username and password
- Calls `authService.login()` to authenticate
- Stores the session in `localStorage`
- Redirects to `/dashboard` on success

> Marked as `"use client"` because it uses React state and browser APIs.

### `app/dashboard/layout.tsx` — Dashboard Layout
A **nested layout** that wraps all `/dashboard/*` pages. It provides:
- The **Sidebar** navigation on the left
- A scrollable content area on the right

### `app/dashboard/page.tsx` — Dashboard Home
The main dashboard view at `/dashboard`. Renders the `<DashboardContent />` component.

### `app/dashboard/loading.tsx` — Loading State
Automatically shown by Next.js while a dashboard page is loading during navigation.

---

## 4. How Next.js Routing Works (App Router)

Next.js uses **file-system based routing**. Each folder inside `app/` becomes a URL route:

| File Path                          | URL Route              |
|------------------------------------|------------------------|
| `app/page.tsx`                     | `/`                    |
| `app/dashboard/page.tsx`           | `/dashboard`           |
| `app/dashboard/employees/page.tsx` | `/dashboard/employees` |
| `app/dashboard/issues/page.tsx`    | `/dashboard/issues`    |
| `app/dashboard/messages/page.tsx`  | `/dashboard/messages`  |
| `app/dashboard/projects/page.tsx`  | `/dashboard/projects`  |
| `app/dashboard/settings/page.tsx`  | `/dashboard/settings`  |

### Special File Conventions

| File Name      | Purpose                                                  |
|----------------|----------------------------------------------------------|
| `page.tsx`     | The actual page content for a route                      |
| `layout.tsx`   | Shared wrapper UI that persists across child routes       |
| `loading.tsx`  | Loading UI shown while the page is being fetched/rendered |
| `error.tsx`    | Error boundary UI for that route (not used in this project) |

---

## 5. Server Components vs. Client Components

| Feature           | Server Component (default)        | Client Component (`"use client"`)    |
|-------------------|-----------------------------------|--------------------------------------|
| Runs on           | Server only                       | Server + Browser                     |
| Can use `useState`| ❌ No                             | ✅ Yes                               |
| Can use `onClick` | ❌ No                             | ✅ Yes                               |
| Can fetch data    | ✅ Directly with `async/await`    | ✅ Via `useEffect` or libraries       |
| Use case          | Static content, data display      | Forms, buttons, interactive elements |

> In this project, most page-level components use `"use client"` because they involve user interaction (forms, drag-and-drop, etc.).

---

## 6. Important Configuration Files

### `package.json`
Defines project dependencies and scripts:
- **`npm run dev`** — Start the development server
- **`npm run build`** — Build for production
- **`npm run start`** — Run the production build
- **Key libraries:** `recharts` (charts), `lucide-react` (icons), `sonner` (toasts), `@radix-ui/*` (accessible UI primitives), `zod` (form validation)

### `next.config.mjs`
```js
const nextConfig = {
  typescript: { ignoreBuildErrors: true },  // Skip TS errors during build
  images: { unoptimized: true },            // Disable image optimization
}
```

### `tsconfig.json`
- Sets up the `@/*` **path alias** so you can import like `@/components/sidebar` instead of `../../components/sidebar`
- Targets ES6 with strict mode enabled

### `postcss.config.mjs`
Configures PostCSS to use the Tailwind CSS plugin for utility-class processing.

---

## 7. API Layer (`lib/api/`)

The project uses a structured API layer:

1. **`client.ts`** — A centralized HTTP client that handles authentication tokens, request headers, and error handling for all API calls.
2. **`config.ts`** — Stores the API base URL and endpoint paths.
3. **`types.ts`** — TypeScript interfaces for all API request/response data shapes.
4. **`services/`** — Each file exports a service object with methods for a specific domain:

| Service File             | Responsibility                        |
|--------------------------|---------------------------------------|
| `auth.service.ts`        | Login, registration, token management |
| `dashboard.service.ts`   | Dashboard summary & statistics        |
| `employee.service.ts`    | CRUD operations for employees         |
| `issue.service.ts`       | Bug/issue tracking & assignment       |
| `message.service.ts`     | Team messaging                        |
| `project.service.ts`     | Project management                    |
| `activity.service.ts`    | Activity logs & audit trail           |
| `settings.service.ts`    | User/admin settings                   |

---

## 8. Component Architecture

### UI Primitives (`components/ui/`)
Contains **57 reusable components** from [**shadcn/ui**](https://ui.shadcn.com/) — a component library built on Radix UI. Examples include `Button`, `Input`, `Card`, `Dialog`, `Table`, `Select`, `Tabs`, and more.

### Page Content Components
These are larger components that compose the UI primitives into full page views:

| Component                         | Used In              | Description                     |
|-----------------------------------|----------------------|---------------------------------|
| `dashboard-content.tsx`           | Dashboard page       | Stats, charts, overview panels  |
| `employees-content.tsx`           | Employees page       | Employee list & management      |
| `issue-assignment-content.tsx`    | Issues page          | Sprint board & issue assignment |
| `messages-content.tsx`            | Messages page        | Chat/messaging interface        |
| `sidebar.tsx`                     | Dashboard layout     | Navigation sidebar              |

### Dialog Components (`components/dialogs/`)
Modal dialogs for actions like adding employees and creating projects.

---

## 9. How to Run the Project

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
# → http://localhost:3000
```

---

## 10. Quick Glossary

| Term              | Meaning                                                        |
|-------------------|----------------------------------------------------------------|
| **App Router**    | Next.js routing system using the `app/` directory              |
| **Layout**        | A wrapper component that persists across page navigations      |
| **"use client"**  | Directive to make a component interactive (runs in the browser)|
| **shadcn/ui**     | Copy-paste component library built on Radix UI                 |
| **Tailwind CSS**  | Utility-first CSS framework (classes like `bg-blue-500`)       |
| **TypeScript**    | JavaScript with type annotations for better code safety        |
| **Radix UI**      | Accessible, unstyled UI component primitives                   |
| **Zod**           | Schema-based data validation library                           |
