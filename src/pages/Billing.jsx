import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { usageStats, planFeatures, invoiceHistory } from '../data/mockData';
import { CheckIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const Billing = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Billing</h1>
        <p className="mt-1 text-gray-600">Manage your plan and usage.</p>
      </div>

      {/* Current Plan Card */}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Pro Plan</h2>
            <p className="text-gray-500">10,000 leads/month with full features</p>
          </div>
          <div className="text-right">
             <p className="text-3xl font-bold text-gray-900">$499 <span className="text-base font-normal text-gray-500">per month</span></p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="primary">Upgrade Plan</Button>
            <Button variant="secondary">Downgrade Plan</Button>
          </div>
        </div>
      </Card>

      {/* Current Usage Card */}
      <Card>
        <h2 className="text-lg font-bold text-gray-800 mb-6">Current Usage</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {usageStats.map((stat) => (
                <ProgressBar
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    current={stat.current}
                    total={stat.total}
                    unit={stat.unit}
                />
            ))}
        </div>
      </Card>

      {/* Plan Features Card */}
      <Card>
        <h2 className="text-lg font-bold text-gray-800 mb-6">Plan Features</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {planFeatures.map((feature) => (
                <li key={feature} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2"/>
                    <span className="text-gray-700">{feature}</span>
                </li>
            ))}
        </ul>
      </Card>

      {/* Invoice History Card */}
       <Card>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Invoice History</h2>
            <Button variant='secondary'>Export All</Button>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {invoiceHistory.map((invoice) => (
                        <tr key={invoice.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                    {invoice.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-primary hover:text-primary-dark inline-flex items-center">
                                    <ArrowDownTrayIcon className="h-4 w-4 mr-1"/> Download
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       </Card>
    </div>
  );
};

export default Billing;