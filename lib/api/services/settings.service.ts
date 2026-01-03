import { apiClient } from '../client'
import { ENDPOINTS } from '../config'
import type { Settings, ChangePasswordRequest, ApiResponse } from '../types'

class SettingsService {
    async getSettings(): Promise<ApiResponse<Settings>> {
        return apiClient.get<Settings>(ENDPOINTS.SETTINGS)
    }

    async updateSettings(data: Settings): Promise<ApiResponse<void>> {
        return apiClient.put(ENDPOINTS.SETTINGS, data)
    }

    async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<void>> {
        return apiClient.put(ENDPOINTS.PASSWORD, data)
    }
}

export const settingsService = new SettingsService()
