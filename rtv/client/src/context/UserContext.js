import React, {useState} from "react";
import axios from 'axios'

const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function UserContextProvider(props){
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem("token") || '',
        comments: [],
        issues: [],
        // votes: null
    }

    const [userState, setUserState] = useState(initState)


    function signup(credentials){
        axios.post('/authForm/signup', credentials)
        .then(response => {
            const {user, token} = response.data
            localStorage.setItem("token", token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(error => console.log(error.response.data.errMsg))
    }

    function login(credentials){
        axios.post('auth/login', credentials)
        .then(response => {
            const {user, token} = response.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            getUserIssues()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(error => console.log(error.response.data.errMsg))
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            comments: []
        })
    }

    function getUserIssues(){
        userAxios.get('/api/issues/user')
        .then(response => {
            setUserState(prevState => ({
                ...prevState,
                issues: response.data
            }))
        })
        .catch(error => console.log(error.response.data.errMsg))
    }

    function addIssue(newIssue){
        userAxios.post('/api/issue', newIssue)
        .then(response => {
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, response.data]
            }))
        })
        .catch(error => console.log(error.response.data.errMsg))
    }



    return(
        <UserContext.Provider 
            value={{
                ...userState,
                signup,
                login,
                logout,
                addIssue
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext}
