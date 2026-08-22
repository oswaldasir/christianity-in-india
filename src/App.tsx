import { useState } from 'react';
import { Layout } from './components/Layout';
import { Timeline } from './components/Timeline';
import { Item } from './types';

export default function App() {
  const [lightboxImg, setLightboxImg] = useState<Item | null>(null);

  return (
    <Layout>
      <Timeline onImageClick={setLightboxImg} />
      
      {/* Lightbox Modal */}
      {lightboxImg && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="bg-white/70 backdrop-blur-3xl rounded-xl shadow-[0_32px_64px_rgba(0,0,0,0.2)] border border-white/60 overflow-hidden max-w-4xl w-full relative flex flex-col md:flex-row max-h-[90vh]" 
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#9a6418] via-[#1976a8] to-[#8f3565] z-30"></div>
            <button 
              onClick={() => setLightboxImg(null)} 
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-white/60 backdrop-blur-lg hover:bg-white text-slate-500 hover:text-slate-900 rounded-full transition-all z-20 text-xl font-light shadow-sm"
              aria-label="Close dialog"
            >
              ×
            </button>
            
            <div className="bg-white/30 flex items-center justify-center w-full md:w-1/2 p-8 min-h-[300px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f9f4eb]/40 to-transparent pointer-events-none"></div>
              <img 
                src={lightboxImg.image} 
                alt={lightboxImg.name} 
                className="max-h-[60vh] object-contain drop-shadow-lg rounded z-10" 
                onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(lightboxImg.name)}&background=F1F5F9&color=475569&size=500&bold=true` }} 
              />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-white/50 border-l border-white/40 overflow-y-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-serif font-bold text-slate-400">#{lightboxImg.id}</span>
                <span className="text-xs font-semibold tracking-wide text-[#9a6418] uppercase">{lightboxImg.year}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2 leading-tight">
                {lightboxImg.name}
              </h3>
              <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#9a6418] to-[#1976a8] mb-6 inline-block w-fit">{lightboxImg.role}</p>
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#9a6418]/30 to-transparent mb-6"></div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{lightboxImg.description}</p>
              
              {lightboxImg.highlights && (
                <ul className="mt-8 pt-8 border-t border-slate-100 list-square list-inside text-sm text-slate-600 space-y-2">
                  {lightboxImg.highlights.map((h, i) => (
                    <li key={i} className="marker:text-slate-300">{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
