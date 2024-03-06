import axios from 'axios'

// const API = axios.create({ baseURL: 'http://localhost:5000/' });
// const API = axios.create({ baseURL: 'https://blog-backend-7kvy.onrender.com' });
const API = axios.create({ baseURL: 'https://account-back.onrender.com/' })

// export const getUser = (userId) => API.get(`user/${userId}`);

export const logIn = formData => API.post('/user/login', formData)
export const autoLogin = formData => API.post('/user/autologin', formData)

export const createCustomer = formData => API.post('/user', formData)
export const getCustomer = id => API.get(`/user/${id}`)
export const deleteCustomer = id => API.delete(`/user/${id}`)
export const getCustomers = () => API.get('/user')
export const updateCustomer = (id, formData) => API.put(`/user/${id}`, formData)
