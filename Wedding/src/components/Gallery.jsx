// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { img } from "./img.js";

// export default function Gallery() {
//   const [index, setIndex] = useState(0);
//   const fotoRef = useRef();

//   function handleNext() {
//     setIndex((prevIndex) => (prevIndex < img.length - 1 ? prevIndex + 1 : 0));
//   }
//   function handleBack() {
//     setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : img.length - 1));
//   }

//   useEffect(() => {
//     gsap.fromTo(
//       fotoRef.current,
//       { opacity: 0 },
//       { opacity: 1, duration: 0.5, ease: "power1.out" },
//     );
//   }, [index]);

//   return (
//     <section className="min-h-svh w-full bg-black flex flex-col items-center justify-center px-6 py-16 gap-6">
//       <p className="text-xs font-label tracking-[0.3em] uppercase text-white/50">
//         Our Moments
//       </p>

//       <div className="relative w-full max-w-sm aspect-4/5 overflow-hidden">
//         <img
//           ref={fotoRef}
//           src={img[index].foto}
//           alt=""
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         <div className="w-full h-full object-cover bg-black/45 absolute"></div>

//         <button
//           onClick={handleBack}
//           aria-label="Foto sebelumnya"
//           className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
//         >
//           ⟪
//         </button>
//         <button
//           onClick={handleNext}
//           aria-label="Foto berikutnya"
//           className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
//         >
//           ⟫
//         </button>
//       </div>

//       <div className="flex flex-col items-center gap-2">
//         <div className="flex gap-1.5">
//           {img.map((_, i) => (
//             <span
//               key={i}
//               className={`h-1 rounded-full transition-all duration-300 ${
//                 i === index ? "w-6 bg-white" : "w-1.5 bg-white/30"
//               }`}
//             />
//           ))}
//         </div>
//         <p className="text-xs font-label tracking-widest text-white/40">
//           {index + 1} / {img.length}
//         </p>
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { img } from "./img.js";

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef();
  const gridRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-svh w-full bg-black flex flex-col items-center px-6 py-16 gap-8"
    >
      <div className="flex flex-col items-center text-center">
        <p className="text-xs font-label tracking-[0.3em] uppercase text-white/50">
          Our Moments
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white">
          Galeri Foto
        </h2>
        <div className="w-10 h-px bg-white/30 my-4"></div>
      </div>

      <div ref={gridRef} className="w-full max-w-md grid grid-cols-3 gap-2">
        {img.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="relative aspect-square overflow-hidden cursor-pointer group"
          >
            <img
              src={item.foto}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center px-6"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            aria-label="Tutup"
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white text-2xl cursor-pointer"
          >
            ×
          </button>

          {selected > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(selected - 1);
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
            >
              ⟪
            </button>
          )}

          {selected < img.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelected(selected + 1);
              }}
              aria-label="Foto berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
            >
              ⟫
            </button>
          )}

          <img
            src={img[selected].foto}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[80vh] object-contain"
          />
        </div>
      )}
    </section>
  );
}
