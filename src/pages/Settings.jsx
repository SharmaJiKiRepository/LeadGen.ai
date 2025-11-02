import React, { useState } from "react";
import {
  Building,
  Repeat,
  Link as LinkIcon,
  ShieldCheck,
  Users,
  Plus,
} from "lucide-react";

/* -------------------- Toggle Component -------------------- */
function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${
        checked ? "bg-blue-500" : "bg-slate-200"
      }`}
    >
      <span
        className={`inline-block w-4 h-4 bg-white rounded-full transform transition-transform ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

/* -------------------- Tab Button Component -------------------- */
function TabButton({ id, label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition flex-shrink-0 ${
        active ? "bg-white shadow" : "bg-transparent hover:bg-white/50"
      }`}
      aria-pressed={active}
    >
      {Icon && <Icon className="w-4 h-4 text-slate-500" />}
      <span
        className={`${
          active ? "text-slate-900 font-medium" : "text-slate-600"
        } whitespace-nowrap`}
      >
        {label}
      </span>
    </button>
  );
}

/* -------------------- Main Settings Page -------------------- */
export default function Settings() {
  const tabs = [
    { id: "org", label: "Organization", icon: Building },
    { id: "routing", label: "Routing", icon: Repeat },
    { id: "integrations", label: "Integrations", icon: LinkIcon },
    { id: "consent", label: "Consent", icon: ShieldCheck },
    { id: "users", label: "Users", icon: Users },
  ];

  const [activeTab, setActiveTab] = useState("org");

  /* ---------- Mock Data ---------- */
  const [org, setOrg] = useState({
    name: "MoveMaster Pro",
    email: "contact@movemaster.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94102",
  });

  const [routes, setRoutes] = useState([
    {
      id: 1,
      title: "West Coast Routes",
      desc: "ZIP codes: 90000–99999 → AI Bot + John Smith",
      enabled: true,
    },
    {
      id: 2,
      title: "East Coast Routes",
      desc: "ZIP codes: 00001–19999 → AI Bot + Jane Doe",
      enabled: true,
    },
    {
      id: 3,
      title: "High-Value Leads",
      desc: "Score > 85 → Priority queue",
      enabled: true,
    },
  ]);

  const [integrations, setIntegrations] = useState([
    { id: "twilio", name: "Twilio", enabled: true },
    { id: "calendar", name: "Google Calendar", enabled: true },
    { id: "slack", name: "Slack", enabled: true },
    { id: "zapier", name: "Zapier", enabled: false },
  ]);

  const [consents, setConsents] = useState([
    {
      id: 1,
      phone: "+1 (555) 234-5678",
      date: "Jun 15, 2024",
      status: "Active",
    },
    {
      id: 2,
      phone: "+1 (555) 345-6789",
      date: "Jun 12, 2024",
      status: "Opted Out",
    },
    {
      id: 3,
      phone: "+1 (555) 456-7890",
      date: "Jun 10, 2024",
      status: "Active",
    },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "John Smith", email: "john@movemaster.com", role: "Admin" },
    { id: 2, name: "Jane Doe", email: "jane@movemaster.com", role: "Sales Rep" },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@movemaster.com",
      role: "Sales Rep",
    },
  ]);

  /* ---------- Handlers ---------- */
  const updateOrgField = (key, value) => setOrg((s) => ({ ...s, [key]: value }));
  const toggleRoute = (id) =>
    setRoutes((r) => r.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)));
  const toggleIntegration = (id) =>
    setIntegrations((list) =>
      list.map((it) => (it.id === id ? { ...it, enabled: !it.enabled } : it))
    );
  const revokeConsent = (id) =>
    setConsents((c) => c.map((x) => (x.id === id ? { ...x, status: "Opted Out" } : x)));
  const inviteUser = () => alert("Invite user flow — implement modal or API call here.");

  /* ---------- Tabs ---------- */
  const OrgTab = () => (
    <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        Organization Profile
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="space-y-1">
          <div className="text-sm text-slate-600">Company Name</div>
          <input
            className="w-full px-3 py-2 rounded-lg border border-slate-200"
            value={org.name}
            onChange={(e) => updateOrgField("name", e.target.value)}
          />
        </label>
        <label className="space-y-1">
          <div className="text-sm text-slate-600">Business Email</div>
          <input
            className="w-full px-3 py-2 rounded-lg border border-slate-200"
            value={org.email}
            onChange={(e) => updateOrgField("email", e.target.value)}
          />
        </label>
        <label className="space-y-1">
          <div className="text-sm text-slate-600">Phone Number</div>
          <input
            className="w-full px-3 py-2 rounded-lg border border-slate-200"
            value={org.phone}
            onChange={(e) => updateOrgField("phone", e.target.value)}
          />
        </label>
        <label className="space-y-1 sm:col-span-2">
          <div className="text-sm text-slate-600">Business Address</div>
          <input
            className="w-full px-3 py-2 rounded-lg border border-slate-200"
            value={org.address}
            onChange={(e) => updateOrgField("address", e.target.value)}
          />
        </label>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 w-full sm:w-auto"
          onClick={() => alert("Saved (wire to API)")}
        >
          Save Changes
        </button>
      </div>
    </section>
  );

  const RoutingTab = () => (
    <section className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
        <h3 className="text-base sm:text-lg font-semibold mb-4">
          Lead Routing Rules
        </h3>
        <div className="space-y-3">
          {routes.map((r) => (
            <div
              key={r.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50 p-4 rounded-lg overflow-hidden"
            >
              <div className="min-w-0">
                <div className="font-medium text-sm sm:text-base break-words">{r.title}</div>
                <div className="text-xs sm:text-sm text-slate-500 break-words">{r.desc}</div>
              </div>
              <Toggle checked={r.enabled} onChange={() => toggleRoute(r.id)} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button
            className="flex items-center justify-center gap-2 px-3 py-2 bg-white border rounded text-sm w-full sm:w-auto"
            onClick={() => alert("Add rule flow")}
          >
            <Plus className="w-4 h-4" /> Add New Rule
          </button>
        </div>
      </div>
    </section>
  );

  const IntegrationsTab = () => (
    <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
      <h3 className="text-base sm:text-lg font-semibold mb-4">Integrations</h3>
      <div className="space-y-3">
        {integrations.map((it) => (
          <div
            key={it.id}
            className="flex items-center justify-between bg-slate-50 p-4 rounded-lg"
          >
            <div className="font-medium text-sm sm:text-base">{it.name}</div>
            <Toggle checked={it.enabled} onChange={() => toggleIntegration(it.id)} />
          </div>
        ))}
      </div>
    </section>
  );

  const ConsentTab = () => (
    <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
      <h3 className="text-base sm:text-lg font-semibold mb-4">
        Consent Management
      </h3>
      <div className="space-y-3">
        {consents.map((c) => (
          <div
            key={c.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50 p-4 rounded-lg overflow-hidden"
          >
            <div className="min-w-0">
              <div className="font-medium text-sm sm:text-base break-words">{c.phone}</div>
              <div className="text-xs text-slate-500">{c.date}</div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`px-2 py-1 text-xs rounded-md ${
                  c.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {c.status}
              </div>
              {c.status !== "Opted Out" && (
                <button
                  onClick={() => revokeConsent(c.id)}
                  className="text-xs sm:text-sm text-slate-600 hover:underline"
                >
                  Opt out
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const UsersTab = () => (
    <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h3 className="text-base sm:text-lg font-semibold">Team Members</h3>
        <button
          onClick={inviteUser}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg w-full sm:w-auto"
        >
          Invite User
        </button>
      </div>
      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50 p-4 rounded-lg overflow-hidden"
          >
            <div className="min-w-0">
              <div className="font-medium text-sm sm:text-base break-words">{u.name}</div>
              <div className="text-xs text-slate-500 break-all">{u.email}</div>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-white border text-slate-500 text-center">
              {u.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="p-4 sm:p-6 space-y-6 min-w-0">
      <header>
        <h1 className="text-xl sm:text-2xl font-semibold">Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your platform configuration
        </p>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar -mx-2 px-2 py-1 sm:py-0 whitespace-nowrap bg-white/40 rounded-xl shadow-sm min-w-0">
        {tabs.map((t) => (
          <TabButton
            key={t.id}
            id={t.id}
            label={t.label}
            icon={t.icon}
            active={activeTab === t.id}
            onClick={setActiveTab}
          />
        ))}
      </div>

      {/* Active Tab */}
      {activeTab === "org" && <OrgTab />}
      {activeTab === "routing" && <RoutingTab />}
      {activeTab === "integrations" && <IntegrationsTab />}
      {activeTab === "consent" && <ConsentTab />}
      {activeTab === "users" && <UsersTab />}
    </div>
  );
}
