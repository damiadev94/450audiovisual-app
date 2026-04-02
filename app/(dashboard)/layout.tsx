import { TopAppBar } from "@/components/layout/TopAppBar";
import { Navigation } from "@/components/layout/Navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-24 md:pb-0 xl:pl-[280px]">
      <TopAppBar />
      <Navigation />
      
      {/* Background Atmospheric Touches */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-[-1]"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary/5 blur-[150px] rounded-full pointer-events-none z-[-1]"></div>

      <main className="pt-24 px-6 md:px-8 max-w-screen-xl mx-auto">
        {children}
      </main>
    </div>
  );
}
