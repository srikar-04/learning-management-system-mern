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
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null
    })

    /* 
        data
: 
msg
: 
"user registered sucesfully"
newUser
: 
{userName: 'shobha', password: '$2a$10$aNr26AUE3vHu8bTWKLthwuW5fJI8M9LxLqYhbSfvvitMgAt2jeGs.', userEmail: 'shobhapurijala1212@gmail.com', role: 'user', _id: '67a605795288eefcb8074b09', …}
success
: 
true
    */

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
       setSignUpFormData({})
    }

    const handleLoginUser = async (e) => {
        // console.log('control is reaching handleLoginUser in state');
        
        e.preventDefault()

        const data = await loginServices(signInFormData)
        
        if(!data) {
            console.log('unable to login user');
        }
        // console.log(data.data.acessToken, 'acessToken details');
        if(data.data.success) {
            sessionStorage.setItem('acessToken', JSON.stringify(data.data.acessToken))
            setAuth({
                authenticate: true,
                user: data.data.user
            })
            window.alert(data.data.msg)
        }
        setSignInFormData({})
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