'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartItem, MenuItem } from '@/types'

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: [],
  total: 0
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.item.id === action.payload.id)
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0)
        }
      } else {
        const newItem: CartItem = { item: action.payload, quantity: 1 }
        const updatedItems = [...state.items, newItem]
        
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0)
        }
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.item.id !== action.payload)
      
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: itemId })
      }
      
      const updatedItems = state.items.map(item =>
        item.item.id === itemId ? { ...item, quantity } : item
      )
      
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0)
      }
    }
    
    case 'CLEAR_CART':
      return initialState
      
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: MenuItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  const addItem = (item: MenuItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }
  
  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }
  
  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  
  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
