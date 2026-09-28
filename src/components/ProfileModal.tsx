import React from 'react';
import { ASSETS } from '../data/initialData';
import { Player } from '../types/game';
import { sounds } from '../utils/audio';

interface ProfileModalProps {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
  onSelectPlayer: (player: Player) => void;
  allPlayers: Player[];
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  player,
  isOpen,
  onClose,
  onSelectPlayer,
  allPlayers,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051014]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#111d21] border border-[#4edea3]/40 shadow-2xl p-5 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#4edea3]/20 blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            sounds.playAction();
            onClose();
          }}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#202c30] text-[#bbcabf] hover:text-[#d8e5ea] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Avatar Badge Image (Stylized as Image 1) */}
        <div className="flex flex-col items-center text-center mt-2">
          <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#4edea3] via-[#03b5d3] to-[#ffb95f] shadow-[0_0_25px_rgba(78,222,163,0.35)]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#152125]">
              <img
                src={ASSETS.trangAvatar}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#003824] text-[#4edea3] text-[10px] font-black tracking-wider uppercase border border-[#4edea3]/50 shadow-md">
              LV.{player.level}
            </span>
          </div>

          <h2 className="text-[20px] font-extrabold text-[#d8e5ea] mt-3 tracking-tight">
            {player.name}
          </h2>
          <span className="text-[12px] font-bold text-[#4cd7f6] uppercase tracking-wider">
            {player.title}
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#202c30] text-[#ffb95f] text-[11px] font-bold mt-2 border border-[#3c4a42]/40">
            <span className="material-symbols-outlined text-[15px]">flag</span>
            <span>PLANT HERO • VIETNAM</span>
          </div>
        </div>

        {/* Player Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="p-2 rounded-xl bg-[#152125] border border-[#3c4a42]/30">
            <span className="text-[10px] text-[#bbcabf] block">Điểm Xanh</span>
            <span className="text-[16px] font-black text-[#4edea3]">{player.score}</span>
          </div>
          <div className="p-2 rounded-xl bg-[#152125] border border-[#3c4a42]/30">
            <span className="text-[10px] text-[#bbcabf] block">Nước Sạch</span>
            <span className="text-[16px] font-black text-[#4cd7f6]">{player.waterDrops}</span>
          </div>
          <div className="p-2 rounded-xl bg-[#152125] border border-[#3c4a42]/30">
            <span className="text-[10px] text-[#bbcabf] block">Vị Trí Ô</span>
            <span className="text-[16px] font-black text-[#ffb95f]">Ô {player.position}</span>
          </div>
        </div>

        {/* Special Perk */}
        <div className="mt-3.5 p-3 rounded-xl bg-[#152125] border border-[#4edea3]/30">
          <div className="flex items-center gap-1.5 text-[#4edea3] mb-1">
            <span className="material-symbols-outlined text-[17px]">psychology</span>
            <span className="text-[11px] font-bold uppercase">Kỹ Năng Đặc Quyền</span>
          </div>
          <p className="text-[11px] text-[#bbcabf] leading-snug">
            {player.perk}
          </p>
        </div>

        {/* Switch Character strip */}
        <div className="mt-4 pt-3 border-t border-[#3c4a42]/30">
          <span className="text-[10px] text-[#bbcabf] font-bold uppercase tracking-wider block mb-2">
            Đổi Nhân Vật Trong Bàn Chơi
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {allPlayers.map((p) => {
              const isSelected = p.id === player.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    sounds.playAction();
                    onSelectPlayer(p);
                  }}
                  className={`p-1.5 rounded-lg flex flex-col items-center text-center transition-all border ${
                    isSelected
                      ? 'bg-[#4edea3]/20 border-[#4edea3]'
                      : 'bg-[#152125] border-[#3c4a42]/30 hover:border-[#4edea3]/40'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] mb-0.5"
                    style={{ backgroundColor: p.color, color: '#091519' }}
                  >
                    {p.badge}
                  </div>
                  <span className="text-[10px] font-bold text-[#d8e5ea] truncate w-full">
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
