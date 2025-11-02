import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import PageWrapper from './components/layout/PageWrapper';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Calls from './pages/Calls';
import AiAgents from './pages/AiAgents';
import Analytics from './pages/Analytics';
import Billing from './pages/Billing';
import Settings from './pages/Settings';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-light-bg font-sans">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <PageWrapper>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/calls" element={<Calls />} />
              <Route path="/ai-agents" element={<AiAgents />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </PageWrapper>
        </main>
      </div>
    </div>
  );
}

export default App;