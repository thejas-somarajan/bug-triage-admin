export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
    TIMEOUT: 30000,
} as const

export const ENDPOINTS = {
    // Authentication
    LOGIN: '/login',
    REGISTER: '/register',

    // Dashboard
    DASHBOARD_STATS: '/dashboard/stats',
    DASHBOARD_PERFORMANCE: '/admin/dashboard/performance',
    DASHBOARD_SPRINT: '/dashboard/sprint',

    // Employees
    EMPLOYEES: '/admin/employees',
    EMPLOYEE_BY_ID: (id: number) => `/admin/employees/${id}`,
    EMPLOYEE_STATUS: (id: number) => `/admin/employees/${id}/status`,
    EMPLOYEES_FOR_TRIAGE: '/employees',

    // Issues
    ISSUES_UNASSIGNED: '/admin/issues/unassigned',
    ISSUES_ASSIGNED: '/admin/issues/assigned',
    ISSUE_ASSIGN: (id: number) => `/admin/issues/${id}/assign`,
    ISSUES_SYNC: '/admin/issues/sync',
    TRIAGE: '/triage',

    // Projects
    PROJECTS: '/projects',

    // Settings
    SETTINGS: '/admin/settings',
    PASSWORD: '/admin/password',

    // Messages
    MESSAGES: '/admin/messages',

    // Activity
    ACTIVITY: '/admin/activity',

    // Pull Requests
    PULL_REQUESTS: '/pull-requests',
} as const
