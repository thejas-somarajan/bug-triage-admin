import { apiClient } from '../client'
import { ENDPOINTS } from '../config'
import type { Activity, ApiResponse } from '../types'

class ActivityService {
    async getActivity(limit?: number): Promise<ApiResponse<Activity[]>> {
        return apiClient.get<Activity[]>(
            ENDPOINTS.ACTIVITY,
            limit ? { limit } : undefined
        )
    }
}

export const activityService = new ActivityService()
