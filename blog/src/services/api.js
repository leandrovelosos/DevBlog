import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.211.114.210:1337/'
})

export default api;