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
    const [editText, setEditText] = useState({
        comment: '',
    })

    function getAllIssues(){
        userAxios.get('api/issues')
            .then(response => {
                setAllIssues(response.data)
            })
            .catch(error => console.log(error))
    }
    
    function handleEdit(index, id){
        let savedIssue = allIssues.find((issue) => issue._id === id)
        savedIssue.editActive = !savedIssue.editActive
        
        setAllIssues(prevState => ([
            ...prevState.slice(0, index),
            savedIssue,
            ...prevState.slice(index + 1),
        ]))
    }

    function handleTextEdit(event){
        event.preventDefault()
        const {name, value} = event.target
        setEditText(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    function handleEditSubmit(event, issue){
        event.preventDefault()
        userAxios.post(`/api/comments`,
            {
                comment: editText.comment ? editText.comment : issue.comment
            }
        )
        .then(response => {
            getAllIssues()
        })
        .catch(error => console.log(error))
        setEditText({
            comment: '',
        })
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
                        <button onClick={() => handleEdit(index, issue._id)}>Add Comment</button>
                        {issue.editActive ? (
                            <form onSubmit={(event) => handleEditSubmit(event, issue)}>
                                <input 
                                    type='text'
                                    value={editText.comment}
                                    name='comment'
                                    onChange={handleTextEdit}
                                    placeholder="Comment"
                                />
                                <button>Submit</button>
                            </form>
                        ): null}
                    </div>
                )
            })}
        </div>
    )
}

export default Public