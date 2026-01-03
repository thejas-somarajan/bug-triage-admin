import { apiClient } from '../client'
import { ENDPOINTS } from '../config'
import type { DashboardStats, DashboardPerformance, SprintBoard, ApiResponse } from '../types'

class DashboardService {
    async getStats(): Promise<ApiResponse<DashboardStats>> {
        return apiClient.get<DashboardStats>(ENDPOINTS.DASHBOARD_STATS)
    }

    async getPerformance(): Promise<ApiResponse<DashboardPerformance>> {
        return apiClient.get<DashboardPerformance>(ENDPOINTS.DASHBOARD_PERFORMANCE)
    }

    async getSprintBoard(projectId?: number): Promise<ApiResponse<SprintBoard>> {
        return apiClient.get<SprintBoard>(
            ENDPOINTS.DASHBOARD_SPRINT,
            projectId ? { project_id: projectId } : undefined
        )
    }
}

export const dashboardService = new DashboardService()
