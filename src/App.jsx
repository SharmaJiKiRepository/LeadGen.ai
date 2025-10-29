import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// Step: Convert the static layout to Tailwind classes (no interactivity yet)
// This keeps exactly the same structure you saw, but uses Tailwind utilities.

export default function App() {
  // Sidebar nav items
  const navItems = [
    'Dashboard',
    'Leads',
    'Calls',
    'AI Agents',
    'Analytics',
    'Billing',
    'Settings',
  ];
  // Track which nav is active
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      {/* Sidebar */}
      <aside className={`fixed z-40 inset-y-0 left-0 w-[230px] bg-slate-950 text-slate-200 flex flex-col transition-transform md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-4 py-4 font-bold border-b border-white/10 flex items-center justify-between">
          <span>LeadGen AI</span>
          <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setSidebarOpen(false)} aria-label="Close menu">✕</button>
        </div>
        <nav className="p-2 space-y-1 overflow-y-auto">
          <NavLink
            to="/"
            end
            onClick={() => setActiveNav('Dashboard')}
            className={({ isActive }) =>
              'block px-3 py-2 rounded-md select-none ' +
              (isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-300 hover:bg-white/5')
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/leads"
            onClick={() => setActiveNav('Leads')}
            className={({ isActive }) =>
              'block px-3 py-2 rounded-md select-none ' +
              (isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-300 hover:bg-white/5')
            }
          >
            Leads
          </NavLink>
          <NavLink
            to="/calls"
            onClick={() => setActiveNav('Calls')}
            className={({ isActive }) =>
              'block px-3 py-2 rounded-md select-none ' +
              (isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-300 hover:bg-white/5')
            }
          >
            Calls
          </NavLink>
          <NavLink
            to="/agents"
            onClick={() => setActiveNav('AI Agents')}
            className={({ isActive }) =>
              'block px-3 py-2 rounded-md select-none ' +
              (isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-300 hover:bg-white/5')
            }
          >
            AI Agents
          </NavLink>
          <NavLink
            to="/analytics"
            onClick={() => setActiveNav('Analytics')}
            className={({ isActive }) =>
              'block px-3 py-2 rounded-md select-none ' +
              (isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-300 hover:bg-white/5')
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to="/billing"
            onClick={() => setActiveNav('Billing')}
            className={({ isActive }) =>
              'block px-3 py-2 rounded-md select-none ' +
              (isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-300 hover:bg-white/5')
            }
          >
            Billing
          </NavLink>
          <NavLink
            to="/settings"
            onClick={() => setActiveNav('Settings')}
            className={({ isActive }) =>
              'block px-3 py-2 rounded-md select-none ' +
              (isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-300 hover:bg-white/5')
            }
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col md:ml-0">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-3 md:px-4 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <button className="md:hidden px-2 py-1 rounded-md border border-slate-200" onClick={() => setSidebarOpen(true)} aria-label="Open menu">☰</button>
            <div className="font-semibold hidden md:block">{activeNav}</div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto md:justify-end">
            <div className="flex-1 md:flex-initial">
              <input
                placeholder="Search..."
                className="w-full md:w-64 px-3 py-2 rounded-md border border-slate-200 text-sm"
              />
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
              <span>Demo Workspace</span>
              <div className="w-8 h-8 rounded-full bg-slate-200 grid place-items-center text-slate-600">PJ</div>
            </div>
          </div>
        </header>

        <main className="p-3 md:p-4 grid gap-4">
          <Outlet />
        </main>
        </div>
    </div>
  );
}
