/**
 * GA4 E-Commerce Analytics for Webflix
 * Clean implementation following GA4 standard event structure
 */

declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface GA4Item {
  item_id: string;
  item_name: string;
  affiliation?: string;
  coupon?: string;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  location_id?: string;
  price: number;
  quantity?: number;
  item_type?: 'product' | 'addon';
}

/**
 * Initialize dataLayer
 */
function initDataLayer() {
  window.dataLayer = window.dataLayer || [];
}

/**
 * Clear ecommerce object before sending new event (GA4 requirement)
 */
function clearEcommerce() {
  initDataLayer();
  window.dataLayer.push({ ecommerce: null });
}

/**
 * Push event to dataLayer with logging
 */
function pushToDataLayer(data: any) {
  initDataLayer();
  window.dataLayer.push(data);
  console.log('[GA4 Analytics]', data.event, data);
}

/**
 * 1. VIEW ITEM LIST
 * When: User sees product list on shop page
 * Where: ShopPage - when products are displayed
 */
export function trackViewItemList(params: {
  item_list_id: string;
  item_list_name: string;
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    item_category?: string;
    item_category2?: string;
    item_brand?: string;
    index?: number;
  }>;
}) {
  clearEcommerce();

  const items: GA4Item[] = params.items.map((item, idx) => ({
    item_id: item.item_id,
    item_name: item.item_name,
    affiliation: 'Webflix',
    item_brand: item.item_brand || 'Webflix',
    item_category: item.item_category || 'Website Template',
    item_category2: item.item_category2 || 'Premium',
    item_list_id: params.item_list_id,
    item_list_name: params.item_list_name,
    price: item.price,
    quantity: 1,
    index: item.index !== undefined ? item.index : idx
  }));

  pushToDataLayer({
    event: 'view_item_list',
    ecommerce: {
      item_list_id: params.item_list_id,
      item_list_name: params.item_list_name,
      items: items
    }
  });
}

/**
 * 2. VIEW ITEM
 * When: User clicks "Demo ansehen" or selects a product in shop
 * Where: ShopPage - Demo button click or product selection
 */
export function trackViewItem(params: {
  item_id: string;
  item_name: string;
  price: number;
  item_category?: string;
  item_category2?: string;
  item_brand?: string;
  item_list_id?: string;
  item_list_name?: string;
}) {
  clearEcommerce();

  const item: GA4Item = {
    item_id: params.item_id,
    item_name: params.item_name,
    affiliation: 'Webflix',
    item_brand: params.item_brand || 'Webflix',
    item_category: params.item_category || 'Website Template',
    item_category2: params.item_category2 || 'Premium',
    item_list_id: params.item_list_id,
    item_list_name: params.item_list_name,
    price: params.price,
    quantity: 1
  };

  pushToDataLayer({
    event: 'view_item',
    ecommerce: {
      currency: 'EUR',
      value: params.price,
      items: [item]
    }
  });
}

/**
 * 3. SELECT ITEM
 * When: User selects a template and goes to configurator
 * Where: ShopPage - "Jetzt bestellen" button or template selection
 */
export function trackSelectItem(params: {
  item_id: string;
  item_name: string;
  price: number;
  item_category?: string;
  item_category2?: string;
  item_brand?: string;
  item_list_id?: string;
  item_list_name?: string;
}) {
  clearEcommerce();

  const item: GA4Item = {
    item_id: params.item_id,
    item_name: params.item_name,
    affiliation: 'Webflix',
    item_brand: params.item_brand || 'Webflix',
    item_category: params.item_category || 'Website Template',
    item_category2: params.item_category2 || 'Premium',
    item_list_id: params.item_list_id,
    item_list_name: params.item_list_name,
    price: params.price,
    quantity: 1
  };

  pushToDataLayer({
    event: 'select_item',
    ecommerce: {
      item_list_id: params.item_list_id,
      item_list_name: params.item_list_name,
      items: [item]
    }
  });
}

/**
 * 4. ADD TO CART
 * When: User adds template or add-on to cart
 * Where: ConfiguratorPage - template selection or add-on toggle
 */
export function trackAddToCart(params: {
  item_id: string;
  item_name: string;
  price: number;
  item_category?: string;
  item_category2?: string;
  item_brand?: string;
  quantity?: number;
  coupon?: string;
  discount?: number;
  item_type?: 'product' | 'addon';
}) {
  clearEcommerce();

  const quantity = params.quantity || 1;
  const value = params.price * quantity;

  const item: GA4Item = {
    item_id: params.item_id,
    item_name: params.item_name,
    affiliation: 'Webflix',
    item_brand: params.item_brand || 'Webflix',
    item_category: params.item_category || 'Website',
    item_category2: params.item_category2,
    price: params.price,
    quantity: quantity,
    coupon: params.coupon,
    discount: params.discount,
    item_type: params.item_type || 'product'
  };

  pushToDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'EUR',
      value: value,
      items: [item]
    }
  });
}

