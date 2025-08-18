'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { submitOrder } from '@/lib/mock-data'
import { Order } from '@/types'

export function CartFooter() {
  const { state, clearCart } = useCart()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [tableNumber, setTableNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  if (state.items.length === 0) {
    return null
  }
  
  const handleSubmitOrder = async () => {
    if (!tableNumber.trim()) return
    
    setIsSubmitting(true)
    
    try {
      const orderData: Omit<Order, 'id' | 'status' | 'createdAt'> = {
        items: state.items,
        tableNumber: tableNumber.trim(),
        total: state.total
      }
      
      await submitOrder(orderData)
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
      // You could show an error toast here
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <>
      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <div>
              <div className="text-sm text-gray-600">المجموع</div>
              <div className="text-lg font-bold text-primary">{state.total} د.ك</div>
            </div>
          </div>
          
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-primary hover:bg-primary/90 text-white px-6"
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
