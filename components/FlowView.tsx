'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { Button } from './ui/button'
import { Plus, FileText, Loader2 } from 'lucide-react'
import type { NodeT } from '../lib/types'

interface FlowViewProps {
  isSidebarOpen: boolean
}

export function FlowView({ isSidebarOpen }: FlowViewProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  // Hent træstrukturen med polling
  const { data: tree, isLoading, error } = useQuery({
    queryKey: ['tree'],
    queryFn: api.getTree,
    refetchInterval: 30000, // Poll every 30 seconds
    refetchIntervalInBackground: true, // Continue polling when tab is not active
  })

  // Optimistic mutation for creating new nodes
  const createNodeMutation = useMutation({
    mutationFn: api.createNode,
    onMutate: async (newNode) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['tree'] })
      
      // Snapshot previous value
      const previousTree = queryClient.getQueryData(['tree'])
      
      // Optimistically update to new value
      queryClient.setQueryData(['tree'], (old: NodeT[] | undefined) => {
        if (!old) return [newNode]
        return [...old, { ...newNode, id: `temp-${Date.now()}` }]
      })
      
      return { previousTree }
    },
    onError: (err, newNode, context) => {
      // Rollback on error
      if (context?.previousTree) {
        queryClient.setQueryData(['tree'], context.previousTree)
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['tree'] })
    },
  })

  // Vælg første node som standard når data er indlæst
  useEffect(() => {
    if (tree && Array.isArray(tree) && tree.length > 0 && !selectedNodeId) {
      setSelectedNodeId(tree[0].id)
    }
  }, [tree, selectedNodeId])

  const handleCreateSection = () => {
    const newNode: Partial<NodeT> = {
      type: 'file',
      title: 'Nyt afsnit',
      parent_id: null,
      order: (Array.isArray(tree) ? tree.length : 0) + 1,
      include: true,
      updated_at: Date.now()
    }
    
    createNodeMutation.mutate(newNode as NodeT)
  }

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId)
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Indlæser indhold...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Fejl ved indlæsning af indhold</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'Ukendt fejl'}
          </p>
        </div>
      </div>
    )
  }

  if (!tree || !Array.isArray(tree) || tree.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-lg font-semibold">Intet indhold endnu</h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              Kom i gang med at skrive ved at oprette dit første afsnit.
            </p>
          </div>
          <Button onClick={handleCreateSection} className="gap-2">
            <Plus className="h-5 w-5" />
            Opret første afsnit
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full relative" suppressHydrationWarning>
      {/* Sidebar med træstruktur */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 border-r bg-card/50 overflow-hidden`}>
        <div className="p-4 overflow-y-auto h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Indhold
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCreateSection}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-1">
            {Array.isArray(tree) && tree.map((node: NodeT) => (
              <NodeItem
                key={node.id}
                node={node}
                isSelected={selectedNodeId === node.id}
                onSelect={handleNodeSelect}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hovedindhold */}
      <div className="flex-1 overflow-hidden">
        {selectedNodeId ? (
          <NodeEditor nodeId={selectedNodeId} />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Vælg et afsnit for at begynde at redigere
          </div>
        )}
      </div>
    </div>
  )
}

interface NodeItemProps {
  node: NodeT
  isSelected: boolean
  onSelect: (nodeId: string) => void
}

function NodeItem({ node, isSelected, onSelect }: NodeItemProps) {
  return (
    <Button
      variant={isSelected ? 'secondary' : 'ghost'}
      className="w-full justify-start text-left h-auto py-2 px-2"
      onClick={() => onSelect(node.id)}
    >
      <div className="flex items-center space-x-2 min-w-0 flex-1">
        <FileText className="h-5 w-5 flex-shrink-0" />
        <span className="truncate text-sm">
          {node.title || 'Unavngivet afsnit'}
        </span>
      </div>
    </Button>
  )
}

interface NodeEditorProps {
  nodeId: string
}

function NodeEditor({ nodeId }: NodeEditorProps) {
  const { data: file, isLoading } = useQuery({
    queryKey: ['file', nodeId],
    queryFn: () => api.getFile(nodeId),
    enabled: !!nodeId,
    refetchInterval: 15000, // Poll every 15 seconds for file content
    refetchIntervalInBackground: true, // Keep polling file content in background for real-time updates
  })

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Indlæser afsnit...</span>
        </div>
      </div>
    )
  }

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Afsnit ikke fundet
      </div>
    )
  }

  return (
    <div className="h-full p-6" suppressHydrationWarning>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Node ID: {nodeId}
          </h1>
          <p className="text-muted-foreground">Editor placeholder</p>
        </div>
        
        <div className="prose prose-slate max-w-none">
          {/* TODO: Implementer TipTap editor her */}
          <div className="min-h-[400px] p-4 border rounded-lg bg-card">
            <p className="text-muted-foreground">
              TipTap editor vil blive implementeret her.
            </p>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">File data:</h3>
              <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                {JSON.stringify(file, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}