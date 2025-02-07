import axiosInstance from "../../api/axiosInstance.js";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { loginServices } from "@/services/services.js";
import { useState } from "react";
import { createContext } from "react";

// AuthContext, which is created using createContext, acts as a global variable from which all components can acess the data without passing props to each and every component
export const AuthContext  = createContext(null)

export default function AuthProvider({children}) {

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)

    const handleRegisterUser = async (e) => {
        console.log('control is reaching handleRegisterUser');

        e.preventDefault()
        
        const data = await axiosInstance.post('/auth/register', {
            ...signUpFormData,
            role: 'user'
        })

        if(!data) {
            console.log('unable to register user');
        }
        // this "user" contains data payload acess that
        console.log(data, 'data fetched at frontend using axios');
    }

    const handleLoginUser = async (e) => {
        console.log('control is reaching handleLoginUser in state');
        
        e.preventDefault()

        const data = loginServices(signInFormData)

        if(!data) {
            console.log('unable to login user');
        }
    }

    return (
        <AuthContext.Provider value={{
            signUpFormData,
            setSignUpFormData,
            signInFormData,
            setSignInFormData,
            handleRegisterUser,
            handleLoginUser
        }}>
            {/* this children is "app" */}
            {children} 
        </AuthContext.Provider>
    )
}