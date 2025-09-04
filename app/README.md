# App Directory

This directory follows Next.js 14's App Router structure and contains all the page routing and layout definitions for the Forfatter PWA application.

## Directory Structure

```
app/
├── api/                # API routes for backend functionality
│   ├── file/           # File content operations
│   └── tree/           # Document structure management
├── layout.tsx          # Root layout with providers and metadata
├── page.tsx            # Main page rendering EditorLayout
└── globals.css         # Global CSS styles
```

## Design System Integration

The app directory integrates with the MUI design system through the root layout:

### [layout.tsx](layout.tsx)
The root layout file that wraps the entire application with necessary providers:
- ThemeProvider for dark/light mode management
- MuiThemeProvider for MUI theme integration
- ServiceWorkerProvider for PWA functionality
- QueryProvider for React Query client

This file represents the strategic decision to integrate MUI theming at the application root level, ensuring consistent styling across all components.

### [page.tsx](page.tsx)
The main page that renders the [EditorLayout](../components/EditorLayout.tsx) component, which serves as the primary application interface.

### [globals.css](globals.css)
Global CSS styles that provide base styling for the application. These styles are kept minimal to avoid conflicts with MUI's styling system.

## API Routes

The [api/](api/) directory contains all backend API routes:
- [tree/](api/tree/): Manages document structure operations
- [file/](api/file/): Handles file content operations

## Design Principles

1. **Progressive Enhancement**: The application structure supports PWA capabilities
2. **Theme Integration**: MUI theme provider is integrated at the root level
3. **Performance**: Server-side rendering capabilities are leveraged through Next.js
4. **Accessibility**: Semantic HTML structure and proper metadata are maintained

## Future Development

When adding new pages or layouts:
1. Follow the existing pattern of integrating MUI theme providers
2. Maintain consistency with the overall design system
3. Ensure proper metadata and PWA support
4. Document new routes in the main [README.md](../README.md)