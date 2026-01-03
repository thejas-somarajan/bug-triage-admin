import { apiClient } from '../client'
import { ENDPOINTS } from '../config'
import type { Employee, CreateEmployeeRequest, ApiResponse } from '../types'

class EmployeeService {
    async getEmployees(search?: string): Promise<ApiResponse<Employee[]>> {
        return apiClient.get<Employee[]>(
            ENDPOINTS.EMPLOYEES,
            search ? { search } : undefined
        )
    }

    async getEmployee(id: number): Promise<ApiResponse<Employee>> {
        return apiClient.get<Employee>(ENDPOINTS.EMPLOYEE_BY_ID(id))
    }

    async createEmployee(data: CreateEmployeeRequest): Promise<ApiResponse<{ id: number; name: string }>> {
        return apiClient.post(ENDPOINTS.EMPLOYEES, data)
    }

    async updateStatus(
        id: number,
        status: 'online' | 'away' | 'offline' | 'in_meeting'
    ): Promise<ApiResponse<void>> {
        return apiClient.put(`${ENDPOINTS.EMPLOYEE_STATUS(id)}?status=${status}`)
    }
}

export const employeeService = new EmployeeService()
