import { motion } from 'framer-motion';
import { Download, Package, FileArchive } from 'lucide-react';

export default function AppGrid({ t, apps, baseUrl }) {
  const makeUrl = (u) => {
    if (!u) return null;
    if (u.startsWith('http')) return u;
    return `${baseUrl}${u}`;
  };

  return (
    <section id="apps" className="relative py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white/90">{t('apps_title')}</h2>
            <p className="text-white/70 text-sm">{t('apps_subtitle')}</p>
          </div>
        </div>

        {apps.length === 0 ? (
          <div className="text-center text-white/60 py-12">{t('no_apps')}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app, idx) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                className="group rounded-2xl p-5 bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition shadow-xl shadow-blue-900/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-white/10">
                        <Package className="w-4 h-4 text-blue-300" />
                      </span>
                      <h3 className="text-lg font-semibold text-white/90">{app.name}</h3>
                    </div>
                    {app.description && (
                      <p className="text-sm text-white/70 mt-2 line-clamp-3">{app.description}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={makeUrl(app.apkUrl) || '#'}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-medium transition ${
                      app.apkUrl
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30'
                        : 'bg-white/5 border border-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-4 h-4" /> APK
                  </a>
                  <a
                    href={makeUrl(app.zipUrl) || '#'}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl font-medium transition ${
                      app.zipUrl
                        ? 'bg-white/10 border border-white/10 text-white/90 hover:bg-white/15'
                        : 'bg-white/5 border border-white/10 text-white/40 cursor-not-allowed'
                    }`}
                  >
                    <FileArchive className="w-4 h-4" /> ZIP
                  </a>
                </div>

                <div className="mt-3 text-[11px] text-white/50">
                  {t('published')}{' '}
                  {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : ''}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
