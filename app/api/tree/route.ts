import { NextResponse } from 'next/server'
import type { NodeT } from '../../../lib/types'

// Mock data for development
const mockTreeData: NodeT[] = [
  {
    id: '1',
    type: 'folder',
    title: 'Kapitel 1: Introduktion',
    parent_id: null,
    order: 1,
    include: true,
    meta: {},
    updated_at: Date.now()
  },
  {
    id: '2',
    type: 'file',
    title: 'Afsnit 1.1: Baggrund',
    parent_id: '1',
    order: 1,
    include: true,
    meta: {},
    updated_at: Date.now()
  },
  {
    id: '3',
    type: 'file',
    title: 'Afsnit 1.2: Formål',
    parent_id: '1',
    order: 2,
    include: true,
    meta: {},
    updated_at: Date.now()
  },
  {
    id: '4',
    type: 'folder',
    title: 'Kapitel 2: Metode',
    parent_id: null,
    order: 2,
    include: true,
    meta: {},
    updated_at: Date.now()
  }
]

export async function GET() {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    return NextResponse.json(mockTreeData)
  } catch (error) {
    console.error('Error fetching tree:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tree data' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Mock creating a new node
    const newNode: NodeT = {
      id: Date.now().toString(),
      type: body.type || 'file',
      title: body.title || 'Nyt afsnit',
      parent_id: body.parent_id || null,
      order: body.order || 1,
      include: body.include ?? true,
      meta: body.meta || {},
      updated_at: Date.now()
    }
    
    return NextResponse.json(newNode, { status: 201 })
  } catch (error) {
    console.error('Error creating node:', error)
    return NextResponse.json(
      { error: 'Failed to create node' },
      { status: 500 }
    )
  }
}