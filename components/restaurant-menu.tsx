'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { Category, Restaurant } from '@/types'
import { MenuItemComponent } from '@/components/menu-item'
import { MenuItemCard } from '@/components/menu-item-card'
import { CartFooter } from '@/components/cart-footer'
import { CartProvider, useCart } from '@/contexts/cart-context'
import { ThemeProvider } from '@/contexts/theme-context'

interface RestaurantMenuProps {
  restaurant: Restaurant
  categories: Category[]
  restaurantId: string
}

function RestaurantMenuContent({ restaurant, categories, restaurantId }: RestaurantMenuProps) {
  const { setRestaurant } = useCart()
  const viewMode = restaurant.view_mode || 'list'
  
  useEffect(() => {
    setRestaurant(restaurantId)
  }, [restaurantId, setRestaurant])

  return (
    <div className="min-h-screen bg-warm-beige" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            {restaurant?.logo && (
              <div className="mb-4">
                <Image 
                  src={restaurant.logo} 
                  alt={restaurant.name}
                  width={64}
                  height={64}
                  className="h-16 mx-auto"
                />
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {restaurant?.name || 'مطعم الطلباتك'}
            </h1>
          </div>
        </div>
      </div>
      
      {/* Menu Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {viewMode === 'list' ? (
          // List View
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm border">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {category.name}
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {category.items.map((item) => (
                    <MenuItemComponent key={item.id} item={item} currency={restaurant.currency || 'ل.س'} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Cards View
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category.id}>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 px-2">
                  {category.name}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                  {category.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} currency={restaurant.currency || 'ل.س'} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Cart Footer */}
      <CartFooter 
        restaurantId={restaurantId} 
        primaryField={restaurant.primary_field}
        secondaryField={restaurant.secondary_field}
        currency={restaurant.currency || 'ل.س'}
        themeColor={restaurant.theme_color || 'green'}
      />
      
      {/* Bottom padding to account for sticky footer */}
      <div className="h-24" />
    </div>
  )
}

export function RestaurantMenu({ restaurant, categories, restaurantId }: RestaurantMenuProps) {
  return (
    <ThemeProvider themeColor={restaurant.theme_color || 'green'}>
      <CartProvider>
        <RestaurantMenuContent restaurant={restaurant} categories={categories} restaurantId={restaurantId} />
      </CartProvider>
    </ThemeProvider>
  )
}
