import { Skeleton } from "@/components/ui/skeleton.jsx";
import axiosInstance from "../../api/axiosInstance.js";
import { initialSignInFormData, initialSignUpFormData } from "../../config/index.js";
import { checkAuthService, loginServices } from "@/services/services.js";
import { useEffect, useState } from "react";
import { createContext } from "react";

// AuthContext, which is created using createContext, acts as a global variable from which all components can acess the data without passing props to each and every component
export const AuthContext  = createContext(null)

export default function AuthProvider({children}) {

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null
    })
    const [loading, setLoading] = useState(true)

    // console.log(auth, 'auth info');
    

    const handleRegisterUser = async (e) => {
        // console.log('control is reaching handleRegisterUser');

        e.preventDefault()
        
        let data;
       try {
            data = await axiosInstance.post('/auth/register', {
                ...signUpFormData,
                role: 'user'
            })
       } catch (error) {
            if(!error.response.data.success) {
                window.alert(error.response.data.error)
            }
       }
    //    console.log(data.data, "user's signup data");

       if(!data) {
        console.log('unable to register user');
        } 

       if(data?.data.success) {
        window.alert(data.data.msg)
       }
       setSignUpFormData(initialSignUpFormData)
    }

    const handleLoginUser = async (e) => {
        // console.log('control is reaching handleLoginUser in state');
        
        e.preventDefault()

        const data = await loginServices(signInFormData)
        
        if(!data) {
            console.log('unable to login user');
        }
        // console.log(data.data.acessToken, 'acessToken details');
        if(data?.data.success) {
            sessionStorage.setItem('acessToken', JSON.stringify(data.data.acessToken))
            setAuth({
                authenticate: true,
                user: data.data.user
            })
            window.alert(data.data.msg)
        }  else {
            setAuth({
                authenticate: false,
                user: null
            })
        } 
        console.log(auth);
        
        setSignInFormData(initialSignInFormData)
    }

    const checkAuthUser = async () => {
        const data = await checkAuthService()
        console.log(data, 'data inside check auth user');
        

        if(data?.success) {
            setAuth({
                authenticate: true,
                user: data.data.user
            })
            setLoading(false)
        } else {
            
            setAuth({
                authenticate: false,
                user: null
            })
            setLoading(false)
        }
    }

   // check auth user
    useEffect( () => {
        checkAuthUser()
    }, [])

    return (
        <AuthContext.Provider value={{
            signUpFormData,
            setSignUpFormData,
            signInFormData,
            setSignInFormData,
            handleRegisterUser,
            handleLoginUser,
            auth
        }}>
            {/* this children is "app" */}
            {
                loading ? <Skeleton /> : children 
            }
        </AuthContext.Provider>
    )
}