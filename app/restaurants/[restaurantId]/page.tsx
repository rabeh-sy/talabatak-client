import React from 'react'
import { RestaurantPageClient } from './restaurant-page-client'

interface RestaurantPageProps {
  params: Promise<{
    restaurantId: string
  }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantId } = await params
  
  return <RestaurantPageClient restaurantId={restaurantId} />
}
