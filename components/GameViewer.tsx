
import React, { useState } from 'react';
import { Game } from '../types';

interface GameViewerProps {
  game: Game;
  onBack: () => void;
}

const GameViewer: React.FC<GameViewerProps> = ({ game, onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-frame');
    if (!iframe) return;

    if (!isFullscreen) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-4 sm:p-8 animate-in fade-in duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-slate-400 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Arcade
          </button>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleFullscreen}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition-colors"
              title="Fullscreen"
            >
              <i className="fas fa-expand"></i>
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/20">
              Share Game
            </button>
          </div>
        </div>

        {/* Main View Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Game Frame Container */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative aspect-video">
              <iframe
                id="game-frame"
                src={game.iframeUrl}
                title={game.title}
                className="w-full h-full border-0"
                allowFullScreen
                allow="autoplay; encrypted-media; fullscreen"
              ></iframe>
            </div>
            
            {/* Info Section Below Game */}
            <div className="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-white">{game.title}</h2>
                <div className="flex items-center bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700">
                  <i className="fas fa-star text-yellow-500 mr-2"></i>
                  <span className="font-bold">{game.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {game.category}
                </span>
                <span className="px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Verified Safe
                </span>
                <span className="px-3 py-1 bg-orange-600/20 text-orange-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                  HTML5
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {game.description}
              </p>
              
              <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row gap-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Controls</h4>
                  <div className="flex space-x-2">
                    <span className="bg-slate-700 text-white px-2 py-1 rounded text-xs">WASD</span>
                    <span className="bg-slate-700 text-white px-2 py-1 rounded text-xs">SPACE</span>
                    <span className="bg-slate-700 text-white px-2 py-1 rounded text-xs">MOUSE</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-slate-400">#adventure</span>
                    <span className="text-xs text-slate-400">#unblocked</span>
                    <span className="text-xs text-slate-400">#browser</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700">
              <h3 className="font-bold text-lg text-white mb-4">How to Play</h3>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center shrink-0 mr-3 text-xs font-bold">1</div>
                  <p>Wait for the game to load in the viewer.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center shrink-0 mr-3 text-xs font-bold">2</div>
                  <p>Click anywhere inside the game to focus.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center shrink-0 mr-3 text-xs font-bold">3</div>
                  <p>Use keyboard or mouse as per controls guide.</p>
                </li>
              </ul>
            </div>

            <div className="bg-indigo-900/40 rounded-2xl p-6 border border-indigo-500/30 overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 text-indigo-500/20 text-6xl rotate-12">
                <i className="fas fa-rocket"></i>
              </div>
              <h3 className="font-bold text-white mb-2">Pro Tip</h3>
              <p className="text-sm text-indigo-200">
                Use the fullscreen mode for the best gaming experience without distractions!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameViewer;
