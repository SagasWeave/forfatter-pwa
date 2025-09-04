# File API Directory

This directory contains the API endpoints for managing file content in the Forfatter PWA application.

## Directory Structure

```
file/
└── [id]/              # Dynamic route for file operations
    └── route.ts        # File API endpoints
```

## API Endpoints

### GET `/api/file/[id]`
Retrieves the content of a specific file by its ID.

**Response Format:**
```json
{
  "id": "string",
  "content": "string",
  "title": "string",
  "updated_at": "timestamp"
}
```

### PUT `/api/file/[id]`
Updates the content of a specific file.

**Request Body:**
```json
{
  "content": "string",
  "title": "string"
}
```

### DELETE `/api/file/[id]`
Deletes a specific file.

**Response:**
```json
{
  "success": "boolean",
  "message": "string"
}
```

## Design System Integration

The data structures returned by these endpoints are designed to work well with MUI components:
- Simple, flat structures that map to MUI form and editor components
- Content strings that can be displayed in MUI text fields and editors
- Metadata that can be shown in MUI info components
- Error responses that can be displayed in MUI alert components

## Error Handling

All endpoints follow consistent error response patterns that can be displayed in MUI alert components:

```json
{
  "error": "string",
  "message": "string"
}
```

## Future Development

When extending the file API:
1. Maintain consistency with existing data structures
2. Ensure new endpoints work well with MUI data display components
3. Follow REST conventions
4. Implement proper TypeScript typing
5. Consider versioning for content format changes