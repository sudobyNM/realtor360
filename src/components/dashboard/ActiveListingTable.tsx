import React from 'react';
import maplewoodImg from '../../assets/images/prop_maplewood_1790958196015.jpg';
import serenityImg from '../../assets/images/prop_serenity_1790958209163.jpg';
import rosehillImg from '../../assets/images/prop_rosehill_1790958222613.jpg';
import skylineImg from '../../assets/images/prop_skyline_1790958234304.jpg';
import avatarImg from '../../assets/images/avatar_agent_profile_1790957041311.jpg';

interface ListingItem {
  id: string;
  name: string;
  type: string;
  units: number;
  price: string;
  leadsCount: string;
  views: number;
  status: '8/12 Occupied' | 'Available' | 'Sold Out';
  image: string;
}

export const ActiveListingTable: React.FC = () => {
  const listings: ListingItem[] = [
    {
      id: 'l-1',
      name: 'Maplewood House',
      type: 'House',
      units: 12,
      price: 'Rs.85L',
      leadsCount: '+35',
      views: 125,
      status: '8/12 Occupied',
      image: maplewoodImg,
    },
    {
      id: 'l-2',
      name: 'Serenity Villa',
      type: 'Villa',
      units: 9300,
      price: 'Rs.2.8Cr',
      leadsCount: '+40',
      views: 930,
      status: 'Available',
      image: serenityImg,
    },
    {
      id: 'l-3',
      name: 'Rosehill Cottage',
      type: 'House',
      units: 25,
      price: 'Rs.1.1Cr',
      leadsCount: '+15',
      views: 355,
      status: 'Available',
      image: rosehillImg,
    },
    {
      id: 'l-4',
      name: 'Skyline Edge',
      type: 'Apartment',
      units: 17,
      price: 'Rs.75L',
      leadsCount: '+11',
      views: 425,
      status: 'Sold Out',
      image: skylineImg,
    },
  ];

  const getStatusBadge = (status: ListingItem['status']) => {
    switch (status) {
      case '8/12 Occupied':
        return 'bg-[#E5FAF5] text-[#059669] border border-[#6EE7B7]/60';
      case 'Available':
        return 'bg-[#EBFBF3] text-[#10B981] border border-[#A7F3D0]';
      case 'Sold Out':
        return 'bg-[#FFF1F2] text-[#F43F5E] border border-[#FECDD3]';
      default:
        return 'bg-gray-50 text-gray-600 border border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs h-full flex flex-col justify-between">
      <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight mb-3">
        Active Listing
      </h3>

      <div className="overflow-x-auto select-text">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[12.5px] text-gray-600 font-medium">
              <th className="py-2.5 px-2">Property</th>
              <th className="py-2.5 px-2">Type</th>
              <th className="py-2.5 px-2">Units</th>
              <th className="py-2.5 px-2">Price</th>
              <th className="py-2.5 px-2">Active Leads</th>
              <th className="py-2.5 px-2">Views</th>
              <th className="py-2.5 px-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[13px] text-gray-700">
            {listings.map((item) => (
              <tr key={item.id} className="hover:bg-amber-50/15 transition-colors group">
                {/* Property Name with Image Thumbnail */}
                <td className="py-3 px-2 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-[6px] object-cover border border-gray-200 shadow-2xs group-hover:scale-105 transition-transform"
                    />
                    <span className="font-semibold text-gray-900 text-[13px] leading-tight">
                      {item.name}
                    </span>
                  </div>
                </td>

                {/* Type */}
                <td className="py-3 px-2 text-gray-600 whitespace-nowrap">
                  {item.type}
                </td>

                {/* Units */}
                <td className="py-3 px-2 font-mono tabular-nums text-gray-700 whitespace-nowrap">
                  {item.units}
                </td>

                {/* Price */}
                <td className="py-3 px-2 font-medium text-gray-900 whitespace-nowrap">
                  {item.price}
                </td>

                {/* Active Leads (Avatar stack) */}
                <td className="py-3 px-2 whitespace-nowrap">
                  <div className="flex items-center -space-x-1.5">
                    <img
                      src={avatarImg}
                      alt="Lead"
                      className="w-5 h-5 rounded-full border border-white object-cover shadow-2xs"
                    />
                    <div className="w-5 h-5 rounded-full border border-white bg-slate-200 text-slate-700 text-[9px] font-bold flex items-center justify-center">
                      J
                    </div>
                    <span className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-full ml-1 border border-gray-200">
                      {item.leadsCount}
                    </span>
                  </div>
                </td>

                {/* Views */}
                <td className="py-3 px-2 font-mono tabular-nums text-gray-700 whitespace-nowrap">
                  {item.views}
                </td>

                {/* Status Badge */}
                <td className="py-3 px-2 text-right whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-[4px] text-[11px] font-medium ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
