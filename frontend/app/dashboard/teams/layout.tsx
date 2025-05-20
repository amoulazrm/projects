"use client"

import { ReactNode } from "react"

interface TeamsLayoutProps {
  children: ReactNode
}

export default function TeamsLayout({ children }: TeamsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
    </div>
  )
} 