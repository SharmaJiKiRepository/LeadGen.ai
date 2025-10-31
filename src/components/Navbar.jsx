import { Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 sticky top-0 z-50">
      {/* Left side */}
      <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-gray-800">
          <Bell size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500"></span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md px-3 py-1">
          <User size={20} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
