import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import bghero from "../assets/FGM (15).webp";
// GANTI path ini sesuai nama file lagu kamu, taruh filenya di folder src/assets/
import musikLatar from "../assets/musik-latar.mp3";

export default function Hero({ handleScroll }) {
  const [ubahTombol, setUbahTombol] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const nama =
    new URLSearchParams(window.location.search).get("nama") || "Tamu Undangan";
  const overlayRef = useRef();
  const audioRef = useRef();

  function handleBuka() {
    // Mulai muter lagu bareng animasi overlay memudar.
    // .play() itu method bawaan elemen <audio> buat mulai muter.
    // Dibungkus try/catch karena beberapa browser bisa menolak play
    // meski sudah dipicu klik user, biar tidak bikin error yang
    // menghentikan animasi overlay-nya.
    audioRef.current?.play().catch(() => {});

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      onComplete: () => setUbahTombol(true),
    });
  }

  function toggleMute() {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  }

  useEffect(() => {
    document.body.style.overflow = ubahTombol ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ubahTombol]);

  return (
    <>
      {/* loop: lagu ulang terus dari awal kalau sudah habis.
          playsInline: penting khusus iOS Safari, biar audio tidak
          otomatis fullscreen atau berlaku aneh saat diputar. */}
      <audio ref={audioRef} src={musikLatar} loop playsInline />

      {/* Tombol mute/unmute, muncul setelah undangan dibuka */}
      {ubahTombol && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Nyalakan suara" : "Matikan suara"}
          className="fixed top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 shadow-md flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-colors duration-200"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      )}

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
