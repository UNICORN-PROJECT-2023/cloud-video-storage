export default class ApiService {
    constructor() {
      this.baseURL = 'http://localhost:3000/user';
    }
  
    async get(url) {
      const response = await fetch(this.baseURL + url);
      return response.json();
    }
  
    async post(url, data) {
      const response = await fetch(this.baseURL + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    }
    
  
    async put(url, data) {
      const response = await fetch(this.baseURL + url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.json();
    }
  
    async delete(url) {
      const response = await fetch(this.baseURL + url, {
        method: 'DELETE'
      });
      return response.json();
    }
  }