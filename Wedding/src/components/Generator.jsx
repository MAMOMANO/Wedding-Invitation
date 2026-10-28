import { useState } from "react";

// {nama} dan {link} akan diganti otomatis untuk tiap tamu
// Tanda *teks* = tebal di WhatsApp. Bagian [ISI ...] ganti dengan data asli.
// const TEMPLATE_AWAL = `Kepada Yth. {nama}

// Dengan penuh sukacita, kami ingin mengundang Anda ke pernikahan kami,

// *Yosef*
// Putra dari [Bapak Gradus Mela Hadjon (Alm)
//           & Ibu Maria Pire]
// &
// *Maria*
// Putri dari [ Bapak Fransiscus Ucok Bonar (Alm)
//           & Ibu Agustina Maitini]

// Sabtu, 21 November 2026

// ⛪ *Pemberkatan Pernikahan*
// 📍 [Gereja St. Philipus Rasul]
//     [Jalan Teluk Gong Raya No.19 BC, Jl. Teluk Gong Raya 12, RT.12/RW.10, Pejagalan, Penjaringan, Jakarta Utara 14450]
// ⏰ Pk. [Pukul 10:00 - Selesai] WIB

// 🏨 *Resepsi Pernikahan*
// 📍 [SDS Stella Maris Jakarta]
//     [Jl. Lele No.1 Blk A1, RT.4/RW.13, Pejagalan, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450]
// ⏰ Pk. [Pukul 16:00 - Selesai] WIB

// Detail lengkap undangan dan konfirmasi kehadiran dapat dilihat melalui link berikut:

// {link}

// Sampai jumpa! 🙏`;

const TEMPLATE_AWAL = `Kepada Yth. {nama}

Dengan penuh sukacita, kami ingin mengundang Anda ke pernikahan kami,

*Yosef*
Putra dari Bapak Gradus Mela Hadjon (Alm) & Ibu Maria Pire

&

*Maria*
Putri dari Bapak Fransiscus Ucok Bonar (Alm) & Ibu Agustina Maitini

Sabtu, 21 November 2026

\u26EA\uFE0F *Pemberkatan Pernikahan*
\u{1F4CD} Gereja St. Philipus Rasul
Jl. Teluk Gong Raya No.19 BC, Jl. Teluk Gong Raya 12, RT.12/RW.10, Pejagalan, Penjaringan, Jakarta Utara 14450
\u23F0 Pukul 11:00 WIB - selesai

\u{1F3E8} *Resepsi Pernikahan*
\u{1F4CD} SDS Stella Maris Jakarta
Jl. Lele No.1 Blk A1, RT.4/RW.13, Pejagalan, Kecamatan Penjaringan, Jkt Utara, Daerah Khusus Ibukota Jakarta 14450
\u23F0 Pukul 16:00 WIB - selesai

Detail lengkap undangan dan konfirmasi kehadiran dapat dilihat melalui link berikut:

{link}

Sampai jumpa! \u{1F64F}`;

export default function Generator() {
  const [daftarNama, setDaftarNama] = useState("");
  const [pakaiRek, setPakaiRek] = useState(false);
  const [template, setTemplate] = useState(TEMPLATE_AWAL);
  const [tersalin, setTersalin] = useState(null);

  // Otomatis ikut domain yang sedang dipakai (vercel.app maupun domain .com)
  const baseUrl = window.location.origin + "/";

  // Satu nama per baris, buang baris kosong dan spasi di pinggir
  const hasil = daftarNama
    .split("\n")
    .map((n) => n.trim())
    .filter((n) => n.length > 0)
    .map((nama) => {
      let link = `${baseUrl}?nama=${encodeURIComponent(nama)}`;
      if (pakaiRek) link += "&rek=1";
      const pesan = template
        .replaceAll("{nama}", nama)
        .replaceAll("{link}", link);
      return { nama, link, pesan };
    });

  async function salinLink(link) {
    try {
      await navigator.clipboard.writeText(link);
      setTersalin(link);
      setTimeout(() => setTersalin(null), 1500);
    } catch {
      alert("Gagal menyalin. Salin manual dari kotak link ya.");
    }
  }

  function kirimWA(pesan) {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(pesan)}`,
      "_blank",
      "noopener",
    );
  }

  return (
    <div className="min-h-dvh w-full bg-stone-100 px-4 py-10 text-stone-800">
      <div className="mx-auto w-full max-w-xl flex flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold">Generator Link Undangan</h1>
          <p className="mt-1 text-sm text-stone-600">
            Ketik nama tamu (satu nama per baris), lalu salin link atau kirim
            lewat WhatsApp.
          </p>
        </header>

        <div className="flex flex-col gap-2">
          <label htmlFor="nama" className="text-sm font-medium">
            Nama tamu
          </label>
          <textarea
            id="nama"
            rows={6}
            value={daftarNama}
            onChange={(e) => setDaftarNama(e.target.value)}
            placeholder={"Bapak Ibu & Keluarga"}
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>

        <label className="flex items-start gap-3 rounded-md border border-stone-300 bg-white px-3 py-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={pakaiRek}
            onChange={(e) => setPakaiRek(e.target.checked)}
            className="mt-0.5 h-4 w-4"
          />
          <span>
            <span className="font-medium">Sertakan nomor rekening</span>
            <span className="block text-stone-500">
              Kalau tidak dicentang, undangan tampil tanpa nomor rekening (untuk
              keluarga yang tidak perlu).
            </span>
          </span>
        </label>

        <div className="flex flex-col gap-2">
          <label htmlFor="template" className="text-sm font-medium">
            Pesan WhatsApp
          </label>
          <textarea
            id="template"
            rows={8}
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <p className="text-xs text-stone-500">
            Tulis <code>{"{nama}"}</code> dan <code>{"{link}"}</code> persis
            seperti itu, nanti terisi otomatis untuk tiap tamu.
          </p>
        </div>

        {hasil.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">
              {hasil.length} link siap dikirim
            </p>
            {hasil.map((item) => (
              <div
                key={item.nama}
                className="rounded-md border border-stone-300 bg-white p-3 flex flex-col gap-2"
              >
                <p className="text-sm font-medium">{item.nama}</p>
                <input
                  readOnly
                  value={item.link}
                  onFocus={(e) => e.target.select()}
                  className="w-full rounded border border-stone-200 bg-stone-50 px-2 py-1.5 text-xs text-stone-600"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => salinLink(item.link)}
                    className="flex-1 rounded border border-stone-400 px-3 py-2 text-xs font-medium cursor-pointer hover:bg-stone-100"
                  >
                    {tersalin === item.link ? "Tersalin ✓" : "Salin Link"}
                  </button>
                  <button
                    onClick={() => kirimWA(item.pesan)}
                    className="flex-1 rounded bg-green-600 px-3 py-2 text-xs font-medium text-white cursor-pointer hover:bg-green-700"
                  >
                    Kirim WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
