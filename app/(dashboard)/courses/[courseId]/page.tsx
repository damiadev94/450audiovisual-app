import Link from "next/link";
import Image from "next/image";

export default function CourseViewPage({ params }: { params: { courseId: string } }) {
  return (
    <div className="-mt-24 pb-12">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[750px] w-full overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfTOctK0rmBtWy7ktGnMPevCgZeOAGZZ9U9CRE_oHAGbGmscHg3QIGTusOiDr7I3BLphp7dlDfwtkBYU8nQ00kFNis2lLHxm7Gw1GZvbni3jzo60SsT68GIz-d1rEKARpme5Mv5wlC54Fq234CGhhdMm6N7dI5u2nWevloLj2TpNt0boKUSVQJpBl5Zcc0EpMSPY3b2hUoJdfxObzTwAHS21Lm4aBrYYHjc1TiBnx4raib8mSR9a2EYx33bDGtlWTetMNTYoqaBqc"
            alt="Course Hero"
            className="w-full h-full object-cover grayscale-[20%] brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/80 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-8 z-10 space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-container/20 text-primary text-xs font-label uppercase tracking-widest border border-primary/20">Advanced Series</span>
            <h1 className="text-4xl md:text-6xl font-headline font-extrabold text-white tracking-tighter leading-tight">Advanced Color Grading</h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-6 h-6 rounded-full bg-surface-container-highest border border-outline/30 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX1NmTH6K3MA-1Bd0j27cxa6b_f73AuhjnULscIKQYhFOIUicFDbRsnBi7MNtIqfQ3ALJb73PSFUrjsHE3bohs7VibKO9yTt84kVInf_6koxL752D5kNslBWrnTnH9wjTysJigmS3RBLFaoxMW3zQpS5YvBrlrdxoUP3wVUrcpqxr0cVQ3JZDtfKVGgLHtM2JuIsupl5LORl4Is7oshS9pF02qrCu6l1JLtSwkyNMW0dFHGWyZqFSiDFa4nQkHDoNkLJtxGz_HfVk"
                  alt="Alex Rivers"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-label text-on-surface-variant tracking-wide">Alex Rivers</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-sm">
            <Link href={`/courses/${params.courseId}/lessons/intro`} className="cinematic-gradient text-on-primary font-headline font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,208,94,0.3)] active:scale-95 transition-transform">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              Start Course
            </Link>
            <div className="w-full bg-surface-container-highest/40 h-1.5 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="bg-primary h-full w-[35%] shadow-[0_0_10px_rgba(255,208,94,0.5)]"></div>
            </div>
            <div className="flex justify-between items-center text-xs font-label text-on-surface-variant uppercase tracking-widest">
              <span>35% Completed</span>
              <span>4 of 12 Lessons</span>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="pt-12 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-headline font-bold text-primary">The Visionary’s Workflow</h2>
          <p className="text-on-surface/80 leading-relaxed max-w-2xl font-body">
            Master the art of visual storytelling through color. We don&apos;t just teach the tools; we explore the psychological impact of palettes, the physics of light in digital spaces, and the professional auteur&apos;s approach to the grading suite.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-low p-6 rounded-lg space-y-4">
            <h3 className="font-headline font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary-container">auto_awesome</span>
              What you will learn
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                Complex secondary isolation and skin tone preservation.
              </li>
              <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                Building a cohesive filmic look from scratch using LOG.
              </li>
              <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                Advanced node-tree organization for feature-length projects.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Lesson List */}
      <section className="pt-16 space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-headline font-bold text-white tracking-tight">Curriculum</h2>
          <span className="text-on-surface-variant text-sm font-label uppercase tracking-widest">12h 45m Total</span>
        </div>
        <div className="space-y-4">
          {/* Lesson 1 (Completed) */}
          <Link href={`/courses/${params.courseId}/lessons/lesson-1`} className="bg-surface-container hover:bg-surface-container-high transition-colors p-4 rounded-lg flex items-center gap-4 group cursor-pointer block">
            <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1vBgT3MS-atbvPSL-0d0v3riTd7PRaBBonClkfrR_61DoHewxZSzBVMV8cSucqra3GMe2XbM3Lsq7wTpapcc9r83RdW76S8YIUqFROd0G-865jS8_EH00dWG-d3LW4SsTKQkra34a0FCX8WZqDCT6FZhQ585buwwVr5KDufnt5HEM0iCMUd4QO5fK-Ql68kOl9MK9quNHjmt17l9vJGrWMAQURbHSDsScINCMcUWdA1Jcc2_Ygz8nnC-jReMffKrCKzAocuhmnrQ" alt="Lesson 1" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>
            <div className="flex-grow">
              <h4 className="font-headline font-bold text-on-surface-variant line-through text-sm">Lesson 1: Intro to DaVinci</h4>
              <p className="text-xs font-label text-on-surface/40 mt-1 uppercase tracking-wider">12 min • Finished</p>
            </div>
            <span className="material-symbols-outlined text-on-surface/20">more_vert</span>
          </Link>

          {/* Lesson 2 (Active/Current) */}
          <Link href={`/courses/${params.courseId}/lessons/lesson-2`} className="bg-surface-container-highest border border-primary/20 p-4 rounded-lg flex items-center gap-4 group cursor-pointer block">
            <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPuvFFv_WNP0OkySG1UxqA3kpc9g9cEI44RM3FGBUOhbSs2eCe2nm-IDL1bGj9VfFm0ZJ3oJ6hbtnyI2ZAqQVipMxJ4go8IKRnuPYPoi0RxWrOYX1pvLLpcZ2Oi3sJ_ifM9LKUkd4QRc5aXoksUyOsn8HYi7o0LX4A8H1Hg6hD8w3WHmYNuJPPHX_wQsEAow1sh_6pkcNiF6LBxepqta8KiuUnYTvXvO0BG_tQC-j2xy195_QPEYUuUFKl2ysSDNQS9TykmOS5RO0" alt="Lesson 2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              </div>
            </div>
            <div className="flex-grow">
              <h4 className="font-headline font-bold text-primary text-sm">Lesson 2: Color Space Transform</h4>
              <p className="text-xs font-label text-primary/70 mt-1 uppercase tracking-wider">24 min • Resume</p>
            </div>
            <span className="material-symbols-outlined text-primary">equalizer</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
