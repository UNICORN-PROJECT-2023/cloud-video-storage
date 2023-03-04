export default class ApiService {
    constructor() {
      this.baseURL = 'http://localhost:3000';
    }
  
    async get(url) {
      const response = await fetch(this.baseURL + url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
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
      return response;
    }
  
    async delete(url) {
      const response = await fetch(this.baseURL + url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    }
  }