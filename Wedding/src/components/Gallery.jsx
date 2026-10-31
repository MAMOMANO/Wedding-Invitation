// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { img } from "./img.js";

// export default function Gallery() {
//   const [selected, setSelected] = useState(null);
//   const sectionRef = useRef();
//   const gridRef = useRef();
//   const scrollerRef = useRef();

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(gridRef.current.children, {
//         opacity: 0,
//         y: 30,
//         duration: 0.6,
//         ease: "power2.out",
//         stagger: 0.08,
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top 75%",
//           toggleActions: "play none none reverse",
//         },
//       });
//     });

//     return () => ctx.revert();
//   }, []);

//   // Saat lightbox dibuka, langsung scroll ke foto yang diklik
//   useEffect(() => {
//     if (selected !== null && scrollerRef.current) {
//       const slide = scrollerRef.current.children[selected];
//       slide?.scrollIntoView({ behavior: "instant", inline: "center" });
//     }
//   }, [selected]);

//   return (
//     <section
//       ref={sectionRef}
//       className="min-h-svh w-full bg-black flex flex-col items-center px-6 py-20 gap-10"
//     >
//       <div className="flex flex-col items-center text-center">
//         <p className="text-xs font-label tracking-[0.3em] uppercase text-white/50">
//           Our Moments
//         </p>
//         <h2 className="mt-3 font-display text-4xl font-semibold text-white">
//           Galeri Foto
//         </h2>
//         <div className="w-10 h-px bg-white/30 mt-5"></div>
//       </div>

//       <div
//         ref={gridRef}
//         className="w-full max-w-md grid grid-cols-3 auto-rows-27.5 gap-1.5"
//       >
//         {img.map((item, i) => (
//           <button
//             key={i}
//             onClick={() => setSelected(i)}
//             className={`relative overflow-hidden cursor-pointer group ${
//               i % 5 === 0 ? "col-span-2 row-span-2" : ""
//             }`}
//           >
//             <img
//               src={item.foto}
//               alt=""
//               className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//             />
//             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
//           </button>
//         ))}
//       </div>

//       {selected !== null && (
//         <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
//           <button
//             onClick={() => setSelected(null)}
//             aria-label="Tutup"
//             className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-white text-2xl cursor-pointer"
//           >
//             ×
//           </button>

//           <div
//             ref={scrollerRef}
//             className="flex-1 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
//             style={{ scrollbarWidth: "none" }}
//           >
//             {img.map((item, i) => (
//               <div
//                 key={i}
//                 className="snap-center shrink-0 w-full h-full flex items-center justify-center px-6"
//               >
//                 <img
//                   src={item.foto}
//                   alt=""
//                   className="max-w-full max-h-[80vh] object-contain"
//                 />
//               </div>
//             ))}
//           </div>

//           <p className="text-center pb-6 text-xs font-label tracking-widest text-white/50">
//             Geser untuk melihat foto lainnya
//           </p>
//         </div>
//       )}
//     </section>
//   );
// }

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { img } from "./img.js";

// Pola grid untuk TEPAT 9 foto, mengisi 6 baris x 3 kolom tanpa lubang.
//
//   Blok atas (foto 0-4, pink):
//     baris 1-2:  [ BESAR (2x2) ] [ TINGGI ]
//     baris 3:    [ kecil ] [ kecil ] [ kecil ]
//   Blok bawah (foto 5-8, merah):
//     baris 4-5:  [ TINGGI ] [ BESAR (2x2) ]
//     baris 6:    [ LEBAR (2x1) ] [ kecil ]
//
// Urutan kelas ini mengikuti urutan foto di img.js (indeks 0 sampai 8).
// Kalau jumlah foto berubah dari 9, susunan ini harus disesuaikan.
const POLA = [
  "col-span-2 row-span-2", // 0 besar
  "row-span-2", // 1 tinggi
  "", // 2 kecil
  "", // 3 kecil
  "", // 4 kecil
  "row-span-2", // 5 tinggi
  "col-span-2 row-span-2", // 6 besar
  "col-span-2", // 7 lebar
  "", // 8 kecil
];

function kelasKotak(i) {
  return POLA[i] ?? "";
}

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef();
  const gridRef = useRef();
  const scrollerRef = useRef();

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

  // Saat lightbox dibuka, langsung scroll ke foto yang diklik
  useEffect(() => {
    if (selected !== null && scrollerRef.current) {
      const slide = scrollerRef.current.children[selected];
      slide?.scrollIntoView({ behavior: "instant", inline: "center" });
    }
  }, [selected]);

  return (
    <section
      ref={sectionRef}
      className="min-h-svh w-full bg-black flex flex-col items-center px-6 py-20 gap-10"
    >
      <div className="flex flex-col items-center text-center">
        <p className="text-xs font-label tracking-[0.3em] uppercase text-white/50">
          Our Moments
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-white">
          Galeri Foto
        </h2>
        <div className="w-10 h-px bg-white/30 mt-5"></div>
      </div>

      <div
        ref={gridRef}
        className="w-full max-w-md grid grid-cols-3 auto-rows-27.5 gap-1.5"
      >
        {img.map((item, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`relative overflow-hidden cursor-pointer group ${kelasKotak(i)}`}
          >
            <img
              src={item.foto}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          <button
            onClick={() => setSelected(null)}
            aria-label="Tutup"
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-white text-2xl cursor-pointer"
          >
            ×
          </button>

          <div
            ref={scrollerRef}
            className="flex-1 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {img.map((item, i) => (
              <div
                key={i}
                className="snap-center shrink-0 w-full h-full flex items-center justify-center px-6"
              >
                <img
                  src={item.foto}
                  alt=""
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
            ))}
          </div>

          <p className="text-center pb-6 text-xs font-label tracking-widest text-white/50">
            Geser untuk melihat foto lainnya
          </p>
        </div>
      )}
    </section>
  );
}
