import React, {useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

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
        errMsg: ''
        // votes: null
    }

    const [userState, setUserState] = useState(initState)
    const [allIssues, setAllIssues] = useState([])
    let navigate = useNavigate()



    function signup(credentials){
        axios.post('/auth/signup', credentials)
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
        .catch(error => handleAuthErr(error.response.data.errMsg))
    }

    function login(credentials){
        axios.post('/auth/login', credentials)
        .then(response => {
            const {user, token} = response.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            const issues = getUserIssues()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token,
                issues
            }))
        })
        .catch(error => handleAuthErr(error.response.data.errMsg))
    }
    
    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            comments: []
        })
        navigate('/')
    }

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

    function getAllIssues(){
        userAxios.get('/api/issues')
        .then(response => {
            setAllIssues(response.data)
        })
        .catch(error => console.log(error))
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
        userAxios.post('/api/issues', newIssue)
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
                addIssue,
                resetAuthErr,
                getUserIssues,
                getAllIssues,
                allIssues,
                setUserState
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContextProvider, UserContext}
