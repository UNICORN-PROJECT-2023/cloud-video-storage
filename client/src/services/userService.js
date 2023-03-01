class UserService { 
    constructor() {
        this.api = '/api/user'
    }
    login = (email, password) => {
        return fetch.post(this.api + '/login', { email, password })
    }

    register = (email, password) => {
        return fetch.post(this.api + '/register', { email, password })
    }

    logout = () => {
        return fetch.post(this.api + '/logout')
    }

    getCurrentUser = () => {
        return fetch.get(this.api + '/api/user')
    }
}