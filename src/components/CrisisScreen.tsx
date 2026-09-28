import React, { useState, useEffect } from 'react';
import { ASSETS, INITIAL_LOGS } from '../data/initialData';
import { ActivityLog } from '../types/game';
import { sounds } from '../utils/audio';

interface CrisisScreenProps {
  score: number;
  onAddScore: (points: number, reason: string) => void;
  onResetGame: () => void;
}

export const CrisisScreen: React.FC<CrisisScreenProps> = ({
  score,
  onAddScore,
  onResetGame,
}) => {
  const [timeLeft, setTimeLeft] = useState(45);
  const [pollutionIndex, setPollutionIndex] = useState(4);
  const [tuanAgreed, setTuanAgreed] = useState(false);
  const [allianceActivated, setAllianceActivated] = useState(false);
  const [soloChosen, setSoloChosen] = useState(false);
  const [logs, setLogs] = useState<ActivityLog[]>(INITIAL_LOGS);

  // Live countdown timer
  useEffect(() => {
    if (allianceActivated) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [allianceActivated]);

  const handleActivateAlliance = () => {
    if (allianceActivated) return;
    sounds.playSuccess();
    setAllianceActivated(true);
    setTuanAgreed(true);
    setPollutionIndex((prev) => Math.max(0, prev - 2));
    onAddScore(10, 'Đạt Thoả Hiệp Hội Nghị Khí Hậu Toàn Cầu');

    // Add activity log
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      author: 'Liên Minh Toàn Bàn',
      avatarIcon: 'handshake',
      color: '#4edea3',
      text: 'đã đồng thuận 100% kích hoạt Nghị Định Thư Gaia, giảm ô nhiễm và giải cứu đại dương!',
      highlightText: '+10 Toàn Cầu',
      timeAgo: 'Vừa xong',
      pointChange: 10,
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleSelfDefend = () => {
    setSoloChosen(true);
    sounds.playAlert();
    onAddScore(1, 'Dự trữ tài nguyên cá nhân');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3.5 space-y-4 pb-28 pt-2">
      {/* 1. CRITICAL GLOBAL CLIMATE ALERT BANNER */}
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#93000a] via-[#2b373b] to-[#202c30] p-3.5 shadow-xl border border-[#ffb4ab]/40">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#ffb4ab]/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-start gap-3 relative z-10">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#ffb4ab] text-[#690005] shrink-0 animate-pulse shadow-md">
            <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-[#ffb4ab] text-[#690005] text-[10px] font-bold uppercase tracking-wider">
                Giai Đoạn 3 &amp; 4
              </span>
              <span className="text-[#ffb4ab] text-[12px] font-bold flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-[#ffb4ab] animate-ping"></span>
                NGUY CẤP
              </span>
            </div>
            <h2 className="text-[17px] text-[#d8e5ea] font-extrabold mt-1 tracking-tight leading-snug">
              BÃO NHỰA ĐẠI DƯƠNG &amp; KHÍ THẢI TOÀN CẦU TĂNG
            </h2>
          </div>
        </div>

        {/* Pollution Index & Countdown Grid */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-1 border-t border-[#ffb4ab]/20">
          <div className="bg-[#051014]/80 backdrop-blur-md rounded-lg p-2.5 flex flex-col justify-between border border-[#3c4a42]/30">
            <div className="flex items-center justify-between text-[#bbcabf] text-[10px]">
              <span>Chỉ Số Ô Nhiễm</span>
              <span className="text-[#ffb4ab] font-bold">+{pollutionIndex} / +10</span>
            </div>
            <div className="w-full bg-[#202c30] h-2.5 rounded-full mt-2 overflow-hidden flex border border-[#3c4a42]/20">
              <div
                className="bg-gradient-to-r from-[#e29100] to-[#ffb4ab] h-full rounded-full transition-all duration-500"
                style={{ width: `${(pollutionIndex / 10) * 100}%` }}
              ></div>
            </div>
            <p className="text-[9px] text-[#ffb4ab]/90 mt-1 font-medium leading-tight">
              Nếu đạt +10: Hành tinh sụp đổ!
            </p>
          </div>

          <div className="bg-[#051014]/80 backdrop-blur-md rounded-lg p-2.5 flex flex-col justify-between border border-[#3c4a42]/30">
            <div className="flex items-center justify-between text-[#bbcabf] text-[10px]">
              <span>Thỏa Hiệp Hội Nghị</span>
              <span className="text-[#4cd7f6] font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[13px]">timer</span>
                <span>{timeLeft}s</span>
              </span>
            </div>
            <div className="w-full bg-[#202c30] h-2.5 rounded-full mt-2 overflow-hidden border border-[#3c4a42]/20">
              <div
                className="bg-[#4cd7f6] h-full rounded-full transition-all duration-1000"
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              ></div>
            </div>
            <p className="text-[9px] text-[#4cd7f6] font-medium leading-tight">
              Thời gian để liên minh ứng phó
            </p>
          </div>
        </div>
      </section>

      {/* 2. GLOBAL CHALLENGE CARD (SỰ KIỆN KHỦNG HOẢNG) */}
      <section className="relative bg-[#111d21] rounded-xl p-3.5 shadow-lg border border-[#3c4a42]/40 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[22px]">public</span>
            <h3 className="text-[16px] text-[#d8e5ea] font-bold">Thách Thức Toàn Cầu</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#202c30] text-[#ffb95f] text-[10px] font-bold flex items-center gap-1 border border-[#ffb95f]/30">
            <span className="material-symbols-outlined text-[14px]">waves</span>
            Hải Dương Kịch Phát
          </span>
        </div>

        {/* Visual Card Backdrop */}
        <div className="relative mt-2.5 rounded-lg overflow-hidden bg-[#2b373b] shadow-md border border-[#3c4a42]/40">
          <div
            className="bg-cover bg-center w-full h-40"
            style={{ backgroundImage: `url('${ASSETS.crisisOceanVisual}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#051014] via-[#051014]/65 to-transparent"></div>
          <div className="absolute bottom-2.5 left-3 right-3 flex flex-col">
            <span className="text-[17px] text-[#d8e5ea] font-extrabold leading-tight">
              Thảm Họa Bão Rác Biển Đông
            </span>
            <p className="text-[11px] text-[#ffb4ab] font-medium mt-0.5">
              Tác động: Mọi người chơi mất -2 Điểm Xanh nếu không có Dự Án Tái Chế!
            </p>
          </div>
        </div>

        {/* Summit Readiness Roster */}
        <div className="mt-3 bg-[#152125] rounded-lg p-3 border border-[#3c4a42]/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-[#bbcabf] font-bold uppercase tracking-wider">
              Trạng Thái Liên Minh ({tuanAgreed ? '3/3' : '2/3'} Sẵn Sàng)
            </span>
            <span className="text-[10px] text-[#4edea3] font-bold">
              {tuanAgreed ? 'Đã đạt 100% đồng thuận!' : 'Cần thêm 1 phiếu'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {/* Player 1: Minh */}
            <div className="bg-[#202c30] rounded-lg p-2 flex flex-col items-center text-center border border-[#4edea3]/30">
              <div className="relative w-8 h-8 rounded-full bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3] mb-1">
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#4edea3] text-[#003824] rounded-full flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
              </div>
              <span className="text-[12px] text-[#d8e5ea] font-semibold truncate w-full">Minh</span>
              <span className="text-[10px] text-[#4edea3] font-bold">Đã ký kết</span>
            </div>

            {/* Player 2: Trang (Current) */}
            <div className="bg-[#202c30] rounded-lg p-2 flex flex-col items-center text-center border border-[#4edea3]/30">
              <div className="relative w-8 h-8 rounded-full bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3] mb-1">
                <span className="material-symbols-outlined text-[18px]">eco</span>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#4edea3] text-[#003824] rounded-full flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
              </div>
              <span className="text-[12px] text-[#d8e5ea] font-semibold truncate w-full">Trang (Bạn)</span>
              <span className="text-[10px] text-[#4edea3] font-bold">Đã ký kết</span>
            </div>

            {/* Player 3: Tuấn (Pending / Agreed) */}
            <div className="bg-[#202c30] rounded-lg p-2 flex flex-col items-center text-center border border-[#3c4a42]/30">
              <div
                className={`relative w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  tuanAgreed
                    ? 'bg-[#4edea3]/20 text-[#4edea3]'
                    : 'bg-[#2b373b] text-[#bbcabf] animate-pulse'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {tuanAgreed ? 'person' : 'hourglass_empty'}
                </span>
                {tuanAgreed && (
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#4edea3] text-[#003824] rounded-full flex items-center justify-center text-[9px] font-bold">
                    ✓
                  </span>
                )}
              </div>
              <span className="text-[12px] text-[#d8e5ea] font-semibold truncate w-full">Tuấn</span>
              <span
                className={`text-[10px] font-bold ${
                  tuanAgreed ? 'text-[#4edea3]' : 'text-[#ffb95f]'
                }`}
              >
                {tuanAgreed ? 'Đã ký kết ✓' : 'Đang cân nhắc...'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Decision Triggers */}
        <div className="mt-3 space-y-2">
          {/* Option A: Co-op Alliance */}
          <button
            type="button"
            onClick={handleActivateAlliance}
            disabled={allianceActivated}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-between shadow-lg transition-transform active:scale-[0.98] ${
              allianceActivated
                ? 'bg-[#4edea3] text-[#003824] cursor-default'
                : 'bg-gradient-to-r from-[#10b981] to-[#03b5d3] text-[#003824] cursor-pointer hover:opacity-95'
            }`}
          >
            <div className="flex items-center gap-2.5 text-left">
              <span className="material-symbols-outlined text-[24px]">
                {allianceActivated ? 'task_alt' : 'handshake'}
              </span>
              <div>
                <div className="font-extrabold text-[13px] tracking-tight">
                  {allianceActivated ? 'ĐÃ KÍCH HOẠT ĐỒNG THUẬN' : 'LIÊN MINH HỢP TÁC'}
                </div>
                <div className="text-[10px] opacity-90 font-normal">
                  {allianceActivated
                    ? 'Hành tinh nhận +10 Điểm Xanh'
                    : 'Đóng góp 1 Thẻ Nhặt Rác / Thẻ Xanh'}
                </div>
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-[#051014]/30 font-bold text-[11px]">
              {allianceActivated ? 'Thành Công!' : '+10 Toàn Cầu'}
            </span>
          </button>

          {/* Option B: Defend Solo */}
          <button
            type="button"
            onClick={handleSelfDefend}
            className={`w-full py-2.5 px-4 rounded-lg flex items-center justify-between transition-colors border ${
              soloChosen
                ? 'bg-[#2b373b] border-[#ffb4ab]/40 text-[#ffb4ab]'
                : 'bg-[#202c30] border-[#3c4a42]/30 hover:bg-[#2b373b] text-[#d8e5ea]'
            }`}
          >
            <div className="flex items-center gap-2.5 text-left">
              <span className="material-symbols-outlined text-[20px] text-[#bbcabf]">shield</span>
              <div>
                <div className="font-semibold text-[13px] text-[#d8e5ea]">TỰ BẢO VỆ</div>
                <div className="text-[10px] text-[#bbcabf]">Giữ thẻ tài nguyên cho mục tiêu cá nhân</div>
              </div>
            </div>
            <span className="text-[#ffb4ab] text-[10px] font-medium">Nguy cơ sụp đổ</span>
          </button>
        </div>
      </section>

      {/* 3. CO-OP ACTIVITY FEED (NHẬT KÝ HỢP TÁC XANH) */}
      <section className="bg-[#111d21] rounded-xl p-3.5 shadow-md border border-[#3c4a42]/30">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#4edea3] text-[20px]">rss_feed</span>
            <h3 className="text-[15px] text-[#d8e5ea] font-bold">Nhật Ký Hợp Tác Xanh</h3>
          </div>
          <span className="text-[10px] text-[#bbcabf]">Thời gian thực</span>
        </div>

        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#152125] border border-[#3c4a42]/20"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: `${log.color}25`, color: log.color }}
              >
                <span className="material-symbols-outlined text-[17px]">{log.avatarIcon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-[#d8e5ea] leading-snug">
                  <span className="font-bold" style={{ color: log.color }}>
                    {log.author}
                  </span>{' '}
                  {log.text}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {log.highlightText && (
                    <span className="px-1.5 py-0.2 rounded bg-[#4edea3]/20 text-[#4edea3] text-[9px] font-bold">
                      {log.highlightText}
                    </span>
                  )}
                  <span className="text-[9px] text-[#bbcabf]">{log.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VICTORY RECAP & EDUCATIONAL SYNTHESIS (KỶ NGUYÊN XANH MỚI) */}
      <section className="bg-[#202c30] rounded-xl p-3.5 shadow-xl overflow-hidden relative border border-[#4edea3]/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb95f] text-[22px]">workspace_premium</span>
            <h3 className="text-[16px] text-[#d8e5ea] font-bold">Kỷ Nguyên Xanh Mới</h3>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#4edea3]/20 text-[#4edea3] text-[10px] font-bold border border-[#4edea3]/30">
            Giai Đoạn 4
          </span>
        </div>

        {/* Collective Victory Celebration Banner */}
        <div className="mt-2.5 p-3 rounded-lg bg-gradient-to-br from-[#10b981]/25 via-[#03b5d3]/10 to-transparent flex items-center gap-3 border border-[#4edea3]/30">
          <div className="w-11 h-11 rounded-full bg-[#4edea3] flex items-center justify-center text-[#003824] shrink-0 shadow-md">
            <span className="material-symbols-outlined text-[26px]">verified</span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-[#4edea3] font-bold uppercase tracking-wider">
              Chiến Thắng Tập Thể
            </span>
            <h4 className="text-[14px] text-[#d8e5ea] font-extrabold leading-tight">
              HÀNH TINH ĐÃ ĐƯỢC CỨU THÀNH CÔNG 🎉
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-[#051014] h-2 rounded-full overflow-hidden border border-[#3c4a42]/30">
                <div className="bg-[#4edea3] h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
              <span className="text-[10px] text-[#4edea3] font-bold shrink-0">145 / 100 Điểm</span>
            </div>
          </div>
        </div>

        {/* Individual Score Breakdown Tile */}
        <div className="grid grid-cols-2 gap-2 mt-2.5">
          <div className="bg-[#152125] p-2.5 rounded-lg border border-[#3c4a42]/20">
            <div className="flex items-center gap-1 text-[#bbcabf] text-[10px]">
              <span className="material-symbols-outlined text-[15px] text-[#ffb95f]">star</span>
              <span>Thành Tựu Của Bạn</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[22px] text-[#4edea3] font-extrabold">{score}</span>
              <span className="text-[10px] text-[#bbcabf]">/ 30 Điểm Xanh</span>
            </div>
            <span className="inline-block mt-1 text-[9px] text-[#ffb95f] font-bold bg-[#ffb95f]/10 px-1.5 py-0.5 rounded border border-[#ffb95f]/20">
              Nhà Tiên Phong Xanh
            </span>
          </div>

          <div className="bg-[#152125] p-2.5 rounded-lg flex flex-col justify-between border border-[#3c4a42]/20">
            <div className="flex items-center gap-1 text-[#bbcabf] text-[10px]">
              <span className="material-symbols-outlined text-[15px] text-[#4cd7f6]">groups</span>
              <span>Bàn Chơi Hội Đồng</span>
            </div>
            <p className="text-[10px] text-[#d8e5ea] leading-tight mt-1">
              3/3 Người chơi đạt ngưỡng sinh tồn cá nhân an toàn.
            </p>
            <span className="text-[10px] text-[#4cd7f6] font-bold mt-1">
              Đồng Thuận 100%
            </span>
          </div>
        </div>

        {/* Educational Contrast Insight */}
        <div className="mt-3 p-3 rounded-lg bg-[#051014] flex items-start gap-2.5 border border-[#3c4a42]/30">
          <span className="material-symbols-outlined text-[#4edea3] text-[20px] shrink-0 mt-0.5">
            psychology_alt
          </span>
          <div className="min-w-0 flex-1">
            <h5 className="text-[11px] text-[#4edea3] font-bold uppercase tracking-wider">
              Thông Điệp Sinh Thái
            </h5>
            <p className="text-[11px] text-[#bbcabf] mt-0.5 italic leading-relaxed">
              “Không ai có thể cứu Trái Đất một mình. Cùng nhau, chúng ta làm hành tinh hồi sinh.”
            </p>
          </div>
        </div>

        {/* Bottom Summit Navigation Footer Action */}
        <button
          type="button"
          onClick={() => {
            sounds.playSuccess();
            onResetGame();
          }}
          className="w-full mt-3 bg-[#4cd7f6] hover:bg-[#4cd7f6]/90 text-[#003824] font-bold text-[13px] py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">restart_alt</span>
          <span>Bắt Đầu Vòng Tuần Hoàn Mới</span>
        </button>
      </section>
    </div>
  );
};
