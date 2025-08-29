/**
 * API client for Forfatter PWA
 * All API calls should go through this module
 */

import { QueryClient } from '@tanstack/react-query'

// API Base URL - will be resolved at runtime
const API_BASE = '/api'

// Global query client reference for cache invalidation
let globalQueryClient: QueryClient | null = null

/**
 * Set the global query client for cache invalidation
 */
export function setQueryClient(queryClient: QueryClient) {
  globalQueryClient = queryClient
}

/**
 * Invalidate relevant queries after mutations
 */
function invalidateQueries(keys: string[][]) {
  if (globalQueryClient) {
    keys.forEach(key => {
      globalQueryClient!.invalidateQueries({ queryKey: key })
    })
  }
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Helper function to handle JSON responses
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text()
    throw new ApiError(
      errorText || `HTTP ${response.status}: ${response.statusText}`,
      response.status,
      response
    )
  }
  
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return await response.json()
  }
  
  return await response.text() as unknown as T
}

/**
 * API client object with all endpoints
 */
export const api = {
  /**
   * Get document tree structure
   */
  async getTree() {
    const response = await fetch(`${API_BASE}/tree`, {
      cache: 'no-store'
    })
    return handleResponse(response)
  },

  /**
   * Get file content by ID
   */
  async getFile(id: string) {
    const response = await fetch(`${API_BASE}/file/${encodeURIComponent(id)}`)
    return handleResponse(response)
  },

  /**
   * Update file content
   */
  async putFile(id: string, body: string) {
    const response = await fetch(`${API_BASE}/file/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body })
    })
    const result = await handleResponse(response)
    
    // Invalidate relevant queries
    invalidateQueries([['file', id], ['tree']])
    
    return result
  },

  /**
   * Update node metadata
   */
  async putNode(node: any) {
    const response = await fetch(`${API_BASE}/node/${encodeURIComponent(node.id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(node)
    })
    const result = await handleResponse(response)
    
    // Invalidate relevant queries
    invalidateQueries([['tree'], ['file', node.id]])
    
    return result
  },

  /**
   * Create new node
   */
  async createNode(node: any) {
    const response = await fetch(`${API_BASE}/node`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(node)
    })
    const result = await handleResponse(response)
    
    // Invalidate relevant queries
    invalidateQueries([['tree']])
    
    return result
  },

  /**
   * Delete node
   */
  async deleteNode(id: string) {
    const response = await fetch(`${API_BASE}/node/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    })
    const result = await handleResponse(response)
    
    // Invalidate relevant queries
    invalidateQueries([['tree'], ['file', id]])
    
    return result
  },

  /**
   * Get chat sessions
   */
  async getChatSessions() {
    const response = await fetch(`${API_BASE}/chat/sessions`)
    return handleResponse(response)
  },

  /**
   * Get chat messages for a session
   */
  async getChatMessages(sessionId: string) {
    const response = await fetch(`${API_BASE}/chat/sessions/${encodeURIComponent(sessionId)}/messages`)
    return handleResponse(response)
  },

  /**
   * Send chat message
   */
  async sendChatMessage(sessionId: string, content: string, role: string = 'user') {
    const response = await fetch(`${API_BASE}/chat/sessions/${encodeURIComponent(sessionId)}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content, role })
    })
    return handleResponse(response)
  },

  /**
   * Search embeddings
   */
  async searchEmbeddings(query: string, limit: number = 10) {
    const response = await fetch(`${API_BASE}/search/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, limit })
    })
    return handleResponse(response)
  }
}