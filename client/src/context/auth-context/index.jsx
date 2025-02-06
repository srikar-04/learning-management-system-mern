import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { useState } from "react";
import { createContext } from "react";

// AuthContext, which is created using createContext, acts as a global variable from which all components can acess the data without passing props to each and every component
export const AuthContext  = createContext(null)

export default function AuthProvider({children}) {

    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData)

    return (
        <AuthContext.Provider value={{
            signUpFormData,
            setSignUpFormData,
            signInFormData,
            setSignInFormData
        }}>
            {/* this children is "app" */}
            {children} 
        </AuthContext.Provider>
    )
}