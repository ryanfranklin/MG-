
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (id: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      onClick={() => onClick(game.id)}
      className="group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer border border-slate-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20"
    >
      {/* Thumbnail */}
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {game.isHot && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Hot
          </div>
        )}
        <button 
          onClick={(e) => onToggleFavorite(game.id, e)}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-colors ${
            isFavorite ? 'bg-pink-600 text-white' : 'bg-slate-900/40 text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <i className={`${isFavorite ? 'fas' : 'far'} fa-heart text-xs`}></i>
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
            {game.title}
          </h3>
          <div className="flex items-center text-xs text-yellow-500">
            <i className="fas fa-star mr-1"></i>
            <span>{game.rating}</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-3 line-clamp-2">
          {game.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-slate-500 bg-slate-700/50 px-2 py-1 rounded">
            {game.category}
          </span>
          <button className="text-xs font-bold text-indigo-400 group-hover:text-indigo-300 flex items-center">
            Play Now <i className="fas fa-chevron-right ml-1 text-[8px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
