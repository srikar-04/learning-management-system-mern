import axiosInstance from "../api/axiosInstance.js";

export async function loginServices(formData) {
    // console.log('control is reaching loginServices');
    
    let data
    try {
        data  = await axiosInstance.post('/auth/login', formData)
    } catch (error) {
        console.log(error, 'error if authentication failed in login services')
        if(error.response && !error.response.data.success) {
            window.alert(error.response?.data.error)
        }
    }

    return data;
}

export async function checkAuthService() {
    // console.log('control is inside auth services');
    
    try {
        const { data } = await axiosInstance.get('auth/check-auth')
        console.log(data, 'data fetched in check auth services in second trip');
       if(data) {
        return data
       } else {
        return null
       }
    } catch (error) {
        // console.log(error, 'gpt error in second trip');
        
        // console.log('error in check auth services', error);
        // Check if the error message indicates the token expired.
        if (error.message === 'TokenExpiredError' || "Network Error") {
            // console.log('inside gpt erro block code');
            
            // Clear the expired token from session storage
            sessionStorage.clear();
            return { success: false, msg: 'Session expired, please login again' };
        }
        // For any other error, return the error response data.
        return error.response?.data;
    }
}

export async function mediaUploadService(formData) {
    const { data } = await axiosInstance.post('/media/upload', formData);
    
    return data
}

export async function mediaDeleteService(id) {
    const {data} = await axiosInstance.delete(`/media/delete/${id}`)
    return data
}

export const fetchInstructorCourseListService = async () => {
   try {

        const { data } = await axiosInstance.get('/instructor/course/get')

        if(!data?.success) {
            throw new Error('unable to fetch instructor course list in services')
        }

        return data

   } catch (error) {
        console.error('error while fetching instructor courses : ', error);
        throw error
   }
}

export const addNewCouseService = async (courseData) => {
    try {
        const { data } = await axiosInstance.post('/instructor/course/add', courseData)

        if(!data?.success) {
            throw new Error('unable to add instructor course details in services')
        }
    
        return data
    } catch (error) {
        console.error('error while adding new course in services : ', error);
        throw error
    }
}
export const fetchInstructorCourseDetailsService = async (id) => {
    try {
        const { data } = await axiosInstance.get(`/instructor/course/get/details/${id}`)

        if(!data?.success) {
            throw new Error('unable to fetch instructor course details in services')
        }
    
        return data
    } catch (error) {
        console.error('error while adding new course in services : ', error);
        throw error
    }
}
export const updateCourseByIdService = async (id, updatedCourseData) => {
    try {
        console.log('inside update services');
        
        const { data } = await axiosInstance.put(`/instructor/course/update/${id}`, updatedCourseData)

        if(!data?.success) {
            throw new Error('unable to fetch instructor course details in services')
        }
    
        return data
    } catch (error) {
        console.error('error while adding new course in services : ', error);
        throw error
    }
}

export async function mediaBulkUploadService(formData) {
    const { data } = await axiosInstance.post('/media/bulk-upload', formData);
    
    return data
}

