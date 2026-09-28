import React, { useState } from 'react';
import { ASSETS } from '../data/initialData';
import { CardCategory, EcoCard } from '../types/game';
import { sounds } from '../utils/audio';

interface InventoryScreenProps {
  cards: EcoCard[];
  onAddScore: (points: number, reason: string) => void;
  onSelectCardDetail: (card: EcoCard) => void;
  onOpenTradeModal: () => void;
}

export const InventoryScreen: React.FC<InventoryScreenProps> = ({
  cards,
  onAddScore,
  onSelectCardDetail,
  onOpenTradeModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | CardCategory>('all');
  const [treeCount, setTreeCount] = useState(4);
  const [forestCreated, setForestCreated] = useState(false);
  const [coopCalled, setCoopCalled] = useState(false);
  const [sortedAsc, setSortedAsc] = useState(false);

  const categories = [
    { id: 'all' as const, label: 'Tất cả (18)' },
    { id: 'green' as const, label: 'Thẻ Môi Trường (8)' },
    { id: 'pollution' as const, label: 'Thẻ Ô Nhiễm (4)' },
    { id: 'invention' as const, label: 'Thẻ Phát Minh (3)' },
    { id: 'quest' as const, label: 'Thẻ Nhiệm Vụ (3)' },
  ];

  const handlePlantTree = () => {
    if (forestCreated) return;
    if (treeCount < 5) {
      const next = treeCount + 1;
      setTreeCount(next);
      sounds.playSuccess();
      if (next >= 5) {
        setForestCreated(true);
        onAddScore(3, 'Tạo Thành Công Thẻ Rừng Sinh Thái');
      } else {
        onAddScore(1, 'Gieo Thêm 1 Cây Xanh');
      }
    }
  };

  const handleCallCoop = () => {
    setCoopCalled(true);
    sounds.playAction();
    setTimeout(() => {
      sounds.playSuccess();
      onAddScore(3, 'Liên Minh Dọn Rác Biển Thành Công');
    }, 1500);
  };

  // Filtered cards
  const filteredCards = cards.filter((card) => {
    if (activeCategory === 'all') return true;
    return card.category === activeCategory;
  });

  const sortedCards = [...filteredCards].sort((a, b) => {
    return sortedAsc ? a.points - b.points : b.points - a.points;
  });

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3.5 space-y-3.5 pb-28 pt-2">
      {/* Character Perk Showcase */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#202c30] via-[#152125] to-[#202c30] shadow-xl p-3.5 border border-[#3c4a42]/40">
        <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-[#4edea3]/10 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md border-2 border-[#4edea3]/40">
              <img
                className="w-full h-full object-cover"
                src={ASSETS.trangAvatar}
                alt="Trang - Eco Ranger"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#4edea3] text-[#003824] rounded-full px-1.5 py-0.2 shadow-sm flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="text-[10px] font-bold">Cấp 3</span>
            </div>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] uppercase tracking-wider text-[#4cd7f6] font-bold">
                Nhân Vật Đồng Hành
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
            </div>
            <h2 className="text-[16px] text-[#d8e5ea] font-bold truncate">Nhà Khoa Học Môi Trường</h2>
            <div className="flex items-center gap-1.5 mt-1 bg-[#051014]/80 rounded-lg p-1.5 border border-[#3c4a42]/30">
              <span className="material-symbols-outlined text-[#4edea3] text-[18px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                psychology
              </span>
              <p className="text-[11px] text-[#bbcabf] truncate">
                <span className="text-[#4edea3] font-bold">Kỹ sư nghiên cứu:</span> +20% tỷ lệ ghép combo phát minh
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deck Summary & Action Bar */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#111d21] shadow-sm border border-[#3c4a42]/30">
          <div className="flex items-center gap-1 text-[#4edea3]">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            <span className="text-[16px] font-bold">19</span>
          </div>
          <span className="text-[10px] text-[#bbcabf] text-center">Điểm Xanh Đạt Được</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#111d21] shadow-sm border border-[#3c4a42]/30">
          <div className="flex items-center gap-1 text-[#4cd7f6]">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span className="text-[16px] font-bold">2/3</span>
          </div>
          <span className="text-[10px] text-[#bbcabf] text-center">Kháng Ô Nhiễm</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#111d21] shadow-sm border border-[#3c4a42]/30">
          <div className="flex items-center gap-1 text-[#ffb95f]">
            <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
            <span className="text-[16px] font-bold">{forestCreated ? '5/5' : `${treeCount}/5`}</span>
          </div>
          <span className="text-[10px] text-[#bbcabf] text-center">Ghép Rừng Kế</span>
        </div>
      </div>

      {/* Filter Chips (Scrollable Horizontal) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar -mx-3.5 px-3.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                sounds.playAction();
                setActiveCategory(cat.id);
              }}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-bold shadow-sm transition-all border ${
                isActive
                  ? 'bg-[#4edea3] text-[#003824] border-[#4edea3]'
                  : 'bg-[#152125] text-[#bbcabf] hover:text-[#d8e5ea] border-[#3c4a42]/40'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* SECTION 1: THẺ MÔI TRƯỜNG (GREEN CARDS) */}
      {(activeCategory === 'all' || activeCategory === 'green') && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                eco
              </span>
              <h3 className="text-[15px] text-[#d8e5ea] font-bold">Thẻ Môi Trường (Green Cards)</h3>
            </div>
            <span className="text-[10px] text-[#4edea3] font-bold bg-[#4edea3]/10 px-2 py-0.5 rounded-full border border-[#4edea3]/20">
              8 Thẻ Sẵn Sàng
            </span>
          </div>

          {/* Card 1: Trồng Cây (Interactive Progress) */}
          <div className="relative overflow-hidden rounded-xl bg-[#152125] shadow-md p-3.5 border border-[#4edea3]/30 shadow-[0_4px_20px_rgba(78,222,163,0.12)]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-[#4edea3]/40">
                  <img
                    className="w-full h-full object-cover"
                    src={ASSETS.seedlingCard}
                    alt="Trồng Cây"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold text-[#d8e5ea] truncate">Trồng Cây</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#4edea3]/20 text-[#4edea3] font-bold">
                      +1/cây
                    </span>
                  </div>
                  <p className="text-[11px] text-[#bbcabf] mt-0.5">
                    Tích lũy 5 Cây Xanh để hợp nhất thành{' '}
                    <span className="text-[#4edea3] font-bold">Thẻ Rừng (+3 Điểm Xanh)</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Meter */}
            <div className="mt-3 bg-[#051014]/80 rounded-lg p-2.5 border border-[#3c4a42]/30">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[10px] text-[#bbcabf] font-medium">Tiến trình kích hoạt Rừng Xanh</span>
                <span className="text-[10px] text-[#4edea3] font-bold">
                  {forestCreated ? '5 / 5 (ĐÃ HOÀN TẤT!)' : `${treeCount} / 5 Cây Xanh`}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-[#202c30] overflow-hidden flex gap-1 p-0.5 border border-[#3c4a42]/20">
                {[1, 2, 3, 4, 5].map((idx) => {
                  const filled = idx <= treeCount;
                  return (
                    <div
                      key={idx}
                      className={`h-full flex-1 rounded-full transition-all duration-300 ${
                        filled ? 'bg-[#4edea3]' : 'bg-[#2b373b] animate-pulse'
                      }`}
                    />
                  );
                })}
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-[11px] text-[#4cd7f6] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                  {forestCreated
                    ? '🎉 Combo Rừng Xanh Đã Kích Hoạt!'
                    : `Còn ${5 - treeCount} cây để tạo combo!`}
                </span>
                <button
                  type="button"
                  onClick={handlePlantTree}
                  disabled={forestCreated}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#4edea3] to-[#4cd7f6] text-[#003824] text-[12px] font-bold shadow-md active:scale-95 transition-transform flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[16px]">park</span>
                  {forestCreated ? 'Đã Thành Rừng' : 'Trồng Ngay'}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Xe Điện Xanh */}
          <div className="rounded-xl bg-[#152125] shadow-md p-3.5 border border-[#3c4a42]/30">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-[#4cd7f6]/40">
                  <img
                    className="w-full h-full object-cover"
                    src={ASSETS.evCard}
                    alt="Xe Điện Xanh"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[15px] font-bold text-[#d8e5ea] truncate">Xe Điện Xanh</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4edea3] text-[#003824] font-bold">
                      Đang Kích Hoạt
                    </span>
                  </div>
                  <p className="text-[11px] text-[#bbcabf] mt-1 leading-snug">
                    Tiến thêm <span className="text-[#4edea3] font-bold">2 ô</span> mỗi lượt tung. Miễn nhiễm hoàn toàn với <span className="text-[#ffb4ab] font-medium">Khói Xe Cộ</span> (+3 Điểm Xanh).
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-2.5 pt-2 flex items-center justify-between text-[#bbcabf] text-[11px] border-t border-[#3c4a42]/30">
              <span className="flex items-center gap-1 text-[#4cd7f6] font-medium">
                <span className="material-symbols-outlined text-[16px]">shield</span> Khiên bảo vệ đang mở
              </span>
              <span className="text-[#4edea3] font-bold">+3 Điểm</span>
            </div>
          </div>

          {/* Two-column Green Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* BioGreen */}
            <div className="rounded-xl bg-[#152125] p-3 shadow-md border border-[#3c4a42]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3]">
                    <span className="material-symbols-outlined text-[19px]">biotech</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded-full">
                    +8 Điểm Xanh
                  </span>
                </div>
                <h4 className="text-[14px] font-bold text-[#d8e5ea]">BioGreen Tự Làm Sạch</h4>
                <p className="text-[11px] text-[#bbcabf] mt-1">
                  Vật liệu sinh học tiên tiến. Miễn nhiễm <span className="text-[#4cd7f6] font-bold">1 thẻ Ô Nhiễm</span> bất kỳ trong bàn đấu.
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#3c4a42]/20">
                <span className="text-[10px] text-[#4cd7f6] font-medium">Thẻ Cực Hiếm (Epic)</span>
                <button
                  type="button"
                  onClick={() => onSelectCardDetail(cards.find((c) => c.id === 'biogreen-cleaner') || cards[2])}
                  className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#202c30] text-[#d8e5ea] hover:text-[#4edea3] transition-colors"
                >
                  Chi tiết
                </button>
              </div>
            </div>

            {/* AI Recycler */}
            <div className="rounded-xl bg-[#152125] p-3 shadow-md border border-[#3c4a42]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#4edea3]/10 flex items-center justify-center text-[#4edea3]">
                    <span className="material-symbols-outlined text-[19px]">recycling</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded-full">
                    +5 Điểm Xanh
                  </span>
                </div>
                <h4 className="text-[14px] font-bold text-[#d8e5ea]">Xưởng Tái Chế AI</h4>
                <p className="text-[11px] text-[#bbcabf] mt-1">
                  Phân loại rác tự động. Chặn 1 tác động tiêu cực ô nhiễm và chuyển hóa rác thành tài nguyên nước.
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#3c4a42]/20">
                <span className="text-[10px] text-[#4edea3] font-medium">Sẵn sàng phản ứng</span>
                <button
                  type="button"
                  onClick={() => onSelectCardDetail(cards.find((c) => c.id === 'ai-recycler') || cards[3])}
                  className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#202c30] text-[#d8e5ea] hover:text-[#4edea3] transition-colors"
                >
                  Chi tiết
                </button>
              </div>
            </div>

            {/* Urban Sensor */}
            <div className="rounded-xl bg-[#152125] p-3 shadow-md border border-[#3c4a42]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#4cd7f6]/10 flex items-center justify-center text-[#4cd7f6]">
                    <span className="material-symbols-outlined text-[19px]">sensors</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#4cd7f6] bg-[#4cd7f6]/10 px-2 py-0.5 rounded-full">
                    Phản Ứng Nhanh
                  </span>
                </div>
                <h4 className="text-[14px] font-bold text-[#d8e5ea]">Cảm Biến Đô Thị</h4>
                <p className="text-[11px] text-[#bbcabf] mt-1">
                  Mạng lưới IoT giám sát không khí. <span className="text-[#4edea3] font-bold">Hủy ngay 1 thẻ Ô Nhiễm</span> ngay khoảnh khắc rút trúng.
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#3c4a42]/20">
                <span className="text-[10px] text-[#bbcabf] font-medium">Bị động kích hoạt</span>
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">check_circle</span>
              </div>
            </div>

            {/* Recycled Furniture */}
            <div className="rounded-xl bg-[#152125] p-3 shadow-md border border-[#3c4a42]/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#ffb95f]/10 flex items-center justify-center text-[#ffb95f]">
                    <span className="material-symbols-outlined text-[19px]">chair</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded-full">
                    +3 Điểm Xanh
                  </span>
                </div>
                <h4 className="text-[14px] font-bold text-[#d8e5ea]">Nội Thất Tái Chế</h4>
                <p className="text-[11px] text-[#bbcabf] mt-1">
                  Gỗ tái sinh và sợi vải hữu cơ. Tăng chỉ số văn minh sinh thái bền vững cho toàn bộ ô lãnh thổ.
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#3c4a42]/20">
                <span className="text-[10px] text-[#bbcabf] font-medium">Khu dân cư</span>
                <span className="material-symbols-outlined text-[#4edea3] text-[18px]">inventory_2</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: THẺ Ô NHIỄM CẦN XỬ LÝ (POLLUTION CARDS) */}
      {(activeCategory === 'all' || activeCategory === 'pollution') && (
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                warning
              </span>
              <h3 className="text-[15px] text-[#ffb4ab] font-bold">Thẻ Ô Nhiễm Cần Xử Lý</h3>
            </div>
            <span className="text-[10px] text-[#ffb4ab] font-bold bg-[#93000a]/30 px-2 py-0.5 rounded-full border border-[#ffb4ab]/20">
              3 Cảnh Báo
            </span>
          </div>

          {/* Hazard 1: Rác Nhựa Tràn Ngập Biển */}
          <div className="relative overflow-hidden rounded-xl bg-[#152125] shadow-md p-3.5 border border-[#93000a]/40 shadow-[0_0_24px_rgba(239,68,68,0.18)]">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-[#ffb4ab]/40">
                <img
                  className="w-full h-full object-cover"
                  src={ASSETS.oceanWaveCard}
                  alt="Rác Nhựa Tràn Biển"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-[15px] font-bold text-[#ffb4ab] truncate">Rác Nhựa Tràn Biển</h4>
                  <span className="text-[10px] text-[#ffb4ab] bg-[#93000a]/50 px-2 py-0.5 rounded-full font-bold">
                    -2 Điểm
                  </span>
                </div>
                <p className="text-[11px] text-[#bbcabf] mt-1 leading-snug">
                  Gây nghẽn hệ sinh thái biển sâu. Phạt tức thì -2 Điểm Xanh mỗi vòng nếu không thu gom.
                </p>
              </div>
            </div>

            {/* Cooperative Action Prompt */}
            <div className="mt-3 p-2.5 rounded-lg bg-[#051014]/80 flex items-center justify-between gap-2 border border-[#3c4a42]/30">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="material-symbols-outlined text-[#ffb95f] text-[18px] shrink-0">
                  handshake
                </span>
                <p className="text-[11px] text-[#ffb95f] truncate">
                  Hợp tác cùng đồng đội để biến thành{' '}
                  <span className="font-bold text-[#4edea3]">+3 Điểm Xanh!</span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleCallCoop}
                className="px-3 py-1 rounded-md bg-[#ffb95f] text-[#472a00] text-[11px] font-bold shrink-0 shadow-sm active:scale-95 transition-transform"
              >
                {coopCalled ? 'Đã Kêu Gọi ✓' : 'Kêu Gọi'}
              </button>
            </div>
          </div>

          {/* Hazard 2: Khói Xe Cộ (Immune Status) */}
          <div className="rounded-xl bg-[#152125] shadow-md p-3.5 border border-[#3c4a42]/30 shadow-[0_0_16px_rgba(239,68,68,0.1)]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#93000a]/30 flex items-center justify-center text-[#ffb4ab] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">directions_car</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[14px] font-bold text-[#d8e5ea] truncate">Khói Xe Cộ</h4>
                    <span className="text-[9px] text-[#ffb4ab] bg-[#93000a]/40 px-2 py-0.2 rounded-full font-bold">
                      Lùi 1 ô
                    </span>
                  </div>
                  <p className="text-[11px] text-[#bbcabf] mt-0.5">
                    Tắc nghẽn đô thị và bụi mịn làm chậm bước đi của người chơi.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-2.5 p-2 rounded-lg bg-[#4edea3]/10 flex items-center justify-between border border-[#4edea3]/20">
              <span className="text-[11px] text-[#4edea3] flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[16px]">check_circle</span> Đã được "Xe Điện Xanh" kháng hiệu ứng!
              </span>
              <span className="text-[10px] text-[#4edea3] font-bold">Vô Hiệu Hóa</span>
            </div>
          </div>

          {/* Hazard 3: Nhà Máy Khí Thải Đen */}
          <div className="relative overflow-hidden rounded-xl bg-[#152125] shadow-md p-3.5 border border-[#93000a]/50 shadow-[0_0_24px_rgba(239,68,68,0.22)]">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm border border-[#ffb4ab]/40">
                <img
                  className="w-full h-full object-cover"
                  src={ASSETS.factorySmokeCard}
                  alt="Nhà Máy Khí Thải Đen"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-[15px] font-bold text-[#ffb4ab] truncate">Nhà Máy Khí Thải Đen</h4>
                  <span className="text-[10px] bg-[#ffb4ab] px-2 py-0.5 rounded-full font-bold text-[#690005]">
                    Nguy Hiểm!
                  </span>
                </div>
                <p className="text-[11px] text-[#bbcabf] mt-1 leading-snug">
                  <span className="text-[#ffb4ab] font-bold">Lùi 2 ô, -6 Điểm Xanh</span> nếu không có công trình{' '}
                  <span className="text-[#4cd7f6] font-bold">Tuabin Gió</span> kích hoạt kịp lúc.
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#3c4a42]/30">
              <span className="text-[11px] text-[#bbcabf] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#ffb95f]">bolt</span> Yêu cầu: Năng Lượng Tái Tạo
              </span>
              <button
                type="button"
                onClick={onOpenTradeModal}
                className="px-3 py-1.5 rounded-lg bg-[#202c30] text-[#4cd7f6] hover:bg-[#4cd7f6] hover:text-[#003824] text-[11px] font-bold shadow-sm transition-colors border border-[#4cd7f6]/30"
              >
                Giải Pháp Khắc Phục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Inventory Capacity Status */}
      <div className="p-3.5 rounded-xl bg-[#111d21] shadow-sm flex items-center justify-between text-[#bbcabf] border border-[#3c4a42]/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4edea3] text-[20px]">inventory</span>
          <span className="text-[12px]">
            Sức chứa túi thẻ: <span className="text-[#d8e5ea] font-bold">{sortedCards.length} / 25 Thẻ</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            sounds.playAction();
            setSortedAsc(!sortedAsc);
          }}
          className="text-[11px] text-[#4cd7f6] font-bold flex items-center gap-0.5 hover:underline"
        >
          <span>Sắp xếp {sortedAsc ? '(Tăng dần)' : '(Giảm dần)'}</span>
          <span className="material-symbols-outlined text-[16px]">swap_vert</span>
        </button>
      </div>
    </div>
  );
};
