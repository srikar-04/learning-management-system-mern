import { createContext } from "react";

// AuthContext, which is created using createContext, acts as a global variable from which all components can acess the data without passing props to each and every component
export const AuthContext  = createContext(null)

export default function AuthProvider({children}) {
    return (
        <AuthContext.Provider value={{}}>
            {/* this children is "app" */}
            {children} 
        </AuthContext.Provider>
    )
}