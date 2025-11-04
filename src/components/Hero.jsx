import { motion } from 'framer-motion';

export default function Hero({ t }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-32 -right-10 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-sm mb-4">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse" />
            {t('tagline')}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            NotApkStore
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            {t('hero_subtitle')}
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#upload"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition"
            >
              {t('cta_upload')}
            </a>
            <a
              href="#apps"
              className="px-5 py-3 rounded-xl bg-white/10 border border-white/10 text-white/90 hover:bg-white/15 transition"
            >
              {t('cta_browse')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
