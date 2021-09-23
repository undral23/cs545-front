import axios from "axios";
import alertService from "./alert.service";

export class ApiService {
    baseUrl = 'http://localhost:8080';

    postDefaultOptions = {
        successMessage: 'Successful!',
        showError: true,
        axios: {}
    }

    putDefaultOptions = {
        successMessage: 'Successful!',
        showError: true,
        axios: {}
    }

    deleteDefaultOptions = {
        successMessage: 'Successful!',
        showError: true,
        axios: {}
    }

    getDefaultOptions = {
        successMessage: false,
        showError: true,
        axios: {}
    }

    async post(apiUrl, data, options) {
        const opt = {
            ...this.postDefaultOptions,
            ...options
        };

        try {
            const resp = await axios.post(`${this.baseUrl}/${apiUrl}`, data, opt.axios);
            if (opt.successMessage) {
                alertService.showSuccess(opt.successMessage);
            }
            return resp.data;
        }
        catch (error) {
            if (opt.showError) {
                alertService.showError(error.message);
            }
            throw error;
        }
    }

    async put(apiUrl, data, options) {
        const opt = {
            ...this.putDefaultOptions,
            ...options
        };

        try {
            const resp = await axios.put(`${this.baseUrl}/${apiUrl}`, data, opt.axios);
            if (opt.successMessage) {
                alertService.showSuccess(opt.successMessage);
            }
            return resp.data;
        }
        catch (error) {
            if (opt.showError) {
                alertService.showError(error.message);
            }
            throw error;
        }
    }

    async delete(apiUrl, data, options) {
        const opt = {
            ...this.deleteDefaultOptions,
            ...options
        };

        try {
            const resp = await axios.delete(`${this.baseUrl}/${apiUrl}`, data, opt.axios);
            if (opt.successMessage) {
                alertService.showSuccess(opt.successMessage);
            }
            return resp.data;
        }
        catch (error) {
            if (opt.showError) {
                alertService.showError(error.message);
            }
            throw error;
        }
    }

    async get(apiUrl, data, options) {
        const opt = {
            ...this.getDefaultOptions,
            ...options
        };

        try {
            const resp = await axios.get(`${this.baseUrl}/${apiUrl}`, data, opt.axios);
            if (opt.successMessage) {
                alertService.showSuccess(opt.successMessage);
            }
            return resp.data;
        }
        catch (error) {
            if (opt.showError) {
                alertService.showError(error.message);
            }
            throw error;
        }
    }
}

const apiService = new ApiService();

export default apiService;