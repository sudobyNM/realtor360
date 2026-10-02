import React from 'react';
import { KPICards } from './KPICards';
import { LeadSourceDonut } from './LeadSourceDonut';
import { StagesChart } from './StagesChart';
import { SalesPeopleChart } from './SalesPeopleChart';
import { PipelineTable } from './PipelineTable';
import { DealsClosedProgress } from './DealsClosedProgress';
import { ActiveListingTable } from './ActiveListingTable';
import { LeadsContactsList } from './LeadsContactsList';
import { RightPanel } from './RightPanel';

interface DashboardViewProps {
  onNavigateToContacts: () => void;
  onSelectLead?: (name: string, phone: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateToContacts,
  onSelectLead,
}) => {
  return (
    <div className="flex flex-col xl:flex-row gap-5 items-start">
      {/* Main Analytics Content (Left ~75%) */}
      <div className="flex-1 min-w-0 space-y-5 w-full">
        {/* Row 1: KPI Metric Cards */}
        <KPICards />

        {/* Row 2: Lead Source Donut (Left) + Deals by Stages (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          <div className="h-full">
            <LeadSourceDonut />
          </div>
          <div className="h-full">
            <StagesChart />
          </div>
        </div>

        {/* Row 3: Deals by Sales People + Total Closed (Left) & Deals in Pipeline (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          <div className="flex flex-col gap-5 justify-between">
            <SalesPeopleChart />
            <DealsClosedProgress />
          </div>
          <div className="h-full">
            <PipelineTable />
          </div>
        </div>

        {/* Row 4: Active Listing (Left 2/3) + Leads Contacts (Right 1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          <div className="lg:col-span-2 h-full">
            <ActiveListingTable />
          </div>
          <div className="lg:col-span-1 h-full">
            <LeadsContactsList
              onNavigateToContacts={onNavigateToContacts}
              onSelectLead={onSelectLead}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar Panel: Reminders, Calendar, Schedule */}
      <RightPanel />
    </div>
  );
};
