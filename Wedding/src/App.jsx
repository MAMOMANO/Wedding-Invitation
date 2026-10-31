import { useRef } from "react";
import Hero from "./components/Hero";
import Verse from "./components/Verse";
import MempelaiPria from "./components/MempelaiPria";
import Countdown from "./components/Countdown";
import MempelaiWanita from "./components/MempelaiWanita";
import EventDetails from "./components/EventDetails";
import Gallery from "./components/Gallery";
import RSVP from "./components/RSVP";
import Close from "./components/Close";
import Amplop from "./components/Salam";
import Generator from "./components/Generator";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
// Foto untuk panel kiri di layar lebar (path dari src/App.jsx)
import fotoPanel from "./assets/FGM (15).webp";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

export default function App() {
  const TargetScroll = useRef(null);
  const params = new URLSearchParams(window.location.search);

  // Halaman generator link (untuk pengantin)
  if (
    params.get("mode") === "generator" &&
    params.get("key") === "yosefmaria2026"
  ) {
    return <Generator />;
  }

  // Nomor rekening hanya tampil kalau link memakai &rek=1
  const tampilRek = params.get("rek") === "1";

  function tombolScroll() {
    TargetScroll.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="bg-black">
      {/* Panel kiri: hanya tampil di layar lebar (lg ke atas), menempel di layar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-svh w-[calc(100%-430px)]">
        <img
          src={fotoPanel}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-10">
          <p className="text-xs font-label tracking-[0.3em] uppercase text-white/80">
            The Wedding Of
          </p>
          <h1 className="mt-4 flex flex-col items-center font-display font-semibold tracking-wide">
            <span className="text-6xl">Yosef</span>
            <span className="-my-1 text-3xl italic font-normal text-white/60">
              &
            </span>
            <span className="text-6xl">Maria</span>
          </h1>
          <div className="w-12 h-px bg-white/40 my-6"></div>
          <p className="text-sm font-body tracking-widest uppercase text-white/80">
            21 November 2026
          </p>
        </div>
      </aside>

      {/* Kolom undangan: penuh di HP, lebar 430px dan di kanan di layar lebar */}
      <main className="relative w-full lg:ml-auto lg:w-107.5">
        <Hero handleScroll={tombolScroll} />
        <Verse ref={TargetScroll} />
        <MempelaiPria />
        <MempelaiWanita />
        <Countdown />
        <EventDetails />
        <Gallery />
        <RSVP />
        {tampilRek && <Amplop />}
        <Close />
      </main>
    </div>
  );
}
