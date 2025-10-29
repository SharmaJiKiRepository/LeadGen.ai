// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Calls from "./pages/Calls";
import AiAgents from "./pages/AiAgents";
import Analytics from "./pages/Analytics";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper */}
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="calls" element={<Calls />} />
          <Route path="ai-agents" element={<AiAgents />} />
          <Route path="agents" element={<AiAgents />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
