'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Check, X } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { submitOrder, formatPrice } from '@/lib/api'
import { convertArabicDigitsToEnglish } from '@/lib/utils'
import { BackendOrderRequest } from '@/types'

interface CartFooterProps {
  restaurantId: string
  requiredInfo: string
}

// Mobile Bottom Sheet Modal - moved outside to prevent re-creation
const MobileModal = ({ 
  isOpen, 
  requiredInfo,
  requiredInfoValue, 
  setRequiredInfoValue, 
  submitError, 
  isSubmitting, 
  isSubmitted, 
  onSubmit, 
  onClose 
}: {
  isOpen: boolean
  requiredInfo: string
  requiredInfoValue: string
  setRequiredInfoValue: (value: string) => void
  submitError: string | null
  isSubmitting: boolean
  isSubmitted: boolean
  onSubmit: () => void
  onClose: () => void
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 md:hidden"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-out">
        <div className="p-6">
          {/* Handle bar */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">أدخل {requiredInfo}</h2>
          </div>
          
          {!isSubmitted ? (
            <>
              {/* Input */}
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder={requiredInfo}
                  value={requiredInfoValue}
                  onChange={(e) => setRequiredInfoValue(e.target.value)}
                  className="text-center text-lg h-14"
                  dir="rtl"
                  autoFocus
                  inputMode="numeric"
                  pattern="[0-9٠١٢٣٤٥٦٧٨٩]*"
                />
              </div>
              
              {/* Error message */}
              {submitError && (
                <div className="mb-4 text-sm text-red-600 text-center">
                  {submitError}
                </div>
              )}
              
              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={onSubmit}
                  disabled={!requiredInfoValue.trim() || isSubmitting}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-lg font-semibold"
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full h-14 text-lg font-semibold"
                >
                  إلغاء
                </Button>
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                تم إرسال طلبك بنجاح!
              </h3>
              <p className="text-gray-600">
                سيتم إحضار طلبك إلى {requiredInfo} {convertArabicDigitsToEnglish(requiredInfoValue)}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export function CartFooter({ restaurantId, requiredInfo }: CartFooterProps) {
  const { state, clearCart } = useCart()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [requiredInfoValue, setRequiredInfoValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const handleSubmitOrder = useCallback(async () => {
    if (!requiredInfoValue.trim()) return
    
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Convert Arabic digits to English digits before sending to backend
      const convertedRequiredInfoValue = convertArabicDigitsToEnglish(requiredInfoValue.trim())
      
      const orderData: BackendOrderRequest = {
        order: {
          total: state.total,
          required_info: convertedRequiredInfoValue,
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
        setRequiredInfoValue('')
      }, 2000)
      
    } catch (error) {
      console.error('Error submitting order:', error)
      setSubmitError('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }, [requiredInfoValue, state.total, state.items, restaurantId, clearCart])

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false)
    setRequiredInfoValue('')
    setSubmitError(null)
  }, [])
  
  // Only hide the cart footer if there are no items AND no dialog is open
  if (state.items.length === 0 && !isDialogOpen) {
    return null
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
      
      {/* Show mobile modal on mobile, desktop dialog on desktop */}
      {isMobile ? (
        <MobileModal
          isOpen={isDialogOpen}
          requiredInfo={requiredInfo}
          requiredInfoValue={requiredInfoValue}
          setRequiredInfoValue={setRequiredInfoValue}
          submitError={submitError}
          isSubmitting={isSubmitting}
          isSubmitted={isSubmitted}
          onSubmit={handleSubmitOrder}
          onClose={closeDialog}
        />
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-right">أدخل {requiredInfo}</DialogTitle>
            </DialogHeader>
            
            {!isSubmitted ? (
              <>
                <div className="py-4">
                  <Input
                    type="text"
                    placeholder={requiredInfo}
                    value={requiredInfoValue}
                    onChange={(e) => setRequiredInfoValue(e.target.value)}
                    className="text-center text-lg"
                    dir="rtl"
                    pattern="[0-9٠١٢٣٤٥٦٧٨٩]*"
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
                    disabled={!requiredInfoValue.trim() || isSubmitting}
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
                  سيتم إحضار طلبك إلى {requiredInfo} {convertArabicDigitsToEnglish(requiredInfoValue)}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
