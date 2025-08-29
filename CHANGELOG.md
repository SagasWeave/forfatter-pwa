# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-07-26

### Added
- Dark/light theme switching functionality.
- `next-themes` library to manage themes.
- `ThemeProvider` component to wrap the application.
- Theme toggle button in the header for user-controlled theme selection.
- `CHANGELOG.md` to track project changes.

### Changed
- Updated `tailwind.config.ts` to enable class-based dark mode.
- Integrated `ThemeProvider` into the root layout.
- Changed the development server port from 5001 to 5002.

### Fixed
- Resolved hydration errors related to server-client rendering mismatches during theme switching.