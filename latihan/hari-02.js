const catatan = [
    { id: 1, judul: "Belajar React", isi: "useState dan useEffect", selesai: true, kategori: "belajar"},
    { id: 2, judul: "Belajar Laravel", isi: "Routing dan controller", selesai: false, kategori: "belajar"},
    { id: 3, judul: "Belanja bulanan", isi: "Beras, telur, minyak", selesai: false, kategori: "pribadi"},
    { id: 4, judul: "Deploy project", isi: "Vercel untuk frontend", selesai: true, kategori: "kerja"},
    { id: 5, judul: "Belajar Git", isi: "add, commit, push", selesai: true, kategori: "belajar"},
];

// Soal No. 1
const judulCatatan = catatan.map((judul) => judul.judul);
console.log(judulCatatan);

// Soal No. 2
const judulBernomor = catatan.map((judul, index) => `${index + 1}. ${judul.judul}`);
console.log(judulBernomor);

// Soal No. 3
const filterSelesai = catatan.filter(item => item.selesai);
console.log(filterSelesai);

// Soal No. 4
const filterBelajar = catatan.filter(item => item.kategori === `belajar`);
console.log(filterBelajar);

console.log("Soal No. 5")
const cariCatatan = (kataKunci) => {
    const keyword = kataKunci.toLowerCase();
    return catatan.filter(item => item.judul.toLowerCase().includes(keyword));
};
console.log(cariCatatan("belajar"));
console.log(cariCatatan("BELAJAR"));
console.log(cariCatatan("bel"));

console.log("Soal No. 6");
const catatanSpesifik = catatan.find(item => item.id === 4);
console.log(catatanSpesifik);

console.log("Soal No. 7");
const belumSelesaiPertama = catatan.find(item => item.selesai === false);
console.log("Belum selesai pertama:", belumSelesaiPertama);

const pencarianId99 = catatan.find(item => item.id === 99);
console.log("Hasil ID 99:", pencarianId99);

console.log("Soal No. 8");
const jumlahSelesai1 = catatan.reduce((total, item) => {
  return item.selesai ? total + 1 : total;
}, 0);
console.log("Metode 1:", jumlahSelesai1);

console.log("Soal No. 9");
const rekapKategori1 = catatan.reduce((kantong, item) => {
    if (kantong[item.kategori]) {
        kantong[item.kategori] += 1;
    } else {
        kantong[item.kategori] = 1;
    }
    return kantong;
}, {});
console.log("Cara 1:", rekapKategori1);

console.log("Soal No. 10");
const judulBelajarPending = catatan.filter(
    item => item.kategori === "belajar" && !item.selesai
).map(item => item.judul.toUpperCase());
console.log(judulBelajarPending);