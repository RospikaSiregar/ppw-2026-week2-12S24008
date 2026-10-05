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
Sesuai dengan prinsip rekayasa perangkat lunak dan pemisahan minat (*Separation of Concerns* / SoC), arsitektur sistem dibagi ke dalam tiga lapisan mandiri:
1. **Presentation Tier (Client Tier):** Bertanggung jawab atas render antarmuka pengguna berbasis dokumen HTML semantik (`index.html`), penataan gaya visual menggunakan Bootstrap 5.3 serta lembar gaya kustom (`custom-style.css`), dan pengelolaan logika kontrol DOM interaktif via `app.js`.
2. **Static Server & CDN Tier:** Berfungsi untuk melayani kerangka shell aplikasi dasar, skrip pengendali, dan aset gambar secara global dengan latensi rendah.
3. **Data Storage & Mock REST API Tier:** Lapisan penyimpan data modular yang terdiri dari berkas `projects.json`, `services.json`, dan `profile.json` yang diakses secara asinkron menggunakan modul layanan `api-service.js`.

Berikut adalah pemodelan arsitektur sistem menggunakan *C4 Container Diagram*:

mermaid

C4Container
    title C4 Container Diagram - Decoupled Web Portfolio & Service Portal
    
    Person(user, "Pengguna / Visitor", "Mengakses portofolio via browser")
    
    System_Boundary(c1, "Presentation & Client Tier") {
        Container(client, "Browser Client", "HTML5, Bootstrap 5.3, JS", "Merender DOM secara dinamis (CSR) dan antarmuka pengguna")
    }
    
    System_Boundary(c2, "Static Server & CDN Tier") {
        Container(cdn, "CDN / Static Server", "GitHub Pages / Netlify", "Menyampaikan kerangka statis HTML, CSS, dan asset secara global")
    }
    
    System_Boundary(c3, "Data Storage & Mock API Tier") {
        Container(jsonStore, "JSON Data Providers", "projects.json, services.json, profile.json", "Menyimpan data terstruktur sebagai mock REST API")
        Container(restApi, "Mock REST API Dispatch", "Async Fetch API", "Menangani pengambilan data asinkron via async/await")
    }

    Rel(user, client, "Meminta Halaman Web", "HTTPS")
    Rel(client, cdn, "Mengunduh Asset & Shell", "HTTP/2")
    Rel(client, restApi, "Mengambil Data Modular", "Fetch API")
    Rel(restApi, jsonStore, "Membaca Berkas JSON", "I/O Asinkron")

