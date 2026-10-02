import React, { useState } from 'react';

interface SliceData {
  label: string;
  count: number;
  percentage: string;
  color: string;
  startAngle: number;
  endAngle: number;
}

export const LeadSourceDonut: React.FC = () => {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

  // Data matching the Figma screenshot:
  // Inbound Call: 9 (37.87%)
  // Reference: 1 (30.6%)
  // Website: 10 (24.83%)
  // Facebook: 1 (6.78%)
  const data: SliceData[] = [
    {
      label: 'Inbound Call',
      count: 9,
      percentage: '37.87%',
      color: '#E5D6A7', // Light sandy gold
      startAngle: -25,
      endAngle: 75,
    },
    {
      label: 'Reference',
      count: 1,
      percentage: '30.6%',
      color: '#C6922C', // Deep rich ochre gold
      startAngle: 75,
      endAngle: 185,
    },
    {
      label: 'Facebook',
      count: 1,
      percentage: '6.78%',
      color: '#E0B554', // Medium gold
      startAngle: 185,
      endAngle: 215,
    },
    {
      label: 'Website',
      count: 10,
      percentage: '24.83%',
      color: '#F4EBD0', // Pale cream
      startAngle: 215,
      endAngle: 335,
    },
  ];

  // Helper to generate SVG arc path
  const describeArc = (
    x: number,
    y: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number
  ) => {
    const degToRad = 90;

    const startRad = ((startAngle - degToRad) * Math.PI) / 180;
    const endRad = ((endAngle - degToRad) * Math.PI) / 180;

    const x1 = x + outerRadius * Math.cos(startRad);
    const y1 = y + outerRadius * Math.sin(startRad);
    const x2 = x + outerRadius * Math.cos(endRad);
    const y2 = y + outerRadius * Math.sin(endRad);

    const x3 = x + innerRadius * Math.cos(endRad);
    const y3 = y + innerRadius * Math.sin(endRad);
    const x4 = x + innerRadius * Math.cos(startRad);
    const y4 = y + innerRadius * Math.sin(startRad);

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
      Z
    `;
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs h-full flex flex-col justify-between">
      <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight mb-2">
        Deals by Lead Source
      </h3>

      <div className="relative w-full aspect-[4/3] max-w-[380px] mx-auto flex items-center justify-center my-auto">
        <svg viewBox="0 0 340 260" className="w-full h-full overflow-visible">
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6B7280" />
            </marker>
          </defs>

          {/* Donut Slices */}
          <g className="transition-all duration-300">
            {data.map((slice) => {
              const isHovered = hoveredSlice === slice.label;
              return (
                <path
                  key={slice.label}
                  d={describeArc(170, 130, 48, 88, slice.startAngle, slice.endAngle)}
                  fill={slice.color}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-transform duration-200 hover:opacity-90"
                  style={{
                    filter: isHovered ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' : 'none',
                  }}
                  onMouseEnter={() => setHoveredSlice(slice.label)}
                  onMouseLeave={() => setHoveredSlice(null)}
                />
              );
            })}
          </g>

          {/* Curved Callout Arrows & Labels matching Figma */}
          {/* 1. Website (Top Left) */}
          <path
            d="M 58 80 Q 95 70 128 92"
            fill="none"
            stroke="#4B5563"
            strokeWidth="1.2"
            markerEnd="url(#arrow)"
          />
          <text x="35" y="68" textAnchor="middle" className="fill-gray-600 text-[10px] font-medium">
            Website
          </text>
          <text x="35" y="80" textAnchor="middle" className="fill-gray-500 text-[9.5px]">
            10 (24.83%)
          </text>

          {/* 2. Inbound Call (Top Right) */}
          <path
            d="M 285 75 Q 245 70 215 90"
            fill="none"
            stroke="#4B5563"
            strokeWidth="1.2"
            markerEnd="url(#arrow)"
          />
          <text x="305" y="70" textAnchor="middle" className="fill-gray-600 text-[10px] font-medium">
            Inbound Call
          </text>
          <text x="305" y="82" textAnchor="middle" className="fill-gray-500 text-[9.5px]">
            9 (37.87%)
          </text>

          {/* 3. Reference (Bottom Right) */}
          <path
            d="M 285 185 Q 240 185 205 170"
            fill="none"
            stroke="#4B5563"
            strokeWidth="1.2"
            markerEnd="url(#arrow)"
          />
          <text x="305" y="178" textAnchor="middle" className="fill-gray-600 text-[10px] font-medium">
            Reference
          </text>
          <text x="305" y="190" textAnchor="middle" className="fill-gray-500 text-[9.5px]">
            1 (30.6%)
          </text>

          {/* 4. Facebook (Bottom Left) */}
          <path
            d="M 52 185 Q 95 190 135 172"
            fill="none"
            stroke="#4B5563"
            strokeWidth="1.2"
            markerEnd="url(#arrow)"
          />
          <text x="35" y="178" textAnchor="middle" className="fill-gray-600 text-[10px] font-medium">
            Facebook
          </text>
          <text x="35" y="190" textAnchor="middle" className="fill-gray-500 text-[9.5px]">
            1 (6.78%)
          </text>
        </svg>
      </div>

      {hoveredSlice && (
        <div className="text-center text-[11px] text-gray-500 py-0.5">
          Viewing: <span className="font-semibold text-gray-800">{hoveredSlice}</span>
        </div>
      )}
    </div>
  );
};
