/**
 * Environment configuration
 * All environment variables should be defined here
 */

// API Base URL - defaults to /api for same-origin requests
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '/api'

// WebSocket URL for real-time features
export const WS_BASE = process.env.NEXT_PUBLIC_WS_BASE ?? 'ws://localhost:3001'

// Development mode check
export const IS_DEV = process.env.NODE_ENV === 'development'

// Enable debug logging
export const DEBUG = process.env.NEXT_PUBLIC_DEBUG === 'true' || IS_DEV

// PWA configuration
export const PWA_CONFIG = {
  name: 'Forfatter',
  shortName: 'Forfatter',
  description: 'Forfatter PWA - Skriveværktøj til forfattere',
  themeColor: '#111111',
  backgroundColor: '#111111'
} as const

// Query client configuration
export const QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  retry: 2,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000)
} as const

// Editor configuration
export const EDITOR_CONFIG = {
  autosaveDelay: 250, // ms
  placeholder: 'Begynd at skrive...',
  maxLength: 100000 // characters
} as const