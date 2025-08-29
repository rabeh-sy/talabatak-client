'use client'

import React, { createContext, useContext, ReactNode } from 'react'

export type ThemeColor = 'green' | 'yellow' | 'blue' | 'red' | 'black'

interface ThemeContextType {
  themeColor: ThemeColor
  getButtonColors: () => {
    primary: string
    secondary: string
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Helper function to get theme colors
const getThemeColors = (themeColor: ThemeColor) => {
  switch (themeColor) {
    case 'green':
      return {
        primary: 'bg-primary hover:bg-primary/90',
        secondary: 'bg-secondary hover:bg-secondary/90'
      }
    case 'yellow':
      return {
        primary: 'bg-yellow-600 hover:bg-yellow-700',
        secondary: 'bg-yellow-100 hover:bg-yellow-200'
      }
    case 'blue':
      return {
        primary: 'bg-blue-600 hover:bg-blue-700',
        secondary: 'bg-blue-100 hover:bg-blue-200'
      }
    case 'red':
      return {
        primary: 'bg-red-800 hover:bg-red-900',
        secondary: 'bg-red-100 hover:bg-red-200'
      }
    case 'black':
      return {
        primary: 'bg-gray-800 hover:bg-gray-900',
        secondary: 'bg-gray-200 hover:bg-gray-300'
      }
    default:
      return {
        primary: 'bg-primary hover:bg-primary/90',
        secondary: 'bg-secondary hover:bg-secondary/90'
      }
  }
}

interface ThemeProviderProps {
  children: ReactNode
  themeColor: ThemeColor
}

export function ThemeProvider({ children, themeColor }: ThemeProviderProps) {
  const getButtonColors = () => getThemeColors(themeColor)

  return (
    <ThemeContext.Provider value={{ themeColor, getButtonColors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
