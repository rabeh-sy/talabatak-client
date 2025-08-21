import React from 'react'
import { Utensils } from 'lucide-react'

export function MenuSkeleton() {
  return (
    <div className="min-h-screen bg-warm-beige flex items-center justify-center" dir="rtl">
      <div className="text-center">
        {/* Loading Icon */}
        <div className="mb-6">
          <div className="relative">
            <Utensils className="h-20 w-20 text-primary mx-auto animate-pulse" />
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          جاري تحميل القائمة
        </h2>
        <p className="text-gray-500">
          يرجى الانتظار...
        </p>
        
        {/* Loading Dots Animation */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}
