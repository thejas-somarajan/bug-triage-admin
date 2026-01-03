import { apiClient } from '../client'
import { ENDPOINTS } from '../config'
import type {
    Issue,
    AssignedIssue,
    TriageRequest,
    TriageResult,
    EmployeeForTriage,
    ApiResponse,
} from '../types'

class IssueService {
    async getUnassignedIssues(): Promise<ApiResponse<Issue[]>> {
        return apiClient.get<Issue[]>(ENDPOINTS.ISSUES_UNASSIGNED)
    }

    async getAssignedIssues(): Promise<ApiResponse<AssignedIssue[]>> {
        return apiClient.get<AssignedIssue[]>(ENDPOINTS.ISSUES_ASSIGNED)
    }

    async assignIssue(issueId: number, employeeId: number): Promise<ApiResponse<void>> {
        return apiClient.post(ENDPOINTS.ISSUE_ASSIGN(issueId), null, false)
            .then(response => {
                // Add employee_id as query param
                return apiClient.post(
                    `${ENDPOINTS.ISSUE_ASSIGN(issueId)}?employee_id=${employeeId}`,
                    null,
                    false
                )
            })
    }

    async syncIssues(projectId: number): Promise<ApiResponse<{ synced: number }>> {
        return apiClient.post(
            `${ENDPOINTS.ISSUES_SYNC}?project_id=${projectId}`,
            null,
            false
        )
    }

    async triageIssues(data: TriageRequest): Promise<ApiResponse<TriageResult[]>> {
        return apiClient.post<TriageResult[]>(ENDPOINTS.TRIAGE, data)
    }

    async getEmployeesForTriage(): Promise<ApiResponse<EmployeeForTriage[]>> {
        return apiClient.get<EmployeeForTriage[]>(ENDPOINTS.EMPLOYEES_FOR_TRIAGE)
    }
}

export const issueService = new IssueService()
