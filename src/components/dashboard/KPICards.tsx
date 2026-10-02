import React from 'react';
import { Home, Users, Handshake, Coins, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, change, isPositive }) => (
  <div className="bg-white rounded-xl p-4 md:p-5 border border-gray-100 shadow-2xs hover:shadow-xs transition-shadow">
    <div className="flex items-center gap-2.5 mb-2.5">
      <div className="w-8 h-8 rounded-lg bg-[#FAF4E6] text-[#B88728] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <span className="text-[13px] md:text-[14px] font-medium text-gray-700">{label}</span>
    </div>
    <div className="flex items-baseline justify-between gap-2 mt-1">
      <span className="text-[26px] md:text-[28px] font-bold text-gray-900 tracking-tight leading-none font-sans">
        {value}
      </span>
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
          isPositive
            ? 'bg-[#EBFBF3] text-[#10B981]'
            : 'bg-[#FDF0EE] text-[#EF4444]'
        }`}
      >
        {change}
        {isPositive ? (
          <TrendingUp className="w-3 h-3 stroke-[2.5]" />
        ) : (
          <TrendingDown className="w-3 h-3 stroke-[2.5]" />
        )}
      </span>
    </div>
  </div>
);

export const KPICards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Active Listing */}
      <MetricCard
        icon={<Home className="w-4 h-4 stroke-[2]" />}
        label="Active Listing"
        value="23"
        change="-12%"
        isPositive={false}
      />

      {/* 2. Active Leads */}
      <MetricCard
        icon={<Users className="w-4 h-4 stroke-[2]" />}
        label="Active Leads"
        value="120"
        change="+12%"
        isPositive={true}
      />

      {/* 3. Total Closed */}
      <MetricCard
        icon={<Handshake className="w-4 h-4 stroke-[2]" />}
        label="Total Closed"
        value="42"
        change="+12%"
        isPositive={true}
      />

      {/* 4. Total Revenue */}
      <MetricCard
        icon={<Coins className="w-4 h-4 stroke-[2]" />}
        label="Total Revenue"
        value="Rs.22Cr."
        change="+12%"
        isPositive={true}
      />
    </div>
  );
};
