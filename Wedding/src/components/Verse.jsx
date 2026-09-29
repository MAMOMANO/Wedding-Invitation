import { useEffect, useRef } from "react";
import gsap from "gsap";
import bgverse from "../assets/FGM (14).webp";
import ScrollTrigger from "gsap/ScrollTrigger.js";

export default function Verse({ ref }) {
  const cardSalam = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const time = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
      time.from(cardSalam.current, {
        opacity: 0,
        y: 60,
        duration: 1.8,
        ease: "power2.out",
      });
    });

    return () => ctx.revert(); // kembalikan elemen + matikan ScrollTrigger
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col min-h-svh w-full items-start justify-start px-4 relative"
    >
      <img
        src={bgverse}
        alt=""
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div
        ref={cardSalam}
        className="relative max-w-sm px-6 text-start text-white/70 pt-20"
      >
        <p className="font-body text-sm leading-relaxed font-normal">
          TUHAN Allah berfirman: "Tidak baik, kalau manusia itu seorang diri
          saja. Aku akan menjadikan penolong baginya, yang sepadan dengan dia."
        </p>
        <div className="w-8 h-px bg-white/40 my-2"></div>
        <p className="text-xs font-label uppercase tracking-widest text-white/70">
          Kejadian 2:18
        </p>
      </div>
    </div>
  );
}
