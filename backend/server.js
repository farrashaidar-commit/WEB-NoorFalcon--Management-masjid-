import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Data storage (in-memory for now)
let users = [];
let jadwalSalat = [
  {
    id: 1,
    waktu: "Subuh",
    waktu_jam: "04:30",
    imam: "Ustadz Ahmad",
    muadzin: "Ali",
  },
  {
    id: 2,
    waktu: "Dzuhur",
    waktu_jam: "12:00",
    imam: "Ustadz Budi",
    muadzin: "Rizki",
  },
  {
    id: 3,
    waktu: "Ashar",
    waktu_jam: "15:15",
    imam: "Ustadz Candra",
    muadzin: "Fajar",
  },
  {
    id: 4,
    waktu: "Maghrib",
    waktu_jam: "18:00",
    imam: "Ustadz Dedi",
    muadzin: "Hendra",
  },
  {
    id: 5,
    waktu: "Isya",
    waktu_jam: "19:15",
    imam: "Ustadz Eko",
    muadzin: "Irwan",
  },
];
let jadwalImam = [
  {
    id: 1,
    nama: "Ustadz Ahmad",
    hari: "Senin - Rabu",
    jam: "Semua Waktu",
    telepon: "0812-3456-7890",
  },
  {
    id: 2,
    nama: "Ustadz Budi",
    hari: "Kamis - Jumat",
    jam: "Semua Waktu",
    telepon: "0812-3456-7891",
  },
];
let jadwalMuadzin = [
  {
    id: 1,
    nama: "Ali",
    hari: "Senin, Rabu, Jumat",
    jam: "Subuh, Maghrib",
    telepon: "0821-1234-5678",
  },
  {
    id: 2,
    nama: "Rizki",
    hari: "Selasa, Kamis",
    jam: "Dzuhur, Isya",
    telepon: "0821-1234-5679",
  },
];
let pengumuman = [
  {
    id: 1,
    judul: "Kajian Rutin Mingguan",
    tanggal: "18 Juni 2026",
    isi: "Kajian rutin setiap Minggu sore setelah sholat Ashar bersama Ustadz Dedi. Tema: 'Taqwa di Era Modern'.",
    penulis: "Ustadz Ahmad",
  },
  {
    id: 2,
    judul: "Penerimaan Zakat Fitrah",
    tanggal: "15 Juni 2026",
    isi: "Penerimaan zakat fitrah sudah dibuka. Silakan hubungi bendahara masjid untuk informasi lebih lanjut.",
    penulis: "Bendahara",
  },
];
let inventaris = [
  {
    id: 1,
    nama: "Karpet Utama",
    jumlah: 2,
    kondisi: "Baik",
    lokasi: "Ruang Utama",
  },
  {
    id: 2,
    nama: "Mic Wireless",
    jumlah: 4,
    kondisi: "Baik",
    lokasi: "Lemari Audio",
  },
  {
    id: 3,
    nama: "Sound System",
    jumlah: 1,
    kondisi: "Perlu Perawatan",
    lokasi: "Ruang Utama",
  },
];
let keuangan = [
  {
    id: 1,
    tanggal: "18 Juni 2026",
    keterangan: "Infaq Jumat",
    jenis: "Pemasukan",
    jumlah: "2500000",
  },
  {
    id: 2,
    tanggal: "17 Juni 2026",
    keterangan: "Perbaikan Sound System",
    jenis: "Pengeluaran",
    jumlah: "500000",
  },
  {
    id: 3,
    tanggal: "15 Juni 2026",
    keterangan: "Infaq Harian",
    jenis: "Pemasukan",
    jumlah: "800000",
  },
];
let donasi = [
  {
    id: 1,
    nama: "Bapak Sudirman",
    tanggal: "18 Juni 2026",
    jumlah: "500000",
    keterangan: "Infaq",
  },
  {
    id: 2,
    nama: "Ibu Siti",
    tanggal: "17 Juni 2026",
    jumlah: "300000",
    keterangan: "Zakat",
  },
];

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "NoorFalcon API is running!" });
});

// Auth endpoints
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = users.find(
    (u) => u.username === username || u.email === email,
  );
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
  }
  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
    role: "user",
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  res
    .status(201)
    .json({
      message: "Registration successful",
      user: { ...newUser, password: undefined },
    });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) =>
      (u.username === username || u.email === username) &&
      u.password === password,
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  res.json({
    message: "Login successful",
    user: { ...user, password: undefined },
  });
});

// Helper function for CRUD operations
const createCrudRoutes = (routeName, dataArray) => {
  // Get all
  app.get(`/api/${routeName}`, (req, res) => {
    res.json(dataArray);
  });

  // Get by id
  app.get(`/api/${routeName}/:id`, (req, res) => {
    const item = dataArray.find((item) => item.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  });

  // Create
  app.post(`/api/${routeName}`, (req, res) => {
    const newItem = { id: Date.now(), ...req.body };
    dataArray.push(newItem);
    res.status(201).json(newItem);
  });

  // Update
  app.put(`/api/${routeName}/:id`, (req, res) => {
    const index = dataArray.findIndex(
      (item) => item.id === parseInt(req.params.id),
    );
    if (index === -1) return res.status(404).json({ message: "Not found" });
    dataArray[index] = { ...dataArray[index], ...req.body };
    res.json(dataArray[index]);
  });

  // Delete
  app.delete(`/api/${routeName}/:id`, (req, res) => {
    const index = dataArray.findIndex(
      (item) => item.id === parseInt(req.params.id),
    );
    if (index === -1) return res.status(404).json({ message: "Not found" });
    const deleted = dataArray.splice(index, 1);
    res.json(deleted[0]);
  });
};

// Create CRUD for all features
createCrudRoutes("jadwal-salat", jadwalSalat);
createCrudRoutes("jadwal-imam", jadwalImam);
createCrudRoutes("jadwal-muadzin", jadwalMuadzin);
createCrudRoutes("pengumuman", pengumuman);
createCrudRoutes("inventaris", inventaris);
createCrudRoutes("keuangan", keuangan);
createCrudRoutes("donasi", donasi);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
