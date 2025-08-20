import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function MenuSkeleton() {
  return (
    <div className="min-h-screen bg-warm-beige" dir="rtl">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            {/* Logo skeleton */}
            <div className="mb-4">
              <Skeleton className="h-16 w-16 mx-auto rounded-full" />
            </div>
            {/* Restaurant name skeleton */}
            <Skeleton className="h-8 w-48 mx-auto mb-2" />
            {/* Subtitle skeleton */}
            <Skeleton className="h-5 w-32 mx-auto" />
          </div>
        </div>
      </div>
      
      {/* Menu Content Skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Categories Skeleton */}
          {[1, 2, 3, 4, 5].map((categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border">
              {/* Category Title */}
              <div className="border-b border-gray-200 px-6 py-4">
                <Skeleton className="h-6 w-32" />
              </div>
              
              {/* Menu Items */}
              <div className="divide-y divide-gray-200">
                {[1, 2, 3].map((itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-4">
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-8 w-20" />
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
