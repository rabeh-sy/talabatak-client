import React from 'react'
import Link from 'next/link'
import { fetchRestaurantInfo, fetchMenuItems } from '@/lib/mock-data'
import { RestaurantMenu } from '@/components/restaurant-menu'

interface RestaurantPageProps {
  params: Promise<{
    restaurantId: string
  }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = await params
  
  try {
    const [restaurant, categories] = await Promise.all([
      fetchRestaurantInfo(restaurantId),
      fetchMenuItems(restaurantId)
    ])
    
    return <RestaurantMenu restaurant={restaurant} categories={categories} restaurantId={restaurantId} />
  } catch {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">خطأ</h1>
          <p className="text-gray-600">لم يتم العثور على المطعم</p>
          <Link 
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    )
  }
}
