import React from 'react'
import { Metadata } from 'next'
import { fetchRestaurantInfo } from '@/lib/api'
import { RestaurantPageClient } from './restaurant-page-client'

interface RestaurantPageProps {
  params: Promise<{
    restaurantId: string
  }>
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const { restaurantId } = await params
  
  try {
    const restaurant = await fetchRestaurantInfo(restaurantId)
    
    // Handle inactive restaurants
    if (restaurant.status === 'inactive') {
      return {
        title: `${restaurant.name} - الخدمة متوقفة - طلباتك`,
        description: `عذراً، الخدمة متوقفة حالياً في ${restaurant.name}`,
        robots: {
          index: false,
          follow: false,
        },
        openGraph: {
          title: `${restaurant.name} - الخدمة متوقفة - طلباتك`,
          description: `عذراً، الخدمة متوقفة حالياً في ${restaurant.name}`,
          type: 'website',
        },
      }
    }
    
    return {
      title: `${restaurant.name} - طلباتك`,
      description: `تصفح قائمة الطعام في ${restaurant.name} واطلب طعامك المفضل`,
      robots: {
        index: false,
        follow: false,
      },
      openGraph: {
        title: `${restaurant.name} - طلباتك`,
        description: `تصفح قائمة الطعام في ${restaurant.name} واطلب طعامك المفضل`,
        type: 'website',
        images: restaurant.logo ? [
          {
            url: restaurant.logo,
            width: 400,
            height: 400,
            alt: restaurant.name,
          }
        ] : undefined,
      },
    }
  } catch {
    return {
      title: 'مطعم - طلباتك',
      description: 'تصفح قائمة الطعام واطلب طعامك المفضل',
      robots: {
        index: false,
        follow: false,
      },
      openGraph: {
        title: 'مطعم - طلباتك',
        description: 'تصفح قائمة الطعام واطلب طعامك المفضل',
        type: 'website',
      },
    }
  }
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = await params
  
  return <RestaurantPageClient restaurantId={restaurantId} />
}
