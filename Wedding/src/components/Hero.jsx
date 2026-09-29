import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import bghero from "../assets/FGM (15).webp";

export default function Hero({ handleScroll }) {
  const [ubahTombol, setUbahTombol] = useState(false);
  const nama =
    new URLSearchParams(window.location.search).get("nama") || "Tamu Undangan";
  const overlayRef = useRef();

  function handleBuka() {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => setUbahTombol(true),
    });
  }

  useEffect(() => {
    document.body.style.overflow = ubahTombol ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ubahTombol]);

  return (
    <>
      {!ubahTombol && (
        <div
          ref={overlayRef}
          className="fixed inset-x-0 bottom-0 z-20 flex justify-center pb-8"
        >
          <button
            onClick={handleBuka}
            className="px-8 py-3 cursor-pointer text-white border border-white text-sm font-label tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300"
          >
            Open Invitation
          </button>
        </div>
      )}

      <div className="relative min-h-svh w-full flex flex-col justify-between px-6 pt-16 pb-28 text-white">
        <img
          src={bghero}
          alt=""
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Blok atas */}
        <header className="relative flex flex-col items-center text-center">
          <p className="text-xs font-label tracking-[0.3em] uppercase text-white/80">
            The Wedding Of
          </p>
          <h1 className="mt-3 flex flex-col items-center font-display font-semibold tracking-wide">
            <span className="text-4xl sm:text-5xl">Yosef</span>
            <span className="-my-1 text-2xl italic font-normal text-white/60">
              &
            </span>
            <span className="text-4xl sm:text-5xl">Maria</span>
          </h1>
          <div className="w-12 h-px bg-white/40 my-4"></div>
          <p className="text-sm font-body tracking-widest uppercase text-white/80">
            21 November 2026
          </p>
        </header>

        {/* Blok bawah */}
        <section className="relative max-w-xs flex flex-col gap-1">
          <p className="text-xs font-label tracking-widest uppercase text-white/70">
            Salam Sejahtera
          </p>
          <p className="text-xs font-label tracking-widest uppercase text-white/70">
            Kepada Yth
          </p>
          <div className="w-8 h-px bg-white/40 my-1"></div>
          <p className="text-xl font-display font-medium">{nama}</p>
          <p className="mt-2 text-xs font-body leading-relaxed text-white/70">
            Dengan segala kerendahan hati, kami mengundang Anda untuk turut
            hadir dalam pemberkatan dan resepsi pernikahan kami.
          </p>
        </section>

        {/* Tombol scroll, muncul setelah undangan dibuka */}
        <div
          className={`absolute bottom-8 inset-x-0 flex flex-col items-center gap-1 transition-opacity duration-500 ${
            ubahTombol ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="text-[10px] font-label tracking-widest uppercase text-white/50">
            Scroll
          </span>
          <div className=" animate-bounce">
            <button
              onClick={handleScroll}
              aria-label="Scroll ke bawah"
              className="cursor-pointer text-white/70 text-2xl rotate-90"
            >
              ⟫
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
