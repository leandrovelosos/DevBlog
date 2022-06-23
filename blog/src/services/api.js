import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.211.113.236:1337/'
})

export default api;