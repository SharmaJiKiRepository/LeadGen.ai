// src/pages/Billing.jsx
import React from "react";
import ProgressBar from "../components/ProgressBar";
import { CheckCircle, Download, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";

export default function Billing() {
  const usageData = [
    { label: "Leads Delivered", used: 641, total: 10000, percent: 6.4 },
    { label: "Call Minutes", used: 2847, total: 5000, percent: 56.9 },
    { label: "AI Tokens", used: 1.2, total: 5, percent: 24.0, unit: "M" },
    { label: "SMS Sent", used: 3482, total: 10000, percent: 34.8 },
  ];

  const featuresLeft = [
    "Unlimited AI Agents",
    "Priority Support",
    "White-label Options",
    "Team Collaboration",
  ];

  const featuresRight = [
    "Advanced Analytics",
    "Custom Integrations",
    "API Access",
    "Custom Reports",
  ];

  const invoices = [
    { id: "INV-2024-06", date: "Jun 1, 2024", amount: "$499", status: "Paid" },
    { id: "INV-2024-05", date: "May 1, 2024", amount: "$499", status: "Paid" },
    { id: "INV-2024-04", date: "Apr 1, 2024", amount: "$399", status: "Paid" },
    { id: "INV-2024-03", date: "Mar 1, 2024", amount: "$399", status: "Paid" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Billing</h1>
        <p className="text-gray-500">Manage your plan and usage</p>
      </div>

      {/* Plan Card */}
      <section className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <h2 className="text-xl font-medium">Pro Plan</h2>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-gray-500">
                10,000 leads/month with full features
              </span>
              <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md">
                Active
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold">$499</p>
            <p className="text-sm text-gray-500">per month</p>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition">
            <ArrowUp size={16} /> Upgrade Plan
          </button>
          <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm transition">
            <ArrowDown size={16} /> Downgrade Plan
          </button>
        </div>
      </section>

      {/* Usage Section */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Current Usage</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {usageData.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
            >
              <h3 className="font-medium text-gray-800 mb-1">{item.label}</h3>
              <ProgressBar percent={item.percent} />
              <div className="text-sm text-gray-500 mt-1">
                {item.unit
                  ? `${item.used} / ${item.total}${item.unit} tokens`
                  : `${item.used} / ${item.total} ${
                      item.label.includes("Minutes") ? "minutes" : "leads/messages"
                    }`}
              </div>
              <p className="text-xs text-gray-400">{item.percent}% used</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-3">Plan Features</h2>
          <ul className="space-y-2">
            {featuresLeft.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <CheckCircle size={18} className="text-green-500" /> {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <ul className="space-y-2 mt-9">
            {featuresRight.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <CheckCircle size={18} className="text-green-500" /> {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Invoice History */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Invoice History</h2>
          <button className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition">
            <ExternalLink size={16} /> Export All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Invoice ID</th>
                <th className="py-2">Date</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3">{inv.id}</td>
                  <td>{inv.date}</td>
                  <td className="font-medium">{inv.amount}</td>
                  <td>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md">
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    <button className="flex items-center gap-1 text-blue-600 hover:underline text-sm">
                      <Download size={14} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
