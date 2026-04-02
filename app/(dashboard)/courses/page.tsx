import Link from "next/link";

export default function CoursesPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Search & Filter Bar */}
      <section className="pt-8 space-y-6">
        <div className="relative max-w-2xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            className="w-full bg-surface-container-lowest border-none rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-outline-variant font-medium" 
            placeholder="Search for your next skill..." 
            type="text"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <button className="px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-bold whitespace-nowrap shadow-[0_0_15px_rgba(255,208,94,0.3)]">All</button>
          <button className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-medium whitespace-nowrap hover:bg-surface-bright transition-colors border border-outline/10">Beginner</button>
          <button className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-medium whitespace-nowrap hover:bg-surface-bright transition-colors border border-outline/10">Pro Only</button>
          <button className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-medium whitespace-nowrap hover:bg-surface-bright transition-colors border border-outline/10">Lighting</button>
          <button className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-medium whitespace-nowrap hover:bg-surface-bright transition-colors border border-outline/10">Editing</button>
          <button className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-medium whitespace-nowrap hover:bg-surface-bright transition-colors border border-outline/10">Directing</button>
        </div>
      </section>

      {/* Featured Course (Asymmetric Hero) */}
      <section className="relative rounded-xl overflow-hidden min-h-[450px] flex items-end group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJ0J8l8TiKNoGnlNYXoED2cBaNMddQs714r88B3s7iUYymGmZeDUsAikfO8i98cLm3owsrwmZTWTt7EU9WdabC8aBQHSG3Ik8hPlMe9hefKcE7qyg3niFQq7s3q38gdjB2uzEylui1dtBHUoNAOKou5PAwps3x5YLqMx0Af2HlwR3RVekh0l70vaTFaa_35KvOGi9T4qjuxaFYM7Fzce2m8eY1_5ziIPBeuRWpSNwHGogVuI94Pa5wwK4bbqAUtMLW_t7_DyKddCc')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="relative p-8 md:p-12 w-full max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-primary text-xs font-bold tracking-widest uppercase">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            Featured Course
          </div>
          <h2 className="text-4xl md:text-5xl font-manrope font-extrabold tracking-tight text-white leading-tight">Mastering Cinematography: The Auteur&apos;s Eye</h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-lg leading-relaxed">Go beyond technical settings. Learn to manipulate light, shadow, and movement to tell stories that resonate on the big screen.</p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link href="/courses/mastering-cinematography" className="px-8 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,208,94,0.4)] transition-all active:scale-95">
              <span className="material-symbols-outlined">play_arrow</span>
              Start Learning
            </Link>
            <Link href="/courses/mastering-cinematography" className="px-8 py-3 bg-surface-container-highest/60 backdrop-blur-md text-white rounded-lg font-bold border border-outline/20 hover:bg-surface-container-highest transition-colors active:scale-95">
              Details
            </Link>
          </div>
        </div>
      </section>

      {/* New Releases (Bento Grid Layout) */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="font-manrope text-2xl font-bold tracking-tight">New Releases</h3>
          <button className="text-primary font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Feature Card */}
          <Link href="/courses/color-grading-workflows" className="md:col-span-8 group cursor-pointer block">
            <div className="relative aspect-[16/9] md:aspect-auto md:h-full rounded-xl overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp6dUl1m_5hHu-65JwgxBAMTa-L5HwLyOGWS1WHm8dOfFbHka2HvqLdmKRfZjKACrYTtKTgbpJW9sD5zCtwHK8_F4oX3Rf7leEvmbGI_LX5hV5aNLyP0X5t2SlMncgf7RZgO9I7PwlGWcjuWhdMRSX21XVoFy1mtNUEPAwS8hf4IXcW9eFfXPFqCrrREtCI9KFyWvrYZ772Z2PeI65-eFqML7GVAB3Sw3eV6AR_hT93USK8alMF25Vzdf7_jHCYrmgSHuyCfuE64M" alt="Color grading workflows" />
              <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-md text-xs font-black tracking-tighter">PRO</div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="mb-2 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[65%]"></div>
                </div>
                <h4 className="text-xl font-bold text-white">Color Grading Workflows for DaVinci Resolve</h4>
                <p className="text-white/70 text-sm">Instructor: Julian Varas</p>
              </div>
            </div>
          </Link>
          
          {/* Smaller Stacking Cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link href="/courses/legacy-lenses" className="bg-surface-container rounded-xl overflow-hidden group cursor-pointer block">
              <div className="relative h-40">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1DMhJGDTHcjLgolwDr9Akljuxa4EFaIIj-pylgRcSVMgN_QnloMGYnTzbjXkW933unz-9K9oMh46-t6pLcYn2xwSagWbGTaiJ9qojMURYLydICvH8JeJW1kuPdfI8UE4TcPh7x63j2O8B4h8RvqQribFcfsIXTVWuWXDGK_X-7v3tdvoSmtkam53Dn0F-DPrF8gRY4YBosOCFCXUjX53zdV7HMCVdCNz1VX7NRuQ0nhKeL-N7pICek9LiDDERb-zvjpvn28TOo4A" alt="Legacy lenses" />
                <div className="absolute top-4 left-4 bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-md text-xs font-black tracking-tighter uppercase">FREE</div>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-on-surface truncate">Legacy Lenses: Finding the Character</h4>
                <p className="text-on-surface-variant text-xs">Elena Rossi</p>
              </div>
            </Link>
            <Link href="/courses/sonic-landscapes" className="bg-surface-container rounded-xl overflow-hidden group cursor-pointer block">
              <div className="relative h-40">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8TjdUoC4sf28d3m0u1KxJMLEmBriXGLzgtSm_-9oCzW1UPY3PK9APIM-hmrwwrfu1cI6FderpPCzqNdYpqjRM6H26XWaAR_YpftkylNa1zvgxehNjRoIb40xPzuRGwwvICt4412orQHpM8llgNvezMr-fT_ZNCFNvuT_qwz3NE3b1Lkr3W9PTERA1aFltZFeTviUKL660m6tLFhp9XT0ktBggrwOgOWfpHRVCr7rWaYqdOKvbDGIhZiuzGdHlKLC07TItSC8THac" alt="Sonic landscapes" />
                <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-md text-xs font-black tracking-tighter">PRO</div>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-on-surface truncate">Sonic Landscapes: The Art of Foley</h4>
                <p className="text-on-surface-variant text-xs">Marcus Sterling</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Most Popular */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h3 className="font-manrope text-2xl font-bold tracking-tight">Most Popular</h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface active:scale-95">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface active:scale-95">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 shadow-inner">
          {/* Card 1 */}
          <Link href="/courses/advanced-lighting" className="flex-shrink-0 w-72 bg-surface-container-low rounded-xl overflow-hidden group cursor-pointer hover:bg-surface-container transition-colors focus:ring-2 focus:ring-primary">
            <div className="relative h-44 overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMM6Z6TAIBy2SnxcWS4GE3L0ZgCo_Bo8cYLxUsX7bwdzqmdjEru5xCZ-rkSn9yZuZhRXWkQV0QyBybyTgd45XQHH2pVqhMZC4ch-riUMVyatJonK3r65fW676bQWcdLQ-odJk-Sg66akfToT-BoYEZ2DF0q9E22-iPoEXio7wuKesCzhBDoA3Y1Zpp6tLVVPVbotrUx1llIp02LsRShJmjrURS-2NaXhUZY2Xp68iuXO4-NA-fWBbo616UEwtodW1zibJ3MxMAqP4" alt="Advanced Lighting" />
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest">14 Lessons</div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-on-surface leading-tight">Advanced Lighting for Commercial Shoots</h4>
                <span className="bg-primary text-on-primary text-[10px] font-black px-2 py-0.5 rounded ml-2">PRO</span>
              </div>
            </div>
          </Link>
          
          {/* Add identical cards representing other options from the concept here */}
        </div>
      </section>
    </div>
  );
}
