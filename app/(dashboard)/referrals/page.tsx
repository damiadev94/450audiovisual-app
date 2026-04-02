export default function ReferralsPage() {
  return (
    <div className="space-y-12 pb-12 pt-8">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="font-headline font-extrabold text-4xl md:text-6xl tracking-tight text-on-background">
          Grow the Community,<br /><span className="text-primary">Get Rewards</span>
        </h1>
        <p className="font-body text-on-surface-variant max-w-md mx-auto text-lg">
          Your creative journey is better with friends. Share the craft and unlock exclusive auteur benefits.
        </p>
      </section>

      {/* Stats & Reward Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Referral Counter */}
        <div className="md:col-span-1 bg-surface-container rounded-lg p-6 flex flex-col justify-between space-y-8 border border-outline-variant/10">
          <div className="space-y-1">
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Your Impact</span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline font-bold text-4xl text-primary">12</span>
              <span className="font-body text-on-surface-variant">Total Referrals</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-tertiary">pending</span>
              <span className="font-body text-sm">Status: 2 pending</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-sm">info</span>
          </div>
        </div>

        {/* Reward Section */}
        <div className="md:col-span-2 relative overflow-hidden bg-surface-container rounded-lg p-8 border border-outline-variant/10 group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
          </div>
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-tertiary-container/20 text-tertiary px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-label text-xs font-bold uppercase tracking-wider">Active Milestone</span>
            </div>
            <h2 className="font-headline font-bold text-2xl md:text-3xl">Refer 3 friends to unlock a <span className="text-primary">Pro Course</span></h2>
            <div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-2/3 shadow-[0_0_15px_rgba(255,208,94,0.4)]"></div>
            </div>
            <p className="font-body text-sm text-on-surface-variant">1 more referral needed to unlock &quot;Cinematic Lighting Masterclass&quot;</p>
          </div>
        </div>
      </div>

      {/* Referral Link Card */}
      <section className="bg-surface-container-low rounded-lg p-8 space-y-6 border border-outline-variant/5">
        <div className="space-y-2">
          <h3 className="font-headline font-bold text-xl">Your Private Invite Link</h3>
          <p className="font-body text-sm text-on-surface-variant">Each friend who joins using this link earns you 5 tickets.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-surface-container-lowest border border-outline-variant/20 rounded-md px-4 py-4 font-mono text-sm text-on-surface flex items-center overflow-x-auto whitespace-nowrap">
            450audiovisual.com/join/auteur-student-982
          </div>
          <button className="cinematic-gradient text-on-primary font-headline font-bold px-8 py-4 rounded-md flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-lg">content_copy</span>
            Copy Link
          </button>
        </div>

        {/* Share Options */}
        <div className="pt-4 border-t border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant">Quick Share</span>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined">chat</span>
            </button>
            <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined">photo_camera</span>
            </button>
            <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-10 pb-16 pt-8">
        <div className="text-center">
          <h3 className="font-headline font-bold text-2xl">The Director&apos;s Circle</h3>
          <div className="h-1 w-12 bg-primary mx-auto mt-2 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary border border-outline-variant/10">
              <span className="material-symbols-outlined text-3xl">share</span>
            </div>
            <div className="space-y-1">
              <span className="font-headline font-bold">1. Share link</span>
              <p className="font-body text-xs text-on-surface-variant px-4">Send your unique invite to fellow creators and students.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary border border-outline-variant/10">
              <span className="material-symbols-outlined text-3xl">person_add</span>
            </div>
            <div className="space-y-1">
              <span className="font-headline font-bold">2. Friend joins</span>
              <p className="font-body text-xs text-on-surface-variant px-4">They sign up and start their first project with us.</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-highest flex items-center justify-center text-primary border border-outline-variant/10">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
            </div>
            <div className="space-y-1">
              <span className="font-headline font-bold">3. Get reward</span>
              <p className="font-body text-xs text-on-surface-variant px-4">Unlock courses, tickets, and pro-level editing tools.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
