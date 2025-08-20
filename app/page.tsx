import React from 'react'
import Link from 'next/link'
import { QrCode, Utensils, Smartphone } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/20" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">طلباتك</h1>
            <p className="text-lg text-gray-600">منصة طلبات الطعام الذكية</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <QrCode className="h-24 w-24 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              طلب الطعام أصبح أسهل من أي وقت مضى
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              امسح رمز QR على طاولتك وابدأ في طلب طعامك المفضل
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            لماذا تختار طلباتك؟
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">سهولة الاستخدام</h4>
              <p className="text-gray-600">امسح رمز QR وابدأ في الطلب فوراً</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">قوائم منظمة</h4>
              <p className="text-gray-600">تصفح الأطباق حسب الفئات بسهولة</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">تجربة محسنة</h4>
              <p className="text-gray-600">واجهة سهلة الاستخدام على جميع الأجهزة</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            كيف يعمل النظام؟
          </h3>
          
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">امسح رمز QR</h4>
                <p className="text-gray-600">امسح الرمز الموجود على طاولتك</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">تصفح القائمة</h4>
                <p className="text-gray-600">اختر من بين مجموعة متنوعة من الأطباق</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">أضف إلى السلة</h4>
                <p className="text-gray-600">أضف الأطباق المفضلة مع الكميات المطلوبة</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">أرسل الطلب</h4>
                <p className="text-gray-600">أدخل رقم طاولتك وأرسل طلبك</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            جرب النظام الآن
          </h3>
          <p className="text-gray-600 mb-8">
            يمكنك تجربة النظام مع مطعم تجريبي
          </p>
          <Link 
            href="/restaurants/res_ZkMxjEADv2GkLfv2neVOwKRG"
            className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Utensils className="h-5 w-5 ml-2" />
            تجربة القائمة التجريبية
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">طلباتك</h3>
          <p className="text-gray-400 mb-6">
            منصة طلبات الطعام الذكية للمطاعم والعملاء
          </p>
          <div className="text-sm text-gray-500">
            طلباتك - إحدى منتجات شركة رابح للتقنية. جميع الحقوق محفوظة © 2025
          </div>
        </div>
      </footer>
    </div>
  )
}
