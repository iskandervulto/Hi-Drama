export default function TVSchedule() {
  return (
    <section className="bg-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-sm border-4 border-purple-200 shadow-xl flex flex-col sm:flex-row items-stretch overflow-hidden">
          {/* Left slab */}
          <div className="bg-purple-900 text-white flex flex-col items-center justify-center px-8 py-6 sm:py-8 gap-2 shrink-0">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-gold-400">
              <path d="M21 6h-3.17L19 4.83 17.83 3.66 15.17 6.33 12.5 3.66 9.83 6.33 7.17 3.66 6 4.83 7.17 6H3C1.9 6 1 6.9 1 8v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 14H3V8h18v12z"/>
            </svg>
            <span className="font-lato text-xs tracking-[0.25em] uppercase text-purple-300 text-center leading-tight">
              On Public<br/>Access TV
            </span>
          </div>
          {/* Right content */}
          <div className="flex-1 px-6 py-6 flex flex-col justify-center gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="font-lato text-xs font-black uppercase tracking-widest text-red-600">On Air</span>
            </div>
            <p className="font-playfair text-2xl sm:text-3xl font-bold text-purple-900 leading-tight">
              Every Other Saturday
            </p>
            <p className="font-lato text-4xl sm:text-5xl font-black text-purple-800 leading-none tracking-tight">
              1:30–2:00 <span className="text-2xl sm:text-3xl font-bold text-gold-600">PM EST</span>
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {[
                { name: "Spectrum", ch: "Ch. 56" },
                { name: "RCN", ch: "Ch. 83" },
                { name: "Fios", ch: "Ch. 34" },
              ].map(({ name, ch }) => (
                <div key={name} className="bg-purple-900 text-white rounded-sm px-4 py-2 flex flex-col items-center leading-tight">
                  <span className="font-lato text-[10px] uppercase tracking-widest text-purple-300">{name}</span>
                  <span className="font-playfair font-bold text-gold-400 text-lg">{ch}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
