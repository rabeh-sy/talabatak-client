'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Check, X } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { submitOrder, formatPrice } from '@/lib/api'
import { convertArabicDigitsToEnglish } from '@/lib/utils'
import { BackendOrderRequest, OrderField } from '@/types'

interface CartFooterProps {
  restaurantId: string
  primaryField?: OrderField
  secondaryField?: OrderField
  currency: string
  themeColor: 'green' | 'yellow' | 'blue' | 'red' | 'black'
}

// Helper function to get theme colors
const getThemeColors = (themeColor: 'green' | 'yellow' | 'blue' | 'red' | 'black') => {
  switch (themeColor) {
    case 'green':
      return {
        primary: 'bg-primary',
        primaryHover: 'hover:bg-primary/90',
        secondary: 'bg-secondary',
        secondaryHover: 'hover:bg-secondary/90',
        textSecondary: 'text-secondary',
        bgSecondary: 'bg-secondary',
        buttonPrimary: 'bg-primary hover:bg-primary/90',
        buttonSecondary: 'bg-secondary hover:bg-secondary/90'
      }
    case 'yellow':
      return {
        primary: 'bg-yellow-600',
        primaryHover: 'hover:bg-yellow-700',
        secondary: 'bg-yellow-100',
        secondaryHover: 'hover:bg-yellow-200',
        textSecondary: 'text-secondary',
        bgSecondary: 'bg-yellow-100',
        buttonPrimary: 'bg-yellow-600 hover:bg-yellow-700',
        buttonSecondary: 'bg-yellow-100 hover:bg-yellow-200'
      }
    case 'blue':
      return {
        primary: 'bg-blue-600',
        primaryHover: 'hover:bg-blue-700',
        secondary: 'bg-blue-100',
        secondaryHover: 'hover:bg-blue-200',
        textSecondary: 'text-secondary',
        bgSecondary: 'bg-blue-100',
        buttonPrimary: 'bg-blue-600 hover:bg-blue-700',
        buttonSecondary: 'bg-blue-100 hover:bg-blue-200'
      }
    case 'red':
      return {
        primary: 'bg-red-800',
        primaryHover: 'hover:bg-red-900',
        secondary: 'bg-red-100',
        secondaryHover: 'hover:bg-red-200',
        textSecondary: 'text-secondary',
        bgSecondary: 'bg-red-100',
        buttonPrimary: 'bg-red-800 hover:bg-red-900',
        buttonSecondary: 'bg-red-100 hover:bg-red-200'
      }
    case 'black':
      return {
        primary: 'bg-gray-800',
        primaryHover: 'hover:bg-gray-900',
        secondary: 'bg-gray-200',
        secondaryHover: 'hover:bg-gray-300',
        textSecondary: 'text-secondary',
        bgSecondary: 'bg-gray-200',
        buttonPrimary: 'bg-gray-800 hover:bg-gray-900',
        buttonSecondary: 'bg-gray-200 hover:bg-gray-300'
      }
    default:
      return {
        primary: 'bg-primary',
        primaryHover: 'hover:bg-primary/90',
        secondary: 'bg-secondary',
        secondaryHover: 'hover:bg-secondary/90',
        textSecondary: 'text-secondary',
        bgSecondary: 'bg-secondary',
        buttonPrimary: 'bg-primary hover:bg-primary/90',
        buttonSecondary: 'bg-secondary hover:bg-secondary/90'
      }
  }
}

