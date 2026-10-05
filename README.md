# Personal Portfolio & Service Portal - Week 4
## Laporan Teknis Transformasi Arsitektur Web: Decoupled Multi-Tier, Dynamic Client-Side Rendering (CSR), dan Profiling Kinerja Jaringan

## Identitas Pengembang
* **Nama Lengkap:** Rospika Sarah Yosefin Siregar
* **NIM:** 12S24008
* **Program Studi:** S1 Sistem Informasi
* **Fakultas:** Fakultas Informatika dan Teknik Elektro
* **Institusi:** Institut Teknologi Del
* **Mata Kuliah:** Pemrograman dan Pengujian Web (12S3101)
* **Dosen Pengampu:** Chandro Pardede, S.Kom., M.Sc.

---

## 1. Pendahuluan dan Latar Belakang Proyek
Praktikum Mandiri Minggu 4 ini berfokus pada transisi dari pengembangan aplikasi web monolitik statis menuju arsitektur web modern yang terdekuplet (*decoupled multi-tier architecture*). Jika pada penugasan Minggu 3 seluruh data teks, elemen kartu portofolio, dan struktur antarmuka ditulis secara manual (*hardcoded*) di dalam dokumen HTML, maka pada penugasan minggu ini seluruh lapisan data dan logika tampilan dipisahkan secara modular. Transformasi ini bertujuan untuk meningkatkan skalabilitas aplikasi, mempermudah pemeliharaan data melalui format JSON terstruktur, serta mengoptimalkan pengalaman pengguna (*User Experience*) menggunakan teknik *Client-Side Rendering* (CSR) berbasis asinkron.

---

## 2. Pemodelan Arsitektur Sistem dan Prinsip Separation of Concerns (SoC)
Penerapan *Separation of Concerns* (SoC) dalam proyek ini membagi tanggung jawab fungsional sistem ke dalam tiga lapisan terpisah secara mandiri:

* **Presentation Tier (Lapisan Presentasi / Client):** 
  Berada pada peramban web pengguna dan dibangun menggunakan kerangka HTML5 semantik, penataan gaya visual Bootstrap 5.3, serta lembar gaya kustom (`style.css`). Lapisan ini bertanggung jawab penuh untuk menampilkan kerangka antarmuka, menangani interaksi pengguna, serta merender elemen DOM secara dinamis.
* **Application / Service Logic Tier (Lapisan Logika Layanan):** 
  Diimplementasikan melalui modul kelas `ApiService` dan `PortfolioApp` pada berkas JavaScript (`api-service.js` dan `app.js`). Lapisan ini mengatur mekanisme permintaan data asinkron menggunakan fungsi `fetch()` dan penanganan janji berbasis `async/await`, mengelola status antarmuka (*UI States*), serta menangani validasi formulir kolaborasi.
* **Data Storage & Service Tier (Lapisan Penyimpanan Data):** 
  Berfungsi sebagai simulasi lapisan *mock RESTful API* lokal yang menyimpan seluruh informasi terstruktur di dalam direktori `/data/`. Berkas-berkas tersebut meliputi `projects.json` (katalog portofolio karya), `service.json` (pilihan paket layanan kolaborasi), dan `profile.json` (biodata dan afiliasi pengembang).

---

## 3. Komparasi Komprehensif: Arsitektur Minggu 3 vs Minggu 4
Tabel berikut menjabarkan perbandingan teknis antara pendekatan monolitik statis dengan pendekatan arsitektur dekuplet kontemporer:

| Parameter Evaluasi | Minggu 3 (Monolitik Statis) | Minggu 4 (Decoupled & Dynamic CSR) |
| :--- | :--- | :--- |
| **Sumber Data** | Ditulis secara statis dan manual (*hardcoded*) di dalam berkas `index.html` | Dipisahkan ke dalam direktori berkas data modular berbentuk JSON (`/data/`) |
| **Paradigma Rendering** | Berbasis dokumen statis HTML bawaan yang dimuat langsung oleh server | Menggunakan *Client-Side Rendering* (CSR) asinkron via eksekusi skrip JavaScript dinamis |
| **Manajemen Dialog Modal** | Memanfaatkan banyak elemen dialog modal statis yang terduplikasi untuk setiap item proyek | Menggunakan tepat satu komponen *Universal Dynamic Modal* berbasis pengenalan ID dan injeksi data asinkron |
| **Pengiriman Formulir & State** | Menggunakan metode standar HTML yang memicu pemuatan ulang halaman penuh (*full page reload*) | Menggunakan pengiriman asinkron murni (AJAX/Fetch POST), umpan balik visual Toast, serta penyimpanan persisten `localStorage` |

---

## 4. Analisis Kinerja Jaringan dan Caching (Browser DevTools / RFC 9111)
Berdasarkan serangkaian pengujian, pemantauan, dan pengukuran melalui panel jaringan (*Network Tab*) pada Google Chrome DevTools, berikut adalah hasil analisis kinerja aplikasi:

* **Time to First Byte (TTFB):** 
  Menunjukkan nilai yang sangat cepat dan efisien (berkisar antara ~12 ms pada *Warm Load* hingga ~45 ms pada *Cold Load*) karena dokumen kerangka utama dilayani langsung dari penyimpanan lokal atau *edge server* peramban.
* **Status HTTP Berkas JSON:** 
  Permintaan asinkron terhadap berkas-berkas data (`projects.json` dan `service.json`) menghasilkan kode status `200 OK` pada muatan awal (*Cold Load*), dan berhasil memicu status `304 Not Modified` pada pemuatan berikutnya (*Warm Load*). Hal ini didukung oleh konfigurasi header penelusuran *Cache-Control* dan ETag yang menghemat penggunaan pita lebar (*bandwidth*) jaringan.
* **Total Waktu Pemuatan dan Eksekusi:** 
  Proses pemutakhiran antarmuka berjalan secara mulus tanpa menghalangi proses render utama peramban (*non-blocking rendering*), berkat pemanfaatan model pemrograman asinkron berbasis janji (*Promises*).

---

