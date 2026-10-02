import React from 'react';

interface StageData {
  stage: string;
  angelPlaza: number;
  angelGarden: number;
  none: number;
}

export const StagesChart: React.FC = () => {
  // Approximate values matching the Figma stacked chart visually
  const data: StageData[] = [
    { stage: 'Interested', angelPlaza: 3, angelGarden: 2.5, none: 2 },
    { stage: 'Site Visit Done', angelPlaza: 3.8, angelGarden: 2.8, none: 3.4 },
    { stage: 'Unit Shortlisted', angelPlaza: 3.6, angelGarden: 2.9, none: 2.7 },
    { stage: 'Contracts Signed', angelPlaza: 3.9, angelGarden: 3.1, none: 3 },
    { stage: 'Offer Initiated', angelPlaza: 3.2, angelGarden: 3.1, none: 2 },
    { stage: 'Offer Accepted', angelPlaza: 3.9, angelGarden: 3.1, none: 3 },
  ];

  const maxVal = 10;
  const yTicks = [10, 7.5, 5, 2.5, 0];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs h-full flex flex-col justify-between">
      <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight mb-2">
        Deals by Stages by Development
      </h3>

      <div className="relative w-full h-[220px] flex pt-2 pb-1">
        {/* Y Axis Label & Ticks */}
        <div className="flex items-center -rotate-90 text-[10px] text-gray-500 font-medium tracking-tight -ml-5 mr-0 w-4 h-full justify-center select-none">
          Record Count
        </div>

        <div className="flex flex-col justify-between text-[10px] text-gray-400 text-right pr-2 select-none h-[160px] my-auto">
          {yTicks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        {/* Chart Area with Grid Lines */}
        <div className="flex-1 flex flex-col justify-between relative h-[160px] my-auto border-b border-gray-300">
          {/* Horizontal Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {yTicks.map((tick) => (
              <div key={tick} className="border-b border-gray-200/80 w-full" />
            ))}
          </div>

          {/* Stacked Columns */}
          <div className="relative h-full flex items-end justify-between px-2 sm:px-4 z-10">
            {data.map((item) => {
              const plazaH = (item.angelPlaza / maxVal) * 100;
              const gardenH = (item.angelGarden / maxVal) * 100;
              const noneH = (item.none / maxVal) * 100;

              return (
                <div key={item.stage} className="flex flex-col items-center group w-9 sm:w-11">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded shadow pointer-events-none transition-opacity whitespace-nowrap z-20">
                    {item.stage}: {(item.angelPlaza + item.angelGarden + item.none).toFixed(1)}
                  </div>

                  {/* The Stacked Bar */}
                  <div className="w-full flex flex-col-reverse rounded-t-[3px] overflow-hidden shadow-2xs">
                    {/* Angel Plaza (Bottom - Solid Gold) */}
                    <div
                      style={{ height: `${plazaH * 1.5}px` }}
                      className="w-full bg-[#C6922C] transition-all duration-300 hover:brightness-105"
                    />
                    {/* Angel Garden (Middle - Tan Gold) */}
                    <div
                      style={{ height: `${gardenH * 1.5}px` }}
                      className="w-full bg-[#DEB86A] transition-all duration-300 hover:brightness-105"
                    />
                    {/* None (Top - Pale Cream) */}
                    <div
                      style={{ height: `${noneH * 1.5}px` }}
                      className="w-full bg-[#F5EACD] transition-all duration-300 hover:brightness-105"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* X Axis Labels */}
          <div className="absolute top-[164px] inset-x-0 flex justify-between px-1 text-[9px] sm:text-[10px] text-gray-500 font-medium">
            {data.map((item) => (
              <span
                key={item.stage}
                className="w-12 text-center truncate transform -rotate-25 origin-top-left sm:rotate-0"
                title={item.stage}
              >
                {item.stage}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Axis title */}
      <div className="text-center text-[11px] font-medium text-gray-500 -mt-2">
        Stage
      </div>

      {/* Legend below */}
      <div className="flex items-center justify-center gap-5 pt-3 mt-1 text-[11px] text-gray-600 select-none">
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