/**
 * 5. REMOVE FROM CART
 * When: User removes/deactivates an add-on
 * Where: ConfiguratorPage - add-on toggle off
 */
export function trackRemoveFromCart(params: {
  item_id: string;
  item_name: string;
  price: number;
  item_category?: string;
  item_category2?: string;
  quantity?: number;
}) {
  clearEcommerce();

  const quantity = params.quantity || 1;
  const value = params.price * quantity;

  const item: GA4Item = {
    item_id: params.item_id,
    item_name: params.item_name,
    affiliation: 'Webflix',
    item_brand: 'Webflix',
    item_category: params.item_category || 'Power-Up',
    item_category2: params.item_category2,
    price: params.price,
    quantity: quantity
  };

  pushToDataLayer({
    event: 'remove_from_cart',
    ecommerce: {
      currency: 'EUR',
      value: value,
      items: [item]
    }
  });
}

/**
 * 6. VIEW CART
 * When: User views cart summary in configurator
 * Where: ConfiguratorPage - cart sidebar visible
 */
export function trackViewCart(params: {
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    item_category?: string;
    item_category2?: string;
    quantity?: number;
    coupon?: string;
    discount?: number;
  }>;
  value: number;
  coupon?: string;
}) {
  clearEcommerce();

  const items: GA4Item[] = params.items.map(item => ({
    item_id: item.item_id,
    item_name: item.item_name,
    affiliation: 'Webflix',
    item_brand: 'Webflix',
    item_category: item.item_category || 'Website',
    item_category2: item.item_category2,
    price: item.price,
    quantity: item.quantity || 1,
    coupon: item.coupon,
    discount: item.discount
  }));

  pushToDataLayer({
    event: 'view_cart',
    ecommerce: {
      currency: 'EUR',
      value: params.value,
      coupon: params.coupon,
      items: items
    }
  });
}

/**
 * 7. BEGIN CHECKOUT
 * When: User clicks "Jetzt bestellen" from configurator
 * Where: ConfiguratorPage - checkout button click
 */
export function trackBeginCheckout(params: {
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    item_category?: string;
    item_category2?: string;
    quantity?: number;
    coupon?: string;
    discount?: number;
  }>;
  value: number;
  coupon?: string;
}) {
  clearEcommerce();

  const items: GA4Item[] = params.items.map(item => ({
    item_id: item.item_id,
    item_name: item.item_name,
    affiliation: 'Webflix',
    item_brand: 'Webflix',
    item_category: item.item_category || 'Website',
    item_category2: item.item_category2,
    price: item.price,
    quantity: item.quantity || 1,
    coupon: item.coupon,
    discount: item.discount
  }));

  pushToDataLayer({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'EUR',
      value: params.value,
      coupon: params.coupon,
      items: items
    }
  });
}

/**
 * 8. ADD PAYMENT INFO
 * When: User reaches payment step and submits payment
 * Where: CheckoutPage - payment step
 */
export function trackAddPaymentInfo(params: {
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    item_category?: string;
    item_category2?: string;
    quantity?: number;
    coupon?: string;
  }>;
  value: number;
  coupon?: string;
  payment_type?: string;
}) {
  clearEcommerce();

  const items: GA4Item[] = params.items.map(item => ({
    item_id: item.item_id,
    item_name: item.item_name,
    affiliation: 'Webflix',
    item_brand: 'Webflix',
    item_category: item.item_category || 'Website',
    item_category2: item.item_category2,
    price: item.price,
    quantity: item.quantity || 1,
    coupon: item.coupon
  }));

  pushToDataLayer({
    event: 'add_payment_info',
    ecommerce: {
      currency: 'EUR',
      value: params.value,
      coupon: params.coupon,
      payment_type: params.payment_type,
      items: items
    }
  });
}

/**
 * 9. PURCHASE
 * When: Payment completed successfully
 * Where: CheckoutSuccess page
 */
export function trackPurchase(params: {
  transaction_id: string;
  value: number;
  tax?: number;
  shipping?: number;
  currency?: string;
  coupon?: string;
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    item_category?: string;
    item_category2?: string;
    quantity?: number;
    coupon?: string;
    discount?: number;
  }>;
}) {
  clearEcommerce();

  const currency = params.currency || 'EUR';

  const items: GA4Item[] = params.items.map(item => ({
    item_id: item.item_id,
    item_name: item.item_name,
    affiliation: 'Webflix',
    item_brand: 'Webflix',
    item_category: item.item_category || 'Website',
    item_category2: item.item_category2,
    price: item.price,
    quantity: item.quantity || 1,
    coupon: item.coupon,
    discount: item.discount
  }));

  pushToDataLayer({
    event: 'purchase',
    ecommerce: {
      transaction_id: params.transaction_id,
      affiliation: 'Webflix',
      value: params.value,
      tax: params.tax || 0,
      shipping: params.shipping || 0,
      currency: currency,
      coupon: params.coupon,
      items: items
    }
  });
}

