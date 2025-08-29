'use client'

import { useState, useEffect } from 'react'
import { FlowView } from '../components/FlowView'
import { Header } from '../components/Header'

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set client flag and default sidebar state based on screen size
  useEffect(() => {
    setIsClient(true)
    const checkScreenSize = () => {
      setIsSidebarOpen(window.innerWidth >= 768) // md breakpoint
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleMenuItemClick = (item: string) => {
    console.log('Menu item clicked:', item)
    // TODO: Implementer menu item handling
  }

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      <Header 
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={handleSidebarToggle}
        onMenuItemClick={handleMenuItemClick}
      />
      <main className="mt-14">
        <div className="h-[calc(100vh-3.5rem)] w-full">
          {isClient ? (
            <FlowView isSidebarOpen={isSidebarOpen} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-muted-foreground">Indlæser...</div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}