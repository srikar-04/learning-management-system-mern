import axiosInstance from "../api/axiosInstance.js";

export async function loginServices(formData) {
    console.log('control is reaching loginServices');
    
    let data
    try {
        data  = await axiosInstance.post('/auth/login', formData)
    } catch (error) {
        if(!error.response.data.success) {
            window.alert(error.response.data.error)
        }
    }

    return data;
}

export async function checkAuth() {
    const { data } = await axiosInstance.get('auth/check-auth')

    return data
}