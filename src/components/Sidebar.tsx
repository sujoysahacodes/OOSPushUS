'use client';

import { 
  BarChart3, 
  Store, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
  { id: 'stores', label: 'Store Map', icon: Store },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

export function Sidebar({ activeTab, onTabChange, isCollapsed, onToggleCollapse }: SidebarProps) {
  return (
    <div className={`bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ${
import Link from 'next/link';

const navItems = [
  { name: 'Dashboard', href: '/' },
  { name: 'Product Catalog', href: '/products' },
  { name: 'Stores', href: '/stores' },
  { name: 'Alerts', href: '/alerts' },
  { name: 'Forecast', href: '/forecasts' },
  { name: 'Historical Analysis', href: '/historical' },
  { name: 'Change Requests', href: '/change-requests' },
  { name: 'Settings', href: '/settings' },
];
  );
export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 flex flex-col gap-2">
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="rounded px-3 py-2 hover:bg-blue-50 text-blue-900 font-medium"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
}
