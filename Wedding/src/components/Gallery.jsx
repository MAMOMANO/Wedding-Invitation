import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { img } from "./img.js";

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const fotoRef = useRef();

  function handleNext() {
    setIndex((prevIndex) => (prevIndex < img.length - 1 ? prevIndex + 1 : 0));
  }
  function handleBack() {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : img.length - 1));
  }

  useEffect(() => {
    gsap.fromTo(
      fotoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power1.out" },
    );
  }, [index]);

  return (
    <section className="min-h-svh w-full bg-black flex flex-col items-center justify-center px-6 py-16 gap-6">
      <p className="text-xs font-label tracking-[0.3em] uppercase text-white/50">
        Our Moments
      </p>

      <div className="relative w-full max-w-sm aspect-4/5 overflow-hidden">
        <img
          ref={fotoRef}
          src={img[index].foto}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="w-full h-full object-cover bg-black/45 absolute"></div>

        <button
          onClick={handleBack}
          aria-label="Foto sebelumnya"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
        >
          ⟪
        </button>
        <button
          onClick={handleNext}
          aria-label="Foto berikutnya"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
        >
          ⟫
        </button>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-1.5">
          {img.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
        <p className="text-xs font-label tracking-widest text-white/40">
          {index + 1} / {img.length}
        </p>
      </div>
    </section>
  );
}
