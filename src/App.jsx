import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api/catatan";
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export default function App() {
  const [catatan, setCatatan] = useState([]);
  const [loading, setLoading] = useState(true);

  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [errors, setErrors] = useState("");

  const [editId, setEditId] = useState(null);

  const [kataKunci, setKataKuci] = useState("");

  // c adalah filter yang memeriksa catatan 1 per 1
  // kenapa tolowercase karena agar selalu bisa di search
  const hasil = catatan.filter((c) =>
  c.judul.toLowerCase().includes(kataKunci.toLowerCase()));

  async function ambilData() {
    const res = await fetch(API_URL, {
      headers: { Accept: "application/json" },
    });
    const data = await res.json();
    setCatatan(data);
    setLoading(false);
  }

  useEffect(() => {
    ambilData();
  }, []);

  function resetForm() {
    setEditId(null);
    setJudul("");
    setIsi("");
    setErrors({});
  }

  function mulaiEdit(c) {
    setEditId(c.id);
    setJudul(c.judul);
    setIsi(c.isi);
    setErrors({});
  }

  async function kirimForm(e) {
    // cegah browser me-refresh halaman saat form disubmit.
    e.preventDefault();

    //tentukan mode: true kalau sedang edit, false kalau tambah baru.
    const sedangEdit = editId !== null;
    const url = sedangEdit ? `${API_URL}/${editId}` : API_URL;
    const method = sedangEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: HEADERS,
      body: JSON.stringify({ judul, isi }),
    });

    if (res.status === 422) {
      const data = await res.json();
      setErrors(data.errors);
      return;
    }
    resetForm();
    ambilData();
  }  

  async function hapus(id) {
    if (!confirm("Hapus catatan ini?")) return;

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    ambilData();
  }

  if (loading) return <p>Memuat...</p>;

  return (
    <div className="container">
      <h1>Catatan</h1>

      <form className="form" onSubmit={kirimForm}>
        <input
        placeholder="Judul"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        />
        {errors.judul && <p className="error">{errors.judul[0]}</p>}
        
        <textarea
        rows="4"
        placeholder="Isi Catatan"
        value={isi}
        onChange={(e) => setIsi(e.target.value)}
        />
        {errors.isi && <p className="error">{errors.isi[0]}</p>}
        
        <div className="aksi">
          <button type="submit" className="btn btn-primary">
            {editId ? "Update" : "Simpan"}
          </button>
        {editId && (
          <button type="button" className="btn" onClick={resetForm}>
            Batal
          </button>
        )}
        </div>
      </form>

      {catatan.length === 0 && <p className="kosong">Kata kunci pencarian salah.</p>}
      
      <input
        placeholder="Cari judul..."
        value={kataKunci}
        onChange={(e) => setKataKunci(e.target.value)}
      />
      
      <div className="daftar">
        {hasil.map((c) => (
          <div className="kartu" key={c.id}>
            <h3>{c.judul}</h3>
            <p>{c.isi}</p>
            <div className="aksi">
              <button className="btn" onClick={() => mulaiEdit(c)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => hapus(c.id)}>
                Hapus
              </button>
            </div>  
          </div>
        ))}
      </div>
    </div>
  );
}