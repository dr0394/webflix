import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Truck, User, Mail, Phone, MessageSquare, ShoppingCart } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image_url: string;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    deliveryMethod: 'pickup',
    pickupDate: '',
    pickupTime: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedCart = localStorage.getItem('zwickels_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      navigate('/demo/metzgerei/shop');
    }

    // Set minimum pickup date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, pickupDate: minDate }));
  }, [navigate]);

  const pickupTimes = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00'
  ];

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Bitte geben Sie Ihren Namen ein';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Bitte geben Sie Ihre E-Mail ein';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Bitte geben Sie eine gültige E-Mail ein';
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Bitte geben Sie Ihre Telefonnummer ein';
    }

    if (formData.deliveryMethod === 'delivery' && !formData.customerAddress.trim()) {
      newErrors.customerAddress = 'Bitte geben Sie Ihre Lieferadresse ein';
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Bitte wählen Sie ein Datum';
    }

    if (!formData.pickupTime) {
      newErrors.pickupTime = 'Bitte wählen Sie eine Uhrzeit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ZW${year}${month}${day}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const orderNumber = generateOrderNumber();
      const totalAmount = getTotalAmount();

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('zwickels_orders')
        .insert([
          {
            order_number: orderNumber,
            customer_name: formData.customerName,
            customer_email: formData.customerEmail,
            customer_phone: formData.customerPhone,
            customer_address: formData.customerAddress || null,
            delivery_method: formData.deliveryMethod,
            pickup_date: formData.pickupDate,
            pickup_time: formData.pickupTime,
            notes: formData.notes || null,
            status: 'pending',
            total_amount: totalAmount
          }
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        price_per_unit: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('zwickels_order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      localStorage.removeItem('zwickels_cart');

      // Navigate to confirmation
      navigate(`/demo/metzgerei/order-confirmation/${orderNumber}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Es gab einen Fehler beim Erstellen Ihrer Bestellung. Bitte versuchen Sie es erneut oder rufen Sie uns an.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#2D5F3F] text-white py-4">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/demo/metzgerei/shop')}
            className="flex items-center gap-2 hover:text-[#8BC34A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück zum Showroom</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Bestellung <span className="text-[#2D5F3F]">abschließen</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-[#2D5F3F]" />
                    Ihre Daten
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8BC34A] focus:border-transparent ${
                          errors.customerName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Max Mustermann"
                      />
                      {errors.customerName && (
                        <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        value={formData.customerEmail}
                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8BC34A] focus:border-transparent ${
                          errors.customerEmail ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="max@beispiel.de"
                      />
                      {errors.customerEmail && (
                        <p className="mt-1 text-sm text-red-600">{errors.customerEmail}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        value={formData.customerPhone}
                        onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8BC34A] focus:border-transparent ${
                          errors.customerPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0123 456789"
                      />
                      {errors.customerPhone && (
                        <p className="mt-1 text-sm text-red-600">{errors.customerPhone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-[#2D5F3F]" />
                    Abholung oder Lieferung
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryMethod: 'pickup' })}
                      className={`p-6 border-2 rounded-xl transition-all ${
                        formData.deliveryMethod === 'pickup'
                          ? 'border-[#2D5F3F] bg-green-50'
                          : 'border-gray-300 hover:border-[#8BC34A]'
                      }`}
                    >
                      <MapPin className="w-8 h-8 text-[#2D5F3F] mb-3 mx-auto" />
                      <h3 className="font-bold text-lg mb-2">Abholung</h3>
                      <p className="text-sm text-gray-600">Kostenlos im Store abholen</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryMethod: 'delivery' })}
                      className={`p-6 border-2 rounded-xl transition-all ${
                        formData.deliveryMethod === 'delivery'
                          ? 'border-[#2D5F3F] bg-green-50'
                          : 'border-gray-300 hover:border-[#8BC34A]'
                      }`}
                    >
                      <Truck className="w-8 h-8 text-[#2D5F3F] mb-3 mx-auto" />
                      <h3 className="font-bold text-lg mb-2">Lieferung</h3>
                      <p className="text-sm text-gray-600">Kostenlos ab 50€</p>
                    </button>
                  </div>

                  {formData.deliveryMethod === 'delivery' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lieferadresse *
                      </label>
                      <textarea
                        value={formData.customerAddress}
                        onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8BC34A] focus:border-transparent ${
                          errors.customerAddress ? 'border-red-500' : 'border-gray-300'
                        }`}
                        rows={3}
                        placeholder="Straße und Hausnummer&#10;PLZ und Ort"
                      />
                      {errors.customerAddress && (
                        <p className="mt-1 text-sm text-red-600">{errors.customerAddress}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Pickup Date and Time */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-[#2D5F3F]" />
                    Wann möchten Sie {formData.deliveryMethod === 'pickup' ? 'abholen' : 'beliefert werden'}?
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Datum *
                      </label>
                      <input
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                        min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8BC34A] focus:border-transparent ${
                          errors.pickupDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.pickupDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.pickupDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Uhrzeit *
                      </label>
                      <select
                        value={formData.pickupTime}
                        onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8BC34A] focus:border-transparent ${
                          errors.pickupTime ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Bitte wählen...</option>
                        {pickupTimes.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      {errors.pickupTime && (
                        <p className="mt-1 text-sm text-red-600">{errors.pickupTime}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-[#2D5F3F]" />
                    Besondere Wünsche (optional)
                  </h2>

                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8BC34A] focus:border-transparent"
                    rows={4}
                    placeholder="Z.B. besondere Zuschnittwünsche, Verpackungswünsche, etc."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#2D5F3F] to-[#3E7C57] hover:from-[#3E7C57] hover:to-[#2D5F3F] text-white py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Bestellung wird erstellt...' : 'Zahlungspflichtig bestellen'}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  * Pflichtfelder | Bezahlung bei Abholung/Lieferung
                </p>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-[#2D5F3F]" />
                  Ihre Bestellung
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.quantity} {item.unit} × {item.price.toFixed(2)}€
                        </p>
                        <p className="font-bold text-[#2D5F3F]">
                          {(item.quantity * item.price).toFixed(2)}€
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-lg">
                    <span>Zwischensumme:</span>
                    <span className="font-bold">{getTotalAmount().toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-lg text-green-600">
                    <span>Versand:</span>
                    <span className="font-bold">Kostenlos</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-2xl font-bold">
                    <span>Gesamt:</span>
                    <span className="text-[#2D5F3F]">{getTotalAmount().toFixed(2)}€</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong className="text-[#2D5F3F]">Zahlungshinweis:</strong><br />
                    Die Bezahlung erfolgt bei Abholung oder Lieferung. Wir akzeptieren Barzahlung und EC-Karte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
