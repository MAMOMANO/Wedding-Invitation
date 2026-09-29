import wanita from "../assets/FGM (18).webp";
export default function MempelaiWanita() {
  return (
    <div className="flex flex-col relative w-full items-start justify-end min-h-svh px-6 pb-16">
      <img
        src={wanita}
        alt="Mempelai pria"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

      <div className="relative text-white max-w-xs">
        <p className="text-xs font-label tracking-[0.3em] uppercase text-white/70">
          The Groom
        </p>
        <h2 className="font-display text-5xl font-semibold mt-3">Maria</h2>
        <div className="w-10 h-px bg-white/40 my-4"></div>
        <h3 className="font-body text-xl">Maria Mahdalena Dwi Setyorini</h3>

        <p className="mt-5 text-xs font-label tracking-widest uppercase text-white/60">
          Putri Pertama Dari
        </p>
        <p className="mt-1 font-body text-base text-white/90 leading-relaxed">
          Bapak Ignasius Ngembang
          <br />& Ibu Fransiska Nggola
        </p>
      </div>
    </div>
  );
}
