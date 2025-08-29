# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2025-08-29

### Added
- HTTPS support via Tailscale and Caddy for secure communication.
- Caddy configured to use a valid TLS certificate from Tailscale.
- The application is now securely accessible at `https://sw1.tail2d448.ts.net:5005/`.

### Fixed
- Resolved `net::ERR_CERT_AUTHORITY_INVALID` browser error by using a trusted certificate.

## [0.1.1] - 2025-08-29

### Added
- Tailscale VPN installation and configuration for secure network connectivity
- Device connected to Tailscale network with IP addresses:
  - IPv4: `100.71.41.52`
  - IPv6: `fd7a:115c:a1e0::5132:2934`
- GitHub CLI (gh) installation and authentication
- Repository migration to SagasWeave organization (https://github.com/SagasWeave/forfatter-pwa)
- Automated repository cleanup script for organization management

### Infrastructure
- Established secure VPN connectivity via Tailscale
- Connected to existing Tailscale network with other devices:
  - iPad Pro 12.9 Gen 4 (`100.64.37.105`)
  - iPhone 14 (`100.124.98.82`)
  - MacBook Pro (`100.77.253.92`)
  - Master1 server (`100.119.91.95`)

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
- Fixed application accessibility issues by exposing the development server through a public URL.