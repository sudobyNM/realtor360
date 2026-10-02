import React, { useState } from "react";
import { Search, Check } from "lucide-react";
import type {
  ContactStatus,
  ContactRole,
  City,
  LeadSource,
  FilterState,
} from "../types";

interface FiltersSidebarProps {
  filters: FilterState;
  onApplyFilters: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  className?: string;
  onCloseMobile?: () => void;
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  onApplyFilters,
  onResetFilters,
  className = "",
  onCloseMobile,
}) => {
  // Keep edits as a draft of the current applied filters until "Apply" is clicked.
  const [pendingFilters, setPendingFilters] = useState<{
    source: FilterState;
    value: FilterState;
  } | null>(null);
  const localFilters =
    pendingFilters?.source === filters ? pendingFilters.value : filters;
  const updateLocalFilters = (update: (current: FilterState) => FilterState) => {
    setPendingFilters((pending) => ({
      source: filters,
      value: update(pending?.source === filters ? pending.value : filters),
    }));
  };

  const statusOptions: ContactStatus[] = [
    "Active",
    "In Progress",
    "Converted",
    "Cold",
    "Not Interested",
  ];
  const roleOptions: ContactRole[] = ["Buyer", "Seller", "Investor", "Broker"];
  const assignedToOptions = ["Jessica", "Mohit", "Arjun", "Emily"];
  const cityOptions: City[] = [
    "Bengaluru",
    "Pune",
    "Mumbai",
    "Hyderabad",
    "Delhi",
  ];
  const leadSourceOptions: LeadSource[] = [
    "Website Form",
    "Referral",
    "Facebook Ads",
    "Walk-In",
    "Email Campaign",
  ];

  const toggleStatus = (status: ContactStatus) => {
    updateLocalFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }));
  };

  const toggleRole = (role: ContactRole) => {
    updateLocalFilters((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const toggleAssignedTo = (agent: string) => {
    updateLocalFilters((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(agent)
        ? prev.assignedTo.filter((a) => a !== agent)
        : [...prev.assignedTo, agent],
    }));
  };

  const toggleCity = (city: City) => {
    updateLocalFilters((prev) => ({
      ...prev,
      cities: prev.cities.includes(city)
        ? prev.cities.filter((c) => c !== city)
        : [...prev.cities, city],
    }));
  };

  const toggleLeadSource = (source: LeadSource) => {
    updateLocalFilters((prev) => ({
      ...prev,
      leadSources: prev.leadSources.includes(source)
        ? prev.leadSources.filter((s) => s !== source)
        : [...prev.leadSources, source],
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onCloseMobile?.();
  };

  const handleReset = () => {
    const emptyState: FilterState = {
      searchTerm: "",
      contactNameSearch: "",
      statuses: [],
      roles: [],
      assignedTo: [],
      cities: [],
      leadSources: [],
    };
    updateLocalFilters(() => emptyState);
    onResetFilters();
    onCloseMobile?.();
  };

  return (
    <aside
      className={`w-full lg:w-[245px] shrink-0 bg-white select-none ${className}`}
    >
      {/* Title */}
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-[20px] font-bold text-gray-900 tracking-tight">
          Filters
        </h2>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-gray-500 hover:text-gray-900 p-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search by Contact Name Input */}
      <div className="relative mb-5">
        <input
          type="text"
          placeholder="Search by Contact Name"
          value={localFilters.contactNameSearch}
          onChange={(e) =>
            updateLocalFilters((prev) => ({
              ...prev,
              contactNameSearch: e.target.value,
            }))
          }
          className="w-full text-xs text-gray-800 placeholder-gray-400 py-1.5 pl-3 pr-8 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none transition-colors"
        />
        <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Filter Sections */}
      <div className="space-y-4 text-xs text-gray-700">
        {/* Status Group */}
        <div>
          <h3 className="font-semibold text-gray-900 text-[14px] mb-2">
            Status
          </h3>
          <div className="space-y-1.5">
            {statusOptions.map((status) => {
              const checked = localFilters.statuses.includes(status);
              return (
                <label
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className="flex items-center gap-2 cursor-pointer group hover:text-gray-900 transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded-[3px] border transition-colors flex items-center justify-center ${
                      checked
                        ? "bg-[#C6922C] border-[#C6922C]"
                        : "border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {checked && (
                      <Check className="w-3 h-3 text-white stroke-[2.5]" />
                    )}
                  </div>
                  <span className="text-[13px] text-gray-700">{status}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Role Group */}
        <div>
          <h3 className="font-semibold text-gray-900 text-[14px] mb-2">Role</h3>
          <div className="space-y-1.5">
            {roleOptions.map((role) => {
              const checked = localFilters.roles.includes(role);
              return (
                <label
                  key={role}
                  onClick={() => toggleRole(role)}
                  className="flex items-center gap-2 cursor-pointer group hover:text-gray-900 transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded-[3px] border transition-colors flex items-center justify-center ${
                      checked
                        ? "bg-[#C6922C] border-[#C6922C]"
                        : "border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {checked && (
                      <Check className="w-3 h-3 text-white stroke-[2.5]" />
                    )}
                  </div>
                  <span className="text-[13px] text-gray-700">{role}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Assigned To Group */}
        <div>
          <h3 className="font-semibold text-gray-900 text-[14px] mb-2">
            Assigned To
          </h3>
          <div className="space-y-1.5">
            {assignedToOptions.map((agent) => {
              const checked = localFilters.assignedTo.includes(agent);
              return (
                <label
                  key={agent}
                  onClick={() => toggleAssignedTo(agent)}
                  className="flex items-center gap-2 cursor-pointer group hover:text-gray-900 transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded-[3px] border transition-colors flex items-center justify-center ${
                      checked
                        ? "bg-[#C6922C] border-[#C6922C]"
                        : "border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {checked && (
                      <Check className="w-3 h-3 text-white stroke-[2.5]" />
                    )}
                  </div>
                  <span className="text-[13px] text-gray-700">{agent}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* City Group */}
        <div>
          <h3 className="font-semibold text-gray-900 text-[14px] mb-2">City</h3>
          <div className="space-y-1.5">
            {cityOptions.map((city) => {
              const checked = localFilters.cities.includes(city);
              return (
                <label
                  key={city}
                  onClick={() => toggleCity(city)}
                  className="flex items-center gap-2 cursor-pointer group hover:text-gray-900 transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded-[3px] border transition-colors flex items-center justify-center ${
                      checked
                        ? "bg-[#C6922C] border-[#C6922C]"
                        : "border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {checked && (
                      <Check className="w-3 h-3 text-white stroke-[2.5]" />
                    )}
                  </div>
                  <span className="text-[13px] text-gray-700">{city}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Lead Source Group */}
        <div>
          <h3 className="font-semibold text-gray-900 text-[14px] mb-2">
            Lead Source
          </h3>
          <div className="space-y-1.5">
            {leadSourceOptions.map((source) => {
              const checked = localFilters.leadSources.includes(source);
              return (
                <label
                  key={source}
                  onClick={() => toggleLeadSource(source)}
                  className="flex items-center gap-2 cursor-pointer group hover:text-gray-900 transition-colors"
                >
                  <div
                    className={`w-4 h-4 rounded-[3px] border transition-colors flex items-center justify-center ${
                      checked
                        ? "bg-[#C6922C] border-[#C6922C]"
                        : "border-gray-300 bg-white group-hover:border-gray-400"
                    }`}
                  >
                    {checked && (
                      <Check className="w-3 h-3 text-white stroke-[2.5]" />
                    )}
                  </div>
                  <span className="text-[13px] text-gray-700">{source}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-2 pt-2">
        <button
          type="button"
          onClick={handleApply}
          className="w-full bg-[#C6922C] hover:bg-[#b58223] active:bg-[#a6741d] text-white py-2 px-4 rounded-[5px] text-[13px] font-medium transition-all shadow-xs cursor-pointer"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="w-full bg-white hover:bg-amber-50/40 text-gray-800 border border-[#C6922C] py-2 px-4 rounded-[5px] text-[13px] font-medium transition-all cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
};
