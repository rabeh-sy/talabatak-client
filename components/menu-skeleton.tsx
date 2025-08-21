import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function MenuSkeleton() {
  return (
    <div className="min-h-screen bg-warm-beige" dir="rtl">
      {/* Header Skeleton - exact match to RestaurantMenu */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            {/* Logo skeleton - always show since conditional in real component */}
            <div className="mb-4">
              <Skeleton className="h-16 w-16 mx-auto rounded-full" />
            </div>
            {/* Restaurant name skeleton - matches h1 text-3xl */}
            <Skeleton className="h-9 w-48 mx-auto mb-2" />
            {/* Subtitle skeleton - matches p text */}
            <Skeleton className="h-6 w-32 mx-auto" />
          </div>
        </div>
      </div>
      
      {/* Menu Content Skeleton - exact match to RestaurantMenu */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Categories Skeleton */}
          {[1, 2, 3, 4, 5].map((categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border">
              {/* Category Title - exact match */}
              <div className="border-b border-gray-200 px-6 py-4">
                <Skeleton className="h-7 w-32" />
              </div>
              
              {/* Menu Items Container - exact match with divide-y */}
              <div className="divide-y divide-gray-200">
                {[1, 2, 3].map((itemIndex) => (
                  <div key={itemIndex}>
                    {/* Desktop layout skeleton */}
                    <div className="hidden sm:block p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          {/* Item name skeleton - matches h3 text-lg */}
                          <Skeleton className="h-7 w-48" />
                          {/* Item description skeleton - matches p text-sm with mt-1 */}
                          <Skeleton className="h-5 w-64 mt-1" />
                        </div>
                        <div className="flex items-center space-x-3">
                          {/* Price skeleton */}
                          <Skeleton className="h-7 w-16" />
                          {/* Add button skeleton */}
                          <Skeleton className="h-8 w-20" />
                        </div>
                      </div>
                    </div>

                    {/* Mobile layout skeleton */}
                    <div className="sm:hidden p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          {/* Item name skeleton */}
                          <Skeleton className="h-7 w-48" />
                          {/* Item description skeleton */}
                          <Skeleton className="h-5 w-64 mt-1" />
                        </div>
                        <div className="flex-shrink-0 mr-3">
                          {/* Add button skeleton */}
                          <Skeleton className="h-8 w-20" />
                        </div>
                      </div>
                      
                      {/* Price skeleton on separate line for mobile */}
                      <div className="text-right">
                        <Skeleton className="h-7 w-16 ml-auto" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom padding to account for sticky footer */}
      <div className="h-24" />
    </div>
  )
}
