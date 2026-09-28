import React, { useState } from 'react';
import { sounds } from '../utils/audio';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTradeSuccess: (cardName: string) => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({
  isOpen,
  onClose,
  onTradeSuccess,
}) => {
  const [traded, setTraded] = useState(false);

  if (!isOpen) return null;

  const handleConfirmTrade = () => {
    setTraded(true);
    sounds.playSuccess();
    onTradeSuccess('Tấm Nền Sinh Thái');
    setTimeout(() => {
      onClose();
      setTraded(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051014]/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#111d21] border border-[#4cd7f6]/40 shadow-2xl p-5 overflow-hidden">
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

        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-lg bg-[#4cd7f6]/20 flex items-center justify-center text-[#4cd7f6]">
            <span className="material-symbols-outlined text-[22px]">swap_horiz</span>
          </div>
          <div>
            <h2 className="text-[16px] font-bold text-[#d8e5ea]">Chợ Trao Đổi Thẻ Sinh Thái</h2>
            <span className="text-[11px] text-[#bbcabf]">Giao lưu linh kiện cùng Minh &amp; Lan</span>
          </div>
        </div>

        {/* Proposed Trade Deal */}
        <div className="mt-4 p-3.5 rounded-xl bg-[#152125] border border-[#3c4a42]/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#bbcabf] font-semibold">Người Giao Dịch:</span>
            <span className="text-[11px] font-bold text-[#4cd7f6] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6]"></span>
              Minh (Kỹ Sư Xanh)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center pt-1 border-t border-[#3c4a42]/30">
            {/* You give */}
            <div className="p-2.5 rounded-lg bg-[#202c30] border border-[#3c4a42]/20">
              <span className="text-[9px] text-[#bbcabf] uppercase font-bold block mb-1">
                Bạn Gửi Đi
              </span>
              <span className="text-[12px] font-extrabold text-[#d8e5ea] block">
                1 Thẻ Nước Sạch
              </span>
              <span className="text-[9px] text-[#4edea3] font-semibold">+ 1 Thẻ Bã Mía</span>
            </div>

            {/* You receive */}
            <div className="p-2.5 rounded-lg bg-[#4edea3]/15 border border-[#4edea3]/40">
              <span className="text-[9px] text-[#4edea3] uppercase font-bold block mb-1">
                Bạn Nhận Lại
              </span>
              <span className="text-[12px] font-extrabold text-[#4edea3] block">
                Tấm Nền Sinh Thái
              </span>
              <span className="text-[9px] text-[#ffb95f] font-semibold">Linh kiện Solar (1/1)</span>
            </div>
          </div>

          <p className="text-[11px] text-[#bbcabf] italic leading-tight text-center">
            “Minh đang cần nước sạch để làm mát xưởng điện gió, sẵn sàng nhượng lại Tấm Nền Sinh Thái cho bạn!”
          </p>
        </div>

        {/* Confirm Button */}
        <button
          type="button"
          onClick={handleConfirmTrade}
          disabled={traded}
          className={`w-full mt-4 py-3 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer ${
            traded
              ? 'bg-[#4edea3] text-[#003824]'
              : 'bg-gradient-to-r from-[#4cd7f6] to-[#4edea3] text-[#003824] hover:opacity-95'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {traded ? 'check_circle' : 'handshake'}
          </span>
          <span>
            {traded
              ? 'Đã Đổi Thành Công Tấm Nền!'
              : 'Xác Nhận Trao Đổi Ngay'}
          </span>
        </button>
      </div>
    </div>
  );
};
