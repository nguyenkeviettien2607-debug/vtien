import React, { useState } from 'react';
import { BoardTile, Player } from '../types/game';
import { sounds } from '../utils/audio';

interface BoardScreenProps {
  players: Player[];
  tiles: BoardTile[];
  currentTileId: number;
  earthHealth: number;
  currentRound: number;
  maxRounds: number;
  onAdvanceTile: (steps: number) => void;
  onAddScore: (points: number, reason: string) => void;
  onOpenBoardMap: () => void;
}

export const BoardScreen: React.FC<BoardScreenProps> = ({
  players,
  tiles,
  currentTileId,
  earthHealth,
  currentRound,
  maxRounds,
  onAdvanceTile,
  onAddScore,
  onOpenBoardMap,
}) => {
  const [dice1, setDice1] = useState(4);
  const [dice2, setDice2] = useState(2);
  const [isRolling, setIsRolling] = useState(false);
  const [pickedUpTrash, setPickedUpTrash] = useState(false);
  const [coopActionDone, setCoopActionDone] = useState(false);
  const [soloActionDone, setSoloActionDone] = useState(false);

  const currentTile = tiles.find((t) => t.id === currentTileId) || tiles[13];
  const diceTotal = dice1 + dice2;

  // Dice Pip Generator
  const renderPips = (val: number) => {
    switch (val) {
      case 1:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-current shadow-sm"></span>
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex items-center justify-between p-2">
            <span className="w-3 h-3 rounded-full bg-current"></span>
            <span className="w-3 h-3 rounded-full bg-current"></span>
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full flex justify-between p-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-current self-start"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-current self-center"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-current self-end"></span>
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full flex flex-col justify-between p-2">
            <div className="flex justify-between">
              <span className="w-3 h-3 rounded-full bg-current"></span>
              <span className="w-3 h-3 rounded-full bg-current"></span>
            </div>
            <div className="flex justify-between">
              <span className="w-3 h-3 rounded-full bg-current"></span>
              <span className="w-3 h-3 rounded-full bg-current"></span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full flex flex-col justify-between p-1.5">
            <div className="flex justify-between">
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
            </div>
            <div className="flex justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
            </div>
            <div className="flex justify-between">
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
            </div>
          </div>
        );
      case 6:
      default:
        return (
          <div className="w-full h-full flex justify-between p-1.5">
            <div className="flex flex-col justify-between">
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
            </div>
            <div className="flex flex-col justify-between">
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
            </div>
          </div>
        );
    }
  };

  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    sounds.playDiceRoll();

    // Visual rattle animation
    let count = 0;
    const interval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 6) {
        clearInterval(interval);
        const final1 = Math.floor(Math.random() * 5) + 2;
        const final2 = Math.floor(Math.random() * 4) + 1;
        setDice1(final1);
        setDice2(final2);
        setIsRolling(false);
        const steps = final1 + final2;
        onAdvanceTile(steps);
        sounds.playSuccess();
      }
    }, 60);
  };

  const handleQuickPickup = () => {
    if (pickedUpTrash) return;
    setPickedUpTrash(true);
    sounds.playSuccess();
    onAddScore(2, 'Nhặt 1 Rác Nhựa Bờ Biển');
    setTimeout(() => {
      setPickedUpTrash(false);
    }, 4000);
  };

  const handleSoloAction = () => {
    if (soloActionDone) return;
    setSoloActionDone(true);
    sounds.playSuccess();
    onAddScore(2, 'Dọn Rác Biển Cứu San Hô');
    setTimeout(() => setSoloActionDone(false), 3000);
  };

  const handleCoopAction = () => {
    if (coopActionDone) return;
    setCoopActionDone(true);
    sounds.playSuccess();
    onAddScore(3, 'Hợp Tác Cùng Minh Thu Gom Nhựa');
    setTimeout(() => setCoopActionDone(false), 3000);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3.5 gap-4 pb-28 pt-2">
      {/* 1. THÔNG TIN TRẬN ĐẤU & SỨC KHỎE TRÁI ĐẤT */}
      <section className="flex flex-col gap-2 rounded-xl bg-[#152125] p-3.5 shadow-md border border-[#3c4a42]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#4edea3]/20 text-[#4edea3]">
              <span className="material-symbols-outlined text-[18px]">nature_people</span>
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#4edea3] font-bold tracking-wider uppercase">
                Giai đoạn 2: Khám Phá &amp; Tái Sinh
              </span>
              <span className="text-[15px] text-[#d8e5ea] font-extrabold">
                Vòng Đấu {currentRound} / {maxRounds}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#202c30] text-[#4edea3] text-[11px] font-semibold border border-[#3c4a42]/40">
            <span className="material-symbols-outlined text-[15px] text-[#ffb95f]">schedule</span>
            <span>Lượt: Trang</span>
          </div>
        </div>

        {/* Thanh Sức Khỏe Toàn Cầu */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-[#bbcabf] text-[12px] font-medium">
              <span className="material-symbols-outlined text-[#4cd7f6] text-[16px]">public</span>
              <span>Chỉ số Sức Khỏe Trái Đất</span>
            </div>
            <span className="text-[13px] text-[#4edea3] font-black">{earthHealth}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#051014] overflow-hidden flex items-center p-0.5 border border-[#3c4a42]/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#4edea3] via-[#03b5d3] to-[#4cd7f6] transition-all duration-700 shadow-sm"
              style={{ width: `${Math.min(100, Math.max(5, earthHealth))}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[#bbcabf] text-[10px]">
            <span>Ngưỡng Nguy Cơ: &lt;40%</span>
            <span className="text-[#4edea3] font-bold">Mục tiêu cứu rỗi: 100%</span>
          </div>
        </div>

        {/* 4 Nhà Bảo Vệ Môi Trường (Role Strip) */}
        <div className="grid grid-cols-4 gap-1.5 mt-1 pt-1 border-t border-[#3c4a42]/30">
          {players.map((player) => {
            const isTrang = player.id === 'trang';
            return (
              <div
                key={player.id}
                className={`flex flex-col items-center p-1.5 rounded-lg text-center relative overflow-hidden transition-all ${
                  isTrang
                    ? 'bg-[#4edea3]/15 border border-[#4edea3]/40 shadow-[0_0_12px_rgba(78,222,163,0.15)]'
                    : 'bg-[#202c30] border border-[#3c4a42]/20'
                }`}
              >
                {isTrang && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></div>
                )}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] shadow-sm"
                  style={{ backgroundColor: player.color, color: '#091519' }}
                >
                  {player.badge}
                </div>
                <span
                  className="text-[11px] font-bold truncate w-full mt-1"
                  style={{ color: isTrang ? '#4edea3' : '#d8e5ea' }}
                >
                  {player.name}
                </span>
                <span className="text-[9px] text-[#bbcabf] leading-tight">{player.role}</span>
                <span
                  className="text-[10px] font-extrabold mt-0.5"
                  style={{ color: player.color }}
                >
                  {player.score} ĐX
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. BẢN ĐỒ BÀN CỜ 40 Ô & KHU VỰC CHIẾN LƯỢC */}
      <section className="flex flex-col gap-2 rounded-xl bg-[#111d21] p-2.5 shadow-lg border border-[#3c4a42]/30 overflow-hidden">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px]">explore</span>
            <h2 className="text-[15px] text-[#d8e5ea] font-bold">Sa Bàn Sinh Thái 40 Ô</h2>
          </div>
          <button
            type="button"
            onClick={onOpenBoardMap}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#4edea3]/15 text-[#4edea3] text-[10px] font-bold border border-[#4edea3]/30 hover:bg-[#4edea3]/25 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
            <span>Bạn ở Ô {currentTileId} (Xem Bản Đồ)</span>
          </button>
        </div>

        {/* Mini Board Graphic Grid */}
        <div className="relative w-full rounded-lg bg-[#051014] p-2 grid grid-cols-4 gap-1.5 border border-[#3c4a42]/30">
          {/* Khu Rừng U Ám */}
          <div
            onClick={onOpenBoardMap}
            className="cursor-pointer flex flex-col gap-1 p-2 rounded bg-[#202c30] text-left relative overflow-hidden hover:border-[#4edea3]/50 transition-all border border-transparent"
          >
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-[#4edea3] text-[18px]">forest</span>
              <span className="text-[9px] text-[#4edea3] font-black">Ô 01-10</span>
            </div>
            <span className="text-[11px] text-[#d8e5ea] font-bold leading-tight">Rừng U Ám</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              <span className="px-1 py-0.5 rounded bg-[#4edea3]/20 text-[#4edea3] text-[9px] font-semibold">
                Tái Sinh Rừng
              </span>
              <span className="px-1 py-0.5 rounded bg-[#93000a] text-[#ffdad6] text-[9px] font-semibold">
                Cháy Rừng
              </span>
            </div>
          </div>

          {/* Khu Đại Dương Nhiễm Bẩn (Current Player Location Highlight) */}
          <div
            onClick={onOpenBoardMap}
            className="cursor-pointer flex flex-col gap-1 p-2 rounded bg-[#4cd7f6]/15 text-left relative overflow-hidden border border-[#4cd7f6]/50 shadow-[0_0_15px_rgba(76,215,246,0.2)]"
          >
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">water</span>
              <span className="text-[9px] text-[#4cd7f6] font-black">Ô 11-20</span>
            </div>
            <span className="text-[11px] text-[#d8e5ea] font-bold leading-tight">Đại Dương Nhựa</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              <span className="px-1 py-0.5 rounded bg-[#4cd7f6] text-[#003640] text-[9px] font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[10px]">location_on</span>Ô {currentTileId}: Trang
              </span>
              <span className="px-1 py-0.5 rounded bg-[#2b373b] text-[#bbcabf] text-[9px]">
                Bão Rác
              </span>
            </div>
          </div>

          {/* Khu Đô Thị Khói Bụi */}
          <div
            onClick={onOpenBoardMap}
            className="cursor-pointer flex flex-col gap-1 p-2 rounded bg-[#202c30] text-left hover:border-[#ffb95f]/50 transition-all border border-transparent"
          >
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">apartment</span>
              <span className="text-[9px] text-[#ffb95f] font-black">Ô 21-30</span>
            </div>
            <span className="text-[11px] text-[#d8e5ea] font-bold leading-tight">Đô Thị Khói Bụi</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              <span className="px-1 py-0.5 rounded bg-[#2b373b] text-[#bbcabf] text-[9px]">
                Điện Gió
              </span>
              <span className="px-1 py-0.5 rounded bg-[#2b373b] text-[#bbcabf] text-[9px]">
                Tái Chế
              </span>
            </div>
          </div>

          {/* Khu Khủng Hoảng Môi Trường */}
          <div
            onClick={onOpenBoardMap}
            className="cursor-pointer flex flex-col gap-1 p-2 rounded bg-[#202c30] text-left hover:border-[#ffb4ab]/50 transition-all border border-transparent"
          >
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-[#ffb4ab] text-[18px]">warning</span>
              <span className="text-[9px] text-[#ffb4ab] font-black">Ô 31-40</span>
            </div>
            <span className="text-[11px] text-[#d8e5ea] font-bold leading-tight">Vùng Khủng Hoảng</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              <span className="px-1 py-0.5 rounded bg-[#93000a] text-[#ffdad6] text-[9px]">
                Rò Rỉ Khí
              </span>
              <span className="px-1 py-0.5 rounded bg-[#2b373b] text-[#bbcabf] text-[9px]">
                Khí Thải
              </span>
            </div>
          </div>

          {/* Tâm Điểm: Gaia Lab Hub */}
          <div
            onClick={onOpenBoardMap}
            className="cursor-pointer col-span-4 rounded-lg bg-[#202c30] p-2.5 flex items-center justify-between shadow-sm border border-[#3c4a42]/30 hover:border-[#4edea3]/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
                <span className="material-symbols-outlined text-[22px]">science</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] text-[#4edea3] font-bold">
                    Đài Khí Tượng &amp; Viện Gaia
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#4edea3]/10 text-[#4edea3] text-[9px] font-bold">
                    Tâm Bàn Cờ
                  </span>
                </div>
                <span className="text-[11px] text-[#bbcabf]">
                  Tổng Điểm Cả Nhóm: <strong className="text-[#4edea3] font-bold">145 / 100 Đạt Chuẩn Cứu Trái Đất</strong>
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0 pl-1">
              <span className="text-[9px] text-[#ffb95f] font-bold">Quỹ Thẻ Toàn Cầu</span>
              <span className="text-[12px] text-[#d8e5ea] font-extrabold">18 Thẻ</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KHUNG THÔNG TIN Ô HIỆN TẠI (Ô 14) */}
      <section className="flex flex-col gap-2 rounded-xl bg-[#152125] p-3.5 shadow-md border border-[#3c4a42]/30">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#4cd7f6]/20 flex items-center justify-center text-[#4cd7f6] shrink-0">
              <span className="material-symbols-outlined text-[24px]">{currentTile.icon}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="px-1.5 py-0.5 rounded bg-[#4cd7f6]/20 text-[#4cd7f6] text-[10px] font-bold">
                  {currentTile.zoneName}
                </span>
                <span className="text-[11px] text-[#bbcabf]">Ô Số {currentTile.id}</span>
              </div>
              <h3 className="text-[16px] text-[#d8e5ea] font-bold">{currentTile.name}</h3>
            </div>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              currentTile.status === 'disaster'
                ? 'bg-[#93000a] text-[#ffdad6] animate-pulse'
                : currentTile.status === 'polluted'
                ? 'bg-[#93000a] text-[#ffdad6]'
                : 'bg-[#4edea3]/20 text-[#4edea3]'
            }`}
          >
            {currentTile.status === 'disaster'
              ? 'Khủng Hoảng Cấp 4'
              : currentTile.status === 'polluted'
              ? `Ô Nhiễm Cấp ${currentTile.pollutionLevel}`
              : 'Đã Phục Hồi Xanh'}
          </span>
        </div>

        <p className="text-[12px] text-[#bbcabf] leading-relaxed">
          {currentTile.description}
        </p>

        {/* Nút hành động trực tiếp tại ô */}
        <button
          type="button"
          onClick={handleQuickPickup}
          className={`w-full mt-1 py-2.5 px-3 rounded-lg font-bold text-[12px] flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all ${
            pickedUpTrash
              ? 'bg-[#4edea3] text-[#003824]'
              : 'bg-[#4cd7f6] text-[#003640] hover:bg-[#4cd7f6]/90'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {pickedUpTrash ? 'check_circle' : 'cleaning_services'}
          </span>
          <span>
            {pickedUpTrash
              ? 'Đã dọn sạch 1 rác bờ biển (+2 Điểm Xanh)!'
              : currentTile.actionText}
          </span>
        </button>
      </section>

      {/* 4. KHU VỰC TUNG XÚC XẮC & LỰA CHỌN CHIẾN THUẬT */}
      <section className="flex flex-col gap-3 rounded-xl bg-[#202c30] p-3.5 shadow-xl border border-[#3c4a42]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px]">casino</span>
            <h3 className="text-[15px] text-[#d8e5ea] font-bold">Tung Xúc Xắc Sinh Thái</h3>
          </div>
          <span className="text-[11px] text-[#ffb95f] font-semibold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[16px]">stars</span> Rút Thẻ Sự Kiện
          </span>
        </div>

        {/* 2 Viên Xúc Xắc 3D Sinh Thái */}
        <div className="flex items-center justify-center gap-5 py-2">
          {/* Dice 1 (Primary Emerald) */}
          <div
            className={`w-16 h-16 rounded-xl bg-gradient-to-br from-[#4edea3] to-[#2b373b] text-[#003824] shadow-lg flex flex-col justify-between p-2 border border-[#4edea3]/50 transition-all duration-300 ${
              isRolling ? 'rotate-45 scale-90 blur-[0.5px]' : 'hover:scale-105'
            }`}
          >
            {renderPips(dice1)}
          </div>

          {/* Dấu Cộng */}
          <span className="text-[28px] text-[#4edea3] font-black leading-none select-none">+</span>

          {/* Dice 2 (Cyan Secondary) */}
          <div
            className={`w-16 h-16 rounded-xl bg-gradient-to-br from-[#4cd7f6] to-[#2b373b] text-[#003640] shadow-lg flex flex-col justify-between p-2 border border-[#4cd7f6]/50 transition-all duration-300 ${
              isRolling ? '-rotate-45 scale-90 blur-[0.5px]' : 'hover:scale-105'
            }`}
          >
            {renderPips(dice2)}
          </div>

          {/* Kết Quả Tổng */}
          <div className="flex flex-col items-center justify-center pl-2 border-l border-[#3c4a42]/40">
            <span className="text-[10px] text-[#bbcabf] font-bold uppercase tracking-wider">
              Tổng Bước
            </span>
            <span className="text-[32px] text-[#4edea3] font-black leading-none">{diceTotal}</span>
          </div>
        </div>

        {/* Thông báo xúc xắc */}
        <div className="flex items-center gap-1.5 p-2 rounded-lg bg-[#051014] text-[#bbcabf] text-[11px] border border-[#3c4a42]/20">
          <span className="material-symbols-outlined text-[#4edea3] text-[18px]">verified</span>
          <span>Đạt {diceTotal} điểm: Tiến {diceTotal} bước tới Ô {((currentTileId + diceTotal - 1) % 40) + 1} &amp; Rút 1 Thẻ Toàn Cầu!</span>
        </div>

        {/* Nút Lăn Xúc Xắc Chính */}
        <button
          type="button"
          onClick={handleRollDice}
          disabled={isRolling}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4edea3] to-[#4cd7f6] text-[#003824] font-extrabold text-[14px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:scale-95 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[22px]">casino</span>
          <span>{isRolling ? 'ĐANG TUNG XÚC XẮC...' : 'TUNG 2 XÚC XẮC SINH THÁI'}</span>
        </button>

        {/* 2 LỰA CHỌN HÀNH ĐỘNG THEO LUẬT */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          {/* Option 1: Hành động môi trường */}
          <button
            type="button"
            onClick={handleSoloAction}
            className={`flex flex-col items-start p-2.5 rounded-lg text-left shadow-sm active:scale-95 transition-all border ${
              soloActionDone
                ? 'bg-[#4edea3]/20 border-[#4edea3]'
                : 'bg-[#152125] border-[#3c4a42]/30 hover:border-[#4edea3]/40'
            }`}
          >
            <div className="flex items-center gap-1 text-[#4edea3] mb-1">
              <span className="material-symbols-outlined text-[17px]">eco</span>
              <span className="text-[10px] font-bold uppercase">Hành Động Môi Trường</span>
            </div>
            <span className="text-[12px] text-[#d8e5ea] font-bold leading-tight">Dọn Rác Biển</span>
            <span className="text-[11px] text-[#4edea3] font-bold mt-1">
              {soloActionDone ? '✓ Đã nhận +2 Điểm' : '+2 Điểm Xanh'}
            </span>
          </button>

          {/* Option 2: Hợp tác sinh thái */}
          <button
            type="button"
            onClick={handleCoopAction}
            className={`flex flex-col items-start p-2.5 rounded-lg text-left shadow-sm active:scale-95 transition-all border ${
              coopActionDone
                ? 'bg-[#4cd7f6]/20 border-[#4cd7f6]'
                : 'bg-[#152125] border-[#3c4a42]/30 hover:border-[#4cd7f6]/40'
            }`}
          >
            <div className="flex items-center gap-1 text-[#4cd7f6] mb-1">
              <span className="material-symbols-outlined text-[17px]">group_add</span>
              <span className="text-[10px] font-bold uppercase">Hợp Tác Cùng Minh</span>
            </div>
            <span className="text-[12px] text-[#d8e5ea] font-bold leading-tight">Cùng Thu Gom Nhựa</span>
            <span className="text-[11px] text-[#4cd7f6] font-bold mt-1">
              {coopActionDone ? '✓ Cả hai đã nhận +3' : 'Cả hai +3 Điểm Xanh'}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
