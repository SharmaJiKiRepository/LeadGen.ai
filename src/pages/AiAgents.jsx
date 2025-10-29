
import React, { useState } from "react";
import { Bot, Settings2 } from "lucide-react";

export default function AiAgents() {
  const [agents, setAgents] = useState([
    {
      name: "MoveBot Pro",
      channels: ["SMS", "Email", "Voice"],
      rate: 2.3,
    },
    {
      name: "QuoteBot",
      channels: ["Email"],
      rate: 1.8,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (formData.name.trim() === "")
      return alert("Please enter an agent name first!");
    alert(`✅ New agent "${formData.name}" created!`);
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Agents</h1>
        <p className="text-gray-500">
          Create and manage your AI-powered assistants
        </p>
      </div>

      {/* Active Agents */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Active Agents
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {agents.map((agent, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative hover:shadow-md transition"
            >
              {/* Top row */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{agent.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {agent.channels.map((ch, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="p-2 bg-indigo-50 rounded-lg hover:scale-105 transition">
                  <Settings2 className="w-4 h-4 text-indigo-600" />
                </button>
              </div>

              {/* Handling Rate */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-1">Handling Rate</p>
                <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${agent.rate * 30}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold">{agent.rate}s</span> Avg.
                  Response
                </p>
              </div>

              {/* Icon */}
              <div className="absolute top-4 right-4 bg-indigo-100 p-3 rounded-full">
                <Bot className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Create New Agent */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-6 text-gray-800">
          Create New Agent
        </h2>

        {/* Steps */}
        <div className="flex justify-between mb-8 text-gray-500 text-center text-sm flex-wrap">
          {["Name", "Channels", "Tone", "Connect", "Train", "Test"].map(
            (step, i) => (
              <div key={i} className="flex-1 min-w-[80px] mb-3">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-xl">
                    {i === 0 ? <Bot size={18} /> : <Settings2 size={18} />}
                  </div>
                </div>
                <p>{step}</p>
              </div>
            )
          )}
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Agent Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., MoveBot, QuoteAssistant..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What will this agent help with?"
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition">
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
