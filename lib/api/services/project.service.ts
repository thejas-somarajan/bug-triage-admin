import { apiClient } from '../client'
import { ENDPOINTS } from '../config'
import type { Project, CreateProjectRequest, ApiResponse } from '../types'

class ProjectService {
    async getProjects(): Promise<ApiResponse<Project[]>> {
        return apiClient.get<Project[]>(ENDPOINTS.PROJECTS)
    }

    async createProject(data: CreateProjectRequest): Promise<ApiResponse<{ id: number; name: string }>> {
        return apiClient.post(ENDPOINTS.PROJECTS, data)
    }
}

export const projectService = new ProjectService()
