import React from 'react';

export const DealsClosedProgress: React.FC = () => {
  const closed = 42;
  const inProgress = 132;
  const total = closed + inProgress;
  const percentage = (closed / total) * 100; // ~24.1%

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs">
      <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight mb-3">
        Total Deals Closed
      </h3>

      {/* Progress Bar Track */}
      <div className="w-full h-8 bg-[#F3F4F6] rounded-[6px] overflow-hidden p-0.5 relative flex items-center">
        {/* Filled Gold Bar with exact gradient */}
        <div
          style={{ width: `${Math.max(percentage, 32)}%` }}
          className="h-full rounded-[5px] bg-gradient-to-r from-[#C6922C] via-[#D8A742] to-[#E5C26E] transition-all duration-500 shadow-2xs relative"
        >
          {/* Subtle dotted right delimiter matching Figma */}
          <div className="absolute right-0 top-0 bottom-0 w-1 border-r-2 border-dotted border-white/60" />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="flex items-baseline justify-between mt-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[26px] font-bold text-gray-900 font-sans tracking-tight leading-none">
            {closed}
          </span>
          <span className="text-[12px] text-gray-500 font-medium">Closed Deals</span>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-[26px] font-bold text-gray-900 font-sans tracking-tight leading-none">
            {inProgress}
          </span>
          <span className="text-[12px] text-gray-500 font-medium">On Progress</span>
        </div>
      </div>
    </div>
  );
};
