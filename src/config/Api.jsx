import axios from "axios";

const api = axios.create( { baseURL : 'http://35.184.203.56:8016' });

api.interceptors.request.use(
    async config => {
      config.headers = { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });

  export default api;