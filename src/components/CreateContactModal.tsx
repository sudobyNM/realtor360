import React, { useState } from "react";
import { X } from "lucide-react";
import type {
  Contact,
  ContactRole,
  ContactStatus,
  City,
  LeadSource,
  DealStage,
} from "../types";

interface CreateContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: Omit<Contact, "id" | "createdAt">) => void;
}

export const CreateContactModal: React.FC<CreateContactModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [company, setCompany] = useState("Urban Realty");
  const [role, setRole] = useState<ContactRole>("Buyer");
  const [status, setStatus] = useState<ContactStatus>("Active");
  const [dealStage, setDealStage] = useState<DealStage>("Negotiation");
  const [assignedTo, setAssignedTo] = useState("Jessica Chen");
  const [city, setCity] = useState<City>("Bengaluru");
  const [leadSource, setLeadSource] = useState<LeadSource>("Referral");
  const [budget] = useState("₹1.5 Cr");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      email: email.trim() || "contact@urbanrealty.com",
      phone: phone.trim() || "+91 9411521487",
      company: company.trim() || "Urban Realty",
      role,
      status,
      dealStage,
      assignedTo,
      city,
      leadSource,
      budget,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Create New Contact
            </h3>
            <p className="text-xs text-gray-500">
              Add a new buyer, seller, investor, or broker to Realtor360
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@urbanrealty.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+91 9411521487"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as ContactRole)}
                className="w-full px-2.5 py-2 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none bg-white"
              >
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
                <option value="Investor">Investor</option>
                <option value="Broker">Broker</option>
                <option value="Developer">Developer</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContactStatus)}
                className="w-full px-2.5 py-2 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none bg-white"
              >
                <option value="Active">Active</option>
                <option value="In Progress">In Progress</option>
                <option value="Converted">Converted</option>
                <option value="Cold">Cold</option>
                <option value="Not Interested">Not Interested</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Deal Stage
              </label>
              <select
                value={dealStage}
                onChange={(e) => setDealStage(e.target.value as DealStage)}
                className="w-full px-2.5 py-2 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none bg-white"
              >
                <option value="Negotiation">Negotiation</option>
                <option value="Site Visit">Site Visit</option>
                <option value="Proposal">Proposal</option>
                <option value="Token Received">Token Received</option>
                <option value="Agreement">Agreement</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Assigned To
              </label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-2.5 py-2 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none bg-white"
              >
                <option value="Jessica Chen">Jessica Chen</option>
                <option value="Mohit">Mohit</option>
                <option value="Arjun">Arjun</option>
                <option value="Emily">Emily</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as City)}
                className="w-full px-2.5 py-2 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none bg-white"
              >
                <option value="Bengaluru">Bengaluru</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Lead Source
              </label>
              <select
                value={leadSource}
                onChange={(e) => setLeadSource(e.target.value as LeadSource)}
                className="w-full px-2.5 py-2 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none bg-white"
              >
                <option value="Referral">Referral</option>
                <option value="Website Form">Website Form</option>
                <option value="Facebook Ads">Facebook Ads</option>
                <option value="Walk-In">Walk-In</option>
                <option value="Email Campaign">Email Campaign</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Notes / Requirements
            </label>
            <textarea
              rows={2}
              placeholder="Key client preferences, property requirements, budget range..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-[#C6922C] focus:outline-none"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#C6922C] hover:bg-[#b58223] text-white rounded-md font-medium transition-colors shadow-xs"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
