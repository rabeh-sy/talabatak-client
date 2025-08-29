import { Restaurant, MenuItem, BackendOrderRequest } from '@/types'

const API_BASE_URL = 'http://localhost:3000/api/v1'

// Helper function to format prices with commas
export const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US')
}

// Helper function to group menu items by category
export const groupItemsByCategory = (items: MenuItem[]) => {
  const categoriesMap = new Map<string, MenuItem[]>()
  
  items.forEach(item => {
    if (!categoriesMap.has(item.category)) {
      categoriesMap.set(item.category, [])
    }
    categoriesMap.get(item.category)!.push(item)
  })
  
  return Array.from(categoriesMap.entries()).map(([categoryName, items]) => ({
    id: `cat-${categoryName}`,
    name: categoryName,
    items
  }))
}

export const fetchRestaurantInfo = async (restaurantId: string): Promise<Restaurant> => {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}.json`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Restaurant not found')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: { id?: string; name?: string; logo?: string; status?: 'active' | 'inactive'; view?: 'list' | 'cards'; required_info?: string } = await response.json()
    return {
      id: data.id || restaurantId,
      name: data.name || 'مطعم',
      logo: data.logo || '/api/logo',
      status: data.status || 'active',
      view: data.view || 'list',
      required_info: data.required_info || 'رقم الطاولة'
    }
  } catch (err) {
    if (err instanceof Error && err.message === 'Restaurant not found') {
      throw err
    }
    throw new Error('Backend is not reachable, please try again later')
  }
}

export const fetchMenuItems = async (restaurantId: string): Promise<MenuItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}.json`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Restaurant not found')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data: { menu_items?: Array<Partial<MenuItem> & { id: number; name: string; price: number; category?: string; available?: boolean; image?: string; image_url?: string; description?: string }> } = await response.json()
    
    if (!data.menu_items || !Array.isArray(data.menu_items)) {
      throw new Error('Invalid menu data received')
    }
    
    return data.menu_items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      price: item.price,
      category: item.category || 'أخرى',
      image: item.image,
      image_url: item.image_url,
      available: item.available !== false
    }))
  } catch (err) {
    if (err instanceof Error && err.message === 'Restaurant not found') {
      throw err
    }
    throw new Error('Backend is not reachable, please try again later')
  }
}

export const submitOrder = async (restaurantId: string, orderData: BackendOrderRequest): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/orders.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    })
    
    if (!response.ok) {
      throw new Error(`Order submission failed: ${response.status}`)
    }
    
    // Order submitted successfully
  } catch {
    throw new Error('Something went wrong, please try again')
  }
}
