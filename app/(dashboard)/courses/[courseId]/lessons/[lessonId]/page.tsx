"use client";

import Link from "next/link";
// import Vimeo from "@u-wave/react-vimeo"; // You will need to install @u-wave/react-vimeo

export default function LessonViewPage({ params }: { params: { courseId: string, lessonId: string } }) {
  // En producción, aquí tendrías un fetch a tu backend pasándole tu "lessonId" para obtener la ID del video de Vimeo.
  const dummyVimeoId = "76979871"; 

  return (
    <div className="-mt-24 pb-24 md:pb-0">
      {/* Immersive Video Player Section */}
      <section className="relative w-full aspect-video bg-black group md:rounded-b-3xl overflow-hidden shadow-2xl">
        {/* Placeholder para Vimeo integration. Cuando instales la librería, descomenta la etiqueta Vimeo y elimina el dev placeholder */}
        {/* <Vimeo 
          video={dummyVimeoId} 
          autoplay={false}
          responsive={true}
          className="w-full h-full"
        /> */}
        
        {/* Development Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-surface-container-lowest">
          <div className="text-center space-y-4">
            <span className="material-symbols-outlined text-6xl text-primary/50">play_circle</span>
            <p className="text-on-surface-variant font-headline font-bold">Vimeo Player (ID: {dummyVimeoId})</p>
            <p className="text-xs text-outline font-body">Instalar @u-wave/react-vimeo para habilitar</p>
          </div>
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between px-6 py-4 bg-surface-container-low border-b border-outline-variant/10">
        <button className="flex items-center gap-2 text-sm font-medium text-on-surface/60 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
          Previous
        </button>
        <button className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-container transition-colors">
          Next Lesson
          <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
        </button>
      </div>

      {/* Lesson Info */}
      <div className="px-6 md:px-8 py-8 space-y-8 max-w-4xl mx-auto">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-manrope font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">movie</span>
            Cinematography Essentials
          </div>
          <h2 className="text-3xl font-manrope font-extrabold tracking-tight text-white leading-tight">The Art of Natural Lighting</h2>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest text-primary">
              <span className="material-symbols-outlined">task_alt</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Completed?</p>
              <p className="text-xs text-on-surface/60 mt-1">Mark this lesson as finished</p>
            </div>
          </div>
          {/* Toggle Switch */}
          <div className="w-12 h-6 bg-surface-container-highest rounded-full p-1 relative cursor-pointer group">
            <div className="w-4 h-4 bg-on-surface/40 rounded-full transition-all group-hover:bg-primary"></div>
          </div>
        </div>

        {/* Tabs/Sections */}
        <div className="space-y-8">
          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-manrope font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">description</span>
              Lesson Overview
            </h3>
            <p className="text-on-surface/80 leading-relaxed text-sm">
              In this session, we dive deep into the philosophy of &quot;The Director&apos;s Lens.&quot; You will learn how to harness ambient light to create atmospheric depth without relying on artificial sources.
            </p>
          </div>

          {/* Notes Field */}
          <div className="space-y-4">
            <h3 className="text-lg font-manrope font-bold text-white">Private Notes</h3>
            <div className="relative">
              <textarea 
                className="w-full bg-surface-container-lowest outline-none rounded-xl p-4 text-sm text-on-surface placeholder:text-on-surface/30 focus:ring-1 focus:ring-primary/20 min-h-[120px] transition-all border border-transparent focus:border-primary/20" 
                placeholder="Add a private note for your future self..."
              ></textarea>
              <button className="absolute bottom-4 right-4 bg-primary text-on-primary font-bold px-4 py-2 rounded-lg text-xs hover:bg-primary-container transition-colors">
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
