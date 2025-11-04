import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import AppGrid from './components/AppGrid';

const translations = {
  it: {
    tagline: 'Upload sicuri. Download diretti.',
    hero_subtitle:
      'Condividi in modo semplice i tuoi APK verificati. Interfaccia in stile liquid glass, animazioni fluide e download immediati di APK e ZIP.',
    cta_upload: 'Carica la tua app',
    cta_browse: 'Sfoglia app',
    search_placeholder: 'Cerca app...',
    upload_title: 'Carica la tua applicazione',
    upload_subtitle: 'Importa i tuoi APK/ZIP in modo privato e sicuro. Persistenza lato server attiva.',
    app_name: 'Nome applicazione',
    description: 'Descrizione',
    upload_btn: 'Carica',
    upload_error: 'Inserisci nome e file APK.',
    upload_success: 'Caricamento completato! L’app è ora nella lista qui sotto.',
    apps_title: 'Applicazioni',
    apps_subtitle: 'Scarica direttamente APK o ZIP. Usa la ricerca per filtrare.',
    no_apps: 'Nessuna app caricata al momento. Inizia caricando la tua! ',
    published: 'Pubblicata il',
    footer_text: 'NotApkStore — upload e download sicuri. '
  },
  en: {
    tagline: 'Secure uploads. Direct downloads.',
    hero_subtitle:
      'Easily share your verified APKs. Liquid glass UI, smooth animations, and instant APK/ZIP downloads.',
    cta_upload: 'Upload your app',
    cta_browse: 'Browse apps',
    search_placeholder: 'Search apps...',
    upload_title: 'Upload your application',
    upload_subtitle: 'Import your APK/ZIP securely. Server persistence enabled.',
    app_name: 'Application name',
    description: 'Description',
    upload_btn: 'Upload',
    upload_error: 'Please enter a name and select an APK file.',
    upload_success: 'Upload complete! The app is now listed below.',
    apps_title: 'Applications',
    apps_subtitle: 'Download APK or ZIP directly. Use search to filter.',
    no_apps: 'No apps yet. Start by uploading yours! ',
    published: 'Published on',
    footer_text: 'NotApkStore — secure uploads and direct downloads.'
  }
};

export default function App() {
  const [lang, setLang] = useState('it');
  const t = (key) => translations[lang][key] ?? key;

  const baseUrl =
    import.meta.env.VITE_BACKEND_URL ||
    (typeof window !== 'undefined'
      ? window.location.origin.replace(':3000', ':8000')
      : 'https://notapkstore.com');

  const [apps, setApps] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const q = search ? `?q=${encodeURIComponent(search)}` : '';
        const res = await fetch(`${baseUrl}/apps${q}`, { signal: controller.signal });
        const data = await res.json();
        setApps(Array.isArray(data.items) ? data.items : []);
      } catch (e) {
        // ignore fetch errors on unmount
      }
    };
    load();
    return () => controller.abort();
  }, [baseUrl, search]);

  const filtered = useMemo(() => apps, [apps]);

  const handleAddApp = (app) => {
    setApps((prev) => [app, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 -z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[45vmax] w-[45vmax] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[45vmax] w-[45vmax] rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <Navbar lang={lang} setLang={setLang} search={search} setSearch={setSearch} t={t} />
      <main>
        <Hero t={t} />
        <UploadSection t={t} onAddApp={handleAddApp} baseUrl={baseUrl} />
        <AppGrid t={t} apps={filtered} baseUrl={baseUrl} />
      </main>

      <footer className="mt-8 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 backdrop-blur-xl text-white/70 text-sm text-center">
            {t('footer_text')}
          </div>
        </div>
      </footer>
    </div>
  );
}
