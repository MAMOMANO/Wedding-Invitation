import { useState, useEffect } from "react";
import { time } from "./waktu";
import countimage from "../assets/FGM (17).webp";

const pad = (n) => String(n).padStart(2, "0");

export default function Countdown() {
  const [waktu, setWaktu] = useState({ hari: 0, jam: 0, menit: 0, detik: 0 });

  useEffect(() => {
    function hitungWaktu() {
      const selisihMs = Math.max(0, time - new Date());
      const totalDetik = selisihMs / 1000;

      setWaktu({
        hari: Math.floor(totalDetik / 86400),
        jam: Math.floor((totalDetik % 86400) / 3600),
        menit: Math.floor((totalDetik % 3600) / 60),
        detik: Math.floor(totalDetik % 60),
      });
    }

    hitungWaktu(); // langsung hitung sekali, tidak menunggu 1 detik
    const mulai = setInterval(hitungWaktu, 1000);

    return () => clearInterval(mulai);
  }, []);

  const satuan = [
    { nilai: waktu.hari, label: "Days" },
    { nilai: waktu.jam, label: "Hours" },
    { nilai: waktu.menit, label: "Minutes" },
    { nilai: waktu.detik, label: "Seconds" },
  ];

  return (
    <div className="min-h-svh w-full relative flex items-center justify-center px-6">
      <img
        src={countimage}
        alt=""
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative text-white text-center w-full max-w-sm">
        <p className="text-xs font-label tracking-[0.3em] uppercase text-white/70">
          Menuju Hari Bahagia
        </p>
        <div className="w-10 h-px bg-white/40 mx-auto my-5"></div>

        <div className="grid grid-cols-4">
          {satuan.map((item, i) => (
            <div
              key={item.label}
              className={i > 0 ? "border-l border-white/20" : ""}
            >
              <p className="font-display text-4xl font-semibold tabular-nums">
                {pad(item.nilai)}
              </p>
              <p className="mt-1 text-[10px] font-label tracking-widest uppercase text-white/70">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
