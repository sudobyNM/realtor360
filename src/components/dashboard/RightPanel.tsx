import React, { useState } from 'react';
import { ChevronLeft, ChevronRight,  } from 'lucide-react';
import avatarImg from '../../assets/images/avatar_agent_profile_1790957041311.jpg';

export const RightPanel: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(8);

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Days in July 2025: starts on Tuesday (day index 2)
  const calendarCells = [
    null, null, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31,
  ];

  return (
    <div className="w-full xl:w-[320px] 2xl:w-[340px] shrink-0 space-y-4">
      {/* 1. Reminder Card */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs">
        <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight mb-3">
          Reminder
        </h3>

        <div className="space-y-3">
          {/* Highlighted Follow-ups Box */}
          <div className="bg-[#FBF6EE] border border-[#F2E5D0] rounded-lg p-3.5 space-y-2">
            <div>
              <h4 className="text-[12.5px] font-bold text-gray-900 leading-tight">
                Follow-Ups
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                15 leads need to be followed up.
              </p>
            </div>
            {/* Avatar stack */}
            <div className="flex items-center -space-x-1.5 pt-0.5">
              <img
                src={avatarImg}
                alt="Lead"
                className="w-5 h-5 rounded-full border border-white object-cover shadow-2xs"
              />
              <div className="w-5 h-5 rounded-full border border-white bg-blue-100 text-blue-800 text-[9px] font-bold flex items-center justify-center">
                A
              </div>
              <div className="w-5 h-5 rounded-full border border-white bg-emerald-100 text-emerald-800 text-[9px] font-bold flex items-center justify-center">
                M
              </div>
              <div className="w-5 h-5 rounded-full border border-white bg-purple-100 text-purple-800 text-[9px] font-bold flex items-center justify-center">
                R
              </div>
              <span className="text-[10px] font-semibold text-gray-600 bg-gray-200/80 px-1.5 py-0.5 rounded-full ml-1 border border-white">
                +11
              </span>
            </div>
          </div>

          {/* Regular Reminder items */}
          <div className="space-y-3 pt-1 text-left">
            <div className="hover:bg-gray-50 p-1.5 rounded transition-colors cursor-pointer">
              <h4 className="text-[12px] font-semibold text-gray-900 leading-snug">
                Submit Final Offer- Villa Deal
              </h4>
              <p className="text-[10.5px] text-gray-500 mt-0.5">
                Finalize and send offer documents.
              </p>
            </div>

            <div className="hover:bg-gray-50 p-1.5 rounded transition-colors cursor-pointer">
              <h4 className="text-[12px] font-semibold text-gray-900 leading-snug">
                Review Contract with Legal
              </h4>
              <p className="text-[10.5px] text-gray-500 mt-0.5">
                Ensure attorney reviews apartment deal contract today.
              </p>
            </div>

            <div className="hover:bg-gray-50 p-1.5 rounded transition-colors cursor-pointer">
              <h4 className="text-[12px] font-semibold text-gray-900 leading-snug">
                Call Jessica Chen – Follow-up
              </h4>
              <p className="text-[10.5px] text-gray-500 mt-0.5">
                Discuss her feedback after site visit to Angel Plaza.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Calendar Card ("July 2025") */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] font-bold text-gray-900 font-sans tracking-tight">
            July 2025
          </h3>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded text-gray-600 transition-colors"
              title="Previous month"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-gray-100 rounded text-gray-600 transition-colors"
              title="Next month"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-gray-500 mb-2 select-none">
          {daysOfWeek.map((day, idx) => (
            <span key={idx}>{day}</span>
          ))}
        </div>

        {/* Calendar days grid */}
        <div className="grid grid-cols-7 text-center gap-y-1 text-xs select-none">
          {calendarCells.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="h-7 w-7 mx-auto" />;
            }

            const isSelected = day === selectedDay;
            const isToday = day === 8;
            const isGreenMark = day === 10;
            const isAmberMark = day === 11;
            const isRedMark = day === 14;

            return (
              <div key={day} className="flex flex-col items-center justify-center">
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`h-7 w-7 rounded-[4px] flex items-center justify-center text-[12px] font-medium transition-all ${
                    isToday
                      ? 'bg-[#C6922C] text-white font-bold shadow-2xs'
                      : isSelected
                      ? 'bg-amber-100 text-[#C6922C] font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span
                    className={
                      isRedMark
                        ? 'text-red-500 underline decoration-red-400 font-semibold'
                        : isGreenMark
                        ? 'text-emerald-600 underline decoration-emerald-400 font-semibold'
                        : isAmberMark
                        ? 'text-amber-600 underline decoration-amber-400 font-semibold'
                        : ''
                    }
                  >
                    {day}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. My Schedule Card */}
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-2xs">
        <h3 className="text-[15px] font-semibold text-gray-900 tracking-tight mb-3">
          My Schedule
        </h3>

        <div className="space-y-3.5 text-left">
          {/* Item 1 - Emerald Ribbon */}
          <div className="border-l-[3.5px] border-[#10B981] pl-3 py-0.5 hover:bg-slate-50/50 rounded-r transition-colors">
            <h4 className="text-[12px] font-semibold text-gray-900 leading-snug">
              Visit Client- Angel Plaza
            </h4>
            <p className="text-[10.5px] text-gray-400 mt-0.5">
              Sector 45, Gurugram, Haryana
            </p>
          </div>

          {/* Item 2 - Teal Ribbon */}
          <div className="border-l-[3.5px] border-[#14B8A6] pl-3 py-0.5 hover:bg-slate-50/50 rounded-r transition-colors">
            <h4 className="text-[12px] font-semibold text-gray-900 leading-snug">
              Visit Client – Site Walkthrough
            </h4>
            <p className="text-[10.5px] text-gray-400 mt-0.5">
              Whitefield Road, Bengaluru, Karnataka
            </p>
          </div>

          {/* Item 3 - Rose Ribbon */}
          <div className="border-l-[3.5px] border-[#F43F5E] pl-3 py-0.5 hover:bg-slate-50/50 rounded-r transition-colors">
            <h4 className="text-[12px] font-semibold text-gray-900 leading-snug">
              Follow Up – Jessica Chen
            </h4>
            <p className="text-[10.5px] text-gray-400 mt-0.5">
              jessica.chen@email.com
            </p>
          </div>

          {/* Item 4 - Pink Ribbon */}
          <div className="border-l-[3.5px] border-[#EC4899] pl-3 py-0.5 hover:bg-slate-50/50 rounded-r transition-colors">
            <h4 className="text-[12px] font-semibold text-gray-900 leading-snug">
              Follow Up – Roger Bouchard
            </h4>
            <p className="text-[10.5px] text-gray-400 mt-0.5">
              roger.bouchard@clientmail.com
            </p>
          </div>

          {/* Item 5 - Amber Ribbon */}
          <div className="border-l-[3.5px] border-[#F59E0B] pl-3 py-0.5 hover:bg-slate-50/50 rounded-r transition-colors">
            <h4 className="text-[12px] font-semibold text-gray-900 leading-snug">
              Submit Final Offer – Villa Deal
            </h4>
            <p className="text-[10.5px] text-gray-400 mt-0.5">
              Finalize and send offer documents.
            </p>
          </div>

          {/* Item 6 - Gold/Bronze Ribbon */}
          <div className="border-l-[3.5px] border-[#D97706] pl-3 py-0.5 hover:bg-slate-50/50 rounded-r transition-colors">
            <h4 className="text-[12px] font-semibold text-gray-900 leading-snug">
              Submit Internal Review – Apartment PricingFinal Offer – Villa Deal
            </h4>
            <p className="text-[10.5px] text-gray-400 mt-0.5">
              Update CRM with latest market rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
