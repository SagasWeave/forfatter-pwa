import { z } from 'zod'

// Node types
export const NodeType = z.enum(['folder', 'file'])

export const NodeSchema = z.object({
  id: z.string(),
  type: NodeType,
  title: z.string(),
  parent_id: z.string().nullable(),
  order: z.number().int(),
  include: z.boolean(),
  meta: z.any().nullable(),
  updated_at: z.number().int()
})

export type NodeT = z.infer<typeof NodeSchema>

// File body schema
export const FileBodySchema = z.object({
  id: z.string(),
  body: z.string(),
  updated_at: z.number().int()
})

export type FileBodyT = z.infer<typeof FileBodySchema>

// File embeddings schema
export const FileEmbeddingSchema = z.object({
  id: z.string(),
  model: z.string(),
  dim: z.number().int(),
  vec: z.instanceof(Uint8Array),
  updated_at: z.number().int()
})

export type FileEmbeddingT = z.infer<typeof FileEmbeddingSchema>

// Chat schemas
export const ChatSessionSchema = z.object({
  id: z.string(),
  title: z.string(),
  ctx_type: z.enum(['global', 'chapter', 'file']),
  ctx_id: z.string().nullable(),
  created_at: z.number().int(),
  updated_at: z.number().int()
})

export type ChatSessionT = z.infer<typeof ChatSessionSchema>

export const ChatMessageSchema = z.object({
  id: z.string(),
  session_id: z.string(),
  role: z.enum(['user', 'assistant', 'tool', 'system']),
  content: z.string(),
  meta: z.any().nullable(),
  created_at: z.number().int()
})

export type ChatMessageT = z.infer<typeof ChatMessageSchema>

// Form schemas
export const NodeFormSchema = z.object({
  title: z.string().min(1, 'Titel er påkrævet'),
  type: NodeType,
  include: z.boolean().default(true)
})

export type NodeFormT = z.infer<typeof NodeFormSchema>

// AI Tool schemas
export const AIToolSchema = z.object({
  name: z.enum(['rewrite', 'outline', 'critique', 'search_embeddings', 'compile_preview']),
  args: z.record(z.any())
})

export type AIToolT = z.infer<typeof AIToolSchema>

// API Response schemas
export const ApiResponseSchema = z.object({
  ok: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional()
})

export type ApiResponseT = z.infer<typeof ApiResponseSchema>

// Sync status
export type SyncStatus = 'ok' | 'syncing' | 'error' | 'offline'

// UI State types
export interface UIState {
  activeNodeId: string | null
  showTOC: boolean
  showProps: boolean
  showChat: boolean
  showTerminal: boolean
  commandPaletteOpen: boolean
}

// Editor state
export interface EditorState {
  content: string
  isDirty: boolean
  lastSaved: number
}