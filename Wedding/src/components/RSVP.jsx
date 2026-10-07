import { useState, useEffect, useRef, use } from "react";
import bgrsvp from "../assets/FGM (20).webp";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import gsap from "gsap";

export default function RSVP() {
  const [daftarTamu, setDaftarTamu] = useState([]);
  const [halaman, setHalaman] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    konfirmasi: "",
    ucapan: "",
  });

  const ucapanPerHalaman = 5;

  const indexTerakhir = halaman * ucapanPerHalaman;
  const indexPertama = indexTerakhir - ucapanPerHalaman;

  const ucapanTampil = daftarTamu.slice(indexPertama, indexTerakhir);

  const totalHalaman = Math.ceil(daftarTamu.length / ucapanPerHalaman);

  const rsvp = useRef();
  const rsvpjudul = useRef();
  const rsvplabel = useRef();
  const rsvpkonten = useRef();
  const rsvpGaris = useRef();
  const formrsvp = useRef();


  useEffect(() => {
    const trigersvp = gsap.context(() => {
      const time = gsap.timeline({
        scrollTrigger: {
          trigger: rsvp.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
      time.from(rsvplabel.current, {
        opacity: 0,
        duration: 1.8,
        x: 150,
        ease: "power2.out",
      });
      time.from(rsvpjudul.current, {
        opacity: 0,
        duration: 1.8,
        x: -150,
        ease: "power2.out",
      },"<");
      time.from(rsvpkonten.current, {
        opacity: 0,
        duration: 1.8,
        y: 60,
        ease: "power2.out",
      },"<");
      time.from(rsvpGaris.current, {
        opacity: 0,
        duration: 1.8,
        ease: "power2.out",
      },"<");
      time.from(formrsvp.current, {
        opacity: 0,
        y:60,
        duration: 1.8,
        ease: "power2.out",
      },"<");
    });
    return () => trigersvp.revert();
  },[]);

  // Ambil semua ucapan dari Firestore, urutan terbaru duluan.
  // Dipisah jadi function sendiri karena dipanggil di 2 tempat:
  // 1) sekali pas komponen pertama kali muncul (di useEffect di bawah)
  // 2) sekali lagi setelah submit sukses (di handleSubmit)
  async function ambilDaftarTamu() {
    const q = query(collection(db, "rsvp"), orderBy("waktu", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => doc.data());
    setDaftarTamu(data);
  }

  useEffect(() => {
    ambilDaftarTamu();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "rsvp"), {
        ...formData,
        waktu: serverTimestamp(),
      });

      setFormData({
        nama: "",
        konfirmasi: "",
        ucapan: "",
      });

      // Ambil ulang daftar tamu biar ucapan yang baru dikirim langsung muncul
      await ambilDaftarTamu();

      // Balik ke halaman pertama, karena urutan terbaru ada di depan
      setHalaman(1);
    } catch (error) {
      console.error("Gagal mengirim RSVP:", error);
      alert("Maaf, gagal mengirim. Coba lagi ya.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(e, tampung) {
    setFormData({
      ...formData,
      [tampung]: e.target.value,
    });
  }

  return (
    <section
      ref={rsvp}
      className="relative min-h-svh w-full flex flex-col px-6 py-16 text-white"
    >
      {/* Background */}
      <img
        src={bgrsvp}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col">
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-10">
          <p
            ref={rsvplabel}
            className="text-xs font-label tracking-[0.3em] uppercase text-white/70"
          >
            RSVP
          </p>

          <h2
            ref={rsvpjudul}
            className="mt-3 font-display text-4xl font-semibold tracking-wide"
          >
            Wishes
          </h2>

          <div ref={rsvpGaris} className="w-10 h-px bg-white/40 my-4"></div>

          <p
            ref={rsvpkonten}
            className="max-w-xs text-xs font-body leading-relaxed text-white/70"
          >
            Berikan konfirmasi kehadiran dan ucapan untuk kami.
          </p>
        </header>

        {/* Form */}
        <form ref={formrsvp} onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nama"
              className="text-[11px] font-label tracking-widest uppercase text-white/70"
            >
              Nama
            </label>

            <input
              id="nama"
              type="text"
              value={formData.nama}
              placeholder="Masukan nama"
              onChange={(e) => handleChange(e, "nama")}
              required
              className="w-full bg-transparent border-0 border-b border-white/40 px-0 py-3 text-sm font-body text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="konfirmasi"
              className="text-[11px] font-label tracking-widest uppercase text-white/70"
            >
              Konfirmasi Kehadiran
            </label>

            <select
              id="konfirmasi"
              value={formData.konfirmasi}
              onChange={(e) => handleChange(e, "konfirmasi")}
              required
              className="w-full bg-transparent border-0 border-b border-white/40 px-0 py-3 text-sm font-body text-white focus:border-white focus:outline-none"
            >
              <option value="" disabled className="text-black">
                Pilih opsi
              </option>

              <option value="Hadir" className="text-black">
                Hadir
              </option>

              <option value="Tidak Hadir" className="text-black">
                Tidak Hadir
              </option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="ucapan"
              className="text-[11px] font-label tracking-widest uppercase text-white/70"
            >
              Ucapan
            </label>

            <textarea
              id="ucapan"
              value={formData.ucapan}
              onChange={(e) => handleChange(e, "ucapan")}
              placeholder="Tulis ucapan..."
              rows={4}
              required
              className="w-full resize-none bg-transparent border border-white/40 px-3 py-3 text-sm font-body text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full border border-white px-6 py-3 text-xs font-label tracking-widest uppercase text-white cursor-pointer hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Ucapan"}
          </button>
        </form>

        {/* Wishes */}
        {daftarTamu.length > 0 && (
          <div className="mt-16 w-full max-w-md">
            <div className="h-[500px] flex flex-col">
              {/* Judul */}
              <div className="flex flex-col items-center text-center mb-6">
                <p className="text-[11px] font-label tracking-widest uppercase text-white/60">
                  Guest Wishes
                </p>

                <div className="w-8 h-px bg-white/30 mt-3"></div>
              </div>

              {/* LIST */}
              <div className="flex-1 flex flex-col justify-between">
                {ucapanTampil.map((tamu, index) => (
                  <div key={index} className="border-b border-white/20 pb-4">
                    <h4 className="font-display text-xl text-white">
                      {tamu.nama}
                    </h4>

                    <p className="mt-1 text-[10px] font-label tracking-widest uppercase text-white/50">
                      {tamu.konfirmasi}
                    </p>

                    <p className="mt-2 text-sm font-body leading-relaxed text-white/70">
                      {tamu.ucapan}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalHalaman > 1 && (
                <div className="flex items-center justify-between pt-6">
                  <button
                    onClick={() => setHalaman(halaman - 1)}
                    disabled={halaman === 1}
                    className="text-xs font-label tracking-widest uppercase text-white/70 disabled:opacity-30"
                  >
                    ← Prev
                  </button>

                  <span className="text-[10px] font-label tracking-widest text-white/50">
                    {halaman} / {totalHalaman}
                  </span>

                  <button
                    onClick={() => setHalaman(halaman + 1)}
                    disabled={halaman === totalHalaman}
                    className="text-xs font-label tracking-widest uppercase text-white/70 disabled:opacity-30"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
