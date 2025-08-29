'use client'

import React from 'react'
import Image from 'next/image'
import { MenuItem } from '@/types'
import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { useTheme } from '@/contexts/theme-context'
import { formatPrice } from '@/lib/api'

interface MenuItemCardProps {
  item: MenuItem
  currency: string
}

export function MenuItemCard({ item, currency }: MenuItemCardProps) {
  const { state, addItem, updateQuantity } = useCart()
  const { getButtonColors, themeColor } = useTheme()
  const buttonColors = getButtonColors()
  
  // Get theme-based hover color
  const getHoverColor = () => {
    switch (themeColor) {
      case 'green':
        return 'hover:shadow-md'
      case 'yellow':
        return 'hover:shadow-md hover:shadow-yellow-100'
      case 'blue':
        return 'hover:shadow-md hover:shadow-blue-100'
      case 'red':
        return 'hover:shadow-md hover:shadow-red-100'
      case 'black':
        return 'hover:shadow-md hover:shadow-gray-100'
      default:
        return 'hover:shadow-md'
    }
  }
  
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden opacity-50">
        {/* Image */}
        <div className="relative h-48 bg-gray-100">
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-400 text-4xl">🍽️</div>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            غير متوفر
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-400 mb-2">{item.name}</h3>
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-400">{formatPrice(item.price)} {currency}</span>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${getHoverColor()} transition-shadow`}>
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400 text-4xl">🍽️</div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">{formatPrice(item.price)} {currency}</span>
          
          {quantity === 0 ? (
            <Button
              onClick={handleAdd}
              size="sm"
              className={`${buttonColors.primary} text-white`}
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
    </div>
  )
}
