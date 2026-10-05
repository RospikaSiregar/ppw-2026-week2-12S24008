document.addEventListener("DOMContentLoaded", async () => {
    let projectsData = [];

    // 1. Ambil data secara asinkron dari file JSON
    try {
        const [projRes, srvRes] = await Promise.all([
            fetch('./data/projects.json'),
            fetch('./data/services.json')
        ]);
        
        projectsData = await projRes.json();
        const servicesData = await srvRes.json();

        renderProjects(projectsData);
        renderServices(servicesData);
        
        // Sembunyikan loading state
        document.getElementById('loadingState').classList.add('d-none');
    } catch (err) {
        console.error("Gagal memuat data JSON:", err);
        document.getElementById('loadingState').classList.add('d-none');
        const errEl = document.getElementById('errorState');
        errEl.classList.remove('d-none');
        errEl.textContent = "Gagal memuat data portofolio dari server.";
    }

    // 2. Fungsi Render Kartu Proyek
    function renderProjects(projects) {
        const container = document.getElementById('projectsContainer');
        if (!container) return;

        container.innerHTML = projects.map(proj => `
            <article class="project-showcase-card">
                <div class="card-image-wrap">
                    <img src="${proj.thumbnail}" alt="${proj.title}" class="card-project-img">
                    <span class="card-badge-overlay">${proj.badge}</span>
                </div>
                <div class="card-content-body">
                    <span class="domain-tag">${proj.domain}</span>
                    <h3 class="card-heading-title">${proj.title}</h3>
                    <p class="card-description">${proj.description}</p>
                    <div class="tech-stack-row mb-3">
                        ${proj.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                    <button type="button" class="btn btn-outline-danger btn-sm rounded-pill w-100 fw-bold mt-auto" 
                            onclick="openModal('${proj.id}')">
                        <i class="bi bi-eye-fill me-1"></i> Lihat Penjelasan & Detail Proyek
                    </button>
                </div>
            </article>
        `).join('');
    }

    // 3. Fungsi Render Pilihan Layanan ke Select Dropdown
    function renderServices(services) {
        const select = document.getElementById('serviceCategory');
        if (!select) return;

        select.innerHTML = '<option value="" selected disabled>Pilih Peminatan Kolaborasi...</option>' +
            services.map(s => `<option value="${s.packageName}">${s.packageName}</option>`).join('');
    }

    // 4. Universal Modal Handler
    window.openModal = function(id) {
        const proj = projectsData.find(p => p.id === id);
        if (!proj) return;

        document.getElementById('modalCategory').textContent = proj.category;
        document.getElementById('projectModalLabel').textContent = proj.title;
        document.getElementById('modalImage').src = proj.thumbnail;
        document.getElementById('modalDesc').textContent = proj.description;

        new bootstrap.Modal(document.getElementById('projectModal')).show();
    };

    // 5. Penanganan Form Submit Asinkron, Toast & localStorage
    const form = document.querySelector('.consultation-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const userEmail = document.getElementById('userEmail').value;
            const serviceCategory = document.getElementById('serviceCategory').value;
            const projectDetails = document.getElementById('projectDetails').value;

            if (!fullName || !userEmail || !projectDetails || !serviceCategory) {
                form.classList.add('was-validated');
                return;
            }

            const order = { fullName, userEmail, serviceCategory, projectDetails, timestamp: new Date().toISOString() };
            
            // Simpan ke localStorage
            const orders = JSON.parse(localStorage.getItem('serviceOrders')) || [];
            orders.push(order);
            localStorage.setItem('serviceOrders', JSON.stringify(orders));

            // Tampilkan Toast Notifikasi
            document.getElementById('toastTitle').textContent = "Berhasil!";
            document.getElementById('toastBody').textContent = "Formulir kolaborasi berhasil dikirim.";
            new bootstrap.Toast(document.getElementById('liveToast')).show();

            form.reset();
            form.classList.remove('was-validated');
        });
    }
});