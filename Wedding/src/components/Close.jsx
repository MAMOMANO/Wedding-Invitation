import bgClose from '../assets/FGM (21).webp'

export default function () {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-svh relative p-6">
      <img
        src={bgClose}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[60%_center]"
      />
      <div className="absolute w-full h-full bg-black/45"></div>
      <p className="text-start text-xs text-white/70 uppercase font-body px-6 top-24  italic absolute">
        Atas kehadiran dan do'a restu dari Bapak/Ibu/Saudara/i sekalian kami
        ucapkan Terima Kasih
      </p>
    </div>
  );
}
