
export interface Game {
  id: string;
  title: string;
  category: GameCategory;
  thumbnail: string;
  iframeUrl: string;
  description: string;
  rating: number;
  isHot?: boolean;
}

export enum GameCategory {
  ALL = 'All',
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  SPORTS = 'Sports',
  ARCADE = 'Arcade',
  DRIVING = 'Driving',
  STRATEGY = 'Strategy'
}

export interface AppState {
  selectedGameId: string | null;
  searchQuery: string;
  currentCategory: GameCategory;
  favorites: string[];
}
