import React, { useState, useEffect } from 'react';
import { CoverflowCarousel, CoverflowSlide } from '../components/ui/coverflow-carousel';
import { GimoHeader } from './components/GimoHeader';
import { CredentialCard } from './components/CredentialCard';
import { AddCredentialModal } from './components/AddCredentialModal';
import { GameDetailsModal } from './components/GameDetailsModal';
import { GimoPreloader } from './components/GimoPreloader';
import { defaultCredentials, CredentialItem } from './data/initialCredentials';
import { SearchX, CheckCircle2 } from 'lucide-react';

const STORAGE_KEY = 'gimo_credentials_vault_v11';

export default function App() {
  const [credentials, setCredentials] = useState<CredentialItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CredentialItem | null>(null);
  const [detailsItem, setDetailsItem] = useState<CredentialItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCredentials(JSON.parse(stored));
      } else {
        setCredentials(defaultCredentials);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCredentials));
      }
    } catch (e) {
      console.error('Failed to read from LocalStorage', e);
      setCredentials(defaultCredentials);
    }
  }, []);

  // Save to LocalStorage helper
  const saveCredentials = (updated: CredentialItem[]) => {
    setCredentials(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to LocalStorage', e);
    }
  };

  // Toast trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // 1-Click Copy handler
  const handleCopyText = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      triggerToast(`✓ Copied ${label} to clipboard!`);
    }).catch(() => {
      triggerToast(`❌ Failed to copy`);
    });
  };

  // Toggle Favorite
  const handleToggleFavorite = (gameName: string) => {
    const updated = credentials.map((c) => {
      if (c.game === gameName) {
        const nextState = !c.isFavorite;
        triggerToast(nextState ? `Added ${c.game} to Favourites` : `Removed ${c.game} from Favourites`);
        return { ...c, isFavorite: nextState };
      }
      return c;
    });
    saveCredentials(updated);
  };

  // Save or Update credential
  const handleSaveCredential = (item: CredentialItem) => {
    if (editingItem) {
      const updated = credentials.map((c) =>
        c.game === editingItem.game ? item : c
      );
      saveCredentials(updated);
      triggerToast(`Updated ${item.game}`);
    } else {
      saveCredentials([{ ...item, isFavorite: true }, ...credentials]);
      triggerToast(`Added ${item.game} to collection`);
    }
    setEditingItem(null);
  };

  // Delete credential without alert popup
  const handleDeleteCredential = (gameName: string) => {
    const updated = credentials.filter((c) => c.game !== gameName);
    saveCredentials(updated);
    triggerToast(`Deleted ${gameName}`);
  };

  // Filter credentials
  const filteredCredentials = credentials.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesTag =
      selectedTag === 'all' ||
      (item.tags && item.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase()));

    const matchesQuery =
      !query ||
      item.game.toLowerCase().includes(query) ||
      (item.account && item.account.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.extra && item.extra.toLowerCase().includes(query));

    return matchesTag && matchesQuery;
  });

  // Prepare Coverflow slides from favourite games
  const favoriteGames = credentials.filter((c) => c.isFavorite);
  const featuredGamesList = favoriteGames.length > 0 ? favoriteGames : credentials.slice(0, 8);

  const carouselSlides: CoverflowSlide[] = featuredGamesList.map((c) => ({
    src: c.bannerUrl || "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg",
    alt: c.game,
    title: c.game,
    account: c.account,
    email: c.email,
    password: c.password,
    emailPass: c.emailPass,
    extra: c.extra,
    tags: c.tags,
    subtitle: c.account ? `ID: ${c.account}` : (c.tags?.[0]?.toUpperCase() || 'GAME'),
    onOpenDetails: () => setDetailsItem(c),
  }));

  return (
    <div className="min-h-screen bg-[#0c0e12] text-zinc-100 flex flex-col font-sans pb-12">
      
      {/* App Preloader */}
      {isLoading && (
        <GimoPreloader onComplete={() => setIsLoading(false)} />
      )}

      {/* Header */}
      <GimoHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        onOpenAddModal={() => {
          setEditingItem(null);
          setIsModalOpen(true);
        }}
        totalCount={credentials.length}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 mt-6 space-y-10 flex-1">
        
        {/* Favourites Section Container */}
        {carouselSlides.length > 0 && searchQuery === '' && selectedTag === 'all' && (
          <section className="relative bg-zinc-900/30 border border-zinc-800/80 rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-md overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                {/* Sargam SVG Icon beside Favourites header */}
                <svg className="w-5 h-5 text-[#f0645d]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.6 4H3.4A2.4 2.4 0 0 0 1 6.4v11.2A2.4 2.4 0 0 0 3.4 20h17.2a2.4 2.4 0 0 0 2.4-2.4V6.4A2.4 2.4 0 0 0 20.6 4Z" fill="currentColor" fillOpacity=".16" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"/>
                  <path d="M6 9h8M6 12h8" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
                </svg>
                <h2 className="text-base font-bold font-mono tracking-wide text-white uppercase">
                  Favourites
                </h2>
              </div>
              
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
                Swipe or use ← → keys to explore • Tap card for details
              </span>
            </div>

            <CoverflowCarousel
              slides={carouselSlides}
              showCaption
              showPagination
              showNavigation
              cardWidth="clamp(240px, 30vw, 380px)"
            />
          </section>
        )}

        {/* Your Collection Grid Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              {/* Custom SVG Icon beside Your Collection */}
              <svg className="w-5 h-5 text-[#f0645d]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10H2V2h8zM3 9h6V3H3zm18 1h-8V2h8zm-7-1h6V3h-6zm3 13.657L11.343 17 17 11.343 22.657 17zM12.757 17L17 21.243 21.243 17 17 12.757zM10 21H2v-8h8zm-7-1h6v-6H3z"/>
                <path fill="none" d="M0 0h24v24H0z"/>
              </svg>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Your Collection ({filteredCredentials.length})
              </h2>
            </div>
            
            {(searchQuery || selectedTag !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('all');
                }}
                className="text-xs font-mono text-[#f0645d] hover:underline flex items-center gap-1"
              >
                Reset filters
              </button>
            )}
          </div>

          {filteredCredentials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCredentials.map((item) => (
                <CredentialCard
                  key={item.game}
                  item={item}
                  onEdit={(c) => {
                    setEditingItem(c);
                    setIsModalOpen(true);
                  }}
                  onDelete={handleDeleteCredential}
                  onCopyText={handleCopyText}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-12 text-center max-w-lg mx-auto my-8 space-y-4">
              <div className="w-14 h-14 bg-zinc-800/80 border border-zinc-700 rounded-2xl flex items-center justify-center mx-auto text-zinc-400">
                <SearchX className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">No games found in Your Collection</h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Try adjusting your search query or platform filter pills
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('all');
                }}
                className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-semibold px-4 py-2 rounded-xl transition border border-zinc-700"
              >
                Clear Search Filter
              </button>
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-zinc-800/80 py-8 text-center text-xs font-mono text-zinc-500 tracking-wider">
        <p className="text-zinc-400 font-semibold mb-1">
          Made by{' '}
          <a
            href="https://github.com/sahilaw22"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f0645d] hover:underline hover:text-[#e0534c] transition-colors"
          >
            @sahilaw22
          </a>
          , for gamers
        </p>
        <p className="text-[11px] text-zinc-600">Your logins. Your vault. Zero hassle.</p>
      </footer>

      {/* Add/Edit Modal */}
      <AddCredentialModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveCredential}
        editingItem={editingItem}
      />

      {/* Game Details Pop-up Modal */}
      <GameDetailsModal
        isOpen={!!detailsItem}
        onClose={() => setDetailsItem(null)}
        item={detailsItem}
        onCopyText={handleCopyText}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-700 text-white text-xs font-mono px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 toast-animate">
          <CheckCircle2 className="w-4 h-4 text-[#f0645d]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
