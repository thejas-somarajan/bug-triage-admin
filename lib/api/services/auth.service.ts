import { apiClient } from '../client'
import { ENDPOINTS } from '../config'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ApiResponse } from '../types'

class AuthService {
    async login(username: string, password: string): Promise<ApiResponse<LoginResponse>> {
        const response = await apiClient.post<LoginResponse>(
            ENDPOINTS.LOGIN,
            { username, password },
            true // Use form-data
        )

        if (response.data && response.data.access_token) {
            this.setToken(response.data.access_token)
        }

        return response
    }

    async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
        return apiClient.post<RegisterResponse>(ENDPOINTS.REGISTER, data)
    }

    logout(): void {
        this.removeToken()
        if (typeof window !== 'undefined') {
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('userEmail')
        }
    }

    getToken(): string | null {
        if (typeof window === 'undefined') return null
        return localStorage.getItem('access_token')
    }

    setToken(token: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', token)
        }
    }

    removeToken(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token')
        }
    }

    isAuthenticated(): boolean {
        return !!this.getToken()
    }
}

export const authService = new AuthService()
