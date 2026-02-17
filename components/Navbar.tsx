
import React from 'react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onHomeClick: () => void;
  searchQuery: string;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onHomeClick, searchQuery }) => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={onHomeClick}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
            <i className="fas fa-gamepad text-xl text-white"></i>
          </div>
          <h1 className="text-2xl font-logo font-bold tracking-tighter text-white">
            PIXEL<span className="text-indigo-400">PLAY</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search for games..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        </div>

        {/* Action Links */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={onHomeClick} className="text-slate-300 hover:text-white transition-colors">
            Discover
          </button>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">
            New
          </a>
          <a href="#" className="text-slate-300 hover:text-white transition-colors">
            Trending
          </a>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg font-medium transition-all transform active:scale-95 shadow-lg shadow-indigo-600/20">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
