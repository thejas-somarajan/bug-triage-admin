# Bug Triage API - Complete Documentation

**Version**: 1.3.0  
**Base URL**: `http://localhost:8001`  
**Authentication**: JWT Bearer Token

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Bug Triage](#2-bug-triage)
3. [Projects](#3-projects)
4. [Dashboard](#4-dashboard)
5. [Admin Portal - Employees](#5-admin-portal---employees)
6. [Admin Portal - Issues](#6-admin-portal---issues)
7. [Admin Portal - Settings](#7-admin-portal---settings)
8. [Admin Portal - Messages](#8-admin-portal---messages)
9. [Admin Portal - Activity](#9-admin-portal---activity)
10. [Error Handling](#10-error-handling)

---

## Standard Response Format

All endpoints return this structure:
```json
{
  "message": "Human-readable message",
  "data": { ... },
  "error": null | { "code": 400, "type": "ERROR_TYPE", "description": "..." }
}
```

---

## 1. Authentication

### POST `/register`
Create a new user account.

**Access**: Public

**Request Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "user"  // "user" or "admin"
}
```

**Response** (200):
```json
{
  "message": "User registered successfully as user.",
  "data": {
    "username": "johndoe",
    "role": "user"
  },
  "error": null
}
```

**Errors**:
- `400`: Username already registered
- `400`: Invalid role

---

### POST `/login`
Get JWT access token.

**Access**: Public

**Request** (form-data):
| Field | Type | Required |
|-------|------|----------|
| username | string | Yes |
| password | string | Yes |

**Response** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Usage**: Add to all protected requests:
```
Authorization: Bearer <access_token>
```

---

## 2. Bug Triage

### GET `/employees`
List employees available for issue assignment.

**Access**: Authenticated

**Response**:
```json
{
  "message": "Employees retrieved successfully.",
  "data": [
    {
      "id": "1",
      "name": "Alice Smith",
      "experience_level": "senior",
      "specializations": ["Backend", "Python", "Security"]
    }
  ]
}
```

---

### POST `/triage`
**Main Feature**: Fetch issues from GitHub, classify severity using AI, assign to employees, and save to database.

**Access**: Authenticated

**Request Body**:
```json
{
  "owner": "facebook",
  "repo": "react",
  "token": "ghp_xxx...",  // Optional: GitHub token for private repos
  "limit": 5              // Max issues to process
}
```

**Response**:
```json
{
  "message": "Issues triaged successfully. 3 new assignments saved to database.",
  "data": [
    {
      "issue": {
        "id": 12345,
        "title": "Memory leak in useState",
        "body": "When using...",
        "url": "https://github.com/...",
        "labels": ["bug"],
        "severity": "critical",
        "assignee": null
      },
      "assigned_to": {
        "id": "2",
        "name": "Bob Johnson",
        "experience_level": "senior",
        "specializations": ["Frontend", "React"]
      },
      "reason": "Severity: critical (ML), Best Skill Match: React (0.89)"
    }
  ]
}
```

**What Happens**:
1. Fetches open issues from GitHub
2. AI classifies severity (critical/major/minor/trivial)
3. Matches against employee skills
4. Saves assignments to database
5. Updates employee workload

**Prerequisites**:
- At least one employee must exist (`POST /admin/employees`)
- Repository must have actual Issues (not just PRs)

---

## 3. Projects

### POST `/projects`
Link a GitHub repository to track.

**Access**: Admin Only

**Request Body**:
```json
{
  "name": "React Framework",
  "description": "Main frontend library",
  "github_owner": "facebook",
  "github_repo": "react",
  "status": "ON TRACK",
  "progress": 45,
  "deadline": "2024-12-31T23:59:59"
}
```

**Response**:
```json
{
  "message": "Project linked successfully.",
  "data": {
    "id": 1,
    "name": "React Framework"
  }
}
```

---

### GET `/projects`
List all linked projects.

**Access**: Authenticated

**Response**:
```json
{
  "message": "Projects retrieved.",
  "data": [
    {
      "id": 1,
      "name": "React Framework",
      "github_owner": "facebook",
      "github_repo": "react",
      "status": "ON TRACK",
      "progress": 45,
      "deadline": "2024-12-31T23:59:59",
      "created_at": "2024-01-15T10:30:00"
    }
  ]
}
```

---

## 4. Dashboard

### GET `/dashboard/stats`
Get aggregated metrics from GitHub.

**Access**: Authenticated

**Response**:
```json
{
  "message": "Dashboard stats retrieved.",
  "data": {
    "open_issues": 42,
    "pull_requests": 15,
    "code_review": 3,
    "efficiency": "94%"
  }
}
```

---

### GET `/dashboard/sprint`
Get issues organized by status.

**Access**: Authenticated

**Query Parameters**:
| Param | Type | Description |
|-------|------|-------------|
| project_id | int | Optional filter |

**Response**:
```json
{
  "message": "Sprint board retrieved.",
  "data": {
    "todo": [...],
    "doing": [...],
    "done": [...]
  }
}
```

---

### GET `/pull-requests`
List open PRs from all projects.

**Access**: Authenticated

---

## 5. Admin Portal - Employees

### GET `/admin/employees`
Full employee list with details.

**Access**: Admin Only

**Query**: `?search=alice`

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Alice Smith",
      "email": "alice@company.com",
      "role_title": "Senior Developer",
      "department": "Engineering",
      "status": "online",
      "efficiency_score": 92.5,
      "workload": 75,
      "specializations": ["Backend", "Python"],
      "avatar_color": "#4F46E5"
    }
  ]
}
```

---

### POST `/admin/employees`
Add new employee.

**Access**: Admin Only

**Request Body**:
```json
{
  "name": "Alice Smith",
  "email": "alice@company.com",
  "role_title": "Senior Developer",
  "department": "Engineering",
  "specializations": ["Backend", "Python", "Security"],
  "avatar_color": "#4F46E5"
}
```

---

### GET `/admin/employees/{id}`
Get single employee details.

---

### PUT `/admin/employees/{id}/status`
Update employee status.

**Query**: `?status=online|away|offline|in_meeting`

---

## 6. Admin Portal - Issues

### GET `/admin/issues/unassigned`
Get issues pending assignment.

**Access**: Admin Only

**Response**:
```json
{
  "data": [
    {
      "id": 1,
      "github_issue_number": 12345,
      "title": "Fix login bug",
      "labels": ["bug", "security"],
      "priority": "CRITICAL",
      "created_at": "2024-01-15T10:30:00"
    }
  ]
}
```

---

### GET `/admin/issues/assigned`
Get issues grouped by employee.

**Response**:
```json
{
  "data": [
    {
      "employee": {
        "id": 1,
        "name": "Alice Smith",
        "workload": 75
      },
      "issues": [
        {
          "id": 1,
          "title": "Fix login bug",
          "status": "IN_PROGRESS"
        }
      ]
    }
  ]
}
```

---

### POST `/admin/issues/{id}/assign`
Manually assign issue to employee.

**Query**: `?employee_id=2`

---

### POST `/admin/issues/sync`
Import issues from GitHub project.

**Query**: `?project_id=1`

**Response**:
```json
{
  "message": "Synced 5 new issues from GitHub.",
  "data": { "synced": 5 }
}
```

---

## 7. Admin Portal - Settings

### GET `/admin/settings`
Get notification preferences.

**Response**:
```json
{
  "data": {
    "email_notifications": true,
    "task_notifications": true,
    "team_notifications": false
  }
}
```

---

### PUT `/admin/settings`
Update preferences.

**Request**:
```json
{
  "email_notifications": true,
  "task_notifications": false,
  "team_notifications": true
}
```

---

### PUT `/admin/password`
Change password.

**Request**:
```json
{
  "current_password": "oldpass123",
  "new_password": "newpass456"
}
```

---

## 8. Admin Portal - Messages

### GET `/admin/messages`
List sent messages.

---

### POST `/admin/messages`
Send message to employee.

**Request**:
```json
{
  "recipient_id": 1,
  "subject": "Code Review Request",
  "content": "Please review PR #123"
}
```

---

## 9. Admin Portal - Activity

### GET `/admin/activity`
Get activity feed.

**Query**: `?limit=10`

**Response**:
```json
{
  "data": [
    {
      "actor_name": "admin",
      "action": "assigned issue to",
      "target": "Alice Smith",
      "target_type": "assignment",
      "created_at": "2024-01-15T10:30:00"
    }
  ]
}
```

---

### GET `/admin/dashboard/performance`
Get team performance metrics.

**Response**:
```json
{
  "data": {
    "total_active_issues": 12,
    "team_velocity": 80,
    "avg_response_time": "4h 20m",
    "team_satisfaction": 4.2,
    "weekly_completed": [5, 5, 5, 5, 5, 5, 5],
    "weekly_target": [10, 10, 10, 10, 10, 10, 10]
  }
}
```

---

## 10. Error Handling

### Error Response Format
```json
{
  "message": "Username already registered",
  "data": null,
  "error": {
    "code": 400,
    "type": "HTTP_ERROR",
    "description": "Username already registered"
  }
}
```

### Common Error Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 400 | Bad Request | Validation failed, duplicate entry |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Admin-only endpoint |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal failure |

---

## Quick Start Workflow

1. **Login** → `POST /login` (admin/admin123)
2. **Add Employee** → `POST /admin/employees`
3. **Triage Issues** → `POST /triage` with GitHub repo
4. **View Assignments** → `GET /admin/issues/assigned`
5. **Check Dashboard** → `GET /admin/dashboard/performance`

---

*Last Updated: 2026-01-03*
