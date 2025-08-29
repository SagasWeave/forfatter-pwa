'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState, useEffect } from 'react'
import { setQueryClient } from './api'

// Query client configuration
const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // refetchInterval: 1000 * 15, // 15 seconds
      // refetchIntervalInBackground: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000
    }
  }
}

/**
 * React Query Provider component
 * Provides TanStack Query client to the entire app
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  // Create query client instance - useState ensures it's only created once
  const [queryClient] = useState(() => new QueryClient(queryConfig))

  // Register query client with API for cache invalidation
  useEffect(() => {
    setQueryClient(queryClient)
  }, [queryClient])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

/**
 * Create a new query client instance
 * Useful for server-side rendering or testing
 */
export function createQueryClient() {
  return new QueryClient(queryConfig)
}