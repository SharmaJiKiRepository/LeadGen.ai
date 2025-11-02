import { ArrowUpIcon } from "@heroicons/react/24/solid";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import LeadsVsBookingsChart from "../components/charts/LeadsVsBookingsChart";
import AiVsHumanChart from "../components/charts/AiVsHumanChart";
import { dashboardStats, recentActivity } from "../data/mockData";
import clsx from "clsx";

// Fixed StatCard
const StatCard = ({ item }) => {
  const { Icon, title, value, change, isPrimary } = item;

  return (
    <Card
      className={clsx(
        "transition-colors duration-200",
        isPrimary
          ? "bg-indigo-600 text-white"
          : "bg-white text-gray-900 border border-gray-200"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p
            className={clsx(
              "text-sm font-medium",
              isPrimary ? "text-indigo-100" : "text-gray-500"
            )}
          >
            {title}
          </p>
          <p className="mt-1 text-3xl font-semibold">{value}</p>
        </div>

        <div
          className={clsx(
            "flex items-center text-sm font-semibold",
            isPrimary ? "text-indigo-100" : "text-green-600"
          )}
        >
          <span
            className={clsx(
              "rounded-full p-1 flex items-center justify-center",
              isPrimary ? "bg-white/20 text-white" : "bg-green-100"
            )}
          >
            <ArrowUpIcon className="h-4 w-4" />
          </span>
          <span className="ml-2">{change}</span>
        </div>
      </div>
    </Card>
  );
};

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">
          Welcome back! Here's your business overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((item) => (
          <StatCard key={item.title} item={item} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <h3 className="text-lg font-semibold text-gray-800">
            Leads vs Bookings
          </h3>
          <div className="mt-4 h-80">
            <LeadsVsBookingsChart />
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800">AI vs Human</h3>
          <div className="mt-4 h-80">
            <AiVsHumanChart />
          </div>
        </Card>
      </div>

      {/* Actions + Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button variant="primary">Start Dialer</Button>
            <Button variant="secondary">Create AI Agent</Button>
            <Button variant="secondary">Buy Leads</Button>
          </div>
        </Card>
        <Card className="lg:col-span-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <ul className="space-y-4">
            {recentActivity.map((activity, index) => (
              <li key={index} className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{activity.name}</p>
                  <p className="text-sm text-gray-500">{activity.contact}</p>
                  <p className="mt-1 text-sm text-gray-700">
                    {activity.summary}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{activity.time}</p>
                </div>
                <button className="ml-4 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-primary hover:bg-indigo-200">
                  AI Summary
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
