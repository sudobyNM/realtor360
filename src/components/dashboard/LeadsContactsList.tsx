import React from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import avatarImg from '../../assets/images/avatar_agent_profile_1790957041311.jpg';

interface LeadItem {
  id: string;
  name: string;
  location: string;
  phone: string;
  avatarColor: string;
}

interface LeadsContactsListProps {
  onNavigateToContacts: () => void;
  onSelectLead?: (name: string, phone: string) => void;
}

export const LeadsContactsList: React.FC<LeadsContactsListProps> = ({
  onNavigateToContacts,
  onSelectLead,
}) => {
  const leads: LeadItem[] = [
    {
      id: 'lead-1',
      name: 'John Doe',
      location: 'New York',
      phone: '+1 212 555 0192',
      avatarColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'lead-2',
      name: 'Jessica Chen',
      location: 'California, LA',
      phone: '+1 213 555 0148',
      avatarColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'lead-3',
      name: 'Evan Chris',
      location: 'New York',
      phone: '+1 646 555 0184',
      avatarColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'lead-4',
      name: 'Jack B.',
      location: 'Ohio, Columbus',
      phone: '+1 614 555 0127',
      avatarColor: 'bg-indigo-100 text-indigo-800',
    },
    {
      id: 'lead-5',
      name: 'Emily Paris',
      location: 'California, LA',
      phone: '+1 310 555 0173',
      avatarColor: 'bg-rose-100 text-rose-800',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight">
          Leads Contacts
        </h3>
        <button
          type="button"
          onClick={onNavigateToContacts}
          className="text-gray-400 hover:text-[#C6922C] transition-colors p-1 rounded hover:bg-amber-50"
          title="View all contacts in CRM"
        >
          <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100">
        {leads.map((lead, index) => (
          <div
            key={lead.id}
            onClick={() => onSelectLead?.(lead.name, lead.phone)}
            className="py-2.5 flex items-center justify-between group hover:bg-amber-50/15 -mx-2 px-2 rounded-lg transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {index === 1 ? (
                <img
                  src={avatarImg}
                  alt={lead.name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-2xs"
                />
              ) : (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-2xs ${lead.avatarColor}`}
                >
                  {lead.name.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="text-[13px] font-semibold text-gray-900 leading-tight group-hover:text-[#C6922C] transition-colors">
                  {lead.name}
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">{lead.location}</p>
              </div>
            </div>

            {/* Call icon button */}
            <a
              href={`tel:${lead.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              title={`Call ${lead.name} (${lead.phone})`}
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
