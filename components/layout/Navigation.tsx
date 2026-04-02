"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: "home", href: "/" },
    { label: "Library", icon: "video_library", href: "/courses" },
    { label: "Raffles", icon: "local_activity", href: "/raffles" },
    { label: "Profile", icon: "person", href: "/profile" },
  ];

  return (
    <>
      {/* Mobile Bottom NavBar */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-[#131313]/70 backdrop-blur-xl border-t border-[#353534]/15">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-3 transition-all active:scale-90 ${
                isActive
                  ? "bg-primary text-background rounded-full shadow-[0_0_15px_rgba(255,208,94,0.3)]"
                  : "text-on-surface opacity-60 hover:opacity-100"
              }`}
            >
              <span 
                className="material-symbols-outlined" 
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              {/* Only show text on non-active items, or optional. Adjusted per design. */}
              {!isActive && (
                <span className="font-headline text-[10px] uppercase tracking-widest mt-1">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Desktop Sidebar (Optional matching behavior to original design) */}
      <aside className="hidden xl:flex fixed inset-y-0 left-0 z-[60] flex-col p-6 h-full w-[280px] bg-background shadow-[40px_0_40px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out border-r border-outline-variant/10">
        <div className="flex flex-col space-y-1 mb-8 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBD_h09vPW8l42UKQ5Xj9OPpDVTIX6OMqUc_-mV9v-S7r-JbSiHrzvqnHs3W3jBxkASYhObIQd8GGDQVrWfNnfYz6IjCsUNSZIu2usqCLuZcwZJUMIyI0-ZNGcdRuMjKp6uLtaXervuAsO629cwhxTJ1rEQdhsmXFKUeXQY38HEE4FMdSQedyRA0w1Rpg2yRka5fGU-slwr2Oub_taTOoOX-7GgsAlt1Q9hhIsmV0zac6tgSy0wBkeiQcItdkkW2LxOiXq6hwdHtZY"
                alt="user avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-headline font-bold text-base text-on-surface">Auteur Student</h4>
              <p className="font-headline text-xs text-primary font-medium">Pro Member</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg font-headline font-medium text-base transition-all ${
                    isActive
                      ? "text-primary bg-surface-container"
                      : "text-on-surface opacity-80 hover:bg-surface-container hover:text-white"
                  }`}
                >
                  <span 
                    className="material-symbols-outlined"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
            
            <div className="h-px bg-outline-variant/10 my-4"></div>
            
            <Link
              href="/referrals"
              className={`flex items-center gap-4 px-4 py-3 rounded-lg font-headline font-medium text-base transition-all ${
                pathname === "/referrals"
                  ? "text-primary bg-surface-container"
                  : "text-on-surface opacity-80 hover:bg-surface-container hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined">group_add</span>
              Referral Program
            </Link>
          </nav>
        </div>
        <div className="mt-auto">
          <p className="font-headline text-xs text-on-surface-variant opacity-50">v1.0.4</p>
        </div>
      </aside>
    </>
  );
}
