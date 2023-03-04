import ApiService from "./apiService";

export default class UserService { 
    constructor() {
        this.apiService = new ApiService();
    }

    login = async (email, password) => {
      const response = await this.apiService.post('/user/login', { email, password });
      return response.json();
    }
    
    register = async (email, password) => {
      const response = await this.apiService.post('/user/register', { email, password });
      return response.json();
    }
    
    logout = async () => {
     const response = await this.apiService.post('/user/logout');
     return response.json();
    }

    getCurrentUser = async () => {
      const response = await this.apiService.get('/user/me');
      return response.json();
    }
}