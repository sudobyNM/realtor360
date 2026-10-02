import React, { useState } from 'react';
import { Search, MoreHorizontal,  Bell, Settings } from 'lucide-react';
import avatarImg from '../assets/images/avatar_agent_profile_1790957041311.jpg';

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  globalSearch?: string;
  onGlobalSearchChange?: (val: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'Contacts',
  onTabChange,
  globalSearch = '',
  onGlobalSearchChange,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const navItems = [
    'Home',
    'Developments',
    'Buildings',
    'Units',
    'Leads',
    'Companies',
    'Contacts',
    'Deals',
    'Activities',
    'Attorney Firms',
    'Reports',
  ];

  const secondaryNavItems = ['Documents', 'Analytics', 'Invoices', 'Team Members', 'Settings'];

  return (
    <header className="w-full bg-white border-b border-gray-200/80 sticky top-0 z-30">
      <div className="max-w-[1720px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-6 xl:gap-8 flex-1 min-w-0">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0 cursor-pointer select-none">
            
            <div className="w-8 h-8 flex items-center justify-center text-[#C6922C]">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
              >
                <circle cx="18" cy="18" r="16" stroke="#C6922C" strokeWidth="2.2" />
                <path
                  d="M11 25V13C11 10.7909 12.7909 9 15 9V9C17.2091 9 19 10.7909 19 13V25"
                  stroke="#C6922C"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M17 25V11C17 9.89543 17.8954 9 19 9V9C20.1046 9 21 9.89543 21 11V25"
                  stroke="#C6922C"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M24 25V15C24 13.8954 24.8954 13 26 13V25"
                  stroke="#C6922C"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <line x1="8" y1="26" x2="28" y2="26" stroke="#C6922C" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-extrabold text-[17px] tracking-tight text-gray-900 font-sans">
              REALTOR360
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-wrap">
            {navItems.map((item) => {
              const isActive = item === activeTab;
              return (
                <button
                  key={item}
                  onClick={() => onTabChange?.(item)}
                  type="button"
                  className={`text-[13px] xl:text-[13.5px] transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#C6922C] text-white font-medium px-3.5 py-1.5 rounded-[6px] shadow-xs'
                      : 'text-gray-700 hover:text-gray-950 font-normal px-2.5 py-1.5 rounded-[5px] hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              );
            })}

            {/* More Menu Dropdown (...) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="text-gray-600 hover:text-gray-950 px-2 py-1.5 rounded hover:bg-gray-50 transition-colors flex items-center"
                title="More menus"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>

              {showMoreMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowMoreMenu(false)}
                  />
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {secondaryNavItems.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setShowMoreMenu(false);
                          onTabChange?.(item);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-[#C6922C] transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>

        {/* Right: Global Search & User Profile */}
        <div className="flex items-center gap-3 xl:gap-4 shrink-0">
       
          <div className="relative w-44 md:w-56">
            <input
              type="text"
              placeholder="Search..."
              value={globalSearch}
              onChange={(e) => onGlobalSearchChange?.(e.target.value)}
              className="w-full bg-[#F3F4F6] text-gray-800 placeholder-gray-400 text-xs md:text-[13px] py-1.5 pl-3.5 pr-8 rounded-full border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition-all"
            />
            <Search className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-[#C6922C]/40 p-0.5"
            >
              <img
                src={avatarImg}
                alt="Jessica Chen"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-2xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 text-left">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Jessica Chen</p>
                    <p className="text-xs text-gray-500 truncate">jessica@realtor360.com</p>
                    <span className="inline-block mt-1 text-[10px] font-medium uppercase tracking-wider text-[#C6922C] bg-amber-50 px-2 py-0.5 rounded">
                      Senior Broker Admin
                    </span>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-3.5 h-3.5 text-gray-400" />
                      Account Settings
                    </button>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Bell className="w-3.5 h-3.5 text-gray-400" />
                      Notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
