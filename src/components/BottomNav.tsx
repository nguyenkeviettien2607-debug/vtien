import React from 'react';
import { TabType } from '../types/game';
import { sounds } from '../utils/audio';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  crisisAlert?: boolean;
  cardsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  crisisAlert = true,
  cardsCount = 18,
}) => {
  const tabs = [
    { id: 'board' as TabType, label: 'Bàn Cờ', icon: 'map' },
    { id: 'deck' as TabType, label: 'Túi Thẻ', icon: 'style', badge: cardsCount },
    { id: 'craft' as TabType, label: 'Chế Tạo', icon: 'science' },
    { id: 'crisis' as TabType, label: 'Khủng Hoảng', icon: 'public', isAlert: crisisAlert },
    { id: 'rules' as TabType, label: 'Luật Chơi', icon: 'menu_book' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#111d21]/95 backdrop-blur-xl border-t border-[#3c4a42]/40 shadow-[0_-4px_20px_rgba(16,185,129,0.08)]">
      <div className="max-w-xl mx-auto flex justify-around items-center h-16 px-1">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                sounds.playAction();
                onTabChange(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-all duration-200 ${
                isActive
                  ? 'text-[#4edea3] font-bold scale-105'
                  : 'text-[#bbcabf] hover:text-[#d8e5ea]'
              }`}
            >
              {/* Active Indicator Top Light */}
              {isActive && (
                <span className="absolute -top-2 w-8 h-1 rounded-full bg-gradient-to-r from-[#4edea3] to-[#4cd7f6] shadow-[0_0_8px_#4edea3]"></span>
              )}

              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {tab.icon}
                </span>

                {/* Crisis Warning Pip */}
                {tab.isAlert && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ffb4ab] border-2 border-[#111d21] animate-ping" />
                )}
                {tab.isAlert && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#ffb4ab] border-2 border-[#111d21]" />
                )}
              </div>

              <span className="text-[10px] text-center leading-tight tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
