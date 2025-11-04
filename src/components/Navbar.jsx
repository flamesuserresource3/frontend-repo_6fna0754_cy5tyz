import { useMemo } from 'react';
import { Globe2, Rocket, Search } from 'lucide-react';

export default function Navbar({ lang, setLang, search, setSearch, t }) {
  const languages = useMemo(
    () => [
      { code: 'it', label: 'IT' },
      { code: 'en', label: 'EN' },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-400/30 to-cyan-400/30 border border-white/10 shadow-lg shadow-blue-500/10">
            <Rocket className="w-5 h-5 text-blue-300" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-white/90">NotApkStore</span>
        </div>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2 w-full max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-white/70" />
          <div className="flex gap-1 p-1 rounded-full bg-white/10 border border-white/10">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  lang === l.code
                    ? 'bg-gradient-to-r from-blue-500/70 to-cyan-500/70 text-white shadow'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                aria-pressed={lang === l.code}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden px-4 pb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search_placeholder')}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
          />
        </div>
      </div>
    </header>
  );
}
