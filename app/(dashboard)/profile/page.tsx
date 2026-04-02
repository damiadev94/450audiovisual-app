export default function ProfilePage() {
  return (
    <div className="space-y-10 pb-24 pt-8 max-w-3xl mx-auto">
      {/* Profile Header Section */}
      <section className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary to-primary-container shadow-[0_0_30px_rgba(255,208,94,0.15)]">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFW0xbVan10XubEmZxYHfBoq5kHOAU7Jkq6fzC_nGvOCM7XlnBJ0UVcWmUzw6k2LAsiMTC6flu9RsIeJJJjoIvItIHQPAgxTYjuAz4bxhCWi-q5zvpnmx0On29bi11npQ6I2EUY4StEqqrtDHekAYCZj9CWNB83mnyUpIdFz33qransFjg3tzJB_Xfp0hrOspb0VuM3ygmAP0bMZj7rZ1u-fq63wuGl88bnmKbcnIye-t7pRaTtg1rL34xpXufTjA3Rog-afc4HrY" 
              alt="Auteur Student" 
              className="w-full h-full object-cover rounded-full" 
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase shadow-md">
            PRO MEMBER
          </div>
        </div>
        <div className="space-y-1 mt-4">
          <h2 className="font-headline font-bold text-3xl tracking-tight text-on-surface">Auteur Student</h2>
          <p className="text-on-surface-variant text-sm font-body">premium-member-992@450av.com</p>
        </div>
      </section>

      {/* Subscription Status Card */}
      <section className="bg-surface-container-low rounded-lg p-6 space-y-6 border border-outline-variant/10 shadow-sm">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-headline text-lg font-bold text-primary">Your Plan: Pro Annual</h3>
            <p className="text-on-surface-variant text-sm font-body">Active since January 2024</p>
          </div>
          <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
        </div>
        <div className="flex items-center gap-3 p-4 bg-surface-container rounded-lg">
          <span className="material-symbols-outlined text-on-surface-variant">event</span>
          <div className="text-sm">
            <span className="text-on-surface-variant">Next billing on </span>
            <span className="text-on-surface font-semibold">Dec 20, 2026</span>
          </div>
        </div>
        <button className="w-full cinematic-gradient text-on-primary font-headline font-bold py-3 rounded-md active:scale-[0.98] transition-all shadow-md">
          Manage Subscription
        </button>
      </section>

      {/* Payment Method */}
      <section className="space-y-4">
        <h3 className="font-headline text-sm font-bold tracking-widest uppercase text-on-surface-variant px-1">Payment Method</h3>
        <div className="bg-surface-container-low rounded-lg p-4 flex items-center justify-between border border-outline-variant/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-surface-container-highest rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface">credit_card</span>
            </div>
            <div>
              <p className="text-on-surface font-medium font-body">Visa ending in 4242</p>
              <p className="text-on-surface-variant text-xs font-body">Expires 12/28</p>
            </div>
          </div>
          <button className="text-primary text-sm font-bold font-headline px-4 py-2 hover:bg-surface-container transition-colors rounded-full">
            Change Card
          </button>
        </div>
      </section>

      {/* Account Settings */}
      <section className="space-y-4">
        <h3 className="font-headline text-sm font-bold tracking-widest uppercase text-on-surface-variant px-1">Account Settings</h3>
        <div className="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/5">
          <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container transition-colors group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">mail</span>
              <div className="text-left">
                <p className="text-on-surface font-medium">Email</p>
                <p className="text-on-surface-variant text-xs">premium-member-992@450av.com</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>
          <div className="h-px bg-outline-variant/10 mx-5"></div>
          <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container transition-colors group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">lock</span>
              <div className="text-left">
                <p className="text-on-surface font-medium">Password</p>
                <p className="text-on-surface-variant text-xs">Updated 3 months ago</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>
          <div className="h-px bg-outline-variant/10 mx-5"></div>
          <button className="w-full flex items-center justify-between p-5 hover:bg-surface-container transition-colors group">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">notifications</span>
              <div className="text-left">
                <p className="text-on-surface font-medium">Notifications</p>
                <p className="text-on-surface-variant text-xs">Push, Email, SMS</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Billing Management Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-headline text-sm font-bold tracking-widest uppercase text-on-surface-variant">Billing History</h3>
          <button className="text-tertiary text-xs font-bold font-headline uppercase tracking-tight hover:underline">View All</button>
        </div>
        <div className="space-y-2">
          {/* Invoice Item 1 */}
          <div className="bg-surface-container-lowest/50 border border-outline-variant/10 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-on-surface font-medium font-body text-sm">Dec 2025 Subscription</p>
              <p className="text-on-surface-variant text-xs font-body">Dec 20, 2025 • $299.00</p>
            </div>
            <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">download</span>
              <span className="text-xs font-bold uppercase tracking-tighter">PDF</span>
            </button>
          </div>
          {/* Invoice Item 2 */}
          <div className="bg-surface-container-lowest/50 border border-outline-variant/10 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-on-surface font-medium font-body text-sm">Dec 2024 Subscription</p>
              <p className="text-on-surface-variant text-xs font-body">Dec 20, 2024 • $299.00</p>
            </div>
            <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-lg">download</span>
              <span className="text-xs font-bold uppercase tracking-tighter">PDF</span>
            </button>
          </div>
        </div>
      </section>

      {/* Logout */}
      <section className="pt-8">
        <button className="w-full flex items-center justify-center gap-2 text-error font-headline font-bold py-4 hover:bg-error/5 transition-colors rounded-lg border border-transparent hover:border-error/20">
          <span className="material-symbols-outlined">logout</span>
          Log Out
        </button>
        <p className="text-center text-[10px] text-on-surface-variant uppercase tracking-[0.2em] mt-4 opacity-40">450audiovisual v1.0.4</p>
      </section>
    </div>
  );
}
