import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Yuva-X",
    duration: "Sep 2025 – Present",
    location: "Bengaluru, India",
    bullets: [
      "Built scalable & fast UIs using React & Next.js",
      "Enhanced SEO and performance using SSR & optimization",
      "Integrated secure REST APIs using Redux Toolkit",
      "Implemented OAuth 2.0 and protected routes",
    ],
    techStack: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Git",
      "GitHub",
      "Figma",
    ],
  },
  {
    id: 2,
    role: "IT Intern",
    company: "Texas Instruments",
    duration: "Jan 2025 – July 2025",
    location: "Bengaluru, India",
    bullets: [
      "Developed a portal to automate DB workflows",
      "Built dashboards for 3000+ Oracle DBs",
      "Implemented JWT auth + RBAC security",
      "Improved performance and API efficiency",
    ],
    techStack: [
      "React.js",
      "FastAPI",
      "JWT",
      "Bitbucket",
      "Git",
      "Confluence",
    ],
  },
];

export const ExperienceSection = () => {
  const cardsRef = useRef([]);

  useGSAP(() => {
    cardsRef.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    });
  });

  return (
    <section
      id="experience"
      className="min-h-screen bg-black text-white pt-40 pb-32 px-6 sm:px-10
                 rounded-t-[2rem] lg:rounded-t-[4rem]"
    >
      <AnimatedHeaderSection
        subTitle="Journey of Growth 🚀"
        title="Experience"
        text="Real-world impact through innovation & performance-driven engineering."
        textColor="text-white"
        withScrollTrigger
      />

      <div className="max-w-5xl mx-auto grid gap-28 mt-24">
        {experiences.map((exp, i) => (
          <article
            key={exp.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="sticky bg-gradient-to-b from-zinc-900/60 to-zinc-900/30
                       backdrop-blur-xl px-10 py-10 border border-white/10
                       rounded-2xl shadow-lg transition-all duration-300"
            style={{ top: `calc(15vh + ${i * 5}em)` }}
          >
            {/* Role */}
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
              {exp.role}
            </h2>

            {/* Company & Duration */}
            <p className="text-lg md:text-xl text-white/50 font-medium mt-3">
              {exp.company} • {exp.duration} • {exp.location}
            </p>

            {/* Responsibilities */}
            <ul className="mt-8 space-y-6">
              {exp.bullets.map((item, idx) => (
                <li
                  key={idx}
                  className="text-xl lg:text-2xl text-white/80 flex gap-4"
                >
                  <span className="font-mono text-primary/70">0{idx + 1}</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Tech Stack — better visuals */}
            <div className="flex flex-wrap gap-3 mt-10">
              {exp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 text-sm md:text-base bg-white/10
                             border border-white/20 rounded-full backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
