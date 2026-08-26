import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus, InventoryItem } from '../types';
import { ANALYTICS_DATA } from '../data/initialData';
import {
  LayoutDashboard,
  ChefHat,
  Package,
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Flame,
  Plus,
  Minus,
  Bike,
  Phone,
  MapPin,
  RefreshCw,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  ArrowUpRight,
  ShieldCheck,
  Search
} from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    inventory,
    updateInventoryStock,
    toggleItemStockAvailability,
    language,
    menuItems,
  } = useApp();

  const analytics = ANALYTICS_DATA;

  const [staffSubTab, setStaffSubTab] = useState<'orders' | 'inventory' | 'analytics'>('orders');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [inventorySearch, setInventorySearch] = useState('');

  // Orders filtering
  const filteredOrders = orders.filter((order) => {
    if (orderStatusFilter === 'all') return true;
    if (orderStatusFilter === 'active') return order.status !== 'delivered' && order.status !== 'cancelled';
    return order.status === orderStatusFilter;
  });

  // Calculate live stats
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'cancelled' ? sum + o.total : sum), 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
  const lowStockCount = inventory.filter((i) => i.currentStock <= i.minThreshold).length;

  return (
    <div className="py-6 space-y-6 max-w-7xl mx-auto" id="staff-dashboard-container">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-white" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {language === 'bn' ? 'মুনলাইট কিচেন ও স্টাফ ড্যাশবোর্ড' : 'MoonLight Staff & Kitchen Portal'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time Kitchen Display System (KDS), Stock Inventory & Executive Analytics
          </p>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black border border-neutral-800">
          <button
            onClick={() => setStaffSubTab('orders')}
            id="tab-kds-orders"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              staffSubTab === 'orders'
                ? 'bg-white text-black shadow font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>KDS Orders ({activeOrdersCount})</span>
          </button>

          <button
            onClick={() => setStaffSubTab('inventory')}
            id="tab-inventory"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              staffSubTab === 'inventory'
                ? 'bg-white text-black shadow font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Inventory ({lowStockCount > 0 ? `⚠️ ${lowStockCount}` : 'OK'})</span>
          </button>

          <button
            onClick={() => setStaffSubTab('analytics')}
            id="tab-analytics"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              staffSubTab === 'analytics'
                ? 'bg-white text-black shadow font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-1 shadow">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Tonight's Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">৳{totalRevenue}</div>
          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs last night</span>
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-1 shadow">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Active Live Orders</span>
            <ChefHat className="w-4 h-4 text-neutral-300" />
          </div>
          <div className="text-2xl font-bold text-white">{activeOrdersCount}</div>
          <span className="text-[10px] text-neutral-400 font-medium">Kitchen & Transit Queue</span>
        </div>

        <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-1 shadow">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Completed Deliveries</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{deliveredCount}</div>
          <span className="text-[10px] text-neutral-400">Avg delivery time: 24m</span>
        </div>

        <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-1 shadow">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-medium">
            <span>Inventory Alert</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className={`text-2xl font-bold ${lowStockCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {lowStockCount} Items
          </div>
          <span className="text-[10px] text-neutral-400">
            {lowStockCount > 0 ? 'Restock immediately' : 'Optimal pantry stock'}
          </span>
        </div>
      </div>

      {/* VIEW 1: KITCHEN DISPLAY SYSTEM & ORDER MANAGER */}
      {staffSubTab === 'orders' && (
        <div className="space-y-4">
          {/* Status Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'active', label: '⚡ Active Processing' },
              { id: 'placed', label: 'New Placed' },
              { id: 'kitchen_prep', label: 'Cooking' },
              { id: 'quality_check', label: 'Thermal Packing' },
              { id: 'out_for_delivery', label: 'With Rider' },
              { id: 'delivered', label: 'Delivered' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setOrderStatusFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors ${
                  orderStatusFilter === f.id
                    ? 'bg-white text-black font-bold'
                    : 'bg-black border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOrders.map((order) => {
              return (
                <div
                  key={order.id}
                  className="rounded-2xl bg-black border border-neutral-800 p-5 space-y-4 flex flex-col justify-between shadow relative overflow-hidden"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-white">
                            #{order.orderNumber}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-neutral-900 text-neutral-300 font-medium border border-neutral-800">
                            {order.area}
                          </span>
                        </div>
                        <span className="text-[11px] text-neutral-400 block mt-0.5">
                          {order.customerName} • {order.phone}
                        </span>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'delivered'
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                            : order.status === 'out_for_delivery'
                            ? 'bg-orange-950/60 text-orange-300 border border-orange-800'
                            : order.status === 'kitchen_prep'
                            ? 'bg-neutral-800 text-white border border-neutral-700 animate-pulse'
                            : 'bg-blue-950/60 text-blue-300 border border-blue-800'
                        }`}
                      >
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Customer Notes */}
                    {order.notes && (
                      <div className="mt-2.5 p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 italic">
                        Note: {order.notes}
                      </div>
                    )}

                    {/* Items List */}
                    <div className="mt-3 divide-y divide-neutral-850 space-y-1.5">
                      {order.items.map((item) => (
                        <div key={item.id} className="pt-1.5 flex items-start justify-between text-xs">
                          <div>
                            <span className="font-bold text-white">
                              {item.quantity}x {item.name}
                            </span>
                            {item.selectedSize && (
                              <span className="text-[10px] text-neutral-400 block">
                                Size: {item.selectedSize}
                              </span>
                            )}
                            {item.selectedOptions.map((o) => (
                              <span key={o.id} className="text-[10px] text-neutral-500 block">
                                + {o.name}
                              </span>
                            ))}
                          </div>
                          <span className="text-white font-semibold">
                            ৳{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment & Action Controls */}
                  <div className="pt-3 border-t border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-neutral-400">
                        Paid via <strong className="text-white uppercase">{order.paymentMethod}</strong>
                      </span>
                      <span className="text-base font-bold text-white">৳{order.total}</span>
                    </div>

                    {/* Status Advance Buttons */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      {order.status === 'placed' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'kitchen_prep')}
                          className="col-span-2 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold flex items-center justify-center gap-1.5"
                        >
                          <ChefHat className="w-3.5 h-3.5" />
                          <span>Start Cooking</span>
                        </button>
                      )}

                      {order.status === 'kitchen_prep' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'quality_check')}
                          className="col-span-2 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold flex items-center justify-center gap-1.5"
                        >
                          <Package className="w-3.5 h-3.5" />
                          <span>Ready & Thermal Seal</span>
                        </button>
                      )}

                      {order.status === 'quality_check' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                          className="col-span-2 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold flex items-center justify-center gap-1.5"
                        >
                          <Bike className="w-3.5 h-3.5" />
                          <span>Dispatch with Rider</span>
                        </button>
                      )}

                      {order.status === 'out_for_delivery' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="col-span-2 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Delivered Hot</span>
                        </button>
                      )}

                      {order.status === 'delivered' && (
                        <div className="col-span-2 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 text-center text-xs font-medium flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Delivered Successfully</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: COMPREHENSIVE INVENTORY MANAGEMENT */}
      {staffSubTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                placeholder="Search raw ingredients & packaging..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-black border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
            </div>

            <span className="text-xs text-neutral-400">
              Showing {inventory.length} raw inventory & menu stock items
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-black shadow">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-black text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="p-4">Ingredient / Stock Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Current Stock</th>
                  <th className="p-4">Min. Threshold</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Stock Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850">
                {inventory
                  .filter((i) =>
                    i.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
                    i.bengaliName.toLowerCase().includes(inventorySearch.toLowerCase())
                  )
                  .map((inv) => {
                    const isLow = inv.currentStock <= inv.minThreshold;
                    return (
                      <tr key={inv.id} className="hover:bg-neutral-900/50 transition-colors">
                        <td className="p-4">
                          <span className="font-bold text-white block">{inv.name}</span>
                          <span className="text-[11px] text-neutral-400">{inv.bengaliName}</span>
                        </td>
                        <td className="p-4 capitalize text-neutral-400">{inv.category}</td>
                        <td className="p-4">
                          <span className="font-bold text-sm text-white">
                            {inv.currentStock} {inv.unit}
                          </span>
                        </td>
                        <td className="p-4 text-neutral-400">
                          {inv.minThreshold} {inv.unit}
                        </td>
                        <td className="p-4">
                          {isLow ? (
                            <span className="px-2 py-0.5 rounded-full bg-red-950/60 text-red-300 border border-red-800 text-[10px] font-medium flex items-center gap-1 w-fit">
                              <AlertTriangle className="w-3 h-3" />
                              <span>Low Stock</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-[10px] font-medium flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Optimal</span>
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => updateInventoryStock(inv.id, inv.currentStock - 5)}
                              className="p-1.5 rounded-lg bg-black hover:bg-neutral-900 text-neutral-300 border border-neutral-800"
                              title="Decrease 5"
                            >
                              <Minus className="w-3.5 h-3.5 text-neutral-300" />
                            </button>
                            <button
                              onClick={() => updateInventoryStock(inv.id, inv.currentStock + 10)}
                              className="p-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold"
                              title="Restock +10"
                            >
                              <Plus className="w-3.5 h-3.5 text-black stroke-[3]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: DATA ANALYTICS PANEL FOR RESTAURANT OWNERS */}
      {staffSubTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Selling Dishes */}
            <div className="p-6 rounded-2xl bg-black border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-white" />
                  <span>Top Selling Late-Night Dishes</span>
                </h3>
                <span className="text-xs text-neutral-400">Order Volume</span>
              </div>

              <div className="space-y-3">
                {analytics.topSellingItems.map((item, idx) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-white">
                        {idx + 1}. {item.name}
                      </span>
                      <span className="text-white font-bold">
                        {item.count} orders (৳{item.revenue})
                      </span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${Math.min(100, (item.count / 350) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sylhet Delivery Area Volume */}
            <div className="p-6 rounded-2xl bg-black border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white" />
                  <span>Sylhet Delivery Hotspots Breakdown</span>
                </h3>
                <span className="text-xs text-neutral-400">Active Demand</span>
              </div>

              <div className="space-y-3">
                {analytics.areaDistribution.map((area) => (
                  <div key={area.area} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-neutral-300">{area.area}</span>
                      <span className="text-white font-bold">{area.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${area.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Peak Hourly Trends */}
          <div className="p-6 rounded-2xl bg-black border border-neutral-800 space-y-4">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-white" />
              <span>Midnight Surge & Hourly Order Velocity (8:00 PM – 4:00 AM)</span>
            </h3>

            <div className="grid grid-cols-8 gap-2 pt-2">
              {analytics.hourlyTrends.map((trend) => (
                <div key={trend.hour} className="flex flex-col items-center gap-2">
                  <div className="w-full h-32 bg-neutral-950 rounded-xl p-1 flex flex-col justify-end border border-neutral-800">
                    <div
                      className="w-full bg-white rounded-lg transition-all duration-500"
                      style={{ height: `${Math.min(100, (trend.orders / 60) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-neutral-300">{trend.hour}</span>
                  <span className="text-[10px] text-white font-mono font-medium">{trend.orders} ord</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
