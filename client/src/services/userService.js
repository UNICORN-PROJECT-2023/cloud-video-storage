class UserService { 

    userService = new UserService("/api/user");

    login = async (email, password) => {
      return fetch(userService.api + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json());
    }
    
    register = async (email, password) => {
      return fetch(userService.api + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json());
    }
    
    logout = async  () => {
      return fetch(userService.api + '/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json());
    }

    getCurrentUser = async () => {
        const token = localStorage.getItem('token'); // získání tokenu z localStorage
        return fetch(userService.api + '/getCurrentUser', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json());
    }
}