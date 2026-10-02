import React from 'react';

export const PipelineTable: React.FC = () => {
  const data = [
    { name: 'None', count: 14 },
    { name: 'Angel Plaza', count: 3 },
    { name: 'Angel Garden', count: 1 },
  ];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs h-full flex flex-col justify-between">
      <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight mb-3">
        Deals in Pipeline by Development
      </h3>

      <div className="overflow-x-auto my-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 text-[12px] text-gray-800">
              <th className="pb-2.5 font-medium">Development Name</th>
              <th className="pb-2.5 font-medium text-right">Record Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-[13px] text-gray-700">
            {data.map((item) => (
              <tr key={item.name} className="hover:bg-amber-50/20 transition-colors">
                <td className="py-2.5 font-normal text-gray-700">{item.name}</td>
                <td className="py-2.5 text-right font-mono tabular-nums text-gray-900 font-medium">
                  {item.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-2 border-t border-gray-50 text-[11px] text-gray-400 flex justify-between">
        <span>Total in pipeline:</span>
        <span className="font-mono font-medium text-gray-700">18 deals</span>
      </div>
    </div>
  );
};
