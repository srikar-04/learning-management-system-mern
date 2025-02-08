import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 4000, 
})

/* 
    axiosInstance.interceptors.request.use(...):

    This line registers an interceptor for all outgoing HTTP requests made with your axiosInstance.
    An interceptor is a function that modifies or acts on the request configuration before the request is actually sent.
*/

/* 
    config => { ... }:

    This is an arrow function that receives the request configuration object (config).
    The config object contains all details about the request such as the URL, method, headers, data, etc.

    Session storage is a temporary storage mechanism that holds data for the duration of the page session (until the tab or window is closed).


*/
axiosInstance.interceptors.request.use(config => {
    
    const acessToken = JSON.parse(sessionStorage.getItem('acessToken')) || ""
    
    // console.log(acessToken, 'acess Token in axiosInstance');
    if(acessToken) {
        config.headers.Authorization = `Bearer ${acessToken}`
    }

    return config
})

export default axiosInstance