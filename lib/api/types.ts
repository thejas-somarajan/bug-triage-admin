// Standard API Response Format
export interface ApiResponse<T = any> {
    message: string
    data: T | null
    error: ApiError | null
}

export interface ApiError {
    code: number
    type: string
    description: string
}

// Authentication Types
export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    access_token: string
    token_type: string
}

export interface RegisterRequest {
    username: string
    email: string
    password: string
    role: 'user' | 'admin'
}

export interface RegisterResponse {
    username: string
    role: string
}

// Employee Types
export interface Employee {
    id: number
    name: string
    email: string
    role_title: string
    department: string
    status: 'online' | 'away' | 'offline' | 'in_meeting'
    efficiency_score: number
    workload: number
    specializations: string[]
    avatar_color: string
    experience_level?: 'junior' | 'mid' | 'senior'
}

export interface CreateEmployeeRequest {
    name: string
    email: string
    role_title: string
    department: string
    specializations: string[]
    avatar_color: string
}

export interface EmployeeForTriage {
    id: string
    name: string
    experience_level: string
    specializations: string[]
}

// Issue Types
export interface Issue {
    id: number
    github_issue_number: number
    title: string
    body?: string
    url?: string
    labels: string[]
    priority: 'CRITICAL' | 'MAJOR' | 'MINOR' | 'TRIVIAL'
    severity?: string
    status?: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE'
    created_at: string
    assignee?: number
}

export interface AssignedIssue {
    employee: {
        id: number
        name: string
        workload: number
    }
    issues: Issue[]
}

export interface TriageRequest {
    owner: string
    repo: string
    token?: string
    limit: number
}

export interface TriageResult {
    issue: {
        id: number
        title: string
        body: string
        url: string
        labels: string[]
        severity: string
        assignee: number | null
    }
    assigned_to: EmployeeForTriage
    reason: string
}

// Project Types
export interface Project {
    id: number
    name: string
    description?: string
    github_owner: string
    github_repo: string
    status: 'ON TRACK' | 'AT RISK' | 'DELAYED'
    progress: number
    deadline: string
    created_at: string
}

export interface CreateProjectRequest {
    name: string
    description?: string
    github_owner: string
    github_repo: string
    status: 'ON TRACK' | 'AT RISK' | 'DELAYED'
    progress: number
    deadline: string
}

// Dashboard Types
export interface DashboardStats {
    open_issues: number
    pull_requests: number
    code_review: number
    efficiency: string
}

export interface DashboardPerformance {
    total_active_issues: number
    team_velocity: number
    avg_response_time: string
    team_satisfaction: number
    weekly_completed: number[]
    weekly_target: number[]
}

export interface SprintBoard {
    todo: Issue[]
    doing: Issue[]
    done: Issue[]
}

// Settings Types
export interface Settings {
    email_notifications: boolean
    task_notifications: boolean
    team_notifications: boolean
}

export interface ChangePasswordRequest {
    current_password: string
    new_password: string
}

// Message Types
export interface Message {
    id: number
    recipient_id: number
    subject: string
    content: string
    created_at: string
    sender_name?: string
    recipient_name?: string
}

export interface SendMessageRequest {
    recipient_id: number
    subject: string
    content: string
}

// Activity Types
export interface Activity {
    actor_name: string
    action: string
    target: string
    target_type: string
    created_at: string
}

// Pull Request Types
export interface PullRequest {
    id: number
    number: number
    title: string
    state: string
    url: string
    created_at: string
    author?: string
}
