import React, { useState } from 'react';
import { BoardTile, Player } from '../types/game';
import { sounds } from '../utils/audio';

interface BoardMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  tiles: BoardTile[];
  players: Player[];
  currentTileId: number;
}

export const BoardMapModal: React.FC<BoardMapModalProps> = ({
  isOpen,
  onClose,
  tiles,
  players,
  currentTileId,
}) => {
  const [selectedTile, setSelectedTile] = useState<BoardTile | null>(
    tiles.find((t) => t.id === currentTileId) || tiles[13]
  );
  const [selectedZone, setSelectedZone] = useState<'all' | 'forest' | 'ocean' | 'city' | 'crisis'>('all');

  if (!isOpen) return null;

  const filteredTiles = tiles.filter((t) => {
    if (selectedZone === 'all') return true;
    return t.zone === selectedZone;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-[#051014]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[90vh] rounded-2xl bg-[#111d21] border border-[#4edea3]/40 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#3c4a42]/40 flex items-center justify-between bg-[#152125]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[24px]">map</span>
            <div>
              <h2 className="text-[16px] font-bold text-[#d8e5ea]">Sa Bàn Sinh Thái Toàn Cảnh (40 Ô)</h2>
              <span className="text-[11px] text-[#bbcabf]">Theo dõi vị trí liên minh và chỉ số từng ô</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sounds.playAction();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#202c30] text-[#bbcabf] hover:text-[#d8e5ea] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Zone Filters */}
        <div className="px-4 py-2 bg-[#091519] flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-[#3c4a42]/30">
          {[
            { id: 'all', label: 'Tất Cả 40 Ô' },
            { id: 'forest', label: 'Ô 01-10: Rừng' },
            { id: 'ocean', label: 'Ô 11-20: Biển' },
            { id: 'city', label: 'Ô 21-30: Đô Thị' },
            { id: 'crisis', label: 'Ô 31-40: Khủng Hoảng' },
          ].map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setSelectedZone(zone.id as unknown as typeof selectedZone)}
              className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors border ${
                selectedZone === zone.id
                  ? 'bg-[#4edea3] text-[#003824] border-[#4edea3]'
                  : 'bg-[#152125] text-[#bbcabf] border-[#3c4a42]/30 hover:text-[#d8e5ea]'
              }`}
            >
              {zone.label}
            </button>
          ))}
        </div>

        {/* 40 Tiles Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {filteredTiles.map((tile) => {
              const isTrangHere = tile.id === currentTileId;
              const playersOnTile = players.filter((p) => p.position === tile.id);
              const isSelected = selectedTile?.id === tile.id;

              return (
                <div
                  key={tile.id}
                  onClick={() => {
                    sounds.playAction();
                    setSelectedTile(tile);
                  }}
                  className={`relative p-2 rounded-xl text-left cursor-pointer transition-all border flex flex-col justify-between min-h-[78px] ${
                    isTrangHere
                      ? 'bg-[#4edea3]/20 border-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.3)]'
                      : isSelected
                      ? 'bg-[#202c30] border-[#4cd7f6]'
                      : 'bg-[#152125] border-[#3c4a42]/30 hover:border-[#4edea3]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#4edea3]">#{tile.id}</span>
                    <span className="material-symbols-outlined text-[15px] text-[#bbcabf]">
                      {tile.icon}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-[#d8e5ea] leading-tight line-clamp-2 my-1">
                    {tile.name}
                  </span>

                  {/* Player tokens on tile */}
                  <div className="flex items-center gap-1">
                    {playersOnTile.map((p) => (
                      <span
                        key={p.id}
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-extrabold shadow-sm"
                        style={{ backgroundColor: p.color, color: '#091519' }}
                        title={`${p.name} đang ở ô này`}
                      >
                        {p.badge}
                      </span>
                    ))}
                    {tile.status === 'polluted' && (
                      <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
                    )}
                    {tile.status === 'disaster' && (
                      <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-ping"></span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Tile Inspector */}
          {selectedTile && (
            <div className="p-3.5 rounded-xl bg-[#152125] border border-[#4cd7f6]/40 shadow-lg mt-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-wide">
                      {selectedTile.zoneName} • Ô Số {selectedTile.id}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#202c30] text-[#ffb95f]">
                      +{selectedTile.rewardPoints} Điểm
                    </span>
                  </div>
                  <h3 className="text-[15px] font-bold text-[#d8e5ea] mt-0.5">{selectedTile.name}</h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    selectedTile.status === 'disaster'
                      ? 'bg-[#93000a] text-[#ffdad6]'
                      : selectedTile.status === 'polluted'
                      ? 'bg-[#93000a]/50 text-[#ffb4ab]'
                      : 'bg-[#4edea3]/20 text-[#4edea3]'
                  }`}
                >
                  {selectedTile.status === 'disaster'
                    ? 'Nguy Cơ Thảm Hoạ'
                    : selectedTile.status === 'polluted'
                    ? `Ô Nhiễm Cấp ${selectedTile.pollutionLevel}`
                    : 'Hệ Sinh Thái Xanh'}
                </span>
              </div>
              <p className="text-[11px] text-[#bbcabf] mt-1.5 leading-relaxed">
                {selectedTile.description}
              </p>
              <div className="mt-2 pt-2 border-t border-[#3c4a42]/30 flex items-center justify-between text-[11px]">
                <span className="text-[#4edea3] font-bold">Hành Động Khả Dụng:</span>
                <span className="text-[#d8e5ea] font-semibold">{selectedTile.actionText}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
