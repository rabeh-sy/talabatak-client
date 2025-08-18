import { MenuItem, Category, Restaurant, Order } from '@/types'

export const mockRestaurants: Record<string, Restaurant> = {
  'demo-restaurant-001': {
    id: 'demo-restaurant-001',
    name: 'مطعم القروستو',
    logo: '/api/logo',
    theme: {
      primaryColor: '#103935',
      secondaryColor: '#E6E6DC'
    }
  },
  'restaurant-002': {
    id: 'restaurant-002',
    name: 'مطعم الشرق',
    logo: '/api/logo-2',
    theme: {
      primaryColor: '#8B4513',
      secondaryColor: '#F5DEB3'
    }
  },
  'restaurant-003': {
    id: 'restaurant-003',
    name: 'مطعم البحر المتوسط',
    logo: '/api/logo-3',
    theme: {
      primaryColor: '#006994',
      secondaryColor: '#E6F3FF'
    }
  }
}

export const mockMenuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'item-001',
    name: 'حمص',
    description: 'حمص طازج مع زيت الزيتون والليمون',
    price: 15,
    category: 'مقبلات',
    available: true
  },
  {
    id: 'item-002',
    name: 'تبولة',
    description: 'تبولة لبنانية تقليدية مع البقدونس والبرغل',
    price: 18,
    category: 'مقبلات',
    available: true
  },
  {
    id: 'item-003',
    name: 'متبل',
    description: 'باذنجان مشوي مع الطحينة والثوم',
    price: 16,
    category: 'مقبلات',
    available: true
  },
  
  // Main Dishes
  {
    id: 'item-004',
    name: 'شاورما دجاج',
    description: 'شاورما دجاج مع خبز صاج وخضروات طازجة',
    price: 28,
    category: 'أطباق رئيسية',
    available: true
  },
  {
    id: 'item-005',
    name: 'كباب لحم',
    description: 'كباب لحم مشوي مع أرز وخضروات',
    price: 35,
    category: 'أطباق رئيسية',
    available: true
  },
  {
    id: 'item-006',
    name: 'مشاوي مشكلة',
    description: 'مشكلة من الدجاج واللحم مع صلصة الثوم',
    price: 42,
    category: 'أطباق رئيسية',
    available: true
  },
  
  // Salads
  {
    id: 'item-007',
    name: 'سلطة خضراء',
    description: 'سلطة خضراء طازجة مع صلصة زيت الزيتون',
    price: 20,
    category: 'سلطات',
    available: true
  },
  {
    id: 'item-008',
    name: 'سلطة فتوش',
    description: 'سلطة فتوش لبنانية مع خبز مقرمش',
    price: 22,
    category: 'سلطات',
    available: true
  },
  
  // Drinks
  {
    id: 'item-009',
    name: 'عصير برتقال طازج',
    description: 'عصير برتقال طازج مع الثلج',
    price: 12,
    category: 'مشروبات',
    available: true
  },
  {
    id: 'item-010',
    name: 'عصير ليمون',
    description: 'عصير ليمون طازج مع النعناع',
    price: 10,
    category: 'مشروبات',
    available: true
  },
  
  // Desserts
  {
    id: 'item-011',
    name: 'كنافة',
    description: 'كنافة تقليدية مع جبنة وجوز',
    price: 25,
    category: 'حلويات',
    available: true
  },
  {
    id: 'item-012',
    name: 'بقلاوة',
    description: 'بقلاوة مع عسل وجوز',
    price: 20,
    category: 'حلويات',
    available: true
  }
]

export const mockCategories: Category[] = [
  {
    id: 'cat-001',
    name: 'مقبلات',
    items: mockMenuItems.filter(item => item.category === 'مقبلات')
  },
  {
    id: 'cat-002',
    name: 'أطباق رئيسية',
    items: mockMenuItems.filter(item => item.category === 'أطباق رئيسية')
  },
  {
    id: 'cat-003',
    name: 'سلطات',
    items: mockMenuItems.filter(item => item.category === 'سلطات')
  },
  {
    id: 'cat-004',
    name: 'مشروبات',
    items: mockMenuItems.filter(item => item.category === 'مشروبات')
  },
  {
    id: 'cat-005',
    name: 'حلويات',
    items: mockMenuItems.filter(item => item.category === 'حلويات')
  }
]

// Simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const fetchRestaurantInfo = async (restaurantId?: string): Promise<Restaurant> => {
  await delay(1000) // Simulate network delay
  
  // If no restaurantId provided, return the demo restaurant
  const id = restaurantId || 'demo-restaurant-001'
  const restaurant = mockRestaurants[id]
  
  if (!restaurant) {
    throw new Error(`Restaurant with ID ${id} not found`)
  }
  
  return restaurant
}

export const fetchMenuItems = async (restaurantId?: string): Promise<Category[]> => {
  await delay(1500) // Simulate network delay
  
  // In a real app, you would fetch menu items specific to the restaurant
  // For now, we'll return the same menu for all restaurants
  // You can modify this to return different menus based on restaurantId
  console.log(`Fetching menu for restaurant: ${restaurantId}`)
  
  return mockCategories
}

export const submitOrder = async (order: Omit<Order, 'id' | 'status' | 'createdAt'>): Promise<Order> => {
  await delay(2000) // Simulate network delay
  
  const newOrder: Order = {
    ...order,
    id: `order-${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  
  return newOrder
}
