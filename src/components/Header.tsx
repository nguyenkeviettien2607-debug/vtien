import React from 'react';
import { ASSETS } from '../data/initialData';
import { TabType } from '../types/game';
import { sounds } from '../utils/audio';

interface HeaderProps {
  currentTab: TabType;
  score: number;
  waterDrops: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenProfile: () => void;
}

const TAB_TITLES: Record<TabType, string> = {
  board: 'Bàn Cờ Xanh',
  deck: 'Túi Thẻ Sinh Thái',
  craft: 'Chế Tạo Phát Minh',
  crisis: 'Khủng Hoảng Toàn Cầu',
  rules: 'Luật Chơi & Cài Đặt',
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  score,
  waterDrops,
  soundEnabled,
  onToggleSound,
  onOpenProfile,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#111d21]/90 backdrop-blur-xl border-b border-[#3c4a42]/40 shadow-[0_1px_12px_rgba(6,182,212,0.1)]">
      <div className="max-w-xl mx-auto h-20 px-3.5 flex items-center justify-between gap-2">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative group cursor-pointer" onClick={onOpenProfile}>
            <img
              alt="EcoNova Logo"
              className="h-9 w-auto object-contain shrink-0 transition-transform group-hover:scale-105"
              src={ASSETS.logo}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4edea3] border border-[#091519]"></span>
          </div>
          <div className="flex flex-col truncate">
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] text-[#4edea3] font-extrabold tracking-tight">EcoNova</span>
              <span className="text-[10px] text-[#4cd7f6] px-1.5 py-0.5 rounded-full bg-[#4cd7f6]/10 font-bold border border-[#4cd7f6]/20">
                {TAB_TITLES[currentTab]}
              </span>
            </div>
            <span className="text-[11px] text-[#bbcabf] font-medium leading-none">Hành Trình Xanh</span>
          </div>
        </div>

        {/* Resources & Profile */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className="w-8 h-8 rounded-full bg-[#202c30] flex items-center justify-center text-[#bbcabf] hover:text-[#4edea3] transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
          </button>

          {/* Eco Points */}
          <div className="flex items-center gap-1 bg-[#202c30]/95 px-2.5 py-1 rounded-full text-[#4edea3] border border-[#4edea3]/20 shadow-sm">
            <span className="material-symbols-outlined text-[15px]">eco</span>
            <span className="text-[12px] font-extrabold text-[#d8e5ea]">{score}</span>
          </div>

          {/* Water Drops */}
          <div className="flex items-center gap-1 bg-[#202c30]/95 px-2.5 py-1 rounded-full text-[#4cd7f6] border border-[#4cd7f6]/20 shadow-sm">
            <span className="material-symbols-outlined text-[15px]">water_drop</span>
            <span className="text-[12px] font-extrabold text-[#d8e5ea]">{waterDrops}</span>
          </div>

          {/* Profile Trigger */}
          <button
            type="button"
            onClick={() => {
              sounds.playAction();
              onOpenProfile();
            }}
            title="Hồ sơ Eco Ranger"
            className="relative w-8 h-8 rounded-full overflow-hidden bg-[#4edea3] flex items-center justify-center border border-[#4edea3]/50 shadow-sm active:scale-95 transition-transform"
          >
            <img
              src={ASSETS.trangAvatar}
              alt="Trang"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to person icon if needed
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="material-symbols-outlined text-[#003824] text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
