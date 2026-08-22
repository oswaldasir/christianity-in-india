import React, { useState, useEffect } from 'react';

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index === words.length) {
      setIndex(0);
      return;
    }
    
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <>
      {words[index].substring(0, subIndex)}
      <span className={`inline-block w-[2px] transition-opacity duration-100 font-sans font-light -translate-y-1 ml-[1px] ${blink ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Fixed Ambient Background */}
      <div className="fixed inset-0 z-[-1] bg-[#fdfbf7] overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#1976a8]/10 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#9a6418]/10 blur-[120px]"></div>
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#8f3565]/5 blur-[100px]"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-[#1976a8]/5 blur-[80px]"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.02)] px-5 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 no-underline group">
          <div>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#9a6418] via-[#1976a8] to-[#8f3565] font-serif text-xl md:text-2xl font-bold leading-tight tracking-tight">
              India Christian Chronicles
            </div>
            <small className="block mt-0.5 text-slate-500 text-[10px] tracking-widest uppercase font-semibold">
              Faith • Language • Mission • Culture
            </small>
          </div>
        </a>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-2xl text-slate-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Links */}
        <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-20 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent border-b md:border-none border-slate-200 py-4 md:py-0 px-6 md:px-0 gap-2 md:gap-6 shadow-sm md:shadow-none`}>
          {['Overview', 'Timeline', 'Eras', 'People', 'About', 'Research note', 'Contact'].map((link) => (
            <li key={link} className="relative">
              <a 
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="block py-2 text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#9a6418] after:to-[#1976a8] hover:after:w-full after:transition-all after:duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <header id="top" className="relative flex items-center justify-center min-h-[500px] md:min-h-[600px] px-6 py-24 overflow-hidden text-center z-0">
        <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center">
          <span className="inline-block border border-[#d5a247]/30 bg-white/60 backdrop-blur-md text-[#9a6418] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8 shadow-sm">
            An Interactive Historical Archive
          </span>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#9a6418] via-[#1976a8] to-[#8f3565] text-xs font-bold uppercase tracking-[0.15em] mb-4">
            52 CE → 20th Century • 60 Pioneering Lives
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-8 text-slate-900">
            Tracing the Flame of <br className="hidden md:block"/>
            <em className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#9a6418] to-[#c58a2b] font-normal">
              <Typewriter words={['Faith', 'Mission', 'Revival']} />
            </em> <br className="hidden md:block"/>
            Across the Indian Subcontinent
          </h1>
          <p className="max-w-2xl text-slate-600 text-lg leading-relaxed mb-12">
            Explore two millennia of devotion through the lives of apostolic pioneers, classical poets, dedicated physicians, and visionary educators who wove the teachings of Christ into the rich cultural tapestry of India.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a href="#timeline" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#9a6418] to-[#d5a247] text-white font-medium text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Explore the timeline <span className="text-lg font-serif">↓</span>
            </a>
            <a href="#people" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-sm shadow-sm hover:border-[#1976a8]/30 transition-colors">
              Browse people
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-12 pt-10 border-t border-[#1976a8]/10 w-full max-w-2xl">
            <div className="flex flex-col text-center">
              <strong className="text-3xl font-serif text-slate-900">60</strong>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-2">featured people</span>
            </div>
            <div className="flex flex-col text-center">
              <strong className="text-3xl font-serif text-slate-900">5</strong>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-2">historical eras</span>
            </div>
            <div className="flex flex-col text-center">
              <strong className="text-3xl font-serif text-slate-900">1,900+</strong>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-2">years of history</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* About Section */}
      <section id="about" className="py-16 px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 p-8 md:p-12 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-[#9a6418] via-[#1976a8] to-[#8f3565]"></div>
          
          <div className="flex-1 relative z-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9a6418] to-[#1976a8] text-xs font-bold tracking-[0.15em] mb-4 block uppercase">About This Project</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-2 leading-tight">Christianity in India</h2>
            <p className="text-sm text-slate-500 font-medium mb-8">Curated & Developed by Anbu Oswald Asir</p>
            
            <p className="text-slate-700 text-base leading-relaxed mb-6">
              This digital archive explores the history of Christianity in India through missionaries, indigenous Christian leaders, theologians, poets, musicians, educators and social reformers.
            </p>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/60 mb-8 shadow-sm">
              <h3 className="font-serif font-bold text-slate-900 mb-2">Purpose of the Project</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                To make India's rich Christian heritage easier to discover, understand and continue researching through a visual, chronological and accessible digital archive.
              </p>
            </div>
          </div>
          
          <div className="md:w-80 shrink-0 relative z-10">
            <div className="bg-gradient-to-br from-[#1976a8]/10 to-[#8f3565]/10 rounded-xl p-8 border border-white/60 shadow-sm h-full flex flex-col justify-center items-start relative overflow-hidden">
               <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/40 blur-2xl pointer-events-none"></div>
               
               <img 
                 src="/creator.png" 
                 alt="Anbu Oswald Asir"
                 className="w-16 h-16 rounded-full object-cover mb-6 shadow-md border-2 border-white bg-gradient-to-tr from-[#9a6418] to-[#1976a8]"
                 onError={(e) => { e.currentTarget.src = "https://ui-avatars.com/api/?name=Anbu+Oswald&background=9a6418&color=fff&size=128&font-family=serif"; }}
               />
               <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">Anbu Oswald Asir</h3>
               <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#9a6418] to-[#1976a8] mb-6">Creator & Curator</p>
               
               <a href="https://oswaldasir.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/80 border border-white hover:bg-white text-slate-700 font-medium text-sm shadow-sm transition-all z-10">
                 Visit Portfolio <span className="text-lg leading-none">↗</span>
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Research Note Section */}
      <section id="research-note" className="py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-10 p-8 md:p-12 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#1976a8]/5 blur-3xl pointer-events-none"></div>
          <div className="max-w-2xl relative z-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9a6418] to-[#1976a8] text-xs font-bold tracking-[0.15em] mb-4 block uppercase">Research Note</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight">A timeline, not a single narrative</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              This interface preserves the chronology and biographical framing in the supplied archive while making the material easier to explore. Dates and historical claims should be read as the source's presentation; traditions around early Christianity in India, especially the Thomas tradition, may be interpreted differently by different churches and historians.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 border-t border-[#1976a8]/10">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9a6418] to-[#1976a8] text-xs font-bold tracking-[0.15em] mb-4 block uppercase">Get In Touch</span>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">Contact Us</h2>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Have a question, correction, contribution, or historical resource to share? Send us a message and we’ll get back to you.
            </p>
            <div className="p-6 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 shadow-sm text-slate-700 text-sm leading-relaxed">
              <strong className="block text-slate-900 mb-2 font-semibold">Help improve the archive.</strong>
              We welcome suggestions about people, dates, places, photographs, and sources that can strengthen this history of Christianity in India.
            </div>
          </div>

          <form className="p-8 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative overflow-hidden" onSubmit={e => { e.preventDefault(); alert("Message prepared successfully."); }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9a6418] via-[#1976a8] to-[#8f3565]"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-xs font-semibold">Name <span className="text-[#8f3565]">*</span></label>
                <input required type="text" placeholder="Your name" className="w-full rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#1976a8] focus:ring-1 focus:ring-[#1976a8] transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 text-xs font-semibold">Email <span className="text-[#8f3565]">*</span></label>
                <input required type="email" placeholder="you@example.com" className="w-full rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#1976a8] focus:ring-1 focus:ring-[#1976a8] transition-all" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-slate-700 text-xs font-semibold">Subject</label>
                <input type="text" placeholder="How can we help?" className="w-full rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#1976a8] focus:ring-1 focus:ring-[#1976a8] transition-all" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-slate-700 text-xs font-semibold">Message <span className="text-[#8f3565]">*</span></label>
                <textarea required rows={5} placeholder="Write your message..." className="w-full rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-[#1976a8] focus:ring-1 focus:ring-[#1976a8] transition-all resize-y"></textarea>
              </div>
            </div>
            <button type="submit" className="mt-6 px-8 py-3 rounded-lg bg-gradient-to-r from-[#1976a8] to-[#12587e] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all w-full md:w-auto">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1976a8]/10 py-12 px-6 text-center text-slate-500 text-sm">
        <div className="w-12 h-[2px] bg-slate-300 mx-auto mb-6"></div>
        <p>Comprehensive Chronological Archive of Christian Missions & Hymnody in India</p>
        <p className="mt-2 text-xs text-slate-400">60 Historical Pioneers & Hymnologists (#01–#60)</p>
      </footer>
    </div>
  );
};
