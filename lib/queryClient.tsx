'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState, useEffect } from 'react'
import { setQueryClient } from './api'

// Query client configuration
const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000, // 10 seconds - very responsive for real-time updates
      gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
      retry: 2,
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: true, // Enable automatic refetch on window focus
      refetchOnReconnect: true,
      refetchInterval: 15 * 1000, // Refetch every 15 seconds for real-time updates
      refetchIntervalInBackground: true // Keep polling even in background for real-time updates
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