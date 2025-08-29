import { NextResponse } from 'next/server'
import type { FileBodyT } from '../../../../lib/types'

// Mock file data for development
const mockFileData: Record<string, FileBodyT> = {
  '1': {
    id: '1',
    body: '# Kapitel 1: Introduktion\n\nVelkommen til dit nye projekt. Dette kapitel indeholder introduktionen til dit værk.\n\n## Oversigt\n\nHer kan du skrive en oversigt over kapitlet...',
    updated_at: Date.now()
  },
  '2': {
    id: '2',
    body: '# Afsnit 1.1: Baggrund\n\nDette afsnit beskriver baggrunden for projektet. Her kan du skrive dit indhold og redigere det med den integrerede editor.\n\n## Underoverskrift\n\nMere indhold her...',
    updated_at: Date.now()
  },
  '3': {
    id: '3',
    body: '# Afsnit 1.2: Formål\n\nDette afsnit beskriver formålet med projektet. Du kan bruge markdown-formatering til at strukturere dit indhold.\n\n- Punkt 1\n- Punkt 2\n- Punkt 3',
    updated_at: Date.now()
  },
  '4': {
    id: '4',
    body: '# Kapitel 2: Metode\n\nI dette kapitel beskrives metoderne der anvendes i projektet.\n\n## Fremgangsmåde\n\nBeskriv din fremgangsmåde her...',
    updated_at: Date.now()
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const fileData = mockFileData[id]
    
    if (!fileData) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(fileData)
  } catch (error) {
    console.error('Error fetching file:', error)
    return NextResponse.json(
      { error: 'Failed to fetch file data' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    // Mock updating file data
    const updatedFile: FileBodyT = {
      id,
      body: body.body || '',
      updated_at: Date.now()
    }
    
    // In a real app, this would save to database
    mockFileData[id] = updatedFile
    
    return NextResponse.json(updatedFile)
  } catch (error) {
    console.error('Error updating file:', error)
    return NextResponse.json(
      { error: 'Failed to update file' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    if (!mockFileData[id]) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }
    
    delete mockFileData[id]
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}