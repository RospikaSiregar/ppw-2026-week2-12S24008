# Personal Portfolio & Service Portal - Week 4 (Decoupled Multi-Tier Architecture)

## 👤 Developer Identity
* **Nama:** Rospika Sarah Yosefin Siregar
* **Program Studi:** S1 Sistem Informasi
* **Fakultas:** Fakultas Informatika dan Teknik Elektro
* **Institusi:** Institut Teknologi Del
* **Dosen Pengampu:** Chandro Pardede, S.Kom., M.Sc.

---

## 🏗️ 1. Pemodelan Arsitektur Sistem (C4 Container Model)
```mermaid
C4Container
    title C4 Container Diagram - Decoupled Web Portfolio
    Person(user, "Pengguna / Visitor", "Mengakses web portofolio via browser")
    System_Boundary(c1, "Presentation Tier") {
        Container(spa, "Single Page / CSR Shell", "HTML5, Bootstrap 5.3, JS", "Merender DOM secara dinamis di klien")
    }
    System_Boundary(c2, "Data Storage & Service Tier") {
        Container(jsonStore, "JSON Data Providers", "projects.json, service.json, profile.json", "Menyimpan data terstruktur sebagai mock REST API")
    }
    Rel(user, spa, "Meminta Halaman / Berinteraksi", "HTTPS")
    Rel(spa, jsonStore, "Mengambil Data Asinkron", "Fetch API / JSON")