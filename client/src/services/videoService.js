import ApiService from "./apiService";

export default class VideoService {

    constructor() {
        this.apiService = new ApiService();
    }

    getAllVideos = async () => {
        const response = await this.apiService.get('/video/all');
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
        }
        throw new Error("Failed to get all videos");
    }

    getVideo = async (id) => {
        const response = await this.apiService.get(`/video/${id}`);
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
        }
        throw new Error("Failed to get video");
    }

    createVideo = async (name, description, episode, originalLink, materials = []) => {
        const response = await this.apiService.post('/video', { name, description, episode, originalLink, materials});
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
        }
        throw new Error("Failed to create video");
    }

    updateVideo = async (id, title, description, videoUrl) => {
        const response = await this.apiService.put(`/video/${id}`, { title, description, videoUrl });
        if (response.status === 200 || response.status === 201 || response.status === 202) {
            const data = await response.json();
            return data;
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
}