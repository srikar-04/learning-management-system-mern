import axiosInstance from "../api/axiosInstance.js";

export async function loginServices(formData) {
    console.log('control is reaching loginServices');
    
    let data
    try {
        data  = await axiosInstance.post('/auth/login', formData)
    } catch (error) {
        if(!error.response?.data.success) {
            window.alert(error.response?.data.error)
        }
    }

    return data;
}

export async function checkAuthService() {
    console.log('control is inside auth services');
    
    try {
        const { data } = await axiosInstance.get('auth/check-auth')
        console.log(data, 'data fetched in check auth services');
        return data
    } catch (error) {
        console.log('error in check auth services', error);
        // throw new Error('error in auth services')
        return error.response.data
    }
}