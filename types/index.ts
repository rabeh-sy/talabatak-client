export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
  image_url?: string
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

export interface OrderField {
  name: string
  label: string
  type: 'number' | 'string'
  placeholder: string
  shown: boolean
  required: boolean
}

export interface Restaurant {
  id: string
  name: string
  logo: string
  status: 'active' | 'inactive'
  view_mode?: 'list' | 'cards'
  primary_field?: OrderField
  secondary_field?: OrderField
}

export interface BackendOrderRequest {
  order: {
    total: number
    fields: Record<string, string>
    details: Array<{
      item_id: number
      name: string
      price: number
      quantity: number
    }>
  }
}
