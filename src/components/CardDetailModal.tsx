import React from 'react';
import { EcoCard } from '../types/game';
import { sounds } from '../utils/audio';

interface CardDetailModalProps {
  card: EcoCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051014]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#111d21] border border-[#4edea3]/40 shadow-2xl p-5 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-[#4edea3]/20 blur-3xl pointer-events-none"></div>

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

        {/* Card Header */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              card.category === 'green'
                ? 'bg-[#4edea3]/20 text-[#4edea3]'
                : card.category === 'pollution'
                ? 'bg-[#93000a]/50 text-[#ffb4ab]'
                : 'bg-[#4cd7f6]/20 text-[#4cd7f6]'
            }`}
          >
            {card.category === 'green'
              ? 'Thẻ Môi Trường'
              : card.category === 'pollution'
              ? 'Thẻ Ô Nhiễm Cảnh Báo'
              : 'Thẻ Phát Minh'}
          </span>
          <span className="text-[10px] text-[#ffb95f] font-bold">{card.rarity || 'Chính'}</span>
        </div>

        {/* Card Artwork / Icon */}
        <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#152125] border border-[#3c4a42]/40 flex items-center justify-center shadow-inner">
          {card.imageUrl ? (
            <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#202c30] flex items-center justify-center text-[#4edea3]">
              <span className="material-symbols-outlined text-[48px]">{card.icon || 'eco'}</span>
            </div>
          )}
          <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-[#051014]/85 text-[#4edea3] text-[12px] font-black border border-[#4edea3]/40">
            {card.points > 0 ? `+${card.points} ĐX` : `${card.points} ĐX`}
          </span>
        </div>

        {/* Title & Lore */}
        <h3 className="text-[18px] font-extrabold text-[#d8e5ea] mt-3">{card.title}</h3>
        <p className="text-[12px] text-[#4cd7f6] font-semibold mt-0.5">{card.badgeText}</p>

        <p className="text-[11px] text-[#bbcabf] mt-2 leading-relaxed">
          {card.detailedEffect || card.description}
        </p>

        {/* Educational Eco Note */}
        <div className="mt-3.5 p-2.5 rounded-lg bg-[#051014] border border-[#3c4a42]/30 flex items-start gap-2 text-[10px] text-[#bbcabf]">
          <span className="material-symbols-outlined text-[#4edea3] text-[16px] shrink-0 mt-0.5">
            eco
          </span>
          <span>
            Hành động xanh góp phần giảm thiểu dấu chân carbon và thúc đẩy mô hình kinh tế tuần hoàn theo mục tiêu Phát Triển Bền Vững (SDGs).
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-4 py-2.5 rounded-xl bg-[#202c30] hover:bg-[#2b373b] text-[#d8e5ea] font-bold text-[12px] transition-colors"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};
