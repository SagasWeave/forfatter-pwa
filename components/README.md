# Components Directory

This directory contains all the React components used in the Forfatter PWA application. Components are organized into subdirectories based on their purpose and functionality.

## Directory Structure

```
components/
├── ui/                 # Reusable UI components (buttons, sheets, etc.)
├── mui/                # Material-UI components and theme integration
├── EditorLayout.tsx    # Main application layout with panels
├── FlowView.tsx        # Document tree view and editor interface
├── Header.tsx          # Application header with navigation
├── Logo.tsx            # Application logo component
├── mode-toggle.tsx     # Theme mode toggle component
├── sw-provider.tsx     # Service worker provider
└── theme-provider.tsx  # Theme provider component
```

## Design System

The application follows a comprehensive design system based on Material-UI (MUI) components with the following principles:

1. **Consistency**: All components should follow MUI design patterns
2. **Accessibility**: All components must meet WCAG 2.1 AA standards
3. **Responsiveness**: All components must work on mobile, tablet, and desktop
4. **Theme Integration**: All components must use the MUI theme provider

For detailed guidelines on component development, see:
- [Component Development Guidelines](../docs/component-guidelines.md)
- [Design System](../docs/design-system.md)
- [MUI Integration Guide](../docs/mui-integration.md)

## Component Categories

### UI Components (`/ui`)
Reusable UI components built with Radix UI and custom styling. These components are gradually being migrated to MUI equivalents.

### MUI Components (`/mui`)
New components built with Material-UI following the design system guidelines. This is the preferred approach for new component development.

### Layout Components
Core layout components that define the application structure:
- [EditorLayout.tsx](EditorLayout.tsx) - Main application container
- [FlowView.tsx](FlowView.tsx) - Document tree view and editor interface
- [Header.tsx](Header.tsx) - Application header with navigation

### Utility Components
Helper components for specific functionality:
- [Logo.tsx](Logo.tsx) - Application logo
- [mode-toggle.tsx](mode-toggle.tsx) - Theme mode toggle
- [sw-provider.tsx](sw-provider.tsx) - Service worker provider
- [theme-provider.tsx](theme-provider.tsx) - Theme provider