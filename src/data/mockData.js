import {
    UsersIcon,
    PhoneArrowUpRightIcon,
    CalendarDaysIcon,
    ChartBarIcon,
  } from '@heroicons/react/24/outline';
  
  // Data for the 4 main stat cards on the dashboard
  export const dashboardStats = [
    {
      title: 'Leads Received',
      value: '641',
      change: '+28%',
      Icon: UsersIcon,
      isPrimary: true,
    },
    {
      title: 'Contact Rate',
      value: '87%',
      change: '+5%',
      Icon: PhoneArrowUpRightIcon,
      isPrimary: false,
    },
    {
      title: 'Bookings',
      value: '234',
      change: '+19%',
      Icon: CalendarDaysIcon,
      isPrimary: false,
    },
    {
      title: 'ROI',
      value: '342%',
      change: '+12%',
      Icon: ChartBarIcon,
      isPrimary: false,
    },
  ];
  
  // Data for the "Leads vs Bookings" line chart
  export const leadsVsBookingsData = [
    { name: 'Jan', Leads: 240, Bookings: 98 },
    { name: 'Feb', Leads: 300, Bookings: 115 },
    { name: 'Mar', Leads: 430, Bookings: 155 },
    { name: 'Apr', Leads: 389, Bookings: 142 },
    { name: 'May', Leads: 480, Bookings: 190 },
    { name: 'Jun', Leads: 630, Bookings: 225 },
  ];
  
  // Data for the "AI vs Human" donut chart
  export const aiVsHumanData = [
      { name: 'AI Handled', value: 68 },
      { name: 'Human Handle', value: 32 },
  ];
  export const AI_VS_HUMAN_COLORS = ['#818cf8', '#4f46e5'];
  
  
  // Data for the "Recent Activity" list
  export const recentActivity = [
    {
      name: 'Sarah Johnson',
      contact: '90210 → 10001',
      time: '2 mins ago',
      summary: 'Lead responded positively, likely to book. Needs quote for 3BR move.',
    },
    {
      name: 'Mike Chen',
      contact: '94102 → 60601',
      time: '15 mins ago',
      summary: 'Price-sensitive customer. Requested call back tomorrow at 2 PM.',
    },
    {
      name: 'Emily Rodriguez',
      contact: '33101 → 98101',
      time: '28 mins ago',
      summary: 'Immediate booking! Moving next week. Full-service package selected.',
    },
  ];

  
//Data for calls page
export const usageStats = [
    {
        label: "Leads Delivered",
        current: 641,
        total: 10000,
        unit: "leads",
        value: (641 / 10000) * 100,
    },
    {
        label: "Call Minutes",
        current: 2847,
        total: 5000,
        unit: "minutes",
        value: (2847 / 5000) * 100,
    },
    {
        label: "AI Tokens",
        current: 1.2,
        total: 5,
        unit: "M tokens",
        value: (1.2 / 5) * 100,
    },
    {
        label: "SMS Sent",
        current: 3482,
        total: 10000,
        unit: "messages",
        value: (3482 / 10000) * 100,
    },
];

export const planFeatures = [
    "Unlimited AI Agents",
    "Advanced Analytics",
    "Priority Support",
    "Custom Integrations",
    "White-label Options",
    "API Access",
    "Team Collaboration",
    "Custom Reports",
];

export const invoiceHistory = [
    { id: "INV-2024-06", date: "Jun 1, 2024", amount: "$499", status: "Paid" },
    { id: "INV-2024-05", date: "May 1, 2024", amount: "$499", status: "Paid" },
    { id: "INV-2024-04", date: "Apr 1, 2024", amount: "$399", status: "Paid" },
    { id: "INV-2024-03", date: "Mar 1, 2024", amount: "$399", status: "Paid" },
];

// Data for the Leads page table
export const leadsData = [
    { name: 'Sarah Johnson', from: '90210', to: '10001', source: 'Google Ads', status: 'New', score: 92, assignedTo: 'AI Bot' },
    { name: 'Mike Chen', from: '94102', to: '60601', source: 'Facebook', status: 'Contacted', score: 78, assignedTo: 'John Smith' },
    { name: 'Emily Rodriguez', from: '33101', to: '98101', source: 'Organic', status: 'Booked', score: 95, assignedTo: 'AI Bot' },
    { name: 'David Park', from: '02108', to: '94102', source: 'Referral', status: 'Quoted', score: 85, assignedTo: 'Jane Doe' },
    { name: 'Lisa Anderson', from: '10001', to: '90210', source: 'Google Ads', status: 'New', score: 71, assignedTo: 'AI Bot' },
  ];
  
  // Helper object for styling the status tags in the Leads table
  export const statusStyles = {
    New: 'bg-blue-100 text-blue-800',
    Contacted: 'bg-yellow-100 text-yellow-800',
    Booked: 'bg-green-100 text-green-800',
    Quoted: 'bg-purple-100 text-purple-800',
  };