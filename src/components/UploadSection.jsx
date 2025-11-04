import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileArchive, FileType } from 'lucide-react';

export default function UploadSection({ t, onAddApp }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [apkFile, setApkFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !apkFile) {
      setStatus('error');
      return;
    }

    const newApp = {
      id: Date.now().toString(),
      name,
      description: desc,
      apkUrl: URL.createObjectURL(apkFile),
      zipUrl: zipFile ? URL.createObjectURL(zipFile) : null,
      createdAt: new Date().toISOString(),
    };

    onAddApp(newApp);
    setStatus('success');
    formRef.current?.reset();
    setName('');
    setDesc('');
    setApkFile(null);
    setZipFile(null);

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="upload" className="relative py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-6 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl shadow-blue-900/20"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white/90">{t('upload_title')}</h2>
              <p className="text-white/70 text-sm mt-1">{t('upload_subtitle')}</p>
            </div>
            <div className="hidden sm:block p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-white/10">
              <UploadCloud className="w-5 h-5 text-blue-300" />
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm text-white/70 mb-1">{t('app_name')}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="My Secure App"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm text-white/70 mb-1">{t('description')}</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Breve descrizione / Short description"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1 flex items-center gap-2"><FileType className="w-4 h-4" /> APK *</label>
              <input
                type="file"
                accept=".apk"
                onChange={(e) => setApkFile(e.target.files?.[0] || null)}
                required
                className="w-full file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-cyan-500 file:text-white file:cursor-pointer text-white/80 bg-white/10 border border-white/10 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1 flex items-center gap-2"><FileArchive className="w-4 h-4" /> ZIP</label>
              <input
                type="file"
                accept=".zip"
                onChange={(e) => setZipFile(e.target.files?.[0] || null)}
                className="w-full file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:ring-1 file:ring-white/20 file:cursor-pointer text-white/80 bg-white/10 border border-white/10 rounded-xl"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition"
              >
                {t('upload_btn')}
              </button>
              {status === 'error' && (
                <span className="text-sm text-rose-300">{t('upload_error')}</span>
              )}
              {status === 'success' && (
                <span className="text-sm text-emerald-300">{t('upload_success')}</span>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
