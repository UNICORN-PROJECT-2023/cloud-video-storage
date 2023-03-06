import ApiService from "./apiService";

export default class UserService { 
    constructor() {
        this.apiService = new ApiService();
    }

    login = async (email, password) => {
      const response = await this.apiService.post('/user/login', { email, password });
      return response.json();
    }
    
    register = async (name, email, password) => {
      const response = await this.apiService.post('/user/register', { name, email, password });
      if(response.status === 200 || response.status === 201 || response.status === 202) {
        return await response.json();
      }
      throw new Error("Failed to register");
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