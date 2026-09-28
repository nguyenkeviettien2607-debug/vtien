export type TabType = 'board' | 'deck' | 'craft' | 'crisis' | 'rules';

export interface Player {
  id: string;
  name: string;
  role: string;
  score: number;
  color: string;
  badge: string;
  avatarUrl: string;
  position: number;
  cardsCount: number;
  waterDrops: number;
  perk: string;
  level: number;
  title: string;
  isReadyCrisis?: boolean;
}

export interface BoardTile {
  id: number;
  zone: 'forest' | 'ocean' | 'city' | 'crisis';
  zoneName: string;
  name: string;
  pollutionLevel: number;
  description: string;
  actionText: string;
  rewardPoints: number;
  icon: string;
  status: 'normal' | 'polluted' | 'restored' | 'disaster';
}

export type CardCategory = 'green' | 'pollution' | 'invention' | 'quest';

export interface EcoCard {
  id: string;
  title: string;
  category: CardCategory;
  points: number;
  badgeText?: string;
  description: string;
  detailedEffect?: string;
  rarity?: 'common' | 'rare' | 'epic';
  imageUrl?: string;
  icon?: string;
  status?: string;
  progress?: {
    current: number;
    max: number;
    label: string;
  };
  isActive?: boolean;
  threatLevel?: 'warning' | 'critical' | 'neutral';
  requirements?: string[];
}

export interface RecipeItem {
  id: string;
  name: string;
  icon: string;
  reward: string;
  points: number;
  materials: {
    name: string;
    owned: boolean;
    requiredCount: number;
    currentCount: number;
  }[];
  canCraft: boolean;
  crafted?: boolean;
}

export interface ActivityLog {
  id: string;
  author: string;
  avatarIcon: string;
  color: string;
  text: string;
  highlightText?: string;
  timeAgo: string;
  pointChange?: number;
}
