class PortfolioApp {
    constructor() {
        this.state = {
            projects: [],
            services: [],
            loading: true,
            error: null
        };
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
    }

    async loadData() {
        this.setUIState('loading');
        try {
            this.state.projects = await ApiService.fetchProjects();
            this.state.services = await ApiService.fetchServices();
            this.state.loading = false;
            this.renderProjects(this.state.projects);
            this.renderServices(this.state.services);
            this.setUIState('success');
        } catch (err) {
            this.state.error = err.message;
            this.setUIState('error');
        }
    }

    setUIState(status) {
        const loadingEl = document.getElementById('loadingState');
        const errorEl = document.getElementById('errorState');
        const containerEl = document.getElementById('projectsContainer');

        if (!loadingEl || !errorEl || !containerEl) return;

        loadingEl.classList.add('d-none');
        errorEl.classList.add('d-none');
        containerEl.classList.remove('d-none');

        if (status === 'loading') {
            loadingEl.classList.remove('d-none');
            containerEl.classList.add('d-none');
        } else if (status === 'error') {
            errorEl.classList.remove('d-none');
            containerEl.classList.add('d-none');
            errorEl.textContent = `Gagal memuat data portofolio: ${this.state.error}`;
        }
    }

    renderProjects(projects) {
        const container = document.getElementById('projectsContainer');
        if (!container) return;

        // Menggunakan struktur grid Bootstrap (row, col-md-4, mb-4) seperti standar modul
        container.className = "row";
        container.innerHTML = projects.map(proj => `
            <div class="col-md-4 mb-4 d-flex align-items-stretch">
                <article class="project-showcase-card w-100">
                    <div class="card-image-wrap">
                        <img src="${proj.thumbnail}" alt="Preview ${proj.title}" class="card-project-img">
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
                                onclick="app.openUniversalModal('${proj.id}')">
                            <i class="bi bi-eye-fill me-1"></i> Lihat Penjelasan & Detail Proyek
                        </button>
                    </div>
                </article>
            </div>
        `).join('');
    }

    renderServices(services) {
        const selectEl = document.getElementById('serviceCategory');
        if (!selectEl) return;

        selectEl.innerHTML = '<option value="" selected disabled>Pilih Peminatan Kolaborasi...</option>' +
            services.map(srv => `<option value="${srv.packageName}">${srv.packageName}</option>`).join('');
    }

    openUniversalModal(projectId) {
        const proj = this.state.projects.find(p => p.id === projectId);
        if (!proj) return;

        document.getElementById('modalCategory').textContent = proj.category;
        document.getElementById('projectModalLabel').textContent = proj.title;
        document.getElementById('modalImage').src = proj.thumbnail;
        document.getElementById('modalDesc').textContent = proj.description;

        const modalEl = document.getElementById('projectModal');
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }

    setupEventListeners() {
        const form = document.querySelector('.consultation-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const userEmail = document.getElementById('userEmail').value;
            const serviceCategory = document.getElementById('serviceCategory').value;
            const projectDetails = document.getElementById('projectDetails').value;

            if (!fullName || !userEmail || !projectDetails) {
                form.classList.add('was-validated');
                return;
            }

            const payload = { fullName, userEmail, serviceCategory, projectDetails };
            const submitBtn = form.querySelector('.submit-button');

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Mengirim Formulir...';

            try {
                await ApiService.submitServiceOrder(payload);
                this.saveOrderToLocalStorage(payload);
                this.showToastNotification('Sukses!', 'Formulir kolaborasi berhasil dikirim.');
                form.reset();
                form.classList.remove('was-validated');
            } catch (err) {
                this.showToastNotification('Gagal!', 'Terjadi kesalahan jaringan.', 'danger');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Ajukan Formulir Kolaborasi';
            }
        });
    }

    saveOrderToLocalStorage(payload) {
        const orders = JSON.parse(localStorage.getItem('serviceOrders')) || [];
        orders.push({ ...payload, timestamp: new Date().toISOString() });
        localStorage.setItem('serviceOrders', JSON.stringify(orders));
    }

    showToastNotification(title, message) {
        const toastEl = document.getElementById('liveToast');
        if (!toastEl) return;
        document.getElementById('toastTitle').textContent = title;
        document.getElementById('toastBody').textContent = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}

const app = new PortfolioApp();