'use client'

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useCallback } from 'react'
import { CartItem, MenuItem } from '@/types'

interface CartState {
  restaurantId: string | null
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: 'SET_RESTAURANT'; payload: string }
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }

const initialState: CartState = {
  restaurantId: null,
  items: [],
  total: 0
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_RESTAURANT': {
      // If switching restaurants, clear the cart
      if (state.restaurantId && state.restaurantId !== action.payload) {
        return {
          restaurantId: action.payload,
          items: [],
          total: 0
        }
      }
      return {
        ...state,
        restaurantId: action.payload
      }
    }
    
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.item.id === action.payload.id)
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0)
        }
      } else {
        const newItem: CartItem = { item: action.payload, quantity: 1 }
        const updatedItems = [...state.items, newItem]
        
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0)
        }
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
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0)
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.item.id !== action.payload)
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.item.price * item.quantity), 0)
      }
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0
      }
      
    case 'LOAD_CART':
      return action.payload
      
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  setRestaurant: (restaurantId: string) => void
  addItem: (item: MenuItem) => void
  removeItem: (itemId: number) => void
  updateQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  // Load cart from localStorage on mount
  useEffect(() => {
    // We'll load the cart when setRestaurant is called instead
  }, [])
  
  // Save cart to localStorage whenever it changes, but prevent infinite loops
  useEffect(() => {
    // Only save if we have a restaurant ID and the cart has actually changed
    if (state.restaurantId && state.items.length > 0) {
      const cartKey = `talabatak-cart-${state.restaurantId}`
      localStorage.setItem(cartKey, JSON.stringify(state))
    }
  }, [state.restaurantId, state.items, state.total])
  
  // Clean up empty carts from localStorage
  useEffect(() => {
    if (state.restaurantId && state.items.length === 0) {
      const cartKey = `talabatak-cart-${state.restaurantId}`
      localStorage.removeItem(cartKey)
    }
  }, [state.restaurantId, state.items.length])
  
  const setRestaurant = useCallback((restaurantId: string) => {
    // Load existing cart for this restaurant if available
    const cartKey = `talabatak-cart-${restaurantId}`
    const savedCart = localStorage.getItem(cartKey)
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        // Only load if it's for the same restaurant
        if (parsedCart.restaurantId === restaurantId) {
          dispatch({ type: 'LOAD_CART', payload: parsedCart })
          return
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
        localStorage.removeItem(cartKey)
      }
    }
    
    // If no saved cart or error, set new restaurant
    dispatch({ type: 'SET_RESTAURANT', payload: restaurantId })
  }, [])
  
  const addItem = useCallback((item: MenuItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }, [])
  
  const removeItem = useCallback((itemId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }, [])
  
  const updateQuantity = useCallback((itemId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } })
  }, [])
  
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])
  
  return (
    <CartContext.Provider value={{
      state,
      setRestaurant,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
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

