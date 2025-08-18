import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export function MenuSkeleton() {
  return (
    <div className="space-y-6">
      {/* Restaurant Header Skeleton */}
      <div className="text-center py-8">
        <Skeleton className="h-16 w-48 mx-auto mb-4" />
        <Skeleton className="h-6 w-32 mx-auto" />
      </div>
      
      {/* Categories Skeleton */}
      {[1, 2, 3, 4, 5].map((categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          {/* Category Title */}
          <div className="border-b border-gray-200 pb-2">
            <Skeleton className="h-8 w-32" />
          </div>
          
          {/* Menu Items */}
          {[1, 2, 3].map((itemIndex) => (
            <div key={itemIndex} className="flex items-center justify-between p-4 border-b border-gray-200">
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
      ))}
    </div>
  )
}
