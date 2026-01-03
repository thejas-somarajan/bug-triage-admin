import { API_CONFIG } from './config'
import type { ApiResponse } from './types'

class ApiClient {
    private baseURL: string
    private timeout: number

    constructor() {
        this.baseURL = API_CONFIG.BASE_URL
        this.timeout = API_CONFIG.TIMEOUT
    }

    private getToken(): string | null {
        if (typeof window === 'undefined') return null
        return localStorage.getItem('access_token')
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const token = this.getToken()

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        }

        // Merge with any existing headers
        if (options.headers) {
            Object.assign(headers, options.headers)
        }

        if (token && !endpoint.includes('/login') && !endpoint.includes('/register')) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), this.timeout)

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers,
                signal: controller.signal,
            })

            clearTimeout(timeoutId)

            // Handle non-JSON responses (like login which returns direct token)
            const contentType = response.headers.get('content-type')
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json()

                if (!response.ok) {
                    // API error response
                    return {
                        message: data.message || 'An error occurred',
                        data: null,
                        error: data.error || {
                            code: response.status,
                            type: 'HTTP_ERROR',
                            description: data.message || response.statusText,
                        },
                    }
                }

                // Check if response is already in ApiResponse format
                if ('message' in data && 'data' in data) {
                    return data
                }

                // Wrap raw data in ApiResponse format
                return {
                    message: 'Success',
                    data: data,
                    error: null,
                }
            } else {
                // Non-JSON response
                const text = await response.text()
                if (!response.ok) {
                    return {
                        message: text || 'An error occurred',
                        data: null,
                        error: {
                            code: response.status,
                            type: 'HTTP_ERROR',
                            description: text || response.statusText,
                        },
                    }
                }
                return {
                    message: 'Success',
                    data: text as any,
                    error: null,
                }
            }
        } catch (error: any) {
            clearTimeout(timeoutId)

            if (error.name === 'AbortError') {
                return {
                    message: 'Request timeout',
                    data: null,
                    error: {
                        code: 408,
                        type: 'TIMEOUT_ERROR',
                        description: 'The request took too long to complete',
                    },
                }
            }

            return {
                message: error.message || 'Network error',
                data: null,
                error: {
                    code: 0,
                    type: 'NETWORK_ERROR',
                    description: error.message || 'Failed to connect to the server',
                },
            }
        }
    }

    async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
        let url = endpoint
        if (params) {
            const searchParams = new URLSearchParams()
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value))
                }
            })
            const queryString = searchParams.toString()
            if (queryString) {
                url += `?${queryString}`
            }
        }
        return this.request<T>(url, { method: 'GET' })
    }

    async post<T>(endpoint: string, data?: any, isFormData = false): Promise<ApiResponse<T>> {
        const options: RequestInit = {
            method: 'POST',
        }

        if (isFormData) {
            // For URL-encoded form data (like OAuth2 login)
            const formBody = new URLSearchParams()
            Object.entries(data || {}).forEach(([key, value]) => {
                formBody.append(key, String(value))
            })
            options.body = formBody.toString()
            // Set Content-Type for URL-encoded form data
            options.headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        } else {
            options.body = JSON.stringify(data)
        }

        return this.request<T>(endpoint, options)
    }

    async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'DELETE' })
    }
}

export const apiClient = new ApiClient()
