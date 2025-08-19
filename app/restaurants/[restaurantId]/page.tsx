import React from 'react'
import Link from 'next/link'
import { fetchRestaurantInfo, fetchMenuItems, groupItemsByCategory } from '@/lib/api'
import { RestaurantMenu } from '@/components/restaurant-menu'
import { InactiveRestaurant } from '@/components/inactive-restaurant'

interface RestaurantPageProps {
  params: Promise<{
    restaurantId: string
  }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = await params
  
  try {
    const [restaurant, menuItems] = await Promise.all([
      fetchRestaurantInfo(restaurantId),
      fetchMenuItems(restaurantId)
    ])
    
    // Check if restaurant is inactive
    if (restaurant.status === 'inactive') {
      return <InactiveRestaurant restaurantName={restaurant.name} />
    }
    
    // Group menu items by category
    const categories = groupItemsByCategory(menuItems)
    
    return <RestaurantMenu restaurant={restaurant} categories={categories} restaurantId={restaurantId} />
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Restaurant not found') {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">لم يتم العثور على المطعم</h1>
              <p className="text-gray-600 mb-6">المطعم الذي تبحث عنه غير موجود</p>
              <Link 
                href="/"
                className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                العودة للصفحة الرئيسية
              </Link>
            </div>
          </div>
        )
      } else if (error.message.includes('Backend is not reachable')) {
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">خطأ في الاتصال</h1>
              <p className="text-gray-600 mb-6">حدث خطأ في الاتصال بالخادم، يرجى المحاولة مرة أخرى لاحقاً</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        )
      }
    }
    
    // Generic error
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">خطأ</h1>
          <p className="text-gray-600 mb-6">حدث خطأ غير متوقع</p>
          <Link 
            href="/"
            className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    )
  }
}
