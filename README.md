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

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **State Management**: React Query (TanStack Query)
- **Editor**: TipTap (ProseMirror-based)
- **Validation**: Zod schema validation
- **UI Components**: Radix UI, Lucide React Icons
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
├── app/                 # Next.js app directory
│   ├── api/             # API routes
│   ├── components/      # React components
│   └── lib/             # Utility functions and types
├── components/          # Shared UI components
├── public/              # Static assets
└── rules/               # Project rules and guidelines (symlink)
```

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