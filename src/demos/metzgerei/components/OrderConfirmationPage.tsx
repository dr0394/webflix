import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Phone, Mail, ShoppingBag, Home } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_method: string;
  pickup_date: string;
  pickup_time: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface OrderItem {
  product_name: string;
  quantity: number;
  unit: string;
  price_per_unit: number;
  total_price: number;
}

const OrderConfirmationPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber]);

  const fetchOrder = async () => {
    try {
      // Fetch order
      const { data: orderData, error: orderError } = await supabase
        .from('zwickels_orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      // Fetch order items
      const { data: itemsData, error: itemsError } = await supabase
        .from('zwickels_order_items')
        .select('*')
        .eq('order_id', orderData.id);

      if (itemsError) throw itemsError;
      setOrderItems(itemsData || []);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D5F3F] mb-4"></div>
          <p className="text-gray-600">Bestellung wird geladen...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Bestellung nicht gefunden</p>
          <button
            onClick={() => navigate('/demo/metzgerei')}
            className="bg-[#2D5F3F] hover:bg-[#3E7C57] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Zur Startseite
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-[#2D5F3F] text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://zwickels.de/wp-content/uploads/2021/02/cropped-image0-1.png"
              alt="Zwickels Logo"
              className="h-12 w-auto"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Vielen Dank für Ihre Bestellung!
            </h1>

            <p className="text-xl text-gray-600 mb-6">
              Ihre Bestellung wurde erfolgreich aufgegeben und wird bearbeitet.
            </p>

            <div className="inline-block bg-gradient-to-r from-[#2D5F3F] to-[#3E7C57] text-white px-8 py-4 rounded-lg mb-6">
              <p className="text-sm mb-1">Ihre Bestellnummer:</p>
              <p className="text-3xl font-bold">{order.order_number}</p>
            </div>

            <p className="text-gray-600">
              Sie erhalten in Kürze eine Bestätigungsmail an <strong>{order.customer_email}</strong>
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bestelldetails</h2>

            <div className="space-y-6">
              {/* Customer Info */}
              <div className="border-b pb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Kundendaten</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-[#2D5F3F]" />
                    </div>
                    <span>{order.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#2D5F3F]" />
                    </div>
                    <span>{order.customer_email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#2D5F3F]" />
                    </div>
                    <span>{order.customer_phone}</span>
                  </div>
                </div>
              </div>

              {/* Pickup/Delivery Info */}
              <div className="border-b pb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  {order.delivery_method === 'pickup' ? 'Abholung' : 'Lieferung'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#2D5F3F]" />
                    </div>
                    <span>{formatDate(order.pickup_date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#2D5F3F]" />
                    </div>
                    <span>{order.pickup_time} Uhr</span>
                  </div>
                  {order.delivery_method === 'pickup' && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#2D5F3F]" />
                      </div>
                      <div>
                        <p className="font-semibold">Nevigeser Str. 291</p>
                        <p>42553 Velbert</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="border-b pb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">Ihre Produkte</h3>
                <div className="space-y-3">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{item.product_name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} {item.unit} × {item.price_per_unit.toFixed(2)}€
                        </p>
                      </div>
                      <div className="font-bold text-[#2D5F3F]">
                        {item.total_price.toFixed(2)}€
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Gesamtbetrag:</span>
                <span className="text-[#2D5F3F]">{order.total_amount.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-[#2D5F3F] to-[#3E7C57] rounded-2xl shadow-xl p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-6">Wie geht es weiter?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Bestätigung per E-Mail</h3>
                  <p className="text-green-100">
                    Sie erhalten eine Bestätigungsmail mit allen Details zu Ihrer Bestellung.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Vorbereitung</h3>
                  <p className="text-green-100">
                    Wir bereiten Ihre Bestellung frisch für Sie vor und verpacken alles sorgfältig.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">
                    {order.delivery_method === 'pickup' ? 'Abholung' : 'Lieferung'}
                  </h3>
                  <p className="text-green-100">
                    {order.delivery_method === 'pickup'
                      ? 'Holen Sie Ihre Bestellung zum vereinbarten Termin in unserem Store ab.'
                      : 'Wir liefern Ihre Bestellung zum vereinbarten Termin zu Ihnen nach Hause.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Bezahlung</h3>
                  <p className="text-green-100">
                    Die Bezahlung erfolgt {order.delivery_method === 'pickup' ? 'bei Abholung' : 'bei Lieferung'}
                    {' '}per Barzahlung oder EC-Karte.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fragen zu Ihrer Bestellung?</h2>
            <p className="text-gray-700 mb-6">
              Bei Fragen zu Ihrer Bestellung erreichen Sie uns jederzeit:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="tel:+491609508982​9"
                className="flex items-center gap-3 bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Phone className="w-6 h-6 text-[#2D5F3F]" />
                <div>
                  <p className="text-sm text-gray-600">Telefon / WhatsApp</p>
                  <p className="font-semibold text-[#2D5F3F]">0160 950 898 29</p>
                </div>
              </a>
              <a
                href="mailto:hallo@zwickels.de"
                className="flex items-center gap-3 bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Mail className="w-6 h-6 text-[#2D5F3F]" />
                <div>
                  <p className="text-sm text-gray-600">E-Mail</p>
                  <p className="font-semibold text-[#2D5F3F]">hallo@zwickels.de</p>
                </div>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/demo/metzgerei')}
              className="bg-gradient-to-r from-[#2D5F3F] to-[#3E7C57] hover:from-[#3E7C57] hover:to-[#2D5F3F] text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Zur Startseite
            </button>
            <button
              onClick={() => navigate('/demo/metzgerei/shop')}
              className="bg-white hover:bg-gray-50 text-[#2D5F3F] border-2 border-[#2D5F3F] px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Weiter einkaufen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
