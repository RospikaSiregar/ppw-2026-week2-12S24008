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
            errorEl.textContent = `Gagal memuat data: ${this.state.error}`;
        }
    }

    renderProjects(projects) {
        const container = document.getElementById('projectsContainer');
        if (!container) return;

        container.innerHTML = projects.map(proj => `
            <div class="col-md-4 mb-4">
                <article class="project-showcase-card h-100 p-3 shadow-sm rounded border bg-white">
                    <div class="card-image-wrap position-relative mb-3">
                        <img src="${proj.thumbnail}" alt="${proj.title}" class="card-project-img img-fluid rounded w-100" style="height: 180px; object-fit: cover;">
                        <span class="card-badge-overlay badge bg-secondary position-absolute top-0 end-0 m-2">${proj.category}</span>
                    </div>
                    <div class="card-content-body d-flex flex-column h-50">
                        <h3 class="card-heading-title h5 fw-bold">${proj.title}</h3>
                        <p class="text-secondary small">${proj.description.substring(0, 80)}...</p>
                        <button type="button" class="btn btn-outline-danger btn-sm rounded-pill w-100 fw-bold mt-auto"
                                onclick="app.openProjectModal('${proj.id}')">
                            <i class="bi bi-eye-fill me-1"></i> Lihat Penjelasan & Detail
                        </button>
                    </div>
                </article>
            </div>
        `).join('');
    }

    renderServices(services) {
        const serviceSelect = document.getElementById('servicePackageSelect');
        if (!serviceSelect) return;
        
        serviceSelect.innerHTML = '<option value="" selected disabled>Pilih Paket Layanan...</option>' + 
            services.map(srv => `<option value="${srv.packageName}">${srv.packageName} - ${srv.price}</option>`).join('');
    }

    openProjectModal(projectId) {
        const proj = this.state.projects.find(p => p.id === projectId);
        if (!proj) return;

        document.getElementById('projectModalTitle').textContent = proj.title;
        document.getElementById('projectModalBody').innerHTML = `
            <img src="${proj.thumbnail}" class="img-fluid rounded mb-3 w-100" alt="${proj.title}" style="max-height: 250px; object-fit: cover;">
            <p class="text-secondary">${this.escapeHTML(proj.description)}</p>
            <div class="badge bg-primary px-3 py-2">${proj.category}</div>
        `;

        const modalEl = document.getElementById('universalProjectModal');
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }

    escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    setupEventListeners() {
        const form = document.getElementById('serviceOrderForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const payload = Object.fromEntries(formData.entries());
            const submitBtn = form.querySelector('button[type="submit"]');

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Mengirim...';

            try {
                await ApiService.submitServiceOrder(payload);
                this.saveOrderToLocalStorage(payload);
                this.showToastNotification('Sukses!', 'Permintaan layanan berhasil diproses.');
                form.reset();
            } catch (err) {
                this.showToastNotification('Gagal!', 'Terjadi kesalahan pengiriman.', 'danger');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Kirim Permintaan';
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