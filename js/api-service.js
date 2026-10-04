class ApiService {
    static async fetchProjects() {
        try {
            const response = await fetch('./data/projects.json');
            if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
            return await response.json();
        } catch (err) {
            console.error('[API Network Error - Projects]:', err);
            throw err;
        }
    }

    static async fetchServices() {
        try {
            const response = await fetch('./data/services.json');
            if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
            return await response.json();
        } catch (err) {
            console.error('[API Network Error - Services]:', err);
            throw err;
        }
    }

    static async submitServiceOrder(payload) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ status: "success", data: payload });
            }, 1000);
        });
    }
}