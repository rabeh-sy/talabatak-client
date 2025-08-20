'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchRestaurantInfo, fetchMenuItems, groupItemsByCategory } from '@/lib/api'
import { RestaurantMenu } from '@/components/restaurant-menu'
import { InactiveRestaurant } from '@/components/inactive-restaurant'
import { MenuSkeleton } from '@/components/menu-skeleton'
import { Restaurant, Category } from '@/types'

interface RestaurantPageClientProps {
  restaurantId: string
}

export function RestaurantPageClient({ restaurantId }: RestaurantPageClientProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorType, setErrorType] = useState<'not_found' | 'connection' | 'generic' | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        setErrorType(null)

        const [restaurantData, menuItems] = await Promise.all([
          fetchRestaurantInfo(restaurantId),
          fetchMenuItems(restaurantId)
        ])

        // Check if restaurant is inactive
        if (restaurantData.status === 'inactive') {
          setRestaurant(restaurantData)
          setIsLoading(false)
          return
        }

        // Group menu items by category
        const groupedCategories = groupItemsByCategory(menuItems)
        
        setRestaurant(restaurantData)
        setCategories(groupedCategories)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching restaurant data:', error)
        
        if (error instanceof Error) {
          if (error.message === 'Restaurant not found') {
            setErrorType('not_found')
          } else if (error.message.includes('Backend is not reachable')) {
            setErrorType('connection')
          } else {
            setErrorType('generic')
          }
        } else {
          setErrorType('generic')
        }
        
        setError(error instanceof Error ? error.message : 'حدث خطأ غير متوقع')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [restaurantId])

  // Show skeleton while loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-beige" dir="rtl">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <MenuSkeleton />
        </div>
      </div>
    )
  }

  // Show inactive restaurant
  if (restaurant?.status === 'inactive') {
    return <InactiveRestaurant restaurantName={restaurant.name} />
  }

  // Show error states
  if (error) {
    if (errorType === 'not_found') {
      return (
        <div className="min-h-screen bg-warm-beige flex items-center justify-center" dir="rtl">
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
    } else if (errorType === 'connection') {
      return (
        <div className="min-h-screen bg-warm-beige flex items-center justify-center" dir="rtl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">خطأ في الاتصال</h1>
            <p className="text-gray-600 mb-6">حدث خطأ في الاتصال بالخادم، يرجى المحاولة مرة أخرى لاحقاً</p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="min-h-screen bg-warm-beige flex items-center justify-center" dir="rtl">
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

  // Show restaurant menu
  if (restaurant && categories.length > 0) {
    return <RestaurantMenu restaurant={restaurant} categories={categories} restaurantId={restaurantId} />
  }

  // Fallback - should not reach here
  return (
    <div className="min-h-screen bg-warm-beige flex items-center justify-center" dir="rtl">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">لا توجد بيانات</h1>
        <p className="text-gray-600 mb-6">لم يتم العثور على بيانات المطعم</p>
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
