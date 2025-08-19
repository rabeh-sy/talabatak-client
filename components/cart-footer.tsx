'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { submitOrder, formatPrice } from '@/lib/api'
import { BackendOrderRequest } from '@/types'

interface CartFooterProps {
  restaurantId: string
}

export function CartFooter({ restaurantId }: CartFooterProps) {
  const { state, clearCart } = useCart()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tableNumber, setTableNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  // Only hide the cart footer if there are no items AND no dialog is open
  if (state.items.length === 0 && !isDialogOpen) {
    return null
  }
  
  const handleSubmitOrder = async () => {
    if (!tableNumber.trim()) return
    
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const orderData: BackendOrderRequest = {
        order: {
          total: state.total,
          table_number: tableNumber.trim(),
          details: state.items.map(cartItem => ({
            item_id: cartItem.item.id,
            name: cartItem.item.name,
            price: cartItem.item.price,
            quantity: cartItem.quantity
          }))
        }
      }
      
      await submitOrder(restaurantId, orderData)
      setIsSubmitted(true)
      clearCart()
      
      // Close dialog after a delay
      setTimeout(() => {
        setIsDialogOpen(false)
        setIsSubmitted(false)
        setTableNumber('')
      }, 2000)
      
    } catch (error) {
      console.error('Error submitting order:', error)
      setSubmitError('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <>
      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary border-t border-primary/20 p-4 shadow-lg z-50">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-6 w-6 text-secondary" />
            <div>
              <div className="text-sm text-gray-300">المجموع</div>
              <div className="text-lg font-bold text-secondary">{formatPrice(state.total)} ل.س</div>
            </div>
          </div>
          
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-secondary hover:bg-secondary/90 text-gray-900 font-semibold px-6"
          >
            إتمام الطلب
          </Button>
        </div>
      </div>
      
      {/* Table Number Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">أدخل رقم الطاولة</DialogTitle>
          </DialogHeader>
          
          {!isSubmitted ? (
            <>
              <div className="py-4">
                <Input
                  type="text"
                  placeholder="رقم الطاولة"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="text-center text-lg"
                  dir="rtl"
                />
              </div>
              
              {submitError && (
                <div className="mt-3 text-sm text-red-600 text-center">
                  {submitError}
                </div>
              )}
              
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleSubmitOrder}
                  disabled={!tableNumber.trim() || isSubmitting}
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-8 text-center">
              <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                تم إرسال طلبك بنجاح!
              </h3>
              <p className="text-gray-600">
                سيتم إحضار طلبك إلى الطاولة رقم {tableNumber}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
