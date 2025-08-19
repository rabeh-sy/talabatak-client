import React from 'react'
import Link from 'next/link'
import { Clock, Home } from 'lucide-react'

interface InactiveRestaurantProps {
  restaurantName: string
}

export function InactiveRestaurant({ restaurantName }: InactiveRestaurantProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Clock className="h-12 w-12 text-yellow-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            الخدمة متوقفة مؤقتاً
          </h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            عذراً، الخدمة متوقفة حالياً في <span className="font-semibold">{restaurantName}</span>. 
            يرجى المحاولة مرة أخرى لاحقاً.
          </p>
          
          <div className="space-y-3">
            <Link 
              href="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Home className="h-5 w-5 ml-2" />
              العودة للصفحة الرئيسية
            </Link>
            
            <Link 
              href={`/restaurants/${restaurantName}`}
              className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Clock className="h-5 w-5 ml-2" />
              إعادة المحاولة
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