// Mobile Bottom Sheet Modal
const MobileModal = ({ 
  isOpen, 
  primaryField,
  secondaryField,
  fieldValues,
  setFieldValue,
  submitError, 
  isSubmitting, 
  isSubmitted, 
  onSubmit, 
  onClose 
}: {
  isOpen: boolean
  primaryField?: OrderField
  secondaryField?: OrderField
  fieldValues: Record<string, string>
  setFieldValue: (fieldName: string, value: string) => void
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
            <h2 className="text-xl font-semibold text-gray-900">أدخل معلومات الطلب</h2>
          </div>
          
          {!isSubmitted ? (
            <>
              {/* Primary Field */}
              {primaryField?.shown && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    {primaryField.label}
                    {primaryField.required && <span className="text-red-500 mr-1">*</span>}
                  </label>
                  <Input
                    type={primaryField.type === 'number' ? 'number' : 'text'}
                    placeholder={primaryField.placeholder}
                    value={fieldValues[primaryField.name] || ''}
                    onChange={(e) => setFieldValue(primaryField.name, e.target.value)}
                    className="text-center text-lg h-14"
                    dir="rtl"
                    autoFocus
                    inputMode={primaryField.type === 'number' ? 'numeric' : 'text'}
                    pattern={primaryField.type === 'number' ? '[0-9٠١٢٣٤٥٦٧٨٩]*' : undefined}
                  />
                </div>
              )}
              
              {/* Secondary Field */}
              {secondaryField?.shown && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    {secondaryField.label}
                    {secondaryField.required && <span className="text-red-500 mr-1">*</span>}
                  </label>
                  <Input
                    type="text"
                    placeholder={secondaryField.placeholder}
                    value={fieldValues[secondaryField.name] || ''}
                    onChange={(e) => setFieldValue(secondaryField.name, e.target.value)}
                    className="text-center text-lg h-14"
                    dir="rtl"
                  />
                </div>
              )}
              
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
                  disabled={!isFormValid(fieldValues, primaryField, secondaryField) || isSubmitting}
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
                سيتم معالجة طلبك قريباً
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// Helper function to validate form
const isFormValid = (fieldValues: Record<string, string>, primaryField?: OrderField, secondaryField?: OrderField): boolean => {
  if (primaryField?.required && (!fieldValues[primaryField.name] || fieldValues[primaryField.name].trim() === '')) {
    return false
  }
  if (secondaryField?.required && (!fieldValues[secondaryField.name] || fieldValues[secondaryField.name].trim() === '')) {
    return false
  }
  return true
}

export function CartFooter({ restaurantId, primaryField, secondaryField, currency, themeColor }: CartFooterProps) {
  const { state, clearCart } = useCart()
  const [isMounted, setIsMounted] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  const themeColors = getThemeColors(themeColor)
  
  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Detect mobile device
  useEffect(() => {
    if (!isMounted) return
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [isMounted])
  
  const setFieldValue = useCallback((fieldName: string, value: string) => {
    setFieldValues(prev => ({ ...prev, [fieldName]: value }))
  }, [])
  
  const handleSubmitOrder = useCallback(async () => {
    if (!isFormValid(fieldValues, primaryField, secondaryField)) return
    
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Convert Arabic digits to English digits for number fields
      const processedFields: Record<string, string> = {}
      
      if (primaryField?.shown) {
        const value = fieldValues[primaryField.name] || ''
        processedFields[primaryField.name] = primaryField.type === 'number' 
          ? convertArabicDigitsToEnglish(value.trim())
          : value.trim()
      }
      
      if (secondaryField?.shown) {
        const value = fieldValues[secondaryField.name] || ''
        processedFields[secondaryField.name] = secondaryField.type === 'number' 
          ? convertArabicDigitsToEnglish(value.trim())
          : value.trim()
      }
      
      const orderData: BackendOrderRequest = {
        order: {
          total: state.total,
          fields: processedFields,
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
        setFieldValues({})
      }, 2000)
      
    } catch (error) {
      console.error('Error submitting order:', error)
      setSubmitError('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.')
    } finally {
      setIsSubmitting(false)
    }
  }, [fieldValues, state.total, state.items, restaurantId, clearCart, primaryField, secondaryField])

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false)
    setFieldValues({})
    setSubmitError(null)
  }, [])
  
  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null
  }
  
  // Only hide the cart footer if there are no items AND no dialog is open
  if (state.items.length === 0 && !isDialogOpen) {
    return null
  }
  
  return (
    <>
      {/* Sticky Footer */}
      <div className={`fixed bottom-0 left-0 right-0 ${themeColors.primary} border-t border-opacity-20 p-4 shadow-lg z-50`}>
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <ShoppingCart className={`h-6 w-6 ${themeColors.textSecondary}`} />
            <div>
              <div className="text-sm text-gray-300">المجموع</div>
              <div className={`text-lg font-bold ${themeColors.textSecondary}`}>{formatPrice(state.total)} {currency}</div>
            </div>
          </div>
          
          <Button
            onClick={() => setIsDialogOpen(true)}
            className={`${themeColors.buttonSecondary} text-gray-900 font-semibold px-6`}
          >
            إتمام الطلب
          </Button>
        </div>
      </div>
      
      {/* Show mobile modal on mobile, desktop dialog on desktop */}
      {isMobile ? (
        <MobileModal
          isOpen={isDialogOpen}
          primaryField={primaryField}
          secondaryField={secondaryField}
          fieldValues={fieldValues}
          setFieldValue={setFieldValue}
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
              <DialogTitle className="text-right">أدخل معلومات الطلب</DialogTitle>
            </DialogHeader>
            
            {!isSubmitted ? (
              <>
                {/* Primary Field */}
                {primaryField?.shown && (
                  <div className="py-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      {primaryField.label}
                      {primaryField.required && <span className="text-red-500 mr-1">*</span>}
                    </label>
                    <Input
                      type={primaryField.type === 'number' ? 'number' : 'text'}
                      placeholder={primaryField.placeholder}
                      value={fieldValues[primaryField.name] || ''}
                      onChange={(e) => setFieldValue(primaryField.name, e.target.value)}
                      className="text-center text-lg"
                      dir="rtl"
                      pattern={primaryField.type === 'number' ? '[0-9٠١٢٣٤٥٦٧٨٩]*' : undefined}
                    />
                  </div>
                )}
                
                {/* Secondary Field */}
                {secondaryField?.shown && (
                  <div className="py-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      {secondaryField.label}
                      {secondaryField.required && <span className="text-red-500 mr-1">*</span>}
                    </label>
                    <Input
                      type="text"
                      placeholder={secondaryField.placeholder}
                      value={fieldValues[secondaryField.name] || ''}
                      onChange={(e) => setFieldValue(secondaryField.name, e.target.value)}
                      className="text-center text-lg"
                      dir="rtl"
                    />
                  </div>
                )}
                
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
                    disabled={!isFormValid(fieldValues, primaryField, secondaryField) || isSubmitting}
                    className={`w-full sm:w-auto ${themeColors.buttonPrimary}`}
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
                  سيتم معالجة طلبك قريباً
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
