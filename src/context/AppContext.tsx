import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  MenuItem,
  CartItem,
  Order,
  OrderStatus,
  InventoryItem,
  PromoDeal,
  ReviewItem,
  LoyaltyProfile,
  NotificationMessage,
  AppLanguage,
  AppTheme,
  ActiveTab,
  MenuItemOption,
} from '../types';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_ORDERS,
  INITIAL_INVENTORY,
  INITIAL_PROMOS,
  INITIAL_REVIEWS,
  INITIAL_LOYALTY,
  INITIAL_NOTIFICATIONS,
  SYLHET_AREAS
} from '../data/initialData';
import confetti from 'canvas-confetti';

interface AppContextType {
  menuItems: MenuItem[];
  cart: CartItem[];
  appliedPromo: PromoDeal | null;
  orders: Order[];
  activeOrder: Order | null;
  inventory: InventoryItem[];
  promos: PromoDeal[];
  reviews: ReviewItem[];
  loyalty: LoyaltyProfile;
  notifications: NotificationMessage[];
  unreadNotificationCount: number;
  language: AppLanguage;
  theme: AppTheme;
  activeTab: ActiveTab;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isStaffMode: boolean;
  pushEnabled: boolean;
  
  // Actions
  setLanguage: (lang: AppLanguage) => void;
  setTheme: (theme: AppTheme) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsStaffMode: (staff: boolean) => void;
  setActiveOrder: (order: Order | null) => void;
  
