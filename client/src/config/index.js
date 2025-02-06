// creating a common form

export const signUpFormControls = [
    {
        name: 'userName',
        label: 'username',
        placeholder: 'enter your username',
        type: 'text',
        componentType: 'input'
    },
    {
        name: 'userEmail',
        label: 'email',
        placeholder: 'enter your email adress',
        type: 'email',
        componentType: 'input'
    },
    {
        name: 'password',
        label: 'password',
        placeholder: 'enter your password',
        type: 'password',
        componentType: 'input'
    },
]

export const signInFormControls = [
    {
        name: 'userEmail',
        label: 'email',
        placeholder: 'enter your email adress',
        type: 'email',
        componentType: 'input'
    },
    {
        name: 'password',
        label: 'password',
        placeholder: 'enter your password',
        type: 'password',
        componentType: 'input'
    },
]

export const initialSignUpFormData = {
    userEmail: '',
    password: '',
    userName: '',
}
export const initialSignInFormData = {
    userEmail: '',
    password: '',
}