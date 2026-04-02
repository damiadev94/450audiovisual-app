import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="cinematic-gradient text-on-primary font-label text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full inline-block mb-2 shadow-[0_0_15px_rgba(255,208,94,0.3)]">
            PRO MEMBER
          </span>
          <h1 className="font-headline font-extrabold text-3xl md:text-5xl text-on-surface tracking-tight">
            Welcome back, <span className="text-primary">Julian</span>
          </h1>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">bolt</span>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant font-medium">Daily Streak</p>
              <p className="text-on-surface font-bold">12 Days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Continue Learning Card */}
        <div className="md:col-span-8 group relative overflow-hidden bg-surface-container rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-outline-variant/10">
          <div className="absolute inset-0 z-0 opacity-40 transition-transform duration-700 group-hover:scale-105">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7r8lR4KwWfivxdcpy0h1xwBr8XJCcyUwQk5U8GuHd5AU2R83pa6VHdX8KX1wVN299_4PjwiCv2iWQHGGp5TdZirXbJ4jDZiIlG3bUquqkwoTRez7nXgliLfL42JvaBx-2XXwq_YwmksOKYkehQLgQ5g-gRuqjtgnUt823GzPlLunMqRT42dctciUgB07xkvU6xYzAII1TpVimX63i21CL5iMkVqkuBDqpfEtijihS9pnTKqwXCNpxkq6SwRnKF5IUYevCX9roJzg"
              alt="Cinematic shot"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/60 to-transparent"></div>
          </div>
          <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[320px]">
            <div className="space-y-4">
              <div>
                <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Continue Learning</p>
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">Cinematography Essentials</h2>
              </div>
              <div className="space-y-2 max-w-md">
                <div className="flex justify-between text-xs text-on-surface-variant">
                  <span>Module 4: Lighting Theory</span>
                  <span>65%</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full cinematic-gradient w-[65%] rounded-full shadow-[0_0_10px_rgba(255,208,94,0.4)]"></div>
                </div>
              </div>
              <Link href="/courses/cinematography-essentials" className="cinematic-gradient flex items-center gap-2 text-on-primary font-bold px-8 py-3 rounded-md active:scale-95 transition-all w-fit shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                Resume Lesson
              </Link>
            </div>
          </div>
        </div>

        {/* Weekly Goals Widget */}
        <div className="md:col-span-4 bg-surface-container-low rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-6 border border-outline-variant/5">
          <h3 className="font-headline font-bold text-lg text-on-surface-variant">Weekly Goals</h3>
          <div className="relative w-36 h-36">
            <svg className="w-full h-full transform -rotate-90">
              <circle className="text-surface-container-highest" cx="72" cy="72" fill="transparent" r="60" strokeWidth="8" stroke="currentColor"></circle>
              <circle className="text-primary" cx="72" cy="72" fill="transparent" r="60" strokeWidth="8" stroke="currentColor" strokeDasharray="377" strokeDashoffset="151" strokeLinecap="round"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-headline font-extrabold text-on-surface">3/5</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-tighter">Lessons</span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed px-4">
            You&apos;re on track to finishing <span className="text-on-surface font-semibold">Cinematography Essentials</span> by Sunday.
          </p>
        </div>
      </div>

      {/* Recommended Courses */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="font-headline font-bold text-2xl">Recommended for You</h2>
          <Link href="/courses" className="text-primary text-sm font-medium hover:underline underline-offset-4">Browse all</Link>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {[
            {
              title: "Color Grading in Resolve",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhJxW6F5gR7Odk464frnxCJlQTwlxu6kn3EGIhawL_6mZ3iD9_VrVXvyYr-1ziNWuiqRgI9oymDGWhHu23eaTx21K8tNiKsTpOWrFmTHyECS98HkedR8qTB_SFi9Mqnwgsi41jmYuu0-8V2Ngnnx68TUaY8pfKXSHa3UrY58ouocRX1NLJLsUTsIF99akERXcpTLDTIg6V1TJftHyLjuD1t9HsTLRXcNDjsMW8Ewh0mEfU6YpO89sXY5Q0uR-MvDIHjrfWpmJ6EK8",
              tag: "PRO",
              tagColor: "primary",
              desc: "12 Lessons • 4.5h"
            },
            {
              title: "Sound Design Mastery",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5b9zs3cOMFrgJ9nxZDeU3Jxj2L8MlyCcHqx4GGO4MtgPVd2SDWht5IVwbH_pSXopFUS7FIJq929Uw0pqZx5M7DACTQf0FMrpYVg6_42xe_wrbXdcjfnhTtUdkwhc0LJWJlxDbJty9cjLZgykIZ1PfP9ptWRoiXnVQE7GpD_7u6qjOR5YzgSCymqg-UZqIAPaCyYPyMeia7FyFaGvCQ6cT0H1Y-cpYuHFCAplZy8-pM6vsxtnSX5moQaT0nD-Rui8g7hQsazV0-84",
              tag: "FREE",
              tagColor: "tertiary",
              desc: "8 Lessons • 2.8h"
            },
            {
              title: "Directing Narrative Shorts",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3xLOIJzMy-xZuGyZeZ-DuoM1dBIVq4qLyACHn8ccCdXlP1LsxjKrJ2YzSiESTE9-zJkNatWXeA1LYNBIgPcYFJ3WMvL3WGQ8H_9Og0Im-YUI_I5BARbDBKUZHe_egqFByms-3-ZzSMhPZFSgaGX8tpzczJegVcJiX2dvhqYkyt0WsI32rwoLxq5e7CBd-bg60yw1AIkRrRecuV5-U9YBl7cLTWlxEqLyMMq4Trr-WYoJnNHSZ6bw-cmXlflzqm-fgEZBByL_pOjE",
              tag: "PRO",
              tagColor: "primary",
              desc: "24 Lessons • 6.2h"
            },
            {
              title: "Advanced Editing Workflow",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6gdk5hmTGJ19scjwPW5bDaKKWl5Hz8zZhS029URBr17gsrSmac6WW9cbgvEaaaPip2gFmOn-UZO4RM1HeUE5ybVmL5MosoU6sHyDidm-qEX0ub3p4l5b0X9kvvdl6v8pvMvtnRIWoFZLpK6q4P8-MVe7bmwfH-S3pnW16VA_uxj9HfnrPviHiYz-tp30iNNQkoxS1Q6uzg7ctPL2iiE9pc6DwoQed065Wq_FGhYJdgmKgUk3U7tlkglV5RDOyK5BDA5sBgLK_qcc",
              tag: "PRO",
              tagColor: "primary",
              desc: "15 Lessons • 3.5h"
            }
          ].map((course, i) => (
            <Link href="/courses" key={i} className="flex-none w-72 group cursor-pointer block">
              <div className="aspect-video rounded-lg overflow-hidden relative mb-4 bg-surface-container-highest">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={course.image} alt={course.title} />
                <div className={`absolute top-2 right-2 px-2 py-1 bg-surface-container-lowest/80 backdrop-blur-md rounded text-[10px] font-bold text-${course.tagColor}`}>
                  {course.tag}
                </div>
              </div>
              <h3 className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors">{course.title}</h3>
              <p className="text-sm text-on-surface-variant mt-1">{course.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Monthly Raffle Card */}
      <section className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <span className="text-primary font-label text-[10px] uppercase tracking-[0.2em] font-bold">Monthly Raffle</span>
              <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface">Sony A7S III Giveaway</h2>
              <p className="text-on-surface-variant max-w-sm">Level up your kit with the ultimate low-light beast. Entries close in 3 days.</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest rounded-lg text-xl font-bold font-headline">03</div>
                <span className="text-[10px] uppercase text-on-surface-variant mt-1 block">Days</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest rounded-lg text-xl font-bold font-headline">14</div>
                <span className="text-[10px] uppercase text-on-surface-variant mt-1 block">Hrs</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest rounded-lg text-xl font-bold font-headline">52</div>
                <span className="text-[10px] uppercase text-on-surface-variant mt-1 block">Min</span>
              </div>
            </div>
            <Link href="/raffles" className="w-fit cinematic-gradient text-on-primary font-bold px-10 py-4 rounded-md active:scale-95 transition-all shadow-xl shadow-primary/10">
              Get Tickets
            </Link>
          </div>
          <div className="relative min-h-[300px] bg-surface-container-highest">
            <img className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFF1qIqFOKSM0wywi2TiT5-22Z4tAbKH7OT1YGXAGAWtfPMFwu3H-8Po5ICmPkhLtuhQWwSaJwXjb9d73QtshIh9uoJSrmKNWk82MSiLrZU3FEhPCZLQDWiLu3cLjpce-TOvCIynwHe2nVpElbsjbxfPRxIbcjNBFlnS9u1QPZ6pWSYo_YVFXgVfgOI3TGWQSTHe8vbMwSOEhVNmi2z2HFiQSfeFe3-4idTbvh39pj7KUkDPUnjLeKvpcVVJ-NaRAF_e8qsDiwGus" alt="Sony A7S III" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-transparent to-transparent md:block hidden"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent md:hidden"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
