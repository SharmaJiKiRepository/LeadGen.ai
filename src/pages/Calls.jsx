import React, { useState } from "react";
import { Play, Phone, Clock, ChevronRight } from "lucide-react";

export default function Calls() {
  const [callLogs] = useState([
    {
      time: "Jun 15, 2024 2:34 PM",
      contact: "Sarah Johnson",
      rep: "AI Bot",
      duration: "12:45",
      status: "Booked",
      transcript: "Customer confirmed booking for 3BR move on June 20th...",
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
    <div className="p-6 md:p-10 lg:p-12 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">Calls</h1>
          <p className="text-gray-500 mt-1">View call activity and start dialing</p>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            <Play className="w-4 h-4" /> Start Power Dialer
          </button>
        </div>
      </div>

      {/* Power Dialer Section */}
      <section className="bg-white shadow-md rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-lg">Power Dialer</h2>
            <p className="text-gray-500 text-sm mt-1">
              Automatically dial through your lead list with AI assistance
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center items-center">
              <div>
                <div className="text-2xl md:text-3xl font-semibold">156</div>
                <div className="text-gray-500 text-xs md:text-sm">Queued</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-semibold">42</div>
                <div className="text-gray-500 text-xs md:text-sm">Connected</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-semibold">87%</div>
                <div className="text-gray-500 text-xs md:text-sm">Contact Rate</div>
              </div>
            </div>

            {/* big pill action */}
            <div className="mt-6">
              <button className="w-full md:w-auto inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-lg font-medium transition">
                <Play className="w-4 h-4" />
                <span>Launch Dialer Session</span>
                <span className="sr-only">Launch Dialer Session</span>
              </button>
            </div>
          </div>

          {/* right column with small card and icon */}
          <div className="w-full lg:w-56 flex items-start justify-end">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 w-full text-center">
              <div className="inline-flex items-center justify-center bg-white rounded-full p-3 shadow-sm">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* progress bar */}
        <div className="mt-6">
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className="h-3 rounded-full" style={{ width: "80%", background: "linear-gradient(90deg,#2563eb,#3b82f6)" }} />
          </div>
        </div>

        {/* top-right small floating button for small screens */}
        <div className="absolute right-4 top-4 sm:hidden">
          <button className="bg-blue-600 text-white p-2 rounded-full shadow">
            <Play className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Call Log Section */}
      <section className="bg-white shadow-md rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Call Log</h3>
          <div className="text-sm text-gray-500 hidden sm:block">Showing recent calls</div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto mt-4">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="py-4 px-4">Date & Time</th>
                <th className="py-4 px-4">Contact</th>
                <th className="py-4 px-4">Rep</th>
                <th className="py-4 px-4">Duration</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">AI Transcript</th>
                <th className="py-4 px-4" />
              </tr>
            </thead>
            <tbody>
              {callLogs.map((log, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4 whitespace-nowrap flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{log.time}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium">{log.contact}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs bg-purple-50 text-purple-700 rounded-full">{log.rep}</span>
                  </td>
                  <td className="py-4 px-4">{log.duration}</td>
                  <td className="py-4 px-4">
                    <div className="inline-flex items-center gap-2 text-sm">
                      <span className="text-lg">{log.icon}</span>
                      <span className="text-slate-700">{log.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-500 truncate max-w-[380px]">{log.transcript}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
                      View <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden mt-4 space-y-3">
          {callLogs.map((log, idx) => (
            <article key={idx} className="p-4 border rounded-xl bg-[#fbfcfe]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm text-slate-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="truncate">{log.time}</span>
                  </div>
                  <div className="mt-2 font-medium text-slate-900 truncate">{log.contact}</div>
                  <div className="mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs">{log.rep}</span>
                  </div>
                </div>

                <div className="text-sm text-slate-700 whitespace-nowrap">{log.duration}</div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-slate-700">{log.icon} {log.status}</div>
                <button className="inline-flex items-center gap-2 text-sm text-blue-600">
                  View
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {log.transcript && log.transcript !== "—" && (
                <div className="mt-3 text-sm text-slate-600">{log.transcript}</div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}