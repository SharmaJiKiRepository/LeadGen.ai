import { NavLink } from 'react-router-dom';
import {
  ChartPieIcon, UserGroupIcon, PhoneIcon, CpuChipIcon,
  ChartBarIcon, CreditCardIcon, Cog6ToothIcon, XMarkIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/', icon: ChartPieIcon },
  { name: 'Leads', href: '/leads', icon: UserGroupIcon },
  { name: 'Calls', href: '/calls', icon: PhoneIcon },
  { name: 'AI Agents', href: '/ai-agents', icon: CpuChipIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Billing', href: '/billing', icon: CreditCardIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile sidebar overlay */}
      <div
        className={clsx('fixed inset-0 z-30 bg-gray-900/50 transition-opacity lg:hidden', {
          'opacity-100': sidebarOpen, 'opacity-0 pointer-events-none': !sidebarOpen
        })}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={clsx(
        "fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col bg-white transition-transform duration-300 ease-in-out lg:static lg:inset-auto lg:z-auto lg:translate-x-0",
        { 'translate-x-0': sidebarOpen, '-translate-x-full': !sidebarOpen }
      )}>
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-primary">LeadGen AI</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <XMarkIcon className="h-6 w-6"/>
          </button>
        </div>
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => clsx(
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;