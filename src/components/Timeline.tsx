import React, { useState } from 'react';
import { allItems, eras } from '../data';
import { Item } from '../types';
import { Icon } from './Icons';

export const Timeline = ({ onImageClick }: { onImageClick: (item: Item) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [eraFilter, setEraFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [compact, setCompact] = useState(false);
  const [isEraDropdownOpen, setIsEraDropdownOpen] = useState(false);

  const selectedEraLabel = eraFilter === 'all' 
    ? 'All eras' 
    : eras.find(e => e.id === eraFilter)?.title || 'All eras';

  const filteredEras = eras.map(era => {
    const itemsInEra = allItems.filter(item => item.eraId === era.id);
    const filteredItems = itemsInEra.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchEra = eraFilter === 'all' || item.eraId === eraFilter;
      const matchRole = roleFilter === 'all' || item.badgeType === roleFilter;
      return matchSearch && matchEra && matchRole;
    });
    return { ...era, items: filteredItems };
  }).filter(era => era.items.length > 0);

  const totalVisible = filteredEras.reduce((sum, era) => sum + era.items.length, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 pb-24 pt-12">
      {/* Control Panel */}
      <section id="overview" className="mb-20 p-6 rounded-xl bg-white/60 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative z-30">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-brand-teal text-xs font-bold uppercase tracking-widest block mb-2">Explore the archive</span>
            <h2 className="text-2xl font-serif font-bold text-slate-900">Find a person, period or contribution</h2>
            <p className="text-slate-600 text-sm mt-2">Search across the 55 entries, filter by role, or jump directly to an era.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_auto_auto] gap-4 items-center">
          <div className="flex items-center gap-3 h-12 px-4 rounded-lg bg-white/40 border border-white/60 focus-within:border-[#1976a8]/50 focus-within:bg-white/60 transition-all">
            <span className="text-slate-400 text-lg">⌕</span>
            <input 
              type="search" 
              placeholder="Search names, places, roles..." 
              className="w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder-slate-400"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsEraDropdownOpen(!isEraDropdownOpen)}
              className="w-full h-12 px-4 rounded-lg bg-white/40 border border-white/60 text-slate-700 text-sm outline-none focus:border-[#1976a8]/50 focus:bg-white/60 transition-all flex items-center justify-between text-left cursor-pointer"
            >
              <span className="truncate">{selectedEraLabel}</span>
              <span className="text-slate-400 text-xs ml-2 flex-shrink-0">▼</span>
            </button>

            {isEraDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsEraDropdownOpen(false)}></div>
                <div className="absolute top-full left-0 mt-2 w-[calc(100vw-2rem)] md:w-80 bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_16px_48px_rgba(31,48,72,0.1)] rounded-xl py-2 z-50 max-h-[60vh] overflow-y-auto">
                  <button
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${eraFilter === 'all' ? 'bg-[#1976a8]/10 text-[#1976a8] font-semibold' : 'text-slate-700 hover:bg-white/60 hover:text-[#1976a8]'}`}
                    onClick={() => { setEraFilter('all'); setIsEraDropdownOpen(false); }}
                  >
                    All eras
                  </button>
                  {eras.map(era => (
                    <button
                      key={era.id}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${eraFilter === era.id ? 'bg-[#1976a8]/10 text-[#1976a8] font-semibold' : 'text-slate-700 hover:bg-white/60 hover:text-[#1976a8]'}`}
                      onClick={() => { setEraFilter(era.id); setIsEraDropdownOpen(false); }}
                    >
                      <span className="text-[#9a6418] font-serif font-bold mr-2">{era.number.toString().padStart(2, '0')}</span>
                      {era.title}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'foreign', label: 'Missionaries' },
              { id: 'native', label: 'Indian pioneers' },
              { id: 'poet', label: 'Poets & music' }
            ].map(filter => (
              <button 
                key={filter.id}
                onClick={() => setRoleFilter(filter.id)}
                className={`h-12 px-5 rounded-lg text-xs font-medium transition-all border ${roleFilter === filter.id ? 'bg-gradient-to-r from-[#1976a8] to-[#12587e] border-transparent text-white shadow-md' : 'bg-white/40 border-white/60 text-slate-600 hover:bg-white/70'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setCompact(!compact)}
            className="h-12 px-5 rounded-lg bg-white/40 border border-white/60 text-[#1976a8] text-xs font-medium hover:bg-white/70 transition-all ml-auto md:ml-0"
          >
            {compact ? 'Comfortable view' : 'Compact view'}
          </button>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
          <span className="font-medium text-slate-900">{totalVisible} {totalVisible === 1 ? 'entry' : 'entries'}</span>
          <span>{totalVisible === allItems.length ? 'Showing the complete archive' : 'Filters are active'}</span>
        </div>
      </section>

      <div id="people" className="h-px"></div>

      {/* Eras Index */}
      {filteredEras.length > 0 && (
        <div className="mb-16 mt-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Historical Eras</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEras.map(era => (
              <a 
                key={`index-${era.id}`} 
                href={`#${era.id}`}
                className="block p-6 rounded-xl border border-white/70 bg-white/40 backdrop-blur-md hover:bg-white/60 hover:border-white/80 hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#9a6418] via-[#1976a8] to-[#8f3565] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9a6418] to-[#d5a247] font-serif font-bold text-2xl block mb-2">{era.number.toString().padStart(2, '0')}</span>
                <h4 className="font-serif font-bold text-slate-900 group-hover:text-[#1976a8] transition-colors leading-tight mb-2">
                  {era.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">{era.subtitle}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Timeline Render */}
      <div className="relative mt-8">
        {filteredEras.map(era => (
          <div key={era.id} id={era.id} className="mb-24">
            {/* Era Header */}
            <div className="mb-14 max-w-3xl relative pb-6 border-b border-slate-200">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3">
                {era.number}. {era.title}
              </h2>
              <p className="text-slate-600 text-base">{era.subtitle}</p>
            </div>

            {/* Era Timeline Container */}
            <div className="relative py-4">
              {/* Vertical Line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#9a6418] via-[#1976a8] to-[#8f3565] opacity-20 -translate-x-1/2 rounded-full"></div>

              {era.items.map((item, index) => (
                <TimelineCard key={item.id} item={item} index={index} compact={compact} onImageClick={onImageClick} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TimelineCard: React.FC<{ item: Item, index: number, compact: boolean, onImageClick: (item: Item) => void }> = ({ item, index, compact, onImageClick }) => {
  const isLeft = index % 2 === 0;
  
  const themeColors = {
    foreign: { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-200', dot: 'border-teal-600' },
    native: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', dot: 'border-amber-500' },
    poet: { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200', dot: 'border-rose-500' },
  };
  const fallback = { bg: 'bg-slate-50', text: 'text-slate-800', border: 'border-slate-200', dot: 'border-slate-400' };
  const colors = themeColors[item.badgeType] || fallback;

  return (
    <div className={`relative flex w-full mb-10 group ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
      {/* Dot on the line */}
      <div className={`absolute left-6 md:left-1/2 top-8 w-3.5 h-3.5 -translate-x-1/2 rounded-full border-2 bg-white/80 backdrop-blur-sm z-10 ${colors.dot} transition-transform duration-300 group-hover:scale-125 shadow-sm`} />

      {/* Card Wrapper */}
      <div className="w-full ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] relative pt-2">
        
        {/* Desktop Line Connector */}
        <div className={`hidden md:block absolute top-[37px] w-8 h-[2px] bg-gradient-to-r ${isLeft ? 'from-transparent to-[#1976a8]/20 -right-8' : 'from-[#1976a8]/20 to-transparent -left-8'} z-0`} />
        
        {/* Mobile Line Connector */}
        <div className="md:hidden absolute top-[37px] -left-8 w-8 h-[2px] bg-gradient-to-r from-transparent to-[#1976a8]/20 z-0" />

        {/* Card Content */}
        <div className="relative bg-white/50 backdrop-blur-xl border border-white/80 p-6 md:p-8 rounded-xl shadow-[0_8px_32px_rgba(31,48,72,0.04)] hover:bg-white/70 hover:shadow-[0_16px_48px_rgba(31,48,72,0.08)] hover:border-white transition-all duration-300 z-10">
          
          <div className="flex justify-between items-start mb-5 gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-sm font-serif font-bold text-slate-400">#{item.id}</span>
              <span className="text-xs font-semibold tracking-wide text-slate-900">{item.year}</span>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${colors.bg} ${colors.text} ${colors.border}`}>
              <Icon name={item.icon} className="w-4 h-4" />
              {item.badgeLabel}
            </span>
          </div>

          <div className={`flex ${compact ? 'gap-4 items-center' : 'gap-6 items-start flex-col sm:flex-row'}`}>
            <img
              src={item.image}
              alt={item.name}
              className={`object-cover rounded border border-slate-100 bg-slate-50 cursor-pointer hover:border-slate-300 transition-colors ${compact ? 'w-12 h-12 rounded-full' : 'w-24 h-24 sm:w-28 sm:h-28 shrink-0'}`}
              onClick={() => onImageClick(item)}
              onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=F1F5F9&color=475569&size=200&bold=true` }}
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight mb-1.5">{item.name}</h3>
              {!compact && <div className="text-sm font-medium text-slate-500 mb-4">{item.role}</div>}
              {!compact && <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>}
              {!compact && item.highlights && (
                <ul className="mt-5 pt-5 border-t border-slate-100 list-square list-inside text-sm text-slate-600 space-y-2 pl-1">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="marker:text-slate-300">{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
