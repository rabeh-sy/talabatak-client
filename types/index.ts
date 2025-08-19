export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
  available: boolean
}

export interface Category {
  id: string
  name: string
  items: MenuItem[]
}

export interface CartItem {
  item: MenuItem
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  tableNumber: string
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered'
  createdAt: string
}

export interface Restaurant {
  id: string
  name: string
  logo: string
  status: 'active' | 'inactive'
}

export interface BackendOrderRequest {
  order: {
    total: number
    table_number: string
    details: Array<{
      item_id: number
      name: string
      price: number
      quantity: number
    }>
  }
}
