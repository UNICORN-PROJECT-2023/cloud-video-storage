import ApiService from "./apiService";

export default class UserService { 
    constructor() {
        this.apiService = new ApiService();
    }

    login = async (email, password) => {
      const response = await this.apiService.post('/user/login', { email, password });
      if(response.status === 200 || response.status === 201 || response.status === 202) {
        const data = await response.json();
        localStorage.setItem('token', data.body.token);
        return data;
      }
      throw new Error("Failed to login");
    }
    
    register = async (email, username, password) => {
      const response = await this.apiService.post('/user/register', { email, username, password });
      if(response.status === 200 || response.status === 201 || response.status === 202) {
        const data = await response.json();
        localStorage.setItem('token', data.body.token);
        return data;
      }
      throw new Error("Failed to register");
    }

    getCurrentUser = async () => {
      const response = await this.apiService.get('/user/me');
      if(response.status === 200 || response.status === 201 || response.status === 202) {
        const data = await response.json();
        console.log(data)
        return data;
      }
      if(response.status === 401) {
        localStorage.removeItem('token');
      }
      throw new Error("Failed to get current user");
    }
}