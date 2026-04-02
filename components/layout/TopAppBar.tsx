import Link from "next/link";
import Image from "next/image";

interface TopAppBarProps {
  userImage?: string;
}

export function TopAppBar({ userImage }: TopAppBarProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#131313]/70 backdrop-blur-xl flex justify-between items-center px-6 py-4 shadow-[0_20px_40px_rgba(229,226,225,0.05)]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline/20">
          <img
            src={userImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuB7O9nfQTXWwktbQs4zXyy-zLQFgpcsC0NC6g-e5rPhfwi_pVYZUIW1sTkFDgSjTile-7gJhTrqnRzv933CjKgx-V16tqdAAlKgTEGGT2Q2RffdjadRWDkANDhOvWXsXKsLgMZBml4yl1b5HxCcuvfcNz9vVsV9Fu8pzh0yQUhONE0oi-n1O_breb1zvDFoNoPVQ8odWzWtfRx2EMGqaxr3A5CaGcVaVw1MOW1-z8VgVu5enyL8npsk9YHMpuuEkWJPBU6QNymNMkQ"}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-primary font-headline font-extrabold tracking-tighter text-xl">450audiovisual</div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-primary hover:bg-surface-variant transition-colors p-2 rounded-full active:scale-95 transition-transform">
          <span className="material-symbols-outlined">search</span>
        </button>
        <button className="text-on-surface hover:bg-surface-variant transition-colors p-2 rounded-full active:scale-95 transition-transform relative hidden md:block">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        {/* Desktop links visible on larger screens */}
        <nav className="hidden md:flex gap-8 ml-8">
          <Link href="/" className="text-primary font-headline font-bold text-sm tracking-tight transition-colors">Home</Link>
          <Link href="/courses" className="text-on-surface font-headline font-bold text-sm tracking-tight hover:text-primary transition-colors">Courses</Link>
          <Link href="/raffles" className="text-on-surface font-headline font-bold text-sm tracking-tight hover:text-primary transition-colors">Events</Link>
          <Link href="/referrals" className="text-on-surface font-headline font-bold text-sm tracking-tight hover:text-primary transition-colors">Community</Link>
        </nav>
      </div>
    </header>
  );
}
