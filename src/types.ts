export type ContactStatus = 'Active' | 'In Progress' | 'Converted' | 'Cold' | 'Not Interested';

export type ContactRole = 'Buyer' | 'Seller' | 'Investor' | 'Broker' | 'Developer';

export type AssignedAgent = 'Jessica Chen' | 'Mohit' | 'Arjun' | 'Emily';

export type City = 'Bengaluru' | 'Pune' | 'Mumbai' | 'Hyderabad' | 'Delhi';

export type LeadSource = 'Website Form' | 'Referral' | 'Facebook Ads' | 'Walk-In' | 'Email Campaign';

export type DealStage = 'Negotiation' | 'Site Visit' | 'Proposal' | 'Token Received' | 'Agreement' | 'Closed';

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  role: ContactRole;
  phone: string;
  dealStage: DealStage;
  status: ContactStatus;
  assignedTo: string;
  city?: City;
  leadSource?: LeadSource;
  budget?: string;
  propertyInterest?: string;
  notes?: string;
  createdAt: string;
}

export interface FilterState {
  searchTerm: string;
  contactNameSearch: string;
  statuses: ContactStatus[];
  roles: ContactRole[];
  assignedTo: string[];
  cities: City[];
  leadSources: LeadSource[];
}
