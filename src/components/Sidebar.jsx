import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  Brain,
  BarChart2,
  CreditCard,
  Settings,
  Menu,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Leads", icon: Users, path: "/leads" },
    { name: "Calls", icon: PhoneCall, path: "/calls" },
    { name: "AI Agents", icon: Brain, path: "/ai-agents" },
    { name: "Analytics", icon: BarChart2, path: "/analytics" },
    { name: "Billing", icon: CreditCard, path: "/billing" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside
      className={`flex flex-col bg-[#0f172a] text-white h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
        {!collapsed && (
          <div>
            <h1 className="text-lg font-semibold">LeadGen AI</h1>
            <p className="text-xs text-gray-400">CRM + Dialer</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-gray-800"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 mt-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#1e293b] text-white shadow-sm"
                    : "text-gray-400 hover:bg-[#1c2532] hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center text-[11px] text-gray-500 border-t border-gray-800 py-3">
        {!collapsed && "Powered by OpenAI"}
      </div>
    </aside>
  );
}
