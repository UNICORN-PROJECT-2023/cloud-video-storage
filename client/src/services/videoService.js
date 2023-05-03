import ApiService from "./apiService";

export default class VideoService {

    constructor() {
        this.apiService = new ApiService();
    }

    getAllVideos = async (categoryId) => {
        let url = '/video/all';
        if (categoryId) {
            url += `?categoryId=${categoryId}`;
        }
        const response = await this.apiService.get(url);
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            return await response.json();
        }
        throw new Error("Failed to get all videos");
    }

    getUserVideos = async () => {
        const response = await this.apiService.get('/video/me');
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
        }
        throw new Error("Failed to get user videos");
    }

    getVideo = async (id) => {
        const response = await this.apiService.get(`/video/${id}`);
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
        }
        throw new Error("Failed to get video");
    }

    createVideo = async (name, description, episode, originalLink, materials = [], categories = []) => {
        const response = await this.apiService.post('/video', { name, description, episode, originalLink, materials, categories});
        console.log(await response.json());
        console.log(response);
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            return;
        }
        const error = await response.json();
        throw new Error(error.message);
    }

    updateVideo = async (id, name, description, episode, originalLink, materials = [], categories = []) => {
        const response = await this.apiService.put(`/video/${id}`, { name, description, episode, originalLink, materials, categories });
        console.log(await response.json());
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            return;
        }
        throw new Error("Failed to update video");
    }

    deleteVideo = async (id) => {
        const response = await this.apiService.delete(`/video/${id}`);
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
        }
        throw new Error("Failed to delete video");
    }

    getVideoList = async () => {
        const response = await this.apiService.get(`/video/list/all`)
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
        } 
        throw new Error("Failed to get video list");
    }

    addVideoList = async (id) => {
        const response = await this.apiService.post(`/video/list/${id}`);
        if (response.status === 200 || response.status === 201 || response.status === 202){
            const data = await response.json();
            return data;
        }
    }

    deleteVideoList = async (id) => {
        const response = await this.apiService.delete(`/video/list/${id}`);
        if (response.status === 200 || response.status === 201 || response.status === 202){
            const data = await response.json();
            return data;
        }
    };

    getCategories = async () => {
        const response = await this.apiService.get('/category/all');
        if (response.status === 200 || response.status === 201 || response.status === 202){
            const data = await response.json();
            return data;
        }
    }
}
