import axiosInstance from "../../api/axiosInstance.js";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { useState } from "react";
import { createContext } from "react";

// AuthContext, which is created using createContext, acts as a global variable from which all components can acess the data without passing props to each and every component
export const AuthContext  = createContext(null)

export default function AuthProvider({children}) {

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)

    const handleRegisterUser = async (e) => {
        console.log('control is reaching state');

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

    return (
        <AuthContext.Provider value={{
            signUpFormData,
            setSignUpFormData,
            signInFormData,
            setSignInFormData,
            handleRegisterUser
        }}>
            {/* this children is "app" */}
            {children} 
        </AuthContext.Provider>
    )
}