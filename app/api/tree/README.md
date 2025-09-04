# Tree API Directory

This directory contains the API endpoints for managing the document tree structure in the Forfatter PWA application.

## File Structure

```
tree/
└── route.ts            # Tree API endpoints
```

## API Endpoints

### GET `/api/tree`
Retrieves the complete document tree structure.

**Response Format:**
```json
{
  "id": "string",
  "title": "string",
  "type": "file|folder",
  "parent_id": "string|null",
  "order": "number",
  "include": "boolean",
  "updated_at": "timestamp"
}
```

### POST `/api/tree`
Creates a new node in the document tree.

**Request Body:**
```json
{
  "title": "string",
  "type": "file|folder",
  "parent_id": "string|null",
  "order": "number",
  "include": "boolean"
}
```

### PUT `/api/tree`
Updates an existing node in the document tree.

**Request Body:**
```json
{
  "id": "string",
  "title": "string",
  "type": "file|folder",
  "parent_id": "string|null",
  "order": "number",
  "include": "boolean"
}
```

### DELETE `/api/tree`
Removes a node from the document tree.

**Request Body:**
```json
{
  "id": "string"
}
```

## Design System Integration

The data structures returned by these endpoints are designed to work well with MUI components:
- Consistent property naming that maps to MUI table and tree view components
- Boolean flags for UI state management
- Timestamps that can be formatted using MUI date utilities
- Hierarchical structure that works with MUI tree components

## Error Handling

All endpoints follow consistent error response patterns that can be displayed in MUI alert components:

```json
{
  "error": "string",
  "message": "string"
}
```

## Future Development

When extending the tree API:
1. Maintain consistency with existing data structures
2. Ensure new endpoints work well with MUI data display components
3. Follow REST conventions
4. Implement proper TypeScript typing