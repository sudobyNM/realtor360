import React from 'react';

export const SalesPeopleChart: React.FC = () => {
  const xTicks = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20];
  const maxVal = 20;

  // 2 Deal Owners rows
  const rows = [
    {
      owner: 'Agent 1',
      angelPlaza: 5.5,
      angelGarden: 7.2,
      none: 5.3,
    },
    {
      owner: 'Agent 2',
      angelPlaza: 2.2,
      angelGarden: 6.5,
      none: 4.8,
    },
  ];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs h-full flex flex-col justify-between">
      <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight mb-2">
        Deals by Sales People by Development
      </h3>

      <div className="relative w-full flex items-center my-auto py-2">
        {/* Y Axis Label */}
        <div className="flex items-center -rotate-90 text-[10px] text-gray-500 font-medium tracking-tight -ml-3 mr-1 select-none">
          Deal Owner
        </div>

        {/* Chart area */}
        <div className="flex-1 flex flex-col gap-4 relative">
          {/* Vertical grid lines */}
          <div className="absolute inset-0 flex justify-between pointer-events-none">
            {xTicks.map((tick) => (
              <div key={tick} className="border-r border-gray-100 h-full" />
            ))}
          </div>

          {/* Horizontal Stacked Bars */}
          {rows.map((row, idx) => {
            const plazaW = (row.angelPlaza / maxVal) * 100;
            const gardenW = (row.angelGarden / maxVal) * 100;
            const noneW = (row.none / maxVal) * 100;

            return (
              <div key={idx} className="relative z-10">
                <div className="w-full flex h-6 sm:h-7 rounded-[4px] overflow-hidden shadow-2xs">
                  {/* Angel Plaza */}
                  <div
                    style={{ width: `${plazaW}%` }}
                    className="bg-[#C6922C] transition-all duration-300 hover:brightness-105"
                    title={`Angel Plaza: ${row.angelPlaza}`}
                  />
                  {/* Angel Garden */}
                  <div
                    style={{ width: `${gardenW}%` }}
                    className="bg-[#DEB86A] transition-all duration-300 hover:brightness-105"
                    title={`Angel Garden: ${row.angelGarden}`}
                  />
                  {/* None */}
                  <div
                    style={{ width: `${noneW}%` }}
                    className="bg-[#F5EACD] transition-all duration-300 hover:brightness-105"
                    title={`None: ${row.none}`}
                  />
                </div>
              </div>
            );
          })}

          {/* X Axis ticks */}
          <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-400 pt-1 border-t border-gray-200 select-none">
            {xTicks.map((tick) => (
              <span key={tick}>{tick}</span>
            ))}
          </div>

          <div className="text-center text-[10px] font-medium text-gray-500 -mt-1 select-none">
            Record Count
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-start gap-4 pt-2 text-[11px] text-gray-600 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C6922C]" />
          <span>Angel Plaza</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DEB86A]" />
          <span>Angel Garden</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5EACD] border border-gray-300/40" />
          <span>None</span>
        </div>
      </div>
    </div>
  );
};
