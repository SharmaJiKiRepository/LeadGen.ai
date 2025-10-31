// ai-move-clone/src/pages/Calls.jsx
import React, { useState } from "react";
import { Play, Phone } from "lucide-react";

export default function Calls() {
  const [callLogs] = useState([
    {
      time: "Jun 15, 2024 2:34 PM",
      contact: "Sarah Johnson",
      rep: "AI Bot",
      duration: "12:45",
      status: "Booked",
      transcript:
        "Customer confirmed booking for 3BR move on June 20th...",
      icon: "✅",
    },
    {
      time: "Jun 15, 2024 1:18 PM",
      contact: "Mike Chen",
      rep: "John Smith",
      duration: "8:22",
      status: "Voicemail",
      transcript: "Left detailed message with quote and callback number...",
      icon: "📩",
    },
    {
      time: "Jun 15, 2024 11:42 AM",
      contact: "Emily Rodriguez",
      rep: "AI Bot",
      duration: "5:15",
      status: "No Answer",
      transcript: "—",
      icon: "❌",
    },
    {
      time: "Jun 15, 2024 10:29 AM",
      contact: "David Park",
      rep: "Jane Doe",
      duration: "15:33",
      status: "Quoted",
      transcript:
        "Provided detailed quote for long-distance move, customer interested...",
      icon: "💬",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Calls</h1>
        <p className="text-gray-500">View call activity and start dialing</p>
      </div>

      {/* Power Dialer Section */}
      <div className="bg-white shadow-sm rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="flex justify-between items-start flex-wrap">
          <div>
            <h2 className="font-semibold text-lg">Power Dialer</h2>
            <p className="text-gray-500 text-sm">
              Automatically dial through your lead list with AI assistance
            </p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <Play className="w-4 h-4" /> Start Power Dialer
          </button>
        </div>

        <div className="flex justify-between mt-6 text-center">
          <div>
            <p className="text-2xl font-semibold">156</p>
            <p className="text-gray-500 text-sm">Queued</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">42</p>
            <p className="text-gray-500 text-sm">Connected</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">87%</p>
            <p className="text-gray-500 text-sm">Contact Rate</p>
          </div>
        </div>

        <div className="mt-6 bg-blue-600 rounded-full h-3 w-full relative overflow-hidden">
          <div className="absolute left-0 top-0 h-3 w-4/5 bg-blue-400 animate-pulse"></div>
        </div>

        <div className="absolute top-4 right-4 bg-blue-100 p-3 rounded-full">
          <Phone className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      {/* Call Log */}
      <div className="bg-white shadow-sm rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Call Log</h3>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Rep</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">AI Transcript</th>
              </tr>
            </thead>
            <tbody>
              {callLogs.map((log, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 whitespace-nowrap">{log.time}</td>
                  <td className="py-3 px-4">{log.contact}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                      {log.rep}
                    </span>
                  </td>
                  <td className="py-3 px-4">{log.duration}</td>
                  <td className="py-3 px-4">{log.icon} {log.status}</td>
                  <td className="py-3 px-4 text-gray-500 truncate max-w-xs">
                    {log.transcript}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {callLogs.map((log, idx) => (
            <div key={idx} className="p-4 border rounded-xl bg-[#fbfcfe]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500">{log.time}</div>
                  <div className="mt-1 font-medium">{log.contact}</div>
                  <div className="mt-1 text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">{log.rep}</span>
                  </div>
                </div>
                <div className="text-sm text-slate-600 whitespace-nowrap">{log.duration}</div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">{log.icon} {log.status}</div>
              </div>
              {log.transcript && log.transcript !== "—" && (
                <div className="mt-2 text-sm text-slate-600">{log.transcript}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
