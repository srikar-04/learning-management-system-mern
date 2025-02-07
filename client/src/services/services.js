import axiosInstance from "../api/axiosInstance.js";

export async function loginServices(formData) {
    console.log('control is reaching loginServices');
    
    const { data } = await axiosInstance.post('/auth/login', formData)

    return data;
}

export async function checkAuth() {
    const { data } = await axiosInstance.get('auth/check-auth')

    return data
}