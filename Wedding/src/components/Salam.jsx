import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Amplop() {
  const [tersalin, setTersalin] = useState(false);
  const noRekening = "1234567890";
  const salam = useRef();
  const salamkonten = useRef();
  const salamtitle = useRef();
  const salamrek = useRef();
  const salamparagraf = useRef();

  useEffect(() => {
    const trigger = gsap.context(() => {
      const time = gsap.timeline({
        scrollTrigger: {
          trigger: salam.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
      time.from(salamkonten.current,{
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power2.inOut"
      })
    });
    return () => trigger.revert();
  }, []);

  async function handleCopy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(noRekening);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = noRekening;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setTersalin(true);
      setTimeout(() => setTersalin(false), 2000);
    } catch (error) {
      console.error("Gagal menyalin:", error);
    }
  }

  return (
    <section
      ref={salam}
      className="w-full min-h-svh flex items-center justify-center px-6 py-16 bg-black"
    >
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <p
          ref={salamtitle}
          className="text-xs font-label tracking-[0.3em] uppercase text-white/40"
        >
          Wedding Gift
        </p>

        <h2
          ref={salamparagraf}
          className="mt-3 font-display text-4xl font-semibold text-white"
        >
          Tanda Kasih
        </h2>

        <div className="w-10 h-px bg-white/20 my-5"></div>

        <p
          ref={salamkonten}
          className="max-w-xs text-sm font-body leading-relaxed text-white/60"
        >
          Doa dan kehadiran Anda merupakan hadiah terindah bagi kami. Bagi yang
          ingin memberikan tanda kasih, dapat melalui rekening berikut.
        </p>

        <div
          ref={salamrek}
          className="w-full mt-10 bg-white/5 border border-white/15 rounded-2xl px-8 py-8 flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white font-display text-lg font-semibold">
            BCA
          </div>

          <p className="mt-5 text-2xl font-body tracking-[0.2em] text-white">
            {noRekening}
          </p>

          <p className="mt-2 text-xs font-label tracking-widest uppercase text-white/40">
            a.n. Mariano Antonino
          </p>

          <button
            onClick={handleCopy}
            className={`mt-7 w-full px-6 py-3 text-xs font-label tracking-widest uppercase transition-all duration-300 cursor-pointer ${
              tersalin
                ? "bg-emerald-600 text-white border border-emerald-600"
                : "border border-white text-white hover:bg-white hover:text-black"
            }`}
          >
            {tersalin ? "Tersalin ✓" : "Salin Nomor Rekening"}
          </button>
        </div>
      </div>
    </section>
  );
}
