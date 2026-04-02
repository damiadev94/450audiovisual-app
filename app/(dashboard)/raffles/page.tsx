import Link from "next/link";

export default function RafflesPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* User Stats Section */}
      <section className="bg-surface-container-low rounded-lg p-6 flex items-center justify-between shadow-sm mt-8">
        <div className="space-y-1">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Your Tickets</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-headline font-extrabold text-primary">15</span>
            <span className="text-on-surface-variant text-sm">Active</span>
          </div>
          <Link href="/referrals" className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
            How to get more
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="relative w-24 h-24 bg-surface-container-lowest rounded-xl flex items-center justify-center overflow-hidden border border-outline-variant/10">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(var(--color-primary) 1px, transparent 1px)", backgroundSize: "8px 8px" }}></div>
          <span className="material-symbols-outlined text-4xl text-primary/50" style={{ fontVariationSettings: "'FILL' 1" }}>confirmation_number</span>
        </div>
      </section>

      {/* Featured Prize Card */}
      <section className="relative group">
        <div className="relative bg-surface-container rounded-lg overflow-hidden border border-outline-variant/10 shadow-2xl">
          {/* Image Container */}
          <div className="h-[420px] relative">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAon1U-EmvEr3-rdDLbSgyvDaFT6bxg5J8V0xypJQ_0puh7pXHDXBOUVqhxbF3TvS0N7GGVjXWd1eFZFy-VIGlqz6aPUPj1kvXYPyVaQojgMydnt5LnWbpSi2k7zp-fJLHreMKmD8KOueRU2uHL0Hkmy0eblCx3xmUuWv3aYxG4gBG0nKhK3dB48f4wJ5w84JgrGaA5CRXhTM9I0TLlUY3Zq6OtxL1MYgf1nTt7VRf2cgAlp05ZWPCb7Fd5qpPzRp7juaZC-7Vpbw" 
              alt="Fujifilm X-T5" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
            
            {/* Countdown Overlay */}
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">timer</span>
              <span className="text-xs font-headline font-bold tracking-tight">Ends in: <span className="text-primary">12d 05h 43m</span></span>
            </div>
          </div>
          
          {/* Prize Details */}
          <div className="p-8 -mt-20 relative z-10 space-y-4">
            <div className="space-y-1">
              <p className="text-primary font-label text-xs uppercase tracking-[0.2em] font-bold">Current Monthly Raffle</p>
              <h2 className="text-3xl font-headline font-extrabold leading-tight text-on-surface">Fujifilm X-T5 Creator Kit</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm">Elevate your production with the ultimate APS-C powerhouse, including the 18-55mm lens and a pro rigging cage.</p>
            </div>
            <button className="w-full cinematic-gradient py-4 rounded-md font-headline font-extrabold text-on-primary text-lg tracking-tight active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(255,208,94,0.2)]">
              Enter Now
            </button>
            <p className="text-center text-[10px] text-on-surface-variant/60 uppercase tracking-widest">1 ticket = 1 entry per month</p>
          </div>
        </div>
      </section>

      {/* Past Winners */}
      <section className="space-y-6">
        <h3 className="text-xl font-headline font-bold flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">history</span>
          Past Winners
        </h3>
        <div className="grid gap-4">
          {/* Winner Row 1 */}
          <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-lg hover:bg-surface-container transition-colors">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-outline-variant/30 flex-shrink-0">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM7VvUjw8GcNJMfou2A0Dl575LUUXkyARX2BkWZGUYQWGW06Wr5mDZh-qWHchbW2Z7WN_6DQNxn6rLyuw-H1j6FFBp4Fk599xqKFi-wJ_GtRKCE0VmIbnhnvNEC2Vb2IEc3Ao8TVSTR0diFUF-S2wcFLI114hHSKjB5tbsoID_TBUKH_f3MPXOuRdu2cQLzVraVczmcn-AtPvucK6__2MA77WnuymfOtva1ySVMMQRsBPPbTTdOxXJL_K5TB2W9tvsc0k8iCEM8HI" alt="Marcus" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-headline font-bold">Marcus Chen</p>
              <p className="text-xs text-on-surface-variant">Won DJI Mic 2 Wireless System</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Oct &apos;23</p>
            </div>
          </div>
          
          {/* Winner Row 2 */}
          <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-lg hover:bg-surface-container transition-colors">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-outline-variant/30 flex-shrink-0">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWR3JkIg_TKBMyijzomMY3DXzCvW14auXm5peHqNtIzZ3tX8TiN_o8viL0k9dsrG2j2bPNXrWSjNRNWGM_bYaMTB0ETnbFG-pEZY1wCyPXD-RFevCCd5NlgNs3nPmgEYAnfQw1uYd-48ZHeT5f2COqgkMy9m3-PEPb8VxNowrP1IhakxgKcO_uLT4PvenJPUu438SE-pkSJvkPgavrskx4AlxqCsPwb7YBGMTaoabUr7nyYXQrRayaKffdTuAPVHPF2SrcRc4rn3Q" alt="Elena" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-headline font-bold">Elena Rodriguez</p>
              <p className="text-xs text-on-surface-variant">Won Blackmagic Design Atem Mini</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Sep &apos;23</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rules & Eligibility */}
      <footer className="pt-8 pb-4 space-y-6 text-center border-t border-outline-variant/10">
        <div className="flex justify-center gap-8 text-xs font-medium text-on-surface-variant">
          <a href="#" className="hover:text-primary transition-colors">Official Rules</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Entry</a>
        </div>
        <p className="text-[10px] text-on-surface-variant/40 leading-relaxed max-w-xs mx-auto">
          No purchase necessary. Open only to legal residents of the 50 US states & DC. Ends Dec 31, 2023. See full rules for eligibility and odds.
        </p>
      </footer>
    </div>
  );
}
