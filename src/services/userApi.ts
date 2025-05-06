import axios from 'axios';
const BASE_URL = 'https://json-server-api-c9e5.onrender.com';

export const getUsers = () => axios.get(`${BASE_URL}/users`);
export const createUser = (data:any) => axios.post(`${BASE_URL}/users`, data);
export const updateUser = (id:any, data:any) => axios.put(`${BASE_URL}/users/${id}`, data);
export const deleteUser = (id:any) => axios.delete(`${BASE_URL}/users/${id}`);

export const getUserSchema = () => axios.get(`${BASE_URL}/formSchema`);
export const updateUserSchema = (data:any) => axios.put(`${BASE_URL}/formSchema`,data);