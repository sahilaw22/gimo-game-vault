import React, { useState } from 'react';
import { Copy, Check, Eye, EyeOff, Key, Mail, User, Info, ShieldAlert, Heart, ExternalLink } from 'lucide-react';
import { CredentialItem } from '../data/initialCredentials';

interface GameDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CredentialItem | null;
  onCopyText: (text: string, label: string) => void;
  onToggleFavorite?: (gameName: string) => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({
  isOpen,
  onClose,
  item,
  onCopyText,
  onToggleFavorite,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailPassword, setShowEmailPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen || !item) return null;

  const handleCopy = (text: string, fieldName: string) => {
    onCopyText(text, fieldName);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const getPlatformLoginUrl = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'steam': return 'https://store.steampowered.com/login/';
      case 'epic': return 'https://www.epicgames.com/id/login';
      case 'ubisoft': return 'https://connect.ubisoft.com/';
      case 'xbox': return 'https://login.live.com/';
      case 'rockstar': return 'https://socialclub.rockstargames.com/';
      case 'mobile': return 'https://play.google.com/store';
      default: return 'https://store.steampowered.com/login/';
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#14171F] border border-zinc-700/80 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden relative group"
      >
        {/* High Quality Game Banner Image - Clean Banner */}
        <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-zinc-900 shadow-lg">
          <img
            src={item.bannerUrl || "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg"}
            alt={item.game}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14171F] via-[#14171F]/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                {item.game}
              </h2>
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag) => (
                    <a
                      key={tag}
                      href={getPlatformLoginUrl(tag)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-zinc-900/90 text-zinc-200 hover:text-[#f0645d] border border-zinc-700/80 px-2.5 py-1 rounded-lg backdrop-blur-md transition"
                    >
                      <span>Open {tag.toUpperCase()} Login</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Heart Favorite Toggle */}
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(item.game)}
                className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                title={item.isFavorite ? "Remove from Favourites" : "Add to Favourites"}
              >
                <Heart className={`w-5 h-5 transition-all ${item.isFavorite ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Credentials Details Body */}
        <div className="p-6 space-y-3 font-mono">
          
          {/* Account/ID */}
          {item.account && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <User className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Account ID</div>
                  <div className="text-sm text-zinc-100 font-bold truncate">{item.account}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(item.account, 'account')}
                className="flex items-center gap-1 text-xs bg-zinc-800 hover:bg-[#f0645d] text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-700/60 transition"
              >
                {copiedField === 'account' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'account' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}

          {/* Password */}
          {item.password && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Key className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Password</div>
                  <div className="text-sm text-zinc-100 font-bold truncate">
                    {showPassword ? item.password : '••••••••••••'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700/60 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleCopy(item.password || '', 'password')}
                  className="flex items-center gap-1 text-xs bg-zinc-800 hover:bg-[#f0645d] text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-700/60 transition"
                >
                  {copiedField === 'password' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'password' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Email */}
          {item.email && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Email</div>
                  <div className="text-sm text-zinc-100 font-bold truncate">{item.email}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(item.email || '', 'email')}
                className="flex items-center gap-1 text-xs bg-zinc-800 hover:bg-[#f0645d] text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-700/60 transition"
              >
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}

          {/* Email Password */}
          {item.emailPass && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <ShieldAlert className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Email Pass</div>
                  <div className="text-sm text-zinc-100 font-bold truncate">
                    {showEmailPassword ? item.emailPass : '••••••••••••'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => setShowEmailPassword(!showEmailPassword)}
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700/60 transition"
                >
                  {showEmailPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleCopy(item.emailPass || '', 'emailPass')}
                  className="flex items-center gap-1 text-xs bg-zinc-800 hover:bg-[#f0645d] text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-700/60 transition"
                >
                  {copiedField === 'emailPass' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'emailPass' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Extra Info */}
          {item.extra && (
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-zinc-300 min-w-0">
                <Info className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span className="truncate">{item.extra}</span>
              </div>
              <button
                onClick={() => handleCopy(item.extra || '', 'extra')}
                className="text-xs text-[#f0645d] hover:underline flex-shrink-0"
              >
                Copy
              </button>
            </div>
          )}

          {/* Sleek Modal Footer Dismiss Action */}
          <div className="pt-3 flex justify-end">
            <button
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-1.5 rounded-full transition"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
