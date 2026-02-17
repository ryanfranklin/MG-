
import React, { useState, useMemo, useEffect } from 'react';
import { GameCategory, Game, AppState } from './types';
import { GAMES_DATA } from './games';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GameViewer from './components/GameViewer';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    selectedGameId: null,
    searchQuery: '',
    currentCategory: GameCategory.ALL,
    favorites: JSON.parse(localStorage.getItem('pixelplay_favs') || '[]')
  });

  useEffect(() => {
    localStorage.setItem('pixelplay_favs', JSON.stringify(state.favorites));
  }, [state.favorites]);

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(state.searchQuery.toLowerCase());
      const matchesCategory = state.currentCategory === GameCategory.ALL || game.category === state.currentCategory;
      return matchesSearch && matchesCategory;
    });
  }, [state.searchQuery, state.currentCategory]);

  const selectedGame = useMemo(() => {
    return GAMES_DATA.find(g => g.id === state.selectedGameId);
  }, [state.selectedGameId]);

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setState(prev => {
      const isFav = prev.favorites.includes(id);
      return {
        ...prev,
        favorites: isFav 
          ? prev.favorites.filter(favId => favId !== id) 
          : [...prev.favorites, id]
      };
    });
  };

  const handleCategoryClick = (category: GameCategory) => {
    setState(prev => ({ ...prev, currentCategory: category, selectedGameId: null }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = Object.values(GameCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onSearch={(query) => setState(prev => ({ ...prev, searchQuery: query, selectedGameId: null }))}
        onHomeClick={() => setState(prev => ({ ...prev, selectedGameId: null, currentCategory: GameCategory.ALL }))}
        searchQuery={state.searchQuery}
      />

      {state.selectedGameId && selectedGame ? (
        <GameViewer 
          game={selectedGame} 
          onBack={() => setState(prev => ({ ...prev, selectedGameId: null }))} 
        />
      ) : (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
          {/* Hero Section (Only when not searching/filtering heavily) */}
          {!state.searchQuery && state.currentCategory === GameCategory.ALL && (
            <section className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-8 sm:p-12 border border-indigo-500/20 shadow-2xl">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-indigo-500/30">
                  Featured Game
                </span>
                <h2 className="text-4xl sm:text-6xl font-logo font-bold text-white mb-6 leading-tight">
                  MOTO <span className="text-indigo-400">X3M</span>
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-lg">
                  Strap on your helmet, grab some air time and race over obstacles to beat the clock in amazing off road circuits.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setState(prev => ({ ...prev, selectedGameId: 'moto-x3m' }))}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-indigo-600/30 flex items-center"
                  >
                    <i className="fas fa-play mr-2"></i> Play Now
                  </button>
                  <button className="bg-slate-800/50 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-all backdrop-blur-md border border-slate-700">
                    Learn More
                  </button>
                </div>
              </div>
              
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]"></div>
              </div>
              <div className="absolute right-12 bottom-0 hidden lg:block">
                 <img src="https://picsum.photos/seed/moto_hero/600/400" className="rounded-tl-2xl border-l border-t border-indigo-500/30 shadow-2xl" alt="hero" />
              </div>
            </section>
          )}

          {/* Categories Horizontal Scroll */}
          <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-4 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-300 border ${
                  state.currentCategory === cat 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Heading */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <i className="fas fa-fire-alt text-orange-500 mr-2"></i>
              {state.searchQuery ? `Search results for "${state.searchQuery}"` : `${state.currentCategory} Games`}
            </h3>
            <span className="text-sm text-slate-500 font-medium">{filteredGames.length} games available</span>
          </div>

          {/* Game Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {filteredGames.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onClick={(id) => setState(prev => ({ ...prev, selectedGameId: id }))}
                  isFavorite={state.favorites.includes(game.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-slate-700">
                <i className="fas fa-search text-3xl text-slate-600"></i>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">No games found</h4>
              <p className="text-slate-400 max-w-xs">
                We couldn't find any games matching your current filters. Try a different search or category!
              </p>
              <button 
                onClick={() => setState(prev => ({ ...prev, searchQuery: '', currentCategory: GameCategory.ALL }))}
                className="mt-6 text-indigo-400 hover:text-indigo-300 font-bold underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Favorites Section (Optional display if has favorites) */}
          {state.favorites.length > 0 && !state.searchQuery && (
             <section className="mt-16 pt-12 border-t border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <i className="fas fa-heart text-pink-500 mr-2"></i>
                  Your Favorites
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {GAMES_DATA.filter(g => state.favorites.includes(g.id)).map(game => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onClick={(id) => setState(prev => ({ ...prev, selectedGameId: id }))}
                      isFavorite={true}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
             </section>
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-20 py-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <i className="fas fa-gamepad text-white"></i>
              </div>
              <h1 className="text-xl font-logo font-bold tracking-tighter text-white">
                PIXEL<span className="text-indigo-400">PLAY</span>
              </h1>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Your ultimate portal for unblocked HTML5 games. No downloads, no plugins, just pure web-based gaming fun. Optimized for speed and security.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Home Arcade</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Browse Categories</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">New Additions</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Popular Now</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                <i className="fab fa-discord"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                <i className="fab fa-github"></i>
              </a>
            </div>
            <p className="text-xs text-slate-600">
              © 2024 PixelPlay Arcade. All game assets belong to their respective creators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
