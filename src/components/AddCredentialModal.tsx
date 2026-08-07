import React, { useState, useEffect } from 'react';
import { X, Gamepad2, Key, Mail, User, Info, Tag, Plus } from 'lucide-react';
import { CredentialItem } from '../data/initialCredentials';

interface AddCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: CredentialItem) => void;
  editingItem: CredentialItem | null;
}

export const AddCredentialModal: React.FC<AddCredentialModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingItem,
}) => {
  const [game, setGame] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailPass, setEmailPass] = useState('');
  const [extra, setExtra] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availablePlatforms = [
    {
      id: 'steam',
      name: 'Steam',
      selectedClass: 'bg-[#2a475e] text-white font-bold border-transparent shadow-lg shadow-black/50 scale-105',
      svg: `<svg viewBox="0 0 16 16" width="14" height="14" fill="white"><path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.2 2.2 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.22 2.22 0 0 1-1.312-1.568L.33 10.333Z"/><path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.7 1.7 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027m2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048"/></svg>`
    },
    {
      id: 'epic',
      name: 'Epic Games',
      selectedClass: 'bg-[#1c1c1c] text-white font-bold border-transparent shadow-lg shadow-black/50 scale-105',
      svg: `<svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M3.538 0C2.166 0 1.66.506 1.66 1.878v16.565c0 .155.007.299.019.431.034.302.037.593.317.922.026.038.31.246.31.246.151.076.257.128.43.2l8.334 3.492c.431.197.613.276.926.265H12c.317.011.499-.068.93-.265l8.333-3.492c.174-.072.276-.124.431-.2 0 0 .284-.212.31-.246.28-.329.283-.62.317-.922.012-.132.02-.276.02-.43V1.877C22.34.506 21.833 0 20.461 0zm13.356 3.11h.68c1.134 0 1.686.552 1.686 1.697v1.879h-1.372V4.883c0-.367-.17-.537-.525-.537h-.234c-.367 0-.537.17-.537.537v5.813c0 .366.17.536.537.536h.26c.352 0 .522-.17.522-.536v-2.08h1.376v2.144c0 1.145-.564 1.708-1.701 1.708h-.692c-1.141 0-1.7-.567-1.7-1.708V4.819c0-1.142.559-1.709 1.7-1.709zm-12.188.076H7.82v1.277H6.104v2.604h1.652v1.274H6.104v2.774h1.739v1.274H4.706zm3.817 0h2.196c1.137 0 1.7.567 1.7 1.712v2.445c0 1.145-.563 1.709-1.7 1.709h-.794v3.337H8.523zm4.528 0h1.398v9.203h-1.398zm-3.13 1.24v3.39h.579c.351 0 .521-.17.521-.54v-2.31c0-.37-.17-.54-.521-.54z"/></svg>`
    },
    {
      id: 'ubisoft',
      name: 'Ubisoft',
      selectedClass: 'bg-[#182030] text-white font-bold border-transparent shadow-lg shadow-black/50 scale-105',
      svg: `<svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M23.561 11.989C23.301-.304 6.953-4.89.655 6.634c.282.206.661.477.943.672a11.748 11.748 0 0 0-.976 3.068 11.886 11.886 0 0 0-.184 2.071c0 6.374 5.182 11.556 11.567 11.556s11.556-5.171 11.556-11.556v-.455zM3.29 14.048c-.152 1.247-.054 1.637-.054 1.789l-.282.098c-.108-.206-.369-.932-.488-1.908-.304-3.718 2.233-7.068 6.103-7.697 3.545-.52 6.938 1.68 7.729 4.759l-.282.098c-.087-.087-.228-.336-.77-.878-4.282-4.282-11.003-2.32-11.957 3.74zm11.003 2.082a3.145 3.145 0 0 1-2.591 1.355 3.151 3.151 0 0 1-3.155-3.155 3.159 3.159 0 0 1 2.927-3.144c1.019-.043 1.973.51 2.417 1.398a2.58 2.58 0 0 1-.455 2.949c.293.206.575.401.856.596zm6.58.119c-1.669 3.783-5.106 5.767-8.77 5.713-7.035-.347-9.084-8.466-4.38-11.393l.206.206c-.076.108-.358.325-.791 1.182-.51 1.041-.672 2.081-.607 2.732.369 5.67 8.315 6.83 11.046 1.214C21.057 8.217 11.821.401 3.625 6.374l-.184-.184c2.157-3.382 6.374-4.889 10.396-3.881 6.147 1.55 9.453 7.957 7.035 13.941z"/></svg>`
    },
    {
      id: 'xbox',
      name: 'Xbox',
      selectedClass: 'bg-[#107C10] text-white font-bold border-transparent shadow-lg shadow-[#107C10]/40 scale-105',
      svg: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="m24 12c0-.001 0-.001 0-.002 0-3.618-1.606-6.861-4.144-9.054l-.015-.013c-1.91 1.023-3.548 2.261-4.967 3.713l-.004.004c.044.046.087.085.131.132 3.719 4.012 7.106 9.73 6.546 12.471 1.53-1.985 2.452-4.508 2.452-7.246 0-.002 0-.004 0-.006z"/><path d="m12.591 3.955c1.68-1.104 3.699-1.833 5.872-2.022l.048-.003c-1.837-1.21-4.09-1.929-6.511-1.929-2.171 0-4.207.579-5.962 1.591l.058-.031c.658.567 2.837.781 5.484 2.4.143.089.316.142.502.142.189 0 .365-.055.513-.149l-.004.002z"/><path d="m9.166 6.778c.046-.049.093-.09.138-.138-1.17-1.134-2.446-2.174-3.806-3.1l-.099-.064c-.302-.221-.681-.354-1.091-.354-.146 0-.288.017-.425.049l.013-.002c-2.398 2.198-3.896 5.344-3.896 8.84 0 2.909 1.037 5.576 2.762 7.651l-.016-.02c-1.031-2.547 2.477-8.672 6.419-12.862z"/><path d="m12.084 9.198c-3.962 3.503-9.477 8.73-8.632 11.218 2.174 2.213 5.198 3.584 8.542 3.584 3.493 0 6.637-1.496 8.826-3.883l.008-.009c.486-2.618-4.755-7.337-8.744-10.91z"/></svg>`
    },
    {
      id: 'rockstar',
      name: 'Rockstar',
      selectedClass: 'bg-[#fcaf17] text-black font-extrabold border-transparent shadow-lg shadow-[#fcaf17]/40 scale-105',
      svg: `<svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor"><path d="m677.52 597.2-17.33-108.86-63.7 108h-12.1c-7.26-12.5-10.08-30.64-10.08-41.93 0-18.54 1.21-36.69 1.21-60.47 0-31.45-9.27-48-33.87-54v-.81c52-7.26 75.79-41.93 75.79-90.31 0-68.94-46-83.86-106-83.86H349.76l-68.53 324.17h85.87l25-118.12h57.25c30.64 0 43.14 14.92 43.14 43.54 0 21.77-2.42 39.11-2.42 55.63 0 6 1.21 20.56 5.64 26.2l62.08 65.71L504.17 777l114.5-68.13 85.47 65.71-15.73-108.45 98.37-68.94zM475.14 410.54H406.6l16.53-78.21h63.7c22.58 0 46.36 6 46.36 33.46 0 35.07-27.01 44.75-58.05 44.75z"/></svg>`
    },
    {
      id: 'mobile',
      name: 'Mobile Game',
      selectedClass: 'bg-[#0284c7] text-white font-bold border-transparent shadow-lg shadow-[#0284c7]/40 scale-105',
      svg: `<svg viewBox="0 0 511.999 511.999" width="14" height="14">
        <g>
          <path style="fill:#32BBFF;" d="M382.369,175.623C322.891,142.356,227.427,88.937,79.355,6.028C69.372-0.565,57.886-1.429,47.962,1.93l254.05,254.05L382.369,175.623z"/>
          <path style="fill:#32BBFF;" d="M47.962,1.93c-1.86,0.63-3.67,1.39-5.401,2.308C31.602,10.166,23.549,21.573,23.549,36v441.495c0,14.427,8.052,25.834,19.012,31.761c1.728,0.917,3.537,1.68,5.395,2.314L302.012,255.98L47.962,1.93z"/>
          <path style="fill:#32BBFF;" d="M302.012,255.98L47.956,510.035c9.927,3.384,21.413,2.586,31.399-4.103c143.598-80.41,237.986-133.196,298.152-166.746c1.675-0.941,3.316-1.861,4.938-2.772L302.012,255.98z"/>
        </g>
        <path style="fill:#2C9FD9;" d="M23.549,255.98v219.98c0,14.427,8.052,25.834,19.012,31.761c1.728,0.917,3.537,1.68,5.395,2.314L302.012,255.98H23.549z"/>
        <path style="fill:#29CC5E;" d="M79.355,6.028C67.5-1.8,53.52-1.577,42.561,4.239l255.595,255.596l84.212-84.212C322.891,142.356,227.427,88.937,79.355,6.028z"/>
        <path style="fill:#D93F21;" d="M298.158,252.126L42.561,507.721c10.96,5.815,24.939,6.151,36.794-1.789c143.598-80.41,237.986-133.196,298.152-166.746c1.675-0.941,3.316-1.861,4.938-2.772L298.158,252.126z"/>
        <path style="fill:#FFD500;" d="M488.45,255.98c0-12.19-6.151-24.492-18.342-31.314c0,0-22.799-12.721-92.682-51.809l-83.123,83.123l83.204,83.205c69.116-38.807,92.6-51.892,92.6-51.892C482.299,280.472,488.45,268.17,488.45,255.98z"/>
        <path style="fill:#FFAA00;" d="M470.108,287.294c12.191-6.822,18.342-19.124,18.342-31.314H294.303l83.204,83.205C446.624,300.379,470.108,287.294,470.108,287.294z"/>
      </svg>`
    }
  ];

  useEffect(() => {
    if (editingItem) {
      setGame(editingItem.game);
      setAccount(editingItem.account || '');
      setPassword(editingItem.password || '');
      setEmail(editingItem.email || '');
      setEmailPass(editingItem.emailPass || '');
      setExtra(editingItem.extra || '');
      setSelectedTags(editingItem.tags || []);
    } else {
      setGame('');
      setAccount('');
      setPassword('');
      setEmail('');
      setEmailPass('');
      setExtra('');
      setSelectedTags([]);
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!game.trim()) return;

    onSave({
      game: game.trim(),
      account: account.trim(),
      password: password.trim(),
      email: email.trim(),
      emailPass: emailPass.trim(),
      extra: extra.trim(),
      tags: selectedTags,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12151c] border border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative">
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {editingItem ? 'Edit Credential' : 'Add Credential'}
                </h2>
                <p className="text-xs text-zinc-500 font-mono">
                  {editingItem ? 'Modify details for this game entry' : 'Store game logins in your collection'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-mono">
            
            {/* Game Name */}
            <div>
              <label className="block text-xs text-zinc-400 mb-1">
                Game Name <span className="text-[#f0645d]">*</span>
              </label>
              <input
                type="text"
                required
                value={game}
                onChange={(e) => setGame(e.target.value)}
                placeholder="e.g., Elden Ring, GTA Online, Cyberpunk 2077"
                className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-600 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition"
              />
            </div>

            {/* Account / ID */}
            <div>
              <label className="block text-xs text-zinc-400 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-zinc-500" /> Account ID / Username
              </label>
              <input
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="Username or Account ID"
                className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-600 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-zinc-400 mb-1 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-zinc-500" /> Account Password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-600 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition"
              />
            </div>

            {/* Email & Email Pass Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" /> Email Address
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Associated Email"
                  className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-600 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-zinc-500" /> Email Password
                </label>
                <input
                  type="text"
                  value={emailPass}
                  onChange={(e) => setEmailPass(e.target.value)}
                  placeholder="Mail Password"
                  className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-600 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition"
                />
              </div>
            </div>

            {/* Extra Info / Notes Restyled Input */}
            <div>
              <label className="block text-xs text-zinc-400 mb-1 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-zinc-500" /> Extra Info / Notes
              </label>
              <input
                type="text"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
                placeholder="Alternate emails, Steam ID, Mail sites, recovery codes..."
                className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-zinc-600 rounded-xl px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition"
              />
            </div>

            {/* Platform Tag selection with White Text and Solid Visually Rich Background Shades */}
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-zinc-500" /> Select Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {availablePlatforms.map((platform) => {
                  const isSelected = selectedTags.includes(platform.id);
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => toggleTag(platform.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 transition-all border ${
                        isSelected
                          ? platform.selectedClass
                          : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                      }`}
                    >
                      <span dangerouslySetInnerHTML={{ __html: platform.svg }} />
                      <span>{platform.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#f0645d] hover:bg-[#e0534c] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>{editingItem ? 'Save Changes' : 'Save Credential'}</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
