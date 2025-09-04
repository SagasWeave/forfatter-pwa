# MUI Components Directory

This directory contains components and utilities related to Material-UI (MUI) integration in the Forfatter PWA application.

## Purpose

This directory was created as part of the strategic decision to migrate from Radix UI to Material-UI components for enhanced UI/UX. The migration follows an incremental approach to ensure stability and maintainability.

## Components

### [MuiThemeProvider.tsx](MuiThemeProvider.tsx)
The MUI theme provider component that integrates with the existing Next.js theme system. This component ensures that MUI components respect the application's dark/light theme settings.

### [MuiButtonExample.tsx](MuiButtonExample.tsx)
An example MUI button component demonstrating the usage pattern for MUI components in the application.

## Design System Integration

All components in this directory should follow the design system guidelines:
- Use MUI components from '@mui/material'
- Reference theme values (theme.spacing, theme.palette, etc.)
- Follow the established color palette and typography
- Maintain accessibility standards (WCAG 2.1 AA)
- Ensure responsive design using MUI breakpoints

For detailed guidelines, see:
- [Component Development Guidelines](../../docs/component-guidelines.md)
- [Design System](../../docs/design-system.md)
- [MUI Integration Guide](../../docs/mui-integration.md)

## Migration Strategy

The migration from Radix UI to MUI follows these principles:
1. **Incremental Development**: Changes are implemented in small, manageable steps
2. **Component-by-Component Migration**: Existing Radix UI components are gradually enhanced or replaced with MUI equivalents
3. **Backward Compatibility**: Existing functionality is preserved during the transition
4. **Performance Optimization**: Leveraging Next.js capabilities for optimal PWA performance

## Future Development

New UI components should be developed using MUI components rather than Radix UI components. When modifying existing components, consider migrating them to use MUI if it improves the user experience or development workflow.