/**
 * 10. PAGE VIEW
 * When: User views any page
 * Where: All pages - useEffect on mount
 */
export function trackPageView(params: {
  page_title: string;
  page_location: string;
  page_path: string;
}) {
  pushToDataLayer({
    event: 'page_view',
    page_title: params.page_title,
    page_location: params.page_location,
    page_path: params.page_path
  });
}

/**
 * 11. GENERATE LEAD
 * When: User completes lead generation (arrives at thank you page)
 * Where: Thank you pages, final conversion step
 */
export function trackGenerateLead(params: {
  currency?: string;
  value?: number;
  lead_source?: string;
  lead_type?: string;
  email?: string;
  phone?: string;
}) {
  const dataLayerEvent: any = {
    event: 'generate_lead',
    currency: params.currency || 'EUR',
    value: params.value || 0,
    lead_source: params.lead_source,
    lead_type: params.lead_type
  };

  // Add email and phone to dataLayer for Google Ads Conversions
  if (params.email) {
    dataLayerEvent.email = params.email;
  }
  if (params.phone) {
    dataLayerEvent.phone = params.phone;
  }

  pushToDataLayer(dataLayerEvent);
}

/**
 * 12. FORM SUBMIT (Custom Event)
 * When: User submits a form (consultation request, contact form, etc.)
 * Where: Custom website form when calendly booking is made
 */
export function trackFormSubmit(params: {
  form_name: string;
  form_type?: string;
  form_destination?: string;
}) {
  pushToDataLayer({
    event: 'form_submit',
    form_name: params.form_name,
    form_type: params.form_type,
    form_destination: params.form_destination
  });
}

/**
 * 13. CALENDLY BOOKING (Custom Event)
 * When: User completes a Calendly booking via iframe
 * Where: Automatically triggered via postMessage listener
 */
export function trackCalendlyBooking(params: {
  event_name?: string;
  event_type_name?: string;
  start_time?: string;
  end_time?: string;
  invitee_email?: string;
  invitee_name?: string;
  invitee_uri?: string;
  event_uri?: string;
  invitee_phone?: string;
}) {
  pushToDataLayer({
    event: 'calendly_booking',
    calendly_event_name: params.event_name,
    calendly_event_type: params.event_type_name,
    calendly_start_time: params.start_time,
    calendly_end_time: params.end_time,
    calendly_invitee_email: params.invitee_email,
    calendly_invitee_name: params.invitee_name,
    calendly_invitee_uri: params.invitee_uri,
    calendly_event_uri: params.event_uri
  });

  // Also track as generate_lead for conversion tracking with email & phone
  trackGenerateLead({
    lead_source: 'Calendly',
    lead_type: 'Booking',
    value: 0,
    email: params.invitee_email,
    phone: params.invitee_phone
  });
}

/**
 * Initialize Calendly postMessage listener
 * Call this once when the app loads
 */
export function initCalendlyTracking() {
  if (typeof window === 'undefined') return;

  window.addEventListener('message', function(e) {
    // Only process messages from Calendly
    if (e.origin !== 'https://calendly.com') return;

    try {
      const data = e.data;

      // Handle event.scheduled event
      if (data.event === 'calendly.event_scheduled') {
        console.log('[Calendly] Event scheduled:', data);

        // Extract phone from questions_and_answers if available
        let phone = undefined;
        if (data.payload?.invitee?.questions_and_answers) {
          const phoneQuestion = data.payload.invitee.questions_and_answers.find(
            (qa: any) => qa.question?.toLowerCase().includes('phone') || qa.question?.toLowerCase().includes('telefon')
          );
          if (phoneQuestion) {
            phone = phoneQuestion.answer;
          }
        }

        trackCalendlyBooking({
          event_name: data.payload?.event?.name,
          event_type_name: data.payload?.event_type?.name,
          start_time: data.payload?.event?.start_time,
          end_time: data.payload?.event?.end_time,
          invitee_email: data.payload?.invitee?.email,
          invitee_name: data.payload?.invitee?.name,
          invitee_uri: data.payload?.invitee?.uri,
          event_uri: data.payload?.event?.uri,
          invitee_phone: phone
        });
      }

      // Handle profile page viewed (optional)
      if (data.event === 'calendly.profile_page_viewed') {
        console.log('[Calendly] Profile page viewed');
        pushToDataLayer({
          event: 'calendly_profile_viewed'
        });
      }

      // Handle date and time selected (optional)
      if (data.event === 'calendly.date_and_time_selected') {
        console.log('[Calendly] Date and time selected');
        pushToDataLayer({
          event: 'calendly_datetime_selected'
        });
      }

      // Handle event type viewed (optional)
      if (data.event === 'calendly.event_type_viewed') {
        console.log('[Calendly] Event type viewed');
        pushToDataLayer({
          event: 'calendly_event_type_viewed'
        });
      }
    } catch (error) {
      console.error('[Calendly] Error processing message:', error);
    }
  });

  console.log('[Calendly] Tracking initialized');
}
