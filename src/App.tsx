/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { BoardScreen } from './components/BoardScreen';
import { InventoryScreen } from './components/InventoryScreen';
import { CraftingScreen } from './components/CraftingScreen';
import { CrisisScreen } from './components/CrisisScreen';
import { RulesScreen } from './components/RulesScreen';
import { ProfileModal } from './components/ProfileModal';
import { BoardMapModal } from './components/BoardMapModal';
import { TradeModal } from './components/TradeModal';
import { CardDetailModal } from './components/CardDetailModal';
import { Toast, ToastMessage } from './components/Toast';
import {
  INITIAL_PLAYERS,
  INITIAL_BOARD_TILES,
  INITIAL_CARDS,
  INITIAL_RECIPES,
} from './data/initialData';
import { TabType, Player, EcoCard } from './types/game';
import { sounds } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('board');
  const [score, setScore] = useState<number>(48);
  const [waterDrops, setWaterDrops] = useState<number>(120);
  const [currentRound, setCurrentRound] = useState<number>(3);
  const maxRounds = 10;
  const [earthHealth, setEarthHealth] = useState<number>(72);
  const [currentTileId, setCurrentTileId] = useState<number>(14);

  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [activePlayer, setActivePlayer] = useState<Player>(INITIAL_PLAYERS[0]);
  const [cards, setCards] = useState<EcoCard[]>(INITIAL_CARDS);
  const [tiles, setTiles] = useState(INITIAL_BOARD_TILES);
  const [recipes] = useState(INITIAL_RECIPES);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals state
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [boardMapModalOpen, setBoardMapModalOpen] = useState<boolean>(false);
  const [tradeModalOpen, setTradeModalOpen] = useState<boolean>(false);
  const [selectedCardForDetail, setSelectedCardForDetail] = useState<EcoCard | null>(null);

  const showToast = (title: string, points?: number, type: 'success' | 'alert' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, points, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playAction();
  };

  const handleAddScore = (points: number, reason: string) => {
    setScore((prev) => prev + points);
    setEarthHealth((prev) => Math.min(100, Math.max(0, prev + Math.round(points / 2))));
    setPlayers((prev) =>
      prev.map((p) => (p.id === activePlayer.id ? { ...p, score: p.score + points } : p))
    );
    showToast(reason, points, 'success');
  };

  const handleAdvanceTile = (steps: number) => {
    const newTileId = ((currentTileId + steps - 1) % 40) + 1;
    setCurrentTileId(newTileId);
    setPlayers((prev) =>
      prev.map((p) => (p.id === activePlayer.id ? { ...p, position: newTileId } : p))
    );

    // If passed tile 40, increment round
    if (currentTileId + steps > 40) {
      setCurrentRound((prev) => Math.min(maxRounds, prev + 1));
      showToast('Hoàn thành 1 vòng tuần hoàn Gaia! Bước sang vòng mới.', 5);
      setScore((s) => s + 5);
    }

    const landedTile = tiles.find((t) => t.id === newTileId);
    if (landedTile) {
      showToast(`Đã dừng chân tại Ô ${landedTile.id}: ${landedTile.name}`);
    }
  };

  const handleTradeSuccess = (cardName: string) => {
    showToast(`Đã nhận được ${cardName} từ Minh!`, 2);
    setScore((s) => s + 2);
    setWaterDrops((w) => Math.max(0, w - 10));
  };

  const handleResetGame = () => {
    sounds.playAction();
    setScore(48);
    setWaterDrops(120);
    setCurrentRound(1);
    setEarthHealth(72);
    setCurrentTileId(14);
    showToast('Bàn cờ sinh thái đã được thiết lập lại vòng khởi nguyên!');
  };

  return (
    <div className="min-h-screen bg-[#091519] text-[#d8e5ea] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#4edea3]/30 selection:text-[#4edea3] relative">
      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      {/* Top Header */}
      <Header
        currentTab={currentTab}
        score={score}
        waterDrops={waterDrops}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenProfile={() => setProfileModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full pt-20">
        {currentTab === 'board' && (
          <BoardScreen
            players={players}
            tiles={tiles}
            currentTileId={currentTileId}
            earthHealth={earthHealth}
            currentRound={currentRound}
            maxRounds={maxRounds}
            onAdvanceTile={handleAdvanceTile}
            onAddScore={handleAddScore}
            onOpenBoardMap={() => setBoardMapModalOpen(true)}
          />
        )}

        {currentTab === 'deck' && (
          <InventoryScreen
            cards={cards}
            onAddScore={handleAddScore}
            onSelectCardDetail={(card) => setSelectedCardForDetail(card)}
            onOpenTradeModal={() => setTradeModalOpen(true)}
          />
        )}

        {currentTab === 'craft' && (
          <CraftingScreen
            recipes={recipes}
            score={score}
            waterDrops={waterDrops}
            onAddScore={handleAddScore}
            onOpenTradeModal={() => setTradeModalOpen(true)}
          />
        )}

        {currentTab === 'crisis' && (
          <CrisisScreen
            score={score}
            onAddScore={handleAddScore}
            onResetGame={handleResetGame}
          />
        )}

        {currentTab === 'rules' && (
          <RulesScreen
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onResetGame={handleResetGame}
          />
        )}
      </main>

      {/* Bottom Tab Bar */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        crisisAlert={earthHealth < 80}
        cardsCount={cards.length}
      />

      {/* Modals */}
      <ProfileModal
        player={activePlayer}
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onSelectPlayer={(p) => setActivePlayer(p)}
        allPlayers={players}
      />

      <BoardMapModal
        isOpen={boardMapModalOpen}
        onClose={() => setBoardMapModalOpen(false)}
        tiles={tiles}
        players={players}
        currentTileId={currentTileId}
      />

      <TradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        onTradeSuccess={handleTradeSuccess}
      />

      <CardDetailModal
        card={selectedCardForDetail}
        isOpen={!!selectedCardForDetail}
        onClose={() => setSelectedCardForDetail(null)}
      />
    </div>
  );
}
