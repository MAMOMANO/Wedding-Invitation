import { useEffect, useRef } from "react";
import gsap from "gsap";
import bgClose from "../assets/FGM (21).webp";

export default function Close() {
  const sectionRef = useRef();
  const pClose = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const time = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
      time.from(pClose.current, {
        opacity: 0,
        y: 60,
        duration: 1.8,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center w-full min-h-svh relative p-6"
    >
      <img
        src={bgClose}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-black/45"></div>
      <p
        ref={pClose}
        className="absolute top-24 text-start text-xs text-white/70 uppercase font-body px-6 italic max-w-xs"
      >
        Atas kehadiran dan do'a restu dari Bapak/Ibu/Saudara/i sekalian kami
        ucapkan Terima Kasih
      </p>
    </div>
  );
}