  addToCart: (
    item: MenuItem,
    selectedSize?: '8"' | '10"' | '12"',
    selectedOptions?: MenuItemOption[],
    quantity?: number,
    specialInstructions?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  
  placeOrder: (orderPayload: {
    customerName: string;
    phone: string;
    address: string;
    area: string;
    notes?: string;
    paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'card' | 'cod';
    transactionId?: string;
    tip?: number;
  }) => Order;
  
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  updateInventoryStock: (itemId: string, newStock: number) => void;
  toggleItemStockAvailability: (menuItemId: string) => void;
  addReview: (review: Omit<ReviewItem, 'id' | 'date' | 'likes'>) => void;
  claimLoyaltyVoucher: (voucherId: string) => boolean;
  requestPushPermission: () => Promise<boolean>;
  sendPushNotification: (title: string, message: string, type?: 'promo' | 'order' | 'system' | 'loyalty', bengaliTitle?: string, bengaliMessage?: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Cart Computed
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  cartItemCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('moonlight_menu');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('moonlight_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedPromo, setAppliedPromo] = useState<PromoDeal | null>(null);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('moonlight_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    const saved = localStorage.getItem('moonlight_orders');
    const parsedOrders = saved ? JSON.parse(saved) : INITIAL_ORDERS;
    return parsedOrders[0] || null;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('moonlight_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [promos] = useState<PromoDeal[]>(INITIAL_PROMOS);

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('moonlight_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [loyalty, setLoyalty] = useState<LoyaltyProfile>(() => {
    const saved = localStorage.getItem('moonlight_loyalty');
    return saved ? JSON.parse(saved) : INITIAL_LOYALTY;
  });

  const [notifications, setNotifications] = useState<NotificationMessage[]>(() => {
    const saved = localStorage.getItem('moonlight_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [language, setLanguage] = useState<AppLanguage>(() => {
    return (localStorage.getItem('moonlight_lang') as AppLanguage) || 'en';
  });

  const [theme, setTheme] = useState<AppTheme>(() => {
    return (localStorage.getItem('moonlight_theme') as AppTheme) || 'dark';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('menu');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStaffMode, setIsStaffMode] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(() => {
    return typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('moonlight_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('moonlight_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('moonlight_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync activeOrder when orders change
  useEffect(() => {
    if (activeOrder) {
      const updated = orders.find((o) => o.id === activeOrder.id);
      if (updated) {
        setActiveOrder(updated);
      }
    }
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('moonlight_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('moonlight_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('moonlight_loyalty', JSON.stringify(loyalty));
  }, [loyalty]);

  useEffect(() => {
    localStorage.setItem('moonlight_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('moonlight_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('moonlight_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Audio effects synthesizer
  const playSoundEffect = (type: 'beep' | 'success' | 'bell') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'bell') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  };

  // Cart Calculations
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cart.reduce((acc, item) => {
    const optionsTotal = item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
    return acc + (item.price + optionsTotal) * item.quantity;
  }, 0);

  const cartDiscount = appliedPromo
    ? appliedPromo.discountPercent
      ? Math.round((cartSubtotal * appliedPromo.discountPercent) / 100)
      : appliedPromo.discountAmount || 0
    : 0;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  // Cart Handlers
  const addToCart = (
    item: MenuItem,
    selectedSize?: '8"' | '10"' | '12"',
    selectedOptions: MenuItemOption[] = [],
    quantity: number = 1,
    specialInstructions?: string
  ) => {
    let itemPrice = item.price;
    if (selectedSize && item.sizeOptions) {
      const matched = item.sizeOptions.find((s) => s.size === selectedSize);
      if (matched) itemPrice = matched.price;
    }

    const optionsKey = selectedOptions.map((o) => o.id).sort().join('-');
    const instanceId = `${item.id}-${selectedSize || 'std'}-${optionsKey}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === instanceId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          id: instanceId,
          menuItemId: item.id,
          name: item.name,
          bengaliName: item.bengaliName,
          price: itemPrice,
          selectedSize,
          selectedOptions,
          quantity,
          specialInstructions,
          image: item.image,
        },
      ];
    });

    playSoundEffect('beep');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromo = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = promos.find((p) => p.code.toUpperCase() === cleanCode);
    if (!found) {
      return {
        success: false,
        message: language === 'bn' ? 'অকার্যকর কুপন কোড!' : 'Invalid voucher code. Try MIDNIGHT20 or NAGABLAST!',
      };
    }
    if (cartSubtotal < found.minSpend) {
      return {
        success: false,
        message:
          language === 'bn'
            ? `এই কুপন ব্যবহারের জন্য সর্বনিম্ন ৳${found.minSpend} টাকার অর্ডার প্রয়োজন।`
            : `Minimum spend of ${found.minSpend} TK required for code ${found.code}.`,
      };
    }

    setAppliedPromo(found);
    playSoundEffect('success');
    return {
      success: true,
      message:
        language === 'bn'
          ? `🎉 কুপন "${found.code}" সফলভাবে প্রয়োগ করা হয়েছে!`
          : `🎉 Voucher "${found.code}" applied successfully!`,
    };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Place Order Handler
  const placeOrder = (payload: {
    customerName: string;
    phone: string;
    address: string;
    area: string;
    notes?: string;
    paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'card' | 'cod';
    transactionId?: string;
    tip?: number;
  }) => {
    const deliveryFee = SYLHET_AREAS.find((a) => a.name === payload.area)?.deliveryFee || 40;
    const tip = payload.tip || 0;
    const finalTotal = cartTotal + deliveryFee + tip;
    const pointsEarned = Math.floor(finalTotal / 10);
    const orderNum = `NF-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName: payload.customerName,
      phone: payload.phone,
      address: payload.address,
      area: payload.area,
      notes: payload.notes,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee,
      tip,
      total: finalTotal,
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentMethod === 'cod' ? 'pending' : 'paid',
      transactionId: payload.transactionId || (payload.paymentMethod !== 'cod' ? `TXN${Math.random().toString(36).substring(2, 9).toUpperCase()}` : undefined),
      status: 'confirmed',
      createdAt: 'Just now',
      estimatedDeliveryMinutes: 25,
      rider: {
        name: 'Tanvir Ahmed',
        phone: '+880 1711 002233',
        vehicle: 'Honda CB Shine (Sylhet-La-12-8841)',
        rating: 4.95,
        currentLocationName: 'MoonLight Kitchen - Zindabazar Hub',
        coordinates: { x: 35, y: 55 }
      },
      timeline: [
        {
          status: 'placed',
          title: 'Order Received',
          bengaliTitle: 'অর্ডার গৃহীত হয়েছে',
          description: `Paid via ${payload.paymentMethod.toUpperCase()}`,
          timestamp: 'Just now',
          completed: true,
        },
        {
          status: 'kitchen_prep',
          title: 'Kitchen Cooking',
          bengaliTitle: 'রান্না প্রস্তুত হচ্ছে',
          description: 'Chef is grilling and assembling fresh ingredients',
          timestamp: 'Upcoming',
          completed: false,
        },
        {
          status: 'quality_check',
          title: 'Insulated Hot Packing',
          bengaliTitle: 'থার্মাল সিলিং ও প্যাকিং',
          description: 'Sealing in thermal foil pouch',
          timestamp: 'Upcoming',
          completed: false,
        },
        {
          status: 'out_for_delivery',
          title: 'Out for Delivery in Sylhet',
          bengaliTitle: 'ডেলিভারি রাইডার রওনা দিয়েছে',
          description: `Rider Tanvir dispatched to ${payload.area}`,
          timestamp: 'Upcoming',
          completed: false,
        },
        {
          status: 'delivered',
          title: 'Delivered Hot & Fresh',
          bengaliTitle: 'ডেলিভারি সম্পন্ন',
          description: 'Enjoy your midnight fuel!',
          timestamp: 'Upcoming',
          completed: false,
        },
      ],
      pointsEarned,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setActiveTab('tracking');

    // Update Loyalty Points
    setLoyalty((prev) => {
      const updatedPoints = prev.points + pointsEarned;
      const updatedSpent = prev.totalSpent + finalTotal;
      const updatedLifetime = prev.lifetimeOrders + 1;
      let newTier = prev.tier;
      if (updatedPoints >= 1000) newTier = 'Midnight Legend';
      else if (updatedPoints >= 600) newTier = 'Fuel VIP';
      else if (updatedPoints >= 300) newTier = 'Night Rider';

      return {
        ...prev,
        points: updatedPoints,
        lifetimeOrders: updatedLifetime,
        totalSpent: updatedSpent,
        tier: newTier,
        pointsToNextTier: Math.max(0, (newTier === 'Midnight Legend' ? 1500 : newTier === 'Fuel VIP' ? 1000 : 600) - updatedPoints),
      };
    });

    // Launch celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ef4444', '#10b981', '#ffffff']
    });
    playSoundEffect('success');

    sendPushNotification(
      `🎉 Order ${orderNum} Confirmed!`,
      `Thank you ${payload.customerName}! We're preparing your food now. Delivery to ${payload.area} in ~25 mins.`,
      'order',
      `🎉 অর্ডার ${orderNum} সফলভাবে জমা হয়েছে!`,
      `ধন্যবাদ ${payload.customerName}! আপনার খাবার রান্না চলছে। আনুমানিক ২৫ মিনিটে পৌঁছাবে।`
    );

    return newOrder;
  };

  // Staff order status updater
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        
        const updatedTimeline = ord.timeline.map((step) => {
          if (step.status === newStatus) {
            return { ...step, completed: true, timestamp: 'Just now' };
          }
          return step;
        });

        return {
          ...ord,
          status: newStatus,
          timeline: updatedTimeline,
        };
      })
    );

    playSoundEffect('bell');
    sendPushNotification(
      `Order Status Update 🔔`,
      `Order is now: ${newStatus.replace('_', ' ').toUpperCase()}`,
      'order'
    );
  };

  // Inventory Stock Updater
  const updateInventoryStock = (itemId: string, newStock: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const clampedStock = Math.max(0, newStock);
        let status: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock';
        if (clampedStock === 0) status = 'out_of_stock';
        else if (clampedStock <= item.minThreshold) status = 'low_stock';

        return { ...item, currentStock: clampedStock, status };
      })
    );
  };

  // Menu Item Stock Toggle
  const toggleItemStockAvailability = (menuItemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === menuItemId ? { ...item, inStock: !item.inStock } : item))
    );
  };

