import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext()
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function AppContextProvider(props){
    const [bandInfo, setBandInfo] = useState([])
    const [inputData, setInputData] = useState({
        artist: '',
        genre: '',
        url: '',
        img: '',
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem("token") || '',
        comments: [],
        errMsg: ''
    })
    const [userState, setUserState] = useState(inputData)
    const [bands, setBands] = useState([])
    let navigate = useNavigate()

    function signup(credentials){
        userAxios.post('/auth/signup', credentials)
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
        userAxios.post('/auth/login', credentials)
        .then(response => {
            const {user, token} = response.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            const issues = getUserBands()
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
        setBandInfo([])
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

    function getBands(){
        userAxios.get('/api/bands')
        .then(response => {
            setBands(response.data)
        })
        .catch(error => console.log(error))
    }

    function getUserBands(){
        userAxios.get('/api/bands/user')
        .then(response => {
            setUserState(prevState => ({
                ...prevState,
                bands: response.data
            }))
            setBands(response.data)
        })
        .catch(error => console.log(error.response.data.errMsg))
    }

    function addBand(newBand){
        userAxios.post('/api/bands', newBand)
        .then(response => {
            setUserState(prevState => ({
                ...prevState,
                bands: [...prevState.issues, response.data]
            }))
        })
        .catch(error => console.log(error.response.data.errMsg))
    }

    // useEffect(() => {
    //     getBands()
    // }, [])

    function handleChange(event){
        event.preventDefault()
        const {name, value} = event.target
        setInputData(prevData => ({...prevData, [name]: value}))
    }

    function handleSearch(event){
        event.preventDefault()
        userAxios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${inputData.artist}&api_key=cb41d576aa71567c76b75feab99d7dcd&format=json&limit=10`)
        .then(response => {
            setBandInfo(response.data.results.artistmatches.artist)
        })
        .catch(error => console.log(error))
        setInputData({
            artist: ''
        })
    }

    
    return(
        <AppContext.Provider value={{
                ...userState,
                handleSearch,
                bandInfo,
                handleChange,
                inputData,
                bands,
                setBands,
                getBands,
                signup,
                login,
                logout,
                addBand,
                resetAuthErr,
                getUserBands,
                setUserState
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export {AppContextProvider, AppContext}
