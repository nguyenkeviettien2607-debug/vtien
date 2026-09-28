import React, { useState } from 'react';
import { RecipeItem } from '../types/game';
import { sounds } from '../utils/audio';

interface CraftingScreenProps {
  recipes: RecipeItem[];
  score: number;
  waterDrops: number;
  onAddScore: (points: number, reason: string) => void;
  onOpenTradeModal: () => void;
}

export const CraftingScreen: React.FC<CraftingScreenProps> = ({
  recipes: initialRecipes,
  score,
  waterDrops,
  onAddScore,
  onOpenTradeModal,
}) => {
  const [recipes, setRecipes] = useState<RecipeItem[]>(initialRecipes);
  const [hasSubstrate, setHasSubstrate] = useState(false);
  const [solarPanelCrafted, setSolarPanelCrafted] = useState(false);
  const [claimedStrawQuest, setClaimedStrawQuest] = useState(false);
  const [megaComboActivated, setMegaComboActivated] = useState(false);

  const handleCraftRecipe = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id === recipeId) {
          sounds.playSuccess();
          onAddScore(r.points, `Chế tạo thành công ${r.name}`);
          return { ...r, crafted: true };
        }
        return r;
      })
    );
  };

  const handleCraftSolar = () => {
    if (!hasSubstrate || solarPanelCrafted) return;
    setSolarPanelCrafted(true);
    sounds.playSuccess();
    onAddScore(5, 'Ghép Thành Công Pin Năng Lượng Mặt Trời');
  };

  const handleAcquireSubstrate = () => {
    setHasSubstrate(true);
    sounds.playAction();
  };

  const handleClaimQuest = () => {
    if (claimedStrawQuest) return;
    setClaimedStrawQuest(true);
    sounds.playSuccess();
    onAddScore(3, 'Hoàn thành nhiệm vụ: Không Còn Ống Hút Nhựa');
  };

  const handleTriggerMegaCombo = () => {
    if (megaComboActivated) return;
    setMegaComboActivated(true);
    sounds.playSuccess();
    onAddScore(10, 'Kích hoạt Siêu Combo Vòng Tuần Hoàn Xanh');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3.5 space-y-4 pb-28 pt-2">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-xl bg-[#152125] p-3.5 shadow-md border border-[#3c4a42]/40">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#4edea3]/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-[#4cd7f6]/10 blur-xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10b981]/20 text-[#4edea3] border border-[#10b981]/30">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                biotech
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold">Trạm Chế Tạo Cấp 3</span>
            </div>
            <div className="flex items-center gap-1 bg-[#202c30] px-2.5 py-0.5 rounded-full text-[#4cd7f6] border border-[#3c4a42]/40">
              <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
              <span className="text-[11px] font-bold">14 Công Thức</span>
            </div>
          </div>
          <h1 className="text-[20px] font-extrabold text-[#d8e5ea] tracking-tight mt-0.5">
            Phòng Thí Nghiệm Đổi Mới Môi Trường
          </h1>
          <p className="text-[11px] text-[#bbcabf] leading-relaxed">
            Tái cấu trúc rác thải sinh hoạt và tài nguyên thiên nhiên thành phát minh xanh, hồi sinh các ô cạn kiệt trên bàn cờ.
          </p>
          <div className="flex items-center gap-3 mt-1 pt-1 border-t border-[#3c4a42]/30">
            <div className="flex items-center gap-1.5 text-[#4edea3]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="text-[10px] font-semibold">Tỉ lệ kích hoạt 100%</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-[#86948a]"></div>
            <div className="flex items-center gap-1.5 text-[#ffb95f]">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span className="text-[10px] font-semibold">Cộng dồn điểm Eco</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Đang Lắp Ráp: Pin Năng Lượng Mặt Trời */}
      <div className="relative overflow-hidden rounded-xl bg-[#111d21] p-3.5 shadow-md border border-[#3c4a42]/40">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#ffb95f]/15 text-[#ffb95f] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                solar_power
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#ffb95f] font-bold tracking-wide uppercase">
                  {solarPanelCrafted ? 'Đã Lắp Ráp Xong' : 'Đang Lắp Ráp'}
                </span>
                {!solarPanelCrafted && <span className="w-1.5 h-1.5 rounded-full bg-[#ffb95f] animate-pulse"></span>}
              </div>
              <h2 className="text-[15px] text-[#d8e5ea] font-bold">PIN NĂNG LƯỢNG MẶT TRỜI</h2>
            </div>
          </div>
          <span className="px-2 py-1 rounded-md bg-[#4edea3]/10 text-[#4edea3] text-[10px] font-bold border border-[#4edea3]/20">
            +2 Điểm Xanh
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#202c30] mb-3 flex items-center gap-2 text-[#4cd7f6] border border-[#3c4a42]/30">
          <span className="material-symbols-outlined text-[18px] shrink-0">shield</span>
          <span className="text-[11px] text-[#bbcabf]">
            Hiệu ứng bảo hộ: Chống trạng thái Cạn Kiệt Năng Lượng 3 lượt tiếp theo.
          </span>
        </div>

        {/* 3 Component Slots */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {/* Component 1 */}
          <div className="relative flex flex-col items-center justify-between p-2.5 rounded-lg bg-[#152125] text-center min-h-[105px] border border-[#4edea3]/30">
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#4edea3] flex items-center justify-center text-[#003824]">
              <span className="material-symbols-outlined text-[11px] font-bold">check</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#202c30] flex items-center justify-center text-[#4edea3] mt-1">
              <span className="material-symbols-outlined text-[18px]">window</span>
            </div>
            <div className="min-w-0 w-full mt-1">
              <p className="text-[11px] font-bold text-[#d8e5ea] truncate">Khung Nhôm</p>
              <p className="text-[9px] text-[#4edea3] font-semibold">ĐÃ CÓ (1/1)</p>
            </div>
          </div>

          {/* Component 2 */}
          <div className="relative flex flex-col items-center justify-between p-2.5 rounded-lg bg-[#152125] text-center min-h-[105px] border border-[#4edea3]/30">
            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#4edea3] flex items-center justify-center text-[#003824]">
              <span className="material-symbols-outlined text-[11px] font-bold">check</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#202c30] flex items-center justify-center text-[#4cd7f6] mt-1">
              <span className="material-symbols-outlined text-[18px]">layers</span>
            </div>
            <div className="min-w-0 w-full mt-1">
              <p className="text-[11px] font-bold text-[#d8e5ea] truncate">Kính Cường Lực</p>
              <p className="text-[9px] text-[#4edea3] font-semibold">ĐÃ CÓ (1/1)</p>
            </div>
          </div>

          {/* Component 3 (Missing / Obtained) */}
          <div
            onClick={() => {
              if (!hasSubstrate) handleAcquireSubstrate();
            }}
            className={`relative flex flex-col items-center justify-between p-2.5 rounded-lg text-center min-h-[105px] cursor-pointer transition-all border ${
              hasSubstrate
                ? 'bg-[#152125] border-[#4edea3]/50'
                : 'bg-[#2b373b]/60 border-[#ffb4ab]/50 hover:border-[#ffb4ab]'
            }`}
          >
            <div
              className={`absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                hasSubstrate ? 'bg-[#4edea3] text-[#003824]' : 'bg-[#93000a] text-[#ffdad6]'
              }`}
            >
              <span className="material-symbols-outlined text-[11px]">
                {hasSubstrate ? 'check' : 'priority_high'}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#152125] flex items-center justify-center text-[#bbcabf] mt-1">
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </div>
            <div className="min-w-0 w-full mt-1">
              <p className="text-[11px] font-bold text-[#d8e5ea] truncate">Tấm Nền Sinh Thái</p>
              <p className={`text-[9px] font-bold ${hasSubstrate ? 'text-[#4edea3]' : 'text-[#ffb4ab]'}`}>
                {hasSubstrate ? 'ĐÃ CÓ (1/1)' : 'CHƯA CÓ (0/1)'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleCraftSolar}
            disabled={!hasSubstrate || solarPanelCrafted}
            className={`w-full py-3 px-3.5 rounded-lg font-bold text-[13px] flex items-center justify-center gap-2 transition-all shadow-md ${
              solarPanelCrafted
                ? 'bg-[#4edea3] text-[#003824] cursor-default'
                : hasSubstrate
                ? 'bg-gradient-to-r from-[#4edea3] to-[#4cd7f6] text-[#003824] active:scale-95 cursor-pointer'
                : 'bg-[#2b373b] text-[#bbcabf]/50 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {solarPanelCrafted ? 'verified' : hasSubstrate ? 'bolt' : 'lock'}
            </span>
            <span>
              {solarPanelCrafted
                ? 'Đã Ghép Hoàn Tất (+5 Điểm Xanh)!'
                : 'Ghép Ngay (+5 Điểm Xanh)'}
            </span>
          </button>

          <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#152125] text-[#bbcabf] border border-[#3c4a42]/30">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-[#4cd7f6] text-[18px] shrink-0">
                swap_horiz
              </span>
              <span className="text-[11px] truncate">
                {hasSubstrate ? (
                  <span className="text-[#4edea3] font-bold">Đã có đủ 3/3 linh kiện sẵn sàng!</span>
                ) : (
                  <>Thiếu <strong className="text-[#d8e5ea]">Tấm Nền Sinh Thái</strong>? Mời bạn bè trao đổi!</>
                )}
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenTradeModal}
              className="shrink-0 px-2.5 py-1 rounded bg-[#4cd7f6]/15 text-[#4cd7f6] text-[10px] font-bold hover:bg-[#4cd7f6]/25 transition-colors border border-[#4cd7f6]/20"
            >
              Gửi Yêu Cầu
            </button>
          </div>
        </div>
      </div>

      {/* 3. SIÊU COMBO ĐỈNH CAO: VÒNG TUẦN HOÀN XANH */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#202c30] via-[#152125] to-[#051014] p-3.5 shadow-xl border border-[#ffb95f]/30">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e29100]/25 text-[#ffb95f] border border-[#ffb95f]/30">
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Siêu Combo Đỉnh Cao</span>
          </div>
          <span className="text-[10px] text-[#ffb95f] font-bold bg-[#ffb95f]/10 px-2 py-0.5 rounded-full border border-[#ffb95f]/20">
            Kỷ Lục Bàn Cờ
          </span>
        </div>
        <h3 className="text-[17px] font-extrabold text-[#d8e5ea] mt-1">VÒNG TUẦN HOÀN XANH</h3>
        <p className="text-[11px] text-[#4cd7f6] font-semibold mb-2.5">The Circular Economy Mega-Resonance</p>

        {/* 4 Combo Steps */}
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#051014] text-center border border-[#4edea3]/30">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px] mb-0.5">science</span>
            <span className="text-[9px] text-[#d8e5ea] font-semibold truncate w-full">Lab Xanh</span>
            <span className="text-[8px] text-[#4edea3]">✓ Sẵn sàng</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#051014] text-center border border-[#ffb95f]/30">
            <span className="material-symbols-outlined text-[#ffb95f] text-[20px] mb-0.5">compost</span>
            <span className="text-[9px] text-[#d8e5ea] font-semibold truncate w-full">Rác Hữu Cơ</span>
            <span className="text-[8px] text-[#4edea3]">✓ Có sẵn</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-[#051014] text-center border border-[#4cd7f6]/30">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[20px] mb-0.5">recycling</span>
            <span className="text-[9px] text-[#d8e5ea] font-semibold truncate w-full">Xưởng Tái Chế</span>
            <span className="text-[8px] text-[#4edea3]">✓ Đã đặt</span>
          </div>
          <div
            onClick={handleTriggerMegaCombo}
            className={`cursor-pointer flex flex-col items-center justify-center p-2 rounded-lg bg-[#051014] text-center border transition-all ${
              megaComboActivated
                ? 'border-[#4edea3] text-[#4edea3]'
                : 'border-[#3c4a42]/60 hover:border-[#4edea3]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] mb-0.5">
              {megaComboActivated ? 'verified' : 'grain'}
            </span>
            <span className="text-[9px] text-[#d8e5ea] font-semibold truncate w-full">Vật Liệu Mới</span>
            <span className="text-[8px] text-[#4edea3]">
              {megaComboActivated ? '✓ Đã kích hoạt' : 'Bấm kích hoạt'}
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-[#2b373b]/70 flex flex-col gap-1 text-[#d8e5ea] border border-[#3c4a42]/30">
          <div className="flex items-center gap-1.5 text-[#4edea3] text-[11px] font-bold">
            <span className="material-symbols-outlined text-[16px]">celebration</span>
            <span>Hiệu ứng kích hoạt toàn bàn (40 ô):</span>
          </div>
          <p className="text-[11px] text-[#bbcabf] leading-snug">
            Toàn bộ đồng minh nhận <strong className="text-[#4edea3]">+3 Điểm Xanh</strong>, thanh tẩy vĩnh viễn <strong className="text-[#4cd7f6]">1 Thẻ Ô Nhiễm</strong> và thanh lọc <strong className="text-[#ffb95f]">50% lượng rác tích tụ</strong> trên mọi khu sinh thái!
          </p>
        </div>
      </div>

      {/* 4. NHIỆM VỤ SINH THÁI ĐANG LÀM */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px]">assignment</span>
            <h3 className="text-[15px] text-[#d8e5ea] font-bold">Nhiệm Vụ Sinh Thái Đang Làm</h3>
          </div>
          <span className="text-[10px] text-[#bbcabf]">2 Đang diễn ra</span>
        </div>

        {/* Quest 1 */}
        <div className="p-3 rounded-xl bg-[#152125] flex flex-col gap-2 border border-[#3c4a42]/30">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">nature</span>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#d8e5ea] leading-snug">Không Còn Ống Hút Nhựa!</h4>
                <p className="text-[11px] text-[#bbcabf]">Chế tạo thành công ống hút bã mía phân hủy sinh học</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#4edea3] text-[#003824] text-[10px] font-bold shrink-0">
              +3 Điểm
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1 h-2 rounded-full bg-[#202c30] overflow-hidden">
              <div className="h-full bg-[#4edea3] rounded-full w-full"></div>
            </div>
            <span className="text-[10px] font-bold text-[#4edea3] shrink-0">1/1 (Hoàn thành)</span>
          </div>
          <button
            type="button"
            onClick={handleClaimQuest}
            disabled={claimedStrawQuest}
            className={`w-full py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 shadow-sm ${
              claimedStrawQuest
                ? 'bg-[#202c30] text-[#bbcabf] cursor-default'
                : 'bg-[#4edea3] text-[#003824] hover:opacity-95 cursor-pointer active:scale-98'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">redeem</span>
            <span>{claimedStrawQuest ? 'Đã Nhận Thưởng (+3 Điểm)' : 'Nhận Thưởng Nhiệm Vụ'}</span>
          </button>
        </div>

        {/* Quest 2 */}
        <div className="p-3 rounded-xl bg-[#152125] flex flex-col gap-2 border border-[#3c4a42]/30">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#4cd7f6]/20 text-[#4cd7f6] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">public</span>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#d8e5ea] leading-snug">Sứ Mệnh Gaia - Cứu Trái Đất</h4>
                <p className="text-[11px] text-[#bbcabf]">Thu thập liên hoàn 4 thành tựu công nghệ xanh</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#e29100] text-[#003824] text-[10px] font-bold shrink-0">
              +11 Điểm
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1 h-2 rounded-full bg-[#202c30] overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4cd7f6] to-[#4edea3] rounded-full w-2/4"></div>
            </div>
            <span className="text-[10px] font-bold text-[#4cd7f6] shrink-0">2/4 Điều kiện</span>
          </div>
          <div className="flex items-center justify-between text-[#bbcabf] text-[10px] pt-0.5">
            <span className="text-[#4edea3] font-semibold">✓ Lab Xanh</span>
            <span className="text-[#4edea3] font-semibold">✓ Tuabin Gió</span>
            <span className="text-[#86948a]">○ BioGreen</span>
            <span className="text-[#86948a]">○ Liên Minh</span>
          </div>
        </div>
      </div>

      {/* 5. THƯ VIỆN CÔNG THỨC XANH */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">menu_book</span>
            <h3 className="text-[15px] text-[#d8e5ea] font-bold">Thư Viện Công Thức Xanh</h3>
          </div>
          <span className="text-[10px] text-[#4edea3] font-bold">4 Đã Khám Phá</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-3 rounded-xl bg-[#152125] hover:bg-[#202c30] transition-colors border border-[#3c4a42]/30"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#4edea3]/15 text-[#4edea3] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">{recipe.icon}</span>
                  </div>
                  <h4 className="text-[14px] text-[#d8e5ea] font-bold truncate">{recipe.name}</h4>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#4edea3]/15 text-[#4edea3] text-[10px] font-bold shrink-0">
                  {recipe.reward}
                </span>
              </div>

              {/* Material tags */}
              <div className="flex items-center gap-1.5 flex-wrap my-2">
                {recipe.materials.map((mat, i) => (
                  <React.Fragment key={mat.name}>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        mat.owned
                          ? 'bg-[#202c30] text-[#bbcabf] border border-[#3c4a42]/30'
                          : 'bg-[#93000a]/20 text-[#ffb4ab] border border-[#ffb4ab]/30'
                      }`}
                    >
                      {mat.name} {mat.owned ? '' : '(Thiếu)'}
                    </span>
                    {i < recipe.materials.length - 1 && (
                      <span className="text-[#86948a] font-bold text-xs">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Bottom Craft action */}
              <div className="flex items-center justify-between pt-1 border-t border-[#3c4a42]/20">
                <span
                  className={`text-[11px] flex items-center gap-1 ${
                    recipe.canCraft ? 'text-[#4edea3]' : 'text-[#bbcabf]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {recipe.canCraft ? 'check_circle' : 'inventory_2'}
                  </span>
                  {recipe.canCraft
                    ? 'Đủ nguyên liệu ghép'
                    : 'Thiếu 1 máy phát điện'}
                </span>

                {recipe.canCraft ? (
                  <button
                    type="button"
                    onClick={() => handleCraftRecipe(recipe.id)}
                    className="px-3.5 py-1 rounded bg-[#4edea3] text-[#003824] text-[11px] font-bold active:scale-95 transition-transform cursor-pointer"
                  >
                    {recipe.crafted ? 'Chế Tạo Thêm' : 'Chế Tạo'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenTradeModal}
                    className="px-3 py-1 rounded bg-[#202c30] text-[#4cd7f6] text-[11px] font-bold hover:bg-[#2b373b] transition-colors border border-[#4cd7f6]/30"
                  >
                    Tìm Thẻ
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Chợ Trao Đổi Thẻ Toàn Cầu */}
      <div className="rounded-xl bg-[#111d21] p-3.5 flex items-center gap-3 border border-[#3c4a42]/30 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-[#4cd7f6]/10 flex items-center justify-center text-[#4cd7f6] shrink-0">
          <span className="material-symbols-outlined text-[24px]">contactless</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] font-bold text-[#d8e5ea] truncate">Chợ Trao Đổi Thẻ Toàn Cầu</h4>
          <p className="text-[11px] text-[#bbcabf] truncate">Đang có 12 người chơi muốn đổi Thẻ Tấm Nền</p>
        </div>
        <button
          type="button"
          onClick={onOpenTradeModal}
          className="px-3 py-1.5 rounded-lg bg-[#202c30] text-[#4cd7f6] text-[11px] font-bold shrink-0 hover:bg-[#4cd7f6]/20 transition-colors border border-[#4cd7f6]/30"
        >
          Xem Chợ
        </button>
      </div>
    </div>
  );
};
