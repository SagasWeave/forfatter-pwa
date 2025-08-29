'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from './ui/sheet'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from './ui/command'
import { Menu, Search, FileText, MessageSquare, Terminal, Settings, PanelLeftOpen, PanelLeftClose } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { Logo } from './Logo'

interface HeaderProps {
  onMenuItemClick?: (item: string) => void
  isSidebarOpen?: boolean
  onSidebarToggle?: () => void
}

export function Header({ onMenuItemClick }: HeaderProps) {
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Kommandopalette åbnes med Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const menuItems = [
    { id: 'toc', label: 'Indholdsfortegnelse', icon: FileText },
    { id: 'props', label: 'Egenskaber', icon: Settings },
    { id: 'chat', label: 'AI Chat', icon: MessageSquare },
    { id: 'terminal', label: 'Terminal', icon: Terminal }
  ]

  const commandItems = [
    { id: 'new-section', label: 'Nyt afsnit', shortcut: '⌘N' },
    { id: 'save', label: 'Gem', shortcut: '⌘S' },
    { id: 'search', label: 'Søg', shortcut: '⌘F' },
    { id: 'ai-chat', label: 'Åbn AI Chat', shortcut: '⌘⇧C' },
    { id: 'terminal', label: 'Åbn Terminal', shortcut: '⌘⇧T' }
  ]

  const handleCommandSelect = (commandId: string) => {
    setIsCommandOpen(false)
    onMenuItemClick?.(commandId)
  }

  const handleMenuSelect = (itemId: string) => {
    setIsMenuOpen(false)
    onMenuItemClick?.(itemId)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-14 items-center justify-between px-4">
          {/* Burger Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Åbn menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>Forfatter</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 py-4">
                <div className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleMenuSelect(item.id)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Brand */}
          <div className="flex-grow flex justify-center items-center space-x-4">
            <Logo className="h-8 w-8" />
            <span className="font-semibold text-lg">Forfatter</span>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
            {/* Kommandopalette trigger */}
            <Button
              variant="outline"
              size="sm"
              className="relative h-8 w-8 p-0 xl:h-8 xl:w-40 xl:justify-start xl:px-3 xl:py-2"
              onClick={() => setIsCommandOpen(true)}
            >
              <Search className="h-6 w-6 xl:mr-2" />
              <span className="hidden xl:inline-flex">Søg kommandoer...</span>
              <span className="sr-only xl:not-sr-only xl:ml-auto xl:text-xs xl:text-muted-foreground">
                ⌘K
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Kommandopalette */}
      <Command open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <CommandInput placeholder="Skriv en kommando eller søg..." />
        <CommandList>
          <CommandEmpty>Ingen resultater fundet.</CommandEmpty>
          <CommandGroup heading="Kommandoer">
            {commandItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleCommandSelect(item.id)}
              >
                <span>{item.label}</span>
                {item.shortcut && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {item.shortcut}
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  )
}