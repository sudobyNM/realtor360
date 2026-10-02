import { useState, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { FiltersSidebar } from "./components/FiltersSidebar";
import { ContactsTable } from "./components/ContactsTable";
import { CreateContactModal } from "./components/CreateContactModal";
import { ContactDetailModal } from "./components/ContactDetailModal";
import { DashboardView } from "./components/dashboard/DashboardView";
import { INITIAL_CONTACTS } from "./data/mockContacts";
import type { Contact, ContactStatus, FilterState } from "./types";
import { Building2, Home as HomeIcon, Users, } from "lucide-react";

const ITEMS_PER_PAGE = 8;

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState<string>("Home");
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [globalSearch, setGlobalSearch] = useState<string>("");
  const [tableSearch, setTableSearch] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] =
    useState<boolean>(false);

  // Active filters for Contacts page
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    searchTerm: "",
    contactNameSearch: "",
    statuses: [],
    roles: [],
    assignedTo: [],
    cities: [],
    leadSources: [],
  });

  // Calculate active filter count for badge
  const activeFilterCount = useMemo(() => {
    return (
      (appliedFilters.contactNameSearch ? 1 : 0) +
      appliedFilters.statuses.length +
      appliedFilters.roles.length +
      appliedFilters.assignedTo.length +
      appliedFilters.cities.length +
      appliedFilters.leadSources.length
    );
  }, [appliedFilters]);

  // Filtering contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      // 1. Global Search
      if (globalSearch.trim()) {
        const query = globalSearch.toLowerCase();
        const matchesGlobal =
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.company.toLowerCase().includes(query) ||
          contact.phone.toLowerCase().includes(query) ||
          contact.role.toLowerCase().includes(query) ||
          contact.assignedTo.toLowerCase().includes(query);
        if (!matchesGlobal) return false;
      }

      // 2. Table Search
      if (tableSearch.trim()) {
        const query = tableSearch.toLowerCase();
        const matchesTable =
          contact.name.toLowerCase().includes(query) ||
          contact.email.toLowerCase().includes(query) ||
          contact.company.toLowerCase().includes(query) ||
          contact.phone.toLowerCase().includes(query) ||
          contact.role.toLowerCase().includes(query) ||
          contact.assignedTo.toLowerCase().includes(query);
        if (!matchesTable) return false;
      }

      // 3. Sidebar Contact Name Search
      if (appliedFilters.contactNameSearch.trim()) {
        const query = appliedFilters.contactNameSearch.toLowerCase();
        if (!contact.name.toLowerCase().includes(query)) return false;
      }

      // 4. Status Filter
      if (
        appliedFilters.statuses.length > 0 &&
        !appliedFilters.statuses.includes(contact.status)
      ) {
        return false;
      }

      // 5. Role Filter
      if (
        appliedFilters.roles.length > 0 &&
        !appliedFilters.roles.includes(contact.role)
      ) {
        return false;
      }

      // 6. Assigned To Filter
      if (
        appliedFilters.assignedTo.length > 0 &&
        !appliedFilters.assignedTo.some((agent) =>
          contact.assignedTo.toLowerCase().includes(agent.toLowerCase()),
        )
      ) {
        return false;
      }

      // 7. City Filter
      if (
        appliedFilters.cities.length > 0 &&
        contact.city &&
        !appliedFilters.cities.includes(contact.city)
      ) {
        return false;
      }

      // 8. Lead Source Filter
      if (
        appliedFilters.leadSources.length > 0 &&
        contact.leadSource &&
        !appliedFilters.leadSources.includes(contact.leadSource)
      ) {
        return false;
      }

      return true;
    });
  }, [contacts, globalSearch, tableSearch, appliedFilters]);

  // Pagination calculation
  const totalPages = Math.max(
    1,
    Math.ceil(filteredContacts.length / ITEMS_PER_PAGE),
  );

  
  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredContacts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredContacts, currentPage]);

  
  const handleApplyFilters = (newFilters: FilterState) => {
    setAppliedFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setAppliedFilters({
      searchTerm: "",
      contactNameSearch: "",
      statuses: [],
      roles: [],
      assignedTo: [],
      cities: [],
      leadSources: [],
    });
    setTableSearch("");
    setCurrentPage(1);
  };

  // Status update
  const handleUpdateStatus = (id: string, newStatus: ContactStatus) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c)),
    );
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact((prev) =>
        prev ? { ...prev, status: newStatus } : null,
      );
    }
  };

  // Add contact
  const handleCreateContact = (
    newContactData: Omit<Contact, "id" | "createdAt">,
  ) => {
    const newContact: Contact = {
      ...newContactData,
      id: `c-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setContacts((prev) => [newContact, ...prev]);
    setCurrentPage(1);
    setActiveTab("Contacts");
  };

  
  const handleSelectLeadFromDashboard = (leadName: string) => {
    const matched = contacts.find(
      (c) => c.name.toLowerCase() === leadName.toLowerCase(),
    );
    if (matched) {
      setSelectedContact(matched);
    } else {
      setTableSearch(leadName);
      setActiveTab("Contacts");
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      "Contact Name",
      "Email",
      "Company",
      "Role",
      "Phone No.",
      "Deal Stage",
      "Status",
      "Assigned to",
      "City",
      "Lead Source",
    ];

    const rows = filteredContacts.map((c) => [
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.company}"`,
      `"${c.role}"`,
      `"${c.phone}"`,
      `"${c.dealStage}"`,
      `"${c.status}"`,
      `"${c.assignedTo}"`,
      `"${c.city || ""}"`,
      `"${c.leadSource || ""}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `realtor360_contacts_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]/40 text-gray-900 flex flex-col font-sans">
      {/* Top Bar Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
        }}
        globalSearch={globalSearch}
        onGlobalSearchChange={(val) => {
          setGlobalSearch(val);
          if (activeTab !== "Contacts" && val.trim()) {
            setActiveTab("Contacts");
          }
          setCurrentPage(1);
        }}
      />

      {/* Main Container */}
      <main className="max-w-[1720px] mx-auto w-full px-4 lg:px-6 py-6 flex-1 flex flex-col">
        {/* VIEW 1: DASHBOARD ("Home" Tab) */}
        {activeTab === "Home" && (
          <DashboardView
            onNavigateToContacts={() => setActiveTab("Contacts")}
            onSelectLead={handleSelectLeadFromDashboard}
          />
        )}

        {/* VIEW 2: CONTACTS CRM ("Contacts" Tab) */}
        {activeTab === "Contacts" && (
          <div className="flex gap-8 lg:gap-12 flex-1 items-start bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-2xs">
            {/* Left Column: Filters Sidebar (Desktop) */}
            <div className="hidden lg:block">
              <FiltersSidebar
                filters={appliedFilters}
                onApplyFilters={handleApplyFilters}
                onResetFilters={handleResetFilters}
              />
            </div>

            {/* Mobile Filters Drawer */}
            {isMobileFiltersOpen && (
              <div className="fixed inset-0 z-50 flex lg:hidden">
                <div
                  className="fixed inset-0 bg-black/40 backdrop-blur-xs"
                  onClick={() => setIsMobileFiltersOpen(false)}
                />
                <div className="relative ml-auto w-80 max-w-full bg-white h-full p-6 overflow-y-auto shadow-2xl z-10">
                  <FiltersSidebar
                    filters={appliedFilters}
                    onApplyFilters={handleApplyFilters}
                    onResetFilters={handleResetFilters}
                    onCloseMobile={() => setIsMobileFiltersOpen(false)}
                  />
                </div>
              </div>
            )}

            {/* Right Column: Main Contacts Table */}
            <ContactsTable
              contacts={paginatedContacts}
              allContactsCount={filteredContacts.length}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              tableSearch={tableSearch}
              onTableSearchChange={(val) => {
                setTableSearch(val);
                setCurrentPage(1);
              }}
              onCreateContact={() => setIsCreateModalOpen(true)}
              onSelectContact={(contact) => setSelectedContact(contact)}
              onUpdateStatus={handleUpdateStatus}
              onExportCSV={handleExportCSV}
              onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
              activeFilterCount={activeFilterCount}
            />
          </div>
        )}

        {/* VIEW 3: SECONDARY TABS FALLBACK (Developments, Buildings, Units, Leads, Deals, etc.) */}
        {activeTab !== "Home" && activeTab !== "Contacts" && (
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-2xs text-center max-w-2xl mx-auto my-12 space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-[#C6922C] rounded-full flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {activeTab} Section
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              You are viewing the module for <strong>{activeTab}</strong>. You
              can switch directly between the primary{" "}
              <strong>Home Dashboard</strong> and <strong>Contacts CRM</strong>{" "}
              below.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab("Home")}
                className="px-4 py-2 bg-[#C6922C] hover:bg-[#b58223] text-white rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <HomeIcon className="w-3.5 h-3.5" />
                Go to Home Dashboard
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("Contacts")}
                className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-[#C6922C]" />
                Go to All Contacts
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <CreateContactModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateContact}
      />

      <ContactDetailModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
