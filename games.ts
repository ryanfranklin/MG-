
import { Game, GameCategory } from './types';

export const GAMES_DATA: Game[] = [
  {
    id: '2048',
    title: '2048',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://picsum.photos/seed/2048/400/300',
    iframeUrl: 'https://play2048.co/',
    description: 'Join the numbers and get to the 2048 tile!',
    rating: 4.8,
    isHot: true
  },
  {
    id: 'hextris',
    title: 'Hextris',
    category: GameCategory.ARCADE,
    thumbnail: 'https://picsum.photos/seed/hextris/400/300',
    iframeUrl: 'https://hextris.io/',
    description: 'Fast-paced puzzle game inspired by Tetris.',
    rating: 4.5
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird Clone',
    category: GameCategory.ARCADE,
    thumbnail: 'https://picsum.photos/seed/flappy/400/300',
    iframeUrl: 'https://flappybird.io/',
    description: 'The classic frustrating bird game. Don\'t hit the pipes!',
    rating: 4.2,
    isHot: true
  },
  {
    id: 'tower-master',
    title: 'Tower Master',
    category: GameCategory.STRATEGY,
    thumbnail: 'https://picsum.photos/seed/tower/400/300',
    iframeUrl: 'https://www.google.com/logos/2010/pacman10-i.html', // Using Pacman as a placeholder for embedded demo
    description: 'Build the tallest tower in the world!',
    rating: 4.6
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    category: GameCategory.DRIVING,
    thumbnail: 'https://picsum.photos/seed/moto/400/300',
    iframeUrl: 'https://moto-x3m.io/',
    description: 'Ultimate bike racing game with challenging levels.',
    rating: 4.9,
    isHot: true
  },
  {
    id: 'solitaire',
    title: 'Classic Solitaire',
    category: GameCategory.PUZZLE,
    thumbnail: 'https://picsum.photos/seed/solitaire/400/300',
    iframeUrl: 'https://worldofsolitaire.com/',
    description: 'The timeless card game for one.',
    rating: 4.4
  },
  {
    id: 'paper-io',
    title: 'Paper.io 2',
    category: GameCategory.ACTION,
    thumbnail: 'https://picsum.photos/seed/paperio/400/300',
    iframeUrl: 'https://paper-io.com/',
    description: 'Capture territory and defeat opponents.',
    rating: 4.7
  },
  {
    id: 'duck-life',
    title: 'Duck Life',
    category: GameCategory.SPORTS,
    thumbnail: 'https://picsum.photos/seed/duck/400/300',
    iframeUrl: 'https://www.miniplay.com/embed/duck-life-4',
    description: 'Train your duck and win the races!',
    rating: 4.6
  }
];
