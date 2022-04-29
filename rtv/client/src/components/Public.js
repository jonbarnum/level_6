import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom"
import { UserContext } from "../context/UserContext";
import axios from "axios";

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})


function Public(){
    const { token } = useContext(UserContext)
    const [allIssues, setAllIssues] = useState([])

    function getAllIssues(){
        userAxios.get('api/issues')
            .then(response => {
                setAllIssues(response.data)
            })
            .catch(error => console.log(error))
    }
    
    useEffect(() => {
        getAllIssues()
    }, [])

    return(
        <div>
            <h1>Public Issues</h1>
            {token &&
                <Link to='/profile'>
                    <button>Profile</button>
                </Link>
            }
            {allIssues.map((issue, index) => {
                return(
                    <div key={issue._id} id={issue._id}>
                        <h1>{issue.title}</h1>
                        <h2>{issue.description}</h2>
                        <h6>Up Vote: {issue.upvote} Down Vote: {issue.downvote}</h6>
                        <button>Up Vote</button>
                        <button>Down Vote</button>
                        <button>Comment</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Public