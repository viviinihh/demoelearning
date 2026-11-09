/* =====================================================================
   Buku Kotak: adapter MODE DEMO (tanpa server, tanpa database)
   Semua data tersimpan di localStorage browser pengunjung.
   ===================================================================== */
(function () {
  "use strict";
  var ROLE_KEY = "bk-demo-role", DB_KEY = "bk-demo-db", USERS_KEY = "bk-demo-users", SEED_KEY = "bk-demo-seeded";
  var role = localStorage.getItem(ROLE_KEY);
  if (!role) { location.replace("index.html"); return; }

  var now = Date.now(), DAY = 86400000;
  function D(days, h, m) { var d = new Date(now + days * DAY); if (h !== undefined) d.setHours(h, m || 0, 0, 0); return d.toISOString(); }
  function dkey(days) { var d = new Date(now + days * DAY); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function recentDays(n) { var a = []; for (var i = n - 1; i >= 0; i--) a.push(dkey(-i)); return a; }

  var USERS0 = [
    { id: "u-admin", username: "admin", nama: "Kepala Sekolah", role: "admin", kelas: null, nis: null, email: null, aktif: 1 },
    { id: "u-guru1", username: "sari.wulandari", nama: "Sari Wulandari", role: "guru", kelas: null, nis: null, email: null, aktif: 1 },
    { id: "u-guru2", username: "andi.pratama", nama: "Andi Pratama", role: "guru", kelas: null, nis: null, email: null, aktif: 1 },
    { id: "u-s1", username: "rina.ayu", nama: "Rina Ayu Lestari", role: "siswa", kelas: "X-1", nis: "2026001", email: null, aktif: 1 },
    { id: "u-s2", username: "budi.santoso", nama: "Budi Santoso", role: "siswa", kelas: "X-1", nis: "2026002", email: null, aktif: 1 },
    { id: "u-s3", username: "citra.dewi", nama: "Citra Dewi", role: "siswa", kelas: "X-1", nis: "2026003", email: null, aktif: 1 },
    { id: "u-s4", username: "dimas.prakoso", nama: "Dimas Prakoso", role: "siswa", kelas: "X-2", nis: "2026004", email: null, aktif: 1 },
    { id: "u-s5", username: "eka.putri", nama: "Eka Putri", role: "siswa", kelas: "X-2", nis: "2026005", email: null, aktif: 1 },
    { id: "u-s6", username: "fajar.nugroho", nama: "Fajar Nugroho", role: "siswa", kelas: "X-2", nis: "2026006", email: null, aktif: 1 }
  ];
  var AS = { admin: "u-admin", guru: "u-guru1", siswa: "u-s1" };

  function seed() {
    var S = {};
    var put = function (p, d) { S[p] = d; };
    var slot = function (id, mulai, selesai, mapel, guru, ruang) { return { id: id, mulai: mulai, selesai: selesai, mapel: mapel, guru: guru, ruang: ruang || "" }; };
    put("pengaturan/kelas", { list: ["X-1", "X-2"] });
    put("pengaturan/sekolah", { nama: "SMA Nusantara (Demo)", tahun: "2026/2027", semester: "Ganjil" });
    var J1 = { Senin: [slot("a","07.00","08.30","Matematika","Sari Wulandari","R. 12"), slot("b","08.30","10.00","Bahasa Indonesia","Andi Pratama","R. 12"), slot("c","10.15","11.45","Biologi","Sari Wulandari","Lab Biologi")],
      Selasa: [slot("d","07.00","08.30","Kimia","Sari Wulandari","Lab Kimia"), slot("e","08.30","10.00","Informatika","Andi Pratama","Lab Komputer")],
      Rabu: [slot("f","07.00","08.30","Fisika","Andi Pratama","Lab Fisika"), slot("g","08.30","10.00","Matematika","Sari Wulandari","R. 12")],
      Kamis: [slot("h","07.00","08.30","Bahasa Indonesia","Andi Pratama","R. 12"), slot("i","08.30","10.00","Kimia","Sari Wulandari","Lab Kimia")],
      Jumat: [slot("j","07.00","08.30","Informatika","Andi Pratama","Lab Komputer"), slot("k","08.30","09.30","Biologi","Sari Wulandari","R. 12")] };
    var J2 = JSON.parse(JSON.stringify(J1)); Object.keys(J2).forEach(function (h) { J2[h].forEach(function (s) { s.id += "2"; s.ruang = s.ruang.replace("R. 12", "R. 14"); }); J2[h].reverse(); });
    put("pengaturan/jadwal", { data: { "X-1": J1, "X-2": J2 } });
    put("roster/kelas", { map: { "u-s1": "X-1", "u-s2": "X-1", "u-s3": "X-1", "u-s4": "X-2", "u-s5": "X-2", "u-s6": "X-2" } });
    put("nis/data", { map: { "u-s1": "2026001", "u-s2": "2026002", "u-s3": "2026003", "u-s4": "2026004", "u-s5": "2026005", "u-s6": "2026006" } });
    put("nis/ortu", { map: { "u-s1": { nama: "Bapak Hadi", hp: "081200000001" }, "u-s2": { nama: "Ibu Wati", hp: "081200000002" } } });
    put("pengumuman/terbaru", { text: "Penilaian Tengah Semester dimulai minggu depan. Pelajari kembali materi Eksponen dan Struktur Atom, dan kerjakan latihan di menu Try out.", at: D(-0.2), by: "u-guru1" });
    put("tugas/daftar", { items: [ { id: "t1", key: "matematika-2", kelas: "X-1", due: dkey(3), note: "Persiapan PTS" }, { id: "t2", key: "kimia-1", kelas: "X-1", due: dkey(-1), note: "" }, { id: "t3", key: "biologi-1", kelas: "X-2", due: dkey(4), note: "" } ] });
    put("berkas/b1", { judul: "Laporan praktikum pengukuran", instruksi: "Ukur panjang 5 benda di sekitarmu dengan mistar dan jangka sorong. Tulis hasilnya dalam tabel, sertakan angka penting, lalu kumpulkan dalam bentuk PDF atau foto.", mapel: "Fisika", kelas: "X-1", tenggat: D(2, 23, 59), at: D(-1), by: "u-guru2" });
    put("berkas/b2", { judul: "Esai eksposisi: sampah plastik di sekolah", instruksi: "Tulis teks eksposisi 3 paragraf (tesis, argumentasi, penegasan ulang) tentang pengurangan sampah plastik di sekolahmu.", mapel: "Bahasa Indonesia", kelas: "", tenggat: D(-3, 23, 59), at: D(-8), by: "u-guru2" });
    put("kumpul/u-s1", { items: { b2: { files: [], link: "", teks: "Sampah plastik di sekolah kita terus bertambah setiap hari...", at: D(-4), kirim: 1 } } });
    put("kumpul/u-s2", { items: { b2: { files: [], link: "https://drive.google.com/", teks: "", at: D(-2.5), kirim: 1 }, b1: { files: [], link: "https://drive.google.com/", teks: "Laporan terlampir.", at: D(-0.3), kirim: 1 } } });
    put("kumpul/u-s4", { items: { b2: { files: [], link: "", teks: "Teks eksposisi tentang kantin sehat tanpa plastik.", at: D(-3.5), kirim: 1 } } });
    put("umpan/u-s1", { berkas: { b2: { nilai: 88, komentar: "Argumentasi kuat dan didukung data. Perhatikan penulisan kata depan \"di\".", at: D(-1) } }, rapor: { catatan: "Rina aktif bertanya dan konsisten mengumpulkan tugas tepat waktu. Pertahankan!" } });
    put("umpan/u-s3", { absen: { a1: "Sakit" } });
    put("umpan/u-s4", { berkas: { b2: { nilai: 76, komentar: "Struktur sudah tepat, tambahkan fakta pendukung.", at: D(-1) } } });
    var kimia = [
      { q: "Partikel atom yang bermuatan negatif adalah…", o: ["Proton", "Neutron", "Elektron", "Inti atom"] },
      { q: "Nomor atom menunjukkan jumlah…", o: ["Neutron", "Proton", "Kulit atom", "Proton ditambah neutron"] },
      { q: "Jumlah neutron pada ²³₁₁Na adalah…", o: ["11", "12", "23", "34"] },
      { q: "Konfigurasi elektron Mg (Z = 12) adalah…", o: ["2 8 2", "2 10", "2 2 8", "8 2 2"] },
      { q: "Elektron valensi Cl (Z = 17) adalah…", o: ["1", "2", "7", "17"] } ];
    var kunciK = [2, 1, 1, 0, 2], bahasK = ["Elektron bermuatan negatif.", "Nomor atom = jumlah proton.", "23 − 11 = 12.", "2 8 2.", "Konfigurasi 2 8 7, valensi 7."];
    put("ujian/x1", { judul: "Ulangan harian Kimia: struktur atom", mapel: "Kimia", kelas: "X-1", mulai: D(-2, 7, 0), selesai: D(-2, 9, 0), durasi: 30, acak: true, soal: kimia, at: D(-5), by: "u-guru1", umum: true, kunci: kunciK, bahas: bahasK });
    put("kunci/x1", { a: kunciK, e: bahasK });
    var mat = [
      { q: "Hasil dari 2³ × 2⁴ adalah…", o: ["2⁷ = 128", "2¹² = 4.096", "4⁷", "2¹ = 2"] },
      { q: "Bentuk sederhana dari (3²)³ adalah…", o: ["3⁵", "3⁶", "9⁵", "3⁸"] },
      { q: "Nilai dari 5⁰ adalah…", o: ["0", "5", "1", "Tidak terdefinisi"] },
      { q: "Nilai dari 2⁻³ adalah…", o: ["−8", "−6", "1/6", "1/8"] },
      { q: "Suku ke-10 dari barisan 4, 7, 10, … adalah…", o: ["28", "31", "34", "40"] } ];
    put("ujian/x2", { judul: "Kuis Matematika: eksponen dan barisan", mapel: "Matematika", kelas: "X-1", mulai: D(-0.05), selesai: D(2), durasi: 20, acak: true, soal: mat, at: D(-1), by: "u-guru1", umum: false, kunci: null, bahas: null });
    put("kunci/x2", { a: [0, 1, 2, 3, 1], e: ["3 + 4 = 7.", "2 × 3 = 6.", "a⁰ = 1.", "1/2³.", "4 + 9 × 3 = 31."] });
    put("ujian/x3", { judul: "PTS Biologi", mapel: "Biologi", kelas: "", mulai: D(6, 7, 30), selesai: D(6, 9, 0), durasi: 60, acak: true, soal: [{ q: "Contoh keanekaragaman tingkat gen adalah…", o: ["Variasi warna bulu kucing", "Harimau dan kucing", "Hutan dan laut", "Komodo dan anoa"] }], at: D(-0.5), by: "u-guru1", umum: false, kunci: null, bahas: null });
    put("kunci/x3", { a: [0], e: ["Masih satu jenis dengan variasi sifat."] });
    var ans = function (j, pindah) { return { mulai: D(-2, 7, 5), selesai: D(-2, 7, 31), jawab: j, ragu: [], urutan: [0, 1, 2, 3, 4], pindah: pindah }; };
    put("jawaban/u-s1", { items: { x1: ans({ 0: 2, 1: 1, 2: 1, 3: 1, 4: 2 }, 0) } });
    put("jawaban/u-s2", { items: { x1: ans({ 0: 2, 1: 0, 2: 1, 3: 0, 4: 1 }, 3) } });
    put("jawaban/u-s3", { items: { x1: ans({ 0: 2, 1: 1, 2: 1, 3: 0, 4: 2 }, 0) } });
    put("sesi/a1", { kelas: "X-1", judul: "Matematika, pertemuan 4", buka: D(-1, 7, 5), tutup: D(-1, 7, 20), hash: "-", by: "u-guru1" });
    put("kodeabsen/a1", { kode: "4821" });
    put("sesi/a2", { kelas: "X-1", judul: "Bahasa Indonesia, pertemuan 5", buka: D(-0.01), tutup: D(0.2), hash: "10302d0ae74068191059ecdb0d49e1711b74e7cdec5e13b971e2ad6d33546e2e", by: "u-guru2" });
    put("kodeabsen/a2", { kode: "7315" });
    put("sesi/a3", { kelas: "X-2", judul: "Biologi, pertemuan 3", buka: D(-1, 10, 15), tutup: D(-1, 10, 30), hash: "-", by: "u-guru1" });
    put("kodeabsen/a3", { kode: "1907" });
    put("absen/u-s1", { items: { a1: { kode: "4821", at: D(-1, 7, 8), ok: true } } });
    put("absen/u-s2", { items: { a1: { kode: "4821", at: D(-1, 7, 11), ok: true } } });
    put("absen/u-s4", { items: { a3: { kode: "1907", at: D(-1, 10, 17), ok: true } } });
    put("absen/u-s5", { items: { a3: { kode: "1907", at: D(-1, 10, 19), ok: true } } });
    var L = function (best, ago) { return { best: best, done: best >= 70, at: D(-ago) }; };
    put("progress/u-s1", { kelas: "X-1", lessons: { "matematika-1": L(80, 6), "kimia-1": L(100, 3), "kimia-2": L(80, 2), "informatika-1": L(100, 9), "informatika-2": L(80, 8), "bahasa-indonesia-1": L(60, 1) }, wrong: { "bahasa-indonesia-1": [1, 3] }, practice: 12, days: recentDays(4), tryout: [{ at: D(-2), title: "Try out mini SNBT", per: { PU: { b: 2, n: 3, skor: 733 }, PPU: { b: 3, n: 3, skor: 1000 }, PBM: { b: 2, n: 3, skor: 733 }, PK: { b: 1, n: 3, skor: 467 }, LBI: { b: 3, n: 3, skor: 1000 }, LBE: { b: 2, n: 3, skor: 733 }, PM: { b: 2, n: 3, skor: 733 } }, total: 771 }], papan: true, updatedAt: D(-0.1) });
    put("progress/u-s2", { kelas: "X-1", lessons: { "matematika-1": L(60, 5), "fisika-1": L(80, 4), "kimia-1": L(60, 3) }, wrong: { "matematika-1": [1, 3], "kimia-1": [3] }, practice: 4, days: [dkey(-9), dkey(-8)], papan: true, updatedAt: D(-8) });
    put("progress/u-s3", { kelas: "X-1", lessons: { "matematika-1": L(100, 2), "matematika-2": L(100, 1), "kimia-1": L(100, 2), "biologi-1": L(80, 1), "biologi-2": L(100, 0.5) }, wrong: {}, practice: 31, days: recentDays(8), papan: true, updatedAt: D(-0.05) });
    put("progress/u-s4", { kelas: "X-2", lessons: { "biologi-1": L(80, 2), "fisika-1": L(60, 1) }, wrong: { "fisika-1": [2] }, practice: 6, days: recentDays(2), updatedAt: D(-0.5) });
    put("progress/u-s5", { kelas: "X-2", lessons: { "biologi-1": L(100, 3), "informatika-1": L(80, 2), "matematika-1": L(80, 1) }, wrong: {}, practice: 9, days: recentDays(3), papan: true, updatedAt: D(-0.3) });
    put("progress/u-s6", { kelas: "X-2", lessons: { "biologi-1": L(40, 10) }, wrong: { "biologi-1": [0, 2, 4] }, practice: 0, days: [dkey(-10)], updatedAt: D(-10) });
    var xpOf = function (p) { var x = 0, t = 0; Object.keys(p.lessons).forEach(function (k) { x += p.lessons[k].best; if (p.lessons[k].done) { x += 50; t++; } }); return { xp: x + (p.practice || 0) * 5, tuntas: t }; };
    ["u-s1", "u-s2", "u-s3", "u-s5"].forEach(function (id) { var r = xpOf(S["progress/" + id]); put("skor/" + id, { xp: r.xp, tuntas: r.tuntas, at: D(-0.1) }); });
    put("bahan/m1", { mapel: "kimia", bab: "Bab 1: Struktur atom", judul: "Video pengantar struktur atom", jenis: "video", url: "https://www.youtube.com/results?search_query=struktur+atom+kelas+10", desk: "Tonton sebelum mengerjakan kuis", at: D(-4), by: "u-guru1" });
    put("bahan/m2", { mapel: "kimia", bab: "Bab 1: Struktur atom", judul: "Buku teks Kimia kelas X (SIBI)", jenis: "pdf", url: "https://buku.kemdikbud.go.id", desk: "Bab 2, halaman 20–45", at: D(-4), by: "u-guru1" });
    put("bahan/m3", { mapel: "matematika", bab: "Bab 1: Eksponen", judul: "Latihan sifat-sifat eksponen", jenis: "link", url: "https://www.youtube.com/results?search_query=sifat+eksponen+kelas+10", desk: "", at: D(-6), by: "u-guru1" });
    put("agenda/g1", { judul: "Penilaian Tengah Semester", jenis: "Ujian sekolah", kelas: "", mulai: dkey(7), selesai: dkey(11), at: D(-3), by: "u-admin" });
    put("agenda/g2", { judul: "Class meeting", jenis: "Kegiatan", kelas: "", mulai: dkey(14), selesai: dkey(15), at: D(-3), by: "u-admin" });
    put("agenda/g3", { judul: "Rapat guru bulanan", jenis: "Rapat guru", kelas: "", mulai: dkey(2), selesai: dkey(2), at: D(-2), by: "u-admin" });
    put("forum/u-s2", { posts: { p1: { jenis: "topik", judul: "Kenapa 2 pangkat negatif 3 hasilnya 1/8?", isi: "Saya masih bingung kenapa pangkat negatif jadi pecahan. Ada yang bisa jelaskan?", mapel: "Matematika", kelas: "X-1", at: D(-1.5), guru: false } } });
    put("forum/u-guru1", { posts: { r1: { jenis: "balasan", induk: "p1", isi: "Coba lihat polanya: 2³ = 8, 2² = 4, 2¹ = 2, 2⁰ = 1. Setiap turun satu pangkat, nilainya dibagi 2. Jadi 2⁻¹ = 1/2, 2⁻² = 1/4, dan 2⁻³ = 1/8.", at: D(-1.3), guru: true } } });
    put("forum/u-s3", { posts: { r2: { jenis: "balasan", induk: "p1", isi: "Makasih Bu, sekarang paham polanya!", at: D(-1.2), guru: false } } });
    put("chat/u-s1", { msgs: [ { id: "c1", from: "u-s1", text: "Bu, untuk kuis matematika boleh dikerjakan sore ini?", at: D(-0.4), guru: false }, { id: "c2", from: "u-guru1", text: "Boleh, Rina. Kuisnya dibuka sampai lusa. Semangat!", at: D(-0.35), guru: true } ] });
    put("chat/u-s6", { msgs: [ { id: "c3", from: "u-s6", text: "Pak, saya kemarin tidak masuk karena sakit. Tugasnya apa saja?", at: D(-0.9), guru: false } ] });
    put("grup/u-guru1", { msgs: [ { id: "g1", kelas: "X-1", text: "Selamat pagi anak-anak. Jangan lupa kuis matematika hari ini, ya.", at: D(-0.5), guru: true } ] });
    put("grup/u-s2", { msgs: [ { id: "g2", kelas: "X-1", text: "Siap, Bu!", at: D(-0.48), guru: false } ] });
    put("pustaka/k1", { judul: "Modul Ringkas Kimia Kelas X", penulis: "Tim Guru Kimia", kategori: "Modul", url: "https://buku.kemdikbud.go.id", desk: "Ringkasan materi dan latihan soal.", at: D(-10), by: "u-guru1" });
    put("jurnal/j1", { tanggal: dkey(-1), kelas: "X-1", mapel: "Matematika", jam: "1–2", topik: "Sifat-sifat eksponen", kegiatan: "Apersepsi pertumbuhan bakteri, diskusi kelompok, presentasi.", catatan: "Sebagian siswa belum paham pangkat negatif.", absen: "Citra Dewi (Sakit)", by: "u-guru1", at: D(-1) });
    put("jurnal/j2", { tanggal: dkey(-2), kelas: "X-1", mapel: "Kimia", jam: "1–2", topik: "Ulangan harian struktur atom", kegiatan: "Ulangan online melalui Buku Kotak.", catatan: "Rata-rata kelas 80.", absen: "Semua hadir", by: "u-guru1", at: D(-2) });
    put("modulajar/md1", { judul: "Sifat-sifat eksponen", mapel: "Matematika", fase: "E", kelas: "X", waktu: "2 × 45 menit", cp: "Peserta didik dapat menggeneralisasi sifat-sifat operasi bilangan berpangkat.", tp: "Siswa dapat menerapkan sifat perkalian, pembagian, dan pangkat dari pangkat.", profil: "Bernalar kritis, gotong royong, mandiri.", sarana: "Proyektor, LKPD, Buku Kotak.", model: "Discovery learning, diskusi kelompok.", pendahuluan: "1. Salam dan doa (5 menit)\n2. Apersepsi: pertumbuhan bakteri (10 menit)", inti: "1. Mengamati pola perkalian berulang (15 menit)\n2. Diskusi kelompok menemukan sifat (25 menit)\n3. Presentasi (15 menit)", penutup: "1. Refleksi dan kesimpulan (10 menit)\n2. Kuis singkat di Buku Kotak (10 menit)", asesmen: "Diagnostik: tanya jawab. Formatif: LKPD. Sumatif: kuis.", remedial: "Pengayaan: soal HOTS. Remedial: latihan terbimbing.", refleksi: "Bagian mana yang paling sulit dipahami?", by: "u-guru1", at: D(-3) });
    return S;
  }

  // ---------- penyimpanan ----------
  var store, users;
  var seeded = +localStorage.getItem(SEED_KEY) || 0;
  if (!seeded || now - seeded > DAY) {
    store = seed(); users = USERS0.slice();
    localStorage.setItem(DB_KEY, JSON.stringify(store)); localStorage.setItem(USERS_KEY, JSON.stringify(users)); localStorage.setItem(SEED_KEY, String(now));
    localStorage.removeItem("bukukotak-v2"); localStorage.removeItem("bukukotak-notes");
  } else {
    try { store = JSON.parse(localStorage.getItem(DB_KEY)) || {}; } catch (e) { store = {}; }
    try { users = JSON.parse(localStorage.getItem(USERS_KEY)) || USERS0.slice(); } catch (e) { users = USERS0.slice(); }
  }
  var me = users.find(function (u) { return u.id === AS[role]; }) || users[0];
  var subs = [];
  function persist() { try { localStorage.setItem(DB_KEY, JSON.stringify(store)); } catch (e) {} }
  function fire() { subs.slice().forEach(function (f) { f(); }); }
  window.addEventListener("storage", function (ev) { if (ev.key === DB_KEY) { try { store = JSON.parse(ev.newValue || "{}"); } catch (e) {} fire(); } });
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var snapDoc = function (p) { return { id: p.split("/").pop(), exists: !!store[p], data: function () { return clone(store[p]); } }; };
  var snapCol = function (p) { var n = p.split("/").length + 1; var docs = Object.keys(store).filter(function (k) { return k.indexOf(p + "/") === 0 && k.split("/").length === n; }).map(snapDoc); return { docs: docs, size: docs.length, empty: !docs.length }; };
  var docRef = function (p) { return {
    id: p.split("/").pop(), path: p,
    get: function () { return Promise.resolve(snapDoc(p)); },
    set: function (d) { store[p] = clone(d); persist(); setTimeout(fire, 0); return Promise.resolve(); },
    delete: function () { delete store[p]; persist(); setTimeout(fire, 0); return Promise.resolve(); },
    onSnapshot: function (next) { var f = function () { next(snapDoc(p)); }; subs.push(f); setTimeout(f, 0); return function () { subs = subs.filter(function (x) { return x !== f; }); }; }
  }; };
  var colRef = function (p) { var q = { path: p, _o: null, _l: 0,
    doc: function (id) { return docRef(p + "/" + id); },
    orderBy: function (f, d) { q._o = [f, d]; return q; }, limit: function (n) { q._l = n; return q; },
    get: function () { return Promise.resolve(snapCol(p)); },
    onSnapshot: function (next) { var f = function () { var s = snapCol(p), docs = s.docs;
        if (q._o) { var f2 = q._o[0], dir = q._o[1]; docs = docs.slice().sort(function (a, b) { var x = a.data()[f2], y = b.data()[f2]; return (x > y ? 1 : x < y ? -1 : 0) * (dir === "desc" ? -1 : 1); }); }
        if (q._l) docs = docs.slice(0, q._l); next(Object.assign({}, s, { docs: docs })); };
      subs.push(f); setTimeout(f, 0); return function () { subs = subs.filter(function (x) { return x !== f; }); }; }
  }; return q; };

  function saveUsers() { localStorage.setItem(USERS_KEY, JSON.stringify(users)); var k = {}, n = {}; users.forEach(function (u) { if (u.role === "siswa" && u.aktif) { if (u.kelas) k[u.id] = u.kelas; if (u.nis) n[u.id] = u.nis; } }); store["roster/kelas"] = { map: k }; store["nis/data"] = { map: n }; persist(); setTimeout(fire, 0); }
  var err = function (m) { return Promise.reject(Object.assign(new Error(m), { code: "error" })); };

  // ---------- API tiruan (kelola pengguna, akun) ----------
  function api(method, url, body) {
    if (url === "/api/me") return Promise.resolve(Object.assign({}, me, { ai: true, maxUploadMb: 25 }));
    if (url === "/api/logout") { localStorage.removeItem(ROLE_KEY); return Promise.resolve({ ok: true }); }
    if (url === "/api/me/password") return Promise.resolve({ ok: true });
    if (url === "/api/audit") return Promise.resolve([{ created_at: D(-0.05), aksi: "login", detail: "", ip: "demo", nama: me.nama }, { created_at: D(-1), aksi: "tambah_pengguna", detail: "rina.ayu (siswa)", ip: "demo", nama: "Kepala Sekolah" }]);
    if (url === "/api/profiles") { var r = {}; (body.ids || []).forEach(function (id) { var u = users.find(function (x) { return x.id === id; }); if (u) r[id] = { name: u.nama, role: u.role }; }); return Promise.resolve(r); }
    if (url === "/api/users" && method === "GET") return Promise.resolve(clone(users));
    if (url === "/api/users" && method === "POST") {
      if (!body.nama || !body.username) return err("Nama dan username wajib diisi");
      if (users.some(function (u) { return u.username === body.username; })) return err("Username sudah dipakai");
      var id = "u-" + Date.now().toString(36); users.push({ id: id, username: body.username, nama: body.nama, role: body.role || "siswa", kelas: body.kelas || null, nis: body.nis || null, email: body.email || null, aktif: 1, last_login: null }); saveUsers(); return Promise.resolve({ ok: true, id: id });
    }
    var m = url.match(/^\/api\/users\/([^/]+)$/);
    if (m && method === "PUT") { var u = users.find(function (x) { return x.id === m[1]; }); if (!u) return err("Pengguna tidak ditemukan"); if (u.id === me.id && (body.aktif === false || (body.role && body.role !== me.role))) return err("Tidak bisa mengubah peran atau menonaktifkan akunmu sendiri di demo");
      ["nama", "username", "role", "kelas", "nis", "email"].forEach(function (k) { if (body[k] !== undefined) u[k] = body[k] || null; }); if (body.aktif !== undefined) u.aktif = body.aktif ? 1 : 0; saveUsers(); return Promise.resolve({ ok: true }); }
    if (m && method === "DELETE") { if (m[1] === me.id) return err("Tidak bisa menghapus akunmu sendiri"); users = users.filter(function (x) { return x.id !== m[1]; }); saveUsers(); return Promise.resolve({ ok: true }); }
    if (url === "/api/users/import") { var rep = { dibuat: 0, dilewati: [] }; (body.rows || []).forEach(function (b, i) { if (!b.nama || !b.username) { rep.dilewati.push("Baris " + (i + 2) + ": nama dan username wajib"); return; } if (users.some(function (u) { return u.username === b.username; })) { rep.dilewati.push("Baris " + (i + 2) + ": username sudah dipakai"); return; } users.push({ id: "u-" + Date.now().toString(36) + i, username: b.username, nama: b.nama, role: ["admin", "guru", "siswa"].indexOf(b.role) >= 0 ? b.role : "siswa", kelas: b.kelas || null, nis: b.nis || null, aktif: 1 }); rep.dibuat++; }); saveUsers(); return Promise.resolve(rep); }
    return err("Fitur ini tidak tersedia di mode demo");
  }
  var meP = Promise.resolve(Object.assign({}, me, { ai: true, maxUploadMb: 25 }));
  window.BK = { server: true, demo: true, api: api, me: meP };

  // ---------- AI tiruan ----------
  function sample(input, opts) {
    opts = opts || {};
    var text = "Ini mode demo, jadi jawaban ini contoh. Di versi lengkap, tutor AI (Claude) menjawab pertanyaanmu langsung berdasarkan materi yang sedang dibuka, memberi contoh sehari-hari, dan menuntun tanpa memberikan jawaban kuis.";
    if (typeof input === "string" && /penjelasan|jawaban siswa kurang tepat|Jawaban benar/i.test(input)) text = "Mode demo: di versi lengkap, AI menjelaskan kenapa pilihanmu kurang tepat, kenapa jawaban benar itu benar, dan memberi tips supaya tidak salah lagi.";
    if (typeof input === "string" && /Tulis materi pelajaran/.test(input)) text = "## Pengantar\nIni contoh draf materi dari mode demo. Di versi lengkap, AI menulis materi 250–400 kata sesuai judul dan mapel.\n## Poin penting\n- Konsep utama dijelaskan bertahap\n- Disertai contoh kehidupan sehari-hari di Indonesia";
    return new Promise(function (res) { setTimeout(function () { if (opts.onText) opts.onText({ text: text, delta: text }); res({ text: text, truncated: false }); }, 700); });
  }
  sample.json = function (prompt) {
    return new Promise(function (res) { setTimeout(function () {
      if (/kunci persis: cp/.test(prompt)) res({ cp: "(Contoh demo) Capaian pembelajaran sesuai fase.", tp: "(Contoh demo) Tujuan pembelajaran yang terukur.", profil: "Bernalar kritis, kreatif, gotong royong.", sarana: "Proyektor, LKPD, Buku Kotak.", model: "Problem based learning.", pendahuluan: "1. Salam dan apersepsi (10 menit)", inti: "1. Eksplorasi (20 menit)\n2. Diskusi kelompok (30 menit)\n3. Presentasi (15 menit)", penutup: "1. Refleksi (10 menit)", asesmen: "Diagnostik, formatif, sumatif.", remedial: "Pengayaan dan remedial terbimbing.", refleksi: "Apa yang paling menarik hari ini?" });
      else res([1, 2, 3, 4, 5].map(function (n) { return { q: "Contoh soal buatan AI nomor " + n + " (mode demo). Di versi lengkap, soal dibuat sesuai materi.", o: ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"], a: n % 4, e: "Pembahasan contoh dari mode demo." }; }));
    }, 900); });
  };

  var downloads = { save: function (o) { var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([o.data], { type: /\.html?$/i.test(o.filename) ? "text/html;charset=utf-8" : /\.svg$/i.test(o.filename) ? "image/svg+xml" : "text/plain;charset=utf-8" })); a.download = o.filename; document.body.appendChild(a); a.click(); a.remove(); return Promise.resolve({ status: "saved" }); } };

  var user = {
    id: function () { return Promise.resolve(me.id); }, name: function () { return Promise.resolve(me.nama); },
    canEdit: function () { return Promise.resolve(me.role !== "siswa"); }, isOwner: function () { return Promise.resolve(me.role === "admin"); },
    profiles: function (ids) { return api("POST", "/api/profiles", { ids: ids }); }
  };
  window.claude = { use: function (n) { return Promise.resolve({ user: user, db: { doc: docRef, collection: colRef }, downloads: downloads, sample: sample, assets: null }[n] || null); } };

  // ---------- pita mode demo ----------
  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.createElement("div");
    bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "Mode demo");
    bar.style.cssText = "position:fixed;left:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:90;background:#0B1A36;color:#fff;border-radius:12px;padding:7px 9px;font:600 12px 'Plus Jakarta Sans',system-ui,sans-serif;display:flex;gap:6px;align-items:center;box-shadow:0 10px 28px rgba(0,0,0,.3)";
    var R = [["admin", "Admin"], ["guru", "Guru"], ["siswa", "Siswa"]];
    bar.innerHTML = '<span style="opacity:.8;padding:0 4px">Demo:</span>' + R.map(function (r) { var on = r[0] === role; return '<button data-r="' + r[0] + '" style="border:0;border-radius:8px;padding:5px 10px;font:inherit;cursor:pointer;background:' + (on ? '#F5B82E' : 'rgba(255,255,255,.14)') + ';color:' + (on ? '#1B1606' : '#fff') + '">' + r[1] + '</button>'; }).join("") + '<button data-reset style="border:0;background:none;color:#AFBBD4;cursor:pointer;font:inherit;padding:5px 6px">Reset</button><button data-out style="border:0;background:none;color:#AFBBD4;cursor:pointer;font:inherit;padding:5px 6px">Keluar</button>';
    bar.addEventListener("click", function (ev) {
      var b = ev.target.closest("button"); if (!b) return;
      if (b.hasAttribute("data-reset")) { if (!confirm("Kembalikan semua data demo ke kondisi awal?")) return; localStorage.removeItem(SEED_KEY); location.hash = "beranda"; location.reload(); return; }
      if (b.hasAttribute("data-out")) { localStorage.removeItem(ROLE_KEY); location.href = "index.html"; return; }
      localStorage.setItem(ROLE_KEY, b.getAttribute("data-r")); location.hash = "beranda"; location.reload();
    });
    document.body.appendChild(bar);
    var fit = function () { bar.style.bottom = window.innerWidth <= 980 ? "calc(76px + env(safe-area-inset-bottom,0px))" : "calc(12px + env(safe-area-inset-bottom,0px))"; };
    fit(); window.addEventListener("resize", fit);
  });
})();
