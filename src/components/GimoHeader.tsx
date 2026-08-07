import React from 'react';
import { Search, Plus, X, Gamepad2 } from 'lucide-react';

interface GimoHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  onOpenAddModal: () => void;
  totalCount: number;
}

export const GimoHeader: React.FC<GimoHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  onOpenAddModal,
  totalCount,
}) => {
  const platformTags = [
    { id: 'all', label: 'All Vault' },
    { id: 'steam', label: 'Steam' },
    { id: 'epic', label: 'Epic Games' },
    { id: 'ubisoft', label: 'Ubisoft' },
    { id: 'xbox', label: 'Xbox' },
    { id: 'rockstar', label: 'Rockstar' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0c0e12]/95 backdrop-blur-xl border-b border-zinc-800/80 px-3 sm:px-6 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Top Bar for Mobile / Flex Layout for Desktop */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 bg-zinc-900/90 border border-zinc-700/60 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg shadow-black/40 group hover:border-[#f0645d]/40 transition-colors">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tighter gimo-scanline-text">
              Gimo
            </span>
            <div className="gimo-stripe-container">
              <div className="gimo-stripe gimo-stripe-red h-5 sm:h-6 w-1.5 group-hover:scale-y-110 transition-transform"></div>
              <div className="gimo-stripe gimo-stripe-green h-5 sm:h-6 w-1.5 group-hover:scale-y-110 transition-transform delay-75"></div>
              <div className="gimo-stripe gimo-stripe-cyan h-5 sm:h-6 w-1.5 group-hover:scale-y-110 transition-transform delay-150"></div>
            </div>
          </div>

          {/* Add Credential Button on Mobile (visible top-right on small screens) */}
          <button
            onClick={onOpenAddModal}
            className="md:hidden flex items-center justify-center gap-1.5 bg-[#f0645d] hover:bg-[#e0534c] text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition-all active:scale-95 flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Add</span>
          </button>
        </div>

        {/* Search Bar - Full Width on Mobile */}
        <div className="w-full md:w-auto md:flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search game name, email, account ID..."
              className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#f0645d]/70 focus:ring-1 focus:ring-[#f0645d]/40 rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none font-mono transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5 rounded-full hover:bg-zinc-800 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action Button - Desktop View */}
        <button
          onClick={onOpenAddModal}
          className="hidden md:flex items-center justify-center gap-2 bg-[#f0645d] hover:bg-[#e0534c] text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-[#f0645d]/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Credential</span>
        </button>
      </div>

      {/* Platform Filter Pills - Horizontally Scrollable on Mobile */}
      <div className="max-w-7xl mx-auto flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none snap-x">
        <span className="text-[11px] sm:text-xs font-mono text-zinc-500 flex items-center gap-1 mr-1 flex-shrink-0">
          <Gamepad2 className="w-3.5 h-3.5" /> Platform:
        </span>
        {platformTags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => setSelectedTag(tag.id)}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap border flex-shrink-0 ${
              selectedTag === tag.id
                ? 'bg-[#f0645d] text-white border-[#f0645d] font-semibold shadow-md shadow-[#f0645d]/20'
                : 'bg-zinc-900/60 text-zinc-400 border-zinc-800/80 hover:bg-zinc-800/60 hover:text-zinc-200'
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </header>
  );
};
