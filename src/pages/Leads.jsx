import React from "react";
import Table from "../components/ui/Table"; // Fixed: default export expected
import Button from "../components/ui/Button";
import { leadsData, statusStyles } from "../data/mockData";

import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilSquareIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const Leads = () => {
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "From - To",
        cell: ({ row }) => (
          <span>
            {row.original.from} &rarr; {row.original.to}
          </span>
        ),
      },
      {
        header: "Source",
        accessorKey: "source",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${
                statusStyles[value] || "bg-gray-100 text-gray-800"
              }`}
            >
              {value}
            </span>
          );
        },
      },
      {
        header: "Score",
        accessorKey: "score",
        cell: ({ getValue }) => {
          const value = getValue();
          return (
            <div className="flex items-center">
              <div className="w-24 bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700">
                {value}
              </span>
            </div>
          );
        },
      },
      {
        header: "Assigned To",
        accessorKey: "assignedTo",
      },
      {
        header: "Actions",
        cell: () => (
          <div className="flex items-center space-x-3">
            <button className="text-gray-400 hover:text-primary transition-colors">
              <PencilSquareIcon className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-primary transition-colors">
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-red-600 transition-colors">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="mt-1 text-gray-600">
            Manage and work your lead pipeline.
          </p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <Button variant="primary" className="whitespace-nowrap">
            + Add Lead
          </Button>
          <Button variant="secondary" className="whitespace-nowrap">
            <FunnelIcon className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="search_leads"
          id="search_leads"
          className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="Search leads..."
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <Table columns={columns} data={leadsData} />
      </div>
    </div>
  );
};

export default Leads;
