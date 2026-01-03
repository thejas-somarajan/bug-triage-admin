import { apiClient } from '../client'
import { ENDPOINTS } from '../config'
import type { Message, SendMessageRequest, ApiResponse } from '../types'

class MessageService {
    async getMessages(): Promise<ApiResponse<Message[]>> {
        return apiClient.get<Message[]>(ENDPOINTS.MESSAGES)
    }

    async sendMessage(data: SendMessageRequest): Promise<ApiResponse<void>> {
        return apiClient.post(ENDPOINTS.MESSAGES, data)
    }
}

export const messageService = new MessageService()
