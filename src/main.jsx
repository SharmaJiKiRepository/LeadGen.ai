import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Leads from './pages/Leads.jsx'
import Calls from './pages/Calls.jsx'
import Agents from './pages/Agents.jsx'
import Analytics from './pages/Analytics.jsx'
import Billing from './pages/Billing.jsx'
import Settings from './pages/Settings.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'leads', element: <Leads /> },
      { path: 'calls', element: <Calls /> },
      { path: 'agents', element: <Agents /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'billing', element: <Billing /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
