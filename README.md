# Pengembangan Halaman Web Portofolio & Layanan Interaktif Accessible

Repositori ini memuat implementasi proyek mandiri Minggu ke-2 untuk mata kuliah **Pemrograman dan Pengujian Aplikasi Web (12S3101)** pada Program Studi S1 Sistem Informasi, Fakultas Informatika dan Teknik Elektro, Institut Teknologi Del.

Proyek ini berupa sebuah *Single Page Showcase Webpage* yang memadukan profil profesional mahasiswa Sistem Informasi, rekapitulasi studi kasus rekayasa produk digital, data tabular riwayat akademik, serta formulir pemesanan layanan konsultasi interaktif yang dirancang dengan prinsip semantik HTML5, arsitektur CSS3 modern, dan kepatuhan standar aksesibilitas WCAG 2.2 Level AA.

---

## 🌐 Tautan Publikasi (Deployment)

* **URL Live Demo (GitHub Pages):** [https://[username-anda].github.io/ppw-2026-week2-[NIM]/](https://[username-anda].github.io/ppw-2026-week2-[NIM]/)
* **URL Repositori GitHub:** [https://github.com/[username-anda]/ppw-2026-week2-[NIM]](https://github.com/[username-anda]/ppw-2026-week2-[NIM])

> *Catatan: Ganti `[username-anda]` dan `[NIM]` sesuai dengan identitas akun dan NIM resmi Anda.*

---

## 👤 Identitas Pengembang

* **Nama Lengkap:** Rospika Sarah Yosefin Siregar
* **NIM:** [Masukkan NIM Anda]
* **Program Studi:** S1 Sistem Informasi
* **Fakultas:** Fakultas Informatika dan Teknik Elektro
* **Institusi:** Institut Teknologi Del
* **Dosen Pengampu:** Chandro Pardede, S.Kom., M.Sc.

---

## 🚀 Ringkasan Fitur & Spesifikasi Teknis (Requirements Checklist)

Proyek ini telah memenuhi seluruh kriteria evaluasi Sub-CPMK 12-02-09-01:

### 1. Struktur Semantik Dokumen HTML5 (Bobot 20%)
* Memanfaatkan elemen semantik murni: `<header>`, `<nav>`, `<main>`, minimal 3 buah `<section>`, `<aside>`, dan `<footer>` tanpa ketergantungan pada *div-soup*.
* **Section 1 (Hero & Tentang Saya):** Memuat elevator pitch, tombol CTA, potret profesional dengan animasi *soft float*, dan daftar tahapan kerja menggunakan `<ol>`.
* **Section 2 (Portofolio Karya):** 
* **Section 3 (Riwayat Akademik):** 
* **Section 4 (Pesan Layanan):** Formulir reservasi kolaborasi interaktif.
* **Elemen Aside:** 

### 2. Penyajian Data Tabular & Lists (Bobot 15%)
* Tabel data semantik lengkap menggunakan elemen `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, serta atribut aksesibilitas `scope="col"` dan `scope="row"`.
* Menerapkan 2 jenis daftar HTML:
  * **Ordered List (`<ol>`):** Alur kerja rekayasa dan inovasi pada profil utama.
  * **Unordered List (`<ul>`):** Navigasi menu utama dan daftar keahlian/toolset pada panel sidebar.

### 3. Formulir Interaktif & Aksesibel WCAG 2.2 (Bobot 20%)
* Dikelompokkan secara terstruktur dengan 2 blok `<fieldset>` dan `<legend>`.
* Mengimplementasikan lebih dari 6 jenis kontrol input: `text`, `email`, `tel`, `number`, `select`, `radio`, `checkbox`, dan `textarea`.
* Seluruh input terhubung secara eksplisit dengan atribut `<label for="...">`.
* Memiliki atribut validasi native HTML5 (`required`, `min`, `max`, `placeholder`) serta *focus ring* visual untuk navigasi keyboard ramah difabel.

### 4. Estetika Desain & Tata Letak CSS Modern (Bobot 25%)
* Menggunakan berkas eksternal (`style.css`) dengan penerapan *Universal Box-Sizing Reset* (`box-sizing: border-box`).
* Menerapkan aturan palet warna **60-30-10** 
  * **60% Dominan Netral:** 
  * **30% Struktur & Tipografi:** 
  * **10% Aksen Aksi:** 
* Dilengkapi animasi CSS3: *running text ticker*, efek gradien teks berkilau (*shimmer*), *floating portrait animation*, serta transisi hover elevasi kartu.
* Sepenuhnya responsif di berbagai resolusi layar (Desktop, Tablet, Mobile) memanfaatkan CSS Grid, Flexbox, dan Media Queries (`@media (max-width: 960px)` dan `@media (max-width: 640px)`).

### 5. Manajemen Versi & Publikasi (Bobot 20%)
* Kode sumber dikelola rapi menggunakan Git dengan pesan commit yang jelas.
* Repositori dipublikasikan secara langsung melalui GitHub Pages.

---

## 📁 Struktur Direktori Berkas Proyek

```text
ppw-2026-week2-[NIM]/
├── index.html          # Struktur dokumen semantik HTML5 halaman portofolio
├── style.css           # Lembar gaya CSS3 eksternal (layout, token warna, & animasi)
└── README.md           # Dokumentasi teknis proyek dan laporan kepatuhan rubrik