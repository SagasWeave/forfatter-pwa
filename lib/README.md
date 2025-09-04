# Lib Directory

This directory contains utility functions, API clients, type definitions, and other shared libraries used throughout the Forfatter PWA application.

## Directory Structure

```
lib/
├── api.ts              # API client for backend communication
├── env.ts              # Environment variable management
├── queryClient.tsx     # React Query client configuration
├── types.ts            # TypeScript type definitions
└── utils.ts            # Utility functions
```

## Design System Alignment

While this directory doesn't contain UI components, it plays a crucial role in supporting the MUI-based design system:

### [api.ts](api.ts)
The API client that handles all communication with backend services. This client supports the data requirements of MUI components and follows patterns that work well with React Query's data fetching capabilities.

### [env.ts](env.ts)
Environment variable management that supports both the existing infrastructure and new MUI-based features.

### [queryClient.tsx](queryClient.tsx)
React Query client configuration that provides efficient data fetching and caching for MUI data-driven components.

### [types.ts](types.ts)
TypeScript type definitions that ensure type safety across the application, including types for data that will be displayed in MUI components.

### [utils.ts](utils.ts)
Utility functions that support both legacy components and new MUI components.

## Design Principles

1. **Type Safety**: All functions and utilities are strongly typed with TypeScript
2. **Reusability**: Functions are designed to be reusable across different components
3. **Performance**: Utilities are optimized for performance, especially important for data processing in MUI components
4. **Consistency**: Patterns follow the overall application architecture

## Future Development

When adding new utilities or modifying existing ones:
1. Ensure compatibility with both existing Radix UI components and new MUI components
2. Maintain strong TypeScript typing
3. Follow functional programming principles where appropriate
4. Document new utilities in the main [README.md](../README.md)