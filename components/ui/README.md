# UI Components Directory

This directory contains reusable UI components built with Radix UI and custom styling. These components represent the original UI implementation before the strategic migration to Material-UI (MUI).

## Purpose

This directory contains the legacy UI components that were originally used in the application. As part of the ongoing migration to MUI, components in this directory are gradually being replaced or enhanced with MUI equivalents.

## Components

### [button.tsx](button.tsx)
A reusable button component built with Radix UI primitives and custom styling.

### [command.tsx](command.tsx)
A command palette component for quick navigation and actions.

### [dialog.tsx](dialog.tsx)
A modal dialog component for user interactions.

### [dropdown-menu.tsx](dropdown-menu.tsx)
A dropdown menu component for displaying options and actions.

### [input.tsx](input.tsx)
A text input component with validation and styling.

### [sheet.tsx](sheet.tsx)
A sliding panel component for displaying additional content or options.

## Migration Status

These components are in the process of being migrated to MUI equivalents. The migration follows an incremental approach:

1. **Evaluation**: Each component is evaluated for MUI migration
2. **Replacement**: Components with clear MUI equivalents are replaced
3. **Enhancement**: Components that can be enhanced with MUI are updated
4. **Removal**: Legacy components are removed once fully migrated

## Development Guidelines

When working with components in this directory:

1. **Maintenance Mode**: These components are in maintenance mode - only bug fixes and critical updates should be made
2. **Migration Priority**: When adding new functionality, prioritize creating MUI equivalents in the [/mui](../mui/) directory
3. **Consistency**: Maintain consistency with existing design patterns until full migration
4. **Documentation**: Document any changes in the [CHANGELOG.md](../../CHANGELOG.md)

## Future of This Directory

This directory will eventually be deprecated as all components are migrated to MUI equivalents. The timeline for this migration depends on the incremental development approach and the strategic decision to leverage AI-friendly MUI components for more efficient development.