import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Globe,
  CreditCard,
  LifeBuoy,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import WebsitesTab from './tabs/WebsitesTab';
import SubscriptionsTab from './tabs/SubscriptionsTab';
import SupportTab from './tabs/SupportTab';
import ProfileTab from './tabs/ProfileTab';
import ChangesTab from './tabs/ChangesTab';
import ChecklistOverview from './tabs/ChecklistOverview';

type TabType = 'websites' | 'subscriptions' | 'changes' | 'support' | 'profile';

interface CustomerData {
  id: string;
  customer_number: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  company?: string;
}

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('websites');
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCustomerData();
  }, []);

  const loadCustomerData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.log('❌ No user found, redirecting to login');
        navigate('/customer/login');
        return;
      }

      console.log('✅ User authenticated:', user.email);

      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading customer from DB:', error);
      }

      if (!data) {
        console.log('⚠️ Customer not in database, creating from user metadata');
        const newCustomer = {
          id: user.id,
          customer_number: `CUS-${Date.now()}`,
          email: user.email!,
          first_name: user.user_metadata.first_name || '',
          last_name: user.user_metadata.last_name || '',
          company: user.user_metadata.company || '',
          phone: user.user_metadata.phone || '',
          created_at: new Date().toISOString(),
          last_login_at: new Date().toISOString()
        };

        const { error: insertError } = await supabase
          .from('customers')
          .insert(newCustomer);

        if (insertError) {
          console.error('Error creating customer:', insertError);
        }

        setCustomerData(newCustomer as CustomerData);
      } else {
        console.log('✅ Customer data loaded');
        setCustomerData(data);

        await supabase
          .from('customers')
          .update({ last_login_at: new Date().toISOString() })
          .eq('id', user.id);
      }
    } catch (error) {
      console.error('Error in loadCustomerData:', error);
      navigate('/customer/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/customer/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Lade Dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'websites', label: 'Meine Websites', icon: Globe },
    { id: 'subscriptions', label: 'Abonnements', icon: CreditCard },
    { id: 'changes', label: 'Änderungen', icon: Edit },
    { id: 'support', label: 'Support', icon: LifeBuoy },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold">Kunden-Dashboard</h1>
              {customerData && (
                <p className="text-sm text-gray-400">
                  {customerData.first_name} {customerData.last_name} · {customerData.customer_number}
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 border border-white/30 rounded hover:bg-white/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Abmelden</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64">
            <nav className="bg-[#1a1a1a] rounded-lg border border-white/10 p-2 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-orange-500 to-pink-400 text-black font-semibold'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex-1 space-y-6">
            <ChecklistOverview customerId={customerData?.id || ''} />

            {activeTab === 'websites' && <WebsitesTab customerId={customerData?.id || ''} />}
            {activeTab === 'subscriptions' && <SubscriptionsTab customerId={customerData?.id || ''} />}
            {activeTab === 'changes' && <ChangesTab customerId={customerData?.id || ''} />}
            {activeTab === 'support' && <SupportTab customerId={customerData?.id || ''} />}
            {activeTab === 'profile' && customerData && <ProfileTab customerData={customerData} onUpdate={loadCustomerData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
