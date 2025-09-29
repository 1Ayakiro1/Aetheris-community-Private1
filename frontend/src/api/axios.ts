import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false, // для localStorage подхода
})

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth.token')
    if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

apiClient.interceptors.response.use(
    (resp) => resp,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('auth.token')
            localStorage.removeItem('auth.user')
            window.location.href = '/login'
        }
        return Promise.reject(err)
    }
)

export default apiClient
