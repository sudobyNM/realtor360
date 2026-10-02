import React, { useState } from "react";
import {
  Search,
  Plus,
  LayoutGrid,
  ChevronDown,
  Download,
  Filter,
  Check,
} from "lucide-react";
import type { Contact, ContactStatus } from "../types";

interface ContactsTableProps {
  contacts: Contact[];
  allContactsCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  tableSearch: string;
  onTableSearchChange: (search: string) => void;
  onCreateContact: () => void;
  onSelectContact: (contact: Contact) => void;
  onUpdateStatus: (id: string, status: ContactStatus) => void;
  onExportCSV: () => void;
  onOpenMobileFilters?: () => void;
  activeFilterCount: number;
}

export const ContactsTable: React.FC<ContactsTableProps> = ({
  contacts,

  currentPage,
  totalPages,
  onPageChange,
  tableSearch,
  onTableSearchChange,
  onCreateContact,
  onSelectContact,
  onUpdateStatus,
  onExportCSV,
  onOpenMobileFilters,
  activeFilterCount,
}) => {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);

  // Status Badge visual matching Figma screenshot precisely
  const renderStatusBadge = (status: ContactStatus, contactId: string) => {
    const style = (() => {
      switch (status) {
        case "Active":
          return "border-[#4ade80] text-[#16a34a] bg-emerald-50/30";
        case "In Progress":
          return "border-[#fcd34d] text-[#b45309] bg-amber-50/30";
        case "Cold":
          return "border-[#9ca3af] text-[#4b5563] bg-gray-50/30";
        case "Converted":
          return "border-[#60a5fa] text-[#2563eb] bg-blue-50/30";
        case "Not Interested":
          return "border-[#fca5a5] text-[#dc2626] bg-rose-50/30";
        default:
          return "border-gray-300 text-gray-600 bg-gray-50";
      }
    })();

    return (
      <span
        onClick={(e) => {
          e.stopPropagation();
          // Cycle through statuses for quick convenience
          const statusCycle: ContactStatus[] = [
            "Active",
            "In Progress",
            "Cold",
            "Converted",
            "Not Interested",
          ];
          const nextIndex =
            (statusCycle.indexOf(status) + 1) % statusCycle.length;
          onUpdateStatus(contactId, statusCycle[nextIndex]);
        }}
        title="Click to cycle status"
        className={`inline-block px-3 py-1 rounded-[5px] border text-[12px] font-medium tracking-tight text-center min-w-[85px] cursor-pointer hover:shadow-2xs transition-all ${style}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col">
      {/* Title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[22px] md:text-[24px] font-bold text-gray-900 tracking-tight">
          All Contacts
        </h1>

        {/* Mobile filter button if screen is narrow */}
        {onOpenMobileFilters && (
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="w-3.5 h-3.5 text-[#C6922C]" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        )}
      </div>

      {/* Action Bar / Controls Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        {/* Left: + Create Contact Button */}
        <div>
          <button
            type="button"
            onClick={onCreateContact}
            className="bg-[#C6922C] hover:bg-[#b58223] active:bg-[#a6741d] text-white px-4 py-2 rounded-[5px] text-[13px] font-medium flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="text-base font-semibold leading-none">+</span>
            <span>Create Contact</span>
          </button>
        </div>

        {/* Right Controls: Search, Grid Toggle, Actions Dropdown */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto flex-wrap">
          {/* Search Contact Input matching Figma styling */}
          <div className="relative w-48 sm:w-56 md:w-64">
            <input
              type="text"
              placeholder="Search Contact"
              value={tableSearch}
              onChange={(e) => onTableSearchChange(e.target.value)}
              className="w-full bg-[#F3F4F6] text-gray-800 placeholder-gray-400 text-xs md:text-[13px] py-1.5 pl-3 pr-8 rounded-md border border-gray-200/80 focus:border-[#C6922C] focus:bg-white focus:outline-none transition-all"
            />
            <Search className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* View Mode Toggle Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowViewMenu(!showViewMenu)}
              className="h-8 px-2 border border-gray-200 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center gap-1 transition-colors"
              title="Change view format"
            >
              <LayoutGrid className="w-4 h-4 text-gray-700" />
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {showViewMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowViewMenu(false)}
                />
                <div className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-40 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("table");
                      setShowViewMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between ${
                      viewMode === "table"
                        ? "text-[#C6922C] font-semibold bg-amber-50/50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>Table View</span>
                    {viewMode === "table" && <Check className="w-3 h-3" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("grid");
                      setShowViewMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 flex items-center justify-between ${
                      viewMode === "grid"
                        ? "text-[#C6922C] font-semibold bg-amber-50/50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>Card Grid View</span>
                    {viewMode === "grid" && <Check className="w-3 h-3" />}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Actions Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="h-8 px-3 border border-gray-200 rounded-md text-gray-700 text-xs md:text-[13px] font-medium hover:bg-gray-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Actions</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {showActionsMenu && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setShowActionsMenu(false)}
                />
                <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-xl py-1 z-40 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setShowActionsMenu(false);
                      onExportCSV();
                    }}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#C6922C] flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-gray-500" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowActionsMenu(false);
                      onCreateContact();
                    }}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#C6922C] flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-gray-500" />
                    <span>Add Contact</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Table View */}
      {viewMode === "table" ? (
        <div className="bg-white overflow-x-auto select-text">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-900 text-[13px] md:text-[14px]">
                <th className="py-3 px-3 font-semibold whitespace-nowrap">
                  Contact Name
                </th>
                <th className="py-3 px-3 font-semibold whitespace-nowrap">
                  Company
                </th>
                <th className="py-3 px-3 font-semibold whitespace-nowrap">
                  Role
                </th>
                <th className="py-3 px-3 font-semibold whitespace-nowrap">
                  Phone No.
                </th>
                <th className="py-3 px-3 font-semibold whitespace-nowrap">
                  Deal Stage
                </th>
                <th className="py-3 px-3 font-semibold text-center whitespace-nowrap">
                  Status
                </th>
                <th className="py-3 px-3 font-semibold whitespace-nowrap">
                  Assigned to
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-16 text-center text-gray-400 text-sm"
                  >
                    No contacts found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => onSelectContact(contact)}
                    className="hover:bg-amber-50/20 transition-colors cursor-pointer group"
                  >
                    {/* Contact Name & Email */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <div className="font-semibold text-gray-900 text-[13.5px] leading-snug group-hover:text-[#C6922C] transition-colors">
                        {contact.name}
                      </div>
                      <div className="text-[12px] text-gray-500 mt-0.5">
                        Email: {contact.email}
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-3 text-[13.5px] text-gray-700 whitespace-nowrap">
                      {contact.company}
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-3 text-[13.5px] text-gray-700 whitespace-nowrap">
                      {contact.role}
                    </td>

                    {/* Phone No. */}
                    <td className="py-3.5 px-3 text-[13.5px] text-gray-700 font-mono tracking-tight whitespace-nowrap tabular-nums">
                      {contact.phone}
                    </td>

                    {/* Deal Stage */}
                    <td className="py-3.5 px-3 text-[13.5px] text-gray-700 whitespace-nowrap">
                      {contact.dealStage}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      {renderStatusBadge(contact.status, contact.id)}
                    </td>

                    {/* Assigned to */}
                    <td className="py-3.5 px-3 text-[13.5px] text-gray-700 whitespace-nowrap">
                      {contact.assignedTo}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Alternate Card Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[#C6922C] hover:shadow-sm transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {contact.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Email: {contact.email}
                  </p>
                </div>
                {renderStatusBadge(contact.status, contact.id)}
              </div>

              <div className="text-xs text-gray-600 space-y-1.5 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Company:</span>
                  <span className="font-medium text-gray-800">
                    {contact.company}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Role:</span>
                  <span className="font-medium text-gray-800">
                    {contact.role}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="font-mono text-gray-800">
                    {contact.phone}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Deal Stage:</span>
                  <span className="font-medium text-gray-800">
                    {contact.dealStage}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Assigned To:</span>
                  <span className="font-medium text-gray-800">
                    {contact.assignedTo}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination matching Figma: < Prev | 1 | 2 | 3 | Next > */}
      <div className="mt-8 mb-6 flex items-center justify-center select-none text-[13px] text-gray-600">
        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`cursor-pointer transition-colors ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "hover:text-[#C6922C]"
            }`}
          >
            &lt; Prev
          </button>

          <span className="text-gray-300">|</span>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum, idx) => {
              const isActive = pageNum === currentPage;
              return (
                <React.Fragment key={pageNum}>
                  <button
                    type="button"
                    onClick={() => onPageChange(pageNum)}
                    className={`w-6 h-6 flex items-center justify-center rounded-[3px] text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#F2DFAC] text-[#865910]"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                  {idx < totalPages - 1 && (
                    <span className="text-gray-300">|</span>
                  )}
                </React.Fragment>
              );
            },
          )}

          <span className="text-gray-300">|</span>

          {/* Next */}
          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`cursor-pointer transition-colors ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "hover:text-[#C6922C]"
            }`}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
