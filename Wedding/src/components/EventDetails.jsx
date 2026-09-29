import bgEvent from "../assets/FGM (11).webp";

const acara = [
  {
    judul: "Pemberkatan",
    tanggal: "21 November 2026",
    jam: "Pukul 10:00 - Selesai",
    tempat: "Gereja St. Philipus Rasul",
    alamat:
      "Jalan Teluk Gong Raya No.19 BC, Jl. Teluk Gong Raya 12, RT.12/RW.10, Pejagalan, Penjaringan, Jakarta Utara 14450",
    peta: "https://maps.app.goo.gl/KqDGnfW7jxxUEibX9",
  },
  {
    judul: "Resepsi",
    tanggal: "21 November 2026",
    jam: "Pukul 10:00 - Selesai",
    tempat: "SDS Stella Maris Jakarta",
    alamat:
      "Jalan Teluk Gong Raya No.19 BC, Jl. Teluk Gong Raya 12, RT.12/RW.10, Pejagalan, Penjaringan, Jakarta Utara 14450",
    peta: "https://maps.app.goo.gl/T7v5Cpg2LnrvwEPK9",
  },
];

export default function EventDetails() {
  return (
    <div className="min-h-svh w-full relative flex flex-col items-center justify-center px-6 py-20 text-white text-center">
      <img
        src={bgEvent}
        alt=""
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative flex flex-col items-center gap-14 max-w-xs">
        {acara.map((item, i) => (
          <div
            key={item.judul}
            className={`flex flex-col items-center w-full ${
              i > 0 ? "border-t border-white/20 pt-14" : ""
            }`}
          >
            <h2 className="font-display text-4xl font-semibold">
              {item.judul}
            </h2>
            <div className="w-10 h-px bg-white/40 my-4"></div>

            <p className="text-xs font-label tracking-[0.3em] uppercase text-white/80">
              {item.tanggal}
            </p>
            <p className="mt-1 text-sm font-body text-white/70">{item.jam}</p>

            <p className="mt-5 font-display text-xl">{item.tempat}</p>
            <p className="mt-2 text-xs font-body leading-relaxed text-white/70">
              {item.alamat}
            </p>

            <a
              href={item.peta}
              target="_blank"
              rel="noreferrer"
              className="mt-6 px-6 py-2 border border-white text-xs font-label tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              Lihat Peta
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
