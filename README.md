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

## Independent Deployment Architecture

A key architectural principle of this system is that @forfatter-pwa and @sagaapp are designed as completely independent applications that can be deployed separately. This provides several significant benefits:

### Benefits of Independent Deployment
1. **Scalability**: Each application can scale independently based on its specific usage patterns
2. **Resource Optimization**: Different resource requirements can be allocated appropriately
3. **Fault Isolation**: Issues in one application don't directly affect the other
4. **Deployment Flexibility**: Updates can be deployed independently without affecting the other application
5. **Technology Evolution**: Each application can evolve its technology stack independently
6. **Security Boundaries**: Independent security policies and access controls

### Deployment Options
The applications can be deployed in various configurations:
- **Same Infrastructure**: Both applications on the same servers or containers
- **Different Containers**: Each application in its own container on the same host
- **Different Servers**: Each application on completely separate physical or virtual servers
- **Different Networks**: Applications deployed in different network segments or data centers
- **Hybrid Cloud**: One application on-premises, the other in the cloud

### Integration with Saga Application
When deployed independently, Forfatter PWA can integrate with the Saga application through well-defined APIs:

```javascript
// Example API integration
const sagaApi = process.env.NEXT_PUBLIC_SAGA_API_URL || 'https://api.sagaapp.com/v1';

// Fetch system status
async function getSystemStatus() {
  const response = await fetch(`${sagaApi}/status`);
  return response.json();
}
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
│   ├── mui/             # Material-UI components and theme integration
│   ├── EditorLayout.tsx # Main application layout with panels
│   ├── FlowView.tsx     # Document tree view and editor interface
│   ├── Header.tsx       # Application header with navigation
│   └── ...              # Other shared components
├── lib/                 # Utility functions, API client, and types
├── docs/                # Development documentation and guidelines
├── public/              # Static assets
└── rules/               # Project rules and guidelines (symlink)
```

For detailed information about each directory, see:
- [App Directory README](app/README.md)
- [Components Directory README](components/README.md)
- [Lib Directory README](lib/README.md)
- [Docs Directory README](docs/README.md)

## Component Responsibilities

### App Directory (`/app`)
- **`layout.tsx`**: Defines the root application layout, including metadata, theme providers, and global wrappers
- **`page.tsx`**: Main entry point that renders the [EditorLayout](file:///home/ubuntu/forfatter-pwa/components/EditorLayout.tsx#L15-L105) component
- **`api/`**: Contains all backend API routes:
  - `tree/`: Manages document structure operations
  - `file/`: Handles file content operations

For detailed information about the app directory, see [App Directory README](app/README.md).

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
- **`mui/`**: Collection of MUI components and theme integration utilities

For detailed information about the components directory, see [Components Directory README](components/README.md).

### Lib Directory (`/lib`)
Contains utility functions, API clients, and type definitions used throughout the application.

For detailed information about the lib directory, see [Lib Directory README](lib/README.md).

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
- `NEXT_PUBLIC_SAGA_API_URL` - URL for Saga application API (when integrated)

## Deployment

The application is configured for deployment with:

- **HTTPS**: Via Tailscale and Caddy
- **VPN**: Tailscale network connectivity
- **Containerization**: Docker support for flexible deployment

### Deployment Options
Forfatter PWA can be deployed independently in various configurations:
- **Static Hosting**: Deploy to CDN or static hosting service
- **Serverless**: Deploy to cloud function platform
- **Containerized**: Deploy as Docker container
- **Traditional Server**: Deploy to dedicated server or VPS

### Integration Deployment
When deployed alongside the Saga application:
- **Same Server**: Both applications on the same server with reverse proxy
- **Different Servers**: Applications on separate servers communicating via APIs
- **Container Orchestration**: Deployed as separate services in Kubernetes
- **Hybrid Cloud**: One application on-premises, the other in the cloud

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

### Design System Documentation
For detailed information about the design system and component development guidelines, see:
- [Design System](docs/design-system.md)
- [Component Development Guidelines](docs/component-guidelines.md)
- [MUI Integration Guide](docs/mui-integration.md)
- [AI Prompt Template](docs/ai-prompt-template.md)

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
- [Material-UI](https://mui.com/) - React component library