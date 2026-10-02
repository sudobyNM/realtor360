import React, { useState } from "react";
import {
  X,
  Mail,
  Phone,
  Building,
  MapPin,
  Tag,
  
  User,
 
} from "lucide-react";
import type { Contact, ContactStatus } from "../types";

interface ContactDetailModalProps {
  contact: Contact | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: ContactStatus) => void;
}

export const ContactDetailModal: React.FC<ContactDetailModalProps> = ({
  contact,
  onClose,
  onUpdateStatus,
}) => {
  const [currentStatus, setCurrentStatus] = useState<ContactStatus>(
    contact?.status ?? "Active",
  );

  if (!contact) return null;

  const getStatusBadgeStyle = (status: ContactStatus) => {
    switch (status) {
      case "Active":
        return "border-[#4ade80] text-[#16a34a] bg-emerald-50/50";
      case "In Progress":
        return "border-[#fcd34d] text-[#b45309] bg-amber-50/50";
      case "Cold":
        return "border-[#9ca3af] text-[#4b5563] bg-gray-50/50";
      case "Converted":
        return "border-[#60a5fa] text-[#2563eb] bg-blue-50/50";
      case "Not Interested":
        return "border-[#f87171] text-[#dc2626] bg-rose-50/50";
      default:
        return "border-gray-300 text-gray-700 bg-gray-50";
    }
  };

  const handleStatusChange = (status: ContactStatus) => {
    setCurrentStatus(status);
    onUpdateStatus(contact.id, status);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#C6922C]/15 border border-[#C6922C]/30 text-[#C6922C] font-bold text-lg flex items-center justify-center">
              {contact.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {contact.name}
                </h3>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded border font-medium ${getStatusBadgeStyle(
                    currentStatus,
                  )}`}
                >
                  {currentStatus}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {contact.company} · {contact.role}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-gray-700">
          {/* Quick status selector */}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center justify-between">
            <span className="font-semibold text-gray-700">Change Status:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(
                [
                  "Active",
                  "In Progress",
                  "Converted",
                  "Cold",
                  "Not Interested",
                ] as ContactStatus[]
              ).map((st) => (
                <button
                  key={st}
                  onClick={() => handleStatusChange(st)}
                  className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
                    currentStatus === st
                      ? `${getStatusBadgeStyle(st)} ring-1 ring-offset-1 ring-current font-semibold`
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-400 block font-medium">
                  Email Address
                </span>
                <span className="text-gray-900 font-medium">
                  {contact.email}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-400 block font-medium">
                  Phone Number
                </span>
                <span className="text-gray-900 font-mono font-medium">
                  {contact.phone}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Building className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-400 block font-medium">
                  Company & Role
                </span>
                <span className="text-gray-900 font-medium">
                  {contact.company} ({contact.role})
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-400 block font-medium">
                  Assigned Agent
                </span>
                <span className="text-gray-900 font-medium">
                  {contact.assignedTo}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Tag className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-400 block font-medium">
                  Deal Stage
                </span>
                <span className="text-gray-900 font-medium">
                  {contact.dealStage}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-gray-400 block font-medium">
                  City & Lead Source
                </span>
                <span className="text-gray-900 font-medium">
                  {contact.city || "Bengaluru"} ·{" "}
                  {contact.leadSource || "Referral"}
                </span>
              </div>
            </div>
          </div>

          {contact.propertyInterest && (
            <div className="border-t border-gray-100 pt-3">
              <span className="text-[11px] text-gray-400 block font-medium mb-1">
                Property Interest & Budget
              </span>
              <p className="text-gray-800 bg-amber-50/50 p-2.5 rounded border border-amber-200/50 font-medium">
                {contact.propertyInterest} — Budget: {contact.budget || "₹2 Cr"}
              </p>
            </div>
          )}

          {contact.notes && (
            <div className="border-t border-gray-100 pt-3">
              <span className="text-[11px] text-gray-400 block font-medium mb-1">
                Notes
              </span>
              <p className="text-gray-600 bg-gray-50 p-2.5 rounded border border-gray-100 leading-relaxed">
                {contact.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
          <span className="text-gray-400">Created: {contact.createdAt}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#C6922C] text-white font-medium rounded-md hover:bg-[#b58223] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
