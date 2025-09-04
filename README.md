# Forfatter PWA

A modern writing application for authors with AI integration, built as a Progressive Web App (PWA).

## Description

Forfatter PWA is a Danish writing application designed for authors who want a modern, feature-rich environment for their creative work. The application combines a clean, distraction-free writing interface with powerful organizational tools and AI-assisted writing capabilities.

## Features

- **Progressive Web App (PWA)**: Installable on any device, works offline
- **Document Organization**: Tree-based structure for chapters and sections
- **Dark/Light Theme**: User preference support with system-aware defaults
- **AI Integration**: AI chat and writing assistance tools
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Collaboration**: (Planned) Multi-user editing capabilities
- **Secure Communication**: HTTPS support via Tailscale and Caddy
- **Modern UI/UX**: Using MUI library for enhanced user interface components
- **Enhanced PWA Capabilities**: Leveraging Next.js for optimal PWA performance

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, MUI Components, Radix UI Components
- **State Management**: React Query (TanStack Query)
- **Editor**: TipTap (ProseMirror-based)
- **Validation**: Zod schema validation
- **UI Components**: MUI Library, Radix UI, Lucide React Icons
- **Animations**: Framer Motion

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SagasWeave/forfatter-pwa.git
   ```

2. Navigate to the project directory:
   ```bash
   cd forfatter-pwa
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Project Structure

```
forfatter-pwa/
├── app/                 # Next.js app directory with page routing
│   ├── api/             # API routes for backend functionality
│   │   ├── file/        # File content operations
│   │   └── tree/        # Document structure management
│   ├── layout.tsx       # Root layout with providers and metadata
│   └── page.tsx         # Main page rendering EditorLayout
├── components/          # Shared UI components
│   ├── ui/              # Reusable UI components (buttons, sheets, etc.)
│   ├── EditorLayout.tsx # Main application layout with panels
│   ├── FlowView.tsx     # Document tree view and editor interface
│   ├── Header.tsx       # Application header with navigation
│   └── ...              # Other shared components
├── lib/                 # Utility functions, API client, and types
├── public/              # Static assets
└── rules/               # Project rules and guidelines (symlink)
```

## Component Responsibilities

### App Directory (`/app`)
- **`layout.tsx`**: Defines the root application layout, including metadata, theme providers, and global wrappers
- **`page.tsx`**: Main entry point that renders the [EditorLayout](file:///home/ubuntu/forfatter-pwa/components/EditorLayout.tsx#L15-L105) component
- **`api/`**: Contains all backend API routes:
  - `tree/`: Manages document structure operations
  - `file/`: Handles file content operations

### Components Directory (`/components`)
- **`EditorLayout.tsx`**: Main application container with:
  - [Header](file:///home/ubuntu/forfatter-pwa/components/Header.tsx#L21-L82) component for navigation
  - Left sidebar for table of contents
  - Main content area using [FlowView](file:///home/ubuntu/forfatter-pwa/components/FlowView.tsx#L11-L244)
  - Right panel sheet for properties, AI chat, and terminal
- **`FlowView.tsx`**: Core editing interface with:
  - Document tree view sidebar
  - Node editor for content creation
  - Data management via React Query
- **`Header.tsx`**: Top application bar with:
  - Sidebar toggle controls
  - Menu items and actions
  - Theme switching capabilities
- **`ui/`**: Collection of reusable UI components from Radix UI and custom components

## Key Components

- **EditorLayout**: Main application layout with header and panels
- **FlowView**: Document tree view and editor interface
- **Header**: Application header with navigation and controls
- **AI Chat**: Integrated AI assistant for writing help

## API Routes

- `/api/tree` - Document structure management
- `/api/file/[id]` - File content operations
- `/api/chat/*` - AI chat functionality (planned)

## Environment Variables

The application uses the following environment variables:

- `NEXT_PUBLIC_API_BASE` - API base URL (defaults to `/api`)
- `NEXT_PUBLIC_WS_BASE` - WebSocket URL for real-time features
- `NEXT_PUBLIC_DEBUG` - Enable debug logging

## Deployment

The application is configured for deployment with:

- **HTTPS**: Via Tailscale and Caddy
- **VPN**: Tailscale network connectivity
- **Containerization**: (Planned) Docker support

## Design Requirements

The application will be enhanced with modern UI/UX components using the Material-UI (MUI) library while maintaining the existing Next.js PWA architecture. The implementation will follow an incremental approach to ensure stability and maintainability.

### UI/UX Enhancements
- Integration of MUI components for a more polished user interface
- Enhanced styling and visual consistency across the application
- Improved accessibility and responsive design
- Modern design patterns and interactions

### Implementation Approach
- **Incremental Development**: Changes will be implemented in small, manageable steps
- **Component-by-Component Migration**: Existing Radix UI components will be gradually enhanced or replaced with MUI equivalents
- **Backward Compatibility**: Existing functionality will be preserved during the transition
- **Performance Optimization**: Leveraging Next.js capabilities for optimal PWA performance

### MUI Integration Documentation
For detailed information about MUI integration, see [MUI Integration Guide](docs/mui-integration.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TipTap](https://tiptap.dev/) - Headless editor framework
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components