  // Add Review Handler
  const addReview = (reviewData: Omit<ReviewItem, 'id' | 'date' | 'likes'>) => {
    const newRev: ReviewItem = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      likes: 1,
    };
    setReviews((prev) => [newRev, ...prev]);
    confetti({ particleCount: 40, spread: 50 });
    playSoundEffect('success');
    sendPushNotification('Review Published ⭐', 'Thank you for your feedback on MoonLight!');
  };

  // Claim Loyalty Voucher
  const claimLoyaltyVoucher = (voucherId: string) => {
    const vch = loyalty.vouchers.find((v) => v.id === voucherId);
    if (!vch || vch.claimed || loyalty.points < vch.pointsCost) return false;

    setLoyalty((prev) => ({
      ...prev,
      points: prev.points - vch.pointsCost,
      vouchers: prev.vouchers.map((v) => (v.id === voucherId ? { ...v, claimed: true } : v)),
    }));

    confetti({ particleCount: 60, spread: 60 });
    playSoundEffect('success');
    sendPushNotification(
      `🎁 Reward Claimed!`,
      `You unlocked ${vch.title}! Use code ${vch.code} at checkout.`,
      'loyalty'
    );
    return true;
  };

  // Web Notification API Requester
  const requestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        const granted = perm === 'granted';
        setPushEnabled(granted);
        if (granted) {
          sendPushNotification(
            '🔔 Push Notifications Enabled!',
            "You'll receive instant alerts for midnight surge deals and live delivery updates.",
            'system'
          );
        }
        return granted;
      } catch (e) {
        return false;
      }
    }
    return false;
  };

  // Send Push / In-App Notification
  const sendPushNotification = (
    title: string,
    message: string,
    type: 'promo' | 'order' | 'system' | 'loyalty' = 'system',
    bengaliTitle?: string,
    bengaliMessage?: string
  ) => {
    const newNotif: NotificationMessage = {
      id: `nt-${Date.now()}`,
      title,
      bengaliTitle: bengaliTitle || title,
      message,
      bengaliMessage: bengaliMessage || message,
      time: 'Just now',
      type,
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev.slice(0, 19)]);

    // Trigger browser native notification if permitted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(language === 'bn' ? newNotif.bengaliTitle : newNotif.title, {
          body: language === 'bn' ? newNotif.bengaliMessage : newNotif.message,
          icon: '/favicon.ico',
        });
      } catch (e) {
        // Notification error fallback
      }
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        menuItems,
        cart,
        appliedPromo,
        orders,
        activeOrder,
        inventory,
        promos,
        reviews,
        loyalty,
        notifications,
        unreadNotificationCount,
        language,
        theme,
        activeTab,
        isCartOpen,
        isCheckoutOpen,
        isStaffMode,
        pushEnabled,
        setLanguage,
        setTheme,
        setActiveTab,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsStaffMode,
        setActiveOrder,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyPromo,
        removePromo,
        placeOrder,
        updateOrderStatus,
        updateInventoryStock,
        toggleItemStockAvailability,
        addReview,
        claimLoyaltyVoucher,
        requestPushPermission,
        sendPushNotification,
        markNotificationRead,
        clearAllNotifications,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
