'use client'

import React from 'react'
import { MenuItem } from '@/types'
import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { formatPrice } from '@/lib/api'

interface MenuItemProps {
  item: MenuItem
}

export function MenuItemComponent({ item }: MenuItemProps) {
  const { state, addItem, updateQuantity } = useCart()
  
  const cartItem = state.items.find(cartItem => cartItem.item.id === item.id)
  const quantity = cartItem?.quantity || 0
  
  const handleAdd = () => {
    addItem(item)
  }
  
  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1)
  }
  
  const handleDecrement = () => {
    updateQuantity(item.id, quantity - 1)
  }
  
  if (!item.available) {
    return (
      <div className="flex items-center justify-between p-4 border-b border-gray-200 opacity-50">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-400">{item.name}</h3>
          <p className="text-sm text-gray-400">{item.description}</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-semibold text-gray-400">{formatPrice(item.price)} ل.س</span>
          <div className="text-xs text-gray-400 mt-1">غير متوفر</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
      </div>
      
      <div className="flex items-center space-x-3">
        <span className="text-lg font-semibold text-primary min-w-[60px] text-left">
          {formatPrice(item.price)} ل.س
        </span>
        
        {quantity === 0 ? (
          <Button
            onClick={handleAdd}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4 ml-1" />
            إضافة
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleDecrement}
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="text-lg font-semibold min-w-[30px] text-center">
              {quantity}
            </span>
            
            <Button
              onClick={handleIncrement}
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
