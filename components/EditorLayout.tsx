'use client'

import { useState, useEffect } from 'react'
import { Header } from './Header'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { FlowView } from './FlowView'

// Dummy komponenter for panelerne - disse vil blive implementeret senere
const TableOfContents = () => <div className="p-4">Indholdsfortegnelse kommer her...</div>
const PropertiesPanel = () => <div className="p-4">Egenskaber kommer her...</div>
const AiChatPanel = () => <div className="p-4">AI Chat kommer her...</div>
const TerminalPanel = () => <div className="p-4">Terminal kommer her...</div>

export function EditorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkScreenSize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024) // lg breakpoint
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleMenuItemClick = (item: string) => {
    if (['toc', 'props', 'chat', 'terminal'].includes(item)) {
      setActivePanel(item)
    } else {
      console.log('Executing command:', item)
      // Her vil logik for kommandopalette-handlinger komme
    }
  }

  const renderPanel = () => {
    switch (activePanel) {
      case 'toc':
        return <TableOfContents />
      case 'props':
        return <PropertiesPanel />
      case 'chat':
        return <AiChatPanel />
      case 'terminal':
        return <TerminalPanel />
      default:
        return null
    }
  }

  const getPanelTitle = () => {
    switch (activePanel) {
      case 'toc':
        return 'Indholdsfortegnelse'
      case 'props':
        return 'Egenskaber'
      case 'chat':
        return 'AI Chat'
      case 'terminal':
        return 'Terminal'
      default:
        return ''
    }
  }

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      <Header
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={handleSidebarToggle}
        onMenuItemClick={handleMenuItemClick}
      />
      <main className="mt-14 flex">
        {/* Venstre sidebar (TOC) - permanent på store skærme */}
        {isClient && (
          <aside
            className={`transition-all duration-300 ease-in-out bg-background border-r
              ${isSidebarOpen ? 'w-72' : 'w-0'}
              h-[calc(100vh-3.5rem)] overflow-y-auto`}
          >
            {isSidebarOpen && <TableOfContents />}
          </aside>
        )}

        {/* Hovedindhold - Editor */}
        <div className="flex-1 h-[calc(100vh-3.5rem)]">
          <FlowView isSidebarOpen={isSidebarOpen} />
        </div>

        {/* Højre panel (Sheet) for Egenskaber, Chat, Terminal */}
        <Sheet open={!!activePanel && activePanel !== 'toc'} onOpenChange={() => setActivePanel(null)}>
          <SheetContent className="w-full sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>{getPanelTitle()}</SheetTitle>
            </SheetHeader>
            {renderPanel()}
          </SheetContent>
        </Sheet>
      </main>
    </div>
  )
}