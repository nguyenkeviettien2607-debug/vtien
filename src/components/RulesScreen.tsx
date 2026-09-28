import React, { useState } from 'react';
import { sounds } from '../utils/audio';

interface RulesScreenProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetGame: () => void;
}

export const RulesScreen: React.FC<RulesScreenProps> = ({
  soundEnabled,
  onToggleSound,
  onResetGame,
}) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const sections = [
    {
      title: '1. Mục Tiêu & Cơ Chế Hợp Tác Gaia',
      icon: 'public',
      content: `EcoNova là board game sinh thái mang tính đồng đội cao. Không có người chiến thắng đơn lẻ nếu Trái Đất sụp đổ! 
      
• Điều kiện Thắng Tập Thể: Cả nhóm tích lũy đủ 100 Điểm Xanh (hiện đã vượt chuẩn 145/100) và giữ Chỉ số Ô Nhiễm toàn cầu dưới 10 nấc.
• Điều kiện Thua Chung: Nếu Chỉ số Ô Nhiễm chạm mốc 10 hoặc Sức khỏe Trái Đất giảm dưới 40%, Trái Đất sẽ bước vào điểm tới hạn (Tipping Point) không thể đảo ngược.`,
    },
    {
      title: '2. Sa Bàn 40 Ô & 4 Khu Vực Sinh Thái',
      icon: 'map',
      content: `Bàn cờ gồm 40 ô liên hoàn chia thành 4 khu vực chiến lược:
      
• Ô 01-10: Rừng U Ám (Hồi sinh tán rừng, ngăn chặn cháy rừng, gieo hạt mầm).
• Ô 11-20: Đại Dương Nhựa (Thu gom rác ven bờ, cấy ghép san hô nhân tạo, giải cứu sinh vật biển).
• Ô 21-30: Đô Thị Khói Bụi (Phát triển năng lượng tái tạo, giảm phát thải giao thông, tuần hoàn rác).
• Ô 31-40: Vùng Khủng Hoảng (Đối mặt rò rỉ khí metan, sa mạc hóa và hội nghị thượng đỉnh).
• Tâm Bàn Cờ: Đài Khí Tượng & Viện Gaia - nơi liên minh chia sẻ tài nguyên và tổng kết năng lượng xanh.`,
    },
    {
      title: '3. Quy Tắc Lượt Đi & Xúc Xắc Sinh Thái',
      icon: 'casino',
      content: `Mỗi lượt chơi bao gồm 3 bước:
      
1. Tung 2 xúc xắc: Tính tổng số điểm và di chuyển quân cờ theo chiều kim đồng hồ.
2. Xử lý ô đất: Nhặt rác, trồng cây hoặc kích hoạt hiệu ứng đặc biệt của ô.
3. Ra quyết định chiến thuật: Lựa chọn Hành Động Môi Trường cá nhân (+2 Điểm) hoặc Hợp Tác Đồng Đội (cả hai nhận +3 Điểm).`,
    },
    {
      title: '4. Chế Tạo Phát Minh & Siêu Combo Tuần Hoàn',
      icon: 'science',
      content: `Sử dụng các thẻ tài nguyên thu thập được để chế tạo phát minh công nghệ xanh:
      
• Ống Hút Bã Mía = Bã Mía + Nước Tinh Khiết + Khuôn Tạo Hình (+4 Điểm & Tiến 1 ô).
• Pin Năng Lượng Mặt Trời = Khung Nhôm + Kính Cường Lực + Tấm Nền Sinh Thái (+5 Điểm).
• Siêu Combo "Vòng Tuần Hoàn Xanh": Kết hợp Lab Xanh + Rác Hữu Cơ + Xưởng Tái Chế + Vật Liệu Mới để thanh tẩy 50% rác toàn bàn!`,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3.5 space-y-4 pb-28 pt-2">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-xl bg-[#152125] p-3.5 shadow-md border border-[#3c4a42]/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3] shrink-0 border border-[#4edea3]/40">
            <span className="material-symbols-outlined text-[28px]">menu_book</span>
          </div>
          <div>
            <span className="text-[10px] text-[#4cd7f6] uppercase tracking-wider font-bold">
              Cẩm Nang Eco Ranger
            </span>
            <h1 className="text-[18px] font-bold text-[#d8e5ea]">Luật Chơi &amp; Hướng Dẫn</h1>
            <p className="text-[11px] text-[#bbcabf]">
              Quy tắc thi đấu chiến thuật, cơ chế liên minh và bảng công thức sinh thái
            </p>
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-2">
        {sections.map((sec, idx) => {
          const isOpen = activeAccordion === idx;
          return (
            <div
              key={sec.title}
              className="rounded-xl bg-[#152125] border border-[#3c4a42]/30 overflow-hidden shadow-sm"
            >
              <button
                type="button"
                onClick={() => {
                  sounds.playAction();
                  setActiveAccordion(isOpen ? null : idx);
                }}
                className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#202c30] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#4edea3] text-[20px]">
                    {sec.icon}
                  </span>
                  <span className="text-[13px] font-bold text-[#d8e5ea]">{sec.title}</span>
                </div>
                <span className="material-symbols-outlined text-[#bbcabf] text-[18px]">
                  {isOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-1 text-[11px] text-[#bbcabf] whitespace-pre-line leading-relaxed border-t border-[#3c4a42]/20 bg-[#051014]/50">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Settings Section */}
      <div className="rounded-xl bg-[#111d21] p-3.5 border border-[#3c4a42]/40 shadow-sm space-y-3">
        <h3 className="text-[14px] font-bold text-[#d8e5ea] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">settings</span>
          Cài Đặt Ứng Dụng
        </h3>

        <div className="flex items-center justify-between py-2 border-b border-[#3c4a42]/30">
          <div>
            <span className="text-[12px] font-semibold text-[#d8e5ea] block">Hiệu ứng âm thanh sinh thái</span>
            <span className="text-[10px] text-[#bbcabf]">Âm thanh xúc xắc và tiếng chuông thành tựu</span>
          </div>
          <button
            type="button"
            onClick={onToggleSound}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              soundEnabled ? 'bg-[#4edea3]' : 'bg-[#2b373b]'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-[#003824] shadow-md transition-transform ${
                soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <span className="text-[12px] font-semibold text-[#d8e5ea] block">Khởi động lại bàn chơi</span>
            <span className="text-[10px] text-[#bbcabf]">Thiết lập lại điểm số và các ô sa bàn</span>
          </div>
          <button
            type="button"
            onClick={onResetGame}
            className="px-3 py-1.5 rounded-lg bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/30 text-[11px] font-bold hover:bg-[#93000a] transition-colors"
          >
            Làm Mới
          </button>
        </div>
      </div>
    </div>
  );
};
